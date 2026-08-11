# Story–Asset Matcher MVP Score Specification

## Scope

The MVP searches an in-memory index of existing Higgsfield asset metadata. It performs deterministic hard gates, calculates explicit-metadata scores, returns ranked asset references with per-dimension explanations, and reports rejected assets with gate failures.

It does not use embeddings, copy source media, generate media, submit prompts, call Higgsfield endpoints, or spend credits.

## Implementation map

| File | Responsibility |
| --- | --- |
| `src/story-engine/schema-validator.js` | Runtime validation for the checked-in JSON Schema subset. |
| `src/story-engine/types.js` | Scene-schema validation, controlled output vocabulary, duration ordering, and score weights. |
| `src/story-engine/filters.js` | Asset-schema, vault, provenance, policy, compatibility, and intended-use hard gates. |
| `src/story-engine/scorer.js` | Deterministic metadata coverage, token overlap, weighted score, and contribution receipt. |
| `src/story-engine/matcher.js` | Search, filter, score, stable rank, top-N selection, batch matching, and reference reuse map. |
| `src/story-engine/matcher.test.js` | Every hard gate, schema contract, ranking, receipt, reuse, and no-generation gap tests. |
| `data/higgsfield/vaults.schema.json` | Evidence-backed vault registration and readiness contract. |
| `data/story/match-output.schema.json` | Formal versioned batch-output and rejection receipt contract. |

## Accepted request

```json
{
  "scene_id": "TEST_NEURO_GRINDER_SURVEILLANCE",
  "required_characters": ["GRINDER_RUNNER_01"],
  "required_factions": ["GRINDER"],
  "world": "NEURO TOKYO 2090",
  "era": "2090",
  "location": "PORT DISTRICT",
  "studio_mode": "GRINDER_NEURO_TOKYO_2090",
  "visual_style": "rain cyberpunk industrial port surveillance",
  "camera_language": "high angle locked surveillance camera",
  "action": "runner transports sealed neural freight",
  "mood": "surveillance tension controlled danger",
  "canon_status_requirement": ["AUTHOR_DECLARED_CANON"],
  "output_use": "ATV_EPISODE",
  "selection_mode": "FIXTURE_TEST",
  "identity_requirements": {
    "canonical_character_ids": ["GRINDER_RUNNER_01"],
    "canonical_faction_ids": ["GRINDER"],
    "canonical_artifact_ids": [],
    "continuity_locked_identity_ids": ["GRINDER_RUNNER_01"]
  },
  "rights_requirement": {
    "production_use": "FILM_MASTER",
    "derivative_edit_required": true,
    "distribution_required": true
  },
  "continuity_tags": ["faction:grinder", "location:port-district"],
  "required_continuity_tags": ["faction:grinder"],
  "forbidden_continuity_tags": ["continuity:forbidden"],
  "duration_requirement": {
    "minimum_seconds": 10,
    "target_seconds": 12,
    "maximum_seconds": 15,
    "segment_allowed": true
  },
  "truth_states_allowed": ["AUTHOR_DECLARED"],
  "audio_requirement": {
    "mode": "PROHIBITED",
    "exact_dialogue": null,
    "speaker_ids": [],
    "rights_approval_required": true
  }
}
```

`data/story/scene-requirements.schema.json` is the canonical request contract. `selection_mode`, explicit canonical identity requirements, and normalized rights requirements are mandatory. Continuity, duration, truth-state, and audio policy objects remain conditional. Output-use eligibility and film-master rights are separate fail-closed decisions.

## Hard gates

An asset must pass every gate before it can receive a score:

1. **Asset schema:** the complete asset record must validate against `assets.schema.json`. Invalid records fail with `ASSET_SCHEMA` and are not evaluated further.
2. **Vault readiness:** `FINAL_PRODUCTION` requires a non-fixture vault with evidence-backed `readiness_status=MATCH_READY`; the label alone is insufficient. `REGISTERED` is review-searchable, not production-ready. `FIXTURE_TEST` requires an explicitly fixture-mode, evidence-backed fixture vault.
3. **Output use:** final and fixture-policy matching require `ELIGIBLE`. A manifest record marked `UNKNOWN` or `REVIEW_REQUIRED` may remain visible only in `REVIEW_SEARCH`; `INELIGIBLE` always rejects.
4. **Canon:** known claim statuses must occur in `canon_status_requirement`. Manifest-declared unresolved canon may remain visible only in `REVIEW_SEARCH`.
5. **World, era, and location:** known values must exactly match the reviewed ID or label after normalization. Manifest-declared unresolved values may remain visible only in `REVIEW_SEARCH`; known incompatible values reject.
6. **Studio mode:** known asset and scene modes must match exactly. Manifest-declared unresolved mode is review-searchable only.
7. **Canonical identity:** every explicitly required canonical character, faction, artifact, and continuity-locked identity ID must occur in its reviewed asset field. Manifest-declared unresolved identity may remain visible only in `REVIEW_SEARCH`; a known wrong identity rejects. General character/faction relevance remains scored.
8. **Continuity:** required tags must be present and forbidden tags absent. Manifest-declared unresolved continuity is review-searchable only.
9. **Duration:** supplied duration must satisfy the inclusive range and segment policy. Manifest-declared unresolved duration is review-searchable only.
10. **Truth state:** known `truth_state` must occur in `truth_states_allowed`; manifest-declared unresolved truth is review-searchable only.
11. **Audio/dialogue:** known presence, exact dialogue, speakers, and audio rights must pass. Manifest-declared unresolved audio is review-searchable only.
12. **Source provenance:** source kind and stable reference must be usable and non-secret; normalized rights source/provider fields must agree with the vault and source reference.
13. **Rights eligibility:** final and fixture-policy matching require `APPROVED` rights, allowed production/output use, required derivative-edit eligibility, and required distribution eligibility. `UNKNOWN`, `REVIEW_REQUIRED`, and `RESTRICTED` fail closed. Fixtures always report `final_selection_eligible=false`; `REVIEW_SEARCH` may surface unresolved rights with the same flag.

