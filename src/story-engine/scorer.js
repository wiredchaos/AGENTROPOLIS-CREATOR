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

/** Deterministically score a candidate that has already passed hard gates. */
export function scoreAsset(scene, asset) {
  const characters = requiredCoverage(scene.required_characters, asset.characters);
  const factions = requiredCoverage(scene.required_factions, asset.factions);
  const continuity = tagCoverage(scene.continuity_tags, asset.continuity_tags);
  const visualStyle = textSimilarity(scene.visual_style, asset.visual_style);
  const action = textSimilarity(scene.action, asset.action);
  const camera = textSimilarity(scene.camera_language, asset.camera_language);
  const mood = textSimilarity(scene.mood, asset.mood);

  const dimensions = {
    characters: { ...characters, weight: SCORE_WEIGHTS.characters },
    factions: { ...factions, weight: SCORE_WEIGHTS.factions },
    continuity: { ...continuity, weight: SCORE_WEIGHTS.continuity },
    studio_mode: {
      score: exactMatch(scene.studio_mode, asset.studio_mode),
      expected: scene.studio_mode,
      actual: asset.studio_mode,
      weight: SCORE_WEIGHTS.studio_mode,
    },
    visual_style: { ...visualStyle, weight: SCORE_WEIGHTS.visual_style },
    action: { ...action, weight: SCORE_WEIGHTS.action },
    camera_language: { ...camera, weight: SCORE_WEIGHTS.camera_language },
    mood: { ...mood, weight: SCORE_WEIGHTS.mood },
  };

  const score = Object.values(dimensions).reduce(
    (total, dimension) => total + dimension.score * dimension.weight,
    0,
  );

  const reasons = Object.entries(dimensions).map(([name, dimension]) => ({
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

  return { score: Number(score.toFixed(6)), reasons };
}
