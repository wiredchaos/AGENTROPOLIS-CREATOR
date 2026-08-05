# Storyboard Planning — Storyboard Reference Studio stage prompt

**Stage:** storyboard-planning
**Server:** `storyboard-reference` (bridge; app MUST be running)
**Owner role:** storyboard-artist
**District:** AGENTROPOLIS FILM DISTRICT — AGENTROPOLIS-CREATOR (creative intelligence + production control). CREATOR owns storyboards and shot plans; ASBE executes generation and post-production against them.
**Windows: NOT SUPPORTED** — the app ships no Windows build
(macOS-only `storyboard-reference-studio-mac-arm64.dmg`). The bridge reads
`~/.config/storyboard-reference/control.json` from the running app.

## Goal (macOS)

Turn reference imagery into a working storyboard: auto-detect shots from clips,
reframe with guides, annotate camera moves, fill shot metadata, export
animatics, PDF boards, shot lists, and matched prompts.

## Required flow (macOS)

1. `mcp_storyboard_reference_get_state` — orient; import-aware state.
2. `mcp_storyboard_reference_auto_board` — build the board from the bin.
3. `mcp_storyboard_reference_set_crop` — reframe shots.
4. `mcp_storyboard_reference_describe_frame` — metadata / matched prompts.
5. `mcp_storyboard_reference_export_board` — animatic/PDF/CSV/prompts.

## Windows fallback (approved alternative)

This stage is skipped on Windows. Use:
- Blockout `screenshot` from the staged previs (see `storyboard-planning` usage
  of `mcp_blockout_screenshot`), and
- Master Canvas `build_handoff_package` deliverables as the board-equivalent.
Record the fallback choice in the receipt notes. Do not claim storyboard tool
output that was not produced.

## Receipt (required fields)

mandate, agent, tool, input_asset_hashes, model (n/a — provider
"local/storyboard-reference"), prompt_version, cost_estimate (0), approval,
output_path, qc_result, timestamp. On Windows fallback, tool = the fallback
tool actually used (e.g. `mcp_blockout_screenshot`) and notes explain the
substitution.

## Notes / drift

- visual_style_drift is the relevant metric; boards should match the style
  references from visual-development.
