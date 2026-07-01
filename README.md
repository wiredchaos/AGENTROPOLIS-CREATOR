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
- model-pack candidates and training workflows
- executable skills, workflows, templates, evals, model packs, and MCP kits for District Exchange

## System-Wide Execution Lane

AGENTROPOLIS-CREATOR now uses a system-wide execution lane for every capability package.

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

AGENTROPOLIS-CITY owns the Claw3D/Hermes/NemoClaw integration plan:

```text
docs/claw3d-hermes-agentropolis-integration.md
```

The relationship is:

```text
AGENTROPOLIS-CREATOR
  -> designs and generates district assets, rooms, avatars, NPCs, crowds, media, templates, skills, workflows, model packs, and MCP kits

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
- model pack candidates
- eval suite candidates

CITY consumes:
- Claw3D room layouts
- Hermes agent bindings
- NemoClaw gate state visuals
- AGENTROPOLIS district metadata
- approved visual/runtime package references only

DISTRICT EXCHANGE consumes:
- verified skills
- agents
- workflows
- templates
- eval suites
- MCP kits
- WorldForge packs
- model packs
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

Agentropolis needs streets, towers, apartments, offices, labs, universities, markets, transit systems, crowds, avatars, props, sound layers, procedural district logic, skills, workflows, MCP kits, model packs, eval suites, and the video rails that turn city outputs into broadcasts, shorts, recaps, teasers, training assets, and product explainers.

The city gets real when the Foundry can generate, govern, render, package, train, verify, and publish the capabilities behind it.

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
  model-training-foundry.md
  system-wide-execution-lane.md

skills/
  open-human-crowd/
    skill.md
  model-pack-verifier/
    skill.md

registry/
  asset-sources.md
  crowd-presets.md
  mcp-adapters.md
  training-adapters.md
  package-index.md

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
  model-pack-candidate.md

templates/
  model-pack/
    README.md
    model-card.md
    dataset-card.md
    training-config.yaml
    eval-report.md
    risk-review.md
    license-review.md
    provenance.json
    export-manifest.json

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
| Fast local fine-tuning | Unsloth AI |
| Operator training workbench | LLaMA Factory |
| Alignment and preference training | Axolotl |
| Distributed model training | DeepSpeed |
| Skill package production | Skill Architect, Workflow Compiler, Eval Builder, Verifier |
| Model package verification | Model Pack Verifier |

## Construction District Guardrails

- Use Git LFS for large binary assets.
- Use only assets with clear licenses.
- Keep metadata sidecars for imported or generated assets.
- Preview world diffs before production changes.
- Preview media diffs before publishing rendered output.
- Require cost, purpose, and approval metadata for tool-assisted world generation and timeline rendering.
- Require provenance, license review, eval reports, risk review, and rollback paths for model packs.
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
14. Package the first model-pack candidate through Model Training Foundry.
15. Verify the first model pack with Model Pack Verifier.
16. Add verified packages to `registry/package-index.md` before downstream handoff.

## Canon Line

> Agentropolis is the city.  
> AGENTROPOLIS-CREATOR is the foundry.  
> AGENTROPOLIS-CITY is the live 3D city shell.  
> District Exchange is where skills, agents, workflows, MCP kits, model packs, and production packages ship.  
> The Foundry builds the world, while governance decides what becomes permanent.
