# Procedural World Forge

The **Procedural World Forge** adds generative structure to AGENTROPOLIS-CREATOR.

The goal is not random generation.

The goal is reusable, governed, district-aware generation that can create consistent rooms, crowds, streets, interiors, simulation spaces, and creator environments.

## Why Procedural Generation Matters

AI world models can generate impressive outputs, but Agentropolis needs repeatable structure.

Procedural systems provide:

- constraints
- repeatability
- variation
- controllable style
- efficient asset reuse
- district-level consistency
- predictable export pipelines

AI generates intent.

Procedural systems enforce structure.

## Procedural Stack

| Tool / Method | Role |
| --- | --- |
| Blender Geometry Nodes | crowd placement, scatter systems, city props, repeated architecture |
| Infinigen | procedural natural worlds and Blender-based environment generation |
| Wave Function Collapse | tile layouts, floor plans, maps, room grammar |
| MarkovJunior | voxel, cellular, and rule-driven generative systems |
| Custom Python | deterministic build scripts and metadata generation |
| OpenUSD / GLB export planning | runtime handoff and portability |

## Generation Modes

### 1. Room Forge

Creates reusable Swarm Rooms, labs, studios, lobbies, and command centers.

Inputs:

```json
{
  "room_type": "mission_control",
  "district": "creator",
  "style": ["obsidian", "cyan", "red"],
  "density": "medium",
  "agents": ["Hermes", "NemoClaw", "Nemotron"],
  "export_targets": ["blender", "webxr", "unreal"]
}
```

Outputs:

```text
/scenes/mission-control/mission-control.blend
/scenes/mission-control/mission-control.json
/scenes/mission-control/export/mission-control.glb
```

### 2. District Forge

Creates modular districts from layout grammar and reusable asset packs.

District examples:

- Creator District
- Mission Control
- NEURO District
- CHAOS RANK District
- 789 Studios
- NTRU District

Rules:

- every district needs a palette
- every district needs population rules
- every district needs navigation constraints
- every district needs metadata
- every district needs export targets

### 3. Crowd Forge

Connects the open human crowd stack to procedural placement.

Controls:

- density
- path curves
- standing zones
- activity zones
- distance LOD
- wardrobe palette
- animation offset
- district role tags

### 4. Asset Variation Forge

Creates controlled variation without losing canon.

Controls:

- material palette
- outfit class
- body type variation
- prop variation
- asset rarity
- LOD tiers
- metadata sidecars

### 5. Simulation Forge

Builds test environments for agent behavior.

Examples:

- traffic flow
- lobby movement
- creator marketplace foot traffic
- robot navigation sandbox
- NPC social density tests
- event crowd simulation

## World Diff Preview

Every procedural generation run should produce a preview package before execution.

Required fields:

```json
{
  "run_id": "forge_0001",
  "requested_by": "agent_or_user",
  "district": "creator",
  "tools": ["blender", "geometry_nodes"],
  "estimated_cost": "local_or_low",
  "files_to_create": [],
  "files_to_modify": [],
  "assets_required": [],
  "license_risks": [],
  "approval_required": true
}
```

## Stop Conditions

Procedural generation must not loop forever.

Every run needs:

- max tool calls
- max generation attempts
- max file size
- max runtime
- style constraints
- license constraints
- human approval trigger

## First Prototype

Build a Blender-first prototype:

```text
Mission Control Room
-> Geometry Nodes scatter preset
-> 12 NPC operators
-> 3 agent terminals
-> central command table
-> metadata sidecars
-> GLB export
```

## Anti-Moloch Rule

Procedural systems should reduce chaos, not generate more of it.

Every generated world must be inspectable, reversible, and governed.
