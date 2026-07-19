# Higgsfield Official Creator Integration Lane

## Canonical Lock

Higgsfield is an **official external Creator District provider stack**. It is not a new Agentropolis district, not the Agentropolis control plane, and not the owner of production governance.

AGENTROPOLIS-CREATOR may use four complementary Higgsfield access surfaces:

1. **Higgsfield Supercomputer** for creator-facing, plain-language orchestration.
2. **Higgsfield Skills** for reusable workflow intelligence.
3. **Higgsfield CLI** for explicit local or agent-run commands.
4. **Higgsfield MCP** for governed programmatic execution through an MCP-compatible client.

```text
CREATOR owns the production contract.
ASBE owns studio and shot orchestration.
AGENTROPOLIS-AGENT-MCP owns execution authority and receipts.
Higgsfield executes approved provider jobs.
RenderVerifier and the human approve release.
GTM owns campaign distribution and performance memory.
```

## Official Surfaces

### Supercomputer

Higgsfield Supercomputer is the provider's creator-facing orchestration environment.

It accepts plain-language briefs, plans the work, selects provider models and presets, runs installed skills, stores project assets, and can coordinate marketing, production, creative, website, game, and application workflows.

Supercomputer is useful for:

- interactive creator sessions
- product-shot and campaign asset creation
- cinematic and multi-scene workflows
- skill-driven production
- research-to-media workflows
- provider-side project memory
- operator-reviewed credit spending

Supercomputer must not replace Agentropolis Mission Control. It remains an external execution and authoring surface.

### Skills

```bash
npx skills add higgsfield-ai/skills
```

Skills package reusable provider workflows. A skill can describe how work should be performed, but it does not grant budget, publication, wallet, or governance authority.

### CLI

```bash
npm install -g @higgsfield/cli
higgsfield auth login
```

The CLI is the explicit command surface for approved local or agent-run work.

### Remote MCP

```text
https://mcp.higgsfield.ai/mcp
```

The remote MCP is the governed tool surface for MCP-compatible clients. In Agentropolis it must sit behind AGENTROPOLIS-AGENT-MCP policy, authority, cost, and receipt controls.

## Position In Agentropolis

```text
Creator request
  -> AGENTROPOLIS-CREATOR
  -> Creator Prompt Contract
  -> ASBE scene / shot / PBX orchestration when required
  -> AGENTROPOLIS-AGENT-MCP
  -> authority and cost gate
  -> approved Higgsfield surface
       -> Supercomputer for interactive operator workflows
       -> Skill for reusable workflow intelligence
       -> CLI for explicit commands
       -> MCP for governed agent execution
  -> generation result
  -> media diff
  -> RenderVerifier
  -> human approval
  -> PBX / GTM / OTT distribution route
  -> execution and release receipts
```

## Creator Ownership Boundary

AGENTROPOLIS-CREATOR owns:

- story and campaign intent
- scene context
- active-reference roles
- character and product identity locks
- location maps
- spatial blocking
- shot grammar
- camera and lens contracts
- timestamped action beats
- physics and continuity rules
- lighting and audio intent
- positive and negative locks
- rights metadata
- provider-neutral prompt templates
- render-review requirements

Higgsfield owns provider-side model execution and its own product interface.

## ASBE Boundary

ASBE coordinates:

- productions
- studios
- scenes
- shots
- timelines
- agents
- assets
- PBX routes
- review state
- approved distribution handoffs

ASBE must consume the Creator Prompt Contract rather than create a competing Higgsfield-only schema.

## Supercomputer Boundary

Supercomputer may plan, select models, invoke skills, and produce finished assets inside the Higgsfield environment.

Agentropolis must still retain an external record of:

- the original creator mandate
- prompt-contract version
- references and rights state
- approved execution surface
- estimated or approved credit spend
- provider job identifier when available
- output asset identifiers
- verification result
- human approval state
- distribution authorization

