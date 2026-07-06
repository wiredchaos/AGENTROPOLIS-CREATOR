# DepthFlow Creator Motion Lane

DepthFlow is tracked as an optional Creator District motion backend for turning static images into 2.5D parallax video assets.

Source: https://github.com/BrokenSource/DepthFlow

## Canon Position

```text
DepthFlow
  -> external open-source renderer candidate
  -> image to 3D parallax video
  -> creator motion backgrounds
  -> social clips
  -> OTT bumpers
  -> web hero loops
  -> loading screens
  -> human review
  -> media diff receipt
```

DepthFlow belongs in **AGENTROPOLIS-CREATOR** first.

It does not become a standalone Agentropolis repo yet. It is a tool lane inside the Foundry until there is enough custom code, packaging, governance surface, and production demand to justify extraction.

## What It Does

DepthFlow converts still images into 3D parallax-effect videos using depth estimation and GPU shader rendering.

It is useful for:

- animated character posters
- BWB / CLEAR / 789 STUDIOS motion cards
- Agentropolis district hero loops
- Akira Codex cinematic plates
- BoardForge loading screens
- social shorts from static art
- Lovable / Replit landing page video assets
- creator pack previews
- collectible media drops

## Integration Rule

Use DepthFlow as an **external rendering tool**, not as a hard runtime dependency.

Preferred pattern:

```text
Static image / concept art
  -> depth map generation
  -> DepthFlow render job
  -> video loop output
  -> Creator QC
  -> media diff preview
  -> approved asset package
  -> downstream app / OTT / web surface
```

## Licensing Guardrail

DepthFlow is AGPL-3.0.

Operational rule:

- OK: use it locally as a renderer.
- OK: generate commercial output from owned or licensed input assets.
- Review first: modifying DepthFlow itself.
- Review first: hosting modified DepthFlow as a network service.
- Avoid: embedding modified DepthFlow core into closed Agentropolis runtime code without license review.

## Candidate Skill

```text
Name: DepthFlow Motion Render
Role: Convert approved still assets into 2.5D parallax video loops.
Tier: extended
Triggers: animate this image, make a parallax loop, create a motion poster, turn this still into a 3D video plate
Chains to: media diff preview, creator QC, asset package export
Requires: local GPU preferred, FFmpeg, DepthFlow install, rights-cleared image input
Example: Turn a BWB news poster into a 9:16 looping motion card for X, Shorts, and OTT bumpers.
```

## Output Contract

Each DepthFlow job should produce:

```text
input_asset: original image reference
rights_status: owned | licensed | public_safe | unknown
motion_type: slow_push | orbit | sway | zoom_loop | custom
aspect_ratio: 16:9 | 9:16 | 1:1 | custom
output_file: rendered video path
qc_notes: artifacts, edge warping, face distortion, depth issues
approved_for: web | OTT | social | game | internal only
receipt: render settings + source references
```

## Status

**Adopt as candidate external adapter.**

DepthFlow strengthens the Creator District because it lets the Foundry turn static assets into cinematic motion without requiring full 3D modeling for every scene.