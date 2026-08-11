import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { isAbsolute, resolve } from 'node:path';
import schema from '../../../data/higgsfield/inbox/higgsfield-public-reference.schema.json' with { type: 'json' };
import manifestSchema from '../../../data/higgsfield/manifests/higgsfield-vault-manifest.schema.json' with { type: 'json' };
import receiptSchema from '../../../data/higgsfield/receipts/manifest-ingestion-receipt.schema.json' with { type: 'json' };
import { validateAgainstSchema } from '../../story-engine/schema-validator.js';
import { importVaultManifest } from './manifest-adapter.js';

async function localEvidence(record, base) {
  if (!record.local_path) return null;
  const path = isAbsolute(record.local_path) ? record.local_path : resolve(base, record.local_path);
  let details;
  try { details = await stat(path); } catch (error) {
    throw new TypeError(`Public reference local file is not readable: ${record.local_path} (${error.code ?? error.message}).`);
  }
  if (!details.isFile()) throw new TypeError(`Public reference local path is not a file: ${record.local_path}.`);
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return { local_path: record.local_path, local_sha256: hash.digest('hex'), local_size_bytes: details.size };
}

function localAssetId(record, evidence) {
  const stableMediaEvidence = evidence?.local_sha256 ?? record.remote_media_reference.value;
  const key = [record.public_project_url, record.project_reference.kind, record.project_reference.value, stableMediaEvidence].join('\0');
  return `higgsfield-public-${createHash('sha256').update(key).digest('hex').slice(0, 24)}`;
}

function unresolvedPublicAsset(record, evidence) {
  const sourceReference = record.remote_media_reference ?? {
    kind: 'SANITIZED_URL', value: record.public_project_url, contains_secrets: false,
  };
  return {
    asset_id: localAssetId(record, evidence),
    provider: 'HIGGSFIELD',
    provider_asset_id: record.provider_asset_id ?? 'UNKNOWN',
    project_id: record.vault_id,
    source_reference: structuredClone(sourceReference),
    media_type: record.media_type,
    filename: record.filename ?? 'UNKNOWN',
    title: record.title ?? 'UNKNOWN',
    description: 'UNKNOWN',
    tags: 'UNKNOWN',
    world: 'REQUIRES_REVIEW',
    era: 'REQUIRES_REVIEW',
    location: 'REQUIRES_REVIEW',
    characters: 'REQUIRES_REVIEW',
    factions: 'REQUIRES_REVIEW',
    artifacts: 'REQUIRES_REVIEW',
    continuity_tags: 'REQUIRES_REVIEW',
    continuity_identity_ids: 'REQUIRES_REVIEW',
    studio_mode: 'REQUIRES_REVIEW',
    duration: 'UNKNOWN',
    audio: 'REQUIRES_REVIEW',
    truth_state: 'REQUIRES_REVIEW',
    canon_status: 'REQUIRES_REVIEW',
    output_use: 'REQUIRES_REVIEW',
    rights_status: 'REQUIRES_REVIEW',
    created_at: 'UNKNOWN',
    provider_metadata: {
      fixture: false,
      provenance_class: 'HIGGSFIELD_PUBLIC_REFERENCE',
      ingestion_method: 'HIGGSFIELD_PUBLIC_REFERENCE',
      review_eligibility: 'REVIEW_SEARCH_ONLY',
      public_project_url: record.public_project_url,
      project_reference: structuredClone(record.project_reference),
      author_attribution: record.author_attribution ?? 'UNKNOWN',
      verified_prompt: record.prompt ?? 'UNKNOWN',
      verified_model: record.model ?? 'UNKNOWN',
      verified_size: record.size ?? 'UNKNOWN',
      verified_date: record.date ?? 'UNKNOWN',
      ui_verified_metadata: structuredClone(record.ui_verified_metadata ?? {}),
      generation_fallback: 'PROHIBITED',
      ...(evidence ?? { local_path: 'UNAVAILABLE', local_sha256: 'UNAVAILABLE', local_size_bytes: null }),
    },
  };
}

export async function mergePublicReferencesIntoManifest(batch, manifest, options = {}) {
  const errors = validateAgainstSchema(batch, schema);
  if (errors.length) throw new TypeError(`Invalid Higgsfield public-reference import: ${errors.join(' ')}`);
  const manifestErrors = validateAgainstSchema(manifest, manifestSchema);
  if (manifestErrors.length) throw new TypeError(`Invalid target manifest: ${manifestErrors.join(' ')}`);
  for (const record of batch.records) {
    if (record.vault_id !== manifest.project_id) throw new TypeError('Public reference vault_id does not match target manifest.');
    if (record.provider_asset_id === 'UNKNOWN') throw new TypeError('Omit unavailable provider_asset_id instead of supplying UNKNOWN.');
  }
  const evidence = await Promise.all(batch.records.map((record) => localEvidence(record, options.localPathBase ?? process.cwd())));
  const incoming = batch.records.map((record, index) => unresolvedPublicAsset(record, evidence[index]));
  const existingIds = new Set(manifest.assets.map(({ asset_id }) => asset_id));
  for (const asset of incoming) if (existingIds.has(asset.asset_id)) throw new TypeError(`Duplicate public reference ${asset.asset_id}.`);
  const nextManifest = {
    ...structuredClone(manifest),
    ingestion_method: batch.records.length ? 'HIGGSFIELD_PUBLIC_REFERENCE' : manifest.ingestion_method,
    assets: [...manifest.assets.map(structuredClone), ...incoming].sort((a, b) => a.asset_id.localeCompare(b.asset_id)),
  };
  const imported = importVaultManifest(nextManifest, options);
  const publicPages = batch.records.map(({ public_project_url }) => public_project_url);
  const receipt = {
    ...imported.receipt,
    ingestion_method: 'HIGGSFIELD_PUBLIC_REFERENCE',
    readiness_assessment: nextManifest.assets.length ? 'REVIEW_SEARCH_ONLY' : 'EMPTY_REGISTERED',
    source_references: [...new Set([...imported.receipt.source_references, ...publicPages])].sort(),
    public_reference_import: {
      record_count: batch.records.length,
      provider_asset_id_unknown_count: batch.records.filter(({ provider_asset_id }) => !provider_asset_id).length,
      review_eligibility: 'REVIEW_SEARCH_ONLY',
    },
  };
  const receiptErrors = validateAgainstSchema(receipt, receiptSchema);
  if (receiptErrors.length) throw new TypeError(`Invalid public-reference receipt: ${receiptErrors.join(' ')}`);
  return { manifest: nextManifest, assets: imported.assets, receipt, match_output: imported.match_output };
}
