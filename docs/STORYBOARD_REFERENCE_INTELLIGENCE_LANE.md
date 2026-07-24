# Storyboard Reference Intelligence Lane

## Identity

Storyboard Reference Intelligence is the AGENTROPOLIS-CREATOR Foundry lane that converts rights-cleared reference imagery into governed shot contracts, storyboard packages, prompt manifests, animatics, PDFs, and shot lists.

It adapts the open-source [`wassermanproductions/storyboard-reference-studio`](https://github.com/wassermanproductions/storyboard-reference-studio) project without treating upstream code as a trusted execution authority.

> ASBE directs the production. Storyboard Reference Intelligence extracts the visual grammar.

## Placement

```text
reference intake
  -> rights and privacy classification
  -> governed storyboard adapter
  -> shot extraction and framing analysis
  -> Creator Prompt Contract
  -> Entropy / Model Council route
  -> AGENTROPOLIS-AGENT-MCP execution gate
  -> ASBE / Blockout / Motion Previs / approved generators
  -> media diff
  -> human review
  -> receipt
  -> approved distribution or archive
```

**Layer:** application

**District:** AGENTROPOLIS-CREATOR Foundry

**Runtime authority:** AGENTROPOLIS-AGENT-MCP

**Production orchestration:** ASBE

## Upstream capabilities

The upstream workstation supports video and image intake, FFmpeg scene detection, frame extraction, aspect reframing, shot metadata, annotations, generator-specific prompt formatting, offline prompt templates, storyboard packages, animatics, PDF boards, shot-list CSVs, and MCP control.

Upstream MCP access is an integration surface, not authorization. Agentropolis wraps it with identity, mandate, scope, rights, privacy, budget, receipts, and human-review requirements.

## Supported governed capabilities

```text
storyboard.get_state
storyboard.add_frame
storyboard.auto_board
storyboard.set_label
storyboard.set_crop
storyboard.describe_frame
storyboard.extract_frame
storyboard.set_frame_duration
storyboard.set_shot_meta
storyboard.add_annotation
storyboard.clear_annotations
storyboard.export_board
storyboard.export_animatic
storyboard.export_pdf
storyboard.export_shotlist
```

## Execution corridor

Every execution request must resolve:

```text
Identity
  -> Mandate
  -> Capability scope
  -> Source workspace
  -> Rights status
  -> Privacy class
  -> Network policy
  -> Budget
  -> Execute
  -> Receipt
  -> Human review when required
```

Unknown rights may permit private local analysis when policy allows, but block redistribution by default. A local-only mandate must never silently fall back to a cloud vision provider.

## Provider-neutral visual analysis

The upstream Claude integration is treated as one optional adapter. Provider selection belongs to Entropy / Model Council routing.

Routing considers:

- frame count and resolution
- requested metadata depth
- privacy classification
- rights status
- local model availability
- latency target
- budget
- approved providers

Output must normalize into a provider-neutral shot contract before generator-specific prompt syntax is applied.

## Deterministic outputs

```text
prompts.json       -> generator agents
shot-list.csv      -> ASBE production planner
storyboard.pdf     -> Human Mission Control
animatic.mp4       -> review lanes
board.md           -> production archive
stills/            -> Blockout, Motion Previs, or approved generators
receipt.json       -> audit ledger
```

Every frame retains source hash, source timestamp, crop coordinates, metadata provenance, inference labels, and output references.

## Non-goals

This lane does not:

- self-authorize model calls
- publish media automatically
- redistribute rights-unclear reference assets
- replace ASBE or the Creator Prompt Contract
- claim successful execution without artifacts and receipts
- expose upstream bearer tokens or private local paths

## Upstream license and attribution

Storyboard Reference Studio is Apache-2.0. Any fork, redistribution, or adapted product must retain the upstream NOTICE and credit Sam Wasserman / Wasserman Productions in documentation and the credits or About surface.

## Initial implementation status

`planning_only`

The first package contains contracts, schemas, registry metadata, policies, and a non-executing adapter scaffold. Upstream execution remains disabled until the MCP governance boundary and update strategy pass review.
