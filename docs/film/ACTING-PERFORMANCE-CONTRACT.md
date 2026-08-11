# Acting Performance Contract

The local `ACTING SKILL.md` is production behavior policy, not story canon or vault media. It owns performance behavior. Lira continues to own image-prompt/model routing, and CINEDANCE continues to own shot direction.

## Separation of state

Three layers remain independent:

1. The immutable master acting profile defines the character's durable physical and behavioral engine. It follows `data/story/character-acting-profile.schema.json`.
2. The immutable voice profile defines vocal identity under `data/story/character-voice-profile.schema.json`.
3. Scene acting adapts observable behavior to the present shot under `data/story/acting-performance.schema.json`.

Scene acting cannot contain or rewrite a voice profile. Neither scene acting nor voice metadata can mutate the master acting profile in place.

## Scene performance fields

Every supplied scene-performance record contains:

- `objective`, `obstacle`, and `stakes`;
- `tactics` and visible `beats`;
- `subtext` and optional `inner_line`;
- physical `business` and `proxemics`;
- enacted `status`, `eye_life`, and `reaction_timing`;
- `physical_state` and `scene_specific_behavior`.

Acting is represented as observable behavior under pressure. `ensemble_sync_mode=NATURAL_STAGGER` is the default and requires distinct rhythm identifiers so characters do not react in synthetic synchrony. `CHOREOGRAPHED_UNISON` is permitted only with an explicit `ensemble_sync_authorization` containing a non-empty authored reason and structured source. It is never inferred from matching reaction timings.

## Inner line

`inner_line` is private acting motivation. It stays inside the acting-performance section and must not be copied automatically into dialogue, voiceover, subtitles, captions, or normalized audio. If the same text is intentionally spoken, that requires a separate explicit dialogue record rather than implicit promotion.

Master and scene-performance records carry `production_contract_version=1.0.0`.
