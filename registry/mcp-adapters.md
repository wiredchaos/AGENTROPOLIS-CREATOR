# MCP Adapter Registry

This registry tracks the open-source and MCP-compatible tool adapters AGENTROPOLIS-CREATOR should evaluate for 3D, procedural generation, world editing, video rendering, and media layers.

## Adapter Classes

| Class | Purpose |
| --- | --- |
| 3D Authoring | create and modify assets, scenes, materials, lights, cameras |
| Game Engine | assemble runtime scenes, gameplay objects, navigation, physics |
| Web Runtime | preview and deploy browser-based 3D spaces |
| Procedural Generation | create constrained reusable worlds and variations |
| Reconstruction / 3DGS | convert images/video/scans into editable/explorable scenes |
| Audio / Voice | narration, dialogue, localization, dubbing |
| Video Rendering / Timeline | assemble scenes, captions, voice, B-roll, music, and exports into publishable media |
| Verification | inspect outputs, metadata, licenses, performance, and risks |

## Initial Targets

| Adapter | Status | Notes |
| --- | --- | --- |
| Blender MCP | evaluate | Blender-first path for scene creation, scripts, Geometry Nodes, materials, and export. |
| Unity MCP | evaluate | Useful for game/runtime assembly, NavMesh, testing, and build/export flows. |
| Unreal MCP | watch/evaluate | Important for high-fidelity Agentropolis spaces. Treat current ecosystem as emerging until official support is confirmed. |
| PlayCanvas / WebXR | evaluate | Browser preview layer for lightweight 3D scenes and creator-facing experiences. |
| SuperSplat / 3DGS tools | evaluate | Useful for Gaussian splat editing and reconstruction experiments. |
| Infinigen | evaluate | Procedural Blender environment generation. Strong fit for terrain and natural scenes. |
| Wave Function Collapse | evaluate | Constraint-based maps, tiles, layouts, and room generation. |
| MarkovJunior | evaluate | Rule-based voxel/cellular/procedural generation. |
| HY-World style world model | research | Use as world genesis and reconstruction layer, not production engine replacement. |
| Seed Audio style MCP | research | Voice, narration, dubbing, NPC dialogue, localization. |
| OpenCut | watch/evaluate | Open-source video editor target for timeline automation, AI-agent MCP control, headless rendering, and batch export once rewrite capabilities are production-ready. |

## Adapter Metadata Template

```json
{
  "id": "blender_mcp",
  "name": "Blender MCP",
  "class": "3D Authoring",
  "repo_url": "",
  "license": "verify",
  "status": "evaluate",
  "local_required": true,
  "gpu_required": false,
  "risk_level": "medium",
  "allowed_actions": ["create_scene", "modify_material", "export_glb"],
  "blocked_actions": ["unapproved_production_deploy"],
  "notes": "Run through approval gate before permanent world mutation."
}
```

## OpenCut Adapter Draft

```json
{
  "id": "opencut_video_adapter",
  "name": "OpenCut Video Adapter",
  "class": "Video Rendering / Timeline",
  "repo_url": "https://github.com/OpenCut-app/OpenCut",
  "license": "MIT",
  "status": "watch/evaluate",
  "local_required": true,
  "gpu_required": false,
  "risk_level": "medium",
  "allowed_actions": [
    "create_timeline_spec",
    "assemble_media_draft",
    "generate_caption_track",
    "render_preview",
    "export_review_package"
  ],
  "blocked_actions": [
    "unapproved_public_publish",
    "unapproved_likeness_export",
    "unlicensed_media_import",
    "unbounded_batch_render"
  ],
  "notes": "Use for governed media-diff previews before any public Agentropolis broadcast or short-form export."
}
```

## Required Adapter Questions

Before adopting an adapter, answer:

1. What license governs the repo?
2. Does it require paid APIs?
3. Does it run locally?
4. Does it support dry runs or previews?
5. Can actions be permission-scoped?
6. Can it export open formats?
7. Can it log every action?
8. Can it be blocked from destructive operations?
9. Can outputs be reversed?
10. Does it create licensing or likeness risk?
11. For video adapters, can source assets, captions, music, voice, and export settings be tracked as separate provenance records?
12. For video adapters, can renders be previewed before public publishing?

## MCP Tool Risk Levels

### Low Risk

- read scene
- list objects
- inspect metadata
- generate preview
- export report
- create timeline draft spec
- inspect caption track

### Medium Risk

- create object
- modify material
- generate NPC pool
- add lights
- export test GLB
- assemble media draft
- render preview video
- export review package

### High Risk

- delete objects
- overwrite files
- alter production scene
- import external assets
- publish build
- publish rendered media
- run unbounded procedural generation
- run unbounded batch rendering

## Approval Rule

Any medium-risk or high-risk adapter action must produce a world diff or media diff preview before execution.

No production world mutation without approval.

No public rendered-media publish without approval.