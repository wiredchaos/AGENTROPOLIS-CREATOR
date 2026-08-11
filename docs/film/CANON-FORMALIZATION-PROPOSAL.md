# COINTELPRO Canon Formalization — Pre-Mutation Proposal

**Gate:** creator review required before canon ingestion
**Media generation:** prohibited
**Hosted generation:** prohibited; approved credit ceiling is `0`
**Source-property mutation:** prohibited

## Purpose of this checkpoint

This document returns the proposed directory tree and unresolved creator decisions before any source-property canon is copied, normalized, synthesized, or changed. The directories are reserved with non-canon README files only. They contain no lore claims.

The current checkout is `AGENTROPOLIS-CREATOR`, has no configured Git remote, contains no connected source-property checkout, and contains no `.agents/skills/` directory. Repository search found no evidence sufficient to substantiate the requested feature-film convergence, the Yasuke/dojo chronology, the Chrysantheum Veil interpretation, or the 589 and Neiberau relationships. Those claims must not be mislabeled `SOURCE_CANON` from this checkout.

## Proposed directory tree

```text
docs/film/
├── CANON-FORMALIZATION-PROPOSAL.md       # this pre-mutation gate
├── canon/
│   ├── README.md                         # namespace isolation policy
│   ├── status-definitions.md             # controlled status vocabulary
│   ├── claim.schema.json                 # one atomic claim + evidence
│   ├── source-repository-locks.yaml       # repo URL/path/revision per property
│   ├── NTRU-LORE/
│   │   ├── manifest.yaml
│   │   ├── claims.jsonl
│   │   ├── chronology.yaml
│   │   ├── entities.yaml
│   │   ├── visual-identity.yaml
│   │   └── evidence/
│   ├── CHRYSANTHEUM/
│   │   ├── manifest.yaml
│   │   ├── claims.jsonl
│   │   ├── chronology.yaml               # Yasuke/dojo discrepancy lives here
│   │   ├── entities.yaml
│   │   ├── visual-identity.yaml
│   │   └── evidence/
│   ├── GRIND3R-SYNDIC8T3/
│   │   ├── manifest.yaml
│   │   ├── claims.jsonl
│   │   ├── chronology.yaml
│   │   ├── entities.yaml
│   │   ├── visual-identity.yaml          # source-derived; no NTRU/789 fallback
│   │   └── evidence/
│   └── BLAQ-TIARAS/
│       ├── manifest.yaml
│       ├── claims.jsonl
│       ├── chronology.yaml
│       ├── entities.yaml
│       ├── visual-identity.yaml
│       └── evidence/
├── metaverse/
│   ├── README.md                         # approved relationships only
│   └── TARATIA-589-METAVERSE/
│       ├── manifest.yaml
│       ├── relationships.jsonl
│       ├── convergence-chain.yaml
│       ├── chronology.yaml
│       └── evidence/
├── higgsfield/
│   ├── README.md                         # inventory gate; never executes media
│   ├── installed-skills.yaml
│   ├── pipeline-map.yaml
│   ├── cost-classification.yaml
│   └── evidence/
├── previs/
│   ├── README.md
│   ├── sequence-manifest.schema.json
│   └── sequences/
└── shots/
    ├── README.md
    ├── shot.schema.json
    └── SHOT_ID/
        ├── CANON_SOURCE.md
        ├── CANON_STATUS.txt
        ├── STUDIO_MODE.txt
        ├── STYLE_LOCK.md
        ├── CONTINUITY.md
        ├── DIRECTION.md
        ├── SHOT.md
        ├── INTERACTIVE_BRANCH.md
        └── higgsfield/
            ├── HIGGSFIELD_OPEN_SOURCE_COMPONENT.yaml
            ├── HOSTED_GENERATION_OPERATION.yaml
            └── EXPECTED_CREDIT_COST.yaml
```

Only the five named canon namespaces are proposed. `TARATIA-589-METAVERSE` is physically separated from the four source-property namespaces because it may hold relationships but may not absorb or rewrite their source canon.

## Proposed claim-status contract

Every atomic claim must have exactly one status:

