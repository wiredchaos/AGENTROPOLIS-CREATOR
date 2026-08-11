# Story–Asset Matching Engine

## Objective

The engine ranks existing, inspected Higgsfield assets against a scene requirement. It does not generate missing coverage. A poor or empty match returns a gap report for editorial review; it never converts that gap into a prompt or provider job.

Inputs:

- asset records valid against `data/higgsfield/assets.schema.json`;
- a scene requirement valid against `data/story/scene-requirements.schema.json`;
- canon namespace and relationship records;
- rights, continuity, truth-state, and eligibility approvals.

Output:

- ranked candidate asset IDs or segments;
- hard-gate failures and missing metadata;
- dimension-by-dimension score evidence;
- continuity conflicts;
- canon/truth conflicts;
- editorial gaps;
- **never** a generation command.

## Fail-closed hard gates

An asset is excluded before scoring when any condition applies:

1. its vault is unregistered, inaccessible, or quarantined;
2. its schema record is invalid;
3. the required canon source/status conflicts or is missing;
4. its studio mode violates the immutable lane;
5. a required character, faction, world, location, or era contradicts reviewed annotations;
6. required continuity tags are absent or forbidden tags are present;
7. duration/segment coverage cannot satisfy the edit requirement;
8. truth state is disallowed for the scene;
9. rights or intended-use eligibility is `INELIGIBLE`, `UNKNOWN`, or `REVIEW_REQUIRED` where approval is mandatory;
10. the scene prohibits dialogue/audio and the asset cannot be cleanly used without it, or required audio is absent;
11. the source reference contains secrets or cannot be resolved through an authorized vault session.

`CANON_GAP`, `CONTESTED_CANON`, and `PROVISIONAL_CANON` can match only when the scene explicitly permits the same status and the presentation requirements preserve its truth-state label.

## Deterministic candidate score

After hard gates, score only reviewed fields:

```text
score =
  0.20 * character_match
  + 0.12 * faction_match
  + 0.13 * world_location_era_match
  + 0.12 * action_match
  + 0.10 * visual_style_match
  + 0.10 * camera_language_match
  + 0.08 * mood_match
  + 0.08 * continuity_match
  + 0.04 * audio_match
  + 0.03 * duration_fit
```

Each dimension is `0.0–1.0` and must retain an explanation and evidence fields used. Missing reviewed metadata scores `0`, not a guessed similarity. Weights may be overridden by a scene requirement but must total `1.0` and be recorded in the match receipt.

Semantic embeddings or multimodal similarity may propose candidates only as an optional discovery aid. They cannot bypass hard gates, establish identity/canon/rights, or write annotations without review.

## Match receipt

```json
{
  "match_id": "uuid",
  "scene_id": "EP0_001",
  "asset_id": "provider-or-segment-id",
  "vault_id": "b619c13c-83ba-4ea3-b85c-de9be41bd01b",
  "hard_gate_result": "PASS",
  "score": 0.0,
  "dimension_scores": {},
  "evidence": [],
  "continuity_conflicts": [],
  "canon_conflicts": [],
  "missing_metadata": [],
  "editorial_decision": "UNREVIEWED",
  "generation_fallback": "PROHIBITED",
  "created_at": "ISO-8601"
}
```

## Episode 0 matching order

For each `EP0_001–EP0_010` registry entry:

1. compile its canon sources/statuses, studio mode, style lock, continuity, direction, action, duration, audio, and interaction requirements into a scene-requirement record;
2. query only registered, enumerated, schema-valid existing assets;
3. enforce studio, canon, truth, rights, and continuity gates;
4. rank remaining full assets and segments;
5. return `MATCH_FOUND`, `EDITORIAL_REVIEW_REQUIRED`, or `NO_EXISTING_MATCH`;
6. let a human select, reject, or request a canon/metadata review.

`NO_EXISTING_MATCH` is a valid final orchestration result. It does not authorize generation or credit spending.

## Sequence orchestration

Selection optimizes the sequence after per-shot matching:

- prevent identity, wardrobe, prop, geography, weather, and screen-direction discontinuities;
- prefer consistent source asset families and adjacent segments where story fit is equal;
- preserve NTRU, 789, and Grinder/Neuro Tokyo lane boundaries;
- permit cross-lane transitions only where the shot registry explicitly calls for them;
- retain original audio timecode and transcript provenance;
- surface, rather than conceal, missing coverage.

The sequence solver may recommend trims, holds, crops, or editorial ordering as non-destructive instructions. Media alteration, interpolation, enhancement, and generation are separate operations and remain unauthorized.

## ATV, interaction, social, and gaming routing

After a human selects an asset:

- interactive routing requires `interactive_branch_eligibility=ELIGIBLE`;
- ATV derivatives require `atv_episode_eligibility=ELIGIBLE`;
- KOL/social packages require `kol_social_eligibility=ELIGIBLE` and release approval;
- Gaming District use requires `gaming_district_eligibility=ELIGIBLE`.

One eligibility never implies another. A candidate can match the film scene while remaining ineligible for every derivative channel.

## Non-generation invariant

The matcher exposes no generation adapter. It must not call Higgsfield generation endpoints, produce provider prompts, estimate generation as a fallback, or convert gaps into jobs. Any future generation capability must be separately designed, reviewed, explicitly authorized, and isolated from this content-vault engine.
