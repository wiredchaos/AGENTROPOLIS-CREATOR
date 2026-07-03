# AGENTROPOLIS-CREATOR

## Agentropolis Construction District

AGENTROPOLIS-CREATOR is the **Agentropolis Construction District** and the **Agentropolis Foundry**.

This is the place where the city builds itself.

It is the production layer for designing, generating, testing, governing, rendering, packaging, and exporting reusable 3D scenes, characters, crowds, districts, buildings, skills, templates, creator-facing asset systems, model packs, workflows, MCP kits, and publishable media for the Agentropolis ecosystem.

```text
Agentropolis
= the city

AGENTROPOLIS-CREATOR
= the foundry

Model Training Foundry
= where specialized model capability is produced, tested, and packaged

District Exchange
= where skills, agents, workflows, MCP kits, model packs, and production packages ship
```

```text
wiredchaos/agentropolis
= City OS + live Hermes City deployment

wiredchaos/AGENTROPOLIS-CITY
= Live 3D city shell + Hermes/OpenWorks/engine integration surface

wiredchaos/AGENTROPOLIS-CREATOR
= Agentropolis Construction District + Foundry
```

## Current Focus

**Construction District Stack**

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

## 2026 Execution Direction

AGENTROPOLIS-CREATOR is moving toward a **provider-neutral execution lane**.

The Foundry should not depend on one proprietary coding agent, one model provider, or one execution surface.

```text
HERMES
= command intelligence and routing pattern

OpenWorks Lab
= sovereign execution layer concept

GitLawb Zero
= optional local coding lane for repo patch and package candidates

MCP Catalog
= tool and engine access layer

Blender
= default WorldForge asset and structured-ops lane

Unreal Engine MCP
= verified optional engine integration lane

NVIDIA
= optional acceleration layer
```

### GitLawb Zero Local Coding Lane

GitLawb Zero is tracked as an optional sovereign builder lane for local code work.

```text
Operator intent
  -> HERMES / OpenWorks command layer
  -> Model Exchange / local model selection
  -> GitLawb Zero local coding lane
  -> repo patch or package candidate
  -> tests / validation
  -> verifier skills
  -> District Exchange candidate
```

See [`docs/gitlawb-zero-local-coding-lane.md`](docs/gitlawb-zero-local-coding-lane.md).

### Claw-Free Direction

Any legacy Claw/Claw3D/NemoClaw language should be treated as historical or transition vocabulary unless explicitly needed for compatibility.

The public architecture direction is:

```text
command -> execution adapter -> tool/MCP adapter -> verification -> package -> registry -> runtime adoption
```

This keeps the Construction District portable across:

- OpenWorks Lab
- Hermes Agent-compatible MCP surfaces
- GitLawb Zero local coding lane
- local models
- NVIDIA-accelerated routes
- Blender workflows
- Unreal Engine workflows
- future execution engines

## Verified Engine Integration: Unreal Engine MCP

Unreal Engine MCP is verified as an optional engine integration lane for Agentropolis Creator workflows.

Scope it correctly:

- Unreal Engine MCP is an **MCP Catalog integration lane**.
- It requires Unreal Engine 5.8 installed locally.
- It is additive, not the default foundation.
- Blender remains the default structured WorldForge and asset-generation path.
- Unreal is best positioned for cinematic export, editor-assisted world work, high-fidelity scene staging, and engine-level experimentation.

Reference pattern:

```text
HERMES / OpenWorks command layer
  -> MCP Catalog
  -> Unreal Engine MCP
  -> Unreal Editor
  -> verified scene, asset, or system output
  -> package candidate
  -> District Exchange approval path
```

Public-safe teaching angle:

- teach what engine-level MCP means
- teach why game engines need controlled tool access
- teach how agents can assist editor workflows
- teach when Unreal fits better than Blender
- teach why local install requirements matter

Do not publish private world-forge logic, private routing prompts, private Agentropolis governance internals, or proprietary cinematic/export recipes.

## System-Wide Execution Lane

AGENTROPOLIS-CREATOR uses a system-wide execution lane for every capability package.

```text
idea -> candidate -> package -> verification -> registry -> handoff -> runtime adoption
```

The Foundry builds candidates.
Verifier skills check structure, provenance, license, evals, risk, rollback, and handoff readiness.
District Exchange indexes approved packages.
Runtime repos consume only approved package references.

See:

```text
docs/system-wide-execution-lane.md
registry/package-index.md
```

## Model Training Foundry

The Model Training Foundry adds an intelligence construction lane for specialized model packs.

It evaluates open-source training tools such as:

- Unsloth AI
- LLaMA Factory
- Axolotl
- DeepSpeed

Model outputs are candidate artifacts until provenance, license, risk, evaluation, export, and district approval gates are complete.

See:

```text
docs/model-training-foundry.md
registry/training-adapters.md
workflows/model-pack-candidate.md
skills/model-pack-verifier/skill.md
templates/model-pack/
```

## District Exchange

District Exchange is the distribution layer for Agentropolis capabilities.

It is not a generic app store.

It is the city-native exchange where districts ship governed, tagged, executable packages:

- skills
- agents
- workflows
- templates
- evaluation suites
- MCP kits
- WorldForge packs
- model packs
- commerce kits
- production pipelines

The foundry builds and verifies the packages. District Exchange indexes and distributes them. Agentropolis consumes them as city infrastructure.

See:

```text
docs/district-exchange-canon.md
registry/package-index.md
```

## City Shell Integration

AGENTROPOLIS-CREATOR does not replace the live city shell.

The live 3D governed swarm room belongs in:

```text
wiredchaos/AGENTROPOLIS-CITY
```

AGENTROPOLIS-CITY owns the live shell, district room mapping, visual runtime, and engine-facing integration surfaces.

The relationship is:

```text
AGENTROPOLIS-CREATOR
  -> designs and generates district assets, rooms, avatars, NPCs, crowds, media, templates, skills, workflows, model packs, and MCP kits

AGENTROPOLIS-CITY
  -> runs the 3D city shell, maps districts to rooms, visualizes agent states, and displays governance states

District Exchange
  -> ships and routes verified capability packages

Hermes
  -> command intelligence / agent substrate pattern

OpenWorks Lab
  -> sovereign execution lane concept

GitLawb Zero
  -> optional local coding lane for repo patch and package candidates

Blender
  -> default structured WorldForge and asset-production lane

Unreal Engine MCP
  -> verified optional engine-level MCP integration lane

NVIDIA
  -> optional model acceleration and inference lane

Qwen-AgentWorld
  -> post-hackathon simulation and rehearsal layer
```

### Pull Direction

For MVP, AGENTROPOLIS-CREATOR should feed assets and specs into AGENTROPOLIS-CITY and verified packages into District Exchange.

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
- optional Unreal Engine MCP package candidates

CITY consumes:
- room layouts
- agent bindings
- governance state visuals
- AGENTROPOLIS district metadata
- approved visual/runtime package references only
- optional Unreal Engine MCP outputs after verification

DISTRICT EXCHANGE consumes:
- verified skills
- agents
- workflows
- templates
- MCP kits
- WorldForge packs
- model packs
- engine integration packages
```

## Public Boundary

AGENTROPOLIS-CREATOR may teach public patterns and package structures, but it must not expose private Agentropolis internals.

Do not publish:

- private routing prompts
- private governance engine logic
- private memory schemas
- private district logic
- private economic logic
- production secrets
- proprietary world-forge recipes

Core rule:

```text
Open source the map.
Protect the engine.
Teach the pattern.
Keep the command core private.
```