| Status | Proposed meaning |
| --- | --- |
| `SOURCE_CANON` | Verbatim or faithfully normalized fact supported by an immutable source-repository path, revision, line/range or asset hash. |
| `AUTHOR_DECLARED_CANON` | Explicit creator declaration preserved with date, author identity, exact declaration, and scope; it is not back-attributed to a source repository. |
| `PROVISIONAL_CANON` | Proposed interpretation awaiting author approval or source confirmation; unusable as settled fact in a final shot. |
| `CONTESTED_CANON` | Two or more identified canon records conflict; all versions and evidence remain visible, with no silent resolution. |
| `METAVERSE_SYNTHESIS` | Approved cross-property relationship stored only in `TARATIA-589-METAVERSE`; it does not modify either source namespace. |
| `CANON_GAP` | Required fact has no supporting source or author declaration; it remains unknown and cannot be invented by production. |

Status belongs to each claim, not an entire file or paragraph. Evidence must include `source_repository`, `source_revision`, `source_path`, a precise locator, extraction method, and content hash. `AUTHOR_DECLARED_CANON` additionally requires declaration provenance. `METAVERSE_SYNTHESIS` requires an approval record naming every affected property.

## Required discrepancy and provisional records after evidence intake

Two pre-ingestion status locks are recorded in `canon/CHRYSANTHEUM/pre-ingestion-claims.yaml` from the creator instruction. They preserve the required statuses while explicitly marking source evidence missing and production use blocked/proposal-only. After the relevant source repositories and author declarations are supplied, evidence ingestion must complete—not silently replace—these two atomic records:

1. **Yasuke-dojo / Chrysantheum chronology discrepancy** — status exactly `CONTESTED_CANON`. The record must preserve both conflicting dates/orderings, their exact spellings, source locators, and revisions. It must not select a winner.
2. **Covert cohort interpretation** — status exactly `PROVISIONAL_CANON`: “Yasuke trained an original covert female cohort whose survivors or descendants later institutionalized the Chrysantheum Veil.” It must be labeled as a proposal, never phrased as a historical fact, and must not be used to resolve the contested chronology.

## Proposed convergence representation

The operator-provided order is preserved as a requested film architecture, not yet represented as source provenance:

```text
YASUKE
→ ERASURE
→ CHRYSANTHEUM
→ GRINDER
→ COINTEL MIRROR
→ HOOD ORACLE
→ GNOSIS 33.3
→ BLAQ TIARAS
→ NEURO TOKYO 2090
→ NETERU
→ TARATIA 589
→ THE CROSSING
→ NEIBERAU / DP-2147
```

Each arrow will become its own relationship record. An arrow can be `SOURCE_CANON` only if a locked source repository actually asserts that relationship. Author-approved cross-property arrows belong in `TARATIA-589-METAVERSE` as `METAVERSE_SYNTHESIS`. Unsupported arrows remain `CANON_GAP`; they are never upgraded merely because the complete chain was supplied as the desired feature-film architecture.

In particular, no source-origin claim will be made for `NETERU → TARATIA 589`, `TARATIA 589 → THE CROSSING`, or `THE CROSSING → NEIBERAU / DP-2147` without repository evidence. An explicit cross-property approval can authorize those arrows as `METAVERSE_SYNTHESIS`, but cannot retroactively make them source canon.

## Studio and civilization locks

- `789 STUDIOS` remains the immutable cel-shaded anime lane.
- `NTRU STUDIOS` remains the immutable hyper-real cinematic photoreal lane.
- `GRINDER / NEURO TOKYO` requires its own source-derived visual-identity record. Until evidence is ingested, its `STUDIO_MODE`, style, palette, rendering grammar, typography, environments, and transitions are `CANON_GAP`; it does not default to NTRU or 789.
- `ALKebulan` / `ALKEBULAN` is the canonical civilization reference. Source spelling must be preserved per quotation; a later normalization decision may select a display form.
- `WAKANDA` is an absolute negative across prompts, filenames, metadata, descriptions, previs, shots, and generated assets.

## Eventual shot contract

Every eventual shot must provide all fields below before previs or generation:

