import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import inboxSchema from '../../../data/higgsfield/inbox/higgsfield-ui-import.schema.json' with { type: 'json' };
import receiptSchema from '../../../data/higgsfield/receipts/manifest-ingestion-receipt.schema.json' with { type: 'json' };
import { validateAgainstSchema } from '../../story-engine/schema-validator.js';
import { mergeInboxIntoManifest } from './inbox-import.js';

const loadJson = async (relativePath) =>
  JSON.parse(await readFile(new URL(relativePath, import.meta.url), 'utf8'));
const projectId = 'b619c13c-83ba-4ea3-b85c-de9be41bd01b';
const starter = await loadJson(
  '../../../data/higgsfield/manifests/b619c13c-83ba-4ea3-b85c-de9be41bd01b.manifest.json',
);
const template = await loadJson('../../../data/higgsfield/inbox/import-template.json');
const vaults = await loadJson('../../../data/higgsfield/vaults.json');
const scenes = await loadJson('../../../data/story/test-scenes.json');

function record(id, overrides = {}) {
  return {
    provider_asset_id: id,
    project_id: projectId,
    source_reference: {
      kind: 'SANITIZED_URL',
      value: `https://placeholder.invalid/${id}?literal=value`,
      contains_secrets: false,
    },
    media_type: 'VIDEO',
    ...overrides,
  };
}

const timestamp = { ingestionTimestamp: '2026-08-10T00:00:00Z' };
const pilotTemplatePath = fileURLToPath(
  new URL('../../../data/higgsfield/inbox/pilot-import-template.json', import.meta.url),
);
const inbox = (...records) => ({
  import_version: '1.0.0',
  ingestion_method: 'HUMAN_VERIFIED_UI',
  records,
});

test('checked-in empty inbox template is schema-valid', () => {
  assert.deepEqual(validateAgainstSchema(template, inboxSchema), []);
});

test('imports a minimum record with exact source reference and unresolved review states', async () => {
  const supplied = record('provider-asset-001');
  const result = await mergeInboxIntoManifest(inbox(supplied), starter, timestamp);
  const imported = result.manifest.assets[0];
  assert.deepEqual(imported.source_reference, supplied.source_reference);
  assert.equal(imported.canon_status, 'REQUIRES_REVIEW');
  assert.equal(imported.continuity_tags, 'REQUIRES_REVIEW');
  assert.equal(imported.characters, 'REQUIRES_REVIEW');
  assert.equal(imported.rights_status, 'REQUIRES_REVIEW');
  assert.equal(imported.output_use, 'REQUIRES_REVIEW');
  assert.equal(imported.provider_metadata.generation_fallback, 'PROHIBITED');
  assert.equal(imported.provider_metadata.ingestion_method, 'HUMAN_VERIFIED_UI');
  assert.equal(imported.provider_metadata.review_eligibility, 'REVIEW_SEARCH_ONLY');
  assert.equal(result.receipt.ingestion_method, 'HUMAN_VERIFIED_UI');
  assert.equal(result.receipt.readiness_assessment, 'REVIEW_SEARCH_ONLY');
  assert.equal(result.receipt.inbox_import.deleted_count, 0);
  assert.deepEqual(validateAgainstSchema(result.receipt, receiptSchema), []);
});

test('new records are searchable for review but fail closed for final production', async () => {
  const batch = inbox(record('provider-asset-001'));
  const reviewImport = await mergeInboxIntoManifest(batch, starter, {
    ...timestamp,
    vaults,
    sceneRequests: [{ ...structuredClone(scenes[0]), selection_mode: 'REVIEW_SEARCH' }],
  });
  assert.equal(reviewImport.assets.length, 1);
  assert.equal(reviewImport.match_output.results[0].result, 'MATCH_FOUND');

  const finalImport = await mergeInboxIntoManifest(batch, starter, {
    ...timestamp,
    vaults,
    sceneRequests: [{ ...structuredClone(scenes[0]), selection_mode: 'FINAL_PRODUCTION' }],
  });
  assert.equal(finalImport.match_output.results[0].result, 'NO_EXISTING_MATCH');
  assert.equal(finalImport.assets[0].rights.rights_state, 'REVIEW_REQUIRED');
  assert.equal(finalImport.receipt.readiness_assessment, 'REVIEW_SEARCH_ONLY');
});

