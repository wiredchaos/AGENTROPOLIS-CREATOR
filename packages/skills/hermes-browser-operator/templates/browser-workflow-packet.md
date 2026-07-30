# Hermes Browser Workflow Packet

## 1. Intent Analysis

**Objective:**

**Requested mode:** observe | propose | execute_with_approval | bounded_batch

**Risk class:** low | moderate | high | blocked

**Verified facts:**

- 

**User-provided facts:**

- 

**Assumptions:**

- 

**Unresolved questions:**

- 

## 2. Task Contract

```yaml
task_id: ""
requested_by: human
operator: hermes-browser-operator
mode: observe
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

## 3. Bridge Readiness

```yaml
bridge_readiness:
  adapter: ""
  version: ""
  source_verified: unknown
  permissions_reviewed: false
  isolated_profile: false
  connected: unknown
  can_observe: unknown
  can_act: unknown
  blocked_reason: unverified_adapter
```

## 4. Research Plan

| Question | Source target | Evidence required |
|---|---|---|
|  |  |  |

## 5. Browser Plan

1. 
2. 
3. 

## 6. Approval Packet

```yaml
approval_packet:
  required: false
  action_id: ""
  action_class: ""
  domain: ""
  exact_action: ""
  exact_payload_summary: ""
  data_leaving_device: []
  expected_state_change: ""
  reversibility: unknown
```

## 7. Execution Status

```yaml
status: planning_only
blocked_reason: ""
next_safe_action: ""
```

## 8. Evidence Bundle

```yaml
evidence_bundle:
  task_id: ""
  captured_at: ""
  sources: []
  screenshots: []
```

## 9. Execution Receipt

```yaml
execution_receipt:
  task_id: ""
  status: blocked
  mode: observe
  actions_attempted: []
  actions_completed: []
  actions_blocked: []
  actions_skipped: []
  approvals:
    required: false
    received: false
    scope: ""
  limit_usage:
    steps_used: 0
    submissions_used: 0
    downloads_used: 0
    uploads_used: 0
  evidence_refs: []
  errors: []
  next_safe_action: ""
```

## 10. Memory Proposal

```yaml
memory_proposal:
  status: proposed
  summary: ""
  durable_facts: []
  reusable_preferences: []
  workflow_lessons: []
  excluded_sensitive_data: []
  source_receipt_refs: []
```

## 11. Handoff Targets

- 
