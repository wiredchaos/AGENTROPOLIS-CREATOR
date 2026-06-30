# WorldForge Candidate Packet Workflow

## Goal

Create a repeatable workflow for generating candidate worlds, reviewing them, and deciding whether they can enter Agentropolis.

## Trigger Phrases

Use this workflow when a user or agent says:

- "Generate a district preview."
- "Create a 3D world candidate."
- "Reconstruct this space."
- "Turn this reference into an Agentropolis scene."
- "Build a WorldForge packet."
- "Prepare a city import candidate."

## Input Contract

```yaml
request_id: ""
requester: ""
intent: district_preview | digital_twin | simulation_space | media_scene | prop_pack
input_type: text | image | multi_view | video | procedural
source_materials: []
prompt: ""
intended_district: ""
intended_scene: ""
runtime_target: r3f | playcanvas | blender | unity | unreal | godot | webxr
style_constraints: []
canon_constraints: []
license_constraints: []
```

## Workflow

### 1. Intake

WorldForge records the request, intended district, target runtime, and source materials.

### 2. Adapter Selection

Choose the least risky adapter that can do the job.

| Need | Adapter Class |
| --- | --- |
| Full explorable world from prompt/image/video | World Model |
| Object or prop from image | Text/Image to 3D |
| Terrain or layout variations | Procedural Generation |
| Scene cleanup and export | 3D Authoring |
| Browser preview | Web Runtime |
| Runtime navigation and collision | Game Engine |
| Short-form rendered media | Video Timeline |

### 3. Candidate Generation

Generate the candidate output only as a draft.

Candidate outputs cannot mutate canonical city scenes.

### 4. Metadata Sidecar

Create `manifest.yaml`, `prompt.md`, `source-media.md`, `license.md`, and `performance.md`.

### 5. World Diff

Create `world-diff.md` describing exactly what would change if imported.

### 6. Verifier Review

Verifier reviews:

- source provenance
- license risk
- performance risk
- canon fit
- likeness risk
- runtime readiness
- rollback path

### 7. Decision

| Decision | Meaning |
| --- | --- |
| APPROVE | Candidate can move to import preparation. |
| REVISE | Candidate needs cleanup, optimization, or metadata. |
| INTERNAL_ONLY | Candidate can be used privately but not published. |
| BLOCK | Candidate cannot be used. |

## Output Contract

```yaml
candidate_id: ""
status: APPROVE | REVISE | INTERNAL_ONLY | BLOCK
risk_level: low | medium | high
approved_for_production: true | false
required_changes: []
verifier_notes: ""
next_agent: DistrictBuilder | AssetSmith | CrowdForge | MediaForge | human_review
```

## Approval Gate

No candidate enters production until approval is explicit.

WorldForge drafts. Verifier blocks. Governance decides.