---
name: cityflight
version: 0.1.0
display_name: CITYFLIGHT
description: Build a governed scroll-controlled cinematic journey from approved scenes, frame-locked video segments, connectors, manifests, and receipts.
district: AGENTROPOLIS-CREATOR
pack: cinematic-worlds
tags: [scroll, cinematic, world, video, web, gaming, asbe]
tier: extended
layer: application
chains_from: [creator-prompt-compiler, storyboard-reference-intelligence, hermes-motion-maker]
chains_to: [ASBE, AGENTROPOLIS-AGENT-MCP, AGENTROPOLIS-GAMING-DISTRICT, AGENTROPOLIS-DEPLOY]
orchestrated_by: ASBE
---

# CITYFLIGHT

CITYFLIGHT turns an approved district, game, campaign, product, or story map into one continuous scroll-controlled cinematic journey.

It does not own provider credentials, public-release authority, game state, deployment authority, or protocol semantics. It compiles a production package that downstream Agentropolis systems can validate, execute, review, and publish.

## Activation Triggers

Use this skill when the user asks to:

- build a world visitors can fly through
- create a cinematic scroll landing page
- turn a district or game into a continuous camera journey
- build a spatial product or campaign experience
- create a scroll-controlled world intro
- generate connected scene-to-scene video traversal

## Core Production Law

Every seam must be built from the actual rendered boundary frames.

```text
approved scene still
  -> rendered scene flight
  -> extract actual final frame
  -> generate connector from final frame to next actual first frame
  -> validate seam
  -> encode delivery variants
```

Do not construct connectors from prompt stills when rendered boundary frames exist.

## Inputs

Require or explicitly mark missing:

- world or experience name
- purpose and target audience
- ordered scene list
- brand palette and typography direction
- camera grammar
- desktop-only or native mobile chain
- rights status for every supplied asset
- provider mode and approved credential references
- maximum spend authorization
- deployment target
- human approver

## Provider Boundary

CITYFLIGHT is provider-neutral.

Approved adapters must expose equivalent capabilities for:

- still generation
- start-frame-conditioned video
- end-frame-conditioned connector video
- frame extraction
- encoding
- seam validation

Provider names, prices, account balances, model availability, and credentials must not be invented. Paid execution routes through AGENTROPOLIS-AGENT-MCP or another approved execution membrane.

## Output Package

```text
cityflight-project/
├── cityflight.manifest.json
├── prompts/
├── scenes/
├── flights/
├── runtime/
├── validation/
└── receipts/
```

The manifest must include:

- schema version
- world ID
- owning district or application
- ordered sections
- desktop and optional native-mobile assets
- connector ordering
- rights status
- provider adapter references
- spend ceiling and approval reference
- integrity hashes
- validation receipts
- deployment status

## Required Workflow

1. Confirm rights and source provenance.
2. Compile the story map and ordered scenes.
3. Compile a camera grammar for the full journey.
4. Produce a cost estimate and request a spend approval reference.
5. Generate or ingest scene stills.
6. Review scene cohesion before video generation.
7. Generate one scene flight per approved scene.
8. Extract actual first and final frames from rendered flights.
9. Generate frame-locked connector flights.
10. Validate every seam and record failures.
11. Encode desktop variants.
12. When approved, render a separate native 9:16 mobile chain. Do not silently label a crop as the mobile production.
13. Compile the signed manifest and receipts.
14. Hand orchestration state to ASBE.
15. Route provider execution through AGENTROPOLIS-AGENT-MCP.
16. Route spend approval and final release through Mission Control.
17. Route deployment through AGENTROPOLIS-DEPLOY.

## Gaming District Use

The Gaming District may use CITYFLIGHT for:

- district and game portals
- faction introductions
- mission briefings
- chapter and season maps
- character or operative journeys
- campaign selection experiences
- world entrances and launch sequences

Gaming District governance remains authoritative for player identity, missions, rewards, progression, rights states, and game registry data.

## ATG Contract

Consequential execution must carry:

```text
identity
  -> mandate
  -> authority scope
  -> approved spend ceiling
  -> execution request
  -> evidence
  -> receipt
```

CITYFLIGHT consumes ATG-compatible mandate and receipt references. It does not redefine ATG.

## Guardrails

- Do not spend without an approval reference and spend ceiling.
- Do not expose, print, or commit provider secrets.
- Do not claim a provider call succeeded without returned assets or receipts.
- Do not publish unreviewed generated media.
- Do not use unlicensed source assets.
- Do not merge game-state authority into the visual runtime.
- Do not let a frontend manifest become the authority for balances, inventory, missions, identity, or rewards.
- Preserve upstream license notices for any reused implementation.

## Example

```text
CITYFLIGHT — build a six-scene scroll journey for NEURO HEIST: city perimeter, crew selection, planning room, vault approach, breach, and extraction. Produce a planning-only manifest until rights, provider credentials, and the spend ceiling are approved.
```
