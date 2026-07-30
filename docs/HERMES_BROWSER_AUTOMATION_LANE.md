# Hermes Browser Automation Foundry Lane

## Status

Candidate Creator Foundry lane for governed browser automation using a human-owned browser session, a local bridge, BYOK model access, and receipt-producing execution contracts.

This lane converts the common "install an extension, install a skills bundle, restart Hermes, configure memory, then automate the browser" pattern into an Agentropolis-native capability with identity, mandate, policy, review, and audit boundaries.

```text
human mandate
  -> Hermes Browser Operator
  -> task contract
  -> prompt analysis and research plan
  -> browser bridge readiness check
  -> AEGIS policy gate
  -> AGENTROPOLIS-AGENT-MCP tool routing
  -> isolated browser session
  -> observe / propose / execute
  -> evidence capture
  -> receipt
  -> human review
  -> approved memory write
```

## Canon Position

Hermes Browser Automation belongs inside **AGENTROPOLIS-CREATOR** first because the Foundry owns reusable workflows, skills, templates, interface patterns, and execution packets.

It is not a separate district and it is not permission to give an agent unrestricted control of a personal browser.

```text
AGENTROPOLIS-CREATOR
  -> skill package, task contracts, browser plans, evidence bundles, review packets

AGENTROPOLIS-AGENT-MCP
  -> guarded bridge routing, credential references, tool permissions, receipts

AEGIS
  -> domain policy, action classification, destructive-action blocks, approval rules

HERMES-CITY
  -> public-safe onboarding notes and non-private demonstrations

agentropolis
  -> consumes approved receipts, reusable workflows, and reviewed memory references
```

## Why It Matters

Browser automation becomes dangerous when setup instructions are treated as the architecture.

The valuable system is not one extension, provider, or shell command. The valuable system is a reusable browser execution contract that:

- uses the human's own browser without silently inheriting unlimited authority
- separates observation from action
- isolates automation sessions from personal sessions
- requires domain and action allowlists
- keeps provider credentials in BYOK secret stores
- records evidence before and after consequential actions
- blocks purchases, publishing, account changes, downloads, uploads, and data deletion without explicit approval
- writes durable memory only after review
- keeps browser bridges and model providers replaceable

## Candidate Components

The following are adapter targets, not hard dependencies:

| Component | Candidate role | Agentropolis treatment |
|---|---|---|
| Hermes Agent | Planner and operator shell | Must execute through task contracts and policy gates. |
| Kimi WebBridge-style extension | Local browser bridge | Treat as an untrusted adapter until version, permissions, source, and behavior are reviewed. |
| NVIDIA-hosted model access | Optional inference provider | BYOK only; availability, pricing, limits, and model names remain source-dated. |
| Interactive prompt analyzer | Intent clarification and risk discovery | Runs before browser execution. |
| Deep web research | Evidence collection and source comparison | Observation-first; citations and capture required. |
| Memory setup | Persistent context | Writes only reviewed summaries, never raw secrets or unrestricted session data. |

## Operating Modes

### 1. Observe

Read pages, inspect interfaces, collect visible facts, compare sources, and produce an evidence bundle. No state-changing action is permitted.

### 2. Propose

Prepare form values, messages, navigation plans, selections, and action previews without submitting them.

### 3. Execute with approval

Perform a state-changing action only after the user approves the exact action packet.

### 4. Bounded batch

Run a pre-approved series of repetitive actions where every domain, action type, maximum count, and stop condition is specified in advance.

## Browser Task Contract

Every task must resolve these fields before execution:

```yaml
task_id: browser-task-001
requested_by: human
operator: hermes-browser-operator
mode: observe | propose | execute_with_approval | bounded_batch
objective: ""
allowed_domains: []
blocked_domains: []
allowed_actions: []
blocked_actions:
  - purchase
  - transfer_funds
  - change_password
  - reveal_secret
  - delete_data
  - publish_publicly
  - install_software
session:
  profile: isolated_automation_profile
  reuse_personal_session: false
  retain_cookies: false
credentials:
  mode: byok
  secret_values_visible_to_agent: false
inputs: []
expected_outputs: []
approvals:
  pre_execution_required: true
  per_action_required_for: []
limits:
  max_steps: 30
  max_submissions: 0
  max_downloads: 0
  max_uploads: 0
  timeout_minutes: 15
stop_conditions: []
evidence:
  capture_before: true
  capture_after: true
  redact_sensitive_fields: true
memory:
  write_mode: review_required
  store_raw_page_content: false
```

