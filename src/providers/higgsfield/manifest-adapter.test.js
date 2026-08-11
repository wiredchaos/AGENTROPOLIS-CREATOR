import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assetSchema from '../../../data/higgsfield/assets.schema.json' with { type: 'json' };
import receiptSchema from '../../../data/higgsfield/receipts/manifest-ingestion-receipt.schema.json' with { type: 'json' };
import matchOutputSchema from '../../../data/story/match-output.schema.json' with { type: 'json' };
import { validateAgainstSchema } from '../../story-engine/schema-validator.js';
import { importVaultManifest } from './manifest-adapter.js';

const loadJson = async (relativePath) =>
  JSON.parse(await readFile(new URL(relativePath, import.meta.url), 'utf8'));

const projectId = 'b619c13c-83ba-4ea3-b85c-de9be41bd01b';
const starter = await loadJson(
  '../../../data/higgsfield/manifests/b619c13c-83ba-4ea3-b85c-de9be41bd01b.manifest.json',
);
const vaults = await loadJson('../../../data/higgsfield/vaults.json');
const fixtureScenes = await loadJson('../../../data/story/test-scenes.json');
const clone = (value) => structuredClone(value);

const annotation = (id, label = id) => ({
  id,
  label,
  confidence: 1,
  provenance: 'HUMAN_REVIEW',
});

function minimalAsset(overrides = {}) {
  return {
    asset_id: 'manifest-existing-asset-001',
    provider: 'HIGGSFIELD',
    provider_asset_id: 'provider-existing-asset-001',
    project_id: projectId,
    source_reference: {
      kind: 'PROVIDER_ASSET_ID',
      value: 'provider-existing-asset-001',
      contains_secrets: false,
    },
    media_type: 'UNKNOWN',
    ...overrides,
  };
}

function reviewedAsset(overrides = {}) {
  return minimalAsset({
    media_type: 'VIDEO',
    filename: 'existing-provider-file.mp4',
    title: 'Existing reviewed provider asset',
    description: 'Existing content; description supplied by manifest author.',
    tags: ['existing-content'],
    world: annotation('NEURO_TOKYO_2090', 'NEURO TOKYO 2090'),
    era: annotation('2090'),
    location: annotation('PORT_DISTRICT', 'PORT DISTRICT'),
    characters: [annotation('GRINDER_RUNNER_01')],
    factions: [annotation('GRINDER')],
    artifacts: [],
    continuity_tags: ['faction:grinder', 'location:port-district'],
    continuity_identity_ids: ['GRINDER_RUNNER_01'],
    studio_mode: 'GRINDER_NEURO_TOKYO_2090',
    duration: 12,
    audio: {
      present: false,
      transcript: null,
      language: null,
      speaker_ids: [],
      music: false,
      effects: true,
      rights_review: 'APPROVED',
    },
    truth_state: 'AUTHOR_DECLARED',
    canon_status: { 'MANIFEST:TEST-CLAIM': 'AUTHOR_DECLARED_CANON' },
    output_use: {
      interactive_branch: 'ELIGIBLE',
      atv_episode: 'ELIGIBLE',
      kol_social: 'ELIGIBLE',
      gaming_district: 'ELIGIBLE',
    },
    rights_status: {
      state: 'APPROVED',
      allowed_production_uses: [
        'EDITORIAL_REVIEW',
        'FILM_MASTER',
        'INTERACTIVE_BRANCH',
        'ATV_EPISODE',
        'KOL_SOCIAL',
        'GAMING_DISTRICT',
      ],
      derivative_edit_eligibility: 'ELIGIBLE',
      distribution_eligibility: 'ELIGIBLE',
      provenance_references: ['HUMAN-RIGHTS-REVIEW-TEST'],
    },
    created_at: '2026-08-10T00:00:00Z',
    provider_metadata: { supplied_by: 'TEST_MANIFEST' },
    ...overrides,
  });
}

function manifestWith(...assets) {
  return { ...clone(starter), assets };
}

function sceneFor(selectionMode) {
  return { ...clone(fixtureScenes[0]), selection_mode: selectionMode };
}

test('imports an empty valid vault without fabricating assets', () => {
  const result = importVaultManifest(starter, { ingestionTimestamp: '2026-08-10T00:00:00Z' });
  assert.deepEqual(result.assets, []);
  assert.equal(result.receipt.asset_count, 0);
  assert.equal(result.receipt.pagination_count, 1);
  assert.equal(result.receipt.readiness_assessment, 'EMPTY_REGISTERED');
  assert.equal(result.receipt.generation_fallback, 'PROHIBITED');
});

test('normalizes a valid reviewed asset into the canonical asset schema', () => {
  const result = importVaultManifest(manifestWith(reviewedAsset()), {
    ingestionTimestamp: '2026-08-10T00:00:00Z',
  });
  assert.deepEqual(validateAgainstSchema(result.assets[0], assetSchema), []);
  assert.deepEqual(validateAgainstSchema(result.receipt, receiptSchema), []);
  assert.equal(result.assets[0].vault_id, projectId);
  assert.equal(result.assets[0]['source_url/reference'].value, 'provider-existing-asset-001');
  assert.equal(result.assets[0].provider_metadata.ingestion_method, 'VAULT_MANIFEST');
  assert.equal(result.receipt.ingestion_surface, 'USER_CONTROLLED_JSON_MANIFEST');
  assert.equal(result.receipt.readiness_assessment, 'MATCH_READY_CANDIDATE');
});

