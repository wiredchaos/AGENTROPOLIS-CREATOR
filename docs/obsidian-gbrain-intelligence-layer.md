# Obsidian + gbrain Intelligence Layer

## Purpose

AGENTROPOLIS-CREATOR uses Obsidian as the human-editable canon vault and gbrain as the machine-readable intelligence graph.

This locks the current direction for the Hermes / llm-wiki / gbrain / Obsidian stack:

```text
Obsidian Vault
  -> llm-wiki indexing
  -> gbrain structured claims
  -> Hermes agents act on attributed knowledge
```

## Layer Roles

| Layer | Role |
| --- | --- |
| Obsidian | Source-of-truth workspace for canon, doctrine, character rules, production notes, project memory, and human review. |
| llm-wiki | Searchable knowledge base over the vault and related project docs. |
| gbrain | Structured graph for attributed claims, facts, takes, bets, hunches, decisions, and relationships. |
| Hermes | Agent operator that searches, reasons, drafts, routes, and executes from the graph. |

## Take Model

A Take is not just an opinion. It is a broader attributed claim.

Supported claim kinds:

- fact
- take
- doctrine
- decision
- bet
- hunch
- relationship
- evidence
- confidence

Every claim should preserve attribution. The agent must know who or what holds the claim.

Example holders:

- `brain`
- `self`
- `world`
- `people/<slug>`
- `companies/<slug>`
- `projects/<slug>`
- `agents/<slug>`
- `characters/<slug>`

## Anti-Moloch Rule

Agents must not collapse all claims into one fake truth.

The system should distinguish:

- what Agentropolis believes
- what a person believes
- what a company believes
- what the current public world-state says
- what is only a hunch
- what is a bet awaiting resolution
- what is canon locked
- what needs verification

## Creator Vault Responsibilities

Use Obsidian for:

- canon locks
- character sheets
- visual rules
- project doctrine
- production decisions
- repo strategy
- source links
- why-we-decided-this context

Creator agents should pull from Obsidian before generating, rewriting, or updating assets so canon does not drift.

## Operating Principle

Do not build memory as a pile of text.

Build memory as attributed knowledge that can be searched, reviewed, corrected, versioned, and acted on.
