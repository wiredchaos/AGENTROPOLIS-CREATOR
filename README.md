# AGENTROPOLIS-CREATOR

## Agentropolis Construction District

AGENTROPOLIS-CREATOR is the **Agentropolis Construction District** and the **Agentropolis Foundry**.

This is the place where the city builds itself.

It is the production layer for designing, generating, testing, governing, rendering, packaging, and exporting reusable 3D scenes, characters, crowds, districts, buildings, skills, templates, creator-facing asset systems, and publishable media for the Agentropolis ecosystem.

```text
Agentropolis
= the city

AGENTROPOLIS-CREATOR
= the foundry

District Exchange
= where skills, agents, workflows, and MCP kits ship
```

```text
wiredchaos/agentropolis
= City OS + live Hermes City deployment

wiredchaos/AGENTROPOLIS-CITY
= Live 3D city shell + Claw3D/Hermes/NemoClaw integration surface

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
- executable skills, workflows, templates, evals, and MCP kits for District Exchange

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
- commerce kits
- production pipelines

The foundry builds and verifies the packages. District Exchange indexes and distributes them. Agentropolis consumes them as city infrastructure.

See:

```text
docs/district-exchange-canon.md
```

## City Shell Integration

AGENTROPOLIS-CREATOR does not replace the live city shell.

The live 3D governed swarm room belongs in:

```text
wiredchaos/AGENTROPOLIS-CITY
```

AGENTROPOLIS-CITY owns the Claw3D/Hermes/NemoClaw integration plan:

```text
docs/claw3d-hermes-agentropolis-integration.md
```

The relationship is:

```text
AGENTROPOLIS-CREATOR
  -> designs and generates district assets, rooms, avatars, NPCs, crowds, media, templates, skills, workflows, and MCP kits

AGENTROPOLIS-CITY
  -> runs the 3D city shell, maps districts to rooms, visualizes Hermes agents, and displays NemoClaw governance states

District Exchange
  -> ships and routes verified capability packages

Hermes
  -> live agent substrate

NemoClaw
  -> policy checkpoints and governed execution gates

Claw3D
  -> spatial office/city visualization layer

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

CITY consumes:
- Claw3D room layouts
- Hermes agent bindings
- NemoClaw gate state visuals
- AGENTROPOLIS district metadata

DISTRICT EXCHANGE consumes:
- verified skills
- agents
- workflows
- templates
- eval suites
- MCP kits
- WorldForge packs
- commerce kits
- production pipelines
```

Do not make CREATOR pull live runtime state directly.
Runtime state belongs to CITY.
CREATOR produces governed construction assets and foundry packages.
CITY visualizes live governed agents.
District Exchange distributes verified packages.

## Why This Exists

Commercial 3D asset libraries and prompt vaults are useful, but Agentropolis needs a system that can be inspected, extended, governed, reused, tested, and improved across districts.

The goal is not random asset hoarding or a generic app store.

The goal is a **Foundry**: a controlled capability factory that turns ideas into safe, reusable, auditable city infrastructure.

Agentropolis needs streets, towers, apartments, offices, labs, universities, markets, transit systems, crowds, avatars, props, sound layers, procedural district logic, skills, workflows, MCP kits, and the video rails that turn city outputs into broadcasts, shorts, recaps, teasers, training assets, and product explainers.

The city gets real when the Foundry can generate, govern, render, package, and publish the capabilities behind it.

## Repo Map

```text
docs/
  open-source-human-crowd-stack.md
  3d-mcp-agent-kit.md
  agentropolis-3d-mcp-agent-kit.md
  hy-world-2-integration.md
  district-exchange-canon.md
  open-video-rendering-pipeline.md
  procedural-world-forge.md
  construction-district-canon.md

skills/
  open-human-crowd/
    skill.md

registry/
  asset-sources.md
  crowd-presets.md
  mcp-adapters.md

blender/
  geometry-nodes/
    README.md
  scripts/
    README.md

mcp/
  blender/
  unreal/
  unity/
  webxr/
  audio/
  procedural/
  video/

agents/
  WorldForge/
  DistrictBuilder/
  AssetSmith/
  CrowdForge/
  AudioForge/
  MediaForge/
  Verifier/

workflows/
  worldforge-candidate-packet.md

templates/
examples/
assets/
  .gitkeep
```

## Recommended Tool Chain

| Need | Recommended Tool |
| --- | --- |
| Hero humans | MB-Lab or MPFB2 |
| Base human variants | MakeHuman or MPFB2 |
| Rigging | Rigify |
| Crowds | Blender Geometry Nodes |
| Motion testing | CMU MoCap, optional Mixamo |
| Texture and wardrobe variation | Blender materials, optional ComfyUI |
| Web exports | GLB with strict LOD control |
| Browser previews | PlayCanvas / WebXR / React Three Fiber |
| Procedural environments | Blender, Infinigen-style pipelines, WFC, MarkovJunior |
| World generation / reconstruction | HY-World 2.0 candidate lane through WorldForge |
| Voice and ambience | AudioForge / approved voice layers |
| Timeline editing and batch renders | OpenCut / open video editor pipeline |
| Skill package production | Skill Architect, Workflow Compiler, Eval Builder, Verifier |

## Construction District Guardrails

- Use Git LFS for large binary assets.
- Use only assets with clear licenses.
- Keep metadata sidecars for imported or generated assets.
- Preview world diffs before production changes.
- Preview media diffs before publishing rendered output.
- Require cost, purpose, and approval metadata for tool-assisted world generation and timeline rendering.
- Keep City Canon in the city repo as the source of truth.
- Keep live runtime state in AGENTROPOLIS-CITY, not CREATOR.
- CREATOR exports assets/specs; CITY consumes and runs them.
- CREATOR exports verified package specs; District Exchange distributes them.
- No package enters canonical city infrastructure without evaluation and approval.

## First Build Path

1. Build a small NPC pool.
2. Add metadata sidecars.
3. Create a Blender Geometry Nodes scatter preset.
4. Create a Mission Control environment spec.
5. Create an Axis Tower exterior spec.
6. Create an Apartment 401 interior spec.
7. Export foreground, midground, and background layers separately.
8. Create an OpenCut-style timeline spec for short-form render testing.
9. Preview world diffs and media diffs before production changes.
10. Export first NemoClaw Security Fortress room spec for AGENTROPOLIS-CITY.
11. Confirm Claw3D-compatible scene/room format before scaling to more districts.
12. Package the first 25 District Exchange skills with metadata, examples, templates, and evals.
13. Package the first 5 MCP kits and 5 WorldForge packs as candidate releases.

## Canon Line

> Agentropolis is the city.  
> AGENTROPOLIS-CREATOR is the foundry.  
> AGENTROPOLIS-CITY is the live 3D city shell.  
> District Exchange is where skills, agents, workflows, and MCP kits ship.  
> The Foundry builds the world, while governance decides what becomes permanent.