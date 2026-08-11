import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { buildFixtureReceipt } from './fixture-receipt.js';
import { matchScene, matchScenes } from './matcher.js';
import { validateAgainstSchema } from './schema-validator.js';
import { SCORE_WEIGHTS } from './types.js';
import matchOutputSchema from '../../data/story/match-output.schema.json' with { type: 'json' };

const loadJson = async (relativePath) =>
  JSON.parse(await readFile(new URL(relativePath, import.meta.url), 'utf8'));

const scenes = await loadJson('../../data/story/test-scenes.json');
const assets = await loadJson('../../data/higgsfield/assets.fixture.json');
const vaults = await loadJson('../../data/higgsfield/vaults.json');
const recordedOutput = await loadJson('../../data/story/test-scene-match-output.json');
const options = { vaults };

const clone = (value) => structuredClone(value);
const rejectionCodes = (scene, asset, matcherOptions = options) =>
  matchScene(scene, [asset], matcherOptions).rejected[0]?.failures.map(({ code }) => code) ?? [];

function asRealAsset(asset = assets[0]) {
  const real = clone(asset);
  real.asset_id = 'real-provider-asset-001';
  real.vault_id = 'b619c13c-83ba-4ea3-b85c-de9be41bd01b';
  real['source_url/reference'].value = real.asset_id;
  real.provider_metadata.fixture = false;
  real.rights.source_provider = 'higgsfield';
  real.rights.source_asset_reference_id = real.asset_id;
  real.rights.provenance_references = ['PROVIDER-ENUMERATION-RECEIPT'];
  return real;
}

function withRealVaultReady() {
  const registry = clone(vaults);
  const realVault = registry.vaults.find(({ provider }) => provider === 'higgsfield');
  realVault.readiness_status = 'MATCH_READY';
  realVault.inspection_status = 'ENUMERATED_METADATA_ONLY';
  realVault.readiness_evidence = {
    enumeration_complete: true,
    normalization_complete: true,
    schema_validation_complete: true,
    assets_available: true,
    receipt_references: ['TEST-ENUMERATION-RECEIPT'],
  };
  return registry;
}

test('ranks a matching fixture with the documented ten scoring dimensions', () => {
  const result = matchScene(scenes[0], assets, { ...options, limit: 3 });
  assert.equal(result.result, 'MATCH_FOUND');
  assert.equal(result.matches[0].asset_id, 'fixture-neuro-grinder-surveillance-001');
  assert.equal(result.matches[0].score_dimensions.length, 10);
  assert.deepEqual(
    Object.fromEntries(
      result.matches[0].score_dimensions.map(({ dimension, weight }) => [dimension, weight]),
    ),
    SCORE_WEIGHTS,
  );
  assert.equal(Object.values(SCORE_WEIGHTS).reduce((sum, weight) => sum + weight, 0), 1);
  assert.equal(result.matches[0].rights_eligibility.final_selection_eligible, false);
  assert.equal(result.generation_fallback, 'PROHIBITED');
});

test('hard-rejects an asset that fails the checked-in asset schema', () => {
  const asset = clone(assets[0]);
  delete asset.media_type;
  assert.deepEqual(rejectionCodes(scenes[0], asset), ['ASSET_SCHEMA']);
});

test('requires MATCH_READY for production and explicit readiness for fixture mode', () => {
  const productionScene = { ...clone(scenes[0]), selection_mode: 'FINAL_PRODUCTION' };
  const real = asRealAsset();
  assert(rejectionCodes(productionScene, real).includes('VAULT_READINESS'));
  const statusOnly = clone(vaults);
  statusOnly.vaults.find(({ provider }) => provider === 'higgsfield').readiness_status = 'MATCH_READY';
  assert(
    rejectionCodes(productionScene, real, { vaults: statusOnly }).includes('VAULT_READINESS'),
  );
  assert.equal(
    matchScene(productionScene, [real], { vaults: withRealVaultReady() }).result,
    'MATCH_FOUND',
  );
  assert(rejectionCodes(productionScene, assets[0]).includes('VAULT_READINESS'));
  assert(rejectionCodes(scenes[0], assets[0], { vaults: [] }).includes('VAULT_READINESS'));
});

