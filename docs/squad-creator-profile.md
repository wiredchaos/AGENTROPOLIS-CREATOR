# Squad Creator Profile

This is the Creator District profile for using Squad with AGENTROPOLIS-CREATOR.

The main council rules live in `wiredchaos/agentropolis`.

This repo only defines Creator-specific workers, tasks, and inspection rules for 3D production.

## Creator Role

AGENTROPOLIS-CREATOR owns:

- 3D scene production
- open human and NPC crowd workflows
- Blender / GLB exports
- Unreal MCP world execution
- Higgsfield MCP media generation
- asset metadata and license sidecars

## Recommended Squad Layout

```text
manager              = Creator production PM
worker-unreal        = Unreal MCP operator
worker-higgsfield    = image/video generation operator
worker-blender       = Blender / GLB asset operator
worker-registry      = metadata and registry updater
inspector            = license, canon, export, and drift QA
```

## One Executor Rule

Only one worker touches a mutable production surface at a time.

Examples:

- one worker edits the Unreal project
- one worker modifies Blender files
- one worker commits registry updates
- one worker runs media generation batches

The inspector checks output before the next stage begins.

## Creator Task Template

```text
Task:
Asset or scene target:
Assigned worker:
Input files:
Output format:
Metadata path:
License requirements:
Blocked actions:
Inspector checklist:
```

## Default Workflow

```text
1. Manager receives scene or asset goal
2. Manager breaks goal into bounded tasks
3. Worker creates or modifies asset
4. Worker reports output path and summary
5. Inspector checks license, canon, metadata, and export target
6. Manager assigns next stage
```

## Creator Canon

This repo builds the hands of Agentropolis.

The main Agentropolis repo owns the city law.
