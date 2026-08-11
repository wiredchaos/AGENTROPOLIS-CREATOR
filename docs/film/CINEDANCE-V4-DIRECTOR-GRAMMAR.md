# CINEDANCE V4 Director Grammar

`DIRECTOR_GRAMMAR=CINEDANCE_V4` is a deterministic directing grammar and shot-specification compiler. It is not source canon, a media asset, a matcher, or a generation operation.

The Story-Asset Matcher remains the only component that selects existing assets. The director compiler accepts already-approved story context and matcher-selected asset IDs, then describes how those assets are staged, photographed, timed, lit, sounded, and edited. It cannot add references, select replacement assets, or invoke a provider.

## Input contract

The compiler accepts structured values for:

- `scene_id` and `selected_asset_ids`;
- `active_characters` and `active_references`;
- `location`, `props`, and `vehicles`;
- `format_mode` and `first_frame_requirements`;
- `spatial_blocking`, `camera_mode`, and `optics`;
- `action_timing`, `physics`, and `lighting`;
- `audio` and `dialogue`;
- `continuity_requirements` and `forbidden_carryover`.
- permanent `voice_profiles`, immutable `master_acting_profiles`, and current `scene_acting`;
- `lip_sync_owner`, `offscreen_only_entities`, and machine-checkable hard locks.

Selected asset IDs are assertions supplied by the matcher, not candidates for the compiler to rank. Every `@tag`, character, prop, landmark, gaze target, and continuity lock used by direction must be declared in the current input.

## Output grammar

Compilation produces these sections:

1. `SCENE CONTEXT`
2. `ACTIVE REFERENCES`
3. `LOCATION MAP`
4. `FIRST FRAME AND SPATIAL BLOCKING`
5. `FORMAT MODE`
6. `OPTICS`
7. `CAMERA`
8. `ACTION TIMING`
9. `PHYSICS`
10. `LIGHTING`
11. `AUDIO`
12. `POSITIVE CONSTRAINTS`

The envelope also identifies the grammar and version and fixes `generation_fallback=PROHIBITED`.

## Context isolation

Compilation fails closed on context leakage. It rejects:

- undefined `@tags` or invented references;
- inactive or unused characters carried into directional fields;
- prior-scene wording such as “as before,” “previous scene,” or “last scene”;
- scene-number wording outside the opaque `scene_id` field;
- undefined props, landmarks, gaze targets, or continuity state;
- forbidden carryover present in the current context.

References that are explicitly declared but no longer active are removed from the compiled active-reference list. A reference used anywhere else must be active and resolve to a selected asset or active character.

## Directional validation

The grammar validates that the first frame accounts for every required active character, body and gaze orientation resolve to declared targets, landmark proximity is explicit, and assigned prop hand/owner matches the prop definition. `SINGLE_TAKE` forbids cuts; `CONTROLLED_MULTI_SHOT` requires declared, ordered cuts and preserves locked continuity and lighting direction across them.

Action and dialogue intervals must fit the shot duration without invalid overlap. Dialogue must satisfy the configured words-per-second ceiling. Movement exceeding the configured physical speed or its explicit movement limit is rejected.

## Optics policy

Explicit source FOV is preserved and wins over focal-length inference. Focal length is converted to horizontal FOV only when the source supplies sensor width. CINEDANCE-native diagonal FOV remains diagonal. The default implementation policy retains a 2-degree tolerance for comparable horizontal values and configurable lens profiles (`WIDE` 18–35 mm, `NORMAL` 36–60 mm, `TELEPHOTO` 61–200 mm).

These ranges are production policy defaults, not source canon. A production may provide a versioned CINEDANCE policy override. Changing optics policy cannot change story facts, identity, canon, asset eligibility, or matcher results.

## Safety boundary

The compiler emits data only. There is no network client, generation endpoint, media downloader, or fallback-to-generation behavior in `src/director/`.
