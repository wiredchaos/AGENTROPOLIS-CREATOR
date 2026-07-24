---
name: storyboard-reference-intelligence
description: convert rights-cleared video clips, stills, phone footage, or mood references into governed storyboard frames, provider-neutral shot contracts, prompt manifests, animatics, PDFs, shot lists, and execution receipts. use when agentropolis creator needs to extract visual grammar from existing imagery without allowing an agent or model provider to self-authorize access, execution, export, or publication.
---

# Storyboard Reference Intelligence

## Role

Convert approved visual references into traceable shot intelligence before production execution.

This skill plans and validates the workflow. Its upstream adapter is disabled by default until AGENTROPOLIS-AGENT-MCP supplies an authorized execution context.

## Activation Triggers

Activate for requests such as:

- "turn this footage into a storyboard"
- "extract six shots from this clip"
- "match this camera framing"
- "build prompts from these reference frames"
- "create an animatic from these images"
- "make a shot list from this video"
- "analyze the visual grammar of this scene"

## Required Inputs

- agent identity
- mandate ID
- approved source workspace
- source media references
- rights status
- privacy classification
- network policy
- frame or duration budget
- requested outputs

Never request raw provider credentials. Secret resolution belongs to the approved MCP or connector layer.

## Status Model

```yaml
status: ready_for_governed_execution | planning_only | blocked
```

Use `blocked` when identity, mandate, source access, rights, privacy, or capability authorization is unresolved.

## Core Corridor

```text
Identity
  -> Mandate
  -> Capability scope
  -> Rights and privacy
  -> Budget
  -> Shot extraction
  -> Provider-neutral analysis
  -> Creator Prompt Contract
  -> Export
  -> Receipt
  -> Human review
```

## Capability Map

- `storyboard.get_state`
- `storyboard.add_frame`
- `storyboard.auto_board`
- `storyboard.set_label`
- `storyboard.set_crop`
- `storyboard.describe_frame`
- `storyboard.extract_frame`
- `storyboard.set_frame_duration`
- `storyboard.set_shot_meta`
- `storyboard.add_annotation`
- `storyboard.clear_annotations`
- `storyboard.export_board`
- `storyboard.export_animatic`
- `storyboard.export_pdf`
- `storyboard.export_shotlist`

## Output Structure

Return these sections in order:

1. Normalized Request
2. Authorization Status
3. Rights and Privacy Status
4. Source Manifest
5. Shot Contracts
6. Inference Receipt
7. Creator Prompt Contract Handoff
8. Export Manifest
9. Execution Receipt
10. Human Review Requirements

## Chains From

- HERMES creator command intake
- ASBE production plans
- Scriptbreak scene decomposition
- human reference-board requests
- Creator Prompt Contract planning

## Chains To

- creator-prompt-compiler
- ASBE
- Blockout
- Motion Previs
- approved image and video generators
- media-diff verification
- PBX
- 789 Studios
- NTRU-OTT
- production archive

## Dependencies

- rights-cleared media supplied by the user or approved workspace
- FFmpeg-capable upstream workstation when execution is authorized
- AGENTROPOLIS-AGENT-MCP governance adapter
- Entropy / Model Council for provider routing
- Human Mission Control for release approval

## Example

Input:

```text
Use this user-owned 24-second clip to create six reference shots for a 16:9 trailer board. Keep all analysis local, export a PDF, shot-list CSV, and prompt manifest, and do not publish anything.
```

Expected disposition:

```yaml
status: ready_for_governed_execution
capability: storyboard.auto_board
network_policy: local_only
rights_status: user_owned
frame_budget: 6
outputs:
  - storyboard_pdf
  - shot_list_csv
  - prompt_manifest
require_human_review: true
publish: false
```

## Guardrails

- Do not execute without identity and mandate IDs.
- Do not silently move local-only media to a cloud provider.
- Do not represent inferred camera or lighting details as source facts.
- Do not redistribute source frames when rights are unknown.
- Do not expose bearer tokens, API keys, or private local paths.
- Do not claim export success without artifacts and a receipt.
- Require media-diff and human approval before public release.

## Reference

See `docs/STORYBOARD_REFERENCE_INTELLIGENCE_LANE.md`.
