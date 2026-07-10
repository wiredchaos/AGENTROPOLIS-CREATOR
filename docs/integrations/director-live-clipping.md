# DIRECTOR Live Transcript and Clip Trigger Integration

DIRECTOR is the live media intelligence layer for AGENTROPOLIS. It ingests timestamped stream transcripts, evaluates rolling context windows, and queues clip extraction when a configurable score threshold is reached.

## Repository responsibility

AGENTROPOLIS-CREATOR owns the creator-facing workflow: clip review, caption editing, platform variants, approval controls, and publishing handoff.

## Creator surface

The DIRECTOR tab appears in the Hermes Dashboard sidebar and exposes:

- rolling transcript
- clip queue
- generated captions
- confidence and moment score
- approve, reject, trim, regenerate, and export actions

## Transcript sources

- OBS WebSocket plus a transcript bridge
- local Whisper processing stream audio
- Gladia, Otter, or another live transcription API or watched file

## Trigger contract

```text
moment_score >= clip_trigger_threshold
```

The scoring window may use transcript meaning, emphasis, surprise, humor, conflict, quotability, audience reactions, chat velocity, speaker energy, and creator-defined keywords.

## Creator workflow

```text
live transcript
  -> DIRECTOR detection
  -> clip queue
  -> creator review
  -> trim or approve
  -> caption variants
  -> render and export
```

Every generated caption must remain linked to its source transcript window and clip job. Human edits must be preserved separately from model output for audit and rollback.

## Reliability rules

DIRECTOR must not fabricate missing dialogue or publish clips automatically unless the creator has explicitly enabled an approved automation policy. Incomplete transcript events are ignored by default.
