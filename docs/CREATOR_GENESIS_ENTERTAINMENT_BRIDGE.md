# Creator Genesis × Entertainment District Bridge

## Purpose

This bridge preserves the useful AGENTROPOLIS AI Hollywood Studio concept while placing it inside the current architecture. The old demo has been promoted into a real command surface with canonical, machine-readable contracts shared between the Creator District and the Entertainment District.

```text
Human creative mandate
  -> Creator Genesis
  -> project RAG and production contracts
  -> governed creator agents (NEXUS, ARCHITECT, SCRIBE, PRAXIS, EGOS)
  -> human/council approval
  -> Agentic Studios
  -> audience classification
  -> 789 Studios or NTRU Studios
  -> AGENT TV NETWORK or NTRU-OTT
  -> production receipts return to Mission Control
```

## Repository ownership

- `AGENTROPOLIS-CREATOR` owns Creator Genesis, preproduction, references, prompts, assets, governed production loops, RAG, and package assembly.
- `agentropolis/districts/entertainment` owns Agentic Studios, audience routing, studio commissioning, entertainment production state, and distribution destinations.
- HERMES plans and dispatches work but does not self-approve public release.
- AGENTROPOLIS-AGENT-MCP remains the governed execution membrane for external tools and model runtimes.

## Canonical contracts (single source of truth)

The bridge is backed by JSON Schema contracts that live in the canonical monorepo, not in this repository. They are the machine-readable interface between the districts:

| Contract | Location | Purpose |
|---|---|---|
| Creator Genesis Production Contract | `agentropolis/contracts/creator-genesis-production-contract.schema.json` | project state, provenance, project RAG, six-decision production contract, artifact graph, continuity, bounded recursive loops, authority gates, receipts |
| Entertainment Routing Decision | `agentropolis/contracts/entertainment-routing-decision.schema.json` | audience classification -> studio lane -> destination, with the 789/NTRU lane-separation invariant |
| Production Thermodynamic Telemetry | `agentropolis/contracts/production-telemetry.schema.json` | semantic drift, context entropy, convergence, duplicate work, correction load, useful work, compute/budget pressure |

Example instances:

- `agentropolis/contracts/examples/creator-genesis-production-contract.example.json`
- `agentropolis/contracts/examples/entertainment-routing-decision.example.json`
- `agentropolis/contracts/examples/production-telemetry.example.json`

Validation tests run in the canonical repo: `src/test/creator-genesis-entertainment-contracts.test.ts`.

## Shared production agents

| Agent | Responsibility |
|---|---|
| NEXUS | Production orchestration and handoffs |
| ARCHITECT | World, environment, lore, and constraints |
| SCRIBE | Story, dialogue, scripts, and scene contracts |
| PRAXIS | Direction, camera grammar, pacing, and performance |
| EGOS | Character identity, visual language, and art direction |

These identities are production roles, not unrestricted autonomous authorities.

## Command surfaces

The command surfaces are explicitly labeled simulation mode. They do not call external models, publish content, spend funds, or mutate canonical memory. Telemetry that is not instrumented is displayed as `UNKNOWN` / `NOT INSTRUMENTED` — no fabricated metrics.

- Creator District intake: `demos/agentic-studios-command.html` (this repository)
- Entertainment District production: `agentropolis/districts/entertainment/demos/agentic-studios-command.html`

## Governance requirements

A production package may move from Creator Genesis into the Entertainment District only after:

1. project and source provenance are present;
2. audience classification is complete;
3. rights and likeness review is complete where relevant;
4. drift and entropy remain inside policy thresholds (where instrumented);
5. the human director approves the package;
6. a production receipt is issued.

## Audience routing

```text
Youth, family, education, cartoons
  -> 789 Studios
  -> AGENT TV NETWORK

Mature cinema, adult animation, cyberpunk, psychological, underground, experimental
  -> NTRU Studios
  -> NTRU-OTT
  -> selected public-safe transmissions may reach AGENT TV NETWORK
```

The two audience lanes must remain operationally separated.

## Telemetry honesty policy

Thermodynamic telemetry (semantic drift, context entropy, convergence, duplicate work, correction load, useful work, compute/budget pressure) is only displayed when a real instrument produced it. Where telemetry is unavailable, the surface must show `UNKNOWN` or `NOT INSTRUMENTED`. Fabricated percentages are a violation.

## Authority

No agent may autonomously: publish, spend $XENTS, modify canonical memory, authorize a mature/youth routing change, bypass Council/Verifier gates, or execute irreversible external actions.

## Runtime handoff

The provider-neutral executable-path design, default-deny state machine, verification strategy, and remaining implementation gaps are documented in [`CREATOR_GENESIS_RUNTIME_HANDOFF_PLAN.md`](./CREATOR_GENESIS_RUNTIME_HANDOFF_PLAN.md). That plan is not a claim that end-to-end runtime integration already exists.