test('hard-rejects ineligible output use', () => {
  const asset = clone(assets[0]);
  asset.atv_episode_eligibility.status = 'REVIEW_REQUIRED';
  assert(rejectionCodes(scenes[0], asset).includes('OUTPUT_USE'));
});

test('hard-rejects incompatible canon status', () => {
  const asset = clone(assets[0]);
  asset.canon_status = { test: 'CONTESTED_CANON' };
  assert(rejectionCodes(scenes[0], asset).includes('CANON_STATUS'));
});

test('hard-rejects incompatible world', () => {
  const asset = clone(assets[0]);
  asset.world = { ...asset.world, id: 'OTHER', label: 'OTHER' };
  assert(rejectionCodes(scenes[0], asset).includes('WORLD'));
});

test('hard-rejects incompatible era', () => {
  const asset = clone(assets[0]);
  asset.era = { ...asset.era, id: 'OTHER', label: 'OTHER' };
  assert(rejectionCodes(scenes[0], asset).includes('ERA'));
});

test('hard-rejects incompatible location', () => {
  const asset = clone(assets[0]);
  asset.location = { ...asset.location, id: 'OTHER', label: 'OTHER' };
  assert(rejectionCodes(scenes[0], asset).includes('LOCATION'));
});

test('hard-rejects incompatible studio mode', () => {
  const asset = clone(assets[0]);
  asset.studio_mode = '789_STUDIOS';
  assert(rejectionCodes(scenes[0], asset).includes('STUDIO_MODE'));
});

test('hard-rejects explicit canonical character, faction, artifact, and continuity identities', () => {
  const scene = clone(scenes[0]);
  scene.identity_requirements = {
    canonical_character_ids: ['WRONG_CHARACTER'],
    canonical_faction_ids: ['WRONG_FACTION'],
    canonical_artifact_ids: ['REQUIRED_ARTIFACT'],
    continuity_locked_identity_ids: ['LOCKED_IDENTITY'],
  };
  assert(rejectionCodes(scene, assets[0]).includes('IDENTITY_COMPATIBILITY'));
});

test('hard-rejects missing required and present forbidden continuity tags', () => {
  const asset = clone(assets[0]);
  asset.continuity_tags = ['continuity:forbidden'];
  assert(rejectionCodes(scenes[0], asset).includes('CONTINUITY'));
});

test('hard-rejects assets outside required duration constraints', () => {
  const asset = clone(assets[0]);
  asset.duration = 5;
  assert(rejectionCodes(scenes[0], asset).includes('DURATION'));

  const segmented = clone(assets[0]);
  segmented.segment = { start_seconds: 0, end_seconds: 12 };
  const noSegments = clone(scenes[0]);
  noSegments.duration_requirement.segment_allowed = false;
  assert(rejectionCodes(noSegments, segmented).includes('DURATION'));
});

test('hard-rejects disallowed truth states', () => {
  const asset = clone(assets[0]);
  asset.truth_state = 'CONTESTED';
  assert(rejectionCodes(scenes[0], asset).includes('TRUTH_STATE'));
});

test('hard-rejects required audio presence, dialogue, speakers, and rights failures', () => {
  const required = clone(scenes[0]);
  required.audio_requirement = {
    mode: 'REQUIRED',
    exact_dialogue: 'exact line',
    speaker_ids: ['SPEAKER_1'],
    rights_approval_required: true,
  };
  const failingAssets = [
    assets[0],
    {
      ...clone(assets[0]),
      dialogue_or_audio: {
        ...clone(assets[0].dialogue_or_audio),
        present: true,
        transcript: 'wrong line',
        speaker_ids: ['SPEAKER_1'],
      },
    },
    {
      ...clone(assets[0]),
      dialogue_or_audio: {
        ...clone(assets[0].dialogue_or_audio),
        present: true,
        transcript: 'exact line',
        speaker_ids: [],
      },
    },
    {
      ...clone(assets[0]),
      dialogue_or_audio: {
        ...clone(assets[0].dialogue_or_audio),
        present: true,
        transcript: 'exact line',
        speaker_ids: ['SPEAKER_1'],
        rights_review: 'REVIEW_REQUIRED',
      },
    },
  ];
  for (const asset of failingAssets) assert(rejectionCodes(required, asset).includes('AUDIO'));

  const prohibitedDialogue = clone(assets[0]);
  prohibitedDialogue.dialogue_or_audio.transcript = 'unexpected dialogue';
  assert(rejectionCodes(scenes[0], prohibitedDialogue).includes('AUDIO'));
});

