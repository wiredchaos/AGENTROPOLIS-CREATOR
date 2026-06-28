# AGENTROPOLIS-CREATOR

Agentropolis Creator is the production layer for building reusable 3D scenes, characters, crowds, skills, and creator-facing asset systems for the Agentropolis ecosystem.

This repository starts with the open source human and crowd asset pipeline: a Humaniq-style alternative built around Blender, open character generation, Geometry Nodes, Rigify, metadata, and license-safe asset governance.

## Current Focus

**Open Human Crowd Stack**

A modular open source route for:

- hero human characters
- NPC population pools
- companion and pet assets
- crowd presets
- Blender Geometry Nodes crowd generation
- license tracking
- web-ready export planning

## Why This Exists

Commercial 3D asset libraries are useful, but Agentropolis needs a system that can be inspected, extended, governed, and reused across districts.

The goal is not random asset hoarding.

The goal is an Intelligence Grid population layer: people, operators, shoppers, guides, companions, background crowds, and cinematic extras that make Agentropolis feel alive.

## Repo Map

```text
docs/
  open-source-human-crowd-stack.md

skills/
  open-human-crowd/
    skill.md

registry/
  asset-sources.md
  crowd-presets.md

blender/
  geometry-nodes/
    README.md
  scripts/
    README.md

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

## Guardrails

- Do not commit large binary assets without Git LFS.
- Do not use assets with unclear licenses.
- Do not treat free downloads as open source.
- Do not use ripped game models, celebrity likenesses, or trademarked uniforms.
- Keep metadata sidecars for all imported or generated assets.

## First Build Path

1. Build a small NPC pool.
2. Add metadata sidecars.
3. Create a Blender Geometry Nodes scatter preset.
4. Test a lobby scene.
5. Export foreground, midground, and background layers separately.

The city gets real when the population layer comes online.
