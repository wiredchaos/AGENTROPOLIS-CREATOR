# Agentropolis Video Generation District

## Purpose

The Video Generation District is the cinematic production layer for Agentropolis.

It turns city state, district builds, agent activity, construction diffs, launch narratives, release notes, repo updates, and public knowledge into reusable video assets, trailers, flythroughs, explainers, documentaries, and social content.

This is not a single video model integration.

It is a capability-first district that can route to any approved video, editing, motion, voice, documentary, or publishing provider.

## Canon Position

```text
Agentropolis
  -> Communications District
  -> Video Generation District
  -> Video Director Agent
  -> Capability Router
  -> Approved video providers and MCP adapters
```

The city should not be tied to one video model.

HERMES should request the capability:

```text
Create a cinematic Construction District flythrough.
```

or:

```text
Generate a governed documentary explainer from verified Agentropolis source material.
```

The routing layer decides the implementation.

## Core Thesis

Video generation becomes infrastructure when it can be invoked by agents as part of a governed workflow.

The durable layer is not one model.

The durable layer is:

- prompt planning
- research orchestration
- source capture
- claim verification
- storyboard generation
- asset grounding
- scene continuity
- text consistency
- motion design
- narration planning
- multilingual output
- editing logic
- policy review
- provenance tracking
- publishing automation

## Supported Capability Providers

Potential adapters include:

- Higgsfield MCP
- Higgsfield Explainer
- Gemini Omni Flash style video generation
- Veo style video generation
- Runway style video generation
- Kling style video generation
- Hailuo style video generation
- Luma style video generation
- ElevenLabs / voice layers
- Seed Audio style voice layers
- internal Hermes City 3D capture
- Blender viewport render
- Unreal cinematic render
- WebGL / React Three Fiber screen capture

All providers are interchangeable behind the Video Director capability router.

Provider-specific model names should remain implementation details unless the public copy explicitly needs them. For Higgsfield Explainer, the announced stack references Claude Fable 5 and Gemini Omni Flash, but Agentropolis should still route by capability instead of model loyalty.

## Higgsfield Explainer Lane

Higgsfield Explainer applies to AGENTROPOLIS-CREATOR as a first-class explainer and faceless documentary lane.

It should not become a standalone Agentropolis repository yet.

Canonical lock:

```text
Higgsfield Explainer = Creator District video/documentary generation lane.
Not a separate repo yet.
MCP-enabled provider adapter under AGENTROPOLIS-CREATOR.
```

Primary role:

```text
Turn verified Agentropolis topics, repo changes, district specs, skill docs, and product notes into narrated documentary-style videos up to 10 minutes.
```

Expected workflow:

```text
Topic Request
  -> Research Agent
  -> Source Capture Agent
  -> Claim Verification Agent
  -> Narrative Agent
  -> Storyboard Agent
  -> Higgsfield Explainer Adapter
  -> RenderOps Agent
  -> Verifier Agent
  -> Human Approval
  -> Publishing Agent
  -> Memory and registry writeback
```

Best-fit use cases:

- faceless documentary explainers
- multilingual onboarding videos
- GitHub release explainers
- district tour videos
- CHAOS SKILL documentation videos
- WCU education modules
- CLEAR / BWB / OTT knowledge segments
- investor and partner walkthroughs

## First-Class Agents

### Video Director Agent

Owns the creative plan.

Responsibilities:

- interpret the campaign intent
- create a storyboard
- choose aspect ratio
- define visual language
- define camera language
- define motion style
- define shot list
- choose provider route
- generate approval packet

### Research Agent

Owns the source discovery layer for documentary and explainer work.

Responsibilities:

- gather topic context
- identify repo files, docs, release notes, and source material
- separate confirmed facts from assumptions
- package references for verification
- flag claims that need human review

### Narrative Agent

Turns verified source material into a coherent script.

Responsibilities:

- create the hook
- structure the explanation
- write narration
- simplify dense architecture
- adapt tone by audience
- prepare multilingual variants

### Storyboard Agent

Turns intent into scene-by-scene structure.

Responsibilities:

- hook design
- first-frame planning
- scene transitions
- beat timing
- captions
- CTA framing
- social platform variants

### Motion Design Agent

Owns kinetic design.

Responsibilities:

- camera movement
- parallax
- transitions
- hologram movement
- typography movement
- UI motion
- rhythm and pacing

### Continuity Agent

Maintains consistency.

Responsibilities:

- character consistency
- text consistency
- logo consistency
- district consistency
- color palette consistency
- canon compliance

### RenderOps Agent

Owns execution and export.

Responsibilities:

