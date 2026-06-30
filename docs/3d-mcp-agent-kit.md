# AGENTROPOLIS 3D MCP Agent Kit

This document defines the first architecture pass for a 3D MCP Agent Kit inside **AGENTROPOLIS-CREATOR**.

The purpose is to make Agentropolis Creator more than an asset folder. It becomes a controlled production layer where agents can generate, edit, test, and export 3D scenes through Model Context Protocol compatible tool adapters.

## Core Thesis

Game engines, 3D tools, world models, audio models, and procedural generators are becoming agent-operable systems.

The durable moat is not one model.

The durable moat is the orchestration layer that decides:

- what gets generated
- which tool performs the work
- what costs are allowed
- what gets verified
- what reaches a human approval gate
- what becomes reusable city infrastructure

## Stack Position

```text
AGENTROPOLIS
  Intelligence Grid
  Mission Control
  Creator District
    AGENTROPOLIS-CREATOR
      3D MCP Agent Kit
      Procedural World Forge
      Human + Crowd Stack
      Asset Registry
      Governance + Audit Layer
```

## Reference Flow

```text
Prompt / Image / Video / Session Memory
-> Hermes / Planner Agent
-> NemoClaw Builder Agent
-> MCP Router
-> Tool Adapter
   -> Blender MCP
   -> Unity MCP
   -> Unreal MCP
   -> PlayCanvas / WebXR
   -> SuperSplat / 3DGS
   -> Infinigen / WFC / MarkovJunior
   -> Seed Audio / Voice Layer
-> World Diff Preview
-> Verifier Agent
-> Human Approval Gate
-> Export / Deploy
-> Memory Writeback
```

## First-Class Agents

### WorldForge Agent
Creates or modifies the base world structure: terrain, rooms, districts, streets, interiors, landmarks, portals, and staging areas.

### DistrictBuilder Agent
Turns abstract Agentropolis districts into consistent physical spaces.

Examples:

- Mission Control
- NEURO District
- Creator District
- CHAOS RANK District
- 789 Studios
- NTRU District

### AssetSmith Agent
Creates, imports, tags, and prepares reusable assets.

Duties:

- asset discovery
- license check
- metadata sidecar creation
- LOD planning
- material variation
- export prep

### CrowdLayer Agent
Connects the existing open human crowd stack to scene generation.

Duties:

- NPC pool selection
- crowd density selection
- placement rules
- movement path planning
- background population layers

### Procedure Agent
Owns procedural generation systems.

Duties:

- tile grammars
- Wave Function Collapse constraints
- Markov rules
- Geometry Nodes parameter control
- terrain and room variation

### AudioForge Agent
Creates voice and sound layers for generated worlds.

Duties:

- narration
- NPC dialogue
- multilingual dubbing
- ambience notes
- caption generation
- voice safety guardrails

### Verifier Agent
Checks outputs before any world mutation becomes permanent.

Duties:

- tool output validation
- license verification
- file size checks
- naming checks
- policy checks
- export format checks
- human approval packet generation

## Tool Adapter Targets

| Layer | Tool Family | Role |
| --- | --- | --- |
| 3D authoring | Blender MCP | Scene creation, assets, materials, Geometry Nodes |
| Game runtime | Unity MCP | Scene assembly, NavMesh, gameplay prototyping |
| Cinematic runtime | Unreal MCP | high-fidelity city, district, and simulation spaces |
| Web runtime | PlayCanvas / WebXR | browser-based deployment and previews |
| 3DGS | SuperSplat / gsplat | splat editing, reconstruction, experimental scenes |
| Procedural generation | Infinigen | Blender-based procedural environments |
| Constraint generation | WFC / MarkovJunior | maps, tiles, room layouts, district grammars |
| Audio | Seed Audio style MCP layer | narration, dubbing, NPC voice, localization |

## Anti-Moloch Execution Gate

No agent should directly mutate production worlds.

Required gate:

```text
Agent Proposal
-> Policy Check
-> Cost Check
-> License Check
-> Safety Check
-> World Diff Preview
-> Human / Governance Approval
-> MCP Execution
-> Audit Log
-> Memory Writeback
```

## Hard Rules

- No direct autonomous production deploys.
- No unclear-license assets.
- No celebrity likeness generation without rights.
- No ripped game models.
- No unbounded recursive generation loops.
- No tool call without cost and purpose metadata.
- No world mutation without a reversible diff.
- No memory writeback without receipts.

## Initial Build Path

1. Add documentation for the 3D MCP Agent Kit.
2. Add procedural generation registry.
3. Add MCP adapter registry.
4. Add governance checklist for world mutation.
5. Add example scene specification for Mission Control.
6. Add Blender-first prototype before engine expansion.

## Strategic Position

AGENTROPOLIS-CREATOR should become the place where agents learn to build safe, reusable, governed 3D infrastructure.

The city does not just need assets.

The city needs a controlled world-generation factory.
