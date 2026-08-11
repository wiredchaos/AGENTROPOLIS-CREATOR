import { requireValue } from './types.js';

export function compileBlocking(input, context) {
  const blocking = input.spatial_blocking ?? {};
  const placements = blocking.placements ?? [];
  const landmarks = new Map((blocking.landmarks ?? []).map((item) => [item.id, item]));
  const props = new Map((input.props ?? []).map((item) => [item.id, item]));
  const vehicles = new Map((input.vehicles ?? []).map((item) => [item.id, item]));
  const characterIds = new Set(context.active_characters.map(({ id }) => id));
  const offscreenOnly = new Set(input.offscreen_only_entities ?? []);
  for (const id of offscreenOnly) {
    requireValue(characterIds.has(id), 'OFFSCREEN_ONLY', `Offscreen-only entity ${id} is not an active character.`);
  }
  const visibleCharacterIds = new Set([...characterIds].filter((id) => !offscreenOnly.has(id)));
  const required = new Set(
    input.first_frame_requirements?.required_character_ids ?? [...visibleCharacterIds],
  );
  const firstFrame = new Map(
    placements.filter(({ at_seconds = 0 }) => at_seconds === 0).map((item) => [item.subject_id, item]),
  );

  for (const id of required) {
    requireValue(visibleCharacterIds.has(id), 'UNUSED_CHARACTER', `First frame requires inactive or offscreen-only character ${id}.`);
    requireValue(firstFrame.has(id), 'FIRST_FRAME_OCCUPANCY', `${id} is absent at t=0.`);
  }
  for (const id of visibleCharacterIds) {
    const placement = firstFrame.get(id);
    requireValue(placement, 'FIRST_FRAME_OCCUPANCY', `${id} is absent at t=0.`);
    requireValue(Boolean(placement.body_orientation), 'BODY_ORIENTATION', `${id} lacks body orientation.`);
    requireValue(Boolean(placement.gaze_target), 'GAZE_DIRECTION', `${id} lacks a gaze target.`);
    const gaze = placement.gaze_target;
    requireValue(
      characterIds.has(gaze) || landmarks.has(gaze) || props.has(gaze) || vehicles.has(gaze) || gaze === 'CAMERA_LEFT' || gaze === 'CAMERA_RIGHT' || gaze === 'OFFSCREEN',
      'GAZE_DIRECTION',
      `${id} has undefined gaze target ${gaze}.`,
    );
  }

  for (const placement of placements) {
    requireValue(!offscreenOnly.has(placement.subject_id), 'OFFSCREEN_ONLY', `${placement.subject_id} must not be visible.`);
  }

  for (const placement of placements) {
    if (placement.landmark_id) {
      requireValue(landmarks.has(placement.landmark_id), 'LANDMARK', `Undefined landmark ${placement.landmark_id}.`);
      const maximum = landmarks.get(placement.landmark_id).maximum_proximity_m;
      if (maximum !== undefined) {
        requireValue(placement.distance_m <= maximum, 'LANDMARK_PROXIMITY', `${placement.subject_id} is too far from ${placement.landmark_id}.`);
      }
    }
    for (const held of placement.held_props ?? []) {
      const prop = props.get(held.prop_id);
      requireValue(prop, 'UNDEFINED_PROP', `Undefined prop ${held.prop_id}.`);
      requireValue(prop.assigned_character_id === placement.subject_id, 'PROP_OWNER', `${held.prop_id} is assigned to another character.`);
      requireValue(prop.required_hand === held.hand, 'WRONG_HAND_PROP', `${held.prop_id} must remain in ${prop.required_hand}.`);
    }
  }

  return {
    location_map: {
      location: structuredClone(input.location),
      landmarks: [...landmarks.values()],
      vehicles: [...vehicles.values()],
    },
    first_frame_and_spatial_blocking: {
      occupancy: [...required].sort(),
      placements: structuredClone(placements),
      offscreen_only_entities: [...offscreenOnly].sort(),
    },
  };
}
