# Arcads MCP Workflow Reference

## Purpose

Use this reference when converting a user request into an MCP-ready motion execution packet.

The workflow is designed for Arcads MCP or any approved Agentropolis MCP video adapter. Treat provider-specific names as adapter targets until tested in the active runtime.

## Workflow

```text
1. intake_reference
2. confirm_rights_status
3. bind_reference_roles
4. compile_motion_brief
5. create_frame_prompt_batch
6. create_video_prompt
7. build_mcp_packet
8. run_or_queue_execution_only_if_tool_available
9. triage_take
10. produce_delivery_packet
```

## Required Intake Fields

```yaml
project_id: ""
requester: ""
rights_status: owned | licensed | public_safe | unknown
reference_assets:
  - id: ref_01
    source: uploaded | existing_asset | url | description_only
    role: subject_identity | style | environment | wardrobe | prop | logo | pose | palette
motion:
  aspect_ratio: 9:16 | 16:9 | 1:1 | 4:5 | custom
  duration_seconds: 4 | 6 | 8 | 10 | custom
  camera: slow_push | dolly_in | orbit | handheld | whip_pan | locked_off | custom
  action: ""
  mood: ""
  platform: x | reels | shorts | ott | website | internal
constraints:
  must_preserve:
    - ""
  must_avoid:
    - ""
```

## Rights Gate

If `rights_status` is `unknown`, return a planning packet and set:

```yaml
status: blocked_rights_review
execution_allowed: false
```

Do not call a generator or prepare claims that generation completed.

## MCP Execution Packet

```yaml
mcp_packet:
  adapter: arcads_motion
  skill: hermes-motion-maker
  lane: creator.motion
  status: execution_ready
  inputs:
    reference_role_map: []
    frame_prompt_batch: []
    video_prompt: ""
  providers:
    frame_generation: nano_banana_style_adapter
    video_animation: seedance_style_adapter
  review:
    require_human_approval: true
    qc_required: true
    media_diff_required: true
  receipt:
    source_assets: []
    rights_status: ""
    prompt_hash: "optional"
    output_paths: []
```

## Handoff Rule

CREATOR produces the motion package. AGENTROPOLIS-AGENT-MCP handles governed provider calls, credentials, tool boundaries, and receipts.
