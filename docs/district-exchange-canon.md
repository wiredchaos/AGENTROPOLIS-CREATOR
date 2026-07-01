# District Exchange Canon

## Canon Stack

```text
Agentropolis
= the city

AGENTROPOLIS-CREATOR
= the foundry

District Exchange
= the capability exchange for Agentropolis
```

## Role

District Exchange is the capability exchange for Agentropolis.

It is not a generic app store.

It is the city-native exchange where districts publish governed, tagged, executable capability packages.

## What Ships Here

| Package Type | Meaning |
| --- | --- |
| Skills | atomic executable capabilities |
| Agents | role-based operators with memory, tools, and boundaries |
| Workflows | multi-step execution routes across agents and tools |
| Templates | reusable documents, prompts, layouts, specs, and outputs |
| Evaluation Suites | tests that prove whether a skill or workflow works |
| MCP Kits | connector/tool bundles mapped to governed actions |
| WorldForge Packs | 3D scenes, district specs, world-model workflows, and media-ready environments |
| Commerce Kits | offers, checkout flows, wallet logic, and settlement patterns |
| Production Pipelines | repeatable end-to-end systems for shipping client or city outputs |

## How It Fits

```text
AGENTROPOLIS-CREATOR builds and verifies capability packages.
District Exchange indexes, distributes, and routes them.
Agentropolis consumes them as city infrastructure.
```

## Package Standard

Every District Exchange package should include:

```text
package/
  README.md
  metadata.yaml
  skill.md or workflow.md
  examples/
  templates/
  evals/
  mcp/
  governance.md
  changelog.md
```

## Metadata Standard

```yaml
name: ""
package_type: skill | agent | workflow | template | eval_suite | mcp_kit | worldforge_pack | commerce_kit | production_pipeline
district: ""
tier: core | extended | guild | experimental
status: draft | candidate | verified | deprecated | blocked
risk_level: low | medium | high
inputs: []
outputs: []
tools: []
mcp_adapters: []
eval_suites: []
tags: []
owner: ""
version: "0.1.0"
requires_human_approval: true
```

## Search Model

District Exchange must make packages searchable by:

- intent
- district
- package type
- output type
- required tools
- MCP adapter
- industry
- risk level
- execution mode
- verification status
- commerce model

## Execution Model

A package is not considered production-ready unless it supports:

```text
Trigger -> Intake -> Execute -> Validate -> Output -> Log
```

## Foundry Targets

Long-term target inventory:

```text
4,200 Skills
180 MCP Adapters
95 Agent Workflows
900 Templates
340 Evaluation Suites
120 Production Pipelines
65 WorldForge Packs
22 Commerce Kits
```

These numbers are roadmap targets, not claims of current inventory.

## Governance Rule

District Exchange may list experimental packages, but only verified packages can be promoted into canonical Agentropolis infrastructure.

## Canon Line

> Agentropolis is the city.  
> AGENTROPOLIS-CREATOR is the foundry.  
> District Exchange is the capability exchange for Agentropolis.