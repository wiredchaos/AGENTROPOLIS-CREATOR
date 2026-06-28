# Crowd Preset Registry

Crowd presets define reusable population logic for Agentropolis Creator scenes.

These presets are designed for Blender Geometry Nodes first. They can later export to cinematic renders, GLB scenes, R3F prototypes, Claw3D-style environments, or Hyperfy rooms.

## Preset Format

```json
{
  "preset_id": "creator_lobby_crowd",
  "display_name": "Creator Lobby Crowd",
  "district": "creator",
  "placement": "surface_scatter",
  "density": "medium",
  "motion": "idle_shift",
  "collision_radius": 0.45,
  "random_scale_range": [0.94, 1.06],
  "animation_offset": true,
  "asset_pool": "npc_creator_pool",
  "notes": "General lobby traffic for onboarding and demo scenes."
}
```

## Starter Presets

### creator_lobby_crowd

- District: Creator
- Placement: surface scatter
- Density: medium
- Motion: idle, talking, phone-check, walking loop
- Use: product lobby, onboarding floor, agent studio entry

### command_atrium_operators

- District: Command Atrium
- Placement: workstation clusters
- Density: low to medium
- Motion: seated, typing, monitoring, standing briefings
- Use: cinematic command center, skill registry UI, intelligence grid scenes

### marketplace_foot_traffic

- District: Marketplace
- Placement: curve paths plus surface zones
- Density: medium to high
- Motion: walk loops with randomized pause zones
- Use: creator marketplace, digital bazaar, storefront demos

### conference_floor

- District: Creator
- Placement: booths, aisles, and crowd clusters
- Density: high
- Motion: walking, talking, looking at booths, scanning displays
- Use: launch events, expo scenes, demo reels

### asylum_yard_background

- District: Sol Asylum / lore surface
- Placement: yard clusters and pathing
- Density: low to medium
- Motion: pacing, idle, guarded movement
- Use: cinematic lore scenes only. Keep separated from business-only surfaces.

### city_crosswalk

- District: City / simulation
- Placement: curve paths crossing traffic lanes
- Density: medium
- Motion: walk cycles, wait zones, randomized crossing timing
- Use: city-scale shots, exterior scenes, Agentropolis street layer

## Geometry Nodes Requirements

Each preset should expose controls for:

- density
- seed
- asset pool
- scale range
- rotation randomization
- animation offset
- exclusion zones
- path influence
- distance-based LOD

## Performance Notes

Use instancing for background crowds.

Use simplified meshes for mid and far distance.

Use hero rigs only for foreground characters.

Bake motion or simplify animation where possible before exporting to web targets.
