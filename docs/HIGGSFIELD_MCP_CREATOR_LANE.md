# Higgsfield MCP Creator Lane

## Canonical Lock

Higgsfield MCP is an **official hosted external media connector** used by AGENTROPOLIS-CREATOR.

It belongs inside the Creator District and Media MCP Forge. It is not a standalone Agentropolis district, not the city runtime, and not a replacement for the Creator Prompt Contract, ASBE, AGENTROPOLIS-AGENT-MCP, RenderVerifier, PBX, or human approval.

Official connector:

```text
https://mcp.higgsfield.ai/mcp
```

Official product page:

```text
https://higgsfield.ai/mcp
```

## Why This Corrects The Existing Record

The earlier Creator registry classified Higgsfield MCP as `watch/evaluate` and left its repository and vendor fields unresolved.

Higgsfield now operates an official remote MCP service. The correct integration is the vendor-hosted OAuth connector, not an unofficial local wrapper that copies browser cookies, extracts Clerk tokens, or bypasses vendor bot protection.

## Position In Agentropolis

```text
Creator intent
  -> AGENTROPOLIS-CREATOR
  -> Creator Prompt Contract
  -> ASBE scene and shot orchestration
  -> AGENTROPOLIS-AGENT-MCP policy and authority gate
  -> official Higgsfield remote MCP
  -> asynchronous generation job
  -> result intake
  -> Media Diff Preview
  -> RenderVerifier
  -> human approval
  -> ASBE PBX
  -> approved distribution lane
  -> receipt and memory writeback
```

## Connector Contract

```json
{
  "adapter_id": "higgsfield_mcp",
  "provider": "Higgsfield",
  "status": "adopt_gated",
  "transport": "remote_mcp_https",
  "endpoint": "https://mcp.higgsfield.ai/mcp",
  "authentication": "vendor_oauth",
  "credential_storage": "provider_managed",
  "execution_mode": "asynchronous_generation",
  "publication_authority": false,
  "human_approval_required": true
}
```

## Capability Surface

The official connector may expose capabilities for:

- image generation
- video generation
- text, image, sketch, pose, audio, or reference-media inputs when supported
- multi-reference character and visual continuity workflows
- character training when the operator has verified rights
- generation-history browsing
- model and format selection
- iterative generation from previous outputs

The current model and tool list must be discovered from the official MCP at execution time. Agentropolis should route by capability and policy rather than permanently hardcoding provider model names.

## Scene Contract Input

Higgsfield execution begins with an approved Creator Prompt Contract rather than an unstructured prompt dump.

Required scene fields:

```text
scene_context
active_references
reference_authority
location_map
first_frame
spatial_blocking
format_mode
optical_segments
camera_segments
action_timing
physics
lighting
audio
positive_locks
negative_locks
continuity_rules
rights_and_license_state
estimated_credit_authority
approval_state
```

## Reference Authority

Each input reference must declare what it controls and what it cannot overwrite.

Example:

```json
{
  "reference_id": "image_1",
  "controls": ["face_identity", "hair", "full_outfit"],
  "does_not_control": ["environment", "lighting_color", "camera_lens"],
  "rights_state": "operator_verified",
  "allowed_use": ["internal_preview", "approved_render"]
}
```

This prevents character references from unintentionally changing the environment, lighting, props, camera design, or color grade.

## Validation Before Execution

AGENTROPOLIS-AGENT-MCP must validate:

- total duration matches timestamped beats
- a declared continuous take contains no cuts
- camera segments do not overlap or leave unassigned time
- lens locks remain stable inside each segment
- references have explicit authority and verified rights
- requested aspect ratio and duration are supported by the discovered provider capability
- credit-spending authority exists
- output use is limited to the approved scope
- public publication remains disabled until review

Example validation failure:

```json
{
  "status": "VALIDATION_FAILED",
  "code": "CAMERA_STRUCTURE_CONFLICT",
  "message": "A continuous take cannot contain a hard cut.",
  "recommended_fix": "Declare a two-shot sequence with one hard cut at 3.0 seconds."
}
```

## Security Boundary

Use only the official vendor-hosted OAuth connection for production.

Prohibited integration patterns:

- copying or storing Higgsfield browser cookies
- extracting Clerk session tokens or JWTs
- injecting scripts into a logged-in browser to impersonate API calls
- bypassing DataDome or other provider bot controls
- placing account credentials in prompts, committed files, logs, or receipts
- setting unrestricted write permissions by default
- allowing a generation tool to publish directly

Connector access should use least privilege. Generation, character training, credit spending, download, and publication should remain distinct authorities.

## Cost Control

Before execution, the route should record:

```json
{
  "provider": "higgsfield",
  "capability": "video_generation",
  "model": "discovered_at_execution",
  "duration_seconds": 8,
  "aspect_ratio": "16:9",
  "variant_count": 1,
  "estimated_credits": "provider_reported_or_unknown",
  "spend_authority": "approved_or_denied"
}
```

If the provider does not expose a reliable estimate, the receipt must say `unknown` rather than inventing a cost.

## Output And Receipt

```json
{
  "receipt_type": "creator_media_execution",
  "adapter_id": "higgsfield_mcp",
  "endpoint": "https://mcp.higgsfield.ai/mcp",
  "scene_contract_id": "scene_contract_0001",
  "provider_job_id": "provider_returned_value",
  "model": "provider_returned_value",
  "source_asset_ids": [],
  "rights_check": "passed",
  "credit_authority": "approved",
  "result_assets": [],
  "render_verifier_status": "pending",
  "human_approval": false,
  "publication_allowed": false
}
```

## Repo Ownership

```text
AGENTROPOLIS-CREATOR
  -> owns creative intent, reference authority, prompt contracts, templates, and media QA rules

ASBE
  -> owns scene, shot, timeline, studio, and PBX orchestration

AGENTROPOLIS-AGENT-MCP
  -> owns connector authority, execution policy, validation, and receipts

AGENTROPOLIS-GTM
  -> owns packaging and distribution only after approval

Higgsfield MCP
  -> executes approved external image and video generation jobs
```

## Decision

```text
Higgsfield MCP = adopted official external Creator District connector.
Endpoint = https://mcp.higgsfield.ai/mcp
Authentication = Higgsfield-managed OAuth.
Execution = governed and receipt-producing.
Publication = blocked until RenderVerifier and human approval.
Unofficial cookie/token extraction wrappers = prohibited for production.
```