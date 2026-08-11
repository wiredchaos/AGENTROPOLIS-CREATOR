import { evaluateRightsEligibility, filterEligibleAssets } from './filters.js';
import { scoreAsset } from './scorer.js';
import { assertAssetIndex, assertSceneRequest, MATCHER_VERSION, SPEC_VERSION } from './types.js';
import { PRODUCTION_CONTRACT_VERSION } from '../production-contract.js';
import {
  hasFilenameDerivedReviewMetadata,
  prefilterReviewAssets,
  reviewSearchMetadata,
  sceneReviewConstraints,
  scoreReviewSearch,
  slotReviewConstraints,
} from './review-search.js';

function findVault(registry, vaultId) {
  const vaults = Array.isArray(registry) ? registry : registry?.vaults ?? [];
  return vaults.find(({ vault_id }) => vault_id === vaultId);
}

function evaluateCandidates(scene, assets, options, constraints, limit) {
  const prefiltered = prefilterReviewAssets(scene, assets, constraints);
  const { eligible, rejected: hardGateRejected } = filterEligibleAssets(
    scene,
    prefiltered.eligible,
    options.vaults,
  );
  const matches = eligible
    .map(({ asset, gates }) => {
      const vault = findVault(options.vaults, asset.vault_id);
      const match = {
        asset_id: asset.asset_id,
        vault_id: asset.vault_id,
        source_provider: asset.rights.source_provider,
        source_reference_id: asset.rights.source_asset_reference_id,
        source_reference: asset['source_url/reference'],
        fixture: asset.provider_metadata?.fixture === true,
        rights_eligibility: evaluateRightsEligibility(scene, asset, vault),
        truth_canon_state: {
          truth_state: asset.truth_state,
          canon_status: asset.canon_status,
          canon_sources: asset.canon_source,
        },
        continuity_state: {
          present_tags: asset.continuity_tags,
          required_tags: scene.required_continuity_tags ?? [],
          forbidden_tags: scene.forbidden_continuity_tags ?? [],
          continuity_identity_ids: asset.continuity_identity_ids,
        },
        reused_source_media: false,
        ...scoreAsset(scene, asset),
        hard_gates: gates.map(({ code, pass, explanation }) => ({ code, pass, explanation })),
      };
      if (scene.selection_mode === 'REVIEW_SEARCH' && hasFilenameDerivedReviewMetadata(asset)) {
        match.review_search_score = scoreReviewSearch(asset, constraints);
        match.review_search_metadata = reviewSearchMetadata(asset);
      }
      return match;
    })
    .sort(
      (left, right) =>
        (right.review_search_score?.total_score ?? 0) - (left.review_search_score?.total_score ?? 0) ||
        right.total_score - left.total_score || left.asset_id.localeCompare(right.asset_id),
    )
    .slice(0, limit)
    .map((match, rank) => ({ ...match, rank: rank + 1 }));

  return { matches, rejected: [...prefiltered.rejected, ...hardGateRejected] };
}

function resolveSlots(scene, assets, options) {
  const usedAssetIds = new Set();
  const selectedByAsset = new Map();
  const slotResults = [];

  for (const slot of scene.slots) {
    const allowReuse = slot.allow_asset_reuse === true;
    const available = allowReuse ? assets : assets.filter(({ asset_id }) => !usedAssetIds.has(asset_id));
    const compatibleFamilies = new Set(
      (slot.compatible_character_slot_ids ?? [])
        .flatMap((slotId) => slotResults.find(({ slot_id }) => slot_id === slotId)?.selected_asset_ids ?? [])
        .map((assetId) => assets.find(({ asset_id }) => asset_id === assetId)?.local_character_family?.value)
        .filter(Boolean)
        .map(normalizeFamily),
    );
    const excludedFamilies = new Set(
      (slot.distinct_from_slot_ids ?? [])
        .flatMap((slotId) => slotResults.find(({ slot_id: id }) => id === slotId)?.selected_asset_ids ?? [])
        .map((assetId) => assets.find(({ asset_id }) => asset_id === assetId)?.local_character_family?.value)
        .filter(Boolean)
        .map(normalizeFamily),
    );
    const compatibleAssets = compatibleFamilies.size === 0
      ? available
      : available.filter((asset) => compatibleFamilies.has(normalizeFamily(asset.local_character_family?.value)));
    const distinctAssets = excludedFamilies.size === 0
      ? compatibleAssets
      : compatibleAssets.filter((asset) => !excludedFamilies.has(normalizeFamily(asset.local_character_family?.value)));
    const constraints = slotReviewConstraints(slot);
    const evaluated = evaluateCandidates(scene, distinctAssets, options, constraints, distinctAssets.length || 1);
    if (compatibleFamilies.size > 0) {
      for (const asset of available.filter(({ asset_id }) => !compatibleAssets.some((candidate) => candidate.asset_id === asset_id))) {
        evaluated.rejected.push({
          asset_id: asset.asset_id,
          vault_id: asset.vault_id ?? null,
          source_provider: asset.rights?.source_provider ?? null,
          source_reference_id: asset.rights?.source_asset_reference_id ?? null,
          fixture: asset.provider_metadata?.fixture === true,
          failures: [{
            code: 'LOCAL_FAMILY_ASSOCIATION_MISMATCH',
            explanation: `Asset family ${asset.local_character_family?.value ?? 'UNAVAILABLE'} is not associated with selected character slot families [${[...compatibleFamilies].join(', ')}].`,
          }],
        });
      }
    }
    for (const asset of compatibleAssets.filter(({ asset_id }) => !distinctAssets.some((candidate) => candidate.asset_id === asset_id))) {
      evaluated.rejected.push({
        asset_id: asset.asset_id,
        vault_id: asset.vault_id ?? null,
        source_provider: asset.rights?.source_provider ?? null,
        source_reference_id: asset.rights?.source_asset_reference_id ?? null,
        fixture: asset.provider_metadata?.fixture === true,
        failures: [{
          code: 'LOCAL_CHARACTER_FAMILY_DUPLICATE',
          explanation: `Asset family ${asset.local_character_family?.value ?? 'UNAVAILABLE'} duplicates a previously selected character family [${[...excludedFamilies].join(', ')}].`,
        }],
      });
    }
    const requestedCount = slot.count ?? 1;
    const selected = [];
    const selectedFamilies = new Set();
    for (const match of evaluated.matches) {
      const asset = assets.find(({ asset_id }) => asset_id === match.asset_id);
      const family = asset?.local_character_family?.value ?? null;
      if (slot.distinct_local_character_families === true) {
        if (!family || selectedFamilies.has(normalizeFamily(family))) continue;
        selectedFamilies.add(normalizeFamily(family));
      }
      selected.push(match);
      if (selected.length === requestedCount) break;
    }
    for (const match of selected) {
      if (!allowReuse) usedAssetIds.add(match.asset_id);
      const existing = selectedByAsset.get(match.asset_id);
      if (existing) existing.slot_ids.push(slot.id);
      else selectedByAsset.set(match.asset_id, { ...match, slot_ids: [slot.id] });
    }
    slotResults.push({
      slot_id: slot.id,
      required_count: requestedCount,
      candidates_considered: available.length,
      distinct_local_character_families: slot.distinct_local_character_families === true,
      allow_asset_reuse: allowReuse,
      result: selected.length === requestedCount ? 'SLOT_MATCH_FOUND' : 'NO_EXISTING_SLOT_MATCH',
      selected_asset_ids: selected.map(({ asset_id }) => asset_id),
      rejected: evaluated.rejected,
      generation_fallback: 'PROHIBITED',
    });
  }

  const matches = [...selectedByAsset.values()].map((match, index) => ({ ...match, rank: index + 1 }));
  return { matches, slotResults };
}

