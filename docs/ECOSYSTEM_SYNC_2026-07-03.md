# Agentropolis Ecosystem Sync — 2026-07-03

This note locks AGENTROPOLIS-CREATOR into the four-repository Agentropolis system as the Construction District and Foundry.

## Canon hierarchy

```text
wiredchaos/agentropolis
  = private City OS, source of truth, governance, runtime, district law

wiredchaos/HERMES-CITY
  = public civic shell, safe signal layer, public coordination map

wiredchaos/AGENTROPOLIS-CREATOR
  = construction district and foundry for assets, skills, templates, MCP kits, scenes, media, and package candidates

wiredchaos/AGENTROPOLIS-AGENT-MCP
  = governed routing membrane for MCP tools, model council routing, reference-lock intake, validation, and receipts
```

## CREATOR role

AGENTROPOLIS-CREATOR produces governed construction candidates for the ecosystem:

- district room specs
- 3D scene packages
- character sheets
- prop sheets
- environment sheets
- shot prompt packs
- metadata sidecars
- skill packages
- workflow packages
- MCP kit candidates
- model pack candidates
- eval suite candidates
- world-diff and media-diff previews

The Foundry builds candidates. Governance decides what becomes permanent.

## Foundry execution lane

```text
Idea
  -> Candidate package
  -> Reference lock
  -> Metadata sidecar
  -> Provenance review
  -> License review
  -> Risk review
  -> MCP validation
  -> Handoff manifest
  -> District Exchange index
  -> Runtime adoption only after Agentropolis approval
```

## Pull direction

```text
CREATOR exports governed package candidates.
AGENT-MCP validates, gates, routes, and logs handoffs.
HERMES-CITY may publish public-safe signals and previews.
agentropolis consumes approved package references only.
```

## Guardrails

- Do not pull live runtime state into CREATOR.
- Do not redefine city law in CREATOR.
- Use clear licenses for imported assets.
- Keep metadata sidecars with generated or imported assets.
- Require reference locks for recurring characters, props, environments, and shot packs.
- Require rollback paths for packages that may affect production surfaces.
- Keep private runtime details out of public foundry docs.

## Anti-Moloch rule

Generation speed is not the win. Repeatable identity, provenance, license clarity, validation, rollback, and receipts are the win.

## One-line canon

AGENTROPOLIS-CREATOR is the foundry. It builds candidate worlds, assets, skills, and kits. It does not govern final city adoption.
