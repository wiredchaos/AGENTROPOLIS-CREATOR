# Stem Studio Audio Lane

**Role:** Creator-side production adapter for separating approved video or audio into dialogue, music, effects, and a conformed married mix.

## Boundary

Stem Studio is an external local-first specialist adapter. It is not the Creator runtime, not the Voice Gateway, and not a rights-clearing service.

## Creator workflows

- isolate dialogue for cleanup, dubbing, captioning, and translation
- replace or duck music in trailers, shorts, podcasts, and OTT edits
- recover effects for remixing and sound design
- export sample-aligned stems for NLE work
- hand approved dialogue stems to Voice Gateway services
- hand approved music and SFX stems to the Gaming District

## Required corridor

```text
Rights Check -> Source Hash -> Local Separation -> QA -> Asset Registry -> District Handoff -> Receipt
```

## Required outputs

```text
<asset>_MARRIED.wav
<asset>_DIALOGUE.wav
<asset>_MUSIC.wav
<asset>_SFX.wav
<asset>_STEMS.mov  # optional
manifest.json
receipt.json
```

## Skill

```yaml
name: stem-splitter
version: 0.1.0
display_name: STEM SPLITTER
district: creator
pack: audio-production
tier: extended
layer: application
triggers:
  - split this soundtrack
  - isolate the dialogue
  - prepare stems for editing
chains_from:
  - rights-check
  - media-ingest
chains_to:
  - asset-registry
  - voice-gateway
  - game-audio-forge
orchestrated_by:
  - hermes-dispatch
requires:
  - pinned Stem Studio release
  - approved local input and output paths
  - source rights assertion
outputs:
  - dialogue, music, SFX, and married WAV files
  - optional multitrack MOV
  - manifest and receipt
```

## Safety

- process only owned, licensed, public-domain, or otherwise authorized media
- do not imply separated stems create new ownership rights
- do not clone a speaker from dialogue stems without explicit authorization
- pin release, installer, model, and dependency hashes
- default to local execution with blocked unapproved network egress
- require human QA before publication or Gaming deployment