## Authority Classes

| Class | Examples | Default |
|---|---|---|
| Read | Open page, inspect text, collect citation | Allowed inside allowlisted domains. |
| Draft | Fill form without submit, draft message, select options | Allowed in propose mode. |
| Submit | Send form, post message, publish, create account | Human approval required. |
| Financial | Purchase, bid, subscribe, transfer, connect wallet | Blocked unless a dedicated financial policy explicitly authorizes it. |
| Identity | Login, password change, MFA, KYC, account recovery | Blocked from autonomous execution. |
| Destructive | Delete, revoke, uninstall, remove records, overwrite | Human approval plus before/after evidence required. |
| Exfiltration | Upload local files, paste private data, expose tokens | Denied unless exact files and destination are approved. |

## Installation Doctrine

Do not normalize blind remote-script execution.

Before any installer runs:

1. Resolve the full repository and exact release or commit.
2. Review the script contents.
3. Verify maintainer identity and repository history.
4. Pin a commit or signed release when possible.
5. Record the expected files and permissions.
6. Run inside a disposable or recoverable environment first.
7. Capture an installation receipt.
8. Never place API keys inside commands, prompts, screenshots, or repository files.

Commands such as `curl ... | bash` or PowerShell remote execution are treated as convenience wrappers, not trusted installation evidence.

## Memory Doctrine

Browser history is not automatically agent memory.

The memory pipeline is:

```text
session observations
  -> sensitive-data filter
  -> task summary
  -> human review
  -> approved memory record
  -> versioned memory store
```

Never persist:

- passwords, recovery codes, API keys, cookies, session tokens, or wallet secrets
- private messages or account data unrelated to the approved task
- complete page dumps when a short factual summary is sufficient
- inferred personal attributes that the user did not ask to store

## Core Outputs

| Output | Purpose |
|---|---|
| Task contract | Defines authority, domains, limits, and stop conditions. |
| Prompt analysis | Identifies ambiguity, missing inputs, and risk before execution. |
| Research plan | Specifies queries, sources, and evidence requirements. |
| Browser plan | Lists intended browser steps without performing them. |
| Approval packet | Shows the exact consequential action awaiting authorization. |
| Evidence bundle | Captures source URLs, page titles, timestamps, and redacted before/after state. |
| Execution receipt | Records actions attempted, completed, blocked, or failed. |
| Memory proposal | Provides a reviewable summary before persistent storage. |
| Handoff packet | Routes results to Creator, CHAOS RANK, publishing, coding, or another district skill. |

## Guardrails

- Use an isolated automation browser profile; do not default to the user's daily personal profile.
- Do not claim a browser action occurred unless a tool receipt confirms it.
- Do not invent extension permissions, provider availability, pricing, limits, or credential status.
- Do not expose or store raw secrets.
- Do not bypass CAPTCHAs, MFA, access controls, paywalls, or anti-bot protections.
- Do not automate purchases, financial transfers, wallet approvals, account recovery, password changes, or KYC flows under the general browser skill.
- Do not upload files unless the exact file and destination are approved.
- Do not download executables or run installers without a separate installation approval packet.
- Stop when the page state differs materially from the approved plan.
- Require a human review before public publishing or persistent memory writes.

## Activation Phrases

- "use Hermes to research this in my browser"
- "open these sites and compare them"
- "fill this out but do not submit"
- "prepare the browser steps for me"
- "run this approved browser workflow"
- "use interactive prompt analyzer and deep web research"
- "set up a bounded browser batch"
- "show me what Hermes would click before it clicks"
- "create a browser automation receipt"

## Canon Decision

Adopt **Hermes Browser Operator** as a Creator Foundry infrastructure skill candidate.

```text
CREATOR browser orchestration skill
not unrestricted browser control
not a standalone district
not a hard dependency on Kimi WebBridge or NVIDIA
BYOK and isolated-session default
AGENTROPOLIS-AGENT-MCP gated
AEGIS policy governed
human approval before consequential action
```
