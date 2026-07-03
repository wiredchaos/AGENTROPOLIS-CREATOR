# NVIDIA NIM Model Pack Candidate

## Role in AGENTROPOLIS-CREATOR

NVIDIA NIM is captured here as a model-pack candidate for the Agentropolis Foundry.

CREATOR may use this signal to design provider metadata, eval targets, model-pack manifests, and routing test fixtures. CREATOR must not pull live private runtime state and must not commit secrets.

## Candidate pack name

```text
nvidia-nim-openai-compatible-pack
```

## Provider pattern

```text
base_url: https://integrate.api.nvidia.com/v1
auth_env: NVAPI_KEY
compatibility: OpenAI-compatible
```

## Candidate models

| Model | Foundry test role | Suggested eval focus |
| --- | --- | --- |
| `minimaxai/minimax-m3` | Coding assistant candidate | Code patch quality, test generation, refactor safety |
| `qwen/qwen3.5-397b-a17b` | Reasoning council candidate | Planning, analysis, contradiction detection |
| `moonshotai/kimi-k2.6` | Agent workflow candidate | Long-chain task planning, tool-use planning |
| `zhipuai/glm-5.1` | General assistant candidate | Summaries, ordinary resident-agent tasks |
| `deepseek/deepseek-v4-flash` | Fast worker candidate | Latency, throughput, low-risk transformations |

## Foundry package pipeline

```text
provider signal
  -> model-pack candidate
  -> capability metadata
  -> eval fixture
  -> risk review
  -> rollback path
  -> handoff manifest
  -> MCP/provider registry adoption candidate
```

## Required sidecars

A production-ready model pack should include:

- provider metadata
- model IDs
- allowed lanes
- blocked lanes
- eval report
- cost and rate-limit notes
- risk review
- fallback behavior
- rollback path
- handoff manifest

## Default risk posture

```yaml
provider_id: nvidia_nim
status: candidate
trust_tier: experimental
creator_use: evals_and_fixtures_only
allowed_lanes:
  - advisory
  - sandbox
blocked_lanes:
  - wallet_execution
  - autonomous_payment
  - regulated_client_work
  - private_runtime_state
```

## Guardrails

- No API keys in repo.
- No `.env` files in repo.
- No client data in eval fixtures.
- No private city runtime state in CREATOR.
- No model becomes canonical without evaluation and approval.

## Handoff target

Once evaluated, this pack can hand off metadata to:

```text
AGENTROPOLIS-CREATOR
  -> AGENTROPOLIS-AGENT-MCP
  -> agentropolis Model Exchange
  -> HERMES-CITY public-safe signal summary
```
