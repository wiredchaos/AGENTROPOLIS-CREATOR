# Screenplay Breakdown — ScriptBreak MCP stage prompt

**Stage:** screenplay-breakdown
**Server:** `scriptbreak` (headless; reads `.scriptbreak` project files)
**Owner role:** breakdown-analyst
**Windows:** supported (server is Node-based; app has a Windows installer)
**District:** AGENTROPOLIS FILM DISTRICT — AGENTROPOLIS-CREATOR (creative intelligence + production control). This is a CREATOR-owned creative prompt: it produces the creative artifact. ASBE consumes it as an execution mandate and returns receipts + QC results.

## Goal

Turn a saved ScriptBreak project into a full breakdown: scenes, elements,
character/location bibles, shot list, and generator-ready prompt packs —
byte-for-byte the same markdown the app produces.

## Required flow

1. `mcp_scriptbreak_get_breakdown` — always start here. Reads the project and
   explains its conventions (scenes, 1/8th page counts, bibles, generators).
2. `mcp_scriptbreak_list_scenes` — enumerate; filter by INT/EXT, day/night,
   character, location, scene/page range as the task requires.
3. `mcp_scriptbreak_get_scene` — full detail for the beats that matter.
4. `mcp_scriptbreak_list_elements` — props/wardrobe/vehicles/vfx by category.
5. `mcp_scriptbreak_get_character_bible` / `mcp_scriptbreak_get_location_bible`
   — canonical descriptions for continuity.
6. `mcp_scriptbreak_get_shot_list` — grouped by scene.
7. `mcp_scriptbreak_export_prompt_pack` — pick generator + scope
   (all/scenes/pages/shots/filter) and export.

## Inputs / outputs

- Input: `.scriptbreak` file (from app's Save project), or
  `SCRIPTBREAK_PROJECT` env default.
- Output: prompt pack markdown, shot list, bibles. The server only reads; it
  never writes.

## Receipt (required fields)

mandate, agent, tool, input_asset_hashes (SHA-256 of the .scriptbreak file),
model (n/a for this stage — set provider "local/scriptbreak"), prompt_version
(n/a), cost_estimate (0), approval (gate: output_import), output_path,
qc_result, timestamp.

## Notes / drift

- Do not re-parse raw screenplays — this server reads already-saved projects.
- `get_breakdown` first is mandatory; its response carries the data conventions.
- No drift metrics apply at this stage; handoff feeds visual-development.
