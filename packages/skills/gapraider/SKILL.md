---
name: gapraider
description: review-first creator search intelligence skill for finding evidence-backed content gaps, scoring opportunities, and generating daily content packs without inventing platform metrics. use when agentropolis creator needs seed-keyword research, source normalization, search-intent analysis, ranked content opportunities, short-form scripts, social copy, recruitment CTAs, or execution receipts.
---

# GAPRAIDER

Use this skill to convert seed keywords and source evidence into a ranked daily content-gap report for the AGENTROPOLIS Creator Foundry.

## Core rule

Observed evidence and generated interpretation must remain separate.

```text
seed keywords
  -> approved source adapters
  -> evidence normalization
  -> intent analysis
  -> opportunity scoring
  -> content pack generation
  -> human review queue
  -> content gap board
  -> execution receipt
```

## Inputs

Require or infer:

- seed keywords
- target audience
- target platforms
- AGENTROPOLIS lane or district
- review owner
- source access status
- run timestamp

## Source states

Every source must be marked as one of:

- `connected`
- `manual_required`
- `unavailable`
- `blocked_by_policy`

Never simulate inaccessible data.

## Required output

Produce up to five ranked opportunities. Each opportunity must include:

- keyword
- source records
- search intent
- audience pain
- competition level
- evidence notes
- opportunity score
- urgency score
- hook
- 30-second script
- X post
- caption
- hashtags
- AGENTROPOLIS CTA
- review status

Also produce:

1. Markdown report
2. JSON report
3. execution receipt

## Scoring

Use 1 to 5 integer scores:

- demand
- pain
- AGENTROPOLIS fit
- monetization path
- urgency
- competition
- evidence confidence

```text
raw_opportunity = demand + pain + fit + monetization + urgency - competition
confidence_adjusted = raw_opportunity * (evidence_confidence / 5)
```

Do not label demand as search volume unless the source provides a measured value.

## Human review gate

No generated content may be published automatically in Phase 1.

Allowed review states:

- `draft`
- `needs_evidence`
- `ready_for_review`
- `approved`
- `rejected`

## Receipt requirements

Record:

- run ID
- timestamp
- seed keywords
- source states
- evidence references
- scoring inputs
- model or route used
- generated artifact hashes when available
- reviewer state
- publishing state

## Guardrails

- Never invent search volume, competition metrics, views, or trend velocity.
- Preserve source timestamps and URLs where available.
- Clearly label inferred intent and inferred pain.
- Do not expose credentials or private source content.
- Route paid or authenticated provider access through approved MCP and policy gates.
- Keep generated copy separate from supporting evidence.
- Require explicit approval before publishing.
- Do not claim a post was scheduled or published unless a tool returned confirmation.
