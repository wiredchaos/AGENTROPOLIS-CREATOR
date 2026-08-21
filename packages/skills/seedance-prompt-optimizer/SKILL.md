---
name: seedance-prompt-optimizer
description: compile an approved provider-neutral CREATOR video prompt contract into a Seedance 2.5-specific prompt packet with explicit reference roles, scene timing, continuity constraints, audio direction, provider-claim receipts, risk flags, and a governed execution handoff. use when HERMES, ASBE, MOTIONFORGE, or AGENTROPOLIS-CREATOR has selected Seedance 2.5 as the target adapter for text-to-video, image-to-video, reference-to-video, video editing, extension, transition, multi-keyframe, storyboard, blockout, or long-form video planning. this skill compiles prompts only; it never authenticates, uploads, renders, publishes, or widens its own authority.
---

# Seedance 2.5 Prompt Optimizer

## Role

Translate a validated `creator.video_prompt_ir` contract into a Seedance 2.5 provider packet.

This is a **provider compiler**, not a creative sovereign and not an execution agent.

```text
HERMES creator intake
  -> creator-prompt-compiler
  -> creator.video_prompt_ir
  -> model/runtime router selects Seedance 2.5
  -> seedance-prompt-optimizer
  -> ASBE production orchestration
  -> AEGIS / AGENTROPOLIS-AGENT-MCP policy gate
  -> sealed provider connector
  -> media diff + human review
  -> receipt
```

## Authority Boundary

Allowed:

- normalize a Seedance task type
- bind images, videos, audio, frames, storyboards, and blockouts to explicit roles
- compile a model-ready prompt
- separate external generation parameters from prompt prose
- label assumptions and unresolved decisions
- emit provider-claim references and risk flags
- create a handoff packet for ASBE and AGENTROPOLIS-AGENT-MCP

Denied:

- requesting or reading raw credentials
- signing into Dreamina, Jimeng, ByteDance, CapCut, or any provider
- uploading user assets
- starting paid generations
- publishing or distributing outputs
- changing locked copy, identity, rights, consent, budget, or approval state
- treating imported limits as permanent provider truth

## Activation Triggers

Activate only after Seedance 2.5 is selected or explicitly requested:

- "compile this for Seedance 2.5"
- "optimize this Seedance prompt"
- "turn this CREATOR brief into a Seedance prompt"
- "map these references for Seedance"
- "write a Seedance extension or editing prompt"
- "build a Seedance multi-reference sequence"
- "make a Seedance prompt from this storyboard or blockout"
- "repair this Seedance take"

Do not activate merely because a user asks for an AI video. Provider selection belongs to the router unless the user explicitly chooses Seedance.

## Required Inputs

Consume a `creator.video_prompt_ir` object containing, at minimum:

- intent
- task type
- output specification
- subjects and identity locks
- scenes and beat order
- camera and motion language
- reference assets with explicit roles
- audio direction
- exact copy locks
- negative constraints
- rights and consent state
- provider selection receipt
- approval policy

When the input is incomplete, return `planning_only` or `blocked`. Apply bounded defaults only when the upstream contract permits inference, and record every default in `assumptions`.

## Task Classification

Select one or more:

- `text_to_video`
- `image_to_video`
- `multi_reference`
- `reference_to_video`
- `video_edit`
- `forward_extension`
- `backward_extension`
- `first_last_frame`
- `multi_keyframe`
- `storyboard_grid`
- `coarse_blockout`
- `fine_blockout`
- `image_montage`
- `seamless_transition`
- `long_form_staged`
- `take_repair`

Load only the relevant reference files:

- `references/multi-reference.md`
- `references/editing-and-extension.md`
- `references/long-video-and-timing.md`
- `references/advanced-techniques.md`
- `references/checklist-and-limits.md`

## Core Compilation Formula

Build the prompt from observable instructions:

```text
subject + action/event + environment + visual treatment + camera + timing + audio + continuity + negatives
```

