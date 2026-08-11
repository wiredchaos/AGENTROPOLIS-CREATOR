import { filterEligibleAssets } from './filters.js';
import { scoreAsset } from './scorer.js';
import { assertAssetIndex, assertSceneRequest } from './types.js';

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

  const { eligible, rejected } = filterEligibleAssets(scene, assets);
  const matches = eligible
    .map(({ asset, gates }) => ({
      asset_id: asset.asset_id,
      vault_id: asset.vault_id,
      source_reference: asset['source_url/reference'],
      reused_source_media: false,
      ...scoreAsset(scene, asset),
      hard_gates: gates.map(({ code, explanation }) => ({ code, explanation })),
    }))
    .sort((left, right) => right.score - left.score || left.asset_id.localeCompare(right.asset_id))
    .slice(0, limit)
    .map((match, rank) => ({ ...match, rank: rank + 1 }));

  return {
    scene_id: scene.scene_id,
    output_use: scene.output_use,
    result: matches.length > 0 ? 'MATCH_FOUND' : 'NO_EXISTING_MATCH',
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
    results,
    reuse_map: Object.fromEntries([...uses].filter(([, sceneIds]) => sceneIds.length > 1)),
    source_media_duplicated: false,
    generation_fallback: 'PROHIBITED',
  };
}
