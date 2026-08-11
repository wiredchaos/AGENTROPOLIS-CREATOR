import { requireValue } from './types.js';

const HARD_LOCK_TYPES = new Set([
  'HEIGHT_LOCK', 'EYELINE_LOCK', 'OFFSCREEN_ONLY', 'VISIBLE_DOORS_STATIC',
  'SPEECH_SEGMENT_COUNT', 'WORD_COUNT', 'HAND_OWNERSHIP', 'LIP_SYNC_OWNERSHIP', 'CAMERA_SIDE_180',
  'CHARACTER_COUNT', 'PROP_STATE', 'LIGHTING_DIRECTION', 'EVENT_TIMECODE',
]);

function placementFor(blocking, subjectId) {
  return blocking.first_frame_and_spatial_blocking.placements.find(
    ({ subject_id, at_seconds = 0 }) => subject_id === subjectId && at_seconds === 0,
  );
}

function result(lock, validationStatus, validationReason) {
  return { ...structuredClone(lock), validation_status: validationStatus, validation_reason: validationReason };
}

function validateHardLock(lock, input, compiled) {
  requireValue(HARD_LOCK_TYPES.has(lock.type), 'CONTINUITY_LOCK', `Unsupported hard lock ${lock.type}.`);
  const placements = compiled.blocking.first_frame_and_spatial_blocking.placements;
  const cutStates = input.continuity_requirements?.cut_states ?? [];
  switch (lock.type) {
    case 'HEIGHT_LOCK': {
      const character = compiled.context.active_characters.find(({ id }) => id === lock.subject_id);
      if (!character || !Object.hasOwn(character, 'height_cm')) return result(lock, 'NOT_MACHINE_VERIFIABLE', 'No structured character height evidence.');
      requireValue(character?.height_cm === lock.height_cm, 'HEIGHT_LOCK', `${lock.subject_id} height differs from lock.`);
      return result(lock, 'PASS', 'Structured character height matches.');
    }
    case 'EYELINE_LOCK': {
      if (!placementFor(compiled.blocking, lock.subject_id)?.gaze_target) return result(lock, 'NOT_MACHINE_VERIFIABLE', 'No structured eyeline evidence.');
      requireValue(placementFor(compiled.blocking, lock.subject_id)?.gaze_target === lock.target_id, 'EYELINE_LOCK', `${lock.subject_id} eyeline differs from lock.`);
      return result(lock, 'PASS', 'Structured eyeline matches.');
    }
    case 'OFFSCREEN_ONLY': {
      if (!Object.hasOwn(input, 'offscreen_only_entities')) return result(lock, 'NOT_MACHINE_VERIFIABLE', 'No explicit offscreen-only state list.');
      const offscreen = new Set(input.offscreen_only_entities ?? []);
      for (const id of lock.entity_ids ?? []) {
        requireValue(offscreen.has(id), 'OFFSCREEN_ONLY', `${id} is absent from the explicit offscreen-only state list.`);
        requireValue(!placements.some(({ subject_id }) => subject_id === id), 'OFFSCREEN_ONLY', `${id} is visibly placed despite the offscreen-only lock.`);
      }
      return result(lock, 'PASS', 'Explicit offscreen state exists and no visible placement exists.');
    }
    case 'VISIBLE_DOORS_STATIC': {
      const landmarks = compiled.blocking.location_map.landmarks ?? [];
      const hasInitialState = (lock.landmark_ids ?? []).every((id) => landmarks.some((landmark) => landmark.id === id && Object.hasOwn(landmark, 'state')));
      const hasCutState = cutStates.length > 0 && (lock.landmark_ids ?? []).every((id) => cutStates.every(({ state }) => Object.hasOwn(state ?? {}, `DOOR:${id}`)));
      if (!hasInitialState || !hasCutState) return result(lock, 'NOT_MACHINE_VERIFIABLE', 'Door state evidence is incomplete for the initial shot or cuts.');
      for (const id of lock.landmark_ids ?? []) {
        requireValue(cutStates.every(({ state }) => state?.[`DOOR:${id}`] === lock.state), 'VISIBLE_DOORS_STATIC', `${id} changes across a cut.`);
      }
      return result(lock, 'PASS', 'Structured door states remain static across cuts.');
    }
    case 'SPEECH_SEGMENT_COUNT': {
      const lines = compiled.timing.dialogue.filter(({ speaker_id }) => !lock.owner_id || speaker_id === lock.owner_id);
      requireValue(lines.length === lock.exact_count, 'SPEECH_SEGMENT_COUNT', `Expected ${lock.exact_count} spoken segment(s), found ${lines.length}.`);
      return result(lock, 'PASS', 'Explicit scripted dialogue segment count matches.');
    }
    case 'WORD_COUNT': {
      const lines = compiled.timing.dialogue.filter(({ speaker_id }) => !lock.owner_id || speaker_id === lock.owner_id);
      const words = lines.flatMap(({ text = '' }) => text.trim().split(/\s+/u).filter(Boolean));
      requireValue(words.length === lock.exact_count, 'WORD_COUNT', `Expected ${lock.exact_count} scripted word(s), found ${words.length}.`);
      return result(lock, 'PASS', 'Explicit scripted word count matches.');
    }
    case 'HAND_OWNERSHIP': {
      const ownerPlacement = placements.find(({ subject_id }) => subject_id === lock.owner_id);
      if (!ownerPlacement || !Object.hasOwn(ownerPlacement, 'held_props')) return result(lock, 'NOT_MACHINE_VERIFIABLE', 'No structured held-prop evidence for the owner.');
      const held = placements.flatMap(({ subject_id, held_props = [] }) => held_props.map((prop) => ({ ...prop, subject_id })));
      requireValue(held.some(({ prop_id, subject_id, hand }) => prop_id === lock.prop_id && subject_id === lock.owner_id && hand === lock.hand), 'HAND_OWNERSHIP', `${lock.prop_id} hand ownership differs from lock.`);
      return result(lock, 'PASS', 'Structured held-prop owner and hand match.');
    }
    case 'LIP_SYNC_OWNERSHIP':
      requireValue(compiled.audio.lip_sync_owner === lock.owner_id, 'LIP_SYNC_OWNERSHIP', 'Lip-sync owner differs from lock.');
      return result(lock, 'PASS', 'Explicit lip-sync ownership matches.');
    case 'CAMERA_SIDE_180': {
      requireValue(input.camera_mode?.camera_side === lock.camera_side, 'CAMERA_SIDE_180', 'Camera starts on the wrong side of the 180-degree line.');
      requireValue((input.camera_mode?.cut_states ?? []).every(({ camera_side }) => camera_side === lock.camera_side), 'CAMERA_SIDE_180', 'A cut crosses the locked 180-degree line.');
      return result(lock, 'PASS', 'Camera remains on the declared side across cuts.');
    }
    case 'CHARACTER_COUNT': {
      const visible = compiled.context.active_characters.length - (input.offscreen_only_entities ?? []).length;
      requireValue(visible === lock.exact_count, 'CHARACTER_COUNT', `Expected ${lock.exact_count} visible characters, found ${visible}.`);
      return result(lock, 'PASS', 'Explicit visible character count matches.');
    }
    case 'PROP_STATE': {
      const prop = (input.props ?? []).find(({ id }) => id === lock.prop_id);
      if (!prop || !Object.hasOwn(prop, 'state')) return result(lock, 'NOT_MACHINE_VERIFIABLE', 'No structured prop state evidence.');
      requireValue(JSON.stringify(prop.state) === JSON.stringify(lock.state), 'PROP_STATE', `${lock.prop_id} state differs from lock.`);
      return result(lock, 'PASS', 'Structured prop state matches.');
    }
    case 'LIGHTING_DIRECTION':
      requireValue(compiled.lighting.key_direction === lock.direction, 'LIGHTING_DIRECTION', 'Lighting direction differs from hard lock.');
      return result(lock, 'PASS', 'Explicit lighting direction matches.');
    case 'EVENT_TIMECODE': {
      const event = [...compiled.timing.action_timing, ...compiled.timing.dialogue].find(({ id }) => id === lock.event_id);
      if (!event || !Object.hasOwn(event, 'start_seconds') || !Object.hasOwn(event, 'end_seconds')) return result(lock, 'NOT_MACHINE_VERIFIABLE', 'No structured event timecode evidence.');
      requireValue(event?.start_seconds === lock.start_seconds && event?.end_seconds === lock.end_seconds, 'EVENT_TIMECODE', `${lock.event_id} timecode differs from lock.`);
      return result(lock, 'PASS', 'Structured event timecode matches.');
    }
    default:
      return result(lock, 'NOT_MACHINE_VERIFIABLE', 'No validator is available.');
  }
}

export function compileContinuity(input, compiled) {
  const continuity = input.continuity_requirements ?? {};
  const locks = new Map((continuity.locked_values ?? []).map(({ key, value }) => [key, value]));
  for (const cut of continuity.cut_states ?? []) {
    for (const [key, value] of locks) {
      requireValue(cut.state?.[key] === value, 'CONTINUITY_DRIFT', `Cut ${cut.cut_id} changes locked ${key}.`);
    }
  }
  const hardLocks = (continuity.hard_locks ?? []).map((lock) => validateHardLock(lock, input, compiled));
  return {
    locked_values: [...locks].map(([key, value]) => ({ key, value })),
    hard_locks: hardLocks,
    forbidden_carryover: structuredClone(input.forbidden_carryover ?? []),
  };
}
