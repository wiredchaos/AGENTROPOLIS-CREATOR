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
| Higgsfield MCP | adopt / gated | Hosted remote connector at `https://mcp.higgsfield.ai/mcp`. Route generation through Creator Prompt Contract, MCP policy gates, media diff, and human approval. |
| Higgsfield CLI | adopt / gated | Install with `npm install -g @higgsfield/cli`, then authenticate with `higgsfield auth login`. Use for explicit operator or agent-run commands. |
| Higgsfield Skills | adopt / gated | Install with `npx skills add higgsfield-ai/skills`. Skills provide reusable workflow intelligence but do not grant execution authority by themselves. |
| Gemini Omni Flash via Higgsfield | watch/evaluate | Verify current availability through official Higgsfield capability discovery before depending on it. |
| Seed Audio style layer | watch/evaluate | Narration, voice, dubbing, NPC dialogue, localization. Requires strict likeness governance. |
| HeyGen style avatar adapter | evaluate | Useful for presenter agents, explainers, and multilingual video hosts. |
| xAI Imagine style adapter | evaluate | Visual/video generation candidate. Treat as external media generator. |
| Browser Use | evaluate | Useful for controlled operation of web creative tools where no direct API exists. |
| FFmpeg local adapter | adopt | Local packaging, trimming, transcoding, audio muxing, subtitles, thumbnails. |
| Whisper-style transcription | evaluate | Captions, transcripts, QA, localization prep. |

## Higgsfield Official Access Surfaces

### Skills

```bash
npx skills add higgsfield-ai/skills
```

Use for reusable Higgsfield-oriented agent workflows and prompt-building intelligence.

### CLI

```bash
npm install -g @higgsfield/cli
higgsfield auth login
```

Use for explicit local or agent-invoked provider commands after operator authentication.

### Remote MCP

```text
https://mcp.higgsfield.ai/mcp
```

Use as the governed remote tool surface behind AGENTROPOLIS-AGENT-MCP.

These are complementary surfaces:

```text
Skills = reusable workflow intelligence
CLI = explicit command surface
MCP = governed agent tool interface
```

Connection rules:

- use provider-supported authentication flows
- do not request or store Higgsfield browser cookies, Clerk tokens, or copied session JWTs
- do not use wrappers designed to bypass vendor bot protection
- discover current models and tools at execution time instead of hardcoding a permanent model list
- keep generation permissions separate from publication permissions
- require RenderVerifier and human approval before public release

Reference: [Higgsfield Official Creator Integration Lane](../docs/HIGGSFIELD_MCP_CREATOR_LANE.md).

## Adapter Metadata Template

```json
{
  "id": "higgsfield_provider_stack",
  "name": "Higgsfield Official Provider Stack",
  "class": "Image / Video / Creative Generation",
  "status": "adopt_gated",
  "surfaces": {
    "skills": "higgsfield-ai/skills",
    "cli_package": "@higgsfield/cli",
    "mcp_endpoint": "https://mcp.higgsfield.ai/mcp"
  },
  "authentication": "provider_supported_login_or_oauth",
  "paid_credits_possible": true,
  "risk_level": "medium",
  "allowed_actions": [
    "install_approved_skills",
    "discover_capabilities",
    "generate_preview",
    "generate_image",
    "generate_video",
    "train_approved_character"
  ],
  "blocked_actions": [
    "unapproved_publication",
    "voice_clone_without_rights",
    "likeness_use_without_rights",
    "cookie_or_session_token_extraction",
    "bot_protection_bypass"
  ],
  "notes": "Route through Creator Prompt Contract, least-privilege authorization, media diff, RenderVerifier, human approval, and execution receipts."
}
```

## Risk Levels

### Low Risk

- create prompt draft
- generate storyboard
- generate caption file
- transcode local media
- produce thumbnail from owned footage
- discover provider capabilities
- browse approved generation history

### Medium Risk

- generate video preview
- edit generated video
- create synthetic narration
- dub owned video
- create avatar presenter from approved identity
- spend provider credits

### High Risk

- clone a voice
- imitate a real person
- publish generated media
- use copyrighted source material
- generate political or sensitive persuasion media
- alter production brand assets
- train a character from unverified reference images

## Required Media Sidecar

Every generated media output should include metadata.

```json
{
  "asset_id": "media_mission_control_0001",
  "media_type": "video",
  "tool": "higgsfield_provider_stack",
  "execution_surface": "skills_or_cli_or_mcp",
  "provider_endpoint": "https://mcp.higgsfield.ai/mcp",
  "model": "discovered_at_execution",
  "prompt": "stored_prompt_reference",
  "source_assets": [],
  "license": "verify",
  "voice_likeness": "none_or_approved",
  "character_likeness": "none_or_approved",
  "human_approved": false,
  "allowed_use": ["prototype", "internal_review"],
  "receipt_id": "pending",
  "notes": "Do not publish until verified."
}
```

## Approval Rule

Any generated media intended for public release must pass RenderVerifier and human approval before publication.
