# Achievement Reference Lock Package

## Purpose

AGENTROPOLIS-CREATOR owns the creator-side packages that can produce Hermes and Agentropolis achievement events.

This is the foundry lane for character sheets, prop sheets, environment sheets, shot prompt packs, continuity reports, world-diff previews, media-diff previews, and export manifests that can later become achievement receipts.

## Canon Boundary

```text
Agentropolis
  defines achievement law

AGENTROPOLIS-CREATOR
  produces governed creator packages

AGENTROPOLIS-AGENT-MCP
  validates and routes packages

HERMES-CITY
  mirrors safe public signals
```

CREATOR does not decide final city authority. It produces structured evidence.

## Reference Lock Flow

```text
source references
  -> character sheet
  -> prop sheet
  -> environment sheet
  -> continuity report
  -> handoff manifest
  -> MCP intake
  -> achievement receipt candidate
```

## Creator Achievement Candidates

### Character Lock

Triggered when a character sheet includes stable identity, silhouette, wardrobe, colors, props, negative constraints, and continuity notes.

### Prop Lock

Triggered when a prop sheet includes object identity, dimensions, materials, lighting behavior, placement rules, and forbidden variations.

### Environment Lock

Triggered when an environment sheet includes geography, weather, lighting, camera rules, continuity anchors, and scene boundaries.

### Shot Pack Ready

Triggered when a shot prompt pack includes numbered shots, motion notes, camera logic, character continuity, and output constraints.

### Handoff Manifest Complete

Triggered when a package can be consumed by MCP routing without manual guessing.

## Minimal Handoff Manifest

```json
{
  "package_id": "creator.reference_lock.example",
  "package_type": "character_sheet",
  "source_repo": "wiredchaos/AGENTROPOLIS-CREATOR",
  "target_pipeline": "AGENTROPOLIS-AGENT-MCP",
  "achievement_candidate": "creator.character_lock",
  "risk_level": "low",
  "requires_human_review": true,
  "receipt_required": true
}
```

## Safety Rule

Reference locks are production aids, not reality claims. If a generated output drifts from the locked reference, the correct action is to flag continuity drift and regenerate or revise, not pretend the output is canon.