test('hard-rejects unresolved or inconsistent source provenance', () => {
  const asset = clone(assets[0]);
  asset['source_url/reference'] = { kind: 'UNKNOWN', value: null, contains_secrets: false };
  assert(rejectionCodes(scenes[0], asset).includes('SOURCE_PROVENANCE'));

  const disguisedFixture = clone(assets[0]);
  disguisedFixture.provider_metadata.fixture = false;
  assert(rejectionCodes(scenes[0], disguisedFixture).includes('SOURCE_PROVENANCE'));
});

test('hard-rejects unknown, restricted, or insufficient rights for final selection', () => {
  const mutations = [
    (asset) => { asset.rights.rights_state = 'UNKNOWN'; },
    (asset) => { asset.rights.rights_state = 'RESTRICTED'; },
    (asset) => { asset.rights.allowed_production_uses = ['EDITORIAL_REVIEW']; },
    (asset) => { asset.rights.derivative_edit_eligibility = 'UNKNOWN'; },
    (asset) => { asset.rights.distribution_eligibility = 'INELIGIBLE'; },
  ];
  for (const mutate of mutations) {
    const asset = clone(assets[0]);
    mutate(asset);
    assert(rejectionCodes(scenes[0], asset).includes('RIGHTS_ELIGIBILITY'));
  }
});

test('keeps unknown-rights real assets searchable only in review mode', () => {
  const asset = asRealAsset();
  asset.rights.rights_state = 'UNKNOWN';
  asset.rights.allowed_production_uses = [];
  asset.rights.derivative_edit_eligibility = 'UNKNOWN';
  asset.rights.distribution_eligibility = 'UNKNOWN';
  const reviewScene = { ...clone(scenes[0]), selection_mode: 'REVIEW_SEARCH' };
  const result = matchScene(reviewScene, [asset], options);
  assert.equal(result.result, 'MATCH_FOUND');
  assert.equal(result.matches[0].rights_eligibility.final_selection_eligible, false);
});

test('rejects scene requests that fail the checked-in scene schema', () => {
  const scene = clone(scenes[0]);
  delete scene.output_use;
  assert.throws(() => matchScene(scene, assets, options), /Invalid scene request/);
});

test('reuses one source asset across outputs without copying source media', () => {
  const repeated = [
    scenes[0],
    { ...scenes[0], scene_id: 'TEST_NEURO_REUSE', output_use: 'GAMING_DISTRICT' },
  ];
  const batch = matchScenes(repeated, assets, { ...options, limit: 1 });
  assert.equal(batch.source_media_duplicated, false);
  assert.deepEqual(batch.reuse_map['fixture-neuro-grinder-surveillance-001'], [
    scenes[0].scene_id,
    'TEST_NEURO_REUSE',
  ]);
  assert(batch.results.every((result) => result.matches[0].reused_source_media));
});

test('returns a gap instead of invoking generation', () => {
  const impossible = { ...scenes[2], scene_id: 'TEST_NO_MATCH', world: 'UNREGISTERED_WORLD' };
  const result = matchScene(impossible, assets, options);
  assert.equal(result.result, 'NO_EXISTING_MATCH');
  assert.equal(result.matches.length, 0);
  assert.equal(result.generation_fallback, 'PROHIBITED');
});

test('recorded fixture output exactly matches a fresh deterministic run', () => {
  assert.deepEqual(recordedOutput, buildFixtureReceipt(matchScenes(scenes, assets, options)));
});

test('recorded fixture output validates against the formal output schema', () => {
  assert.deepEqual(validateAgainstSchema(recordedOutput, matchOutputSchema), []);
});
