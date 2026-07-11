# MuScriptor Audio-to-MIDI Creator Lane

## Status

Candidate local/open-source transcription backend for the AGENTROPOLIS-CREATOR music and audio foundry.

MuScriptor is not a new Agentropolis district. It is an optional creator-lane backend for converting rights-cleared mixed audio into instrument-aware note events and MIDI artifacts.

## Upstream

- Project: `muscriptor/muscriptor`
- Authors: Kyutai and Mirelo
- Code license: MIT
- Published model weights: CC BY-NC 4.0
- Primary capability: multi-instrument automatic music transcription from full audio mixes

## License Boundary

The code may be evaluated and adapted under MIT.

The published model weights are non-commercial. Do not use those weights for paid products, monetized creator services, commercial customer work, or production revenue workflows without a separate license or a commercially permitted model.

Every execution packet must record:

```yaml
license_receipt:
  code: MIT
  weights: CC-BY-NC-4.0 | commercial_license | alternative_model
  intended_use: research | personal | nonprofit | commercial
  commercially_permitted: true | false | unknown
```

If `intended_use` is `commercial` and `commercially_permitted` is not `true`, execution is blocked.

## Capability

MuScriptor can:

- transcribe full mixed recordings instead of requiring isolated stems
- detect and label instrument groups
- emit pitch, note start, note end, and instrument identity
- export MIDI directly
- stream transcription events as JSON or JSONL
- condition transcription on expected instrument groups
- expose a local FastAPI web service and browser piano roll
- generate an auralized comparison mix when FluidSynth is available

Known limitation:

- released transcription events do not preserve note velocity

## Model Profiles

```yaml
profiles:
  small:
    parameters: 103M
    target: CPU and lightweight local evaluation
  medium:
    parameters: 307M
    target: default accuracy and speed balance
  large:
    parameters: 1.4B
    target: GPU-backed high-accuracy evaluation
```

## Agentropolis Placement

```text
Creator intent or rights-cleared audio
  -> AGENTROPOLIS-CREATOR
  -> audio rights and license gate
  -> AGENTROPOLIS-AGENT-MCP
  -> approved local MuScriptor adapter
  -> note-event stream and MIDI artifact
  -> human correction and DAW handoff
  -> receipt and approved asset reference
```

Possible consumers:

- 33.3FM DOGECHAIN production workflows
- creator DAW export workflows
- soundtrack prototyping
- game-music analysis and adaptive score preparation
- music education and notation support
- searchable music-structure metadata

33.3FM remains a consumer of approved assets. The model service belongs in the Creator Foundry and is routed through the MCP membrane.

## Proposed Adapter Contract

```yaml
adapter: muscriptor-local
lane: creator.audio.transcription
status: candidate
execution: local_only
input:
  audio_ref: local_path_or_approved_object_ref
  rights_status: owned | licensed | public_domain | unknown
  intended_use: research | personal | nonprofit | commercial
  expected_instruments: []
  model_profile: small | medium | large
  output_format: midi | json | jsonl
options:
  batch_size: auto
  beam_size: 1
  sampling: false
  temperature: 1.0
outputs:
  - midi_file
  - note_event_stream
  - instrument_manifest
  - transcription_receipt
guardrails:
  require_rights_check: true
  require_license_check: true
  require_human_review: true
  preserve_source_audio: false
  public_network_exposure: false
```

## Local Evaluation Commands

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

Streaming event output:

```bash
uvx muscriptor transcribe input.wav --format jsonl -o -
```

Local browser service:

```bash
uvx muscriptor serve --model small --host 127.0.0.1 --port 8222
```

Do not bind to `0.0.0.0` by default. LAN or public exposure requires an explicit network review and authentication layer.

## Evaluation Gate

Before promotion beyond candidate status, test:

- clean solo instrument
- vocals plus accompaniment
- dense full mix
- percussion-heavy track
- distorted guitar track
- non-Western instrumentation
- tempo changes
- poor-quality source audio
- long-form audio and chunk continuity
- false instrument labels
- note timing accuracy
- CPU memory and latency for the small profile
- GPU memory and throughput for medium and large profiles

## Required Outputs

Each run must produce:

1. MIDI artifact or structured event stream
2. detected instrument manifest
3. model profile and version
4. source-rights status
5. code and weight license receipt
6. intended-use classification
7. human review status
8. known errors or correction notes

## Promotion Rule

MuScriptor remains a candidate until:

- local evaluation passes
- the MCP adapter contract is implemented
- resource limits are measured
- malformed-file handling is tested
- license checks are enforced in code
- a human correction workflow is defined

For commercial use, replace the non-commercial weights or obtain a commercial license before production deployment.