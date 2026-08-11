import { createHash } from 'node:crypto';
import assetSchema from '../../../data/higgsfield/assets.schema.json' with { type: 'json' };
import manifestSchema from '../../../data/higgsfield/manifests/higgsfield-vault-manifest.schema.json' with { type: 'json' };
import receiptSchema from '../../../data/higgsfield/receipts/manifest-ingestion-receipt.schema.json' with { type: 'json' };
import { matchScenes } from '../../story-engine/matcher.js';
import { validateAgainstSchema } from '../../story-engine/schema-validator.js';
import { MATCHER_VERSION, SPEC_VERSION } from '../../story-engine/types.js';
import { PRODUCTION_CONTRACT_VERSION } from '../../production-contract.js';

export const MANIFEST_ADAPTER_VERSION = '1.0.0';
const REVIEW_STATES = new Set(['UNKNOWN', 'UNAVAILABLE', 'REQUIRES_REVIEW']);
const OUTPUT_USE_FIELDS = Object.freeze({
  interactive_branch: 'interactive_branch_eligibility',
  atv_episode: 'atv_episode_eligibility',
  kol_social: 'kol_social_eligibility',
  gaming_district: 'gaming_district_eligibility',
});

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, stableValue(value[key])]),
    );
  }
  return value;
}

function fingerprint(value) {
  return createHash('sha256').update(JSON.stringify(stableValue(value))).digest('hex');
}

function isReviewState(value) {
  return typeof value === 'string' && REVIEW_STATES.has(value);
}

function normalizeAnnotations(value) {
  return Array.isArray(value) ? structuredClone(value) : [];
}

function normalizeAnnotation(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? structuredClone(value)
    : null;
}

function normalizeStringArray(value) {
  return Array.isArray(value) ? [...value] : [];
}

function normalizeAudio(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) return structuredClone(value);
  return {
    present: null,
    transcript: null,
    language: null,
    speaker_ids: [],
    music: null,
    effects: null,
    rights_review: value === 'REQUIRES_REVIEW' ? 'REVIEW_REQUIRED' : 'UNKNOWN',
  };
}

function normalizeEligibility(outputUse, key, assetId) {
  const requested = outputUse && typeof outputUse === 'object' ? outputUse[key] : undefined;
  const status = requested ?? (outputUse === 'REQUIRES_REVIEW' ? 'REVIEW_REQUIRED' : 'UNKNOWN');
  return {
    status,
    reasons: [`VAULT_MANIFEST:${assetId}:${status}`],
    approval_references: [],
  };
}

function normalizeRights(asset) {
  const supplied =
    asset.rights_status && typeof asset.rights_status === 'object'
      ? asset.rights_status
      : {};
  const state =
    supplied.state ?? (asset.rights_status === 'REQUIRES_REVIEW' ? 'REVIEW_REQUIRED' : 'UNKNOWN');
  return {
    source_provider: asset.provider,
    source_asset_reference_id: asset.provider_asset_id,
    rights_state: state,
    allowed_production_uses: [...(supplied.allowed_production_uses ?? [])],
    derivative_edit_eligibility: supplied.derivative_edit_eligibility ?? 'UNKNOWN',
    distribution_eligibility: supplied.distribution_eligibility ?? 'UNKNOWN',
    provenance_references:
      supplied.provenance_references?.length > 0
        ? [...supplied.provenance_references]
        : [`VAULT_MANIFEST:${asset.asset_id}:RIGHTS_UNRESOLVED`],
  };
}

function normalizeCanonStatus(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? structuredClone(value)
    : {};
}

