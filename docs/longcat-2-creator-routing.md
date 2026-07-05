# LongCat 2.0 Creator Routing Notes

## Status

LongCat 2.0 is approved as an optional backend for creator build workflows, not as a creative brand lane.

AGENTROPOLIS-CREATOR should use it only when the creator task becomes technical, code-heavy, tool-heavy, or repository-heavy.

## Source

Upstream repository: https://github.com/meituan-longcat/LongCat-2.0

Source-gated facts from upstream:

- MIT licensed repository.
- Large scale MoE model.
- 1.6T total parameters with about 48B active per token.
- 1M context training emphasis.
- Designed for coding, repository-level edits, automated task execution, and agent workflows.
- Upstream mentions Claude Code, OpenClaw, and Hermes integration.

## Creator Fit

Use LongCat 2.0 for:

1. Converting creative specs into implementation plans.
2. Reviewing multi-file creator app code.
3. Planning MCP-connected creator tools.
4. Generating technical scaffolds.
5. Debugging repo-level creator pipelines.
6. Long context analysis of product docs.

Do not use LongCat 2.0 as the primary voice for:

- Brand captions.
- Lore scripts.
- DBN or BWB style segments.
- Character dialogue.
- Social content.
- Visual prompt styling unless code context is involved.

## Routing Pattern

```text
creative request
  -> brand/lore model lane

creative request with code, tools, repo, or automation
  -> LongCat 2.0 candidate lane
  -> Hermes or MCP executes with fallback
```

## Guardrail

LongCat is a backend engine. It should not become a public Agentropolis product name, district, or lore artifact.

## Doctrine Lock

Creator owns the creative surface. Hermes and MCP route the technical execution. LongCat may power the technical lane when it fits.
