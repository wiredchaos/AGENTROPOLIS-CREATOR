# Blender Geometry Nodes Crowd System

This folder documents the open source crowd generator path for Agentropolis Creator.

Humaniq provides a built-in crowd generator. Agentropolis Creator should use Blender Geometry Nodes as the open source foundation.

## Core Node System Goals

The first Geometry Nodes crowd system should support:

- scatter NPCs onto surfaces
- follow curves for walking paths
- avoid exclusion zones
- randomize scale and rotation
- randomize outfit/material variants
- offset idle and walk animations
- switch LOD by distance
- load district-specific NPC pools

## Recommended Node Groups

```text
AT_Crowd_SurfaceScatter
AT_Crowd_CurvePath
AT_Crowd_ExclusionZones
AT_Crowd_RandomizeVariants
AT_Crowd_LODSelector
AT_Crowd_AnimationOffset
```

## Surface Scatter Inputs

| Input | Type | Purpose |
| --- | --- | --- |
| Density | Float | Controls number of spawned instances. |
| Seed | Integer | Randomization seed. |
| Asset Pool | Collection | NPC or companion source collection. |
| Scale Min | Float | Minimum random scale. |
| Scale Max | Float | Maximum random scale. |
| Align to Surface | Boolean | Aligns characters to surface normals. |
| Exclusion Geometry | Geometry | Blocks spawn areas. |
| District Tag | String | Metadata routing for preset selection. |

## Curve Path Inputs

| Input | Type | Purpose |
| --- | --- | --- |
| Path Curve | Curve | Route crowd follows. |
| Spacing | Float | Distance between characters. |
| Lane Width | Float | Random side offset from curve. |
| Direction | Enum | Forward, reverse, or mixed. |
| Animation Offset | Float | Randomizes walk cycle timing. |
| Pause Zones | Geometry | Areas where characters may idle. |

## Collections

Suggested Blender collection structure:

```text
AT_ASSETS
  humans
    hero
    npc
    lod_mid
    lod_far
  companions
  motions
  materials
AT_CROWDS
  creator_lobby
  command_atrium
  marketplace
  city_crosswalk
```

## Export Notes

For cinematic Blender renders, keep linked collections and instancing.

For web export, test GLB performance early. Crowds can become heavy fast.

Recommended web strategy:

```text
foreground = animated hero characters
midground = simplified NPCs
background = billboards or baked crowd cards
```

## Anti-Moloch Rule

Do not build a system that looks impressive but cannot be controlled.

Every crowd setup needs visible parameters, clear presets, and a license-safe asset pool.
