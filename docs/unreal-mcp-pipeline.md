# Unreal MCP Pipeline

Unreal MCP is the real-time world execution lane for AGENTROPOLIS-CREATOR.

It lets an assigned operator control Unreal Engine through MCP while the council keeps scope, inspection, and canon stable.

## Role

Use Unreal MCP to operate Unreal Engine scenes, cameras, actors, levels, gameplay systems, and simulation state from an AI-assisted workflow.

## Placement

```text
AGENTROPOLIS-CREATOR
├── Open Human Crowd
├── Blender / GLB Pipeline
├── Higgsfield MCP Pipeline
├── Unreal MCP Pipeline
└── Simulation QA / Playtest Agents
```

## Use Cases

- create Agentropolis district environments
- place buildings, rooms, props, and scene anchors
- spawn NPCs and crowd agents
- control cameras for cinematic passes
- test navigation and interaction flows
- run simulation and playtest loops
- prepare scenes for web, cinematic, or game previews

## Chains In

- district brief
- scene layout
- character and NPC pool
- asset registry entries
- canon environment rules
- camera or sequence brief

## Chains Out

- Unreal scene changes
- actor placement notes
- camera path notes
- playtest findings
- simulation QA report
- asset gap list
- export or render plan

## Required Guardrails

- no unclear-license assets
- no celebrity likenesses
- no trademarked uniforms unless explicitly authorized
- no destructive project edits without rollback
- no uncontrolled mass generation
- no production publishing without approval

## Operator Rule

Only one Unreal MCP operator should control the Unreal project at a time.

Other agents may analyze and propose.

The assigned operator executes.

The inspector verifies.

## Output Structure

When an Unreal MCP task completes, report:

```text
Task:
Operator:
Scene or level:
Actions taken:
Assets used:
Files changed:
Metadata created:
Issues found:
Inspector checklist:
Next action:
```

## AGENTROPOLIS Canon

Unreal gives Agentropolis a live spatial body.

The council gives that body a nervous system.
