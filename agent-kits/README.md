# AGENTROPOLIS District Agent Kits

Every Agentropolis district must ship an Agent Kit. A kit is the governed deployment contract that turns a district mandate into a bounded team of agents, skills and MCP capabilities.

## Required kit fields

- `id`, `district`, `version`, `status`
- `mission` and explicit non-goals
- agent roles and human escalation owner
- skill packages and activation triggers
- allowed MCP capabilities
- policy profile and data boundaries
- memory scope and retention
- input and output contracts
- receipt and audit requirements
- evaluation suite
- install and rollback instructions

## Canonical package layout

```text
agent-kits/<district-id>/
  kit.yaml
  README.md
  agents/
  skills/
  policies/
  evals/
  examples/
```

## Execution doctrine

```text
Human mandate
  -> district kit router
  -> planner / specialists / skeptic
  -> MCP capability membrane
  -> sandboxed execution
  -> output manifest
  -> receipt
  -> audit
  -> human review
```

No district agent receives ambient access to the entire city. Capabilities are allowlisted per kit and per mission.

## Rollout

1. Creator Construction District reference kit
2. Registry schema and validation
3. Kit manifests for every active district
4. Installable bundles and CI validation
5. District-specific evals and red-team suites
