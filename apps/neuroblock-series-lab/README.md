# NEUROBLOCK SERIES LAB

Episodic continuity and production planning for AI-native series.

## Status

Production-ready Creator District component (local-first, governed, provider-neutral).

NEUROBLOCK SERIES LAB is an original creator-facing planning workspace inside
AGENTROPOLIS-CREATOR. It applies the same productization pattern used for the
NEUROBLOCK STUDIO MVP, but targets recurring casts, episode arcs, threat
escalation, continuity drift, and serialized generation control.

## Features

- episode grid with readiness scoring and approval states
- series control: title, logline, genre, status, visual grammar, generation constraints, canon facts
- reusable character bible with full identity packages (anchors, variations, forbidden drift, rights metadata)
- relationship-state matrix (trust, conflict, alliance, betrayal, authority)
- threat escalation tracker (species, capability, escalation, known behavior, countermeasures)
- per-episode production contracts: intent, story objective, scene list, cast, location, camera, lighting, performance, dialogue anchors
- structured continuity state per episode across CHARACTER / PROP / RELATIONSHIP / ENVIRONMENT / THREAT / CINEMATIC / NARRATIVE
- continuity validation layer with INFO / WARNING / BLOCKING severity and human overrides
- continuity receipts per episode (validated structured state, not raw generation)
- Series Context Packet export (deterministic, provider-neutral, RAG-ready)
- Agent Showrunner bounded advisory engine (missing info, contradictions, transitions, threads, shot planning, assets, risk, packets)
- Drift / Entropy observability with a heuristic Series Entropy Score
- capability-based provider routing (Higgsfield, MiniMax H3, Seedance, local, BYOK) — never hard-wired
- local browser persistence with schema versioning, legacy migration, and corrupt-payload quarantine
- seeded original sci-fi demo series (ORBITAL WIDOWS)

## Run

Open `index.html` in a modern browser. No build step, no dependencies, no API keys.

## Architecture

```text
Series Production Contract
  -> Runtime Router (capability-based, provider-neutral)
  -> approved provider / adapter (Higgsfield | MiniMax H3 | Seedance | local | BYOK)
  -> generation
  -> media diff
  -> continuity comparison
  -> human review
  -> receipt
```

```text
Episode N
  -> approved continuity state
  -> continuity receipt
  -> retrieval context (Series Context Packet)
  -> Episode N+1 planning
  -> drift validation
  -> generation approval
```

Provider routing never auto-selects a live provider. The canonical state
carries no provider-specific objects, prompt syntax, or credentials. Provider
IDs and reference assets stay adapter-level.

## Integration

```text
NEUROBLOCK SERIES LAB
  -> AGENTROPOLIS-CREATOR (owns the production contract)
  -> AGENTROPOLIS-AGENT-MCP (governed execution membrane; read-only public tools,
     authority ceiling, receipts)
  -> ASBE (orchestration, policy evidence, receipts — never a decision authority)
  -> approved model / tool adapter (Higgsfield, MiniMax H3, Seedance, local, BYOK)
  -> AGENTROPOLIS-GAMING-DISTRICT (reusable characters, environments, spatial state)
  -> AGENTROPOLIS-GTM (trailers, clips, campaigns, distribution — human-approved release)
```

The Episode Production Contract produced by this app is compatible with the
existing Creator Prompt Contract architecture
(`docs/CREATOR_PROMPT_CONTRACT.md`): route / spec / beats / copy / technique /
negatives plus episode-specific production fields. The app emits
`compatibility: creator-prompt-contract-v1` on every contract.

Related lanes this component plugs into (see repo docs):

- `docs/STORYBOARD_REFERENCE_INTELLIGENCE_LANE.md`
- `docs/HIGGSFIELD_MCP_CREATOR_LANE.md`
- `docs/SEEDANCE_2_CREATOR_VIDEO_LANE.md`
- `docs/UNREAL_MCP_FOUNDRY_LANE.md` (Gaming District)
- `docs/CREATOR_GENESIS_ENTERTAINMENT_BRIDGE.md` (GTM / distribution)
- `registry/media-mcp-adapters.md`

## Continuity System

Persisted state (schema v2, key `neuroblock.serieslab.v2`):

- series metadata + visual grammar + generation constraints + canon facts
- character bible (identity packages with rights metadata)
- relationship matrix (bible-level)
- episode ledger (per-episode continuity state + approval state + human overrides)
- receipts + entropy history + override ledger

Legacy v1 (unversioned) payloads migrate automatically. Malformed or outdated
saved state fails safe: the corrupt payload is quarantined under
`neuroblock.serieslab.corrupt.*` and the workspace starts blank rather than
crashing. One bad payload can never destroy the workspace.

Continuity validation compares adjacent episodes across seven categories and
emits severity-flagged warnings. Warnings are overridable; an override must
carry a reason and is documented in the receipt (`authorized_by: human`).
BLOCKING violations block the generation gate.

## Entropy / Drift

The Series Entropy Score is a heuristic operational observability metric (0-100)
derived from drift indicators: continuity drift, character drift, visual drift,
narrative drift, relationship drift, prompt inflation, contradiction density,
and unresolved-thread accumulation. It is explicitly not information-theoretic
entropy and not a quality score. Output includes `entropy_score`, `drift_sources`,
`severity`, and `recommended_correction`.

## Governance

- local and rule-based; external execution remains gated
- human approval gates: episode draft -> ready_for_review -> approved
- generation gate blocked while BLOCKING continuity violations remain
- quarantine-first ingestion for corrupt or legacy state
- rights / provenance metadata on character identity packages
- no secrets, credentials, or provider objects in canonical state or context
- capability-scoped execution; provider routing unresolved until a governed adapter is selected
- permanent execution receipts (downloadable JSON)
- media diff before release; no autonomous publishing
- Higgsfield remains an execution adapter, never the sovereign creative brain

## Tests

Node >= 20. No dependencies.

```bash
node tests/series-lab.test.mjs
```

The harness extracts the inline script, runs `node --check` for syntax, and
covers: schema validation, v1 migration, persistence + corrupt recovery,
continuity categories, receipts, context packet, production contract, routing,
showrunner, entropy, generation gate, DOM render smoke tests, and
interaction-level flows (episode lifecycle, overrides, editing, approval
transitions, export path).

Manual verification steps (where a browser is required): mobile layout below
980px, dialog-gated override/delete flows, file download exports, localStorage
behavior across reloads.

## Higgsfield / Zephyr lesson

The reference pattern is a recurring AI-native cinematic series with persistent
characters, episodic action, and reusable visual language. This implementation
does not copy proprietary characters, footage, prompts, or assets. It extracts
the workflow requirement: continuity must be represented as structured state
that can be validated before generation.
