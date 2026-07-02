# Hermes 20 Workflows Construction Map

This document translates the Hermes 20 workflow pattern set into AGENTROPOLIS-CREATOR build lanes.

AGENTROPOLIS-CREATOR is the Foundry. It does not run the whole city and it does not pull live runtime state directly.

Its job is to turn reusable workflow patterns into governed packages, templates, render briefs, asset manifests, eval suites, and handoff-ready capability kits.

```text
workflow pattern
  -> foundry candidate
  -> package scaffold
  -> verification gates
  -> registry entry
  -> District Exchange handoff
  -> runtime adoption by Agentropolis / Hermes City surfaces
```

## Foundry Translation

| # | Hermes workflow | CREATOR output | Verification focus |
| --- | --- | --- | --- |
| 1 | Murder Board | Research board template, evidence schema, contradiction report template | Source traceability, citation integrity |
| 2 | Competitor Autopsy | Competitive teardown kit, screenshot brief, diff report schema | Evidence receipts, freshness, claim grounding |
| 3 | Price Prophet | Deal-analysis workflow package, price proof schema | Historical price evidence, retailer metadata |
| 4 | Meeting Prep Autopilot | Briefing card template, follow-up draft template | Privacy boundaries, source separation |
| 5 | Daily Opponent | Red-team critique template, assumption map | Counterevidence quality, hallucination control |
| 6 | 3AM Watchdog | Monitor package scaffold, alert reason-code schema | Noise control, meaningful-change threshold |
| 7 | Content Decay Detector | Content refresh queue template, SEO decay checklist | Analytics provenance, update priority logic |
| 8 | Competitor Alert System | Scheduled diff package, screenshot manifest | Diff accuracy, duplicate suppression |
| 9 | Deal Radar | Category watch kit, historical-low criteria | Fake-discount detection, alert restraint |
| 10 | Article Factory | Source-pack outline, article draft scaffold, SEO metadata template | Claim check, editorial review gate |
| 11 | Write Like Me Ghostwriter | Voice fingerprint template, mask-slip scoring prompt | Voice fidelity, generic-AI smell reduction |
| 12 | Zillow Sniper | Property-screening workflow, listing packet schema | Public-record limits, no unauthorized execution |
| 13 | Smart Home Conductor | Automation intent template, test and rollback checklist | Operator approval, device safety |
| 14 | Resume Assassin | Job-alignment resume template, truth-check rubric | No fabricated credentials |
| 15 | Negotiation Prep Kit | Negotiation prep worksheet, fallback-language bank | Comps quality, risk disclaimers |
| 16 | Side Project Forensic | Repo scorecard, resurrection matrix, ship-readiness rubric | Repo inspection, market evidence |
| 17 | Release Manager | Release checklist package, changelog template, rollback manifest | Test logs, version integrity, registry receipts |
| 18 | RSS Bouncer | Relevance filter schema, feed triage template | Attention protection, false-positive control |
| 19 | Blender Scene Monkey | Blender scene brief, Python render scaffold, asset manifest | Rights, render reproducibility, metadata |
| 20 | Knowledge Archaeologist | Memory recovery packet template, decision-log schema | Source receipts, context integrity |

## Priority Build Lanes

### Lane A: Intelligence Pack

Includes:

- Murder Board
- Competitor Autopsy
- Daily Opponent
- RSS Bouncer
- Knowledge Archaeologist

Purpose:

```text
turn scattered context into usable intelligence with receipts
```

### Lane B: Commerce Pack

Includes:

- Price Prophet
- Deal Radar
- Zillow Sniper
- Negotiation Prep Kit

Purpose:

```text
separate signal from hype before money or property decisions
```

### Lane C: Publishing Pack

Includes:

- Content Decay Detector
- Article Factory
- Write Like Me Ghostwriter

Purpose:

```text
build creator-facing content operations without raw AI sludge
```

### Lane D: Operations Pack

Includes:

- Meeting Prep Autopilot
- 3AM Watchdog
- Smart Home Conductor
- Release Manager

Purpose:

```text
convert recurring operational friction into governed agent routines
```

### Lane E: WorldForge Pack

Includes:

- Blender Scene Monkey
- Side Project Forensic
- Construction District Planner

Purpose:

```text
turn prompts, repos, and visual ideas into governed build artifacts
```

## Package Scaffold

Every workflow package candidate should use this shape:

```text
packages/workflows/<workflow-name>/
  README.md
  SKILL.md
  manifest.json
  inputs.schema.json
  outputs.schema.json
  risk-policy.md
  evals/
  examples/
  receipts/
  handoff.md
```

## Verification Gates

A workflow candidate cannot be promoted to District Exchange until it passes:

1. Scope gate
2. Input schema gate
3. Output schema gate
4. Risk policy gate
5. Tool authority gate
6. Provenance gate
7. Eval gate
8. Handoff gate
9. Rollback or no-op gate when applicable

## Construction Rule

CREATOR builds the package.

MCP controls tool authority.

HERMES routes the work.

Agentropolis governs the city.

District Exchange distributes verified capabilities.
