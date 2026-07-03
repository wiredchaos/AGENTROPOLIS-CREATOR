# AGENTROPOLIS-CREATOR

## Agentropolis Construction District

AGENTROPOLIS-CREATOR is the **Agentropolis Construction District** and the **Agentropolis Foundry**.

This is the place where the city builds itself.

It is the production layer for designing, generating, testing, governing, rendering, packaging, and exporting reusable 3D scenes, characters, crowds, districts, buildings, skills, templates, creator-facing asset systems, model packs, workflows, MCP kits, and publishable media for the Agentropolis ecosystem.

```text
Agentropolis
= the private city OS and runtime core

HERMES-CITY
= the public signal, civic shell, and safe coordination layer

AGENTROPOLIS-CREATOR
= the foundry

AGENTROPOLIS-AGENT-MCP
= the governed MCP routing and tool membrane
```

```text
wiredchaos/agentropolis
= private City OS and main app

wiredchaos/HERMES-CITY
= public signal layer, civic shell, and coordination surface

wiredchaos/AGENTROPOLIS-CREATOR
= Agentropolis Construction District and Foundry

wiredchaos/AGENTROPOLIS-AGENT-MCP
= MCP tool routing, model council routing, reference-lock intake, and guarded execution interface
```

## Agentropolis and Hermes City Integration

AGENTROPOLIS-CREATOR does not replace the private city runtime or the public city shell.

The relationship is:

```text
AGENTROPOLIS-CREATOR
  -> designs and generates district assets, rooms, avatars, NPCs, crowds, media, templates, skills, workflows, model packs, and MCP kits

HERMES-CITY
  -> publishes public-safe signals, civic-shell docs, interface patterns, release notes, and coordination maps

AGENTROPOLIS-AGENT-MCP
  -> validates packages, routes model council decisions, gates tool access, and logs receipts

agentropolis
  -> private City OS and runtime core that consumes approved package references
```

## Current Focus

A modular open-source route for:

- Hermes City 3D environments
- district templates
- procedural rooms
- building interiors
- hero human characters
- NPC population pools
- companion and pet assets
- crowd presets
- Blender Geometry Nodes crowd generation
- MCP adapters for 3D tools
- OpenCut-style video rendering and timeline automation
- governed world-diff previews
- governed media-diff previews
- metadata and license tracking
- web-ready export planning
- model-pack candidates and training workflows
- executable skills, workflows, templates, evals, model packs, and MCP kits for District Exchange

## Hermes Rankings and Backends Showcase

The Foundry now has a showcase brief for turning model ranking boards, backend provider matrices, skill registries, UNBROKER install cards, Model Council routing, and MCP guardrails into public-safe creator assets.

Creator reference: [`docs/HERMES_RANKINGS_AND_BACKENDS_SHOWCASE.md`](docs/HERMES_RANKINGS_AND_BACKENDS_SHOWCASE.md)

## UNBROKER Creator Signal

UNBROKER gives the Foundry a concrete privacy-ops scene package: consent-gated exposure search, broker fan-out, removal filing, verification, ledger receipts, human digest, and recurring re-scans.

Install path:

```bash
hermes update
hermes skills install official/security/unbroker
```

Creator reference: [`docs/UNBROKER_CREATOR_ASSET_BRIEF.md`](docs/UNBROKER_CREATOR_ASSET_BRIEF.md)

## System-Wide Execution Lane

AGENTROPOLIS-CREATOR uses a system-wide execution lane for every capability package.

```text
idea -> candidate -> package -> verification -> registry -> handoff -> runtime adoption
```

The Foundry builds candidates.
Verifier skills check structure, provenance, license, evals, risk, rollback, and handoff readiness.
District Exchange indexes approved packages.
Runtime repos consume only approved package references.

## Provider-Agnostic Terminal Foundry Lane

CREATOR may use terminal coding agents as construction tools, but they remain provider-agnostic and policy-bound.

See [`docs/PROVIDER_AGNOSTIC_TERMINAL_FOUNDRY_LANE.md`](docs/PROVIDER_AGNOSTIC_TERMINAL_FOUNDRY_LANE.md).

Core pattern:

```text
Foundry idea
  -> candidate package
  -> terminal build lane if approved
  -> structure validation
  -> provenance review
  -> license review
  -> handoff manifest
```

## Pull Direction

```text
CREATOR exports:
- district room specs
- GLB/Three.js-ready scene assets
- NPC and avatar presets
- district color palettes
- metadata sidecars
- world-diff previews
- skill packages
- workflow packages
- MCP kit packages
- model pack candidates
- eval suite candidates

HERMES-CITY consumes:
- public-safe architecture maps
- coordination notes
- civic shell docs
- non-sensitive release signals
- public interface patterns

AGENTROPOLIS-AGENT-MCP consumes:
- approved package manifests
- reference-lock handoff manifests
- schema validation targets
- model council routing metadata
- guarded tool execution requests

agentropolis consumes:
- approved visual/runtime package references only
- MCP-approved tool outputs
- District Exchange package references
```

Do not make CREATOR pull live runtime state directly.
Runtime state belongs to the private Agentropolis core.
CREATOR produces governed construction assets and foundry packages.
HERMES-CITY explains public-safe signals.
AGENTROPOLIS-AGENT-MCP routes governed handoffs.
District Exchange distributes verified packages.

## Construction District Guardrails

- Use Git LFS for large binary assets.
- Use only assets with clear licenses.
- Keep metadata sidecars for imported or generated assets.
- Preview world diffs before production changes.
- Preview media diffs before publishing rendered output.
- Require cost, purpose, and approval metadata for tool-assisted world generation and timeline rendering.
- Require provenance, license review, eval reports, risk review, and rollback paths for model packs.
- Keep City Canon in the private city core as the source of truth.
- Keep live runtime state in agentropolis, not CREATOR.
- CREATOR exports assets and specs. HERMES-CITY publishes public-safe signals. AGENTROPOLIS-AGENT-MCP governs handoff. Agentropolis consumes approved references.
- No package enters canonical city infrastructure without evaluation and approval.

## Public / Private Boundary

AGENTROPOLIS-CREATOR is public.

Public materials may describe concepts, schemas, operating principles, foundry workflows, package contracts, and non-sensitive handoff patterns.

Do not commit private keys, secrets, client data, undisclosed strategy documents, wallet infrastructure, internal runtime code, proprietary prompts, or private orchestration details to this repository.

## Canon Line

> Agentropolis is the private city OS.  
> HERMES-CITY is the public signal and civic shell.  
> AGENTROPOLIS-CREATOR is the foundry.  
> AGENTROPOLIS-AGENT-MCP is the governed routing membrane.  
> District Exchange is where skills, agents, workflows, MCP kits, model packs, and production packages ship.  
> The Foundry builds the world, while governance decides what becomes permanent.  
