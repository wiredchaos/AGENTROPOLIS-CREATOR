# Direction Compiler Architecture

The direction compiler converts an approved story beat and Story-Asset Matcher selections into a validated shot-direction package. It sits downstream of canon approval and asset matching and upstream of any separately authorized production executor.

```text
approved story beat + canon/continuity locks
                    |
                    v
       Story-Asset Matcher (selects existing assets)
                    |
                    v
 selected_asset_ids + current-scene direction inputs
                    |
                    v
 CINEDANCE_V4 compiler (validates and directs usage)
                    |
                    v
       production-ready shot specification
```

No arrow in this flow authorizes generation. The compiler has no Higgsfield client and its output always records `generation_fallback=PROHIBITED`.

## Module responsibilities

| Module | Responsibility |
| --- | --- |
| `compiler.js` | Orchestrates deterministic compilation and assembles the output contract. |
| `shot-context.js` | Establishes the isolated current-scene symbol table and rejects leakage. |
| `blocking.js` | Validates first-frame occupancy, location map, gaze/body direction, proximity, and prop hands. |
| `optics.js` | Applies configurable lens-profile and sensor/FOV policy. |
| `continuity.js` | Preserves locked state across controlled cuts and rejects forbidden carryover. |
| `physics.js` | Rejects movement outside declared physical limits. |
| `lighting.js` | Preserves declared lighting direction across cuts. |
| `timing.js` | Validates take/cut form, action intervals, duration, and dialogue rate. |
| `qa.js` | Enforces complete output sections and the prohibited generation fallback. |
| `types.js` | Defines grammar/version, default production policy, and typed compile errors. |
| `reference-tags.js` | Parses canonical tags and enforces prefix-defined semantic roles. |
| `voice.js` | Keeps permanent voice identity separate from scene delivery modifiers. |
| `acting.js` | Validates master acting metadata and scene-specific behavior without voice mutation. |
| `audio.js` | Enforces dialogue, audible-word, and lip-sync ownership. |
| `shot-spec.js` | Assembles the normalized endpoint-neutral shot contract. |

## Contract-layer mapping

| Contract layer | CINEDANCE V4 responsibility |
| --- | --- |
| `STYLE_LOCK` | Consumes the approved visual lock and versioned optics/format policy. It cannot create or revise canon or studio identity. |
| `CONTINUITY` | Consumes character, wardrobe, prop, environment, chronology, action, and cross-cut locks; validates that declared cuts preserve them. |
| `DIRECTION` | Compiles blocking, lens/FOV, camera mode, lighting, action/performance timing, audio/dialogue, physics, and edit form. |
| `SHOT` | Emits the current shot's first-frame state, spatial map, timed actions, constraints, and acceptance-ready specification. |

## Hard separation from matching

The compiler does not inspect a vault to discover candidates and does not score assets. `selected_asset_ids` must arrive from the matcher. An asset indexed as `REVIEW_SEARCH_ONLY`, including `HIGGSFIELD_PUBLIC_REFERENCE`, remains ineligible for final production until the matcher’s rights, canon, identity, continuity, provenance, output-use, and vault-readiness gates pass. Passing director QA cannot promote an asset or repair unresolved matcher metadata.

## Determinism and failure behavior

The same normalized input and policy produce the same output. Invalid direction fails before a shot package is returned. Failures identify the violated directional contract; they do not substitute assets, invent facts, relax matcher gates, or create media.

## Policy status

The repository implementation treats the supplied CINEDANCE section grammar and validated directing concepts as authoritative for compiler structure. The lens-profile ranges in `src/director/types.js` are explicit, configurable production defaults. If a separate versioned CINEDANCE V4 source document supplies different numeric policies, that policy should be recorded and substituted without changing canon or matcher contracts.