function normalizeFamily(value) {
  return String(value).normalize('NFKC').trim().toLocaleLowerCase('en-US');
}

/**
 * Match one scene against an in-memory index of existing assets.
 * The function is pure: source assets are never copied or mutated.
 */
export function matchScene(scene, assets, options = {}) {
  assertSceneRequest(scene);
  assertAssetIndex(assets);

  const limit = options.limit ?? 5;
  if (!Number.isInteger(limit) || limit < 1) {
    throw new TypeError('limit must be a positive integer.');
  }

  if (scene.slots?.length > 0) {
    const { matches, slotResults } = resolveSlots(scene, assets, options);
    const complete = slotResults.every(({ result }) => result === 'SLOT_MATCH_FOUND');
    return {
      scene_id: scene.scene_id,
      selection_mode: scene.selection_mode,
      output_use: scene.output_use,
      result: complete ? 'MATCH_FOUND' : 'NO_EXISTING_MATCH',
      selected_asset_ids: matches.map(({ asset_id }) => asset_id),
      matches,
      rejected: [],
      slot_results: slotResults,
      generation_fallback: 'PROHIBITED',
    };
  }

  const { matches, rejected } = evaluateCandidates(
    scene,
    assets,
    options,
    sceneReviewConstraints(scene),
    limit,
  );
  return {
    scene_id: scene.scene_id,
    selection_mode: scene.selection_mode,
    output_use: scene.output_use,
    result: matches.length > 0 ? 'MATCH_FOUND' : 'NO_EXISTING_MATCH',
    selected_asset_ids: matches.map(({ asset_id }) => asset_id),
    matches,
    rejected,
    generation_fallback: 'PROHIBITED',
  };
}

/**
 * Match multiple scenes without reserving or duplicating media.
 * The same asset reference may appear in multiple scene results by design.
 */
export function matchScenes(scenes, assets, options = {}) {
  if (!Array.isArray(scenes)) throw new TypeError('scenes must be an array.');
  const results = scenes.map((scene) => matchScene(scene, assets, options));
  const uses = new Map();
  for (const result of results) {
    for (const match of result.matches) {
      const sceneIds = uses.get(match.asset_id) ?? [];
      sceneIds.push(result.scene_id);
      uses.set(match.asset_id, sceneIds);
    }
  }

  for (const result of results) {
    for (const match of result.matches) {
      match.reused_source_media = (uses.get(match.asset_id)?.length ?? 0) > 1;
    }
  }

  return {
    production_contract_version: PRODUCTION_CONTRACT_VERSION,
    matcher_version: MATCHER_VERSION,
    spec_version: SPEC_VERSION,
    fixture_data: assets.some((asset) => asset?.provider_metadata?.fixture === true),
    generated_media: false,
    credits_spent: 0,
    results,
    reuse_map: Object.fromEntries([...uses].filter(([, sceneIds]) => sceneIds.length > 1)),
    source_media_duplicated: false,
    generation_fallback: 'PROHIBITED',
  };
}
