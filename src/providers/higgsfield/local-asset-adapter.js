import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import assetSchema from '../../../data/higgsfield/assets.schema.json' with { type: 'json' };
import localManifestSchema from '../../../data/higgsfield/manifests/higgsfield-local-asset-manifest.schema.json' with { type: 'json' };
import receiptSchema from '../../../data/higgsfield/receipts/manifest-ingestion-receipt.schema.json' with { type: 'json' };
import referenceTagSchema from '../../../data/story/reference-tag.schema.json' with { type: 'json' };
import { parseReferenceTag } from '../../director/reference-tags.js';
import { PRODUCTION_CONTRACT_VERSION } from '../../production-contract.js';
import { validateAgainstSchema } from '../../story-engine/schema-validator.js';
import { MATCHER_VERSION, SPEC_VERSION } from '../../story-engine/types.js';

export const LOCAL_ASSET_ADAPTER_VERSION = '1.0.0';
export const ZEPHYR_VAULT_ID = 'zephyr-local-production-v1';
export const ZEPHYR_PROJECT_CODE = 'ZEPHYR';

const PROVIDER = 'HIGGSFIELD_LOCAL_ARCHIVE';
const INGESTION_METHOD = 'VERIFIED_LOCAL_ASSET';
const REVIEW_FIELDS = Object.freeze([
  'world', 'era', 'location', 'characters', 'factions', 'artifacts',
  'continuity_tags', 'continuity_identity_ids', 'studio_mode', 'duration',
  'audio', 'truth_state', 'canon_status', 'output_use', 'rights_status',
]);
const MEDIA_EXTENSIONS = new Map([
  ['.png', 'IMAGE'], ['.jpg', 'IMAGE'], ['.jpeg', 'IMAGE'],
  ['.mp4', 'VIDEO'], ['.mov', 'VIDEO'], ['.mkv', 'VIDEO'], ['.webm', 'VIDEO'],
  ['.wav', 'AUDIO'], ['.mp3', 'AUDIO'], ['.m4a', 'AUDIO'], ['.flac', 'AUDIO'],
]);
const FILESYSTEM_METADATA = new Set(['.DS_Store', 'Thumbs.db', 'desktop.ini']);
const LOCATION_NAMES = new Set([
  'Backrooms', 'Chill room', 'Gym', 'Main hangar', "Naomi's room",
  'Shower room', "Zero's room",
]);
const PROP_NAMES = new Set(['Lightstick', 'Magnetic transporter']);
const CHARACTER_FAMILIES = Object.freeze([
  'Alex', 'Haru Min', 'Kai', 'Mira', 'Naomi', 'Reina', 'Tank', 'Toshi', 'Zero',
]);

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
  }
  return value;
}

function fingerprint(value) {
  return createHash('sha256').update(JSON.stringify(stableValue(value))).digest('hex');
}

function listFiles(root) {
  const files = [];
  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(fullPath);
      if (entry.isFile()) files.push(fullPath);
    }
  }
  visit(root);
  return files.sort((left, right) => left.localeCompare(right));
}

function pngDimensions(buffer) {
  if (buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function jpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  const startOfFrame = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  let offset = 2;
  while (offset + 8 < buffer.length) {
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;
    if (marker === 0xd8 || marker === 0xd9) continue;
    if (offset + 2 > buffer.length) break;
    const length = buffer.readUInt16BE(offset);
    if (length < 2 || offset + length > buffer.length) break;
    if (startOfFrame.has(marker)) {
      return { width: buffer.readUInt16BE(offset + 5), height: buffer.readUInt16BE(offset + 3) };
    }
    offset += length;
  }
  return null;
}

function probeTimedMedia(localPath, mediaType) {
  if (mediaType === 'IMAGE') return { dimensions: null, duration: null };
  const result = spawnSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration:stream=width,height',
    '-of', 'json', '--', localPath,
  ], { encoding: 'utf8' });
  if (result.status !== 0) return { dimensions: null, duration: null };
  const probe = JSON.parse(result.stdout);
  const video = probe.streams?.find(({ width, height }) => width && height);
  const duration = Number(probe.format?.duration);
  return {
    dimensions: video ? { width: video.width, height: video.height } : null,
    duration: Number.isFinite(duration) ? duration : null,
  };
}

