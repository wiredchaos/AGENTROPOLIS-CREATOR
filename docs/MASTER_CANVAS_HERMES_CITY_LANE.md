# Master Canvas Hermes City Creator Lane

## Status

Candidate Creator Foundry workstation and MCP adapter lane for local-first AI video pre-production.

Master Canvas is an external MIT-licensed project that provides a visual board for arranging assets, prompts, references, shot order, camera direction, sound notes, and generator handoffs. It also includes an MCP server and a starter Hermes plugin.

This lane adopts the workflow pattern without making Master Canvas a hard runtime dependency.

```text
creator intent
  -> Master Canvas project board
  -> project JSON or handoff ZIP
  -> Creator MCP inspection and validation
  -> HERMES-CITY coordination
  -> AGENTROPOLIS-AGENT-MCP policy gate
  -> approved local or cloud renderer
  -> take review and media diff
  -> human approval
  -> provenance and execution receipt
```

## Canon Position

```text
AGENTROPOLIS-CREATOR
  -> owns the creative workflow, shot contracts, adapter specs, templates, and QC packets

Master Canvas
  -> optional local-first application and external reference implementation

HERMES-CITY
  -> coordinates public-safe creator workflows, operator guidance, release signals, and non-private production status

AGENTROPOLIS-AGENT-MCP
  -> validates tool requests, gates credentials and provider access, enforces policy, and writes execution receipts

agentropolis
  -> consumes only approved asset references and completed package receipts
```

Master Canvas is an application surface. It is not the city runtime, the policy authority, or the MCP security boundary.

## Why It Fits

Master Canvas already supports the core pre-production objects required by the Creator District:

- infinite visual production boards
- local asset references
- per-shot prompts and negative prompts
- lens, lighting, camera, action, sound, and review notes
- shot ordering and scene planning
- project JSON import and export
- agent-readable handoff packages
- Hermes-oriented context exports
- ComfyUI and LTX job planning
- Kling and Veo prompt sheets
- local browser or Electron storage
- headless project editing through MCP

The valuable part is the structured handoff contract, not dependence on one generation provider.

## Candidate Skill

```text
Name: Master Canvas Operator
Role: Inspect, validate, revise, and route local-first AI video pre-production projects through governed Creator MCP tools.
Tier: extended
Triggers: inspect this Master Canvas project, validate this shot board, prepare this storyboard for Hermes, compile these shots, build a production handoff, route this canvas to Creator MCP
Chains to: shot contract compiler, continuity sentinel, media diff preview, creator QC, asset package export, AGENTROPOLIS-AGENT-MCP
Requires: exported master-canvas-project.json or handoff ZIP, rights-cleared assets, human approval before paid or public execution
Example: Validate an AGENTROPOLIS launch trailer board, identify missing continuity locks, compile provider-neutral shot packets, and route approved jobs through the MCP gate.
```

## Creator MCP Contract

The first integration should operate on exported project files. It must not silently read arbitrary directories or upload an entire repository.

Recommended tool surface:

```text
creator.canvas.inspect
creator.canvas.validate
creator.canvas.list_shots
creator.canvas.update_shot
creator.canvas.compile_handoff
creator.assets.index
creator.assets.verify_rights
creator.prompt.compile
creator.job.plan
creator.job.submit
creator.job.status
creator.output.review
creator.receipt.write
```

### Minimum request envelope

```json
{
  "project_id": "agentropolis-origin-film",
  "source_type": "master_canvas_project",
  "source_path": "./exports/master-canvas-project.json",
  "requested_action": "compile_handoff",
  "execution_mode": "plan_only",
  "allowed_providers": [],
  "network_policy": "deny_by_default",
  "human_approval_required": true
}
```

### Minimum response envelope

```json
{
  "status": "planned",
  "project_id": "agentropolis-origin-film",
  "shots_valid": 8,
  "shots_blocked": 2,
  "blocking_reasons": [
    "missing rights status for reference asset",
    "missing continuity lock for hero wardrobe"
  ],
  "execution_receipt": null
}
```

