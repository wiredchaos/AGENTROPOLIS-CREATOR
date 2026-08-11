import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { matchScene, matchScenes } from './matcher.js';

const loadJson = async (relativePath) =>
  JSON.parse(await readFile(new URL(relativePath, import.meta.url), 'utf8'));

const scenes = await loadJson('../../data/story/test-scenes.json');
const assets = await loadJson('../../data/higgsfield/assets.fixture.json');

test('ranks a matching existing asset and explains every score dimension', () => {
  const result = matchScene(scenes[0], assets, { limit: 3 });
  assert.equal(result.result, 'MATCH_FOUND');
  assert.equal(result.matches[0].asset_id, 'fixture-neuro-grinder-surveillance-001');
  assert.equal(result.matches[0].reasons.length, 8);
  assert.equal(result.generation_fallback, 'PROHIBITED');
});

test('hard-rejects incompatible world, era, canon status, and output use', () => {
  const result = matchScene(scenes[1], assets, { limit: 10 });
  const neuroRejection = result.rejected.find(
    (entry) => entry.asset_id === 'fixture-neuro-grinder-surveillance-001',
  );
  const codes = new Set(neuroRejection.failures.map((failure) => failure.code));
  assert(codes.has('WORLD'));
  assert(codes.has('ERA'));

  const contestedRejection = result.rejected.find(
    (entry) => entry.asset_id === 'fixture-chrysantheum-contested-002',
  );
  assert(contestedRejection.failures.some((failure) => failure.code === 'CANON_STATUS'));
  assert(contestedRejection.failures.some((failure) => failure.code === 'OUTPUT_USE'));
});

test('reuses one source asset across outputs without copying source media', () => {
  const repeated = [
    scenes[0],
    { ...scenes[0], scene_id: 'TEST_NEURO_REUSE', output_use: 'GAMING_DISTRICT' },
  ];
  const batch = matchScenes(repeated, assets, { limit: 1 });
  assert.equal(batch.source_media_duplicated, false);
  assert.deepEqual(batch.reuse_map['fixture-neuro-grinder-surveillance-001'], [
    scenes[0].scene_id,
    'TEST_NEURO_REUSE',
  ]);
  assert(batch.results.every((result) => result.matches[0].reused_source_media));
});

test('returns a gap instead of invoking generation', () => {
  const impossible = {
    ...scenes[2],
    scene_id: 'TEST_NO_MATCH',
    world: 'UNREGISTERED_WORLD',
  };
  const result = matchScene(impossible, assets);
  assert.equal(result.result, 'NO_EXISTING_MATCH');
  assert.equal(result.matches.length, 0);
  assert.equal(result.generation_fallback, 'PROHIBITED');
});
