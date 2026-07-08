# Pocket TTS Local Voice Integration

Status: candidate local/offline narration engine for AGENTROPOLIS-CREATOR.

Pocket TTS is being tracked as a possible voice option for creator tools because the discovery notes describe it as CPU-first, lightweight, stream-capable, and usable through Python API/CLI.

## Creator usage

Potential use cases:

- narration for exported ebooks
- voiceover for generated landing pages
- NPC dialogue packs
- BWB-style bulletin narration
- radio bumper generation
- draft voice reads before final production
- offline creator mode without API spend

## Product rule

Creator templates should not hard-code Pocket TTS.

Preferred flow:

```txt
Creator surface -> AGENTROPOLIS voice gateway -> selected TTS provider
```

Pocket TTS can become the local provider after benchmark and license review.

## Export modes

Recommended future modes:

- `silent`: no narration
- `mock`: test audio placeholder
- `local`: Pocket TTS candidate
- `premium`: hosted TTS fallback, opt-in only

## Guardrails

- Do not clone real voices without explicit permission.
- Do not ship generated voice assets without documenting rights.
- Do not require cloud APIs for basic exports.
- Keep provider selection swappable.

## Validation needs

Before product integration:

- verify package install name and commands
- verify license and commercial usage
- test output quality for ebook narration
- test short CTA lines and long chapters
- test CPU/RAM usage
- test export packaging for audio files

## Current status

Tracked for creator workflow planning. Not production locked.
