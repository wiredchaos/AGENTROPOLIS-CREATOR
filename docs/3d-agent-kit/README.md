# AGENTROPOLIS 3D Agent Kit
## Procedural World Forge

The AGENTROPOLIS 3D Agent Kit is the Creator District rail for generating, validating, and exporting agent-built 3D worlds.

It treats procedural generation as first-class infrastructure, not decoration.

```text
Prompt / Image / Video
  -> Planner Agent
  -> Procedural Generator Router
  -> Blender / Unity / Unreal / PlayCanvas MCP
  -> World Diff Preview
  -> Verifier Agent
  -> Human Approval Gate
  -> Export: GLB / USD / FBX / 3DGS / WebXR
```

---

## Canonical role

The 3D Agent Kit is an application layer that consumes the AGENTROPOLIS Intelligence Grid.

It is not the sovereign brain. It is not the memory authority. It is not the governance layer.

It belongs here:

```text
AGENTROPOLIS
└── Intelligence Grid
    └── Creator District
        └── 3D Agent Kit / Procedural World Forge
            ├── WorldForge Agent
            ├── DistrictBuilder Agent
            ├── AssetSmith Agent
            ├── Quest/NPC Agent
            ├── Lighting Agent
            ├── Physics/NavMesh Agent
            ├── Verifier Agent
            └── Export Agent
```

---

## Open-source stack map

| Layer | Repo / Tool | Use |
|---|---|---|
| Blender MCP | `ahujasid/blender-mcp` | Agent-controlled Blender scene creation and manipulation |
| Advanced Blender MCP | `RFingAdam/mcp-blender` | Larger Blender tool surface, render/analyze/refine loops |
| Official Blender MCP | Blender Lab MCP Server | Lightweight MCP access to Blender Python API |
| Unity MCP | `AnkleBreaker-Studio/unity-mcp-server` | Unity tools for scenes, GameObjects, builds, terrain, NavMesh, profiling |
| Unity MCP alt | Coplay Unity MCP | Asset, scene, script, and test workflow control |
| Unreal + Blender MCP | `tahooki/unreal-blender-mcp` | Unified Blender/Unreal AI control plane |
| GameDev MCP Hub | `dmae97/gamedev-all-in-one-mcp` | One MCP for Roblox, Unity, Unreal, Blender |
| Procedural Worlds | `princeton-vl/infinigen` | Blender-based procedural 3D worlds, BSD |
| WFC Generation | `mxgmn/WaveFunctionCollapse` | Tile/map constraint generation |
| Markov Procedural | `mxgmn/MarkovJunior` | Probabilistic procedural, voxel, and cellular generation |
| 3D Spaceships | `a1studmuffin/SpaceshipGenerator` | Blender procedural spaceship generation |
| Web 3D Runtime | `playcanvas/engine` | WebGL/WebGPU/WebXR/glTF/3DGS runtime |
| 3DGS Editor | `playcanvas/supersplat` | Browser Gaussian Splat editing |
| 3DGS Research Stack | `nerfstudio-project/gsplat` | PyTorch Gaussian Splatting library |

All external repositories must be vetted by MCP RANGER before being promoted from sensor/discovery status into approved execution status.

---

## Agent roles

### WorldForge Agent
Generates terrain, world layout, biomes, procedural districts, and macro-world rules.

### DistrictBuilder Agent
Creates AGENTROPOLIS-style buildings, districts, civic spaces, commerce zones, and mission rooms.

### AssetSmith Agent
Produces props, modular assets, kits, scene elements, and style-consistent objects.

### Quest/NPC Agent
Defines NPC behavior, dialogue stubs, quest logic, environmental clues, and interaction loops.

### Lighting Agent
Controls cinematic lighting, mood, render presets, day/night states, and district-specific atmosphere.

### Physics/NavMesh Agent
Validates traversal, collisions, NavMesh, object scale, player movement, and runtime constraints.

### Verifier Agent
Checks geometry, naming, scene hierarchy, policy compliance, asset rights, and world mutation risk.

### Export Agent
Packages approved worlds into GLB, USD, FBX, 3DGS, WebXR, or engine-specific formats.

---

## First build target

Start with the stable spine:

```text
Hermes-integrated RELAY
+ Blender MCP
+ Infinigen
+ WaveFunctionCollapse
+ Unity MCP
+ PlayCanvas / SuperSplat
```

Add Unreal after the Blender/Unity pipeline is stable.

---

## World mutation doctrine

```text
Generate -> Preview -> Verify -> Approve -> Export -> Deploy
```

Rules:

- No world mutation without diff preview.
- No public deployment without human approval.
- No engine MCP receives unrestricted authority.
- No unknown procedural repo enters execution lane without MCP RANGER vetting.
- Verifier Agent must run before export.
- ARCHITECT/Council Approval Gate controls public world release.

---

## Output formats

Supported export targets:

- GLB / glTF
- USD / USDZ
- FBX
- Blender scene files
- Unity scenes / prefabs
- WebXR runtime scenes
- Gaussian Splat / 3DGS artifacts
- PlayCanvas-compatible assets

---

## System line

```text
Agents generate worlds. Procedural systems enforce structure. Verifiers prevent chaos. Humans approve world mutations before deployment.
```
