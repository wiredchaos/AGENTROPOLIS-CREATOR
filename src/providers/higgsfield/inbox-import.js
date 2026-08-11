import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { isAbsolute, resolve } from 'node:path';
import inboxSchema from '../../../data/higgsfield/inbox/higgsfield-ui-import.schema.json' with { type: 'json' };
import manifestSchema from '../../../data/higgsfield/manifests/higgsfield-vault-manifest.schema.json' with { type: 'json' };
import receiptSchema from '../../../data/higgsfield/receipts/manifest-ingestion-receipt.schema.json' with { type: 'json' };
import { validateAgainstSchema } from '../../story-engine/schema-validator.js';
import { importVaultManifest } from './manifest-adapter.js';

const IMPORTABLE_FIELDS = Object.freeze([
  'source_reference',
  'media_type',
  'title',
  'description',
  'filename',
  'duration',
  'tags',
]);

function derivedAssetId(projectId, providerAssetId) {
  const digest = createHash('sha256')
    .update(`HIGGSFIELD\0${projectId}\0${providerAssetId}`)
    .digest('hex')
    .slice(0, 24);
  return `higgsfield-manifest-${digest}`;
}

function localEvidenceMetadata(evidence) {
  return {
    local_path: evidence.local_path,
    local_sha256: evidence.sha256,
    local_size_bytes: evidence.size_bytes,
    local_evidence_status: evidence.status,
  };
}

function unresolvedAsset(record, evidence) {
  return {
    asset_id: derivedAssetId(record.project_id, record.provider_asset_id),
    provider: 'HIGGSFIELD',
    provider_asset_id: record.provider_asset_id,
    project_id: record.project_id,
    source_reference: structuredClone(record.source_reference),
    media_type: record.media_type,
    filename: record.filename ?? 'UNKNOWN',
    title: record.title ?? 'UNKNOWN',
    description: record.description ?? 'UNKNOWN',
    tags: record.tags ? [...record.tags] : 'UNKNOWN',
    world: 'REQUIRES_REVIEW',
    era: 'REQUIRES_REVIEW',
    location: 'REQUIRES_REVIEW',
    characters: 'REQUIRES_REVIEW',
    factions: 'REQUIRES_REVIEW',
    artifacts: 'REQUIRES_REVIEW',
    continuity_tags: 'REQUIRES_REVIEW',
    continuity_identity_ids: 'REQUIRES_REVIEW',
    studio_mode: 'REQUIRES_REVIEW',
    duration: record.duration ?? 'UNKNOWN',
    audio: 'REQUIRES_REVIEW',
    truth_state: 'REQUIRES_REVIEW',
    canon_status: 'REQUIRES_REVIEW',
    output_use: 'REQUIRES_REVIEW',
    rights_status: 'REQUIRES_REVIEW',
    created_at: 'UNKNOWN',
    provider_metadata: {
      import_surface: 'HIGGSFIELD_UI_HUMAN_VERIFIED',
      ingestion_method: 'HUMAN_VERIFIED_UI',
      review_eligibility: 'REVIEW_SEARCH_ONLY',
      generation_fallback: 'PROHIBITED',
      ...localEvidenceMetadata(evidence),
    },
  };
}

async function hashFile(path) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest('hex');
}

async function verifyLocalEvidence(record, baseDirectory) {
  if (!Object.hasOwn(record, 'local_path')) {
    return {
      provider_asset_id: record.provider_asset_id,
      status: 'NOT_SUPPLIED',
      local_path: 'UNAVAILABLE',
      sha256: 'UNAVAILABLE',
      size_bytes: null,
    };
  }
  const resolvedPath = isAbsolute(record.local_path)
    ? record.local_path
    : resolve(baseDirectory, record.local_path);
  let details;
  try {
    details = await stat(resolvedPath);
  } catch (error) {
    throw new TypeError(
      `Local file for ${record.provider_asset_id} is not readable: ${record.local_path} (${error.code ?? error.message}).`,
    );
  }
  if (!details.isFile()) {
    throw new TypeError(`Local path for ${record.provider_asset_id} is not a file: ${record.local_path}.`);
  }
  let sha256;
  try {
    sha256 = await hashFile(resolvedPath);
  } catch (error) {
    throw new TypeError(
      `Local file for ${record.provider_asset_id} cannot be hashed: ${record.local_path} (${error.code ?? error.message}).`,
    );
  }
  return {
    provider_asset_id: record.provider_asset_id,
    status: 'VERIFIED_LOCAL',
    local_path: record.local_path,
    sha256,
    size_bytes: details.size,
  };
}

