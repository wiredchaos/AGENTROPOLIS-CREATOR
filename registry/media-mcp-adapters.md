# Media MCP Adapter Registry

This registry tracks media-generation and media-editing adapters for AGENTROPOLIS-CREATOR.

The goal is to evaluate tools that can be routed through MCP or MCP-like workflows for video, audio, avatars, localization, and creative automation.

## Adapter Classes

| Class | Purpose |
| --- | --- |
| Video generation | cinematic clips, social video, b-roll, scene previews |
| Video editing | text consistency, motion control, frame edits, object edits |
| Audio generation | narration, NPC dialogue, ambience, music beds |
| Dubbing / localization | multilingual versions and caption pipelines |
| Avatar video | presenter agents, hosts, explainers, guides |
| Visual generation | stills, concept frames, thumbnails, style frames |
| Browser creative automation | controlled interaction with web creative tools |

## Initial Targets

| Adapter | Status | Notes |
| --- | --- | --- |
| Higgsfield MCP | watch/evaluate | Important media execution layer for video and audio workflows. Use as external MCP media adapter if access is available. |
| Gemini Omni Flash via Higgsfield | watch/evaluate | Potential high-value editing and motion/video layer. Verify official capabilities before depending on it. |
| Seed Audio style layer | watch/evaluate | Narration, voice, dubbing, NPC dialogue, localization. Requires strict likeness governance. |
| HeyGen style avatar adapter | evaluate | Useful for presenter agents, explainers, and multilingual video hosts. |
| xAI Imagine style adapter | evaluate | Visual/video generation candidate. Treat as external media generator. |
| Browser Use | evaluate | Useful for controlled operation of web creative tools where no direct API exists. |
| FFmpeg local adapter | adopt | Local packaging, trimming, transcoding, audio muxing, subtitles, thumbnails. |
| Whisper-style transcription | evaluate | Captions, transcripts, QA, localization prep. |

## Adapter Metadata Template

```json
{
  "id": "higgsfield_mcp",
  "name": "Higgsfield MCP",
  "class": "Video / Audio Generation",
  "status": "watch_evaluate",
  "repo_url": "",
  "vendor_url": "",
  "license": "external_service_verify_terms",
  "local_required": false,
  "gpu_required": false,
  "paid_api_possible": true,
  "risk_level": "medium",
  "allowed_actions": ["generate_preview", "edit_video", "dub_video"],
  "blocked_actions": ["unapproved_publication", "voice_clone_without_rights"],
  "notes": "Route through approval gate and store prompt/tool metadata."
}
```

## Risk Levels

### Low Risk

- create prompt draft
- generate storyboard
- generate caption file
- transcode local media
- produce thumbnail from owned footage

### Medium Risk

- generate video preview
- edit generated video
- create synthetic narration
- dub owned video
- create avatar presenter from approved identity

### High Risk

- clone a voice
- imitate a real person
- publish generated media
- use copyrighted source material
- generate political or sensitive persuasion media
- alter production brand assets

## Required Media Sidecar

Every generated media output should include metadata.

```json
{
  "asset_id": "media_mission_control_0001",
  "media_type": "video",
  "tool": "higgsfield_mcp",
  "model": "verify",
  "prompt": "stored_prompt_reference",
  "source_assets": [],
  "license": "verify",
  "voice_likeness": "none_or_approved",
  "human_approved": false,
  "allowed_use": ["prototype", "internal_review"],
  "notes": "Do not publish until verified."
}
```

## Approval Rule

Any generated media intended for public release must pass RenderVerifier and human approval before publication.
