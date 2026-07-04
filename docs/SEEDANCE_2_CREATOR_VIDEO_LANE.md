# Seedance 2.0 Creator Video Lane

## Status

Candidate external reference and adapter target for the AGENTROPOLIS-CREATOR video foundry lane.

Seedance 2.0 is not absorbed as a canonical Agentropolis runtime dependency. It is tracked as a public creator-side capability package that may inform video direction, prompt compilation, sequence planning, reference handling, evaluation, and media handoff patterns.

```text
external video skill reference
  -> creator package candidate
  -> provenance and license review
  -> media-diff preview
  -> MCP handoff contract
  -> runtime adoption only after approval
```

## Source

```text
Repository: Emily2040/seedance-2.0
Name: Seedance 2.0 Skill OS
License: MIT, per upstream README badge and LICENSE reference
Default branch: main
Observed upstream README date: 2026-07-04
```

Upstream describes the project as a modular agent-skill package for directing Seedance 2.0 video generations. It emphasizes intent-first scene direction, text/image/video/reference-to-video workflows, native audio, IP-safe rewrites, source-dated platform facts, multilingual reader paths, eval cases, and production handoff artifacts.

## Why CREATOR Tracks It

AGENTROPOLIS-CREATOR is the foundry. It builds governed construction assets, media packages, model-pack candidates, workflow packages, and MCP kits. Seedance 2.0 Skill OS belongs here because it is production-facing video infrastructure, not private city runtime state.

The useful pattern is not vendor lock-in. The useful pattern is the operating model:

```text
idea
  -> scene intention
  -> reference roles
  -> shot contract
  -> prompt compilation
  -> generated take review
  -> continuity ledger
  -> repair loop
  -> delivery handoff
```

CREATOR can adapt that pattern across Seedance, Runway, Veo, Kling, Higgsfield, Hunyuan, OpenCut-style timelines, and future video engines.

## AGENTROPOLIS Placement

```text
AGENTROPOLIS-CREATOR
  Video Foundry
    -> Direction Engine
    -> Prompt Compiler
    -> Character Lock
    -> Reference Role Binder
    -> Sequence Planner
    -> Continuity Ledger
    -> Take Triage
    -> Media-Diff Preview
    -> Delivery/QC Packet
    -> MCP Handoff Manifest
```

This is a CREATOR lane first. Other repos consume only approved outputs.

```text
CREATOR
  builds candidate workflows, shot specs, prompts, evals, and handoff manifests

AGENTROPOLIS-AGENT-MCP
  validates tool calls, provider routing, policy gates, receipts, and execution boundaries

HERMES-CITY
  publishes public-safe summaries, demos, coordination notes, and release signals

agentropolis
  consumes approved package references only after governance approval
```

## Adapter Boundary

The Seedance lane should remain provider-agnostic.

Do not hardwire AGENTROPOLIS-CREATOR to one video provider. Use an adapter contract:

```yaml
adapter_id: seedance_2_video_lane
lane: creator.video
status: candidate
upstream: Emily2040/seedance-2.0
license_review: required
provenance_review: required
outputs:
  - treatment
  - shot_contract
  - prompt_batch
  - reference_role_map
  - continuity_ledger
  - take_review
  - repair_plan
  - delivery_qc_packet
handoff:
  target: AGENTROPOLIS-AGENT-MCP
  requires:
    - provider_selected
    - cost_estimate
    - asset_rights_map
    - safety_review
    - media_diff_preview
    - rollback_path
```

## Core Capabilities to Mirror

| Capability | CREATOR Use |
|---|---|
| Scene direction | Convert loose ideas into cinematic intent, blocking, camera, light, sound, and action. |
| Text to video | Compile concise model-ready prompts from structured shot contracts. |
| Image to video | Bind uploaded references by role instead of treating every image as generic style input. |
| Video continuation | Continue from observed footage state, not from the original imagined ending. |
| Character consistency | Preserve identity, wardrobe, props, silhouette, and performance rules across shots. |
| Native audio prompting | Track dialogue, ambience, SFX, music intent, and sync cues as separate production layers. |
| Take triage | Review generated output using verdicts, repair levers, and attempt budgets. |
| Multilingual prompt support | Keep native-reader paths for creator teams working in English, Chinese, Japanese, Korean, and future language packs. |
| Evaluation harness | Treat prompts and video workflows as testable production assets. |
| Delivery/QC | Produce client-safe review packets, aspect ratios, captions, metadata, and final handoff notes. |

## Guardrails

- Do not copy upstream source files blindly.
- Preserve upstream license notices if code or substantial text is reused.
- Keep vendor/API/pricing/model-ID claims source-dated.
- Do not commit proprietary prompts, private runtime state, user secrets, API keys, unreleased strategy, or client media.
- Require asset rights mapping for all reference images, video, voices, music, logos, and brand material.
- Use media-diff preview before public release.
- Route execution through AGENTROPOLIS-AGENT-MCP when tool calls, provider accounts, or paid generation are involved.
- Runtime adoption requires approval. CREATOR builds candidates, not permanent city canon.

## Suggested CREATOR Package Shape

```text
packages/video/seedance-2-lane/
  README.md
  manifest.yaml
  shot-contract.schema.json
  reference-role-map.schema.json
  continuity-ledger.schema.json
  take-review.schema.json
  delivery-qc.schema.json
  examples/
    cinematic-short.md
    product-spot.md
    character-lock.md
    continuation-chain.md
  evals/
    prompt-compiler-cases.yaml
    continuity-cases.yaml
    safety-rewrite-cases.yaml
```

## Activation Phrases

- "turn this into a Seedance video plan"
- "make a video prompt batch"
- "lock this character across clips"
- "continue from this final frame"
- "repair this generated take"
- "build a shot contract"
- "make this creator-safe for AI video"
- "convert this into a delivery/QC packet"

## Canon Decision

Seedance 2.0 Skill OS is a strong external reference for the Creator Video Lane.

It should be tracked as:

```text
CREATOR video infrastructure reference
not a core runtime dependency
not a separate Agentropolis repo yet
not canonical city state
```

The lane becomes valuable when generalized into a provider-agnostic video foundry contract that can route across multiple engines while preserving Agentropolis governance, provenance, media-diff previews, and MCP receipts.