## HERMES-CITY Role

HERMES-CITY may:

- explain project readiness
- summarize missing production information
- coordinate human review
- publish public-safe status and release notes
- expose non-sensitive examples and templates
- route approved requests toward the MCP membrane

HERMES-CITY must not:

- hold provider secrets
- bypass AGENTROPOLIS-AGENT-MCP
- claim media was generated without a real execution receipt
- publish private project assets or handoff packages
- treat local project access as permission to upload files

## Execution Modes

| Mode | Network | Provider calls | Receipt |
|---|---:|---:|---:|
| inspect | denied | no | inspection record |
| validate | denied | no | validation record |
| plan_only | denied | no | plan record |
| local_execute | local allowlist | optional local tools | execution receipt |
| cloud_execute | explicit provider allowlist | yes | provider and cost receipt |
| publish | explicit destination allowlist | optional | publication receipt |

The default mode is `inspect` or `plan_only`.

## Security Guardrails

- Never upload an entire repository or workspace as a convenience step.
- Accept only explicit project files, selected assets, or a user-approved handoff archive.
- Deny network access by default.
- Require a visible manifest of every file leaving the local machine.
- Strip secrets, environment files, Git metadata, caches, and unrelated source code from handoffs.
- Store provider credentials only in the governed MCP/runtime secret layer.
- Require rights and provenance status for every external asset.
- Record provider, model, parameters, estimated cost, actual cost when available, output hashes, and reviewer approval.
- Treat prompt sheets as potentially sensitive production data.
- Require media-diff and human review before public release.

## Adapter Boundary

```yaml
adapter_id: master_canvas_creator
lane: creator.preproduction
status: candidate
source:
  repository: wassermanproductions/master-canvas
  license: MIT
inputs:
  - master-canvas-project.json
  - explicit handoff ZIP
  - selected rights-cleared assets
execution_gate: AGENTROPOLIS-AGENT-MCP
coordination_surface: HERMES-CITY
network_default: deny
provider_default: none
outputs:
  - project_inspection
  - validation_report
  - shot_contracts
  - continuity_locks
  - provider_neutral_job_plan
  - handoff_manifest
  - media_review_packet
  - execution_receipt
promotion_requirements:
  - dependency and license review
  - fixture-based parser tests
  - malicious archive tests
  - path traversal protection
  - file allowlist enforcement
  - network egress tests
  - receipt schema validation
  - human review flow
```

## Implementation Phases

### Phase 1: Reference and fixtures

- Track the upstream project and license.
- Add sanitized example project JSON fixtures.
- Document the project and handoff schemas.
- Build inspect and validate commands only.

### Phase 2: Creator MCP adapter

- Implement project parsing behind the MCP membrane.
- Add shot listing, validation, and provider-neutral handoff compilation.
- Enforce explicit file manifests and network denial.
- Add fixture and hostile-input tests.

### Phase 3: Hermes operator

- Add the Master Canvas Operator skill.
- Support readiness summaries and repair recommendations.
- Keep execution in `plan_only` until the user approves a route.

### Phase 4: Governed execution

- Add local ComfyUI or LTX adapters first.
- Add cloud providers only through explicit allowlists.
- Write cost, provenance, output hash, and approval receipts.

### Phase 5: HERMES-CITY public surface

- Publish safe workflow cards, templates, and release status.
- Never expose private boards, prompts, assets, credentials, or production archives.

## Canon Decision

Adopt Master Canvas as an optional Creator Foundry pre-production lane and external reference implementation.

```text
application surface, not city runtime
Creator MCP adapter, not unrestricted filesystem access
HERMES-CITY coordination, not credential custody
AGENTROPOLIS-AGENT-MCP execution gate, not provider bypass
local-first by default
cloud only by explicit approval
```