function exactFamily(stem) {
  return CHARACTER_FAMILIES.find((family) => stem.toLocaleLowerCase('en-US').startsWith(family.toLocaleLowerCase('en-US'))) ?? null;
}

function variantLabels(stem, role) {
  const labels = [];
  for (const match of stem.matchAll(/\(([^)]+)\)|\[([^\]]+)\]/gu)) labels.push(match[1] ?? match[2]);
  if (/\bin cockpit\b/iu.test(stem)) labels.push('cockpit');
  if (role === 'MECH') {
    labels.push(/\bmecha\b/iu.test(stem) ? 'mecha' : 'mech');
    if (/\(back\)/iu.test(stem)) labels.push('back');
  }
  return [...new Set(labels)];
}

function classifyFilename(filename) {
  const stem = path.basename(filename, path.extname(filename));
  const family = exactFamily(stem);
  if (/\bmech(?:a)?\b/iu.test(stem)) return { role: 'MECH', family, variants: variantLabels(stem, 'MECH') };
  if (LOCATION_NAMES.has(stem) || /^City [1-9][0-9]*$/u.test(stem)) return { role: 'LOCATION', family: null, variants: [] };
  if (PROP_NAMES.has(stem)) return { role: 'PROP', family: null, variants: [] };
  if (stem === 'Mob') return { role: 'OTHER', family: null, variants: [] };
  const variants = variantLabels(stem, 'CHARACTER');
  return { role: variants.length > 0 ? 'CHARACTER_STATE' : 'CHARACTER', family, variants };
}

