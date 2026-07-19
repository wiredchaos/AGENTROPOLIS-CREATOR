# Higgsfield Explainer Intelligence Note

## Core Lock

Higgsfield Explainer applies to AGENTROPOLIS-CREATOR.

It should not become a standalone Agentropolis repository yet.

It belongs inside the Creator District as a faceless documentary, explainer, and narrated video generation lane that can be invoked by agents through the official Higgsfield MCP, Supercomputer workflows, or future approved provider adapters.

Official MCP endpoint:

```text
https://mcp.higgsfield.ai/mcp
```

Canonical connector policy: [`HIGGSFIELD_MCP_CREATOR_LANE.md`](HIGGSFIELD_MCP_CREATOR_LANE.md).

## Position In Agentropolis

```text
Agentropolis
  -> AGENTROPOLIS-CREATOR
  -> Creator District
  -> Video Generation District
  -> Explainer Pipeline
  -> official Higgsfield MCP
```

Higgsfield Explainer is a production surface, not the durable architecture.

The durable Agentropolis layer remains:

- research orchestration
- source capture
- claim verification
- script generation
- narration planning
- multilingual output
- render governance
- approval packets
- publishing automation
- memory and registry writeback

## What It Adds

Higgsfield Explainer is relevant because it compresses a full faceless documentary workflow into one render lane:

- auto-research a topic
- generate explainer structure
- narrate in multiple languages
- render long-form documentary output when supported
- support documentary-style output at scale
- expose the workflow through Higgsfield MCP and Supercomputer paths

Any provider-advertised duration, model, pricing, or feature must be discovered and verified at execution time instead of treated as permanent canon.

Provider-specific model names should remain implementation details. Agentropolis routes by capability, rights, cost, quality, and policy rather than model loyalty.

## Agent Chain

```text
Topic Request
  -> Research Agent
  -> Source Capture Agent
  -> Claim Verification Agent
  -> Narrative Agent
  -> Storyboard Agent
  -> Creator Prompt Contract
  -> AGENTROPOLIS-AGENT-MCP policy gate
  -> official Higgsfield MCP
  -> RenderOps Agent
  -> Verifier Agent
  -> Human Approval
  -> Publishing Agent
  -> Registry / Memory Writeback
```

## Primary Use Cases

### City Explainers

Generate public-facing videos explaining Agentropolis architecture, districts, runtime layers, and product surfaces.

### Skill Documentation

Turn CHAOS SKILL docs, README files, and GitHub changes into narrated onboarding videos.

### Release Explainers

Convert pull requests, release notes, and repo updates into short documentaries or longer changelog videos when the provider supports the requested duration.

### Education Content

Support WCU, onboarding, fifth-grade-simple explainers, and multilingual knowledge transfer.

### Media Channels

Feed creator-ready video assets into:

- CLEAR
- BWB
- WIRED CHAOS OTT
- 789 STUDIOS OTT
- X / YouTube / LinkedIn distribution

## Routing Rule

Do not hardcode Higgsfield as the only video explainer provider.

Use this routing language:

```text
Generate a governed documentary explainer from verified Agentropolis source material.
```

Then let the Video Generation District route to the official Higgsfield MCP when it is the best permitted provider for the requested output.

## Authentication And Security

Production use must connect through the official vendor-hosted OAuth endpoint.

Do not:

- copy Higgsfield browser cookies
- extract Clerk session tokens or JWTs
- use browser injection to impersonate provider API calls
- bypass provider bot protections
- commit credentials or session artifacts
- grant publication authority to the generation connector

Use least-privilege permissions, provider-managed authentication, execution receipts, and explicit approval gates.

## Governance Rules

- Do not publish auto-researched claims without verification.
- Do not expose secrets, API keys, OAuth artifacts, private client data, or unreleased repo strategy.
- Do not imply official partnerships beyond the existence of the official public connector.
- Preserve Agentropolis canon and district boundaries.
- Keep provider-specific model names behind the capability router.
- Verify current provider capabilities before promising duration, resolution, model access, or cost.
- Require human approval before public publishing.
- Store source links, script, prompt, render metadata, rights state, cost authority, and approval state.

## Recommended Repo Placement

```text
AGENTROPOLIS-CREATOR
├── docs/
│   ├── video-generation-district.md
│   ├── higgsfield-explainer-intel.md
│   └── HIGGSFIELD_MCP_CREATOR_LANE.md
└── registry/
    └── media-mcp-adapters.md
```

Provider-specific execution code is not required inside CREATOR for the hosted connector. CREATOR owns the prompt contract, reference authority, governance policy, templates, and validation requirements. AGENTROPOLIS-AGENT-MCP owns connection authority and execution receipts.

Future implementation may add provider-neutral workflow and prompt assets:

```text
integrations/higgsfield/
├── README.md
├── workflows/
│   ├── documentary.yaml
│   ├── explainer.yaml
│   └── multilingual.yaml
└── prompts/
    ├── city-explainer.md
    ├── district-tour.md
    ├── github-release.md
    └── skill-doc-video.md
```

## Decision

Yes, this applies.

Lock it as:

```text
Higgsfield Explainer = Creator District video/documentary generation lane.
Official connector = https://mcp.higgsfield.ai/mcp
Not a separate repo.
Provider execution routed through AGENTROPOLIS-AGENT-MCP.
Public release requires RenderVerifier and human approval.
```