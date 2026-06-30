# HY-World 2.0 Integration

## Role in AGENTROPOLIS-CREATOR

HY-World 2.0 is the Construction District candidate for **world generation, world reconstruction, and persistent 3D district prototyping**.

It should be treated as a research-grade world model lane, not a production replacement for Blender, Unreal, Unity, PlayCanvas, React Three Fiber, or the Agentropolis governance layer.

```text
Prompt / image / multi-view / video
-> HY-World 2.0 world generation or reconstruction
-> mesh / 3DGS candidate output
-> Construction District verification
-> optimization / retopology / metadata
-> governed import into Agentropolis scenes
```

## Source Repository

- Upstream: `Tencent-Hunyuan/HY-World-2.0`
- Upstream URL: `https://github.com/Tencent-Hunyuan/HY-World-2.0`
- Local role: external research dependency and pipeline reference
- Status: candidate integration, not yet hard dependency

## Why It Matters

HY-World 2.0 is aligned with the Agentropolis Construction District because it aims at persistent 3D worlds instead of disposable video-only outputs.

The upstream project describes HY-World 2.0 as a multi-modal world model for reconstructing, generating, and simulating 3D worlds from text, single images, multi-view images, and videos. Its outputs include meshes and Gaussian Splattings, which makes it relevant to city-scale world generation, digital twins, simulation, and spatial agent interfaces.

## Agentropolis Use Cases

### 1. District Previsualization

Generate early 3D drafts for:

- Command Atrium
- Vertical Axis Tower
- Mission Control
- Construction District
- commerce corridors
- agent offices
- training rooms
- civic plazas

### 2. Digital Twin Intake

Use photos, video, or multi-view references to reconstruct:

- real offices
- event spaces
- storefronts
- warehouse layouts
- studio sets
- real estate interiors

### 3. Simulation Substrate

Produce navigable worlds for:

- embodied agent testing
- robotics-style navigation simulations
- NPC route tests
- crowd behavior previews
- spatial UX experiments

### 4. Creator Media Pipeline

Feed generated environments into:

- Blender rendering
- OpenCut-style video timelines
- short-form social clips
- product explainers
- cinematic onboarding assets

## Pipeline Mapping

| HY-World Component | Construction District Role |
| --- | --- |
| HY-Pano 2.0 | 360 environment seed generation |
| WorldNav | route and navigation planning reference |
| WorldStereo 2.0 | world expansion candidate |
| WorldMirror 2.0 | reconstruction from video / multi-view imagery |
| 3DGS / mesh output | candidate import into verification pipeline |

## Governance Requirements

Every HY-World output must pass the Construction District gate before becoming a permanent Agentropolis asset.

Required checks:

- source prompt or source media recorded
- generation date recorded
- upstream model/version recorded when available
- license notes attached
- asset category assigned
- district destination assigned
- polygon / splat / texture cost estimated
- optimization status recorded
- human review completed before production import

## Metadata Sidecar Template

```yaml
asset_id: hyworld-agentropolis-example-001
source_tool: HY-World 2.0
source_repo: Tencent-Hunyuan/HY-World-2.0
source_url: https://github.com/Tencent-Hunyuan/HY-World-2.0
input_type: text | image | multi_view | video
prompt: ""
source_media: []
output_type: mesh | 3dgs | point_cloud | mixed
intended_district: Construction District
intended_scene: Command Atrium
status: candidate
review_required: true
license_notes: "Verify upstream model and generated asset usage before commercial deployment."
optimization_required: true
approved_for_production: false
```

## First Implementation Tasks

1. Add HY-World 2.0 to `registry/asset-sources.md` as an external world model source.
2. Add a candidate MCP adapter entry to `registry/mcp-adapters.md`.
3. Create a `WorldForge` workflow that accepts prompt/image/video inputs and returns a governed asset candidate packet.
4. Define an import checklist for Blender, Unreal, Unity, and WebXR.
5. Create one test spec: `examples/hy-world-command-atrium.md`.

## Reality Check

HY-World 2.0 is powerful, but it should stay behind verification until tested against Agentropolis needs.

Known constraints to validate:

- GPU and VRAM requirements
- output size and browser performance
- mesh quality and cleanup needs
- 3DGS compatibility with WebXR/R3F stack
- license/commercial use posture
- reproducibility of generated districts
- ability to round-trip into Blender/Unity/Unreal pipelines

## Canon Line

> HY-World can draft worlds.  
> AGENTROPOLIS-CREATOR governs whether those worlds become city infrastructure.
