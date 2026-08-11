# Existing-Media Asset Taxonomy

The canonical machine contract is `data/higgsfield/assets.schema.json`. One record describes one existing asset or one time-bounded segment of an existing asset; it never represents a generation request.

## Required identity and provenance

| Field | Rule |
| --- | --- |
| `asset_id` | Provider asset ID or collision-resistant local ID. Never derived solely from a mutable title. |
| `vault_id` | Registered vault UUID; Episode 0 currently recognizes `b619c13c-83ba-4ea3-b85c-de9be41bd01b`. |
| `media_type` | Controlled technical type: image, video, audio, composite, or unknown. |
| `source_url/reference` | Sanitized stable provider reference. Signed secrets and expiring query strings are prohibited. |
| `duration` | Seconds for timed media; `null` for still images or when uninspected. |

## Story annotations

`characters`, `factions`, `world`, `location`, `era`, `action`, and `mood` describe observable or canon-reviewed relevance. Unknown is not empty evidence: arrays may be empty and scalar fields may be `null`, but reviewers must not guess from a title or visual stereotype.

`visual_style` records observable treatment. `camera_language` records framing, lens impression only when supportable, height, movement, focal target, cut behavior, and confidence. It must not claim a physical focal length from appearance alone.

`dialogue_or_audio` separates transcript, language, speaker attribution, music, effects, and rights-review state. Automated transcripts remain observations pending review; speaker identity is never inferred without authority.

## Canon and truth

- `canon_source` is a list of immutable repository locators, author-declaration IDs, or metaverse relationship IDs.
- `canon_status` assigns one permitted status to each atomic annotation claim.
- `truth_state` describes the asset record's review state, not whether an image is aesthetically convincing.
- Existing media does not become canon merely because it appears in a Higgsfield vault.
- A match score cannot upgrade canon status.

## Studio mode

Allowed values include:

- `789_STUDIOS` — immutable cel-shaded anime lane;
- `NTRU_STUDIOS` — immutable hyper-real cinematic photoreal lane;
- `GRINDER_NEURO_TOKYO_2090` — source-derived cyberpunk lane;
- `ATVNETWORK_INTERFACE` — approved broadcast/interface media;
- `UNASSIGNED` — insufficient evidence.

ALKebulan/ALKEBULAN remains the canonical civilization reference. The prohibited comparison must not appear in asset tags, prompts, descriptions, filenames, or metadata.

## Continuity tags

Use namespaced tags rather than free-floating prose:

```text
character:<canonical-id>
wardrobe:<state-id>
prop:<asset-or-state-id>
location:<canonical-id>
era:<canonical-id>
action:<continuity-action-id>
weather:<state>
time:<state>
screen-direction:<value>
studio:<mode>
truth:<state>
```

Tags support filtering; they do not replace the evidence-backed annotations.

## Eligibility is tri-state-plus-review

Each eligibility field is one of `ELIGIBLE`, `INELIGIBLE`, `REVIEW_REQUIRED`, or `UNKNOWN`, with required reasons and approval references when eligible:

- `interactive_branch_eligibility`
- `atv_episode_eligibility`
- `kol_social_eligibility`
- `gaming_district_eligibility`

Visual similarity alone cannot establish eligibility. KOL/social requires rights, truth-state labeling, faction-lens review, likeness/voice review, and release approval. Gaming requires implementation and interaction rights. ATV requires editorial and broadcast approval.

## Segment records

If only part of a video matches a scene, create a derived metadata record with `segment.start_seconds` and `segment.end_seconds`, retain the original `asset_id` in `parent_asset_id`, and give the segment its own record ID. Segment creation is a local metadata operation; it does not alter provider media.

## Minimum review sequence

```text
provider inventory
  -> technical inspection
  -> human content annotation
  -> canon/truth adjudication
  -> continuity tagging
  -> rights review
  -> eligibility review
  -> match-ready
```