function validateInbox(inbox) {
  const errors = validateAgainstSchema(inbox, inboxSchema);
  if (errors.length > 0) throw new TypeError(`Invalid Higgsfield inbox: ${errors.join(' ')}`);

  const seen = new Set();
  for (const record of inbox.records) {
    if (seen.has(record.provider_asset_id)) {
      throw new TypeError(`Duplicate provider_asset_id in import batch: ${record.provider_asset_id}.`);
    }
    seen.add(record.provider_asset_id);
    if (
      record.source_reference.kind === 'PROVIDER_ASSET_ID' &&
      record.source_reference.value !== record.provider_asset_id
    ) {
      throw new TypeError(`source_reference does not preserve provider_asset_id ${record.provider_asset_id}.`);
    }
  }
}

/** Merge UI-copied records into a vault manifest without deleting or promoting assets. */
export async function mergeInboxIntoManifest(inbox, manifest, options = {}) {
  validateInbox(inbox);
  const manifestErrors = validateAgainstSchema(manifest, manifestSchema);
  if (manifestErrors.length > 0) {
    throw new TypeError(`Invalid target Higgsfield vault manifest: ${manifestErrors.join(' ')}`);
  }

  for (const record of inbox.records) {
    if (record.project_id !== manifest.project_id) {
      throw new TypeError(`Record ${record.provider_asset_id} project_id does not match target manifest.`);
    }
  }

  const localEvidence = await Promise.all(
    inbox.records.map((record) =>
      verifyLocalEvidence(record, options.localPathBase ?? process.cwd()),
    ),
  );
  const evidenceByProviderId = new Map(
    localEvidence.map((evidence) => [evidence.provider_asset_id, evidence]),
  );

  const byProviderId = new Map(manifest.assets.map((asset) => [asset.provider_asset_id, structuredClone(asset)]));
  let insertedCount = 0;
  let updatedCount = 0;

  for (const record of inbox.records) {
    const existing = byProviderId.get(record.provider_asset_id);
    const evidence = evidenceByProviderId.get(record.provider_asset_id);
    if (existing) {
      for (const field of IMPORTABLE_FIELDS) {
        if (Object.hasOwn(record, field)) existing[field] = structuredClone(record[field]);
      }
      existing.provider_metadata = {
        ...(existing.provider_metadata ?? {}),
        import_surface: 'HIGGSFIELD_UI_HUMAN_VERIFIED',
        ingestion_method: 'HUMAN_VERIFIED_UI',
        review_eligibility: 'REVIEW_SEARCH_ONLY',
        generation_fallback: 'PROHIBITED',
        ...localEvidenceMetadata(evidence),
      };
      byProviderId.set(record.provider_asset_id, existing);
      updatedCount += 1;
    } else {
      byProviderId.set(record.provider_asset_id, unresolvedAsset(record, evidence));
      insertedCount += 1;
    }
  }

  const nextManifest = {
    ...structuredClone(manifest),
    ingestion_method: inbox.records.length > 0
      ? 'HUMAN_VERIFIED_UI'
      : manifest.ingestion_method,
    assets: [...byProviderId.values()].sort((left, right) =>
      left.asset_id.localeCompare(right.asset_id),
    ),
  };
  const imported = importVaultManifest(nextManifest, options);

  const receipt = {
    ...imported.receipt,
    ingestion_method: 'HUMAN_VERIFIED_UI',
    readiness_assessment: nextManifest.assets.length === 0
      ? 'EMPTY_REGISTERED'
      : 'REVIEW_SEARCH_ONLY',
    inbox_import: {
      batch_count: inbox.records.length,
      inserted_count: insertedCount,
      updated_count: updatedCount,
      deleted_count: 0,
      review_eligibility: 'REVIEW_SEARCH_ONLY',
      local_evidence: localEvidence.sort((left, right) =>
        left.provider_asset_id.localeCompare(right.provider_asset_id),
      ),
    },
  };
  const receiptErrors = validateAgainstSchema(receipt, receiptSchema);
  if (receiptErrors.length > 0) {
    throw new TypeError(`Invalid inbox ingestion receipt: ${receiptErrors.join(' ')}`);
  }

  return {
    manifest: nextManifest,
    assets: imported.assets,
    receipt,
    match_output: imported.match_output,
  };
}
