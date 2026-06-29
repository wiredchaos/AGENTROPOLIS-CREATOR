# Creator Squad Workers

This registry defines the Creator District worker roles for Squad-driven production.

## Worker Roles

| Worker | Role | Primary Outputs |
| --- | --- | --- |
| worker-unreal | Operates Unreal MCP for real-time world scenes | scene changes, actor placement, camera notes, QA findings |
| worker-higgsfield | Operates Higgsfield MCP for characters, images, and videos | character IDs, media outputs, status links, prompt metadata |
| worker-blender | Operates Blender and GLB production workflows | `.blend`, `.glb`, `.fbx`, LOD notes, export reports |
| worker-registry | Updates asset registries and metadata | sidecars, source records, license notes, catalog entries |
| inspector | Checks canon, license, metadata, and drift | approval, block, or revision request |

## Execution Lock

Only one worker may touch the same mutable surface at a time.

```text
Unreal project  -> one active Unreal operator
Blender file    -> one active Blender operator
Registry file   -> one active registry operator
Media batch     -> one active media operator
```

## Inspector Checklist

```text
Canon stable:
License verified:
Metadata sidecar present:
Output path recorded:
Export target defined:
No unclear assets:
No unauthorized likeness:
No destructive change without rollback:
```

## Handoff Pattern

```text
manager -> worker
worker -> inspector
inspector -> manager
manager -> next worker
```

## Rule

Creator builds assets, scenes, and simulations.

The main Agentropolis repo governs cross-district coordination.
