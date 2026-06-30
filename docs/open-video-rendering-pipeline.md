# Open Video Rendering Pipeline

## Purpose

This document defines the first Agentropolis Creator pass for an open video rendering and timeline automation rail.

The core target is **OpenCut** as a watch/evaluate adapter for open-source video editing, timeline assembly, AI-agent MCP control, headless rendering, and batch export once the rewrite is production-ready.

## Why This Belongs In AGENTROPOLIS-CREATOR

The Construction District does not stop at static assets.

Agentropolis needs a controlled way to turn generated worlds, characters, voices, captions, scripts, and screenshots into publishable media.

That means the Construction District should own a governed media pipeline for:

- short-form clips
- 789 Studios assets
- WIRED CHAOS OTT segments
- district teasers
- product explainers
- onboarding videos
- release notes
- educational walkthroughs
- world-diff previews
- public broadcast packages

## Current OpenCut Signal

OpenCut is an open-source video editor positioned as a free CapCut alternative.

The strategic reason to track it is not just editing.

The strategic reason is its rewrite roadmap:

- Editor API
- plugin-first architecture
- Rust core
- MCP server for AI agents
- headless mode for automation and batch rendering
- scripting inside the editor

Agentropolis should treat those as **adapter candidates**, not production assumptions, until they are stable and tested.

## Stack Position

```text
AGENTROPOLIS
  City OS
  Intelligence Grid
  Districts
    AGENTROPOLIS-CREATOR
      WorldForge
      DistrictBuilder
      AssetSmith
      CrowdForge
      AudioForge
      MediaForge
      Verifier
        Open Video Rendering Pipeline
          OpenCut Adapter Candidate
          Timeline Specs
          Media Diff Preview
          Export Review Package
```

## Reference Flow

```text
Prompt / Script / Research / Scene Export
-> Hermes planning
-> MediaForge timeline proposal
-> AssetSmith provenance check
-> AudioForge voice and sound package
-> OpenCut-style timeline adapter
-> Render preview
-> Media diff preview
-> Verifier review
-> Human / governance approval
-> Export package
-> Distribution handoff
-> Memory and registry update
```

## MediaForge Agent

### Role

MediaForge converts approved city assets into governed timeline packages.

### Responsibilities

- create timeline specs
- sequence scene exports
- attach narration and dialogue
- attach captions
- attach music and ambience notes
- define aspect ratios and platform targets
- produce media-diff previews
- prepare export review packages
- route outputs to publishing systems only after approval

### Non-Responsibilities

MediaForge does not:

- approve public publishing by itself
- bypass license checks
- generate celebrity likenesses without rights
- import unclear-license media
- overwrite finished public assets without review

## Timeline Spec Shape

```json
{
  "id": "mission_control_short_001",
  "title": "Mission Control district teaser",
  "purpose": "public teaser",
  "owner_district": "AGENTROPOLIS-CREATOR",
  "requested_by": "Hermes",
  "duration_target_seconds": 45,
  "aspect_ratios": ["16:9", "9:16", "1:1"],
  "source_assets": [
    {
      "path": "exports/mission-control/foreground.glb",
      "type": "3d_render",
      "license": "internal",
      "provenance": "Construction District export"
    }
  ],
  "tracks": {
    "video": [],
    "voice": [],
    "captions": [],
    "music": [],
    "ambience": []
  },
  "approval": {
    "world_diff_required": true,
    "media_diff_required": true,
    "human_approval_required": true
  }
}
```

## Adapter Risk Model

### Low Risk

- inspect timeline spec
- validate caption track
- generate edit decision list
- export manifest

### Medium Risk

- assemble media draft
- render preview
- export review package
- create platform-specific versions

### High Risk

- publish publicly
- overwrite final media
- run unbounded batch rendering
- import external media without provenance
- generate or export restricted likeness content

## Anti-Moloch Media Gate

```text
Media proposal
-> Cost check
-> License check
-> Likeness check
-> Platform policy check
-> Timeline preview
-> Media diff preview
-> Human approval
-> Render/export
-> Audit log
-> Memory writeback
```

## First Implementation Path

1. Keep OpenCut in watch/evaluate status until MCP, headless, and scripting interfaces are tested.
2. Define timeline specs as JSON before any editor integration.
3. Build a sample Mission Control teaser spec.
4. Add provenance records for video, voice, captions, music, and exported files.
5. Require media-diff previews for every render intended for public use.
6. Treat publishing as a separate governed handoff, not an editor action.

## Canon Line

> The Construction District builds the world.  
> MediaForge turns the world into signal.  
> Governance decides what goes public.