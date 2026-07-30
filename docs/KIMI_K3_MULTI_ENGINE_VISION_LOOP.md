# Kimi K3 Multi-Engine Vision Loop

## Placement

This capability belongs to **AGENTROPOLIS-CREATOR**, the Agentropolis Construction District and Foundry.

It is not owned by 789 STUDIOS. Studios, games, simulations, web applications, and other districts may consume approved outputs after the Foundry completes construction, validation, and packaging.

```text
AGENTROPOLIS-CREATOR
  -> owns world, district, structure, asset, material, and export contracts

ASBE
  -> coordinates build stages, scenes, shots, milestones, queues, and handoffs

HERMES
  -> dispatches approved agents and workflows

AGENTROPOLIS-AGENT-MCP
  -> grants bounded tool authority and records receipts

Kimi K3 or another approved vision-capable coding model
  -> acts as an operator inside those boundaries
```

## Core Thesis

The useful capability is not one-prompt text-to-3D generation.

The capability is a governed construction loop that can build an editable scene, inspect visual evidence, diagnose specific problems, apply bounded corrections, verify the result, and continue from the same project state.

```text
mandate
  -> plan
  -> blockout
  -> construct
  -> capture
  -> inspect
  -> diagnose
  -> propose bounded correction
  -> authority check
  -> checkpoint
  -> execute
  -> capture again
  -> validate
  -> approve or roll back
  -> receipt
```

## Primary Engine Roles

### Blender MCP

Blender is the source-authoring and procedural-construction lane.

Use it for:

- editable geometry and topology
- Geometry Nodes
- materials and UV preparation
- rigging and animation sources
- Python and `bpy` automation
- cameras and lighting tests
- GLB, FBX, USD, and other approved exports
- viewport and preview-render inspection

### Unreal MCP

Unreal Engine is the high-fidelity real-time world lane.

Use it for:

- level and actor assembly
- World Partition
- Nanite and Lumen workflows
- materials and shaders
- collisions, navigation, physics, and simulation
- Blueprint and approved Python/C++ automation
- Sequencer and cinematic cameras
- runtime validation and packaging
- viewport, playtest, and render evidence

### Supporting Runtime MCPs

| MCP or adapter | Role in the construction stack |
| --- | --- |
| Unity MCP | Cross-platform runtime assembly, navigation, physics, simulation, and build tests |
| Godot MCP | Open-source interactive runtime and lightweight simulation lane |
| PlayCanvas / WebXR | Browser-native 3D previews and immersive deployment |
| React Three Fiber / Three.js | Agentropolis web surfaces and spatial interfaces |
| SuperSplat / 3DGS | Gaussian-splat editing, captured spaces, and reconstruction experiments |
| OpenUSD | Shared scene-description and interchange layer |

## Generation and Reconstruction MCPs

These systems create candidates. They do not receive production authority.

| MCP or adapter | Candidate role |
| --- | --- |
| HY-World 2.0 | World generation and reconstruction candidates |
| Hunyuan3D | Text/image-to-3D asset candidates |
| TRELLIS | Image-to-3D and scene-object candidates |
| TripoSR | Fast single-image reconstruction candidates |
| InstantMesh | Mesh reconstruction candidates |
| Stable Fast 3D | Rapid object-generation candidates |
| Infinigen | Procedural Blender environments |
| Wave Function Collapse | Rule-constrained maps, rooms, tiles, and district layouts |
| MarkovJunior | Pattern-driven procedural structures and spatial grammars |

Every candidate must carry source, model, version, prompt, license, performance, destination, and approval metadata before import.

## Supporting Media and Validation MCPs

| MCP or adapter | Role |
| --- | --- |
| ComfyUI-style adapters | Rights-cleared concept, texture, reference, mask, and material-support generation |
| OpenCut-style adapters | Preview timelines, construction explainers, review packages, and approved media exports |
| Audio and voice MCPs | Spatial ambience, narration, dialogue, localization, and sound-layer drafts |
| Structural validators | Naming, hierarchy, transforms, dimensions, collisions, missing references, and export checks |
| Performance validators | Polygon, draw-call, texture, memory, shader, streaming, and runtime-budget checks |
| Visual diff validators | Before/after captures, mandate comparison, framing checks, and regression evidence |
| License and provenance validators | Rights, source, attribution, model, and asset lineage checks |

## Vision-Capable Operator

Kimi K3 is incorporated as an approved **operator candidate**, not as the owner of the system and not as unrestricted authority.

