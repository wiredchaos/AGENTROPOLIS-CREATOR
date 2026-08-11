import { requireValue } from './types.js';
import { normalizeReference } from './reference-tags.js';

const LEAKAGE_PATTERNS = [
  /\b(?:previous|prior|last) scene\b/iu,
  /\b(?:as|same as) before\b/iu,
  /\bscene\s*[#:]?\s*\d+(?:\.\d+)?\b/iu,
];

function stringsIn(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(stringsIn);
  if (value && typeof value === 'object') return Object.values(value).flatMap(stringsIn);
  return [];
}

export function isolateShotContext(input) {
  requireValue(typeof input.scene_id === 'string' && input.scene_id.length > 0, 'SCENE_ID', 'scene_id is required.');
  requireValue(Array.isArray(input.selected_asset_ids) && input.selected_asset_ids.length > 0, 'SELECTED_ASSETS', 'The matcher must supply selected_asset_ids.');
  requireValue(Array.isArray(input.active_characters), 'ACTIVE_CHARACTERS', 'active_characters must be an array.');
  requireValue(Array.isArray(input.active_references), 'ACTIVE_REFERENCES', 'active_references must be an array.');

  const selected = new Set(input.selected_asset_ids);
  const activeCharacterIds = new Set(input.active_characters.map(({ id }) => id));
  const keptReferences = [];
  const removedTags = [];
  for (const reference of input.active_references) {
    const characterActive = reference.role !== 'CHARACTER' || activeCharacterIds.has(reference.subject_id);
    if (!selected.has(reference.asset_id) || !characterActive) removedTags.push(reference.tag);
    else keptReferences.push(normalizeReference(reference));
  }

  const allowedTags = new Set(keptReferences.map(({ tag }) => tag));
  const isolatedInput = { ...input, active_references: keptReferences };
  for (const text of stringsIn(isolatedInput)) {
    for (const pattern of LEAKAGE_PATTERNS) {
      requireValue(!pattern.test(text), 'CONTEXT_LEAKAGE', `Disallowed prior-scene or scene-number wording: ${text}`);
    }
    for (const tag of text.match(/@[A-Za-z][A-Za-z0-9_%\-]*/gu) ?? []) {
      requireValue(allowedTags.has(tag), 'INVENTED_REFERENCE', `Undefined or stale reference ${tag}.`);
    }
  }

  return {
    scene_id: input.scene_id,
    selected_asset_ids: [...selected].sort(),
    active_characters: structuredClone(input.active_characters),
    active_references: keptReferences.sort((a, b) => a.tag.localeCompare(b.tag)),
    removed_stale_tags: removedTags.sort(),
  };
}

export function formatSceneContext(context) {
  return {
    scene_id: context.scene_id,
    exact_character_count: context.active_characters.length,
    active_character_ids: context.active_characters.map(({ id }) => id),
    selected_asset_ids: context.selected_asset_ids,
    stale_tags_removed: context.removed_stale_tags,
  };
}
