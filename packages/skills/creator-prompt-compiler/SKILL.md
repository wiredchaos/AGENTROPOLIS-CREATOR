---
name: creator-prompt-compiler
description: compile a plain-language creative request into a governed provider-neutral prompt contract with route, output spec, timestamped beats, exact copy, observable techniques, negative constraints, inference receipts, timeline validation, QC requirements, and an execution handoff. use when agentropolis creator, hermes, or a connected agent needs to structure a motion graphics prompt, product video, explainer, social clip, image-to-video request, 3d flythrough, ott bumper, storyboard, or timeline-ready media instruction without silently guessing missing decisions.
---

# Creator Prompt Compiler

Use this skill to turn one ordinary creative message into a controlled production contract for the AGENTROPOLIS-CREATOR Foundry.

## Role

Compile creative intent before provider selection.

The compiler does not render media. It validates and packages the request so an approved capability router, MCP adapter, local renderer, or editing workflow can execute it.

## Activation Triggers

Activate for requests such as:

- "structure this video prompt"
- "make this prompt production ready"
- "turn this into a six-second motion graphic"
- "build a shot-by-shot prompt"
- "create a timeline from this idea"
- "write a product launch video prompt"
- "make an image-to-video prompt"
- "compile this for TikTok, Reels, Shorts, X, OTT, or a website hero"
- "stop the video model from guessing"
- "add beats, exact copy, motion, and negatives"

## Core Contract

Every compiled request must address six decisions:

```text
route
spec
beats
copy
technique
negatives
```

A user may provide them in one paragraph. The compiler extracts and normalizes them.

## Core Rule

Do not silently invent missing creative decisions.

When safe defaults are applied, label them as inferred and record their source.

Resolution priority:

```text
explicit user instruction
  -> project or campaign profile
  -> district canon and continuity ledger
  -> platform profile
  -> safe default
```

## Inputs

Require or infer:

- creative intent
- route or workflow type
- duration
- dimensions, aspect ratio, or platform
- beat sequence
- exact visible or spoken copy
- motion, camera, lighting, transition, and rendering techniques
- negative constraints
- source assets and reference roles when applicable
- rights status
- target delivery surface
- approval requirements

Do not request raw API keys. Credential checks belong to the approved MCP or connector secret layer.

## Beat Formula

Each beat should identify:

1. time range
2. subject or object
3. action
4. position, origin, or destination
5. visual treatment

Recommended form:

```text
Beat N (start-end): [subject] [action] [origin/position/destination], rendered as [visual treatment].
```

The beat map must account for the full runtime unless intentional dead time is explicitly labeled.

## Copy Lock

Exact copy must remain exact.

For every copy item, identify:

- text
- mode: visible, narration, caption, metadata
- beat assignment
- lock status

Flag copy that is too dense for the assigned time or frame.

## Technique Discipline

Use observable instructions such as:

- slow dolly push
- orbit reveal
- squash-and-settle
- parallax drift
- match cut
- hard cut on beat
- soft contact shadow
- liquid-glass refraction
- frame hold

Avoid untestable filler such as "make it epic" unless the user intentionally wants loose creative interpretation.

## Negative Discipline

Negatives may govern:

- unwanted objects or themes
- identity drift
- logo changes
- extra text
- camera shake
- narration or music
- provider watermarks
- unlicensed assets
- private data
- off-canon colors or architecture

Negatives must not contradict the requested action. Flag conflicts.

## Status Model

Return one status:

```yaml
status: complete | inferred_with_receipt | planning_only | blocked
```

Use:

- `complete` when all required decisions are explicit
- `inferred_with_receipt` when safe defaults were used and disclosed
- `planning_only` when the request can be structured but not executed
- `blocked` when rights, policy, required assets, credentials, or execution access are unresolved

## Output Structure

Return these sections in order:

1. **Normalized Request**
2. **Status**
3. **Decision Ledger**
4. **Missing Decision Report**
5. **Inference Receipt**
6. **Timeline Map**
7. **Provider-Neutral Prompt**
8. **Execution Manifest**
9. **QC Contract**
10. **Handoff**

## Decision Ledger Shape

```yaml
decision_ledger:
  route: "/motion-graphics"
  spec:
    duration_seconds: 6
    width: 1080
    height: 1080
    aspect_ratio: "1:1"
    platform: "x"
    output_type: "motion_graphic"
  beats: []
  copy: []
  technique: []
  negatives: []
```

## Inference Receipt Shape

```yaml
inference_receipt:
  - field: "spec.aspect_ratio"
    value: "9:16"
    source: "tiktok_platform_profile"
    confidence: "high"
    user_overridable: true
```

