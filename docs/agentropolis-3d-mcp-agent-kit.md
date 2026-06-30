# Agentropolis 3D MCP Agent Kit

## Purpose

The Agentropolis 3D MCP Agent Kit is the governed toolchain for turning prompts, references, scans, procedural rules, and agent instructions into reusable city infrastructure.

It is not a pile of plugins.

It is the Construction District control plane for:

- world generation
- 3D reconstruction
- procedural environments
- character and NPC production
- scene assembly
- browser previews
- simulation tests
- video rendering
- provenance tracking
- approval gates

```text
Idea / prompt / reference / scan
-> WorldForge intake
-> adapter-specific candidate output
-> metadata sidecar
-> verifier review
-> world diff or media diff
-> approved import
-> Agentropolis city surface
```

## Core Agents

| Agent | Role | Primary Outputs |
| --- | --- | --- |
| WorldForge | Turns prompts, references, scans, and procedural rules into candidate worlds | world candidate packet, scene spec, import checklist |
| DistrictBuilder | Converts approved candidates into district-level scenes | district map, scene layout, GLB/USD import plan |
| AssetSmith | Produces props, materials, wardrobe, companion assets, and reusable kits | asset sidecar, asset pack, license notes |
| CrowdForge | Builds NPC and crowd pools | NPC pool, scatter preset, motion notes |
| AudioForge | Builds ambience, voice, radio, music-bed, and spatial audio layers | audio manifest, timeline notes |
| MediaForge | Converts scenes into clips, explainers, shorts, and broadcast assets | timeline spec, render package |
| Verifier | Blocks unsafe, unlicensed, oversized, or ungoverned outputs | review report, approval decision, risk notes |

## Adapter Classes

| Class | Examples | Use |
| --- | --- | --- |
| World Model | HY-World 2.0 | Generate or reconstruct persistent 3D worlds |
| Text/Image to 3D | Hunyuan3D, TRELLIS, TripoSR, InstantMesh, Stable Fast 3D | Candidate objects, props, characters, structures |
| Procedural Generation | Infinigen, WFC, MarkovJunior | Terrain, rooms, layouts, tiles, variations |
| 3D Authoring | Blender MCP | Scene creation, cleanup, materials, rigging, export |
| Game Engine | Unity MCP, Unreal MCP, Godot MCP | Runtime testing, navigation, collision, build preparation |
| Web Runtime | PlayCanvas, React Three Fiber, WebXR | Browser-native previews and creator-facing experiences |
| Reconstruction / 3DGS | SuperSplat, Gaussian Splatting tools | Digital twins, splat editing, visual reconstruction |
| Video Timeline | OpenCut-style adapter | Shorts, explainers, previews, broadcast packages |
| Audio / Voice | voice/audio MCPs | Narration, ambience, NPC dialogue, localization |
| Verification | internal Verifier | License, provenance, performance, canon, safety |

## Tool Registry

| Tool | Class | Status | Notes |
| --- | --- | --- | --- |
| HY-World 2.0 | World Model | research | Strong candidate for explorable world generation and reconstruction. Keep behind review. |
| TRELLIS | Text/Image to 3D | evaluate | Candidate asset and scene-object generation. Verify license and output workflow. |
| Hunyuan3D | Text/Image to 3D | evaluate | Good fit for open 3D asset generation experiments. Keep provenance. |
| TripoSR | Text/Image to 3D | evaluate | Useful for fast single-image-to-3D tests. Needs cleanup and optimization. |
| InstantMesh | Text/Image to 3D | evaluate | Candidate mesh generation lane. Verify runtime and quality. |
| Stable Fast 3D | Text/Image to 3D | evaluate | Fast object generation lane. Review commercial posture. |
| Infinigen | Procedural Generation | evaluate | Strong procedural environment source for Blender-first workflows. |
| Blender MCP | 3D Authoring | evaluate | Core authoring and cleanup path. Highest practical priority. |
| Unity MCP | Game Engine | evaluate | Runtime testing, nav, physics, and game-style assembly. |
| Unreal MCP | Game Engine | watch/evaluate | High-fidelity runtime target. Treat adapter ecosystem as emerging. |
| Godot MCP | Game Engine | evaluate | Open-source runtime option for lighter scenes. |
| PlayCanvas | Web Runtime | evaluate | Browser-native 3D preview path. |
| React Three Fiber | Web Runtime | active stack alignment | Agentropolis web stack already aligns with R3F style previews. |
| WebXR | Web Runtime | evaluate | Immersive preview target. Needs performance gate. |
| OpenUSD | Interchange | evaluate | Long-term scene and asset interchange layer. |
| SuperSplat / 3DGS tools | Reconstruction / 3DGS | evaluate | Useful for splat editing and digital twin experiments. |
| OpenCut | Video Timeline | watch/evaluate | Candidate timeline/render control plane for media output. |

## Candidate Packet Standard

Every generated or imported world candidate must produce a packet before it can enter Agentropolis.

```text
candidate/
  manifest.yaml
  prompt.md
  source-media.md
  license.md
  performance.md
  import-checklist.md
  verifier-report.md
  world-diff.md
  media-diff.md
```

## Manifest Template

```yaml
candidate_id: worldforge-command-atrium-001
created_at: YYYY-MM-DD
agent: WorldForge
adapter: hy_world_2_worldforge_adapter
source_tool: HY-World 2.0
source_repo: https://github.com/Tencent-Hunyuan/HY-World-2.0
input_type: text | image | multi_view | video | procedural
output_type: mesh | 3dgs | glb | usd | blend | mixed
intended_district: Construction District
intended_scene: Command Atrium
runtime_target: r3f | playcanvas | unity | unreal | godot | blender
status: candidate
risk_level: high
requires_human_review: true
approved_for_production: false
```

## World Diff Requirements

A world diff explains what changes before the city mutates.

Required fields:

- source candidate
- target scene
- assets added
- assets removed
- materials changed
- lighting changed
- performance impact
- license impact
- canon impact
- rollback path

## Media Diff Requirements

A media diff explains what changes before a render or public-facing clip ships.

Required fields:

- source scene
- timeline spec
- voice/audio sources
- captions
- logos/marks
- likeness risks
- music/license notes
- export settings
- approval state

## Risk Rules

### Low Risk

- inspect metadata
- generate report
- create prompt draft
- create import checklist
- preview read-only scene

### Medium Risk

- generate candidate asset
- modify non-production scene
- export test GLB
- render internal preview
- assemble draft timeline

### High Risk

- import external asset into canonical city
- use unclear license media
- generate likeness-sensitive characters
- publish rendered media
- mutate production scene
- run unbounded generation

## Approval Law

No generated world becomes Agentropolis infrastructure until it clears:

1. provenance review
2. license review
3. optimization review
4. district-fit review
5. canon review
6. human approval

## First Production Sprint

1. Create one WorldForge candidate for Command Atrium.
2. Create one DistrictBuilder layout for Construction District.
3. Create one AssetSmith pack for signs, panels, doors, consoles, and civic props.
4. Create one CrowdForge NPC pool with no celebrity likenesses.
5. Create one MediaForge timeline spec for a 30-second Construction District teaser.
6. Run Verifier reports on all outputs.
7. Import only approved, optimized, license-cleared assets.

## Canon Line

> The kit does not replace artists, builders, or governance.  
> It gives the city a controlled factory for worlds, assets, scenes, and media.