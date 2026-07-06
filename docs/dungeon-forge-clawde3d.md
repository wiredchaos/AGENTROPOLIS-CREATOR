# Dungeon Forge x Claw3D Creator Lane

## Core Lock

Agentropolis Creator is 3D-first.

Claw3D is the spatial agent and scene interface. Dungeon Forge is the deterministic procedural layout brain.

## Creator Rule

Do not create dashboard-first experiences as the main output. The primary output should be a navigable 3D place.

2D UI is allowed only as in-world terminals, HUD overlays, wall panels, desk screens, command consoles, or fallback admin views.

## Creator Outputs

The creator lane should produce:

- seeded procedural layout
- semantic room map
- 3D environment brief
- Claw3D scene spec
- cinematic prompt pack
- asset list
- gameplay hooks
- NPC and quest hooks
- BoardForge or Hermes City export notes

## Prompt Direction

```txt
3D hyper-realistic Agentropolis district, cinematic open-world environment, Claw3D spatial interface, believable rooms and props, volumetric fog, realistic lighting, no pixel art, no voxel default, no flat dashboard-first UI
```

## Pipeline

```txt
seed/layout -> semantic room map -> 3D environment brief -> Claw3D scene spec -> BoardForge/Hermes City export
```

## Final Lock

Dungeon Forge generates the playable skeleton. Claw3D makes it spatial, visible, and alive.