| Required field | Gate |
| --- | --- |
| `CANON_SOURCE` | Repository revision/path/locator, author declaration ID, or metaverse approval ID for every claim used. |
| `CANON_STATUS` | One allowed status per atomic claim; mixed-status claims must be split. |
| `STUDIO_MODE` | `789_STUDIOS`, `NTRU_STUDIOS`, or an approved source-derived mode; no implicit fallback. |
| `STYLE_LOCK` | Versioned positive/negative visual lock for the selected studio mode. |
| `CONTINUITY` | Character, wardrobe, prop, environment, chronology, action, and cross-lane state. |
| `DIRECTION` | Blocking, lens, camera, lighting, performance, sound, edit, and narrative purpose. |
| `SHOT` | Only shot-specific variable after locks; includes start/end state and acceptance criteria. |
| `INTERACTIVE_BRANCH` | Branch ID, trigger, choices, state effects, rejoin behavior, and canon authority—or explicit `NONE`. |
| `HIGGSFIELD_OPEN_SOURCE_COMPONENT` | Exact installed skill/component path, revision, license, local behavior, and evidence—or explicit `NONE`. |
| `HOSTED_GENERATION_OPERATION` | Exact remote action, provider surface, model discovered at execution, inputs, outputs, approval, and receipt—or `NOT_AUTHORIZED`. |
| `EXPECTED_CREDIT_COST` | Currency/unit, estimate source/time, lower/upper bound, retry ceiling, approver, and actual cost placeholder; defaults to `UNVERIFIED` and approved ceiling `0`. |

Missing required fields fail closed. An open-source skill never implies hosted-generation authority. No media generation or credit-spending operation is permitted during canon ingestion, schema validation, skill inventory, or previs planning.

## Higgsfield inventory gate

The requested `.agents/skills` inventory cannot yet be populated: that directory does not exist in this checkout. No installed `higgsfield-generate`, `higgsfield-soul-id`, or `higgsfield-video-explainer` source was found under `/workspace` or `/root`, and no Higgsfield CLI executable/global package was found in the prior audit.

When the installed content is made available, inventory must read every skill's `SKILL.md`, references, scripts, dependencies, and license. Each useful workflow then maps to canon intake, identity/reference continuity, prompt compilation, image generation, image-to-video, video generation, explainer assembly, review, or delivery. Capability must never be inferred from a skill name, and inventory must not authenticate, invoke a hosted operation, or spend credits.

## Unresolved creator decisions

Canon mutation remains blocked until the creator resolves or supplies the following:

1. **Source repository locks:** URL or local path and immutable commit SHA for NTRU-LORE, CHRYSANTHEUM, GRIND3R-SYNDIC8T3, and BLAQ-TIARAS.
2. **Authority packet:** author identity and durable declaration IDs for all `AUTHOR_DECLARED_CANON`, especially claims not found in source repositories.
3. **Namespace spelling:** confirm `CHRYSANTHEUM` as the namespace identifier despite alternate “Chrysanthemum” spellings already present in operator material; confirm `GRIND3R-SYNDIC8T3` and `BLAQ-TIARAS` exact punctuation/case.
4. **Yasuke conflict evidence:** provide both conflicting dojo/chronology statements, dates or ordering, source paths, and intended scope. The conflict will remain contested unless separately adjudicated.
5. **Provisional cohort scope:** confirm whether the proposed cohort statement may enter only development notes or may motivate provisional scenes; clarify whether “survivors or descendants” is intentionally disjunctive.
6. **Convergence arrows:** identify which individual arrows are asserted by which source repository and which are author-approved metaverse synthesis. A desired order alone does not establish origin.
7. **589 and Neiberau approvals:** supply explicit approval IDs and relationship wording for TARATIA 589, THE CROSSING, NEIBERAU, and DP-2147 if repository evidence is absent.
8. **Entity definitions:** define ERASURE, COINTEL MIRROR, GNOSIS 33.3, THE CROSSING, and DP-2147 sufficiently to distinguish entities, events, locations, eras, and sequence titles.
9. **GRINDER / NEURO TOKYO visual sources:** identify authoritative frames/assets and rights records from which the third visual identity may be derived.
10. **ALKebulan display form:** select canonical display capitalization while allowing exact source quotations to preserve their original spelling.
11. **Interactive authority:** decide whether branches are canonical alternatives, player-view variations that rejoin fixed canon, or non-canon explorations.
12. **Higgsfield installation:** provide or restore the approved `.agents/skills/` tree and its pinned upstream revision; clarify whether vendoring those files into this repository is authorized.
13. **Cost unit:** identify the expected-credit unit/API estimate source and who may approve nonzero ceilings and retries.

## Approval boundary

Approval of this proposal authorizes schema/scaffold implementation and evidence ingestion only. It does not approve a disputed resolution, metaverse relationship, screenplay, previs render, hosted generation, credit spend, source-repository edit, or publication.
