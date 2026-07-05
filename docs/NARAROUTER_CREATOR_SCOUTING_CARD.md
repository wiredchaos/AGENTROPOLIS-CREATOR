# NaraRouter Creator Scouting Card

NaraRouter is tracked as a creator-side model routing candidate for AGENTROPOLIS-CREATOR.

This belongs in the Foundry as a scouting card, not as a guaranteed production dependency.

## What It Is

NaraRouter appears to offer an OpenAI-compatible API gateway with multiple backend models behind one base URL.

Operator-reported signal:

```text
Provider: NaraRouter
Base URL: router.bynara.id/v1
Model pool: 30+ models
Reported models: Mistral, DeepSeek, GLM, and related backends
Reported free capacity: up to roughly 7M tokens/day
Reported reset: daily
Credit card: operator-reported no credit card
```

## Why CREATOR Cares

AGENTROPOLIS-CREATOR can use NaraRouter as a rapid test lane for:

- character and NPC prompt drafts
- script variants
- scene descriptions
- model-comparison cards
- prompt-pack stress tests
- coding-agent prototype tasks
- low-risk bulk summarization
- Foundry eval generation

## Foundry Boundary

Do not treat the free quota as stable until verified.

```text
NaraRouter claim
  -> dashboard verification
  -> model list capture
  -> terms check
  -> prompt eval
  -> quality receipt
  -> handoff to AGENTROPOLIS-AGENT-MCP if useful
```

CREATOR scouts and tests.

AGENTROPOLIS-AGENT-MCP governs live routing.

agentropolis consumes only approved runtime references.

## Scouting Receipt

```yaml
provider_id: nararouter
provider_name: NaraRouter
adapter_type: openai_compatible
base_url: router.bynara.id/v1
free_tier_status: dashboard_verify_required
reported_quota: operator_reported_up_to_7m_tokens_daily
reported_reset: daily
model_pool_seen: string
credit_card_required: true_or_false
terms_checked: true_or_false
creator_use_case: string
eval_prompt_set: string
latency_notes: string
quality_notes: string
pass_fail: string
last_verified: YYYY-MM-DD
```

## Safe First Tests

Start with non-sensitive creative and code-draft prompts:

- 3D room copy
- UI panel descriptions
- NPC dialogue variants
- README scaffolds
- prompt compression
- asset naming
- non-sensitive repo summaries

## Do Not Use For

- private lore keys
- private client files
- wallet actions
- production writes
- legal, tax, medical, or financial execution
- anything requiring stable SLA guarantees

## Human Read

NaraRouter may be useful free horsepower.

But free horsepower is not governance.

The Foundry can test it. The routing membrane decides whether it graduates.