test('rejects duplicate local or provider stable IDs', () => {
  const first = reviewedAsset();
  const duplicateLocal = reviewedAsset({ provider_asset_id: 'provider-existing-asset-002' });
  duplicateLocal.source_reference.value = duplicateLocal.provider_asset_id;
  assert.throws(() => importVaultManifest(manifestWith(first, duplicateLocal)), /Duplicate stable asset ID/);

  const duplicateProvider = reviewedAsset({ asset_id: 'manifest-existing-asset-002' });
  assert.throws(() => importVaultManifest(manifestWith(first, duplicateProvider)), /Duplicate stable asset ID/);
});

test('preserves missing optional metadata as explicit unresolved state', () => {
  const result = importVaultManifest(manifestWith(minimalAsset()));
  const asset = result.assets[0];
  assert.equal(asset.media_type, 'UNKNOWN');
  assert.equal(asset.world, null);
  assert.deepEqual(asset.characters, []);
  assert.equal(asset.truth_state, 'UNREVIEWED');
  assert.equal(asset.rights.rights_state, 'UNKNOWN');
  assert(asset.provider_metadata.manifest_unresolved_fields.includes('world'));
  assert(result.receipt.unknown_metadata_fields.includes(`${asset.asset_id}.world`));
});

test('rejects a manifest that fails its JSON Schema', () => {
  const invalid = manifestWith(minimalAsset());
  delete invalid.assets[0].source_reference;
  assert.throws(() => importVaultManifest(invalid), /Invalid Higgsfield vault manifest/);
});

test('records unresolved rights and fails them closed for final production', () => {
  const manifest = manifestWith(reviewedAsset({ rights_status: 'REQUIRES_REVIEW' }));
  const result = importVaultManifest(manifest, {
    vaults,
    sceneRequests: [sceneFor('FINAL_PRODUCTION')],
  });
  assert.equal(result.receipt.rights_review_count, 1);
  const codes = result.match_output.results[0].rejected[0].failures.map(({ code }) => code);
  assert(codes.includes('RIGHTS_ELIGIBILITY'));
  assert.equal(result.match_output.generation_fallback, 'PROHIBITED');
});

test('records unresolved canon and rejects final production matching', () => {
  const manifest = manifestWith(reviewedAsset({ canon_status: 'UNKNOWN' }));
  const result = importVaultManifest(manifest, {
    vaults,
    sceneRequests: [sceneFor('FINAL_PRODUCTION')],
  });
  const codes = result.match_output.results[0].rejected[0].failures.map(({ code }) => code);
  assert(codes.includes('CANON_STATUS'));
  assert.equal(result.receipt.canon_review_count, 1);
  assert.equal(result.receipt.readiness_assessment, 'REVIEW_SEARCH_ONLY');
});

test('indexes unresolved manifest metadata for REVIEW_SEARCH only', () => {
  const result = importVaultManifest(manifestWith(minimalAsset()), {
    vaults,
    sceneRequests: [sceneFor('REVIEW_SEARCH')],
  });
  assert.equal(result.match_output.results[0].result, 'MATCH_FOUND');
  assert.deepEqual(validateAgainstSchema(result.match_output, matchOutputSchema), []);
  assert.equal(result.match_output.results[0].matches[0].rights_eligibility.final_selection_eligible, false);
  assert.equal(result.receipt.readiness_assessment, 'REVIEW_SEARCH_ONLY');

  const knownWrongWorld = reviewedAsset({ world: annotation('OTHER_WORLD') });
  const rejected = importVaultManifest(manifestWith(knownWrongWorld), {
    vaults,
    sceneRequests: [sceneFor('REVIEW_SEARCH')],
  });
  assert(
    rejected.match_output.results[0].rejected[0].failures.some(({ code }) => code === 'WORLD'),
  );
});

test('rejects unresolved manifest metadata for FINAL_PRODUCTION', () => {
  const result = importVaultManifest(manifestWith(minimalAsset()), {
    vaults,
    sceneRequests: [sceneFor('FINAL_PRODUCTION')],
  });
  assert.equal(result.match_output.results[0].result, 'NO_EXISTING_MATCH');
  const codes = new Set(
    result.match_output.results[0].rejected[0].failures.map(({ code }) => code),
  );
  assert(codes.has('VAULT_READINESS'));
  assert(codes.has('CANON_STATUS'));
  assert(codes.has('IDENTITY_COMPATIBILITY'));
  assert(codes.has('RIGHTS_ELIGIBILITY'));
});

test('re-indexes deterministically and never exposes generation fallback', () => {
  const firstAsset = reviewedAsset();
  const secondAsset = reviewedAsset({
    asset_id: 'manifest-existing-asset-002',
    provider_asset_id: 'provider-existing-asset-002',
    source_reference: {
      kind: 'PROVIDER_ASSET_ID',
      value: 'provider-existing-asset-002',
      contains_secrets: false,
    },
  });
  const manifest = manifestWith(firstAsset, secondAsset);
  const first = importVaultManifest(manifest, { ingestionTimestamp: '2026-08-10T00:00:00Z' });
  const second = importVaultManifest(manifestWith(secondAsset, firstAsset), {
    ingestionTimestamp: '2026-08-11T00:00:00Z',
  });
  assert.deepEqual(first.assets, second.assets);
  assert.equal(first.receipt.index_fingerprint, second.receipt.index_fingerprint);
  assert.equal(first.receipt.generation_fallback, 'PROHIBITED');
  assert.equal(second.receipt.generation_fallback, 'PROHIBITED');
});
