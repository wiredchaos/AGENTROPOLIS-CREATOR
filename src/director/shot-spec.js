function subjectProjection(placements, key) {
  return placements
    .filter((placement) => placement[key] !== undefined)
    .map(({ subject_id, at_seconds = 0, [key]: value }) => ({ subject_id, at_seconds, value }));
}

/** Assemble the normalized, endpoint-neutral shot contract. */
export function compileShotSpec(input, compiled) {
  const placements = compiled.blocking.first_frame_and_spatial_blocking.placements;
  return {
    production_contract_version: compiled.production_contract_version,
    format_mode: compiled.timing.format_mode.mode,
    duration: compiled.timing.format_mode.duration_seconds,
    active_references: structuredClone(compiled.context.active_references),
    location_map: structuredClone(compiled.blocking.location_map),
    first_frame: structuredClone(compiled.blocking.first_frame_and_spatial_blocking),
    screen_position: subjectProjection(placements, 'screen_position'),
    world_position: subjectProjection(placements, 'world_position'),
    gaze_target: subjectProjection(placements, 'gaze_target'),
    body_orientation: subjectProjection(placements, 'body_orientation'),
    landmark_proximity: placements.filter(({ landmark_id }) => landmark_id).map(
      ({ subject_id, landmark_id, distance_m }) => ({ subject_id, landmark_id, distance_m }),
    ),
    camera_side: input.camera_mode?.camera_side ?? 'UNSPECIFIED',
    optics: structuredClone(compiled.optics),
    field_of_view: compiled.optics.field_of_view_degrees,
    physical_camera_distance: structuredClone(compiled.optics.camera_distance),
    camera_motion: structuredClone(input.camera_mode?.camera_motion ?? 'STATIC'),
    focus_behavior: structuredClone(input.camera_mode?.focus_behavior ?? 'UNSPECIFIED'),
    lighting_direction: compiled.lighting.key_direction,
    action_timing: structuredClone(compiled.timing.action_timing),
    physics: structuredClone(input.physics ?? []),
    audio: structuredClone(compiled.audio),
    dialogue: structuredClone(compiled.timing.dialogue),
    lip_sync_owner: compiled.audio.lip_sync_owner,
    offscreen_only_entities: structuredClone(input.offscreen_only_entities ?? []),
    continuity_locks: structuredClone(compiled.continuity),
    positive_locks: structuredClone(input.positive_constraints ?? []),
    forbidden_carryover: structuredClone(input.forbidden_carryover ?? []),
    voice_profiles: structuredClone(compiled.voice.permanent_profiles),
    acting_performance: structuredClone(compiled.acting.scene_performances),
    ensemble_sync_mode: compiled.acting.ensemble_sync_mode,
    ensemble_sync_authorization: structuredClone(compiled.acting.ensemble_sync_authorization),
    generation_fallback: 'PROHIBITED',
  };
}
