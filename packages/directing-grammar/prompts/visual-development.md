# Visual Development — Master Canvas MCP stage prompt

**Stage:** visual-development
**Server:** `master-canvas` (headless; reads/writes `master-canvas-project.json`)
**Owner role:** visual-developer
**Windows:** server supported; the Master Canvas app itself is macOS-only.
**District:** AGENTROPOLIS FILM DISTRICT — AGENTROPOLIS-CREATOR (creative intelligence + production control). This prompt owns the visual canon and continuity bible; ASBE consumes the resulting brief manifest for execution and receipts.

## Goal

Build the visual bible and a generator-ready handoff package: continuity
(character/wardrobe/location/props/style rules), scene and shot cards, prompts
and negative prompts, camera and lighting notes, attached assets, explicit shot
order.

## Required flow

1. `mcp_master_canvas_get_project` — always start here; learn card types, scene
   keys, shot order.
2. `mcp_master_canvas_set_continuity` — lock characters, wardrobe, locations,
   props, style rules, never-change items. This is the source of truth for
   identity and continuity drift.
3. `mcp_master_canvas_add_card` — scene heads, then media (shot) cards.
4. `mcp_master_canvas_update_card` — prompts, negative prompts, camera,
   lighting, provider per card.
5. `mcp_master_canvas_attach_asset` — register source images/links (copied into
   a `<project>-assets/` folder).
6. `mcp_master_canvas_set_shot_order` — explicit order from card ids.
7. `mcp_master_canvas_build_handoff_package` — manifest + assets + shot
   manifests; the package feeds previs and the generation layer.

## Inputs / outputs

- Input: project JSON (from app export or `create_project`), continuity bible.
- Output: `project_manifest.json` (schema master-canvas-handoff-v1), `assets/`,
  `timeline/`, `deliverables/bin_plan.json`, readable `shot-package.md`.

## Receipt (required fields)

mandate, agent, tool, input_asset_hashes (project JSON + attached assets),
model (n/a — provider "local/master-canvas"), prompt_version
(prompt_hash of continuity bible), cost_estimate (0), approval (gate:
output_import), output_path, qc_result, timestamp.

## Notes / drift

- This stage owns the continuity bible that later stages and drift monitors
  reference. Update it deliberately; unversioned edits count as prompt/asset
  mutation.
- `build_handoff_package`, `inspect_package`, and `comfy_plan` share the same
  manifest contract — packages built here are drop-in compatible with Hermes /
  ComfyUI tooling.
