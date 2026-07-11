---
name: audio-to-midi-foundry
description: governed Creator Foundry skill for converting rights-cleared audio into editable MIDI, tempo maps, confidence reports, and DAW or game-engine handoff packets. use when Agentropolis Creator, Hermes, 33.3FM, a game workflow, video workflow, or publishing workflow needs melody transcription, beat extraction, symbolic music conversion, quantization planning, MIDI cleanup, or provider-neutral Audio-to-MIDI MCP execution packets.
---

# Audio-to-MIDI Foundry

Convert rights-cleared audio into reviewable symbolic music data without pretending transcription is perfect.

## Role

This skill prepares and validates Audio-to-MIDI work for the Creator District. It may execute only through an approved local tool or AGENTROPOLIS-AGENT-MCP adapter.

```text
audio
  -> rights check
  -> transcription target
  -> adapter check
  -> analysis
  -> note-event draft
  -> confidence map
  -> reversible cleanup
  -> human review
  -> MIDI handoff
```

## Activation Triggers

Use this skill when the user asks to:

- turn audio, humming, singing, or an instrument recording into MIDI
- extract melody, chords, bass, drums, tempo, beat markers, or notation
- prepare a MIDI file for Ableton Live, FL Studio, Logic Pro, Reaper, Bitwig, notation software, or a game engine
- sync video edits or visuals to beats found in audio
- create adaptive game-music motifs from approved source audio
- analyze an Audio-to-MIDI service or backend for Creator District integration
- generate an MCP execution packet for Audio-to-MIDI transcription

## Required Environment

Planning requires no external provider.

Execution requires one of:

- an approved local Audio-to-MIDI backend
- an approved provider adapter routed through AGENTROPOLIS-AGENT-MCP
- a user-controlled workstation lane with file access and a receipt-producing wrapper

Never invent adapter availability, pricing, accuracy, credential state, or successful file generation.

## Inputs

Require or infer:

- audio asset or approved reference
- rights status
- privacy class
- transcription target: melody, chords, bass, percussion, tempo map, full arrangement, or notation
- transcription mode: monophonic, polyphonic, percussion, or automatic
- quantization preference: off, light, strict, or custom
- preserve microtiming: yes or no
- target DAW, notation tool, game engine, archive, or generic MIDI
- instrument mapping preference

If rights status is unknown, return a planning packet and block execution.

## Output Structure

Return:

1. **Job Summary**
2. **Rights and Privacy Check**
3. **Transcription Target**
4. **Adapter Status**
5. **Analysis Plan**
6. **MIDI Cleanup Plan**
7. **Confidence and Failure Notes**
8. **Execution Packet**
9. **QC Checklist**
10. **Delivery Handoff**

## Execution Packet

```yaml
skill: audio-to-midi-foundry
lane: creator.audio.symbolic
status: planning_only | execution_ready | blocked_rights_review | blocked_adapter | needs_human_review
input:
  asset_ref: ""
  rights_status: owned | licensed | public_domain | public_safe | unknown
  privacy: public | private | restricted
  target:
    - melody
settings:
  transcription_mode: monophonic | polyphonic | percussion | auto
  quantization: off | light | strict | custom
  preserve_microtiming: true
  velocity_mode: inferred | fixed | source_energy
  target_ppq: 480
adapter:
  route: local | agentropolis-agent-mcp
  name: null
  configured: true | false | unknown
outputs:
  midi_file: null
  tempo_map: null
  key_estimate: null
  confidence_map: null
  cleanup_report: null
  provenance_receipt: null
guardrails:
  require_rights_check: true
  require_human_review: true
  preserve_raw_transcription: true
  store_private_source: false
  claim_perfect_accuracy: false
```

## Cleanup Rules

- Preserve the raw transcription before edits.
- Prefer light quantization by default.
- Do not erase swing, rubato, or intentional timing variation without instruction.
- Flag octave uncertainty instead of silently forcing a note.
- Separate detected events from inferred harmony.
- Mark low-confidence notes, tempo changes, and chord guesses.
- Keep instrument mapping editable.

## QC Checklist

Check for:

- wrong pitches
- octave jumps
- missing attacks
- duplicate notes
- false notes from noise, room tone, reverb, or bleed
- tempo drift
- meter errors
- destroyed groove
- bad velocity inference
- over-quantization
- incorrect percussion mapping
- hallucinated chords or instruments
- mismatch between source length and MIDI length
- missing provenance or rights information

## Chain Relationships

```text
chains in from:
  rights-clearance intake
  Creator asset intake
  33.3FM production brief
  video edit brief
  game audio brief

chains out to:
  AGENTROPOLIS-AGENT-MCP adapter execution
  DAW handoff
  notation export
  video beat-sync workflow
  adaptive game-music workflow
  33.3FM asset registry
  provenance receipt
```

## Example

**User request:** “Turn this bassline recording into MIDI for Ableton, but keep the human timing.”

**Expected behavior:**

- verify the recording is owned or licensed
- select monophonic bass transcription
- disable strict quantization
- preserve microtiming
- prepare or invoke an approved adapter
- return the MIDI reference, confidence notes, cleanup report, and Ableton handoff packet
- clearly state any notes that require manual correction

## Agentropolis Placement

This is a **CREATOR Foundry skill**, not a separate district.

AGENTROPOLIS-CREATOR defines the workflow and quality gates. AGENTROPOLIS-AGENT-MCP governs execution. Applications such as 33.3FM, video, games, and publishing consume only approved outputs and references.

## Guardrails

- Do not transcribe or redistribute audio without appropriate rights or permission.
- Do not expose private audio or credentials.
- Do not commit generated user assets to the repository.
- Do not claim exact notes, chords, tempo, key, or accuracy when the backend did not verify them.
- Do not treat Mirelo or any other external service as approved merely because it is referenced in research.
- Do not hard-code provider-specific behavior into the core skill contract.
- Require human review before public release, commercial use, or canon registration.