# COINTELPRO Higgsfield Open-Source Content-Orchestration Pipeline

**Audit date:** 2026-08-10 (UTC)
**Audit mode:** filesystem and repository inspection only; no generation executed
**Required upstream:** `https://github.com/higgsfield-ai/skills`

> **Course correction (2026-08-11):** Existing Higgsfield projects are content
> vaults. The active system inventories and matches existing assets; it does not
> generate missing media. Any generation-oriented text below describes a
> separately gated provider boundary, not the content-vault engine. Generation
> fallback is prohibited.

## Non-conflation rule

The film pipeline keeps three authorities separate:

1. **Canon/original IP** owns story, characters, worlds, symbols, identity, and approval.
2. **Open-source production tooling** packages repeatable instructions, directing grammar, orchestration, scripts, and local transforms. It does not acquire IP ownership or generation authority.
3. **Hosted Higgsfield services** execute provider-side model jobs when explicitly authorized. An open-source skill may call a hosted service; its open-source license does not make inference local, free, or non-billable.

Never label a component `LOCAL_TOOL` or an operation `NON_BILLABLE_OPERATION` merely because its wrapper or `SKILL.md` is open source.

## Pipeline lock

```text
CANON / ORIGINAL IP
  -> approved canon and cross-property permissions
  -> open-source Higgsfield skills + Wasserman filmmaking tools
  -> Creator directing grammar / MCP orchestration
  -> read-only authenticated content-vault enumeration
  -> asset taxonomy and story matching
  -> human editorial selection
  -> 789 Studios × NTRU Studios
  -> ATVNETWORK / interactive film / MCP
```

The operator-supplied COINTELPRO property registry currently names COINTELPRO, NETERU, ALKEBULAN, Grinder Syndicate, Yasuke, Chrysanthemum, Neuro Tokyo 2090, Agentropolis, ATVNETWORK, 589 / AKIRA CODEX, and Neiberau. Registry membership is **not** permission to import one property's material into another property's shot. In particular, the NETERU Episode 0 exclusions and visual locks continue to govern that production until explicitly amended.

## Required classification vocabulary

Every inventoried component and every recorded operation must use one or more of these exact labels:

| Label | Meaning |
| --- | --- |
| `OPEN_SOURCE_COMPONENT` | Source-readable/distributable workflow code or documentation whose license and revision have been recorded. |
| `HOSTED_HIGGSFIELD_SERVICE` | Provider-operated remote API, MCP, CLI-backed service, model, storage, or job system. |
| `LOCAL_TOOL` | Runs entirely on the controlled workstation for the recorded operation. This label requires inspected implementation evidence. |
| `CREDIT_SPENDING_OPERATION` | Can create provider usage or consume credits. Requires an estimate/bound, authority, and execution receipt. |
| `NON_BILLABLE_OPERATION` | Has been verified not to create provider usage for the recorded invocation. Reading files and compiling local prompt text qualify; assumptions do not. |

A single workflow can be both `OPEN_SOURCE_COMPONENT` and an orchestrator of a `HOSTED_HIGGSFIELD_SERVICE`/`CREDIT_SPENDING_OPERATION`.

## Installed-skill inventory result

The mandated scan covered repository `.agents/skills/`, repository-wide Higgsfield directories, `/workspace`, `/root`, global npm packages, and the executable `PATH`.

**Finding:** this checkout contains no `.agents/` directory, no installed Higgsfield `SKILL.md`, no `higgsfield` executable, and no globally installed `@higgsfield/cli`. The repository contains policy documentation describing the supported install and access surfaces, but policy text is not an installed skill.

| Required skill | Install evidence | Purpose / commands / modes / continuity | Dependencies and scripts | Classification | Pipeline position |
| --- | --- | --- | --- | --- | --- |
| `higgsfield-generate` | `NOT_INSTALLED` | `UNVERIFIED`; the name is not accepted as capability evidence. | `UNVERIFIED` | Pending source/license inspection. | Excluded unless it exposes separately verifiable read-only inventory behavior. |
| `higgsfield-soul-id` | `NOT_INSTALLED` | `UNVERIFIED`; no Soul/identity capability is claimed. | `UNVERIFIED` | Pending source/license inspection. | Candidate existing-asset identity annotation aid only after audit. |
| `higgsfield-video-explainer` | `NOT_INSTALLED` | `UNVERIFIED`; no explainer workflow is claimed. | `UNVERIFIED` | Pending source/license inspection. | Candidate existing-asset assembly metadata aid only after audit. |

