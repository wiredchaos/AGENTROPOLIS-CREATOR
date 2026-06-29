# Open Source Human and Crowd Asset Stack

This document defines the open source equivalent path for a Humaniq-style 3D human library inside Agentropolis Creator.

Humaniq is a commercial convenience layer: curated humans, pets, simple rigs, textures, tagging, and crowd placement. The open source route is not one single replacement. It is a modular pipeline built from Blender-native tools, open character generators, open rigs, and procedural crowd systems.

## Stack Position

**District:** Creator District

**Layer:** Application and production tooling

**Purpose:** Generate, rig, texture, scatter, animate, and stage human populations for Agentropolis scenes, storefronts, simulations, cinematic rooms, and city-scale environments.

## Recommended Open Source Core

| Role | Tool | Why it fits |
| --- | --- | --- |
| Hero human generation | MB-Lab | Blender-integrated parametric humans with rigs and morph controls. Good for named agents and hero characters. |
| Broad human generation | MakeHuman | Mature standalone human generator with export workflows into Blender. Good for varied base bodies. |
| Blender-native MakeHuman workflow | MPFB2 | Brings MakeHuman-style generation into Blender workflows. Good bridge between MakeHuman assets and Blender production. |
| Rig system | Rigify | Blender's built-in rig generation system. Good for standardized motion and retargeting. |
| Crowd scatter | Blender Geometry Nodes | Best open source replacement for a commercial crowd generator. Handles curve paths, surface scattering, randomization, density, and instancing. |
| Crowd behavior experiments | CrowdMaster or custom Python | Useful for older AI crowd behavior references, but should be treated as experimental/legacy. |
| Motion library | CMU MoCap plus Mixamo optional | CMU is open research motion data. Mixamo is free but not open source, so keep it optional. |
| Textures and clothing | Blender materials plus ComfyUI/Stable Diffusion optional | Open pipeline for variation, uniforms, NPC wardrobes, and brand-coded outfits. |

## Hard Truth

There is no perfect open source Humaniq clone.

The closest practical match is:

```text
MB-Lab or MakeHuman
+ Rigify
+ Geometry Nodes
+ open motion data
+ procedural material and clothing variation
```

This gives Agentropolis Creator a flexible pipeline without locking the project into a commercial asset pack.

## Production Modes

### 1. Hero Agent Mode

Use this for named characters, hosts, guides, mascots, and canon figures.

Pipeline:

```text
MB-Lab or MPFB2
-> customize body and face
-> apply Rigify-compatible rig
-> add wardrobe and material set
-> save as linked Blender asset
-> assign Agentropolis role metadata
```

Output:

```text
/assets/humans/hero/{agent_name}.blend
/assets/humans/hero/{agent_name}.json
```

### 2. NPC Population Mode

Use this for background humans, lobby traffic, market crowds, convention scenes, classroom scenes, and city spaces.

Pipeline:

```text
MakeHuman or MPFB2 base variants
-> simplify mesh for distance tiers
-> create outfit/material variants
-> bake texture atlases where possible
-> register as NPC pool
-> scatter with Geometry Nodes
```

Output:

```text
/assets/humans/npc/pool_{district}.blend
/assets/humans/npc/pool_{district}.json
```

### 3. Crowd Generator Mode

Use this as the open source answer to Humaniq crowd tools.

Geometry Nodes should support:

- scatter to mesh surfaces
- curve-following crowds
- density controls
- random rotations and scale
- collision radius approximation
- animation offset randomization
- district-specific population presets

Suggested presets:

```text
creator-lobby-crowd
command-atrium-operators
marketplace-foot-traffic
conference-floor
asylum-yard-background
city-crosswalk
```

### 4. Pet and Companion Mode

Humaniq includes pets. The open source replacement should treat animals as companion asset packs.

Sources:

- CC-licensed Sketchfab assets
- OpenGameArt assets
- custom Blender sculpts
- internal Agentropolis companion models

Required metadata:

```json
{
  "asset_type": "companion",
  "species": "dog",
  "rigged": true,
  "license": "CC0 or compatible",
  "district": "creator",
  "usage": ["background", "hero", "companion"]
}
```

## Licensing Guardrails

Do not assume every free asset is safe.

Required checks before adding to the repo:

1. Confirm license.
2. Confirm commercial use allowance.
3. Confirm attribution requirement.
4. Store source URL and author name in metadata.
5. Keep non-compatible assets out of public distributions.

Preferred licenses:

- CC0
- CC-BY with attribution file
- GPL-compatible code for add-ons
- Blender-native generated assets where licensing is clear

Avoid:

- unclear Sketchfab downloads
- ripped game models
- celebrity likenesses
- trademarked uniforms or brands
- asset packs marked personal use only

## Agentropolis Asset Metadata

Each generated human should carry a metadata sidecar.

```json
{
  "id": "npc_creator_001",
  "name": "Creator District NPC 001",
  "asset_type": "human",
  "source_tool": "MPFB2",
  "license": "verify before distribution",
  "rig": "Rigify",
  "lod": ["hero", "mid", "background"],
  "district": "creator",
  "tags": ["business", "casual", "crowd", "human"],
  "allowed_use": ["render", "simulation", "prototype"],
  "notes": "Generated base. Wardrobe and texture pass required."
}
```

## Repo Layout

Recommended structure:

```text
AGENTROPOLIS-CREATOR/
  README.md
  docs/
    open-source-human-crowd-stack.md
  registry/
    asset-sources.md
    crowd-presets.md
  skills/
    open-human-crowd/
      skill.md
  blender/
    geometry-nodes/
      README.md
    scripts/
      README.md
  assets/
    .gitkeep
```

Large binary files should not be committed directly unless Git LFS is configured.

## Next Build Steps

1. Add the Open Human Crowd skill.
2. Add crowd preset registry.
3. Add Blender Geometry Nodes notes.
4. Add license tracking template.
5. Add optional Git LFS policy before storing `.blend`, `.fbx`, `.glb`, or textures.

## Agentropolis Fit

This is not just an asset folder.

It is a population layer for the Intelligence Grid: humans, NPCs, operators, customers, companions, crowds, and district inhabitants that can be reused across simulations, cinematic pages, game rooms, and product demos.

The city needs bodies before it feels alive.
