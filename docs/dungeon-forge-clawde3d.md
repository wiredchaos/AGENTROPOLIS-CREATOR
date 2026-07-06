# Dungeon Forge x Clawde3D Creator Lane

## Purpose

This note locks the creator-facing version of the Dungeon Forge x Clawde3D lane.

Dungeon Forge is the deterministic procedural generation brain. Clawde3D is the hyper-realistic 3D cinematic body. Together they support Agentropolis creator workflows for generated game spaces, cinematic environments, raid maps, and explorable districts.

## Creator Rule

Do not present this as pixel art.

The Agentropolis creator output should feel closer to:

- GTA-style underground districts
- cinematic 3D dungeon raids
- hyper-realistic game environments
- open-world interior spaces
- practical level design with believable rooms, props, lights, liquids, fog, and debris

## Input Contract

Creators should be able to define:

- seed
- theme
- room count
- loopiness
- decor density
- difficulty ramp
- boss/treasure/shrine placement rules
- camera mode
- visual realism target
- district or collection theme

## Output Contract

The creator lane should produce:

- seeded procedural layout
- semantic room map
- 3D environment brief
- cinematic prompt pack
- asset list
- gameplay hooks
- NPC/quest hooks
- BoardForge integration notes

## Prompt Direction

Use this pattern for generated scenes:

```txt
3D hyper-realistic cinematic dungeon district, GTA-style environmental detail, realistic stone and metal surfaces, volumetric fog, wet reflective floors, believable props, cinematic lighting, no pixel art, no voxel style, no low-poly styling
```

## Integration Placement

```txt
AGENTROPOLIS-CREATOR
  -> world prompt pack
  -> cinematic scene generator
  -> BoardForge map brief
  -> Clawde3D environment spec
  -> Agentropolis world forge export
```

## Final Lock

Dungeon Forge generates the playable skeleton. Clawde3D makes it feel alive.
