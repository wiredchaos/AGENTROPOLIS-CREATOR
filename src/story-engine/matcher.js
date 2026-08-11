import { evaluateRightsEligibility, filterEligibleAssets } from './filters.js';
import { scoreAsset } from './scorer.js';
import { assertAssetIndex, assertSceneRequest, MATCHER_VERSION, SPEC_VERSION } from './types.js';
import { PRODUCTION_CONTRACT_VERSION } from '../production-contract.js';

function findVault(registry, vaultId) {
  const vaults = Array.isArray(registry) ? registry : registry?.vaults ?? [];
  return vaults.find(({ vault_id }) => vault_id === vaultId);
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

  const { eligible, rejected } = filterEligibleAssets(scene, assets, options.vaults);
  const matches = eligible
    .map(({ asset, gates }) => {
      const vault = findVault(options.vaults, asset.vault_id);
      return {
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
    })
    .sort(
      (left, right) =>
        right.total_score - left.total_score || left.asset_id.localeCompare(right.asset_id),
    )
    .slice(0, limit)
    .map((match, rank) => ({ ...match, rank: rank + 1 }));

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
