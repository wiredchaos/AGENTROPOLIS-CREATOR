import sceneSchema from '../../data/story/scene-requirements.schema.json' with { type: 'json' };
import { validateAgainstSchema } from './schema-validator.js';

export const MATCHER_VERSION = '0.2.0';
export const SPEC_VERSION = '1.0.0';

/** Output uses that map to explicit eligibility fields in the asset schema. */
export const OUTPUT_USE_ELIGIBILITY_FIELDS = Object.freeze({
  INTERACTIVE_BRANCH: 'interactive_branch_eligibility',
  ATV_EPISODE: 'atv_episode_eligibility',
  KOL_SOCIAL: 'kol_social_eligibility',
  GAMING_DISTRICT: 'gaming_district_eligibility',
});

export const SCORE_WEIGHTS = Object.freeze({
  characters: 0.2,
  factions: 0.12,
  world_location_era: 0.13,
  action: 0.12,
  visual_style: 0.1,
  camera_language: 0.1,
  mood: 0.08,
  continuity: 0.08,
  audio: 0.04,
  duration: 0.03,
});

/** Validate the matcher request against its canonical checked-in schema. */
export function assertSceneRequest(scene) {
  const errors = validateAgainstSchema(scene, sceneSchema);
  if (errors.length > 0) throw new TypeError(`Invalid scene request: ${errors.join(' ')}`);

  const duration = scene.duration_requirement;
  if (
    duration &&
    !(duration.minimum_seconds <= duration.target_seconds &&
      duration.target_seconds <= duration.maximum_seconds)
  ) {
    throw new TypeError(
      'Invalid scene request: duration must satisfy minimum_seconds <= target_seconds <= maximum_seconds.',
    );
  }

  if (scene.slots) {
    const ids = scene.slots.map(({ id }) => id);
    if (new Set(ids).size !== ids.length) {
      throw new TypeError('Invalid scene request: slot IDs must be unique.');
    }
  }
}

export function assertAssetIndex(assets) {
  if (!Array.isArray(assets)) {
    throw new TypeError('Asset index must be an array.');
  }
  for (const [index, asset] of assets.entries()) {
    if (!asset || typeof asset !== 'object' || typeof asset.asset_id !== 'string') {
      throw new TypeError(`Asset at index ${index} has no valid asset_id.`);
    }
  }
}
