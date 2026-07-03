# Provider-Agnostic Terminal Foundry Lane

AGENTROPOLIS-CREATOR may use terminal coding agents for foundry work, but the lane must remain provider-agnostic.

CREATOR does not require Claude, Claude Code, Spawn, or any provider-locked shell.

## Foundry Route

```text
Foundry idea
  -> candidate package
  -> terminal build lane if approved
  -> structure validation
  -> provenance review
  -> license review
  -> risk review
  -> handoff manifest
  -> registry candidate
```

## Good Uses

The terminal lane may help generate or edit:

- package manifests
- skill templates
- workflow templates
- MCP kit drafts
- eval suite drafts
- metadata sidecars
- reference-lock reports
- code scaffolds for non-sensitive tools
- documentation and release notes

## Model Lane Pattern

The terminal lane should support replaceable providers:

- OpenAI-compatible endpoints
- OpenRouter-compatible endpoints
- Gemini-compatible endpoints
- Groq-compatible endpoints
- DeepSeek-compatible endpoints
- Ollama / local model endpoints
- GitLawb Opengateway-compatible endpoints

## Guardrails

- Keep live runtime state out of CREATOR.
- Keep private City Canon in the private Agentropolis core.
- Require metadata sidecars for generated or imported assets.
- Require provenance and license checks before handoff.
- Require validation receipts before District Exchange adoption.
- Do not let terminal agents bypass MCP policy gates.

## Position

The terminal lane is a construction tool.

It builds candidate packages. It does not decide what becomes permanent city infrastructure.