Never represent an inferred field as an explicit user choice.

## Execution Manifest Shape

```yaml
skill: "creator-prompt-compiler"
lane: "creator.prompt_compilation"
status: "complete"
input:
  intent: ""
contract:
  route: ""
  spec: {}
  beats: []
  copy: []
  technique: []
  negatives: []
assets:
  references: []
  rights_status: "owned | licensed | public_safe | unknown | not_required"
governance:
  require_human_review: true
  require_media_diff: true
  record_inferred_defaults: true
  locked_copy_must_match: true
routing:
  capability: "creator.video | creator.motion_graphics | creator.image_to_video | creator.3d_capture"
  provider: "unresolved_until_router_selection"
outputs:
  - provider_neutral_prompt
  - timeline_map
  - qc_contract
  - inference_receipt
  - execution_manifest
```

## Validation

Before marking execution-ready, check:

- route is resolved
- duration and output shape are resolved
- beats cover the runtime
- beat overlaps are intentional
- exact copy is preserved
- copy density is feasible
- techniques are observable
- negatives are present or explicitly empty
- source assets include rights status
- reference roles are defined when identity or style fidelity matters
- no provider capability is invented
- no secret values appear in the packet
- human approval is required for public release

Flag:

- timeline gaps
- accidental overlaps
- contradictory camera directions
- incompatible dimensions and aspect ratios
- missing footage or image files
- unknown rights
- unsupported provider claims
- text that cannot fit the assigned beat
- negative constraints that cancel the requested action

## Limits

### Organic illustration

Text may underdetermine painterly or hand-drawn artwork. Prefer a rights-cleared reference image, simple geometric construction language, or an approved source-frame step before animation.

### Photography and live action

Real footage must arrive as a rights-cleared file or approved capture receipt. The compiler may plan the edit, but it must not claim footage exists.

## Handoffs

Chains to:

- `hermes-motion-maker` for reference-image motion packets
- Video Director Agent for creative route selection
- Storyboard Agent for expanded scene planning
- Motion Design Agent for kinetic specification
- Continuity Agent for identity and canon locks
- RenderOps Agent for provider execution and export
- Verifier Agent for media diff, text, brand, rights, and policy review
- AGENTROPOLIS-AGENT-MCP for adapter gates and receipts

Chains from:

- HERMES creator command intake
- district launch workflows
- product and campaign briefs
- repo release notes
- world-diff and media-diff workflows
- application surfaces requesting video or motion assets

## Example

Input:

```text
Make a six-second square Agentropolis Mission Control bumper. Show a mandate signal entering the router, planner, specialists, and skeptic activating, then an approved receipt locking into the ledger. Put "Authority is not a prompt. It is a runtime constraint." on the final beat. Black liquid glass, restrained red and cyan signals, no narration, no random cyberpunk clutter.
```

Compiled prompt:

```text
/motion-graphics Make a 6-second 1080x1080 video. Beat 1 (0-2s): a red mandate signal travels from the top-center through the black liquid-glass Mission Control spine and stops at the central router, with controlled refraction and no decorative particles. Beat 2 (2-4s): planner, specialist, and skeptic nodes activate in sequence across a three-column grid and converge on the MCP capability bus, using restrained cyan edge light and soft contact shadows. Beat 3 (4-6s): an approved execution receipt stamps into place at center frame and locks into the audit ledger with a hard settle and subtle glass distortion. Display the exact title "Authority is not a prompt. It is a runtime constraint." during Beat 3. No narration, no extra copy, no self-authorizing agent imagery, no random cyberpunk clutter, no provider watermark.
```

## Agentropolis Placement

```text
AGENTROPOLIS-CREATOR
  -> compiles creative intent into a timeline and execution contract

AGENTROPOLIS-AGENT-MCP
  -> validates provider routing, secret references, execution boundaries, and receipts

HERMES-CITY
  -> exposes public-safe creator command surfaces

agentropolis
  -> consumes approved media references only
```

## Guardrails

- Do not claim generation succeeded without an artifact or execution receipt.
- Do not invent provider availability, pricing, credentials, features, or account status.
- Do not expose API keys, private assets, client data, or private URLs.
- Do not execute rights-unclear assets.
- Do not alter locked copy.
- Do not silently guess missing decisions.
- Record every inferred default.
- Preserve identity, logos, canon, and continuity locks.
- Require human review before public release.

## Reference

See `docs/CREATOR_PROMPT_CONTRACT.md` for the full Foundry contract and provider-neutral schema.