test('rejects duplicate provider IDs in a batch before merging', async () => {
  await assert.rejects(
    mergeInboxIntoManifest(inbox(record('same-id'), record('same-id')), starter),
    /Duplicate provider_asset_id/,
  );
});

test('supports deterministic batch append without deleting existing assets', async () => {
  const first = record('provider-asset-001');
  const second = record('provider-asset-002');
  const one = await mergeInboxIntoManifest(inbox(first, second), starter, timestamp);
  const two = await mergeInboxIntoManifest(inbox(second, first), starter, timestamp);
  assert.deepEqual(one.manifest, two.manifest);
  assert.equal(one.manifest.assets.length, 2);
  assert.equal(one.receipt.index_fingerprint, two.receipt.index_fingerprint);

  const third = await mergeInboxIntoManifest(
    inbox(record('provider-asset-003')),
    one.manifest,
    timestamp,
  );
  assert.equal(third.manifest.assets.length, 3);
  assert.equal(third.receipt.inbox_import.deleted_count, 0);
});

test('updates by provider ID while retaining stable ID and reviewed fields', async () => {
  const initial = await mergeInboxIntoManifest(
    inbox(record('provider-asset-001')),
    starter,
    timestamp,
  );
  initial.manifest.assets[0].canon_status = { 'HUMAN:REVIEW': 'SOURCE_CANON' };
  initial.manifest.assets[0].characters = [];
  const stableId = initial.manifest.assets[0].asset_id;
  const newReference = {
    kind: 'PROVIDER_PROJECT_REFERENCE',
    value: 'EXACT_REPLACEMENT_REFERENCE',
    contains_secrets: false,
  };
  const updated = await mergeInboxIntoManifest(
    inbox(record('provider-asset-001', { title: 'Verified title', source_reference: newReference })),
    initial.manifest,
    timestamp,
  );
  assert.equal(updated.manifest.assets.length, 1);
  assert.equal(updated.manifest.assets[0].asset_id, stableId);
  assert.equal(updated.manifest.assets[0].title, 'Verified title');
  assert.deepEqual(updated.manifest.assets[0].source_reference, newReference);
  assert.deepEqual(updated.manifest.assets[0].canon_status, { 'HUMAN:REVIEW': 'SOURCE_CANON' });
  assert.equal(updated.receipt.inbox_import.updated_count, 1);
});

test('verifies a supplied local file and records its SHA-256 without changing its path', async () => {
  const result = await mergeInboxIntoManifest(
    inbox(record('provider-asset-001', { local_path: pilotTemplatePath })),
    starter,
    timestamp,
  );
  const expected = createHash('sha256')
    .update(await readFile(pilotTemplatePath))
    .digest('hex');
  const evidence = result.receipt.inbox_import.local_evidence[0];
  assert.equal(evidence.status, 'VERIFIED_LOCAL');
  assert.equal(evidence.local_path, pilotTemplatePath);
  assert.equal(evidence.sha256, expected);
  assert.equal(result.manifest.assets[0].provider_metadata.local_sha256, expected);
});

test('rejects a supplied local path that is missing', async () => {
  await assert.rejects(
    mergeInboxIntoManifest(
      inbox(record('provider-asset-001', { local_path: '/definitely/missing/pilot-asset.bin' })),
      starter,
    ),
    /is not readable/,
  );
});

test('rejects invalid records and project mismatch', async () => {
  const missingRequired = record('provider-asset-001');
  delete missingRequired.source_reference;
  await assert.rejects(
    mergeInboxIntoManifest(inbox(missingRequired), starter),
    /Invalid Higgsfield inbox/,
  );
  await assert.rejects(
    mergeInboxIntoManifest(
      inbox(record('provider-asset-001', { project_id: '11111111-1111-4111-8111-111111111111' })),
      starter,
    ),
    /does not match target manifest/,
  );
});
