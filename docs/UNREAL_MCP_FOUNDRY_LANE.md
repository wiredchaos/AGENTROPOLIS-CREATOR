# Unreal MCP Foundry Lane

## Role

`AGENTROPOLIS-CREATOR` owns the creative production contract for Unreal worlds, levels, characters, crowds, props, materials, lighting, cameras, sequences and approved game-ready packages.

It does not directly grant editor authority. Every Unreal execution request routes through HERMES Dispatch and `AGENTROPOLIS-AGENT-MCP`.

Canonical city contract:

`wiredchaos/agentropolis/docs/UNREAL_MCP_CITY_INTEGRATION.md`

## Foundry flow

```text
creator intent
  -> Creator Prompt Contract
  -> rights and reference locks
  -> world / scene specification
  -> ASBE scene and shot plan when cinematic
  -> HERMES Dispatch
  -> AGENTROPOLIS-AGENT-MCP authority check
  -> local Unreal MCP execution
  -> world diff + media diff
  -> human review
  -> approved package reference
```

## Production packet

Before any editor mutation, Creator must compile a production packet containing:

```json
{
  "package_id": "uuid",
  "project": "approved-project-id",
  "map": "/Game/Maps/ApprovedMap",
  "deliverable": "level | asset-pack | character | cinematic | render | playable-prototype",
  "brief": {
    "subject": "",
    "style": "",
    "mood": "",
    "time_of_day": "",
    "camera_intent": "",
    "output": ""
  },
  "reference_locks": [],
  "rights_records": [],
  "asset_roots": [],
  "write_roots": [],
  "scene_order": [],
  "validation_plan": [],
  "approval_state": "DRAFT_ONLY | REVIEW_REQUIRED | APPROVED"
}
```

Missing identity, rights, project, map, output or approval data must be surfaced. Creator may propose labeled defaults for low-risk visual choices, but may not invent authority or rights.

## Build order

The default scene-craft sequence is:

```text
level shell
  -> major blocking
  -> lighting and atmosphere
  -> materials
  -> set dressing
  -> characters / crowds
  -> camera
  -> Sequencer
  -> capture / render
  -> validation
```

Each milestone must produce a structural check and, when visual state changes, a screenshot or render for review.

## Asset rights states

Every external reference or asset must carry one of these states:

```text
OWNED
LICENSED
PERMISSION_GRANTED
PUBLIC_DOMAIN
REFERENCE_ONLY
UNVERIFIED
PROHIBITED
```

`UNVERIFIED` and `PROHIBITED` inputs cannot enter production exports. Compatibility with a third-party collection never implies partnership or ownership.

## Tool boundary

Use Unreal MCP for live editor work such as:

- scene inspection
- actor placement and transforms
- Blueprint authoring
- material instances
- lighting and atmosphere
- camera framing
- Sequencer animation
- screenshots and renders
- PIE and automation tests
- approved asset import

Use Blender or another approved DCC lane for mesh modeling, sculpting and geometry generation, then import the approved result into Unreal.

Use ordinary code tooling for Unreal C++ source changes. Unreal MCP is the live-editor lane, not the source-code authority.

## World-diff packet

Every modifying run returns:

- packages changed
- actors created, removed or modified
- transforms and properties changed
- Blueprint compile results
- materials and lighting changed
- sequence and camera changes
- before-and-after captures
- warnings and failed checks
- save status
- export status when applicable
- rights record references
- execution receipt reference

## Consumer handoffs

### Gaming District

Creator may deliver approved levels, NPCs, avatars, cinematics, props, environments and game-ready packages. It does not own authoritative player identity, inventory, rewards, balances, missions or settlement.

### Social System

Creator may deliver approved virtual rooms, avatars, performance environments, captures and social media packages. Public social requests cannot directly mutate production projects.

### GTM

Creator may deliver approved trailers, stills, product demonstrations and campaign media. Creation approval and distribution approval remain separate.

### ASBE

ASBE coordinates studio, scene, shot, sequence and PBX workflow. Creator remains the Foundry that defines and packages approved assets and worlds.

## Initial implementation

1. Register a read-only Unreal inspection lane.
2. Create a dedicated isolated test project.
3. Define approved `/Game/Agentropolis/...` asset and write roots.
4. Test a small environment build with milestone screenshots.
5. Produce a world-diff packet and receipt.
6. Require human approval before promotion into any district application.

## Installation reference

```bash
hermes skills install official/creative/unreal-mcp
hermes mcp install unreal-engine
```

The editor-side Unreal MCP and AllToolsets plugins must be enabled. The editor and server must start before the Hermes session. Installation does not grant write, render, export or publishing authority.

## Canon lock

```text
Creator defines the world.
ASBE coordinates production.
MCP gates the tools.
Hermes routes the work.
Agentropolis owns authority.
```
