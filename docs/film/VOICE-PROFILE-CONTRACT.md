# Immutable Voice Profile Contract

Voice identity is permanent character production metadata, separate from story canon, scene acting, dialogue text, and audio reference ownership.

Each profile contains:

```text
character_id
voice_profile
voice_version
source
review_state
```

`voice_profile` records stable age/origin/accent, register, timbre, cadence, delivery character, and pressure response. `voice_version` is explicit and never fabricated. `source` identifies the approval record or production reference. `review_state` is `APPROVED` or `REQUIRES_REVIEW`.

Every profile carries `production_contract_version=1.0.0`.

The formal schema is `data/story/character-voice-profile.schema.json`. Runtime enforcement is in `src/director/voice.js`.

Scene direction may select only these performance modifiers by default: `flat`, `tired`, `deadpan`, `angry`, `whispered`, or `panicked`. A modifier affects the current delivery but cannot replace `voice_profile`, `voice_version`, or `source`. A speaking character must resolve to a permanent profile. A changed permanent identity requires a new reviewed profile version, not an inline scene override.

Illustrative CAL and TIKA descriptions supplied with the production convention demonstrate the shape of voice prose. They are not automatically registered as canon or character records because no durable source/approval IDs were supplied.
