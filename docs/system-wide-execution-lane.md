# System-Wide Execution Lane

## Purpose

This document turns AGENTROPOLIS-CREATOR from a documentation foundry into an execution system for city-wide capability production.

The goal is simple:

```text
Every capability follows the same path.
Idea -> candidate -> package -> verification -> registry -> handoff -> runtime adoption
```

No capability becomes city infrastructure because it sounds good.

It becomes infrastructure because it can be packaged, evaluated, governed, routed, and rolled back.

## System-Wide Execution Model

```text
AGENTROPOLIS-CREATOR
  builds candidate packages

Verifier / Model Pack Verifier
  checks structure, provenance, license, evals, risk, rollback

District Exchange
  indexes approved packages

AGENTROPOLIS-CITY
  consumes approved visual, spatial, and runtime-facing packages

wiredchaos/agentropolis
  consumes approved City OS, skill registry, and deployment-facing packages
```

## Package Types

| Package Type | Owner | Output |
| --- | --- | --- |
| Skill Package | District / Skill Architect | executable skill contract |
| Workflow Package | Workflow Compiler | repeatable operating procedure |
| MCP Kit | Construction District | tool adapter and permissions spec |
| WorldForge Pack | WorldForge | governed scene/world candidate |
| Media Pack | MediaForge | timeline, assets, captions, export review |
| Model Pack | Model Training Foundry | fine-tuned model or adapter candidate |
| Eval Suite | Verifier | test plan and scoring records |
| Commerce Kit | Economic/Settlement District | payment, wallet, pricing, policy flow |

## Execution Stages

### 1. Intake

Every package starts with a plain-language request and a package class.

Required intake fields:

```json
{
  "request": "What are we building?",
  "package_type": "skill|workflow|mcp_kit|worldforge_pack|media_pack|model_pack|eval_suite|commerce_kit",
  "district": "Construction District",
  "owner": "human or agent owner",
  "target_repo": "AGENTROPOLIS-CREATOR|AGENTROPOLIS-CITY|agentropolis",
  "risk_level": "low|medium|high",
  "approval_required": true
}
```

### 2. Candidate Build

CREATOR produces a candidate package using the correct template.

Candidate packages are not production infrastructure.

They must include:

- README
- manifest
- provenance record
- license record
- risk record
- evaluation plan or evaluation report
- rollback or rejection path

### 3. Verification

Verifier checks the package for structure, safety, provenance, licensing, evals, and handoff readiness.

Model Pack Verifier handles model-specific checks.

No package can advance if required metadata is missing.

### 4. Registry Entry

Approved candidates receive a registry entry.

The registry entry must state:

- package id
- package type
- district
- status
- risk level
- required approvals
- install or handoff path
- downstream repos

### 5. Handoff

The package moves to the correct destination:

| Destination | Receives |
| --- | --- |
| AGENTROPOLIS-CITY | room specs, visual assets, world packs, scene manifests |
| wiredchaos/agentropolis | registry updates, skill routing, City OS package references |
| District Exchange | release index, package metadata, install paths |
| Runtime Agents | only approved, evaluated, rollback-ready capabilities |

### 6. Runtime Adoption

Runtime adoption requires:

- approved registry entry
- version number
- eval report
- rollback plan
- owner approval
- governance record

## CODEX Execution Role

CODEX should be used when a package requires code, file generation, repo rewiring, tests, schemas, scripts, or CI.

CODEX should not be used as a vague builder.

It should receive specific execution tickets.

### CODEX Ticket Format

```markdown
# CODEX EXECUTION TICKET

## Goal
What should be changed?

## Repo
Which repository?

## Files To Create Or Modify
- path/file.md
- path/file.yaml

## Required Behavior
- concrete expected behavior

## Acceptance Criteria
- repo map updated
- template exists
- verifier checks required fields
- README references new lane

## Guardrails
- do not deploy to production
- do not remove safety gates
- do not train on secrets
- do not overwrite canonical city state
```

## First System-Wide Execution Tickets

### Ticket 1: Wire Model Pack Lane

Repo: `wiredchaos/AGENTROPOLIS-CREATOR`

Tasks:

- create `templates/model-pack/`
- create `workflows/model-pack-candidate.md`
- create `skills/model-pack-verifier/skill.md`
- update repo map and recommended tool chain
- add registry reference to `registry/training-adapters.md`

Acceptance:

- model pack candidate can be created from template
- verifier skill can inspect required files
- package cannot be approved without eval, license, provenance, and risk review

### Ticket 2: District Exchange Package Index

Repo: `wiredchaos/AGENTROPOLIS-CREATOR`

Tasks:

- create `registry/package-index.md`
- add package type table
- add release state definitions
- add handoff destinations

Acceptance:

- every package type has a registry path
- every approved package has a downstream destination

### Ticket 3: City Runtime Handoff Contract

Repos:

- `wiredchaos/AGENTROPOLIS-CREATOR`
- `wiredchaos/AGENTROPOLIS-CITY`
- `wiredchaos/agentropolis`

Tasks:

- define handoff manifests
- distinguish CREATOR candidate outputs from CITY runtime consumption
- define what agentropolis consumes as City OS references

Acceptance:

- no live runtime state is pulled into CREATOR
- no candidate package is treated as production
- runtime repos consume only approved package references

## Global Guardrails

- No package enters canonical infrastructure without verification.
- No model pack ships without dataset provenance.
- No world pack ships without source metadata.
- No media pack publishes without media diff review.
- No MCP kit runs destructive actions without approval.
- No commerce kit executes value movement without explicit policy gates.
- No runtime repo consumes candidate-only packages.

## Canon Line

> Agentropolis execution is not chaos. It is governed motion through the grid.
