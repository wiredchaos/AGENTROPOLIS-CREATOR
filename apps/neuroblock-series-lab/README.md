# NEUROBLOCK SERIES LAB

Episodic continuity and production planning for AI-native series.

## MVP

NEUROBLOCK SERIES LAB is an original creator-facing planning workspace inside AGENTROPOLIS-CREATOR. It applies the same productization pattern used for the NEUROBLOCK STUDIO MVP, but targets recurring casts, episode arcs, threat escalation, and continuity drift.

Current MVP features:

- episode grid with readiness scoring
- reusable character bible
- relationship-state matrix
- threat escalation tracker
- per-episode scene / camera / lighting / dialogue / continuity contracts
- continuity drift warnings across adjacent episodes
- Agent Showrunner suggestions
- local browser persistence
- structured episode packet export
- seeded original sci-fi demo series

## Run

Open `index.html` in a modern browser.

## Planned integration

```text
NEUROBLOCK SERIES LAB
  -> AGENTROPOLIS-CREATOR
  -> AGENTROPOLIS-AGENT-MCP for governed model, Higgsfield, and tool routing
  -> ASBE for production orchestration, policy, and receipts
  -> AGENTROPOLIS-GAMING-DISTRICT for reusable characters, environments, and spatial state
  -> AGENTROPOLIS-GTM for trailers, clips, campaigns, and distribution
```

## Higgsfield / Zephyr lesson

The reference pattern is a recurring AI-native cinematic series with persistent characters, episodic action, and reusable visual language. This implementation does not copy proprietary characters, footage, prompts, or assets. It extracts the workflow requirement: continuity must be represented as structured state that can be validated before generation.

## Governance

This MVP is local and rule-based. External model calls, asset generation, publishing, browser execution, and MCP tool access remain gated by explicit capability permissions, human review, ASBE policy checks, and permanent execution receipts.
