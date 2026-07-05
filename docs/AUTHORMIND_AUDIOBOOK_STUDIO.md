# AuthorMind Audiobook Studio

## Status

AuthorMind is the Creator District publishing wrapper for manuscript-to-media workflows.

It belongs inside AGENTROPOLIS-CREATOR as a public-safe publishing lane, not as a separate Agentropolis repo yet.

```text
AGENTROPOLIS-CREATOR
  -> Publishing District
      -> AuthorMind
          -> Manuscript Studio
          -> Audiobook Studio
          -> Podcast Studio
          -> Video Companion Studio
          -> Distribution Prep
```

## Core Positioning

AuthorMind is the AI publishing studio for writers, educators, creators, and media operators who need to turn long-form source material into structured publishable assets.

The canonical pipeline is:

```text
Manuscript
  -> clean text
  -> chapter structure
  -> metadata
  -> narration plan
  -> audiobook
  -> podcast cuts
  -> video companion assets
  -> distribution package
```

## Audiobook Backend Candidate

AuthorMind may use `ebook2audiobook` as an optional local/open-source backend for audiobook generation.

Reference:

```text
https://github.com/DrewThomasson/ebook2audiobook
```

Observed fit:

- Apache-2.0 license
- local CPU/GPU audiobook conversion
- chapter and metadata preservation
- advanced TTS support
- optional voice cloning
- broad language support
- Docker/local execution path
- designed for legally acquired non-DRM ebooks

This is a backend candidate, not a hard runtime dependency.

## Compliance Boundary

AuthorMind must include explicit user-facing compliance copy:

> Use only legally acquired, non-DRM content you own or have rights to convert.

The lane must not include DRM bypass workflows, piracy guidance, or automated conversion of content without rights confirmation.

## Product Modules

### Manuscript Intake

Supported inputs:

- Markdown
- TXT
- DOCX
- PDF
- EPUB
- HTML

### Text Cleanup

Tasks:

- remove extraction artifacts
- normalize headings
- detect chapters
- preserve author intent
- flag unclear structure
- produce an edit ledger

### Narration Planning

Tasks:

- select narrator voice
- optionally map character voices
- set tone and pacing
- generate pronunciation notes
- create chapter-level narration metadata

### Audiobook Generation

Outputs:

- MP3
- M4B
- chapter files
- metadata sidecar
- cover art reference
- production receipt

### Podcast and Video Companion

Derived outputs:

- chapter recap clips
- teaser scripts
- short-form quote cards
- YouTube narration versions
- transcript/subtitle files

## Dashboard States

```text
Draft Uploaded
Text Cleaned
Chapters Detected
Voice Selected
Audio Generating
Audiobook Ready
Distribution Package Ready
```

## Lovable Implementation Prompt

```text
Add an Audiobook Studio module to AuthorMind.

Create a workflow where users can upload EPUB, PDF, DOCX, TXT, HTML, or Markdown files, clean and structure the manuscript into chapters, select a narrator voice, optionally enable voice cloning, and generate audiobook outputs in MP3 and M4B format.

Add a dashboard card called "Audiobook Studio" with these status states:
Draft Uploaded
Text Cleaned
Chapters Detected
Voice Selected
Audio Generating
Audiobook Ready
Distribution Package Ready

Add compliance copy:
"Use only legally acquired, non-DRM content you own or have rights to convert."

Design style:
dark cinematic creator dashboard, liquid glass cards, publishing studio feel, premium but practical.
```

## Agentropolis Fit

AuthorMind connects to the Creator District without crossing private runtime boundaries.

```text
AuthorMind produces:
  - publishing workflow specs
  - manuscript cleanup ledgers
  - narration plans
  - audiobook package manifests
  - podcast/video companion package manifests

AGENTROPOLIS-AGENT-MCP validates:
  - tool routing
  - rights/compliance checklist
  - backend permissions
  - package manifests

agentropolis consumes only:
  - approved references
  - public-safe package outputs
```

## Repo Decision

Do not create a separate repo yet.

Track AuthorMind here as a Creator District publishing lane until it has enough standalone code, users, and operational surface to justify extraction.
