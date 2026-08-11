/** Canon statuses accepted by the existing asset taxonomy. */
export const CANON_STATUSES = Object.freeze([
  'SOURCE_CANON',
  'AUTHOR_DECLARED_CANON',
  'PROVISIONAL_CANON',
  'CONTESTED_CANON',
  'METAVERSE_SYNTHESIS',
  'CANON_GAP',
]);

/** Output uses that map to explicit eligibility fields in the asset schema. */
export const OUTPUT_USE_ELIGIBILITY_FIELDS = Object.freeze({
  INTERACTIVE_BRANCH: 'interactive_branch_eligibility',
  ATV_EPISODE: 'atv_episode_eligibility',
  KOL_SOCIAL: 'kol_social_eligibility',
  GAMING_DISTRICT: 'gaming_district_eligibility',
});

export const SCORE_WEIGHTS = Object.freeze({
  characters: 0.25,
  factions: 0.2,
  continuity: 0.2,
  studio_mode: 0.12,
  visual_style: 0.08,
  action: 0.06,
  camera_language: 0.05,
  mood: 0.04,
});

export const REQUIRED_SCENE_FIELDS = Object.freeze([
  'scene_id',
  'required_characters',
  'required_factions',
  'world',
  'era',
  'location',
  'studio_mode',
  'visual_style',
  'camera_language',
  'action',
  'mood',
  'canon_status_requirement',
  'output_use',
  'continuity_tags',
]);

function assertStringArray(value, field) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new TypeError(`${field} must be an array of strings.`);
  }
}

/**
 * Validate the intentionally small matcher request surface.
 * This complements, rather than replaces, scene-requirements.schema.json.
 */
export function assertSceneRequest(scene) {
  if (!scene || typeof scene !== 'object' || Array.isArray(scene)) {
    throw new TypeError('Scene request must be an object.');
  }

  const missing = REQUIRED_SCENE_FIELDS.filter(
    (field) => !Object.prototype.hasOwnProperty.call(scene, field),
  );
  if (missing.length > 0) {
    throw new TypeError(`Scene request is missing: ${missing.join(', ')}.`);
  }

  for (const field of ['required_characters', 'required_factions', 'continuity_tags']) {
    assertStringArray(scene[field], field);
  }

  const canonStatuses = Array.isArray(scene.canon_status_requirement)
    ? scene.canon_status_requirement
    : [scene.canon_status_requirement];
  if (
    canonStatuses.length === 0 ||
    canonStatuses.some((status) => !CANON_STATUSES.includes(status))
  ) {
    throw new TypeError('canon_status_requirement contains an unsupported status.');
  }

  if (!OUTPUT_USE_ELIGIBILITY_FIELDS[scene.output_use]) {
    throw new TypeError(
      `output_use must be one of: ${Object.keys(OUTPUT_USE_ELIGIBILITY_FIELDS).join(', ')}.`,
    );
  }

  for (const field of [
    'scene_id',
    'world',
    'era',
    'location',
    'studio_mode',
    'visual_style',
    'camera_language',
    'action',
    'mood',
  ]) {
    if (typeof scene[field] !== 'string') {
      throw new TypeError(`${field} must be a string.`);
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
