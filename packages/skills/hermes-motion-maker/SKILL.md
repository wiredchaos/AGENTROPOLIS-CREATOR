---
name: hermes-motion-maker
description: byok creator foundry skill for turning a rights-cleared reference image and motion brief into a controlled image-to-video workflow. use when hermes, agentropolis creator, or a connected agent needs to generate motion-style animation plans, frame prompts, reference-role maps, Arcads MCP execution packets, Nano Banana-style frame batches, Seedance-style video prompts, continuity ledgers, QC notes, or media-diff handoff artifacts from static images while requiring the user to bring and control their own provider keys.
---

# Hermes Motion Maker

Use this skill to convert a reference image into a governed motion-animation workflow for the Agentropolis Creator Foundry.

This is a **BYOK** skill: bring your own key, bring your own provider account, bring your own billing boundary. The skill prepares execution packets for Arcads MCP or another approved MCP/video adapter, but it must not assume Agentropolis owns the provider account, API key, credits, subscription, or generation quota.

## Core Rule

Preserve the reference. Do not reinvent the subject.

```text
reference image
  -> rights check
  -> byok provider check
  -> role binding
  -> motion intent
  -> frame plan
  -> Nano Banana-style image frame prompt batch
  -> Seedance-style video prompt
  -> Arcads MCP execution packet
  -> take triage
  -> media-diff handoff
```

## BYOK Rule

Do not request, expose, print, commit, or store raw API keys.

Use environment variables, local MCP secret stores, connector-managed credentials, or runtime secret references only.

Allowed references:

```yaml
credentials:
  mode: byok
  owner: user
  storage: env | mcp_secret_store | connector_managed | local_only
  required_env:
    - ARCADS_API_KEY
    - NANO_BANANA_API_KEY
    - SEEDANCE_API_KEY
  secret_values_visible_to_agent: false
```

Never include real key values in prompts, docs, commits, logs, receipts, screenshots, or generated artifacts.

## Inputs

Require or infer:

- reference image or image description
- rights status: owned, licensed, public-safe, unknown
- provider mode: BYOK only
- intended platform: X, Shorts, Reels, OTT, website hero, internal test, game asset
- aspect ratio: 9:16, 16:9, 1:1, 4:5, custom
- duration target
- motion style: slow push, dolly, orbit, handheld, whip pan, parallax, product spin, cinematic reveal, character micro-motion
- subject lock: identity, wardrobe, props, logos, pose, facial expression, environment
- negative constraints: what must not change

If rights status is unknown, produce a planning packet but mark execution as blocked until rights are confirmed.

If BYOK credentials are not configured, produce a planning packet but mark execution as blocked until the user configures provider credentials in the approved runtime secret layer.

## Output

Return these sections:

1. **Motion Brief** - short readable direction.
2. **Reference Role Map** - what each image controls: subject, style, environment, wardrobe, prop, logo, pose, palette.
3. **Continuity Locks** - what must remain unchanged.
4. **Frame Plan** - keyframes or frame groups with camera/action notes.
5. **Frame Prompt Batch** - Nano Banana-style prompts for still frame generation.
6. **Video Prompt** - Seedance-style prompt for animation.
7. **BYOK Provider Check** - credential status without exposing secrets.
8. **Arcads MCP Packet** - provider-neutral execution manifest.
9. **QC Checklist** - artifacts to inspect before approval.
10. **Delivery Packet** - filename, ratio, duration, platform, caption notes, rights receipt.

## Prompt Discipline

Keep generated prompts concise and controllable.

Use this pattern:

```text
[subject lock], [environment lock], [camera motion], [action], [lighting], [style fidelity], [duration/aspect], [negative constraints]
```

Avoid vague prompt bloat such as "cinematic masterpiece" unless the user explicitly wants stylized marketing language.

## Reference Role Binding

Never treat every input image as generic style input.

Bind each reference to a job:

```yaml
reference_role_map:
  ref_01:
    role: subject_identity
    locks:
      - face shape
      - wardrobe
      - silhouette
      - logo placement
  ref_02:
    role: environment_style
    locks:
      - lighting
      - background layout
      - color palette
```

## Arcads MCP Packet Shape

Use this provider-neutral shape unless the active Arcads MCP server defines a stricter schema:

```yaml
skill: hermes-motion-maker
lane: creator.motion
status: execution_ready | planning_only | blocked_rights_review | blocked_byok_credentials
provider_mode: byok
input:
  reference_assets:
    - id: ref_01
      role: subject_identity
      rights_status: owned | licensed | public_safe | unknown
  motion_brief: ""
  aspect_ratio: "9:16"
  duration_seconds: 6
  platform: "x_short"
providers:
  frame_generator: nano_banana_style_adapter
  video_animator: seedance_style_adapter
credentials:
  mode: byok
  owner: user
  secret_values_visible_to_agent: false
  required_secret_refs:
    - ARCADS_API_KEY
    - NANO_BANANA_API_KEY
    - SEEDANCE_API_KEY
steps:
  - verify_rights_status
  - verify_byok_secret_refs
  - bind_references
  - generate_frame_batch
  - animate_video
  - triage_take
  - produce_delivery_packet
guardrails:
  preserve_subject_identity: true
  require_rights_receipt: true
  require_human_review: true
  require_byok: true
  store_private_assets: false
  store_secret_values: false
outputs:
  - frame_prompt_batch
  - video_prompt
  - continuity_ledger
  - take_review
  - delivery_qc_packet
```

## BYOK Provider Check

Report credential status without leaking values:

```yaml
byok_provider_check:
  mode: byok
  arcads: configured | missing | unknown
  nano_banana_style_adapter: configured | missing | unknown
  seedance_style_adapter: configured | missing | unknown
  can_execute: true | false
  blocked_reason: none | missing_credentials | rights_unknown | provider_unavailable | mcp_not_connected
```

## QC Checklist

Check every generated take for:

- identity drift
- face or hand distortion
- logo warping
- text hallucination
- wardrobe changes
- prop changes
- background melt
- unwanted camera motion
- unsafe or unlicensed source material
- aspect ratio crop problems
- platform-safe caption or metadata issues

## Agentropolis Placement

This is a CREATOR Foundry skill.

```text
AGENTROPOLIS-CREATOR
  -> builds motion packets, prompts, shot plans, QC receipts

AGENTROPOLIS-AGENT-MCP
  -> validates BYOK provider routing, secret references, execution boundaries, and receipts

HERMES-CITY
  -> publishes public-safe demos and coordination notes

agentropolis
  -> consumes only approved asset references
```

## Guardrails

- BYOK only: do not use Agentropolis-owned keys, shared keys, hidden pooled credits, or implicit provider accounts.
- Do not claim provider execution succeeded unless a tool returned files or receipts.
- Do not invent model pricing, model availability, account status, MCP capabilities, or credential status.
- Do not commit user-uploaded private assets into the repo.
- Do not store API keys, session tokens, provider secrets, or private image URLs.
- Do not echo real secret values back to the user.
- Mark unverified provider names as adapter targets until tested.
- Route paid generation through approved MCP gates only.
- Always keep a human approval step before public release.
