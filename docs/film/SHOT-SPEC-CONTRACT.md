# Normalized Shot Specification Contract

The CINEDANCE V4 compiler emits an endpoint-neutral `shot_spec` validated by `data/story/shot-spec.schema.json`. It directs matcher-selected existing assets; it neither selects assets nor authorizes generation.

## Normalized fields

The contract explicitly carries:

- format and duration: `format_mode`, `duration`;
- reference and geography: `active_references`, `location_map`, `first_frame`;
- blocking: `screen_position`, `world_position`, `gaze_target`, `body_orientation`, `landmark_proximity`;
- camera: `camera_side`, `optics`, `field_of_view`, `physical_camera_distance`, `camera_motion`, `focus_behavior`;
- temporal/physical state: `action_timing`, `physics`, `lighting_direction`;
- sound: `audio`, `dialogue`, `lip_sync_owner`;
- isolation and continuity: `offscreen_only_entities`, `continuity_locks`, `positive_locks`, `forbidden_carryover`;
- separate `voice_profiles` and `acting_performance`;
- `generation_fallback=PROHIBITED`.

## Optics normalization

Optics normalize to `field_of_view_degrees`, `field_of_view_basis`, `lens_class`, `camera_distance`, `depth_behavior`, `compression_behavior`, and exact `source_text`. An explicitly supplied FOV wins. Focal length is converted to an exact horizontal FOV only when sensor width is explicitly known. Without a known sensor, focal length remains preserved while FOV records `null` and `fov_source=REQUIRES_SENSOR_ASSUMPTION`, unless the source itself supplies an FOV.

Allowed bases are `DIAGONAL`, `HORIZONTAL`, `VERTICAL`, and `UNKNOWN`. CINEDANCE-native diagonal FOV is preserved as diagonal; vertical, diagonal, horizontal, and unknown values are never compared or converted across bases without explicit compatible sensor/aspect evidence. Lens/FOV policy remains configurable production grammar, not canon.

## Machine-checkable hard locks

Supported lock types are:

`HEIGHT_LOCK`, `EYELINE_LOCK`, `OFFSCREEN_ONLY`, `VISIBLE_DOORS_STATIC`, `SPEECH_SEGMENT_COUNT`, `WORD_COUNT`, `HAND_OWNERSHIP`, `LIP_SYNC_OWNERSHIP`, `CAMERA_SIDE_180`, `CHARACTER_COUNT`, `PROP_STATE`, `LIGHTING_DIRECTION`, and `EVENT_TIMECODE`.

`SPEECH_SEGMENT_COUNT` counts explicit scripted dialogue segments/lines. `WORD_COUNT` separately counts whitespace-delimited scripted words. There is no ambiguous `SPEECH_COUNT` or inferred `SYLLABLE_COUNT` lock. `CAMERA_SIDE_180` validates the declared camera side at the opening and every declared cut. Generic locked values continue to be checked across cut states.

Every evaluated hard lock records `validation_status=PASS` or `NOT_MACHINE_VERIFIABLE` plus a reason. `VISIBLE_DOORS_STATIC`, `PROP_STATE`, `EVENT_TIMECODE`, `HAND_OWNERSHIP`, and `OFFSCREEN_ONLY` cannot pass without corresponding structured state evidence. Missing evidence produces `NOT_MACHINE_VERIFIABLE`; contradictory evidence fails compilation.

## Audio ownership

`lip_sync_owner` owns visible lexical mouth movement. `all_audible_words_owned_by` owns every audible dialogue segment associated with the referenced audio. Other active characters may react or perform non-lexical behavior but cannot receive dialogue records for the owned words. Normalized metadata should retain the audio source reference and timing rather than duplicating copyrighted lyric text unless an explicitly authorized local production requirement says otherwise.

The shot specification and enclosing compiler output carry `production_contract_version=1.0.0`. The same value appears in matcher and Higgsfield ingestion receipts.
