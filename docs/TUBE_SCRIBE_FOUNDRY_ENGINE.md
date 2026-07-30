# TUBE SCRIBE — Creator Foundry Media Intelligence Engine

## Decision

Fork the useful local transcription core of `jn-root/youtube-transcriber`, preserve its MIT attribution, and evolve it into a governed AGENTROPOLIS-CREATOR capability.

TUBE SCRIBE belongs in the Creator Foundry. ASBE orchestrates it through PBX. AGENTROPOLIS-AGENT-MCP controls tool access, authority, credentials, and receipts.

```text
AGENTROPOLIS
  -> city law, identity, authority, routing, audit

AGENTROPOLIS-CREATOR
  -> owns TUBE SCRIBE media-intelligence capability

ASBE
  -> creates and coordinates studio, show, scene, shot, asset, and distribution jobs

PBX
  -> routes TUBE SCRIBE jobs and completed media packages

AGENTROPOLIS-AGENT-MCP
  -> gates source access, runtime tools, model lanes, secrets, and execution receipts
```

## Why This Is Not Just a Bigger CLI

The upstream project is a focused local CLI. Its core value is simplicity:

- strict YouTube video URL handling
- `yt-dlp` audio acquisition
- `ffmpeg` normalization
- `faster-whisper` transcription
- local text and Markdown output

The AGENTROPOLIS fork must retain that simple worker boundary while adding orchestration around it. The worker must not become a monolithic dashboard, social scheduler, editor, vector database, and publishing platform.

## Product Boundary

### TUBE SCRIBE owns

- approved source intake
- source normalization
- audio acquisition and normalization
- local-first transcription
- structured timestamped segment output
- optional speaker, chapter, quote, summary, and clip-candidate lanes
- artifact hashing
- QC checks
- media package assembly
- execution receipts

### Creator owns

- rights and reference intake
- Creator Prompt Contract compilation
- continuity and campaign context
- media-diff review
- reusable workflow and skill packaging
- human approval before public release

### ASBE owns

- studio and show context
- scene and shot relationships
- production job orchestration
- agent handoffs
- PBX routing
- asset registry
- downstream editing and distribution lanes

### AGENTROPOLIS-AGENT-MCP owns

- tool allowlists
- credentials and secret references
- provider authorization
- browser-cookie prohibition or explicit exception contracts
- runtime policy gates
- receipt logging

## Architecture

```text
Source Intake
  -> URL/file classification
  -> rights declaration
  -> authority gate
  -> job schema validation

Acquisition Worker
  -> yt-dlp adapter for approved public video
  -> local-file adapter for approved files
  -> metadata probe
  -> duration and size enforcement

Audio Pipeline
  -> ffprobe validation
  -> ffmpeg normalization
  -> optional retained audio derivative
  -> temporary working copy

Transcription Router
  -> local CPU
  -> local CUDA / BYOH
  -> approved BYOK provider only when explicitly selected
  -> no silent cloud fallback

Media Intelligence
  -> timestamped segments
  -> language metadata
  -> optional diarization
  -> optional chapters
  -> optional quote extraction
  -> optional clip candidates
  -> optional summaries and embeddings

Validation
  -> transcript non-empty
  -> segment ordering
  -> duration coverage
  -> output schema validation
  -> hash generation
  -> warning and omission ledger

Package + PBX
  -> media package
  -> asset registration request
  -> creator.media.transcript.ready
  -> human review
  -> downstream ASBE workflow
```

## Repository Shape

Recommended eventual dedicated repository:

```text
AGENTROPOLIS-TUBE-SCRIBE/
├── LICENSE
├── NOTICE
├── README.md
├── pyproject.toml
├── src/tube_scribe/
│   ├── cli.py
│   ├── api.py
│   ├── config.py
│   ├── domain/
│   │   ├── jobs.py
│   │   ├── assets.py
│   │   ├── segments.py
│   │   └── receipts.py
│   ├── adapters/
│   │   ├── youtube.py
│   │   ├── local_file.py
│   │   ├── ffmpeg.py
│   │   ├── whisper_local.py
│   │   ├── whisper_byoh.py
│   │   └── transcription_byok.py
│   ├── intelligence/
│   │   ├── chapters.py
│   │   ├── speakers.py
│   │   ├── quotes.py
│   │   ├── clips.py
│   │   └── summaries.py
│   ├── governance/
│   │   ├── authority.py
│   │   ├── rights.py
│   │   ├── retention.py
│   │   └── redaction.py
│   ├── packaging/
│   │   ├── manifest.py
│   │   ├── hashing.py
│   │   └── pbx.py
│   └── schemas/
├── tests/
├── docker/
├── examples/
└── docs/
```

