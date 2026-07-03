# Agentropolis Creator GitHub Update — 2026-07-03

## Repository Role

`wiredchaos/AGENTROPOLIS-CREATOR` is the Agentropolis Construction District and Foundry.

It is where reusable city assets, skills, workflows, templates, MCP kits, media packages, scenes, districts, characters, model packs, and export-ready packages are designed before runtime adoption.

## Current Position

The Creator repo should stay focused on production packages:

```text
idea
  -> candidate
  -> package
  -> verification
  -> registry
  -> handoff
  -> runtime adoption
```

The Foundry builds candidates. Verification checks structure, provenance, licensing, evals, risk, rollback, and handoff readiness. Runtime repos consume approved package references only.

## Strongest Public Angle

AGENTROPOLIS-CREATOR is not just a design repo.

It is the manufacturing layer for agent-native worlds:

- district templates
- 3D environments
- procedural rooms
- NPC pools
- companion assets
- video timelines
- skill packages
- MCP kits
- workflow templates
- model-pack candidates
- metadata and license tracking
- governed world-diff previews
- governed media-diff previews

## Relationship to Other Repositories

```text
wiredchaos/agentropolis
  -> private City OS, canon, governance, and production runtime

wiredchaos/HERMES-CITY
  -> public civic shell and signal layer

wiredchaos/AGENTROPOLIS-CREATOR
  -> foundry and construction district

wiredchaos/AGENTROPOLIS-AGENT-MCP
  -> validation, routing, tool access, and receipts

wiredchaos/AGENTROPOLIS-GTM
  -> distribution strategy and offer packaging
```

## Package Rule

Every Creator package should eventually answer:

```text
What does it build?
Where does it belong?
What does it require?
What can it touch?
How is it verified?
How does it roll back?
What runtime can consume it?
```

## Next Build Priorities

1. Add package templates for district scenes, skill cards, MCP kits, video packs, and NPC packs.
2. Create a Foundry registry with status labels: idea, candidate, verified, shipped, deprecated.
3. Add a public-safe creator showcase for UNBROKER Privacy Ops.
4. Add export rules for web, video, docs, and runtime references.
5. Keep runtime authority inside `wiredchaos/agentropolis`, not inside the Creator repo.

## Canon Lock

The Foundry builds the parts.
The MCP membrane validates and routes them.
The private City OS decides what becomes law.
