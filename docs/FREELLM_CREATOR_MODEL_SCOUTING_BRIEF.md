# FreeLLM Creator Model Scouting Brief

## Canon Lock

FreeLLM is a **creator-side model scouting directory**, not a permanent production dependency.

Use it to discover, compare, and test free API-accessible models before promoting any provider into AGENTROPOLIS-AGENT-MCP routing or private Agentropolis runtime infrastructure.

```text
FreeLLM
  -> scouting directory
  -> config reference
  -> rapid prototype lane
  -> provider comparison surface
  -> NOT canonical production routing by itself
```

## What It Is

FreeLLM tracks free LLM and AI API resources across multiple providers, including Google, Groq, NVIDIA NIM, OpenRouter, Mistral, Cohere, Cloudflare Workers AI, Cerebras, and others.

The public site describes itself as a directory for comparing free AI APIs with rate limits, context windows, key links, and config snippets for OpenAI-compatible tools.

The companion GitHub project is `open-free-llm-api/awesome-freellm-apis` and is MIT licensed.

## Why CREATOR Cares

AGENTROPOLIS-CREATOR can use FreeLLM as a Foundry accelerator for:

- model scouting for character, scene, script, and prompt workflows
- side-by-side tests across DeepSeek, MiniMax, Kimi, GLM, Qwen, Mistral, Gemini, Groq, and OpenRouter-backed models
- cheap prototype lanes before paid API promotion
- creator-facing config cards for tools like Codex, Cursor, Cline, Hermes, OpenClaw, and OpenAI-compatible clients
- benchmark prompts for district assets, NPC dialogue, visual briefs, media scripts, and workflow packages

## Boundary Rule

Free models are not free infrastructure.

Treat every listed model as volatile until verified.

```text
Listed model
  -> verify current provider
  -> verify rate limit
  -> verify credit card / phone requirement
  -> verify license and acceptable-use terms
  -> run eval prompt set
  -> record result
  -> only then hand off to AGENTROPOLIS-AGENT-MCP
```

## Correct Repo Placement

This belongs in AGENTROPOLIS-CREATOR as a **model scouting and creator config brief**.

It may also inform AGENTROPOLIS-AGENT-MCP later, but CREATOR should not directly install live provider routing into production systems.

```text
AGENTROPOLIS-CREATOR
  -> documents scouting lane
  -> builds prompt packs and comparison cards
  -> creates Foundry eval assets

AGENTROPOLIS-AGENT-MCP
  -> validates providers
  -> routes approved model council choices
  -> stores handoff metadata

agentropolis
  -> consumes only approved runtime references
```

## Recommended First Pass

### Candidate test models

- MiniMax M3
- DeepSeek V4 Pro
- DeepSeek V4 Flash
- Kimi K2.6
- GLM 5.1
- Qwen family models
- Mistral free-tier models
- Groq-hosted fast inference models
- OpenRouter free-tier models

### Test categories

- coding agent prompt execution
- long-context lore digestion
- NPC dialogue consistency
- image/video prompt generation
- JSON schema reliability
- refusal and safety behavior
- latency and rate-limit stability
- provider availability drift

## Foundry Output Format

Each tested model should produce a short receipt:

```yaml
model_id:
provider:
source_url:
free_tier_status:
rate_limit:
context_window:
modalities:
openai_compatible: true_or_false
requires_credit_card: true_or_false
requires_phone: true_or_false
license_or_terms_checked: true_or_false
creator_use_case:
eval_prompt_set:
pass_fail:
notes:
last_verified:
```

## Production Warning

Do not hard-code FreeLLM listings as stable production routes.

Do not commit API keys, dashboard exports, personal provider tokens, or copied secrets.

Do not assume a model remains free, online, unrestricted, or OpenAI-compatible without fresh verification.

## Human Read

This is useful, but keep it leveled:

FreeLLM is a map, not the territory.

It is excellent for testing and discovery. Production still needs governed provider contracts, evals, fallbacks, spend controls, and AGENTROPOLIS-AGENT-MCP approval.
