---
name: tube-scribe
version: 0.1.0
display_name: TUBE SCRIBE
description: Governed local-first media ingestion, transcription, segmentation, enrichment, and Creator Foundry handoff for rights-cleared public video and audio sources.
district: AGENTROPOLIS-CREATOR
pack: media-intelligence
tags:
  - transcription
  - youtube
  - audio
  - media-ingestion
  - creator
  - pbx
tier: infrastructure
layer: infrastructure
metadata:
  agentropolis:
    requires:
      bins:
        - ffmpeg
        - yt-dlp
      env: []
      install:
        - python>=3.10
        - faster-whisper>=1.2,<2
    authority:
      public_sources_only: true
      browser_cookies_default: false
      private_media_bypass: false
      arbitrary_shell: false
      public_release_requires_human_approval: true
chains_from:
  - creator-prompt-compiler
  - asbe-pbx-intake
chains_to:
  - creator-clip-forge
  - authormind-publishing
  - creator-memory-index
  - asbe-pbx-delivery
orchestrated_by:
  - ASBE
  - HERMES Dispatch
  - AGENTROPOLIS-AGENT-MCP
---

# TUBE SCRIBE

## Role

TUBE SCRIBE converts an approved public video or audio source into a governed Creator Foundry media package.

It preserves the useful local-first core of `jn-root/youtube-transcriber` while adding Agentropolis authority checks, job manifests, structured transcripts, segmentation, enrichment, receipts, retention controls, and ASBE/PBX handoffs.

TUBE SCRIBE is not a downloader for bypassing access controls. It does not grant itself browser-cookie access, private-video access, or publishing authority.

## Activation Triggers

Activate for requests such as:

- "transcribe this YouTube video"
- "turn this video into a searchable transcript"
- "find chapters and clips in this interview"
- "prepare this video for Creator and ASBE"
- "extract quotes, hooks, chapters, and social cuts"
- "ingest this public video into the Creator Foundry"

## Inputs

Required:

- source URL or approved local media file reference
- rights status
- requested output profile

Optional:

- language
- transcription model lane
- speaker-labeling lane
- timestamps
- chapter detection
- quote extraction
- clip-candidate generation
- summary and metadata enrichment
- retention policy
- destination studio, show, campaign, or PBX lane

## Authority Rules

1. Public URLs and rights-cleared local files are allowed.
2. Private, members-only, region-restricted, removed, or otherwise inaccessible media is blocked.
3. Browser cookies are disabled unless a separate approved credential and authority contract explicitly enables them.
4. Raw secrets, browser profiles, and personal cookies must never appear in job manifests or receipts.
5. No public publishing or distribution occurs without human approval.
6. Every model, adapter, and inferred default must be recorded in the execution receipt.
7. The worker may invoke only allowlisted binaries with structured argument arrays.
8. Duration, file size, disk, memory, concurrency, and execution-time limits must be enforced by the runtime.

## Execution Chain

```text
Creator intent
  -> Creator Prompt Contract or direct ingest request
  -> rights + authority validation
  -> source normalization
  -> sandboxed media acquisition
  -> audio normalization
  -> local-first transcription
  -> optional diarization / chapters / enrichment
  -> structured media package
  -> QC validation
  -> human review when required
  -> PBX handoff
  -> execution receipt
```

## Output Package

TUBE SCRIBE returns a stable media package containing:

```text
manifest.json
receipt.json
source.json
transcript.txt
transcript.md
transcript.json
segments.json
chapters.json                 optional
speakers.json                 optional
quotes.json                   optional
clip-candidates.json          optional
summary.md                    optional
audio/                        optional retained audio
thumbnails/                   optional approved frames
```

## Required Output Contract

The final response and machine packet must include:

1. source identity and normalized URL
2. rights and authority status
3. exact model and compute lane used
4. transcript language and confidence metadata when available
5. timestamped segments
6. generated artifact hashes
7. warnings, omissions, and blocked features
8. retention policy and output location
9. PBX handoff target
10. execution receipt

## ASBE / PBX Handoff

ASBE owns studio, scene, shot, agent, asset, and distribution orchestration.

TUBE SCRIBE hands ASBE a media-intelligence asset package. It does not own the full studio workflow.

Recommended PBX event:

```json
{
  "event": "creator.media.transcript.ready",
  "job_id": "job_...",
  "asset_id": "asset_...",
  "studio_id": "studio_...",
  "show_id": null,
  "capabilities": [
    "transcript",
    "timestamps",
    "chapters",
    "clip_candidates"
  ],
  "approval_status": "review_required",
  "receipt_ref": "receipt.json"
}
```

## Example

**Request**

> Ingest this public YouTube interview, transcribe it locally, identify chapters and strong 30-60 second clip candidates, then send the approved package to ASBE for a social-short workflow.

**Expected result**

- validates URL and rights declaration
- creates a bounded job manifest
- downloads audio without playlist expansion
- transcribes locally with the selected Whisper lane
- emits structured timestamped JSON
- identifies chapters and clip candidates as recommendations, not fabricated edits
- sends a PBX-ready package to ASBE
- records all defaults and execution evidence in the receipt

## Non-Goals

- bypassing YouTube access controls
- scraping private or members-only content
- automatic public posting
- unrestricted shell execution
- silent cloud fallback
- replacing ASBE, PBX, Creator Prompt Contract, or AGENTROPOLIS-AGENT-MCP

## Upstream Attribution

Initial transcription-core reference:

- `jn-root/youtube-transcriber`
- MIT License

Preserve upstream attribution and license notices in any copied or modified source files.
