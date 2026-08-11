import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import vaults from '../../../data/higgsfield/vaults.json' with { type: 'json' };
import scenes from '../../../data/story/test-scenes.json' with { type: 'json' };
import { parseReferenceTag } from '../../director/reference-tags.js';
import { filterEligibleAssets } from '../../story-engine/filters.js';
import { matchScene } from '../../story-engine/matcher.js';
import { ingestLocalArchive, ZEPHYR_VAULT_ID } from './local-asset-adapter.js';

function png(width, height, salt) {
  const buffer = Buffer.alloc(25);
  buffer.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], 0);
  buffer.writeUInt32BE(13, 8);
  buffer.write('IHDR', 12, 'ascii');
  buffer.writeUInt32BE(width, 16);
  buffer.writeUInt32BE(height, 20);
  buffer[24] = salt;
  return buffer;
}

async function withArchive(run, filenames = [
  'Mira.png', 'Mira in cockpit.png', "Mira's mech.png",
  'Main hangar.png', 'Lightstick.png',
]) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'zephyr-local-adapter-'));
  try {
    await Promise.all(filenames.map((filename, index) => writeFile(path.join(root, filename), png(100 + index, 200 + index, index))));
    await writeFile(path.join(root, '.DS_Store'), 'metadata');
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

const semanticFilenames = [
  'Mira.png', 'Mira in cockpit.png', "Mira's mech.png",
  'Naomi.png', "Naomi's mech.png", "Naomi's room.png",
  'Haru Min.png', 'City 1.png', 'Lightstick.png',
];

function reviewScene(overrides = {}) {
  return {
    ...structuredClone(scenes[0]),
    scene_id: 'TEST_ZEPHYR_REVIEW_SEARCH',
    selection_mode: 'REVIEW_SEARCH',
    required_characters: [],
    required_factions: [],
    identity_requirements: {
      canonical_character_ids: [],
      canonical_faction_ids: [],
      canonical_artifact_ids: [],
      continuity_locked_identity_ids: [],
    },
    required_continuity_tags: [],
    forbidden_continuity_tags: [],
    ...overrides,
  };
}

test('indexes verified local evidence without inventing provider, project, Soul, or review metadata', async () => {
  await withArchive(async (root) => {
    const before = await readFile(path.join(root, 'Mira.png'));
    const result = ingestLocalArchive(root, { ingestionTimestamp: '2026-08-11T20:39:41.000Z' });
    const after = await readFile(path.join(root, 'Mira.png'));
    assert.deepEqual(after, before);
    assert.equal(result.manifest.assets.length, 5);
    assert.deepEqual(result.excluded, ['.DS_Store']);
    assert.equal(result.receipt.schema_valid_count, 5);
    assert.equal(result.receipt.schema_invalid_count, 0);
    assert.equal(result.receipt.readiness_assessment, 'LOCAL_INDEX_READY');
    for (const asset of result.manifest.assets) {
      assert.equal(asset.provider_asset_id, 'UNKNOWN');
      assert.equal(asset.project_id, 'UNKNOWN');
      assert.equal(asset.soul_id, 'UNKNOWN');
      assert.equal(asset.review_eligibility, 'REVIEW_SEARCH_ONLY');
      assert.equal(asset.generation_fallback, 'PROHIBITED');
      assert.equal(asset.metadata_basis, 'FILENAME_DERIVED');
      assert.equal(asset.provisional_reference_tag, asset.reference_tag);
      assert.match(asset.sha256, /^[a-f0-9]{64}$/u);
      assert.ok(asset.dimensions.width > 0 && asset.dimensions.height > 0);
      assert.equal(parseReferenceTag(asset.reference_tag).scene_scope, null);
      assert.equal(parseReferenceTag(asset.reference_tag).version, null);
    }
  });
});

test('normalizes filename-derived review fields with a non-truth provenance boundary', async () => {
  await withArchive(async (root) => {
    const result = ingestLocalArchive(root);
    const cockpit = result.normalizedAssets.find((asset) => asset.provider_metadata.filename === 'Mira in cockpit.png');
    assert.deepEqual(cockpit.production_role, { value: 'CHARACTER_STATE', metadata_basis: 'FILENAME_DERIVED' });
    assert.deepEqual(cockpit.local_character_family, { value: 'Mira', metadata_basis: 'FILENAME_DERIVED' });
    assert.deepEqual(cockpit.variant_labels, { values: ['cockpit'], metadata_basis: 'FILENAME_DERIVED' });
    assert.deepEqual(cockpit.provisional_reference_tag, {
      value: '@char_ZEPHYR_Mira_cockpit', metadata_basis: 'FILENAME_DERIVED',
    });
    assert.equal(cockpit.provider_metadata.canon, 'REQUIRES_REVIEW');
    assert.equal(cockpit.provider_metadata.identity, 'REQUIRES_REVIEW');
    assert.equal(cockpit.provider_metadata.rights, 'REQUIRES_REVIEW');
    assert.equal(cockpit.provider_metadata.continuity, 'REQUIRES_REVIEW');
  });
});

test('REVIEW_SEARCH prefilters Mira cockpit and exposes deterministic review scoring', async () => {
  await withArchive(async (root) => {
    const result = ingestLocalArchive(root);
    const output = matchScene(reviewScene({
      required_production_role: 'CHARACTER_STATE',
      required_local_character_family: 'Mira',
      required_variant_labels: ['cockpit'],
    }), result.normalizedAssets, { vaults, limit: 10 });
    assert.equal(output.result, 'MATCH_FOUND');
    assert.equal(output.matches.length, 1);
    assert.equal(output.matches[0].asset_id, result.manifest.assets.find(({ filename }) => filename === 'Mira in cockpit.png').asset_id);
    assert.equal(output.matches[0].review_search_score.total_score, 1);
    assert.equal(output.matches[0].review_search_score.truth_effect, 'REVIEW_ONLY_NO_VERIFICATION');
    assert.equal(output.matches[0].review_search_metadata.filename, 'Mira in cockpit.png');
    assert.equal(output.matches[0].review_search_metadata.metadata_basis, 'FILENAME_DERIVED');
    assert.deepEqual(output.matches[0].review_search_metadata.unresolved_human_review, {
      canon: 'REQUIRES_REVIEW',
      identity: 'REQUIRES_REVIEW',
      rights: 'REQUIRES_REVIEW',
      continuity: 'REQUIRES_REVIEW',
      provider_asset_id: 'UNKNOWN',
    });
    const codes = new Set(output.rejected.flatMap(({ failures }) => failures.map(({ code }) => code)));
    assert.ok(codes.has('VARIANT_LABEL_MISMATCH'));
    assert.ok(codes.has('PRODUCTION_ROLE_MISMATCH'));
    assert.equal(output.generation_fallback, 'PROHIBITED');
  });
});

test('FINAL_PRODUCTION never treats filename-derived review fields as verified truth', async () => {
  await withArchive(async (root) => {
    const result = ingestLocalArchive(root);
    const output = matchScene(reviewScene({
      selection_mode: 'FINAL_PRODUCTION',
      required_production_role: 'CHARACTER_STATE',
      required_local_character_family: 'Mira',
      required_variant_labels: ['cockpit'],
    }), result.normalizedAssets, { vaults, limit: 10 });
    assert.equal(output.result, 'NO_EXISTING_MATCH');
    assert.equal(output.matches.length, 0);
    assert.equal(output.rejected.length, result.normalizedAssets.length);
    assert.ok(output.rejected.every(({ failures }) => failures.some(({ code }) => code === 'VAULT_READINESS')));
    assert.equal(output.generation_fallback, 'PROHIBITED');
  });
});

test('resolves Mira character, cockpit, and mech as independent non-reused slots', async () => {
  await withArchive(async (root) => {
    const result = ingestLocalArchive(root);
    const output = matchScene(reviewScene({
      slots: [
        { id: 'character', role: 'CHARACTER', local_character_family: 'Mira' },
        { id: 'cockpit', role: 'CHARACTER_STATE', local_character_family: 'Mira', variant_labels: ['cockpit'] },
        { id: 'mech', role: 'MECH', local_character_family: 'Mira' },
      ],
    }), result.normalizedAssets, { vaults });
    assert.equal(output.result, 'MATCH_FOUND');
    assert.equal(output.matches.length, 3);
    assert.equal(new Set(output.selected_asset_ids).size, 3);
    assert.ok(output.slot_results.every(({ result: state }) => state === 'SLOT_MATCH_FOUND'));
    assert.ok(output.matches.every(({ review_search_score }) => review_search_score.total_score === 1));
  }, semanticFilenames);
});

test('resolves Naomi and Naomi mech plus an explicit local location candidate', async () => {
  await withArchive(async (root) => {
    const result = ingestLocalArchive(root);
    const output = matchScene(reviewScene({
      slots: [
        { id: 'character', role: 'CHARACTER', local_character_family: 'Naomi' },
        { id: 'mech', role: 'MECH', local_character_family: 'Naomi' },
        { id: 'location', role: 'LOCATION', local_location_labels: ["Naomi's room"] },
      ],
    }), result.normalizedAssets, { vaults });
    const filenames = output.matches.map(({ asset_id }) =>
      result.manifest.assets.find((asset) => asset.asset_id === asset_id).filename);
    assert.equal(output.result, 'MATCH_FOUND');
    assert.deepEqual(new Set(filenames), new Set(['Naomi.png', "Naomi's mech.png", "Naomi's room.png"]));
  }, semanticFilenames);
});

test('enforces distinct filename-derived families for a multi-character slot', async () => {
  await withArchive(async (root) => {
    const result = ingestLocalArchive(root);
    const output = matchScene(reviewScene({
      slots: [
        { id: 'characters', role: 'CHARACTER', count: 2, distinct_local_character_families: true },
        { id: 'city', role: 'LOCATION', local_location_labels: ['City 1'] },
      ],
    }), result.normalizedAssets, { vaults });
    assert.equal(output.result, 'MATCH_FOUND');
    const characterIds = output.slot_results.find(({ slot_id }) => slot_id === 'characters').selected_asset_ids;
    const families = characterIds.map((id) => result.normalizedAssets.find(({ asset_id }) => asset_id === id).local_character_family.value);
    assert.equal(new Set(families).size, 2);
    assert.equal(output.generation_fallback, 'PROHIBITED');
  }, semanticFilenames);
});

test('returns explicit review prefilter rejection reasons for impossible role and variant requests', async () => {
  await withArchive(async (root) => {
    const result = ingestLocalArchive(root);
    const variant = matchScene(reviewScene({
      required_production_role: 'CHARACTER_STATE', required_variant_labels: ['underwater'],
    }), result.normalizedAssets, { vaults });
    assert.equal(variant.result, 'NO_EXISTING_MATCH');
    assert.ok(variant.rejected.some(({ failures }) => failures.some(({ code }) => code === 'VARIANT_LABEL_MISMATCH')));
    const role = matchScene(reviewScene({ required_production_role: 'CREATURE' }), result.normalizedAssets, { vaults });
    assert.equal(role.result, 'NO_EXISTING_MATCH');
    assert.ok(role.rejected.every(({ failures }) => failures.some(({ code }) => code === 'PRODUCTION_ROLE_MISMATCH')));
    assert.equal(role.generation_fallback, 'PROHIBITED');
  }, semanticFilenames);
});

test('prefers clean character states, rejects KIA variants, and associates a mech with a selected family', async () => {
  const filenames = [
    'Mira.png', 'Mira (Episode 1 Base).png', 'Naomi.png', 'Naomi (Episode 1 Base).png',
    "Naomi's mech.png", 'Alex (Battle Mode) [KIA].png',
  ];
  await withArchive(async (root) => {
    const result = ingestLocalArchive(root);
    const output = matchScene(reviewScene({
      slots: [
        { id: 'hero', role: 'CHARACTER', preferred_variant_labels: ['Episode 1 Base'], forbidden_variant_labels: ['KIA'] },
        { id: 'second', role: 'CHARACTER', preferred_variant_labels: ['Episode 1 Base'], forbidden_variant_labels: ['KIA'], distinct_from_slot_ids: ['hero'] },
        { id: 'mech', role: 'MECH', compatible_character_slot_ids: ['hero', 'second'] },
      ],
    }), result.normalizedAssets, { vaults });
    const selected = output.matches.map(({ asset_id }) => result.manifest.assets.find((asset) => asset.asset_id === asset_id).filename);
    assert.equal(output.result, 'MATCH_FOUND');
    assert.ok(selected.every((filename) => !filename.includes('KIA')));
    const mech = result.manifest.assets.find((asset) => asset.filename === "Naomi's mech.png");
    assert.ok(output.selected_asset_ids.includes(mech.asset_id));
    assert.ok(output.slot_results.find(({ slot_id }) => slot_id === 'mech').rejected.some(({ failures }) =>
      failures.some(({ code }) => code === 'LOCAL_FAMILY_ASSOCIATION_MISMATCH')));
    assert.equal(output.generation_fallback, 'PROHIBITED');
  }, filenames);
});

test('emits filename-derived character, state, mech, location, and prop tags', async () => {
  await withArchive(async (root) => {
    const result = ingestLocalArchive(root);
    const byFilename = Object.fromEntries(result.manifest.assets.map((asset) => [asset.filename, asset]));
    assert.equal(byFilename['Mira.png'].reference_tag, '@char_ZEPHYR_Mira');
    assert.equal(byFilename['Mira in cockpit.png'].reference_tag, '@char_ZEPHYR_Mira_cockpit');
    assert.equal(byFilename["Mira's mech.png"].reference_tag, '@mech_ZEPHYR_Mira');
    assert.equal(byFilename['Main hangar.png'].reference_tag, '@loc_ZEPHYR_Main_hangar');
    assert.equal(byFilename['Lightstick.png'].reference_tag, '@prop_ZEPHYR_Lightstick');
  });
});

test('allows unresolved local records in REVIEW_SEARCH and fails FINAL_PRODUCTION closed', async () => {
  await withArchive(async (root) => {
    const result = ingestLocalArchive(root);
    const registry = structuredClone(vaults);
    assert.ok(registry.vaults.some(({ vault_id }) => vault_id === ZEPHYR_VAULT_ID));
    const reviewScene = { ...structuredClone(scenes[0]), selection_mode: 'REVIEW_SEARCH' };
    const review = filterEligibleAssets(reviewScene, result.normalizedAssets, registry);
    assert.equal(review.eligible.length, result.normalizedAssets.length);
    assert.equal(review.rejected.length, 0);
    const finalScene = { ...reviewScene, selection_mode: 'FINAL_PRODUCTION' };
    const final = filterEligibleAssets(finalScene, result.normalizedAssets, registry);
    assert.equal(final.eligible.length, 0);
    assert.equal(final.rejected.length, result.normalizedAssets.length);
  });
});

test('produces deterministic manifests and fingerprints while keeping receipt time explicit', async () => {
  await withArchive(async (root) => {
    const first = ingestLocalArchive(root, { ingestionTimestamp: '2026-08-11T20:39:41.000Z' });
    const second = ingestLocalArchive(root, { ingestionTimestamp: '2026-08-12T20:39:41.000Z' });
    assert.deepEqual(first.manifest, second.manifest);
    assert.equal(first.receipt.manifest_fingerprint, second.receipt.manifest_fingerprint);
    assert.equal(first.receipt.index_fingerprint, second.receipt.index_fingerprint);
    assert.notEqual(first.receipt.ingestion_timestamp, second.receipt.ingestion_timestamp);
  });
});

test('rejects duplicate content hashes instead of creating colliding stable asset IDs', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'zephyr-local-duplicate-'));
  try {
    const content = png(100, 200, 1);
    await writeFile(path.join(root, 'Mira.png'), content);
    await writeFile(path.join(root, 'Kai.png'), content);
    assert.throws(() => ingestLocalArchive(root), /Duplicate local content hashes/u);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