Do not pad prompts with generic quality words. Preserve the user's intent, exact copy, character identity, product structure, prop ownership, scene geography, axis of action, and approved style locks.

## Reference Binding

Every asset must have a declared role and exclusions.

```yaml
reference_bindings:
  - asset_id: "asset_character_01"
    provider_label: "@Image 1"
    role: "identity_and_wardrobe"
    use:
      - "face"
      - "hair"
      - "clothing"
    exclude:
      - "background people"
      - "visible logos not listed in the rights map"
    rights_receipt_id: "rights_..."
```

Never infer that a reference controls identity, motion, style, scene, audio, or camera without stating which attributes it contributes.

## Provider Claims

Provider capabilities are volatile.

Before using a limit or feature claim, resolve a versioned capability snapshot. At minimum record:

- provider and product surface
- model label
- source URL or source receipt
- date observed
- claim
- verification state
- internal reproduction state

Imported reference notes are advisory and may not authorize execution.

Use these states:

```text
verified_current_source
community_or_user_supplied
internally_reproduced
unverified
stale
conflicting
```

Conflicting or unverified claims must be surfaced in `provider_claims_used` and must not be converted into guarantees.

## Output Contract

Return a `seedance.compiler_output` envelope:

1. `status`
2. `task_type`
3. `optimized_prompt`
4. `external_parameters`
5. `reference_bindings`
6. `assumptions`
7. `provider_claims_used`
8. `risk_flags`
9. `validation_receipt`
10. `handoff`

The user-facing surface may display only `optimized_prompt`, but HERMES, ASBE, and downstream agents receive the complete envelope.

## Status Model

```text
complete
inferred_with_receipt
planning_only
blocked
```

Block when:

- asset rights or consent are unresolved
- a required reference is missing
- the requested edit conflicts with locked identity or copy
- provider selection is absent
- a requested capability is unsupported or cannot be verified
- public release is requested without approval policy
- the packet contains a secret or credential value

## Validation

Before handoff:

- each subject, prop, scene, voice, and motion source has one explicit binding
- reference exclusions prevent unwanted bleed
- beats are ordered and non-contradictory
- end states are observable
- camera instructions do not conflict
- exact copy remains exact
- physics and secondary motion are plausible
- audio directions are separated from generation parameters
- aspect ratio, duration, resolution, and similar settings live in `external_parameters`
- provider limits are source-dated and non-guaranteed unless internally reproduced
- rights, consent, budget, and approval receipts are present
- no raw secret is present
- the connector handoff cannot publish directly

## Handoffs

Chains from:

- `creator-prompt-compiler`
- `storyboard-reference-intelligence`
- `hermes-motion-maker`
- MOTIONFORGE Motion Brief
- ASBE shot and scene planning
- HERMES creator command intake

Chains to:

- ASBE production orchestration
- `AGENTROPOLIS-AGENT-MCP` authority and adapter gate
- AEGIS media, rights, privacy, and provider-claim review
- sealed Seedance connector
- media-diff verifier
- continuity evaluator
- artifact packager

## Example

Input:

```text
Compile the approved 8-second product reveal contract for Seedance 2.5. @Image 1 is the product identity reference, @Video 1 is camera pacing only, and the logo copy is locked.
```

Output behavior:

- bind `@Image 1` only to product shape, materials, color, and logo geometry
- bind `@Video 1` only to camera rhythm and motion trend
- exclude the people, product identity, text, and environment from `@Video 1`
- compile the 8-second beat sequence
- preserve locked logo copy
- emit duration and aspect ratio as external parameters
- hand the packet to ASBE without invoking the provider

## Provenance

This package adapts a user-supplied `seedance-prompt-optimizer.skill` archive received on 2026-08-05. The source archive declared no license metadata. Preserve the provenance record and do not redistribute the imported text outside approved repositories until ownership or license is confirmed.
