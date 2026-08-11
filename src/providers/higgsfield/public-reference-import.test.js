import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { mergePublicReferencesIntoManifest } from './public-reference-import.js';

const load = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const manifest = await load('../../../data/higgsfield/manifests/b619c13c-83ba-4ea3-b85c-de9be41bd01b.manifest.json');
const vaults = await load('../../../data/higgsfield/vaults.json');
const scenes = await load('../../../data/story/test-scenes.json');
const localPath = fileURLToPath(new URL('../../../data/higgsfield/inbox/pilot-import-template.json', import.meta.url));

function batch(record) {
  return { import_version: '1.0.0', provenance_class: 'HIGGSFIELD_PUBLIC_REFERENCE', records: [record] };
}

function publicRecord(overrides = {}) {
  return {
    vault_id: manifest.project_id,
    public_project_url: 'https://higgsfield.ai/@verified/projects/public-project',
    project_reference: { kind: 'PROJECT_SLUG', value: 'public-project' },
    media_type: 'IMAGE',
    local_path: localPath,
    author_attribution: 'Visible Public Author',
    model: 'UI-VERIFIED MODEL',
    size: '1920x1080',
    date: '2026-08-04T10:17:01Z',
    ...overrides,
  };
}

test('indexes a public reference with no provider_asset_id for review only', async () => {
  const result = await mergePublicReferencesIntoManifest(batch(publicRecord()), manifest, {
    ingestionTimestamp: '2026-08-10T00:00:00Z', vaults,
    sceneRequests: [{ ...structuredClone(scenes[0]), selection_mode: 'REVIEW_SEARCH' }],
  });
  assert.equal(result.manifest.assets[0].provider_asset_id, 'UNKNOWN');
  assert.match(result.manifest.assets[0].asset_id, /^higgsfield-public-/u);
  assert.equal(result.assets[0].provider_metadata.provenance_class, 'HIGGSFIELD_PUBLIC_REFERENCE');
  assert.equal(result.assets[0].provider_metadata.author_attribution, 'Visible Public Author');
  assert.match(result.assets[0].provider_metadata.local_sha256, /^[a-f0-9]{64}$/u);
  assert.equal(result.assets[0].rights.rights_state, 'REVIEW_REQUIRED');
  assert.equal(result.receipt.readiness_assessment, 'REVIEW_SEARCH_ONLY');
  assert.equal(result.receipt.public_reference_import.provider_asset_id_unknown_count, 1);
  assert.equal(result.match_output.results[0].result, 'MATCH_FOUND');
});

test('accepts a directly verified remote media reference without a local path', async () => {
  const record = publicRecord({
    local_path: undefined,
    remote_media_reference: {
      kind: 'SANITIZED_URL',
      value: 'https://cdn.higgsfield.ai/verified/public-media.webp',
      contains_secrets: false,
    },
  });
  delete record.local_path;
  const result = await mergePublicReferencesIntoManifest(batch(record), manifest, {
    ingestionTimestamp: '2026-08-10T00:00:00Z',
  });
  assert.equal(result.manifest.assets[0].source_reference.value, record.remote_media_reference.value);
  assert(result.receipt.source_references.includes(record.public_project_url));
});

test('rejects public references with neither local hash evidence nor remote media reference', async () => {
  const record = publicRecord();
  delete record.local_path;
  await assert.rejects(mergePublicReferencesIntoManifest(batch(record), manifest), /Invalid Higgsfield public-reference import/);
});

test('fails final production closed for public references with unresolved rights', async () => {
  const result = await mergePublicReferencesIntoManifest(batch(publicRecord()), manifest, {
    vaults,
    sceneRequests: [{ ...structuredClone(scenes[0]), selection_mode: 'FINAL_PRODUCTION' }],
  });
  assert.equal(result.match_output.results[0].result, 'NO_EXISTING_MATCH');
  assert.equal(result.receipt.generation_fallback, 'PROHIBITED');
});
