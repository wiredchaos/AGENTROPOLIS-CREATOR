# Audio-to-MIDI Foundry Lane

## Status

**Classification:** Creator Foundry capability lane  
**Owner:** AGENTROPOLIS-CREATOR  
**Execution boundary:** AGENTROPOLIS-AGENT-MCP  
**Reference:** Mirelo article, “Turning Audio to MIDI”  
**Dependency status:** research reference only; no provider or model is approved by this document

## Purpose

The Audio-to-MIDI Foundry Lane converts rights-cleared audio into structured symbolic music data that creator agents can inspect, edit, route, and render.

The lane is not a new district and not a replacement for a DAW. It is a reusable intelligence service for the Creator District, 33.3FM production workflows, games, video, publishing, and approved applications.

```text
rights-cleared audio
  -> source and consent check
  -> separation or channel selection
  -> onset, pitch, tempo, and meter analysis
  -> note-event transcription
  -> confidence scoring
  -> MIDI cleanup and quantization
  -> human review
  -> DAW, game, video, radio, or archive handoff
```

## Core Capabilities

- melody transcription
- monophonic note extraction
- polyphonic transcription when supported by an approved backend
- tempo and beat-grid detection
- key and scale estimation
- note velocity approximation
- instrument or stem routing when source separation is available
- quantization with reversible settings
- MIDI export
- MusicXML or notation handoff when supported
- DAW-ready metadata packaging
- confidence maps for uncertain notes
- provenance and rights receipts

## Agentropolis Placement

```text
AGENTROPOLIS-CREATOR
  -> builds transcription plans, cleanup rules, MIDI packets, and QC artifacts

AGENTROPOLIS-AGENT-MCP
  -> validates adapters, secrets, file access, execution limits, and receipts

33.3FM-DOGECHAIN / AGENTROPOLIS-33.3
  -> may consume approved MIDI assets for station IDs, beds, stingers, remixes, and searchable music metadata

CHAOS Gaming and other applications
  -> may consume approved MIDI for adaptive music, events, and procedural scoring

agentropolis
  -> stores only approved references, metadata, and receipts according to runtime policy
```

## Required Inputs

- source audio file or approved audio reference
- rights status: owned, licensed, public-domain, public-safe, or unknown
- intended output: melody, chords, drums, bass, full arrangement, beat grid, or notation
- target tempo behavior: preserve, detect, normalize, or quantize
- target MIDI resolution
- expected instrument or General MIDI mapping
- destination: Ableton Live, FL Studio, Logic Pro, Reaper, Bitwig, game engine, notation software, archive, or generic MIDI
- privacy classification

If rights status is unknown, planning may continue but execution and distribution must remain blocked.

## Output Packet

```yaml
skill: audio-to-midi-foundry
lane: creator.audio.symbolic
status: planning_only | execution_ready | blocked_rights_review | blocked_adapter | needs_human_review
input:
  asset_id: ""
  rights_status: owned | licensed | public_domain | public_safe | unknown
  privacy: public | private | restricted
  requested_targets:
    - melody
    - tempo_map
output:
  midi_file: null
  tempo_map: null
  key_estimate: null
  confidence_map: null
  cleanup_report: null
  provenance_receipt: null
settings:
  quantization: off | light | strict | custom
  preserve_microtiming: true
  velocity_mode: inferred | fixed | source_energy
  transcription_mode: monophonic | polyphonic | percussion | auto
routing:
  execution: agentropolis-agent-mcp
  human_review_required: true
```

## Quality Gates

Every result must be reviewed for:

- wrong notes or octave jumps
- missed note attacks
- false note events caused by noise or reverb
- tempo drift
- incorrect time signature
- over-quantization
- destroyed swing or groove
- bad velocity inference
- instrument mapping errors
- stem bleed
- hallucinated chords
- unsupported claims of transcription accuracy
- rights or consent gaps

## Guardrails

- Do not claim perfect transcription.
- Do not treat a confidence score as proof of correctness.
- Do not publish or redistribute copyrighted source audio without authorization.
- Do not commit private audio, generated MIDI, credentials, or signed URLs to the repository.
- Do not assume a Mirelo API, SDK, license, pricing model, or self-hosted runtime exists unless separately verified.
- Do not hard-code one provider into the Foundry contract.
- Keep quantization reversible and preserve the unmodified transcription when possible.
- Require human approval before public release or commercial use.

## Initial Integration Targets

1. **Creator Workstation** — local or approved remote transcription adapter.
2. **33.3FM production** — station IDs, stingers, beds, and searchable musical metadata.
3. **Video Foundry** — beat markers and edit synchronization.
4. **Game Foundry** — adaptive MIDI motifs and event-driven score layers.
5. **Publishing / AuthorMind** — theme extraction, notation, and companion media packages.

## Promotion Criteria

A backend can move from candidate to approved adapter only after:

- license review
- reproducible install or API documentation
- supported format verification
- privacy and file-retention review
- benchmark set with monophonic, polyphonic, percussion, noisy, and live-recorded inputs
- latency and cost measurement
- failure-mode documentation
- MCP routing and receipt support
- human review workflow

Until those checks are complete, Mirelo and any other Audio-to-MIDI system remain research references or adapter candidates.