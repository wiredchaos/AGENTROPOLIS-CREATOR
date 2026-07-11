---
name: audio-to-midi-transcriber
description: governed creator foundry skill for converting rights-cleared music audio into instrument-aware note events and MIDI using an approved local transcription adapter such as MuScriptor. use when hermes, agentropolis creator, 33.3FM production, a game-audio workflow, or a connected agent needs to inspect a full music mix, identify instrument parts, export MIDI, produce a note-event stream, prepare a DAW handoff, or evaluate automatic music transcription while enforcing source-rights, model-license, local-execution, and human-review gates.
---

# Audio-to-MIDI Transcriber

Use this skill to turn a rights-cleared audio recording into governed MIDI and structured music-transcription artifacts.

This skill prepares and validates a transcription workflow. It must not claim that audio was transcribed unless an approved tool returns an artifact or execution receipt.

## Core Flow

```text
rights-cleared audio
  -> source-rights check
  -> intended-use classification
  -> code and model-license check
  -> local adapter selection
  -> transcription
  -> instrument manifest
  -> MIDI or note-event stream
  -> human correction
  -> DAW or downstream handoff
  -> receipt
```

## Default Backend Candidate

MuScriptor may be used as an optional local adapter candidate.

Important boundary:

- upstream code: MIT
- published model weights: CC BY-NC 4.0
- published weights are not approved for commercial workflows unless separate commercial permission exists

Do not describe MuScriptor as commercially deployable by default.

## Inputs

Require or infer:

- audio asset reference
- rights status: owned, licensed, public domain, unknown
- intended use: research, personal, nonprofit, commercial
- requested output: MIDI, JSON, JSONL, instrument manifest, evaluation report
- expected instruments, if known
- model profile: small, medium, large, or approved alternative
- execution target: local workstation or approved private node
- correction target: DAW, notation tool, game engine, metadata store, or analysis only

If rights status is unknown, planning may continue but execution is blocked.

If commercial use is requested with non-commercial model weights, execution is blocked.

## Output

Return these sections:

1. **Transcription Brief**
2. **Rights Check**
3. **License Check**
4. **Adapter Selection**
5. **Execution Packet**
6. **Instrument Manifest**
7. **Artifact Manifest**
8. **Quality Review**
9. **DAW or Consumer Handoff**
10. **Receipt**

## License Gate

Use this structure:

```yaml
license_check:
  adapter: muscriptor-local | approved_alternative
  code_license: MIT | other | unknown
  model_weights_license: CC-BY-NC-4.0 | commercial_license | other | unknown
  intended_use: research | personal | nonprofit | commercial
  commercially_permitted: true | false | unknown
  can_execute: true | false
  blocked_reason: none | rights_unknown | noncommercial_weights | license_unknown | adapter_unavailable
```

Rules:

- `commercial` plus `CC-BY-NC-4.0` means `can_execute: false`.
- `unknown` rights or license means `can_execute: false`.
- Do not infer commercial permission from an MIT code license when the weights use a different license.

## Execution Packet

```yaml
skill: audio-to-midi-transcriber
lane: creator.audio.transcription
status: execution_ready | planning_only | blocked_rights_review | blocked_license | blocked_adapter
input:
  audio_ref: ""
  rights_status: owned | licensed | public_domain | unknown
  intended_use: research | personal | nonprofit | commercial
  expected_instruments: []
adapter:
  name: muscriptor-local | approved_alternative
  execution: local_only
  model_profile: small | medium | large
  device: cpu | cuda | auto
  network_binding: 127.0.0.1
options:
  output_format: midi | json | jsonl
  batch_size: auto
  beam_size: 1
  sampling: false
  temperature: 1.0
license:
  code: MIT | other | unknown
  weights: CC-BY-NC-4.0 | commercial_license | other | unknown
outputs:
  - midi_file
  - note_event_stream
  - instrument_manifest
  - transcription_receipt
guardrails:
  require_rights_check: true
  require_license_check: true
  require_human_review: true
  allow_public_network_binding: false
  retain_source_audio: false
  claim_velocity_recovery: false
```

## Model Selection

Use `small` first for CPU evaluation and low-cost local testing.

Use `medium` only when the workstation can support the higher resource load and accuracy needs justify it.

Use `large` only on an approved GPU node after resource review.

Do not claim exact latency, memory usage, or accuracy without measured local results.

## Known Capability Boundary

MuScriptor can recover:

- pitch
- onset time
- offset time
- instrument identity

The released tokenizer does not preserve note velocity. Do not claim that dynamics or loudness were faithfully recovered.

## Suggested Local Commands

Basic MIDI export:

```bash
uvx muscriptor transcribe input.wav -o output.mid --model small
```

Expected-instrument conditioning:

```bash
uvx muscriptor transcribe input.wav \
  -o output.mid \
  --model medium \
  --instruments acoustic_piano,drums
```

JSONL event stream:

```bash
uvx muscriptor transcribe input.wav --format jsonl -o -
```

Local service:

```bash
uvx muscriptor serve --model small --host 127.0.0.1 --port 8222
```

Do not expose the service on `0.0.0.0` unless authentication, firewall rules, and an explicit network review are in place.

## Quality Review

Check for:

- missed notes
- duplicate notes
- incorrect note duration
- timing drift across chunks
- false instrument labels
- missing percussion events
- harmony collapsed into one instrument
- vocal notes assigned to another instrument
- distorted guitar or dense-mix failure
- tempo-change errors
- unusable MIDI density
- missing or malformed output
- source and output duration mismatch

## Human Correction Rule

Automatic transcription is a draft, not a final score.

Before public release, sale, game integration, sync placement, or education delivery, a human must review and correct the MIDI or notation output.

## Consumer Handoff

Approved outputs may be routed to:

- DAWs
- notation software
- 33.3FM production workflows
- game-audio prototyping
- soundtrack analysis
- educational practice tools
- searchable music metadata systems

The consumer receives approved artifact references, not unrestricted access to the transcription backend.

## Agentropolis Placement

```text
AGENTROPOLIS-CREATOR
  -> owns transcription planning, local evaluation, artifact packaging, and QC

AGENTROPOLIS-AGENT-MCP
  -> enforces adapter routing, rights checks, license checks, execution limits, and receipts

33.3FM DOGECHAIN or game/music consumers
  -> consume approved MIDI and metadata artifacts

agentropolis
  -> stores approved references and receipts, not raw private audio by default
```

## Guardrails

- Do not transcribe audio the user does not own or have permission to process.
- Do not bypass copyright, DRM, access controls, or platform restrictions.
- Do not treat generated MIDI as proof of ownership or authorship.
- Do not use CC BY-NC model weights for commercial workflows without separate permission.
- Do not expose local services publicly by default.
- Do not commit private source audio, generated stems, MIDI files, or user project assets to the repository.
- Do not claim transcription succeeded without returned artifacts or receipts.
- Do not invent instrument detection, chord detection, key detection, tempo detection, or quality scores.
- Always preserve a human review step before production use.