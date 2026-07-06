# Arcads MCP Workflow Reference

## Purpose

Use this reference when converting a user request into a BYOK MCP-ready motion execution packet.

The workflow is designed for Arcads MCP or any approved Agentropolis MCP video adapter. Treat provider-specific names as adapter targets until tested in the active runtime.

## BYOK Position

Hermes Motion Maker is BYOK only.

```text
user provider account
  -> user-controlled credential
  -> local or MCP secret reference
  -> AGENTROPOLIS-AGENT-MCP route check
  -> provider execution only when approved
```

Do not store, print, log, commit, screenshot, or echo raw credentials. Use secret references only.

## Workflow

```text
1. intake_reference
2. confirm_rights_status
3. verify_byok_provider_mode
4. verify_secret_references_without_exposing_values
5. bind_reference_roles
6. compile_motion_brief
7. create_frame_prompt_batch
8. create_video_prompt
9. build_mcp_packet
10. run_or_queue_execution_only_if_tool_available_and_byok_ready
11. triage_take
12. produce_delivery_packet
```

## Required Intake Fields

```yaml
project_id: ""
requester: ""
rights_status: owned | licensed | public_safe | unknown
provider_mode: byok
credentials:
  owner: user
  storage: env | mcp_secret_store | connector_managed | local_only | unknown
  secret_values_visible_to_agent: false
  required_secret_refs:
    - arcads_provider_secret_ref
    - frame_generator_secret_ref
    - video_animator_secret_ref
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

## BYOK Gate

If credential references are missing, unknown, or outside an approved secret store, return a planning packet and set:

```yaml
status: blocked_byok_credentials
execution_allowed: false
blocked_reason: missing_credentials | unsafe_secret_handling | mcp_not_connected | provider_unavailable
```

Safe status reporting:

```yaml
byok_provider_check:
  mode: byok
  arcads: configured | missing | unknown
  frame_generator: configured | missing | unknown
  video_animator: configured | missing | unknown
  can_execute: true | false
```

Never include secret values.

## MCP Execution Packet

```yaml
mcp_packet:
  adapter: arcads_motion
  skill: hermes-motion-maker
  lane: creator.motion
  provider_mode: byok
  status: execution_ready
  credentials:
    owner: user
    secret_values_visible_to_agent: false
    required_secret_refs:
      - arcads_provider_secret_ref
      - frame_generator_secret_ref
      - video_animator_secret_ref
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
    provider_mode: byok
    prompt_hash: "optional"
    output_paths: []
```

## Handoff Rule

CREATOR produces the motion package. AGENTROPOLIS-AGENT-MCP handles governed provider calls, BYOK secret references, execution boundaries, and receipts.
