# Higgsfield Supercomputer Creator Surface

## Status

**Adopt as an external, gated Creator District production surface.**

Higgsfield Supercomputer is a creator-facing agentic workspace that accepts plain-language briefs, plans production, selects provider models and presets, runs skills, stores project assets, and produces media and campaign deliverables.

It is a provider surface, not the Agentropolis operating system.

## Current Interface Signals

The current Supercomputer interface exposes creator-oriented controls including:

- plain-language creative intake
- Smart mode for deeper planning and model/tool selection
- an Ask interaction mode
- Run marketing workflows
- Apps and other product surfaces
- Skills and reusable workflows
- Free Mode for running the planning LLM without spending generation credits
- credit approval before paid generation

Interface labels may change. Route by capability rather than hardcoding temporary navigation text.

## Correct Agentropolis Placement

```text
Creator brief
  -> AGENTROPOLIS-CREATOR
  -> Creator Prompt Contract
  -> ASBE production orchestration when multi-shot or multi-studio
  -> AGENTROPOLIS-AGENT-MCP authority and cost gate
  -> Higgsfield Supercomputer
  -> provider planning and generation
  -> media diff
  -> RenderVerifier
  -> human approval
  -> PBX / GTM / OTT route
  -> receipt and memory writeback
```

## What Supercomputer May Do

- convert a plain-language brief into a provider execution plan
- choose provider-side models and presets
- invoke installed skills
- create images, videos, product shots, advertisements, and cinematic assets
- organize outputs inside provider projects
- prepare multiple variants
- show a credit estimate before rendering when available
- support interactive refinement

## What Supercomputer Does Not Own

- Agentropolis identity and mandates
- global policy
- cross-provider routing policy
- final rights determination
- publication authority
- audit-ledger truth
- PBX routing
- GTM campaign memory
- OTT classification

## Free Mode Boundary

Free Mode may be used for:

- ideation
- prompt drafting
- shot planning
- campaign planning
- storyboard notes
- skill selection

Free Mode does not mean the full production workflow is cost-free. Image, video, character, or other provider generation may consume credits.

## Run Marketing Boundary

The provider may help create campaign assets and variants, but AGENTROPOLIS-GTM remains responsible for:

- campaign objectives
- audience and channel policy
- approved claims
- publishing schedules
- distribution credentials
- performance measurement
- attribution
- long-term campaign memory

```text
Higgsfield can create the marketing assets.
GTM governs where, why, when, and under whose authority they ship.
```

## Apps Boundary

Higgsfield Apps may be used to prototype creator-facing generative applications. Any app intended to become part of Agentropolis must still pass:

- architecture review
- rights and privacy review
- dependency review
- cost-model review
- security review
- export and portability review
- human approval

Do not treat a provider-hosted app as automatically equivalent to an Agentropolis application-layer product.

## Minimum Handoff Packet

```json
{
  "mandate_id": "agentropolis_mandate_id",
  "creator_contract_id": "creator_contract_id",
  "production_id": "asbe_production_id_when_used",
  "execution_surface": "higgsfield_supercomputer",
  "prompt": "stored_by_reference",
  "references": [],
  "rights_state": "verified_or_blocked",
  "credit_ceiling": "approved_limit",
  "provider_project_id": "when_available",
  "outputs": [],
  "render_verified": false,
  "human_approved": false,
  "distribution_authorized": false
}
```

## Hard Locks

- Supercomputer may recommend a plan, but it may not self-authorize spending above policy.
- Generation approval does not grant publication approval.
- Provider project memory does not replace Agentropolis receipts.
- Model auto-selection does not override rights, identity, continuity, or safety locks.
- Run marketing does not grant access to distribution credentials.
- Apps generated inside the provider remain external until reviewed and adopted.

## Official References

- `https://higgsfield.ai/supercomputer-intro`
- `https://higgsfield.ai/cli`
- `https://higgsfield.ai/supercomputer/marketplace/skills`

## Decision

```text
Higgsfield Supercomputer = external interactive studio and workflow surface.
AGENTROPOLIS-CREATOR = creative contract and provider-neutral production intelligence.
ASBE = production orchestration.
AGENTROPOLIS-AGENT-MCP = authority, execution gate, and receipts.
AGENTROPOLIS-GTM = governed distribution and campaign memory.
```