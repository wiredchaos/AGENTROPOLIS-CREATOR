# Browser Task Contract Reference

Use this reference when converting a user request into a bounded browser workflow.

## Minimum Contract

```yaml
task_id: browser-task-001
requested_by: human
operator: hermes-browser-operator
mode: observe | propose | execute_with_approval | bounded_batch
objective: ""
allowed_domains: []
blocked_domains: []
allowed_actions: []
blocked_actions: []
session:
  profile: isolated_automation_profile
  reuse_personal_session: false
  retain_cookies: false
credentials:
  mode: byok
  secret_values_visible_to_agent: false
  required_secret_refs: []
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

## Approval Packet

Use this before any consequential action:

```yaml
approval_packet:
  task_id: browser-task-001
  action_id: action-001
  action_class: submit | destructive | upload | download | install | publish
  domain: example.com
  page_title: ""
  exact_action: ""
  exact_payload_summary: ""
  data_leaving_device: []
  expected_state_change: ""
  reversibility: reversible | partially_reversible | irreversible | unknown
  evidence_before_ref: ""
  limits_consumed:
    submissions: 1
    uploads: 0
    downloads: 0
  approval_required: true
```

Approval applies only to the action described. It does not widen the domain list, action list, payload, or batch limit.

## Stop Conditions

Common stop conditions include:

- unexpected login or permission prompt
- domain redirect outside allowlist
- CAPTCHA or MFA challenge
- page structure materially different from plan
- requested data exceeds approved scope
- file upload or download not listed in contract
- cost, subscription, payment, or wallet interaction appears
- destructive action appears
- action count reaches maximum
- browser bridge disconnects or changes capability
- evidence capture fails for a consequential action

## Evidence Requirements

For observation tasks, capture enough information to support each returned claim.

For state-changing tasks, capture:

1. page title and URL
2. redacted state before action
3. exact approved action
4. tool or browser receipt
5. redacted state after action
6. any error or unexpected change

Do not use screenshots as a substitute for structured receipts when both are available.

## Memory Proposal

```yaml
memory_proposal:
  task_id: browser-task-001
  status: proposed | rejected | approved
  summary: ""
  durable_facts: []
  reusable_preferences: []
  workflow_lessons: []
  excluded_sensitive_data: []
  source_receipt_refs: []
```

A memory proposal must exclude raw secrets, cookies, session tokens, private page dumps, and unrelated personal data.
