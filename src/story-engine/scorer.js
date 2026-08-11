import { normalize } from './filters.js';
import { SCORE_WEIGHTS } from './types.js';

function annotationValues(annotations) {
  return new Set(
    (annotations ?? [])
      .flatMap((annotation) => [annotation?.id, annotation?.label])
      .map(normalize)
      .filter(Boolean),
  );
}

function requiredCoverage(required, actual) {
  if (required.length === 0) return { score: 1, matched: [], missing: [] };
  const actualValues = annotationValues(actual);
  const matched = required.filter((item) => actualValues.has(normalize(item)));
  const missing = required.filter((item) => !actualValues.has(normalize(item)));
  return { score: matched.length / required.length, matched, missing };
}

function tagCoverage(required, actual) {
  if (required.length === 0) return { score: 1, matched: [], missing: [] };
  const actualValues = new Set((actual ?? []).map(normalize));
  const matched = required.filter((item) => actualValues.has(normalize(item)));
  const missing = required.filter((item) => !actualValues.has(normalize(item)));
  return { score: matched.length / required.length, matched, missing };
}

function tokens(value) {
  return new Set(normalize(value).split(/[^\p{L}\p{N}]+/u).filter(Boolean));
}

function textSimilarity(required, observation) {
  if (!normalize(required)) return { score: 1, common_tokens: [] };
  if (!observation?.description) return { score: 0, common_tokens: [] };
  const expected = tokens(required);
  const actual = tokens(observation.description);
  const common = [...expected].filter((token) => actual.has(token));
  const union = new Set([...expected, ...actual]);
  return {
    score: union.size === 0 ? 0 : common.length / union.size,
    common_tokens: common,
  };
}

function exactMatch(expected, actual) {
  return normalize(expected) === normalize(actual) ? 1 : 0;
}

function audioFit(requirement, audio) {
  if (!requirement || ['OPTIONAL', 'REPLACEABLE_IN_EDIT'].includes(requirement.mode)) return 1;
  return requirement.mode === 'REQUIRED' ? Number(audio?.present === true) : Number(audio?.present === false);
}

function availableDuration(asset) {
  if (asset.segment) return asset.segment.end_seconds - asset.segment.start_seconds;
  return asset.duration;
}

function durationFit(requirement, asset) {
  if (!requirement) return 1;
  const duration = availableDuration(asset);
  if (typeof duration !== 'number') return 0;
  if (duration === requirement.target_seconds) return 1;
  const span = Math.max(
    requirement.target_seconds - requirement.minimum_seconds,
    requirement.maximum_seconds - requirement.target_seconds,
    1,
  );
  return Math.max(0, 1 - Math.abs(duration - requirement.target_seconds) / span);
}

/** Deterministically score a candidate that has already passed hard gates. */
export function scoreAsset(scene, asset) {
  const characters = requiredCoverage(scene.required_characters, asset.characters);
  const factions = requiredCoverage(scene.required_factions, asset.factions);
  const continuity = tagCoverage(scene.continuity_tags, asset.continuity_tags);
  const visualStyle = textSimilarity(scene.visual_style, asset.visual_style);
  const action = textSimilarity(scene.action, asset.action);
  const camera = textSimilarity(scene.camera_language, asset.camera_language);
  const mood = textSimilarity(scene.mood, asset.mood);
  const worldLocationEra =
    (exactMatch(scene.world, asset.world?.id) || exactMatch(scene.world, asset.world?.label)) &&
    (exactMatch(scene.location, asset.location?.id) || exactMatch(scene.location, asset.location?.label)) &&
    (exactMatch(scene.era, asset.era?.id) || exactMatch(scene.era, asset.era?.label))
      ? 1
      : 0;

  const dimensions = {
    characters: { ...characters, weight: SCORE_WEIGHTS.characters },
    factions: { ...factions, weight: SCORE_WEIGHTS.factions },
    world_location_era: {
      score: worldLocationEra,
      expected: `${scene.world} / ${scene.location} / ${scene.era}`,
      actual: `${asset.world?.label} / ${asset.location?.label} / ${asset.era?.label}`,
      weight: SCORE_WEIGHTS.world_location_era,
    },
    action: { ...action, weight: SCORE_WEIGHTS.action },
    visual_style: { ...visualStyle, weight: SCORE_WEIGHTS.visual_style },
    camera_language: { ...camera, weight: SCORE_WEIGHTS.camera_language },
    mood: { ...mood, weight: SCORE_WEIGHTS.mood },
    continuity: { ...continuity, weight: SCORE_WEIGHTS.continuity },
    audio: {
      score: audioFit(scene.audio_requirement, asset.dialogue_or_audio),
      expected: scene.audio_requirement?.mode ?? 'UNCONSTRAINED',
      actual: asset.dialogue_or_audio?.present === true ? 'PRESENT' : 'ABSENT',
      weight: SCORE_WEIGHTS.audio,
    },
    duration: {
      score: durationFit(scene.duration_requirement, asset),
      expected: scene.duration_requirement?.target_seconds ?? 'UNCONSTRAINED',
      actual: availableDuration(asset) ?? 'UNKNOWN',
      weight: SCORE_WEIGHTS.duration,
    },
  };

  const totalScore = Object.values(dimensions).reduce(
    (total, dimension) => total + dimension.score * dimension.weight,
    0,
  );

  const scoreDimensions = Object.entries(dimensions).map(([name, dimension]) => ({
    dimension: name,
    score: Number(dimension.score.toFixed(6)),
    weight: dimension.weight,
    contribution: Number((dimension.score * dimension.weight).toFixed(6)),
    ...(dimension.matched ? { matched: dimension.matched } : {}),
    ...(dimension.missing ? { missing: dimension.missing } : {}),
    ...(dimension.common_tokens ? { common_tokens: dimension.common_tokens } : {}),
    ...(dimension.expected ? { expected: dimension.expected } : {}),
    ...(dimension.actual ? { actual: dimension.actual } : {}),
  }));

  return { total_score: Number(totalScore.toFixed(6)), score_dimensions: scoreDimensions };
}