The Creator repository keeps the canonical skill contract and integration doctrine. The dedicated runtime repository carries executable worker code.

## Creator and ASBE Features to Incorporate

### From AGENTROPOLIS-CREATOR

- Creator Prompt Contract status model: `complete`, `inferred_with_receipt`, `planning_only`, `blocked`
- no-silent-guessing policy
- rights-status validation
- inference receipts
- media-diff review
- human approval before public release
- provider-neutral routing
- local workstation / BYOH lane
- downstream AuthorMind and social-video workflows
- skill packaging for District Exchange

### From ASBE

- studio registry references
- show, scene, shot, and asset identifiers
- PBX event routing
- agent handoff records
- production queue status
- distribution lane targets
- health and canon endpoints
- retry by failed stage rather than restarting the entire workflow

## Output Profiles

### Transcript Core

- TXT
- Markdown
- structured JSON
- WebVTT
- SRT

### Creator Intelligence

- chapter map
- speaker map
- quote ledger
- hooks and clip candidates
- titles and descriptions
- keyword and entity map
- content warnings
- summary and briefing package

### ASBE Production

- asset manifest
- source and derivative relationships
- timeline markers
- clip in/out candidates
- scene/shot attachment suggestions
- PBX event packet
- QC and approval state

## Clip Candidate Rule

Clip candidates are recommendations, not completed edits.

Every candidate should include:

```json
{
  "id": "clip_001",
  "start_seconds": 120.4,
  "end_seconds": 162.0,
  "duration_seconds": 41.6,
  "hook": "Concise opening claim",
  "reason": "Self-contained explanation with a strong first sentence",
  "speaker_ids": ["speaker_01"],
  "transcript_excerpt": "...",
  "confidence": 0.82,
  "requires_editor_review": true
}
```

No clip may be marked final until media exists, the boundaries are reviewed, and an execution receipt confirms the render.

## Security and Anti-Moloch Controls

- allowlisted source hosts and adapters
- no `shell=True`
- no arbitrary command arguments from model output
- no automatic browser-cookie extraction
- no private-video bypass
- no silent cloud fallback
- bounded duration, file size, disk, memory, timeout, and concurrency
- isolated temporary workspace per job
- output directory cannot escape the assigned job root
- raw secrets excluded from logs and receipts
- hashes for source metadata and generated artifacts
- explicit retention and deletion policy
- public release remains a separate approved action

## Build Waves

### Wave 1 — Governed parity

- fork and preserve attribution
- refactor single-file CLI into modules
- retain current CLI behavior
- add JSON transcript, manifest, receipt, and schema validation
- add Linux, macOS, Windows/WSL test matrix
- add Docker CPU worker
- add duration, size, timeout, and workspace controls

### Wave 2 — Creator intelligence

- SRT and WebVTT
- chapters
- speaker-label adapter interface
- quote and hook extraction
- clip-candidate engine
- summary and metadata packets
- content redaction and retention controls

### Wave 3 — ASBE / PBX

- queued jobs
- status events
- studio/show/asset references
- retryable stages
- PBX ready event
- ASBE asset registry handoff
- Mission Control review surface

### Wave 4 — Model and infrastructure lanes

- local CPU profiles
- NVIDIA BYOH profiles
- optional Apple acceleration evaluation
- approved BYOK adapters
- benchmark and cost receipts
- batch and playlist manifests without uncontrolled playlist expansion
- searchable memory and embedding adapters

### Wave 5 — Distribution workflows

- approved social-short handoffs
- AuthorMind publishing packages
- OTT subtitle and chapter packages
- multilingual transcription and translation lanes
- caption styling contracts
- content-reuse campaign packs

## Initial PBX Events

```text
creator.media.ingest.requested
creator.media.ingest.blocked
creator.media.audio.ready
creator.media.transcription.started
creator.media.transcription.completed
creator.media.enrichment.completed
creator.media.qc.failed
creator.media.transcript.ready
creator.media.review.approved
creator.media.review.rejected
```

## First Definition of Done

The first production milestone is complete when a user can submit one approved public YouTube video and receive:

- locally generated transcript
- TXT, Markdown, JSON, SRT, and VTT outputs
- timestamped segments
- manifest and receipt
- file hashes
- bounded execution evidence
- optional chapter and clip-candidate recommendations
- an ASBE/PBX handoff packet
- no public publishing without approval

## Canonical Line

> TUBE SCRIBE turns media into accountable production intelligence. Creator governs the package. ASBE moves it through the studio.