The result includes every failed gate, not just the first, so reviewers can distinguish an annotation gap from an actual canon conflict.

Review exceptions apply only when normalized provenance records `ingestion_method=VAULT_MANIFEST` and names the exact unresolved field. Ordinary empty metadata and known incompatible metadata do not receive this exception. `FINAL_PRODUCTION` remains fail-closed.

## Score formula

Only hard-gate survivors are scored:

```text
score =
  0.20 × required_character_coverage
  + 0.12 × required_faction_coverage
  + 0.13 × world_location_era_match
  + 0.12 × action_token_jaccard
  + 0.10 × visual_style_token_jaccard
  + 0.10 × camera_language_token_jaccard
  + 0.08 × mood_token_jaccard
  + 0.08 × continuity_tag_coverage
  + 0.04 × audio_fit
  + 0.03 × duration_fit
```

The weights total `1.00`.

### Coverage dimensions

Character and faction coverage are the proportion of general relevance IDs/labels found in reviewed asset annotations. Explicit canonical IDs are evaluated first by `IDENTITY_COMPATIBILITY`, so a wrong identity cannot be rescued by visual score. Continuity coverage is the proportion of preferred exact namespaced tags present on the asset.

### Exact and policy dimensions

World/location/era scores `1` only when all three reviewed values match; hard-gate survivors therefore receive `1`. Audio scores `1` when unconstrained, optional, replaceable, or when required/prohibited presence fits. Duration scores `1` at the target and decreases linearly with absolute distance using the larger target-to-bound span; hard-gate survivors remain inside the allowed range. Studio mode is a hard gate and is not scored.

### Text dimensions

Visual style, action, camera language, and mood use Unicode-aware, lowercase token Jaccard similarity:

```text
|required tokens ∩ observed tokens| / |required tokens ∪ observed tokens|
```

There is no stemming, synonym expansion, fuzzy identity resolution, embedding, or hidden model score. Every common token is returned in the explanation.

## Ranking and reuse

Candidates sort by descending `total_score` and then ascending `asset_id` for deterministic ties. `limit` must be a positive integer and defaults to five.

## Match output contract

`data/story/match-output.schema.json` is the formal batch-receipt contract. It requires matcher/spec versions, scene and selected asset IDs, vault and normalized source identity, every passing hard gate, score dimensions and total score, full rejection reasons, fixture status, rights eligibility, truth/canon state, continuity state, and `generation_fallback=PROHIBITED`. Recorded fixture output must validate against this schema and exactly equal a fresh deterministic run.

`matchScenes` independently matches each scene against the same index. It never reserves, copies, or mutates media. If the same asset reference is selected more than once, the response sets `reused_source_media: true` and lists all scenes in `reuse_map`; `source_media_duplicated` remains `false`.

## Fixture results

The real vault could not be enumerated, so `data/higgsfield/assets.fixture.json` contains six synthetic metadata-only records, all visibly prefixed `fixture-`, assigned to the reserved fixture vault `00000000-0000-4000-8000-000000000001`, and marked `provider_metadata.fixture=true`. They do not claim to exist in the registered vault.

`data/story/test-scenes.json` contains the three requested scenes. The reproducible output is `data/story/test-scene-match-output.json`:

| Scene | Rank 1 | Score | Additional result |
| --- | --- | --- | --- |
| Neuro Tokyo 2090 / Grinder / surveillance tension | `fixture-neuro-grinder-surveillance-001` | `1.000000` | Nonmatching worlds/eras are hard-rejected. |
| Chrysantheum / covert intelligence / controlled elegance | `fixture-chrysantheum-intel-001` | `1.000000` | Contested/insufficiently eligible alternative is rejected. |
| NETERU / ancestral memory / deep-time signal | `fixture-neteru-memory-signal-001` | `1.000000` | The alternate 789 Studios fixture is hard-rejected for studio-mode incompatibility. |

These perfect top fixture scores verify the formula, not production fitness.

## Sample explanation excerpt

```json
{
  "asset_id": "fixture-neuro-grinder-surveillance-001",
  "total_score": 1,
  "score_dimensions": [
    {
      "dimension": "characters",
      "score": 1,
      "weight": 0.20,
      "contribution": 0.20,
      "matched": ["GRINDER_RUNNER_01"],
      "missing": []
    }
  ]
}
```

## Unresolved integration blockers

1. The authenticated Higgsfield vault has not been enumerated because no CLI, MCP resource, installed Higgsfield skill, or credentials are available.
2. No real asset index exists; provider pagination, stable-reference format, deletions, refreshes, and incremental indexing remain untested.
3. Provider-specific rights and distribution fields still require a read-only adapter mapping and human review policy.
4. Exact relevance matching needs governed alias tables; canonical identity hard gates deliberately accept IDs only.
5. Token overlap has no ontology or synonyms. This is deliberate for auditability but can miss semantically similar language.
6. Transcript timecodes, codecs, dimensions, and sequence-level optimization are not implemented in the MVP.
7. Fixture annotations and synthetic rights approvals must never merge into a production index.

`NO_EXISTING_MATCH` remains a successful, non-generating outcome throughout integration.