This failed inventory gate must not be “completed” from memory, package names, marketplace descriptions, or adjacent repository docs. Install the approved revision into `.agents/skills/`, then read every `SKILL.md`, referenced file, and executable script before updating the table.

## Required post-install inventory record

Create one record per skill with all fields present:

```yaml
skill_name: exact-directory-name
source_repository: https://github.com/higgsfield-ai/skills
source_revision: full-commit-sha
license: SPDX-or-verbatim-reference
purpose: verified-from-SKILL.md
commands_and_workflows: []
supported_generation_modes: []
continuity_and_reference_capabilities: []
scripts_and_references: []
dependencies: []
execution_boundary:
  local_steps: []
  hosted_steps: []
  unknown_steps: []
classifications: []
credit_spending_operations: []
non_billable_operations: []
pipeline_position: explicit-stage
evidence_paths: []
audited_at: ISO-8601
audited_by: identity
```

Unknown fields remain `UNVERIFIED`; they are never filled from the skill name.

## Inventory and execution boundary

The current repository policy recognizes four distinct Higgsfield access surfaces: Supercomputer, skills, CLI, and remote MCP. For this engine, a surface is usable only after its exact operation is verified as read-only existing-project or existing-asset enumeration. Skills provide workflow intelligence but do not grant access, canon, rights, publication, wallet, or governance authority.

Before any read-only provider invocation:

1. identify the exact skill revision and command;
2. classify every step as local, hosted, billable, non-billable, or unknown and reject unknown/billable operations;
3. verify existing-project/asset enumeration support instead of inferring it;
4. record source rights, character/voice authority, prompt-contract version, and references;
5. require zero generation jobs and zero credit spending;
6. obtain vault-inspection approval separately from download, edit, or publication approval;
7. preserve enumeration pagination, record counts, sanitized references, and review receipts.

Reading an installed `SKILL.md`, validating a local manifest, and constructing asset or scene-requirement records are non-generation inventory actions. Prompt submission, upload to a model, image/video generation, character training, enhancement, and retries are outside this engine and prohibited.

## Reproducible shot package

Every editorially assembled shot begins from `templates/film-shot-package/SHOT_ID/` and attaches one or more matched existing-asset records:

```text
SHOT_ID/
├── canon.md
├── style-lock.md
├── continuity.md
├── direction.md
├── shot.md
├── references/
├── previs/
├── higgsfield/
│   ├── cost.txt
│   ├── prompt.txt
│   ├── command.txt
│   └── generation.json
└── final/
```

The checked-in template defaults to `NOT_EXECUTED`, a zero approved budget, no publication authority, and empty provider IDs. Copy it per shot; never write secrets, bearer tokens, cookies, or session credentials into the package.

## Production ordering

```text
approved canon
  -> directing grammar and shot contract
  -> Wasserman Blockout
  -> Motion Previs Studio
  -> approved spatial layout, camera, action, and framing
  -> authenticated existing-vault enumeration
  -> inspected Higgsfield inventory workflow
  -> story/asset match and human selection
  -> Stem Studio
  -> DaVinci integration
  -> media diff and continuity review
  -> human release approval
```

Blockout and previs define editorial needs before existing assets are matched. Missing coverage remains a gap report. Actual Wasserman commands, local/hosted boundaries, dependencies, and DaVinci behavior must be taken from the installed suite revision; they are not inferred here.

## Audit receipt

```yaml
inventory_status: BLOCKED_NOT_INSTALLED
generation_executed: false
credits_spent_by_this_audit: 0
files_read:
  - docs/HIGGSFIELD_MCP_CREATOR_LANE.md
  - registry/media-mcp-adapters.md
  - packages/directing-grammar/src/index.ts
required_missing_paths:
  - .agents/skills/higgsfield-generate/SKILL.md
  - .agents/skills/higgsfield-soul-id/SKILL.md
  - .agents/skills/higgsfield-video-explainer/SKILL.md
network_verification: BLOCKED_BY_ENVIRONMENT
next_action: install an approved pinned revision, then repeat the source-level inventory without invoking generation
```