function tagToken(value) {
  return value
    .replaceAll(/'s\b/giu, '')
    .replaceAll(/[^A-Za-z0-9]+/gu, '_')
    .replaceAll(/^_+|_+$/gu, '');
}

function referenceTag(filename, classification) {
  const stem = path.basename(filename, path.extname(filename));
  let prefix;
  let name;
  if (classification.role === 'MECH') {
    prefix = 'mech';
    name = classification.family ?? stem;
    if (classification.variants.includes('mecha')) name += '_mecha';
    if (classification.variants.includes('back')) name += '_back';
  } else if (classification.role === 'LOCATION') {
    prefix = 'loc';
    name = stem;
  } else if (classification.role === 'PROP') {
    prefix = 'prop';
    name = stem;
  } else if (classification.role === 'OTHER') {
    prefix = 'other';
    name = stem;
  } else {
    prefix = 'char';
    name = classification.family ?? stem;
    if (classification.variants.length > 0) name += `_${classification.variants.join('_')}`;
  }
  return `@${prefix}_${ZEPHYR_PROJECT_CODE}_${tagToken(name)}`;
}

function localLabels(filename, classification, tag) {
  const stem = path.basename(filename, path.extname(filename));
  return {
    metadata_basis: 'FILENAME_DERIVED',
    local_character_family: classification.family,
    provisional_reference_tag: tag,
    local_location_label: classification.role === 'LOCATION' ? stem : null,
    local_prop_label: classification.role === 'PROP' ? stem : null,
    local_mech_label: classification.role === 'MECH' ? classification.family : null,
    local_creature_label: classification.role === 'CREATURE' ? stem : null,
  };
}

function inspectMedia(localPath) {
  const extensionWithDot = path.extname(localPath).toLocaleLowerCase('en-US');
  const mediaType = MEDIA_EXTENSIONS.get(extensionWithDot);
  const buffer = readFileSync(localPath);
  let dimensions = null;
  let duration = null;
  if (mediaType === 'IMAGE') {
    dimensions = extensionWithDot === '.png' ? (pngDimensions(buffer) ?? jpegDimensions(buffer)) : jpegDimensions(buffer);
    if (!dimensions) throw new TypeError(`Unable to read image dimensions: ${localPath}`);
  } else {
    ({ dimensions, duration } = probeTimedMedia(localPath, mediaType));
  }
  return {
    extension: extensionWithDot.slice(1),
    media_type: mediaType,
    byte_size: statSync(localPath).size,
    sha256: createHash('sha256').update(buffer).digest('hex'),
    dimensions,
    duration,
  };
}

function normalizeAsset(asset, vaultId, options = {}) {
  const provider = options.provider ?? PROVIDER;
  const ingestionMethod = options.ingestionMethod ?? INGESTION_METHOD;
  const sourceClass = options.sourceClass ?? 'HIGGSFIELD_LOCAL_ARCHIVE';
  const ownershipBasis = options.ownershipBasis ?? null;
  const basis = 'FILENAME_DERIVED';
  return {
    asset_id: asset.asset_id,
    parent_asset_id: null,
    vault_id: vaultId,
    media_type: asset.media_type,
    'source_url/reference': structuredClone(asset.source_reference),
    duration: asset.duration,
    segment: null,
    characters: [],
    factions: [],
    artifacts: [],
    continuity_identity_ids: [],
    world: null,
    location: null,
    era: null,
    canon_source: [],
    canon_status: {},
    studio_mode: 'UNASSIGNED',
    visual_style: null,
    camera_language: null,
    action: null,
    mood: null,
    dialogue_or_audio: {
      present: null, transcript: null, language: null, speaker_ids: [],
      music: null, effects: null, rights_review: 'REVIEW_REQUIRED',
    },
    continuity_tags: [],
    truth_state: 'UNREVIEWED',
    interactive_branch_eligibility: { status: 'REVIEW_REQUIRED', reasons: ['VERIFIED_LOCAL_ASSET:REVIEW_REQUIRED'], approval_references: [] },
    atv_episode_eligibility: { status: 'REVIEW_REQUIRED', reasons: ['VERIFIED_LOCAL_ASSET:REVIEW_REQUIRED'], approval_references: [] },
    kol_social_eligibility: { status: 'REVIEW_REQUIRED', reasons: ['VERIFIED_LOCAL_ASSET:REVIEW_REQUIRED'], approval_references: [] },
    gaming_district_eligibility: { status: 'REVIEW_REQUIRED', reasons: ['VERIFIED_LOCAL_ASSET:REVIEW_REQUIRED'], approval_references: [] },
    rights: {
      source_provider: provider,
      source_asset_reference_id: 'UNKNOWN',
      rights_state: 'REVIEW_REQUIRED',
      allowed_production_uses: [],
      derivative_edit_eligibility: 'REVIEW_REQUIRED',
      distribution_eligibility: 'REVIEW_REQUIRED',
      provenance_references: [`LOCAL_SHA256:${asset.sha256}`, asset.local_path],
    },
    provider_metadata: {
      fixture: false,
      provider,
      provider_asset_id: 'UNKNOWN',
      project_id: 'UNKNOWN',
      soul_id: 'UNKNOWN',
      ingestion_method: ingestionMethod,
      source_evidence: 'VERIFIED_LOCAL_FILE',
      review_eligibility: 'REVIEW_SEARCH_ONLY',
      generation_fallback: 'PROHIBITED',
      source_class: sourceClass,
      ownership_basis: ownershipBasis,
      local_path: asset.local_path,
      filename: asset.filename,
      extension: asset.extension,
      byte_size: asset.byte_size,
      sha256: asset.sha256,
      dimensions: structuredClone(asset.dimensions),
      production_role: asset.production_role,
      character_family: asset.character_family,
      local_character_family: asset.local_character_family,
      variant_labels: [...asset.variant_labels],
      reference_tag: asset.reference_tag,
      provisional_reference_tag: asset.provisional_reference_tag,
      reference_tag_status: 'PROVISIONAL_LOCAL',
      metadata_basis: 'FILENAME_DERIVED',
      local_location_label: asset.local_location_label,
      local_prop_label: asset.local_prop_label,
      local_mech_label: asset.local_mech_label,
      local_creature_label: asset.local_creature_label,
      canon: 'REQUIRES_REVIEW',
      identity: 'REQUIRES_REVIEW',
      rights: 'REQUIRES_REVIEW',
      continuity: 'REQUIRES_REVIEW',
      manifest_unresolved_fields: [...REVIEW_FIELDS],
    },
    annotation_provenance: ['VERIFIED_LOCAL_FILE', 'INFERRED_FROM_FILENAME'],
    production_role: { value: asset.production_role, metadata_basis: basis },
    local_character_family: { value: asset.local_character_family, metadata_basis: basis },
    variant_labels: { values: [...asset.variant_labels], metadata_basis: basis },
    provisional_reference_tag: { value: asset.provisional_reference_tag, metadata_basis: basis },
    local_location_label: { value: asset.local_location_label, metadata_basis: basis },
    local_prop_label: { value: asset.local_prop_label, metadata_basis: basis },
    local_mech_label: { value: asset.local_mech_label, metadata_basis: basis },
    local_creature_label: { value: asset.local_creature_label, metadata_basis: basis },
  };
}

export function ingestLocalArchive(sourceRoot, options = {}) {
  const vaultId = options.vaultId ?? ZEPHYR_VAULT_ID;
  const provider = options.provider ?? PROVIDER;
  const ingestionMethod = options.ingestionMethod ?? INGESTION_METHOD;
  const projectCode = options.projectCode ?? ZEPHYR_PROJECT_CODE;
  const sourceClass = options.sourceClass ?? 'HIGGSFIELD_LOCAL_ARCHIVE';
  const ownershipBasis = options.ownershipBasis ?? null;
  const rightsStatus = options.rightsStatus ?? 'REQUIRES_REVIEW';
  const files = options.files ? [...options.files].sort((left, right) => left.localeCompare(right)) : listFiles(sourceRoot);
  const excluded = files
    .filter((localPath) => FILESYSTEM_METADATA.has(path.basename(localPath)) || path.basename(localPath).startsWith('._'))
    .map((localPath) => path.relative(sourceRoot, localPath));
  const mediaFiles = files.filter((localPath) =>
    !excluded.includes(path.relative(sourceRoot, localPath)) && MEDIA_EXTENSIONS.has(path.extname(localPath).toLocaleLowerCase('en-US')),
  );
  const assets = mediaFiles.map((localPath) => {
    const filename = path.basename(localPath);
    const classification = classifyFilename(filename);
    const evidence = inspectMedia(localPath);
    const tag = referenceTag(filename, classification).replace('_ZEPHYR_', `_${projectCode}_`);
    const localReviewMetadata = localLabels(filename, classification, tag);
    const parsedTag = parseReferenceTag(tag);
    const tagErrors = validateAgainstSchema(parsedTag, referenceTagSchema);
    if (tagErrors.length > 0) throw new TypeError(`Invalid local reference tag ${tag}: ${tagErrors.join(' ')}`);
    return {
      asset_id: `zephyr-local-sha256-${evidence.sha256}`,
      provider,
      provider_asset_id: 'UNKNOWN',
      project_id: 'UNKNOWN',
      soul_id: 'UNKNOWN',
      source_reference: { kind: 'LOCAL_AUTHORIZED_PATH', value: localPath, contains_secrets: false },
      source_evidence: 'VERIFIED_LOCAL_FILE',
      local_path: localPath,
      filename,
      ...evidence,
      production_role: classification.role,
      character_family: classification.family,
      variant_labels: classification.variants,
      reference_tag: tag,
      reference_tag_status: 'PROVISIONAL_LOCAL',
      ...localReviewMetadata,
      review_eligibility: 'REVIEW_SEARCH_ONLY',
      rights_status: rightsStatus,
      canon_status: 'REQUIRES_REVIEW',
      identity_status: 'REQUIRES_REVIEW',
      continuity_status: 'REQUIRES_REVIEW',
      generation_fallback: 'PROHIBITED',
    };
  }).sort((left, right) => left.filename.localeCompare(right.filename));

  const hashes = new Map();
  for (const asset of assets) hashes.set(asset.sha256, (hashes.get(asset.sha256) ?? 0) + 1);
  const duplicateHashCount = [...hashes.values()].filter((count) => count > 1).length;
  if (duplicateHashCount > 0) throw new TypeError(`Duplicate local content hashes: ${duplicateHashCount}.`);
  const tags = assets.map(({ reference_tag }) => reference_tag);
  if (new Set(tags).size !== tags.length) throw new TypeError('Duplicate provisional local reference tags.');

  const manifest = {
    manifest_version: '1.0.0',
    vault_id: vaultId,
    vault_type: 'LOCAL_PRODUCTION_ARCHIVE',
    provider,
    ...(options.generic ? { source_class: sourceClass, ownership_basis: ownershipBasis } : {}),
    ingestion_method: ingestionMethod,
    project_id: 'UNKNOWN',
    source_root: sourceRoot,
    generation_fallback: 'PROHIBITED',
    review_eligibility: 'REVIEW_SEARCH_ONLY',
    assets,
  };
  const manifestErrors = options.generic ? [] : validateAgainstSchema(manifest, localManifestSchema);
  if (manifestErrors.length > 0) throw new TypeError(`Invalid local archive manifest: ${manifestErrors.join(' ')}`);

  const normalizedAssets = assets.map((asset) => normalizeAsset(asset, vaultId, {
    provider, ingestionMethod, sourceClass, ownershipBasis,
  }));
  const assetErrors = normalizedAssets.flatMap((asset) =>
    validateAgainstSchema(asset, assetSchema).map((error) => `${asset.asset_id}: ${error}`),
  );
  if (assetErrors.length > 0) throw new TypeError(`Invalid normalized local assets: ${assetErrors.join(' ')}`);

  const characterFamilies = [...new Set(assets.map(({ character_family }) => character_family).filter(Boolean))].sort();
  const countRole = (role) => assets.filter(({ production_role }) => production_role === role).length;
  const receipt = {
    production_contract_version: PRODUCTION_CONTRACT_VERSION,
    vault_id: vaultId,
    provider,
    ingestion_method: ingestionMethod,
    ingestion_surface: 'READ_ONLY_LOCAL_FILESYSTEM',
    ingestion_timestamp: options.ingestionTimestamp ?? new Date().toISOString(),
    manifest_version: manifest.manifest_version,
    adapter_version: LOCAL_ASSET_ADAPTER_VERSION,
    matcher_version: MATCHER_VERSION,
    spec_version: SPEC_VERSION,
    asset_count: assets.length,
    pagination_count: 1,
    schema_valid_count: normalizedAssets.length,
    schema_invalid_count: 0,
    duplicate_count: duplicateHashCount,
    unknown_metadata_fields: ['provider_asset_id', 'project_id', 'soul_id', ...REVIEW_FIELDS].sort(),
    rights_review_count: assets.length,
    canon_review_count: assets.length,
    continuity_review_count: assets.length,
    canonical_identity_review_count: assets.length,
    source_references: assets.map(({ local_path }) => local_path).sort(),
    manifest_fingerprint: fingerprint(manifest),
    index_fingerprint: fingerprint(normalizedAssets),
    readiness_assessment: options.readinessAssessment ?? (options.generic ? 'LOCAL_INDEX_READY_CANDIDATE' : 'LOCAL_INDEX_READY'),
    generation_fallback: 'PROHIBITED',
    local_archive_import: {
      source_root: sourceRoot,
      excluded_file_count: excluded.length,
      excluded_files: excluded,
      character_family_count: characterFamilies.length,
      location_count: countRole('LOCATION'),
      prop_count: countRole('PROP'),
      mech_count: countRole('MECH'),
      creature_count: countRole('CREATURE'),
      duplicate_hash_count: duplicateHashCount,
      requires_review_count: assets.length,
      review_eligibility: 'REVIEW_SEARCH_ONLY',
    },
  };
  const receiptErrors = options.generic ? [] : validateAgainstSchema(receipt, receiptSchema);
  if (receiptErrors.length > 0) throw new TypeError(`Invalid local archive receipt: ${receiptErrors.join(' ')}`);

  return { manifest, normalizedAssets, receipt, excluded, characterFamilies };
}
