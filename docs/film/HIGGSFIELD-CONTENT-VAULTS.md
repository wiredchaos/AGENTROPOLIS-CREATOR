# Higgsfield Content Vaults

**Mode:** existing-media inventory only
**Generation:** disabled
**Credit spending:** prohibited

## Course-correction lock

Higgsfield projects are content vaults containing media that may already exist. The film system inventories, classifies, and matches that existing media to story requirements. It does not treat a vault as a prompt queue and must not call image-generation, video-generation, image-to-video, character-training, retry, variation, or enhancement endpoints.

The separation is absolute:

```text
authenticated Higgsfield project
  -> read-only project/asset enumeration when supported
  -> metadata capture without downloading unless authorized
  -> local taxonomy validation
  -> human-assisted canon and continuity annotation
  -> story/asset matching
  -> editorial candidate list
  -> human selection

never:
  inventory -> generation endpoint
```

## Registered vault

| Vault ID | Provider | Registration state | Inspection state | Asset claims |
| --- | --- | --- | --- | --- |
| `b619c13c-83ba-4ea3-b85c-de9be41bd01b` | Higgsfield | `REGISTERED` | `UNINSPECTED_AUTHENTICATION_UNAVAILABLE` | None. Asset count, titles, types, URLs, characters, and contents remain unknown. |

The machine-readable record lives in `data/higgsfield/vaults.json`. Registering the project identifier does not prove ownership, accessibility, contents, asset count, or rights.

## Inspection availability receipt

Inspection on 2026-08-11 found:

- no `higgsfield` CLI executable on `PATH`;
- no globally installed `@higgsfield/cli` package;
- no `.agents/skills/` tree or installed Higgsfield `SKILL.md`;
- no configured MCP resources or resource templates;
- no provider credentials exposed to this checkout.

Consequently, the vault was registered but not enumerated. No capability was inferred from product or skill names. No authentication was attempted, no asset URL was fabricated, no media was downloaded, no generation operation ran, and no credits were spent.

## Read-only enumeration protocol

When an authenticated, provider-supported CLI, MCP resource, or inspected open-source skill becomes available:

1. Pin and record the tool/skill revision and license.
2. Verify that the operation is read-only project or asset enumeration.
3. Reject any command whose behavior is unknown or combines listing with generation, enhancement, retry, export billing, or training.
4. Request the least metadata required: provider asset ID, project ID, media type, stable provider reference, duration, timestamps, and provider-supplied descriptive fields.
5. Do not log access tokens, cookies, session material, signed-URL query strings, or private media bytes.
6. Normalize records against `data/higgsfield/assets.schema.json` with unknown descriptive fields left `null`, `[]`, or `UNKNOWN` as the schema permits.
7. Store provenance for provider metadata separately from human annotations.
8. Require human review for character, faction, canon, truth-state, eligibility, and sensitive-content annotations.
9. Record an enumeration receipt with command/tool, revision, time, vault ID, record count, pagination state, and zero generation jobs.

## Enumeration boundary

Allowed after read-only verification:

- list accessible authenticated projects;
- retrieve metadata for the registered project;
- enumerate existing asset records and pagination tokens;
- inspect provider-supplied metadata and stable references;
- calculate local hashes for explicitly downloaded, authorized files;
- validate and match local metadata.

Never allowed without a separate future authorization:

- create, generate, regenerate, remix, enhance, extend, upscale, animate, or train;
- submit prompts or references to a model;
- purchase or spend credits;
- mutate, delete, publish, or change project sharing;
- scrape through unsupported browser/session-token methods;
- infer canon, identity, rights, or eligibility from filenames alone.

## Vault lifecycle

```text
REGISTERED
  -> ACCESS_VERIFIED
  -> ENUMERATED_METADATA_ONLY
  -> TAXONOMY_REVIEW
  -> MATCH_READY
  -> EDITORIALLY_SELECTED
  -> RIGHTS_AND_RELEASE_APPROVED
```

Failure states are `ACCESS_BLOCKED`, `AUTHENTICATION_REQUIRED`, `ENUMERATION_UNSUPPORTED`, `SCHEMA_INVALID`, `REVIEW_REQUIRED`, and `QUARANTINED`. No lifecycle transition grants generation authority.

## Asset record ownership

Provider-supplied values and editorial annotations must remain distinguishable:

| Layer | Examples | Authority |
| --- | --- | --- |
| Provider inventory | `asset_id`, `vault_id`, media type, duration, stable reference | Higgsfield enumeration response. |
| Automated local observation | technical duration, dimensions, codecs, perceptual hashes | Reproducible local inspection of authorized media. |
| Human annotation | characters, factions, world, era, action, mood, camera language | Reviewer with evidence and confidence. |
| Canon adjudication | canon source/status and truth state | Canon owner or governed canon record. |
| Distribution eligibility | ATV, KOL/social, gaming, interaction | Separate policy and human approval; never inferred from aesthetic fit. |

The vault is an evidence source, not a canon authority and not a release authority.