A compatible operator may:

- translate a construction mandate into Blender or engine operations
- generate visible and reviewable Python scripts
- inspect viewport screenshots and preview renders
- compare evidence against the approved mandate
- identify specific objects, materials, lights, cameras, or scripts involved in a defect
- propose a bounded correction plan
- execute approved tool calls through MCP
- continue from the current project and checkpoint state
- produce a complete receipt

The architecture must remain model-neutral. Another approved vision-capable coding model may occupy the same operator role without changing the construction contracts.

## Canonical Multi-Engine Flow

```text
human mandate
  -> AGENTROPOLIS-CREATOR construction contract
  -> ASBE stage and dependency plan
  -> HERMES dispatch
  -> AGENTROPOLIS-AGENT-MCP policy and authority check
  -> candidate generation MCPs when needed
  -> Blender MCP source construction
  -> Blender capture and visual inspection
  -> source validation
  -> approved interchange package
  -> Unreal, Unity, Godot, or web runtime MCP
  -> runtime capture, simulation, or playtest
  -> visual and structural inspection
  -> bounded repair loop
  -> final validation packet
  -> human approval
  -> asset registry and receipt
  -> approved deployment target
```

## Engine Assignment Rules

```text
Blender
  = source geometry, procedural systems, reusable assets, rigging, cleanup, and editable master scenes

Unreal Engine
  = high-fidelity world assembly, simulation, cinematic lighting, gameplay, and packaged real-time builds

Unity
  = cross-platform interactive applications and simulation targets

Godot
  = open-source and lightweight runtime targets

Three.js / React Three Fiber / PlayCanvas
  = browser-native Agentropolis interfaces and previews

SuperSplat / 3DGS
  = captured spaces and Gaussian-splat environments

OpenUSD
  = shared scene-description and interchange contract
```

ASBE may choose or sequence engines, but it may not bypass Creator package approval or MCP authority.

## Inspection Contract

Before a model changes a scene, it must produce an inspection record:

```yaml
inspection_id: inspect-014
engine: blender | unreal | unity | godot | web
project: approved-project-id
scene_or_level: approved-scene-id
checkpoint: checkpoint-013
evidence:
  - previews/inspect-014-angle-a.png
  - previews/inspect-014-angle-b.png
observed:
  - specific visible or structural problem
mandate_conflict:
  - requirement that is not currently satisfied
proposed_actions:
  - object: Building_C17
    action: correct_scale
    risk: medium
protected_scope:
  - approved district geometry
requires_approval: true
```

The diagnosis must name the affected scope. Vague instructions such as "make it cinematic" do not grant broad mutation authority.

## Execution Boundaries

- Save a checkpoint before medium-risk or high-risk operations.
- Keep generated assets inside isolated candidate collections or approved write roots.
- Do not delete, rename, move, or consolidate production assets without explicit approval.
- Do not approve every MCP tool globally.
- Serialize editor writes. One assigned operator controls a project at a time.
- Other agents may inspect, critique, validate, and propose.
- Preserve generated scripts for review and reuse.
- Require reversible diffs for production-world changes.
- Block public publishing until human approval.
- Record model, adapter, tool calls, files, assets, captures, validation, and rollback path.

## Construction Receipt

```json
{
  "receipt_id": "build-receipt-014",
  "operator_model": "approved-vision-coding-operator",
  "orchestrator": "ASBE",
  "authority_layer": "AGENTROPOLIS-AGENT-MCP",
  "project": "agentropolis-city-v01",
  "engine": "blender",
  "checkpoint_before": "scene-013",
  "checkpoint_after": "scene-014",
  "objects_created": [],
  "objects_modified": ["Building_C17", "MI_Corridor_Cyan"],
  "objects_deleted": [],
  "scripts_executed": ["correct_scale_and_emission.py"],
  "evidence": ["preview-014.png"],
  "validation": ["structure-pass", "visual-review-required"],
  "approval_state": "REVIEW_REQUIRED",
  "rollback": "scene-013"
}
```

## Canon Lock

```text
AGENTROPOLIS-CREATOR is the Foundry.
ASBE coordinates the build.
HERMES dispatches the work.
AGENTROPOLIS-AGENT-MCP grants bounded capability.
Blender creates and repairs source assets.
Unreal and other runtimes activate approved worlds.
Vision-capable operators close the correction loop.
Humans retain taste, approval, and consequential authority.
```
