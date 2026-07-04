# Higgsfield Explainer Intelligence Note

## Core Lock

Higgsfield Explainer applies to AGENTROPOLIS-CREATOR.

It should not become a standalone Agentropolis repository yet.

It belongs inside the Creator District as a faceless documentary, explainer, and narrated video generation lane that can be invoked by agents through MCP, Supercomputer workflows, or future provider adapters.

## Position In Agentropolis

```text
Agentropolis
  -> AGENTROPOLIS-CREATOR
  -> Creator District
  -> Video Generation District
  -> Explainer Pipeline
  -> Higgsfield Explainer adapter
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
- render up to 10 minutes in one run
- support documentary-style output at scale
- expose the workflow through Higgsfield, MCP, and Supercomputer paths

The stated model stack from the announcement is:

- Claude Fable 5
- Gemini Omni Flash

These names should be treated as provider-specific implementation details. Agentropolis should route by capability, not by model loyalty.

## Agent Chain

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
  -> Registry / Memory Writeback
```

## Primary Use Cases

### City Explainers

Generate public-facing videos explaining Agentropolis architecture, districts, runtime layers, and product surfaces.

### Skill Documentation

Turn CHAOS SKILL docs, README files, and GitHub changes into narrated onboarding videos.

### Release Explainers

Convert pull requests, release notes, and repo updates into short documentaries or 3-10 minute changelog videos.

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

Then let the Video Generation District route to Higgsfield Explainer when it is the best provider for long-form faceless documentary output.

## Governance Rules

- Do not publish auto-researched claims without verification.
- Do not expose secrets, API keys, private client data, or unreleased repo strategy.
- Do not imply official partnerships unless confirmed.
- Preserve Agentropolis canon and district boundaries.
- Keep provider-specific model names behind the capability router.
- Require human approval before public publishing.
- Store source links, script, prompt, render metadata, and approval state.

## Recommended Repo Placement

```text
AGENTROPOLIS-CREATOR
└── docs/
    ├── video-generation-district.md
    └── higgsfield-explainer-intel.md
```

Future implementation can add:

```text
integrations/higgsfield/
├── README.md
├── MCP.md
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
Not a separate repo yet.
MCP-enabled provider adapter under AGENTROPOLIS-CREATOR.
```
