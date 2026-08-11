# Story–Asset Matcher MVP Score Specification

## Scope

The MVP searches an in-memory index of existing Higgsfield asset metadata. It performs deterministic hard gates, calculates explicit-metadata scores, returns ranked asset references with per-dimension explanations, and reports rejected assets with gate failures.

It does not use embeddings, copy source media, generate media, submit prompts, call Higgsfield endpoints, or spend credits.

## Implementation map

| File | Responsibility |
| --- | --- |
| `src/story-engine/types.js` | Request contract, controlled canon/output vocabularies, score weights, and input validation. |
| `src/story-engine/filters.js` | Canon, world, era, location, and output-use hard gates with rejection explanations. |
| `src/story-engine/scorer.js` | Deterministic metadata coverage, token overlap, weighted score, and contribution receipt. |
| `src/story-engine/matcher.js` | Search, filter, score, stable rank, top-N selection, batch matching, and reference reuse map. |
| `src/story-engine/matcher.test.js` | Hard-gate, ranking, reuse, and no-generation gap tests. |

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
  "continuity_tags": ["faction:grinder", "location:port-district"]
}
```

The MVP output-use vocabulary is limited to the four eligibility fields already present in `assets.schema.json`: `INTERACTIVE_BRANCH`, `ATV_EPISODE`, `KOL_SOCIAL`, and `GAMING_DISTRICT`. Film-master eligibility is an unresolved schema extension and is not silently approximated.

## Hard gates

An asset must pass every gate before it can receive a score:

1. **Canon:** the asset must have at least one claim-level status, and every status must occur in `canon_status_requirement`.
2. **World:** the required value must exactly match a reviewed world ID or label after Unicode normalization, trim, and case folding.
3. **Era:** same rule as world.
4. **Location:** same rule as world; the MVP intentionally treats location as hard to prevent cross-world visual leakage.
5. **Output use:** the requested asset eligibility field must equal `ELIGIBLE`. `UNKNOWN`, `REVIEW_REQUIRED`, missing, and `INELIGIBLE` all reject.

The result includes every failed gate, not just the first, so reviewers can distinguish an annotation gap from an actual canon conflict.

## Score formula

Only hard-gate survivors are scored:

```text
score =
  0.25 × required_character_coverage
  + 0.20 × required_faction_coverage
  + 0.20 × continuity_tag_coverage
  + 0.12 × studio_mode_exact_match
  + 0.08 × visual_style_token_jaccard
  + 0.06 × action_token_jaccard
  + 0.05 × camera_language_token_jaccard
  + 0.04 × mood_token_jaccard
```

The weights total `1.00`.

### Coverage dimensions

Character and faction coverage are the proportion of required IDs/labels found in reviewed asset annotations. Continuity coverage is the proportion of required exact namespaced tags present on the asset. An empty request for one of these dimensions scores `1.0` because the asset violates no stated preference; requests should include meaningful constraints when that dimension matters.

### Exact studio dimension

Studio mode scores `1` for an exact normalized match and `0` otherwise. It remains a high-weight preference rather than a hard gate in the MVP so reviewers can see otherwise-strong alternate-lane candidates. A later scene policy may promote studio mode to a hard gate without changing the scorer.

### Text dimensions

Visual style, action, camera language, and mood use Unicode-aware, lowercase token Jaccard similarity:

```text
|required tokens ∩ observed tokens| / |required tokens ∪ observed tokens|
```

There is no stemming, synonym expansion, fuzzy identity resolution, embedding, or hidden model score. Every common token is returned in the explanation.

## Ranking and reuse

Candidates sort by descending score and then ascending `asset_id` for deterministic ties. `limit` must be a positive integer and defaults to five.

`matchScenes` independently matches each scene against the same index. It never reserves, copies, or mutates media. If the same asset reference is selected more than once, the response sets `reused_source_media: true` and lists all scenes in `reuse_map`; `source_media_duplicated` remains `false`.

## Fixture results

The real vault could not be enumerated, so `data/higgsfield/assets.fixture.json` contains six synthetic metadata-only records, all visibly prefixed `fixture-`, assigned to the reserved fixture vault `00000000-0000-4000-8000-000000000001`, and marked `provider_metadata.fixture=true`. They do not claim to exist in the registered vault.

`data/story/test-scenes.json` contains the three requested scenes. The reproducible output is `data/story/test-scene-match-output.json`:

| Scene | Rank 1 | Score | Additional result |
| --- | --- | --- | --- |
| Neuro Tokyo 2090 / Grinder / surveillance tension | `fixture-neuro-grinder-surveillance-001` | `1.000000` | Nonmatching worlds/eras are hard-rejected. |
| Chrysantheum / covert intelligence / controlled elegance | `fixture-chrysantheum-intel-001` | `1.000000` | Contested/insufficiently eligible alternative is rejected. |
| NETERU / ancestral memory / deep-time signal | `fixture-neteru-memory-signal-001` | `1.000000` | `fixture-neteru-memory-anime-002` ranks second at `0.657667` because its studio, continuity, style, camera, action, and mood fit is weaker. |

These perfect top fixture scores verify the formula, not production fitness.

## Sample explanation excerpt

```json
{
  "asset_id": "fixture-neuro-grinder-surveillance-001",
  "score": 1,
  "reasons": [
    {
      "dimension": "characters",
      "score": 1,
      "weight": 0.25,
      "contribution": 0.25,
      "matched": ["GRINDER_RUNNER_01"],
      "missing": []
    },
    {
      "dimension": "studio_mode",
      "score": 1,
      "weight": 0.12,
      "contribution": 0.12,
      "expected": "GRINDER_NEURO_TOKYO_2090",
      "actual": "GRINDER_NEURO_TOKYO_2090"
    }
  ]
}
```

## Unresolved integration blockers

1. The authenticated Higgsfield vault has not been enumerated because no CLI, MCP resource, installed Higgsfield skill, or credentials are available.
2. No real asset index exists; provider pagination, stable-reference format, deletions, refreshes, and incremental indexing remain untested.
3. JSON Schema validation is not wired into the matcher process; production ingestion must validate assets before indexing.
4. Rights and film-master eligibility are not explicit fields in `assets.schema.json`; the MVP supports only the four existing derivative eligibility fields.
5. Studio mode is scored rather than hard-gated; creator policy must decide whether alternate-lane suggestions should remain visible.
6. Exact metadata matching needs governed alias tables for canonical names, but alias expansion must not conflate identities or canon.
7. Token overlap has no ontology or synonyms. This is deliberate for auditability but can miss semantically similar language.
8. Segment duration, transcript timecodes, codecs, dimensions, and sequence-level optimization are not implemented in the MVP.
9. Fixture annotations are synthetic test metadata and must never merge into a production index.

`NO_EXISTING_MATCH` remains a successful, non-generating outcome throughout integration.
