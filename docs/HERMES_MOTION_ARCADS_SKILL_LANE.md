# Hermes Motion Arcads Skill Lane

## Status

Candidate Creator Foundry skill package for governed reference-image-to-motion workflows.

This lane captures the pattern described by creator-side Claude skills that accept a reference image, generate controlled still frames, and animate those frames through a video model via Arcads MCP.

```text
reference image
  -> Hermes motion skill
  -> rights and provenance gate
  -> reference role map
  -> Nano Banana-style frame batch
  -> Seedance-style video prompt
  -> Arcads MCP packet
  -> generated take review
  -> Creator QC
  -> media-diff handoff
```

## Canon Position

Hermes Motion Maker belongs inside **AGENTROPOLIS-CREATOR** first.

It is not a separate Agentropolis repo yet. It is a Creator Foundry skill lane until there is enough custom runtime code, provider integration, test coverage, governance surface, and user demand to justify extraction.

```text
AGENTROPOLIS-CREATOR
  -> skill package, prompt contracts, shot sheets, QC packets

AGENTROPOLIS-AGENT-MCP
  -> guarded provider routing, credentials, tool boundary, receipts

HERMES-CITY
  -> public-safe demo notes, coordination docs, non-private release signals

agentropolis
  -> approved asset references only
```

## Why It Matters

The valuable pattern is not one model or provider. The valuable pattern is a reusable motion contract:

- preserve the source image
- bind references by role
- generate only controlled motion variants
- route execution through an MCP gate
- produce QC receipts before public release
- keep provider adapters swappable

This gives the Creator District a repeatable path for animated posters, social clips, OTT bumpers, character cards, web hero loops, game previews, and product motion assets.

## Candidate Skill

```text
Name: Hermes Motion Maker
Role: Convert rights-cleared reference images into governed motion animation packets.
Tier: extended
Triggers: animate this image, make this move, create motion from this reference, turn this into a Seedance clip, make frames with Nano Banana, build an Arcads motion packet
Chains to: media diff preview, creator QC, asset package export, AGENTROPOLIS-AGENT-MCP provider routing
Requires: rights-cleared reference image, approved MCP adapter for execution, human review before public release
Example: Turn a DBN/BWB poster into a 9:16 six-second motion card while preserving the character, outfit, logo, and background layout.
```

## Package Location

```text
packages/skills/hermes-motion-maker/
  SKILL.md
  agents/openai.yaml
  references/
    arcads-mcp-workflow.md
    motion-prompt-patterns.md
    seedance-output-spec.md
  templates/
    motion-shot-sheet.md
```

## Adapter Boundary

Keep the skill provider-agnostic.

```yaml
adapter_id: hermes_motion_arcads
lane: creator.motion
status: candidate
providers:
  frame_generation: nano_banana_style_adapter
  video_animation: seedance_style_adapter
  mcp_router: arcads_motion_adapter
license_review: required
provenance_review: required
execution_gate: AGENTROPOLIS-AGENT-MCP
outputs:
  - motion_brief
  - reference_role_map
  - continuity_locks
  - frame_plan
  - frame_prompt_batch
  - video_prompt
  - arcads_mcp_packet
  - take_review
  - delivery_qc_packet
handoff:
  requires:
    - rights_status
    - provider_selected
    - cost_estimate_when_available
    - media_diff_preview
    - human_approval
```

## Core Outputs

| Output | Purpose |
|---|---|
| Motion brief | Human-readable creative direction. |
| Reference role map | Assigns each image a job: subject, style, environment, wardrobe, prop, logo, pose, or palette. |
| Continuity locks | Lists what must not change. |
| Frame plan | Defines start, motion, and end state. |
| Frame prompt batch | Produces still-frame prompts for image generation. |
| Video prompt | Produces animation prompt for image/video model. |
| Arcads MCP packet | Provides provider-neutral execution shape. |
| QC checklist | Prevents public release of broken motion artifacts. |
| Delivery packet | Captures final export metadata and rights receipt. |

## Guardrails

- Do not commit private user images, generated media, provider secrets, API keys, or private URLs.
- Do not claim Nano Banana, Seedance, Arcads, or any provider completed execution unless a real tool receipt exists.
- Treat provider/model availability, pricing, limits, and license status as source-dated and review-required.
- Block execution when image rights are unknown.
- Require human review before public release.
- Use media-diff preview for public assets.
- Keep generated text/logos under strict QC because image-to-video systems often warp typography.

## Activation Phrases

- "Motion"
- "animate this image"
- "make this poster move"
- "turn this reference into a video"
- "generate frame prompts"
- "build an Arcads MCP packet"
- "make a Seedance-style prompt"
- "preserve this character and animate it"
- "make a motion card for X"
- "make a 9:16 creator video loop"

## Canon Decision

Adopt Hermes Motion Maker as a Creator Foundry skill package candidate.

```text
CREATOR motion infrastructure skill
not a standalone repo yet
not a hard runtime dependency
not canonical city state until provider routing and governance are tested
```

The lane is strongest when paired with existing Seedance-style video direction and DepthFlow-style motion rendering. Seedance-style direction handles full animation intent. DepthFlow handles 2.5D parallax when safer than full motion. Hermes Motion Maker sits between them as the governed reference-image-to-motion skill contract.
