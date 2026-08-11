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

1. its complete record fails `assets.schema.json`;
2. its vault is not `MATCH_READY` for production, or fixture matching is not explicitly in `FIXTURE_TEST` mode;
3. intended-use eligibility is not exactly `ELIGIBLE`;
4. claim-level canon status conflicts or is missing;
5. reviewed world, era, or location does not match the scene;
6. studio mode violates the immutable lane;
7. an explicitly required canonical character, faction, artifact, or continuity identity ID is absent;
8. explicitly required continuity tags are absent or forbidden tags are present;
9. an explicit duration/segment constraint cannot be satisfied;
10. an explicit truth-state constraint disallows the asset;
11. explicit audio/dialogue presence, exact text, speaker, or audio-rights requirements fail;
12. the source reference is unknown, empty, secret-bearing, or inconsistent with normalized provider provenance;
13. normalized final/master rights are unknown, restricted, incomplete, or incompatible with required production, edit, or distribution use.

General character and faction relevance remains scored. Explicit canonical IDs are fail-closed hard gates and use reviewed IDs only; approximate names, style, and text similarity cannot establish identity.

`CANON_GAP`, `CONTESTED_CANON`, and `PROVISIONAL_CANON` can match only when the scene explicitly permits the same status and the presentation requirements preserve its truth-state label.

`REVIEW_SEARCH` has one narrow exception: a `VAULT_MANIFEST` record may pass an unresolved metadata gate when its normalized provenance explicitly names that field as unresolved. Known incompatible values still reject, source provenance must still pass, and the receipt reports `final_selection_eligible=false`. No unresolved exception applies to `FINAL_PRODUCTION`.

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

Each dimension is `0.0–1.0` and retains an explanation and the evidence fields used. Missing reviewed metadata scores `0`, not a guessed similarity. MVP weights are fixed, total `1.0`, and are recorded in every match receipt; per-scene overrides are not implemented.

Semantic embeddings or multimodal similarity may propose candidates only as an optional discovery aid. They cannot bypass hard gates, establish identity/canon/rights, or write annotations without review.

## Match receipt

`data/story/match-output.schema.json` defines the complete, versioned batch receipt. It preserves selected and rejected asset IDs, normalized provider/source references, all gate outcomes, scores, fixture state, rights eligibility, truth/canon state, continuity state, and the non-generation invariant. Rejections are evidence, not discarded counts.

## Episode 0 matching order

For each `EP0_001–EP0_010` registry entry:

1. compile its canon sources/statuses, studio mode, style lock, continuity, direction, action, duration, audio, and interaction requirements into a scene-requirement record;
2. query only evidence-backed `MATCH_READY`, schema-valid existing assets for production selection;
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