Provider project memory is useful, but it is not a substitute for the Agentropolis audit trail.

## Required Scene Contract

A cinematic request should compile into a provider-neutral contract containing at least:

```json
{
  "scene_context": {},
  "active_references": [],
  "location_map": {},
  "first_frame": {},
  "format_mode": {},
  "optics": [],
  "camera": [],
  "action_timing": [],
  "physics": {},
  "lighting": {},
  "audio": {},
  "positive_locks": [],
  "negative_locks": [],
  "rights_state": {},
  "cost_authority": {},
  "approval_state": "draft"
}
```

The provider adapter may transform this contract into the syntax required by the selected Higgsfield model or skill. It may not silently discard identity, rights, timing, camera, or publication constraints.

## Validation Requirements

Before paid generation, validate:

- total timeline duration
- shot and cut consistency
- continuous-take claims against actual cuts
- reference-role conflicts
- identity continuity
- aspect ratio and delivery format
- model capability at execution time
- source-asset rights
- likeness and voice authority
- estimated credit cost
- retry and variant limits
- output-use restrictions

Example failure:

```json
{
  "status": "VALIDATION_FAILED",
  "code": "CAMERA_STRUCTURE_CONFLICT",
  "message": "A continuous take cannot contain a hard cut.",
  "recommended_fix": "Declare a two-shot sequence with one hard cut."
}
```

## Cost Control

Supercomputer can expose provider credit costs before rendering. MCP and CLI jobs may also consume account credits.

Agentropolis policy:

```text
planning and prompt drafting
  -> may use free or low-cost reasoning when available

paid generation
  -> requires visible estimate or bounded budget
  -> requires retry ceiling
  -> requires operator approval when policy threshold is reached

publication
  -> requires separate approval
```

A generation approval never implies publication approval.

## Capability Discovery

Do not freeze a permanent model list into Agentropolis canon.

At execution time, discover or verify:

- available models
- supported durations
- supported resolutions
- reference-image limits
- audio support
- start-frame and end-frame support
- character-training support
- generation price
- plan restrictions

Route by capability, quality, cost, rights, latency, and policy rather than provider loyalty.

## Authentication And Security

Use provider-supported login or OAuth flows.

Do not:

- copy browser cookies
- extract Clerk session tokens or JWTs
- inject requests into a logged-in provider tab
- bypass provider bot protections
- commit authentication artifacts
- place reusable credentials inside prompts or receipts
- give a generation connector publication authority

Use least privilege and keep provider authentication separate from Agentropolis policy authority.

## Required Receipt

```json
{
  "receipt_id": "pending",
  "provider": "higgsfield",
  "execution_surface": "supercomputer_or_skill_or_cli_or_mcp",
  "prompt_contract_ref": "creator_contract_id",
  "provider_job_id": "when_available",
  "model": "discovered_at_execution",
  "assets_used": [],
  "rights_state": "verified_or_blocked",
  "estimated_credits": "record_when_available",
  "actual_credits": "record_when_available",
  "outputs": [],
  "render_verified": false,
  "human_approved": false,
  "publication_authorized": false
}
```

## Hard Rules

- No unverified public claims in documentary or explainer output.
- No likeness, character, product, music, or voice use without authority.
- No uncontrolled recursive render loops.
- No silent credit spending beyond the approved ceiling.
- No provider output enters distribution without media diff and review.
- No generation tool may self-authorize publication.
- No Higgsfield feature replaces Agentropolis governance, receipts, or Mission Control.

## Decision

```text
Higgsfield Supercomputer = interactive provider orchestration surface.
Higgsfield Skills = reusable workflow intelligence.
Higgsfield CLI = explicit command surface.
Higgsfield MCP = governed agent execution surface.

All four belong to the AGENTROPOLIS-CREATOR provider lane.
Execution authority remains with AGENTROPOLIS-AGENT-MCP.
Studio coordination remains with ASBE.
Distribution authority remains with GTM and human approval.
```