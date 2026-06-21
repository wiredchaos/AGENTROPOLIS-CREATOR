# HeyGen Creator MCP Documentation Index

This directory tracks HeyGen as the AGENTROPOLIS-CREATOR video production MCP lane.

HeyGen supports avatars, voice design, voice cloning, lip-sync, video translation, Video Agent workflows, Hyperframes, HTML-to-video, CLI recipes, webhooks, and remote MCP integrations.

## Source indexes

- HeyGen documentation index: https://heygen-1fa696a7.mintlify.app/llms.txt
- Developer platform: https://developers.heygen.com
- Product site: https://www.heygen.com
- Product llms.txt: https://www.heygen.com/llms.txt
- OpenAPI YAML: https://developers.heygen.com/openapi.yaml
- External API JSON: https://developers.heygen.com/openapi/external-api.json
- General remote MCP endpoint: `https://mcp.heygen.com/mcp/v1/`
- Hyperframes-specific MCP connector: `https://mcp.heygen.com/mcp/hyperframes` when exposed by the host/session

Endpoint note:

- `/mcp/v1/` is the general OAuth-protected HeyGen MCP endpoint for Creator workflows.
- `/mcp/hyperframes` is documented here as a Hyperframes-specific connector when a connected host exposes that route.
- Agents should prefer visible `mcp__heygen__*` tools over hardcoding either endpoint.

## Agent-first authentication ladder

When an AI agent works with HeyGen, use this order:

1. **MCP first** - if `mcp__heygen__*` tools are visible, use them directly through OAuth.
2. **CLI second** - if `heygen` is installed and `heygen auth status` shows an active account, use CLI commands.
3. **Raw API last** - only when MCP and CLI are unavailable. Require `HEYGEN_API_KEY` from environment or platform secrets.

Never ask the user to paste an API key into chat.

## Official agent resources

- For AI Agents: https://developers.heygen.com/docs/for-ai-agents.md
- MCP Overview: https://developers.heygen.com/mcp/overview.md
- HeyGen skills repo: https://github.com/heygen-com/skills
- Agent install guide: https://github.com/heygen-com/skills/blob/master/INSTALL_FOR_AGENTS.md

## Core developer docs

### Getting started

- Quick Start: https://developers.heygen.com/docs/quick-start.md
- Choosing the Right Video API: https://developers.heygen.com/docs/choosing-the-right-video-api.md
- Usage Limits: https://developers.heygen.com/docs/usage-limits.md
- Error Codes: https://developers.heygen.com/docs/error-codes.md
- Endpoint Version Comparison: https://developers.heygen.com/endpoint-version-comparison.md

### Authentication and billing

- API Key: https://developers.heygen.com/docs/api-key.md
- OAuth 2.0: https://developers.heygen.com/docs/connecting-your-app-to-heygen-with-oauth-20.md
- Current User: https://developers.heygen.com/user-profile.md
- Self-Serve Pricing: https://developers.heygen.com/docs/pricing.md
- Enterprise Pricing: https://developers.heygen.com/docs/enterprise-pricing.md

### Video Agent

- Overview: https://developers.heygen.com/docs/overview.md
- Prompt to Video: https://developers.heygen.com/docs/video-agent.md
- Styles and References: https://developers.heygen.com/docs/styles-and-references.md
- Upload Assets: https://developers.heygen.com/docs/upload-assets.md
- Interactive Sessions: https://developers.heygen.com/docs/interactive-sessions.md
- Writing Effective Video Prompts: https://developers.heygen.com/writing-effective-video-prompts.md

### Direct video generation

Recommended defaults for `POST /v3/videos`:

```json
{
  "aspect_ratio": "auto",
  "resolution": "1080p"
}
```

Cinematic Avatar supports `16:9`, `9:16`, and `1:1` only at `720p` or `1080p`.

- Models: https://developers.heygen.com/models.md
- Digital Twin: https://developers.heygen.com/generate-avatar-video.md
- Photo Avatar: https://developers.heygen.com/photo-avatar.md
- Image to Video: https://developers.heygen.com/image-to-video.md
- Assets: https://developers.heygen.com/assets.md

### Avatars, voices, lipsync, translation

- Create Avatar: https://developers.heygen.com/docs/create-avatar.md
- Avatar Groups: https://developers.heygen.com/docs/avatars.md
- Avatar Looks: https://developers.heygen.com/docs/avatar-looks.md
- Voices Overview: https://developers.heygen.com/docs/voices/overview.md
- Browse Voices: https://developers.heygen.com/docs/voices/search-voices.md
- Design Voices: https://developers.heygen.com/docs/voices/design-voices.md
- Text to Speech: https://developers.heygen.com/docs/voices/speech.md
- Lipsync Speed: https://developers.heygen.com/lipsync-speed.md
- Lipsync Precision: https://developers.heygen.com/lipsync-precision.md
- Video Translation Speed: https://developers.heygen.com/docs/video-translate.md
- Video Translation Precision: https://developers.heygen.com/docs/video-translation-precision.md
- Bulk Video Translation: https://developers.heygen.com/docs/bulk-video-translation.md

### CLI and MCP

- CLI Overview: https://developers.heygen.com/cli.md
- Commands: https://developers.heygen.com/commands.md
- Output Modes: https://developers.heygen.com/output-modes.md
- Features: https://developers.heygen.com/features.md
- Examples: https://developers.heygen.com/examples.md
- MCP top-level: https://developers.heygen.com/mcp.md
- Claude Code: https://developers.heygen.com/mcp/claude-code.md
- Claude Web: https://developers.heygen.com/mcp/claude-web.md
- Gemini CLI: https://developers.heygen.com/mcp/gemini-cli.md
- Manus: https://developers.heygen.com/mcp/manus.md
- OpenAI: https://developers.heygen.com/mcp/open-ai.md
- Superhuman: https://developers.heygen.com/mcp/superhuman.md

## AGENTROPOLIS-CREATOR workflows

See: [`workflows/creator-workflows.md`](./workflows/creator-workflows.md)

Included workflows:

1. Automated Video Pipeline
2. Social Media Content Pipeline
3. Product Demo Videos
4. Automated Broadcast
5. Content Repurposing
6. Docs to Video
7. Video Agent Styles
8. Design a Custom Voice
9. Photo to Video
10. Real Estate Listing Videos
11. Data Visualization Videos
12. Lovable MCP Connection

## Governance binding

ARCHITECT defines the production spec. The Governance Layer validates and gates it. RELAY routes the agent. MCP RANGER vets sources and tools. HeyGen renders the video. The Approval Gate releases approved outputs to distribution.

```text
ARCHITECT -> Governance Layer -> RELAY -> MCP RANGER -> HeyGen Creator rail -> Approval Gate -> Distribution
```

Publishing flows must route through the ARCHITECT/Council Approval Gate before public distribution.

## Guardrails

- Prefer MCP tools when visible.
- Prefer CLI when authenticated locally.
- Use raw API only when MCP and CLI are unavailable.
- Never request or paste API keys in chat.
- Store API keys only as environment variables or platform secrets.
- Treat voice cloning, avatar creation, and consent flows as gated workflows.
- Human approval is required before public publishing.
- Publishing flows route through the ARCHITECT/Council Approval Gate before distribution.
- Log generated video IDs, source prompts, assets, webhook events, and output URLs into the creator registry when available.