- provider selection
- render queue
- retry logic
- asset storage
- compression
- export formats
- file naming
- metadata sidecars

### Publishing Agent

Prepares distribution.

Responsibilities:

- X posts
- YouTube Shorts
- TikTok variants
- LinkedIn clips
- website hero loops
- launch trailers
- embed-ready files

### Verifier Agent

Reviews output before publishing.

Responsibilities:

- policy check
- brand check
- text check
- audio check
- licensing check
- public claims check
- human approval packet

## Construction District Workflow

```text
Construction District event
  -> WorldForge or DistrictBuilder output
  -> Video Director Agent
  -> Storyboard Agent
  -> Motion Design Agent
  -> Provider route through MCP adapter
  -> RenderOps Agent
  -> Verifier Agent
  -> Human approval
  -> Publishing Agent
  -> Memory and registry writeback
```

## Documentary Explainer Workflow

```text
Repo update, district spec, skill doc, or topic request
  -> Research Agent
  -> Source Capture Agent
  -> Claim Verification Agent
  -> Narrative Agent
  -> Storyboard Agent
  -> Higgsfield Explainer route when best fit
  -> RenderOps Agent
  -> Verifier Agent
  -> Human approval
  -> Publishing Agent
  -> Memory and registry writeback
```

## Example Use Cases

### Construction Progress Video

```text
Input: world diff preview
Output: 30-second progress clip showing what changed
```

### District Launch Trailer

```text
Input: district spec + hero shots
Output: cinematic launch video for X, website, and demo deck
```

### Hermes City Hero Loop

```text
Input: Axis Tower scene + district labels + city palette
Output: seamless website background video loop
```

### Agent Capability Explainer

```text
Input: agent registry profile
Output: 15-second clip explaining what the agent does
```

### GitHub Release Documentary

```text
Input: merged PRs + release notes + affected docs
Output: 3-10 minute narrated explainer with source-backed claims
```

### Skill Documentation Video

```text
Input: CHAOS SKILL spec + examples + install notes
Output: multilingual onboarding explainer for operators and builders
```

### Investor / Hackathon Demo

```text
Input: demo script + live app URL + city canon
Output: 90-second narrative walkthrough
```

## Input Sources

- city canon
- district specs
- world diff previews
- screenshots
- image references
- uploaded concept art
- existing 3D scenes
- generated assets
- voice scripts
- launch copy
- social posts
- product docs
- build logs
- release notes
- pull request summaries
- agent registry records
- CHAOS SKILL definitions

## Output Formats

- website hero loop
- X video
- vertical short
- horizontal trailer
- square promo
- faceless documentary
- multilingual explainer
- GitHub release video
- GIF preview
- thumbnail still
- caption file
- voiceover file
- social post bundle
- metadata sidecar

## Governance Rules

- Do not route to a provider without purpose metadata.
- Do not publish without human approval.
- Do not use unclear-license assets.
- Do not make unsupported partnership claims.
- Do not expose private keys, secrets, API keys, or client data.
- Do not publish auto-researched claims without verification.
- Preserve Agentropolis canon.
- Keep provider-specific model names behind the capability router.
- Log every render, prompt, source asset, output file, source reference, and approval.

## Provider-Agnostic Routing Contract

Every video provider adapter should expose the same normalized contract:

```json
{
  "intent": "launch trailer",
  "duration_seconds": 30,
  "aspect_ratio": "16:9",
  "style": "cyberpunk liquid glass city OS",
  "source_assets": [],
  "prompt": "cinematic city flythrough",
  "negative_prompt": "clutter, broken text, off-brand colors",
  "requires_text_lock": true,
  "requires_character_consistency": true,
  "requires_human_approval": true,
  "estimated_cost": "medium",
  "risk_level": "medium"
}
```

Documentary and explainer routes should extend the contract with source governance:

```json
{
  "intent": "documentary explainer",
  "duration_seconds": 600,
  "language": "en",
  "source_material": [],
  "claims_require_verification": true,
  "requires_human_approval": true,
  "publish_targets": ["X", "YouTube", "LinkedIn"],
  "provider_route": "higgsfield-explainer-when-best-fit"
}
```

## Agentropolis Standard

Every district should be able to generate its own media.

The Video Generation District gives Agentropolis a repeatable production system for:

- launches
- demos
- construction updates
- agent explainers
- public education
- social growth
- investor storytelling
- hackathon submissions
- repo release explainers
- multilingual onboarding

## Winning Frame

> Agentropolis does not just build the city.  
> It records the city, explains the city, and broadcasts the city.

## Canon Status

Status: Active capability district proposal

Priority: High

Recommended owner: Communications Council + Construction District