function normalizeManifestAsset(asset) {
  const canonStatus = normalizeCanonStatus(asset.canon_status);
  const normalized = {
    asset_id: asset.asset_id,
    parent_asset_id: null,
    vault_id: asset.project_id,
    media_type: ['UNAVAILABLE', 'REQUIRES_REVIEW'].includes(asset.media_type)
      ? 'UNKNOWN'
      : asset.media_type,
    'source_url/reference': structuredClone(asset.source_reference),
    duration: typeof asset.duration === 'number' ? asset.duration : null,
    segment: null,
    characters: normalizeAnnotations(asset.characters),
    factions: normalizeAnnotations(asset.factions),
    artifacts: normalizeAnnotations(asset.artifacts),
    continuity_identity_ids: normalizeStringArray(asset.continuity_identity_ids),
    world: normalizeAnnotation(asset.world),
    location: normalizeAnnotation(asset.location),
    era: normalizeAnnotation(asset.era),
    canon_source: Object.keys(canonStatus),
    canon_status: canonStatus,
    studio_mode:
      asset.studio_mode && !isReviewState(asset.studio_mode)
        ? asset.studio_mode
        : 'UNASSIGNED',
    visual_style: null,
    camera_language: null,
    action: null,
    mood: null,
    dialogue_or_audio: normalizeAudio(asset.audio),
    continuity_tags: normalizeStringArray(asset.continuity_tags),
    truth_state:
      asset.truth_state && !isReviewState(asset.truth_state)
        ? asset.truth_state
        : 'UNREVIEWED',
    rights: normalizeRights(asset),
    provider_metadata: {
      ...(asset.provider_metadata ?? {}),
      fixture: false,
      provider: asset.provider,
      provider_asset_id: asset.provider_asset_id,
      project_id: asset.project_id,
      ingestion_method: asset.provider_metadata?.ingestion_method ?? 'VAULT_MANIFEST',
      generation_fallback: 'PROHIBITED',
      filename: asset.filename ?? 'UNKNOWN',
      title: asset.title ?? 'UNKNOWN',
      description: asset.description ?? 'UNKNOWN',
      tags: asset.tags ?? 'UNKNOWN',
      created_at: asset.created_at ?? 'UNKNOWN',
      manifest_unresolved_fields: unresolvedFields(asset).map((field) =>
        field.slice(asset.asset_id.length + 1),
      ),
    },
    annotation_provenance: ['VAULT_MANIFEST'],
  };

  for (const [manifestField, schemaField] of Object.entries(OUTPUT_USE_FIELDS)) {
    normalized[schemaField] = normalizeEligibility(asset.output_use, manifestField, asset.asset_id);
  }
  return normalized;
}

function unresolvedFields(asset) {
  const fields = [
    'filename',
    'title',
    'description',
    'tags',
    'world',
    'era',
    'location',
    'characters',
    'factions',
    'artifacts',
    'continuity_tags',
    'continuity_identity_ids',
    'studio_mode',
    'duration',
    'audio',
    'truth_state',
    'canon_status',
    'output_use',
    'rights_status',
    'created_at',
  ];
  return fields
    .filter((field) => !Object.hasOwn(asset, field) || isReviewState(asset[field]) || asset[field] === null)
    .map((field) => `${asset.asset_id}.${field}`);
}

function needsRightsReview(asset) {
  return !(
    asset.rights_status &&
    typeof asset.rights_status === 'object' &&
    asset.rights_status.state === 'APPROVED'
  );
}

function needsContinuityReview(asset) {
  return !Array.isArray(asset.continuity_tags) || !Array.isArray(asset.continuity_identity_ids);
}

function needsCanonReview(asset) {
  return !(
    asset.canon_status &&
    typeof asset.canon_status === 'object' &&
    !Array.isArray(asset.canon_status) &&
    Object.keys(asset.canon_status).length > 0
  );
}

function needsIdentityReview(asset) {
  return !['characters', 'factions', 'artifacts'].every((field) => Array.isArray(asset[field]));
}

function validateCrossReferences(manifest) {
  const localIds = new Set();
  const providerIds = new Set();
  for (const asset of manifest.assets) {
    if (asset.project_id !== manifest.project_id) {
      throw new TypeError(`Asset ${asset.asset_id} project_id does not match manifest project_id.`);
    }
    if (asset.source_reference.kind === 'PROVIDER_ASSET_ID' && asset.source_reference.value !== asset.provider_asset_id) {
      throw new TypeError(`Asset ${asset.asset_id} source reference does not preserve provider_asset_id.`);
    }
    const stableProviderIdentity = asset.provider_asset_id === 'UNKNOWN'
      ? `LOCAL_ASSET_KEY:${asset.asset_id}`
      : asset.provider_asset_id;
    const providerKey = `${asset.provider}:${asset.project_id}:${stableProviderIdentity}`;
    if (localIds.has(asset.asset_id) || providerIds.has(providerKey)) {
      throw new TypeError(`Duplicate stable asset ID: ${asset.asset_id} / ${providerKey}.`);
    }
    localIds.add(asset.asset_id);
    providerIds.add(providerKey);
  }
}

