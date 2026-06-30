# AGENTROPOLIS-CREATOR

## Agentropolis Construction District

AGENTROPOLIS-CREATOR is the **Agentropolis Construction District**.

This is the place where the city builds itself.

It is the production layer for designing, generating, testing, governing, rendering, and exporting reusable 3D scenes, characters, crowds, districts, buildings, skills, templates, creator-facing asset systems, and publishable media for the Agentropolis ecosystem.

```text
wiredchaos/agentropolis
= City OS + live Hermes City deployment

wiredchaos/AGENTROPOLIS-CITY
= Live 3D city shell + Claw3D/Hermes/NemoClaw integration surface

wiredchaos/AGENTROPOLIS-CREATOR
= Agentropolis Construction District
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
  -> designs and generates district assets, rooms, avatars, NPCs, crowds, media, and templates

AGENTROPOLIS-CITY
  -> runs the 3D city shell, maps districts to rooms, visualizes Hermes agents, and displays NemoClaw governance states

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

For MVP, AGENTROPOLIS-CREATOR should feed assets and specs into AGENTROPOLIS-CITY.

```text
CREATOR exports:
- district room specs
- GLB/Three.js-ready scene assets
- NPC and avatar presets
- district color palettes
- metadata sidecars
- world-diff previews

CITY consumes:
- Claw3D room layouts
- Hermes agent bindings
- NemoClaw gate state visuals
- AGENTROPOLIS district metadata
```

Do not make CREATOR pull live runtime state directly.
Runtime state belongs to CITY.
CREATOR produces governed construction assets.
CITY visualizes live governed agents.

## Why This Exists

Commercial 3D asset libraries are useful, but Agentropolis needs a system that can be inspected, extended, governed, reused, and improved across districts.

The goal is not random asset hoarding.

The goal is a **Construction District**: a controlled world-generation factory that turns ideas into safe, reusable, auditable city infrastructure.

Agentropolis needs streets, towers, apartments, offices, labs, universities, markets, transit systems, crowds, avatars, props, sound layers, procedural district logic, and the video rails that turn city outputs into broadcasts, shorts, recaps, teasers, training assets, and product explainers.

The city gets real when the Construction District can generate, govern, render, and publish the world behind it.

## Repo Map

```text
docs/
  open-source-human-crowd-stack.md
  3d-mcp-agent-kit.md
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
| Voice and ambience | AudioForge / approved voice layers |
| Timeline editing and batch renders | OpenCut / open video editor pipeline |

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

## Canon Line

> Agentropolis is the city.  
> AGENTROPOLIS-CREATOR is the Construction District.  
> AGENTROPOLIS-CITY is the live 3D city shell.  
> The Construction District builds the world, while governance decides what becomes permanent.