/**
 * Ingest a user-controlled manifest of existing provider content.
 * This is a pure metadata operation and exposes no generation fallback.
 */
export function importVaultManifest(manifest, options = {}) {
  const manifestErrors = validateAgainstSchema(manifest, manifestSchema);
  if (manifestErrors.length > 0) {
    throw new TypeError(`Invalid Higgsfield vault manifest: ${manifestErrors.join(' ')}`);
  }
  validateCrossReferences(manifest);

  const assets = manifest.assets
    .map(normalizeManifestAsset)
    .sort((left, right) => left.asset_id.localeCompare(right.asset_id));
  const assetErrors = assets.flatMap((asset) =>
    validateAgainstSchema(asset, assetSchema).map((error) => `${asset.asset_id}: ${error}`),
  );
  if (assetErrors.length > 0) {
    throw new TypeError(`Normalized asset schema validation failed: ${assetErrors.join(' ')}`);
  }

  const rightsReviewCount = manifest.assets.filter(needsRightsReview).length;
  const canonReviewCount = manifest.assets.filter(needsCanonReview).length;
  const continuityReviewCount = manifest.assets.filter(needsContinuityReview).length;
  const identityReviewCount = manifest.assets.filter(needsIdentityReview).length;
  const unknownMetadataFields = manifest.assets.flatMap(unresolvedFields).sort();
  const allReviewed =
    rightsReviewCount === 0 &&
    canonReviewCount === 0 &&
    continuityReviewCount === 0 &&
    identityReviewCount === 0;
  const readinessAssessment =
    assets.length === 0
      ? 'EMPTY_REGISTERED'
      : allReviewed
        ? 'MATCH_READY_CANDIDATE'
        : 'REVIEW_SEARCH_ONLY';

  const receipt = {
    production_contract_version: PRODUCTION_CONTRACT_VERSION,
    vault_id: manifest.project_id,
    provider: 'HIGGSFIELD',
    ingestion_method: manifest.ingestion_method,
    ingestion_surface: 'USER_CONTROLLED_JSON_MANIFEST',
    ingestion_timestamp: options.ingestionTimestamp ?? new Date().toISOString(),
    manifest_version: manifest.manifest_version,
    adapter_version: MANIFEST_ADAPTER_VERSION,
    matcher_version: MATCHER_VERSION,
    spec_version: SPEC_VERSION,
    asset_count: assets.length,
    pagination_count: 1,
    schema_valid_count: assets.length,
    schema_invalid_count: 0,
    duplicate_count: 0,
    unknown_metadata_fields: [...new Set(unknownMetadataFields)],
    rights_review_count: rightsReviewCount,
    canon_review_count: canonReviewCount,
    continuity_review_count: continuityReviewCount,
    canonical_identity_review_count: identityReviewCount,
    source_references: [...new Set(manifest.assets.map((asset) => asset.source_reference.value))].sort(),
    manifest_fingerprint: fingerprint(manifest),
    index_fingerprint: fingerprint(assets),
    readiness_assessment: readinessAssessment,
    generation_fallback: 'PROHIBITED',
  };
  const receiptErrors = validateAgainstSchema(receipt, receiptSchema);
  if (receiptErrors.length > 0) {
    throw new TypeError(`Invalid manifest ingestion receipt: ${receiptErrors.join(' ')}`);
  }

  const sceneRequests = options.sceneRequests ?? [];
  const match_output =
    sceneRequests.length > 0
      ? matchScenes(sceneRequests, assets, { vaults: options.vaults })
      : null;

  return { assets, receipt, match_output };
}
