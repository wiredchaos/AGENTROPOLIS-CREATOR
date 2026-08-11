# Higgsfield Content Vault Manifests

For human-assisted imports copied from the Higgsfield UI, start with
`data/higgsfield/inbox/import-template.json` and follow
`data/higgsfield/inbox/README.md`. The inbox command merges records into the
project manifest without deleting entries or changing vault readiness.

Vault manifests are an offline, user-controlled bridge for indexing existing Higgsfield content when no official project-scoped enumeration surface is available. They are metadata records, not prompt queues, generation requests, or proof of rights.

## Ingestion paths

1. `PROVIDER_ADAPTER` is reserved for a future official read-only Higgsfield API, CLI, or MCP enumeration surface.
2. `VAULT_MANIFEST` imports a checked-in or operator-supplied JSON manifest without contacting Higgsfield.
3. `HIGGSFIELD_PUBLIC_REFERENCE` records existing public/open-source project media from verified public evidence without inventing a provider asset ID.

Both paths normalize into `data/higgsfield/assets.schema.json`. Neither may generate, regenerate, download, mutate, publish, or spend credits.

## Register another vault without code changes

1. Add a `REGISTERED` non-fixture vault record to `data/higgsfield/vaults.json`. Keep `readiness_status=REGISTERED` and all readiness-evidence flags false.
2. Copy the starter structure from `data/higgsfield/manifests/b619c13c-83ba-4ea3-b85c-de9be41bd01b.manifest.json` to `<project-id>.manifest.json`.
3. Set the manifest `project_id`; every asset record must repeat that exact ID.
4. Add only existing content with a verified `provider_asset_id` and preserved non-secret `source_reference`. Never invent an asset, URL, title, description, identity, canon claim, or right.
5. Use `UNKNOWN`, `UNAVAILABLE`, or `REQUIRES_REVIEW` when the manifest author cannot supply a field. Omitted optional fields normalize to fail-closed review states.
6. Run the manifest importer and retain its receipt under `data/higgsfield/receipts/` when the manifest becomes an operational index input.
7. Keep the vault `REGISTERED` until enumeration/manifest completeness, normalization, schema validation, provider-reference preservation, human review, and readiness receipt requirements are independently approved.

No engine source change is needed for an additional project. Registration and manifest data are the extension points.

## Minimum asset identity

Each non-empty record requires:

- local stable `asset_id`;
- `provider=HIGGSFIELD`;
- stable `provider_asset_id`;
- exact `project_id`;
- non-secret `source_reference`;
- `media_type`, including explicit `UNKNOWN` when necessary.

All descriptive, canon, continuity, identity, eligibility, audio, and rights fields are optional at ingestion. Missing values are preserved as unresolved; they are never inferred from filenames or visual style.

## Review and production boundaries

Unresolved records can participate in `REVIEW_SEARCH` when the registered vault and source provenance pass the relevant gates. They cannot pass `FINAL_PRODUCTION` until vault readiness and required canon, continuity, canonical identity, output-use, and rights gates pass.

`MATCH_READY_CANDIDATE` in a manifest receipt is only an assessment. The importer never changes `vaults.json` or transitions a vault automatically.

## Determinism and receipts

The importer produces a stable SHA-256 index fingerprint from canonicalized normalized records. Re-ingesting identical content yields identical normalized records and fingerprints. Receipt timestamps may differ unless an ingestion timestamp is supplied explicitly.

Receipts validate against `data/higgsfield/receipts/manifest-ingestion-receipt.schema.json` and always record `ingestion_method=VAULT_MANIFEST`, `provider=HIGGSFIELD`, and `generation_fallback=PROHIBITED`.

## Public-reference provenance

`HIGGSFIELD_PUBLIC_REFERENCE` permits `REVIEW_SEARCH` indexing when the operator supplies a verified HTTPS source page, a public project slug or project ID, media type, and either a locally computed SHA-256 or a directly verified remote media reference. `provider_asset_id` is optional and normalizes to `UNKNOWN` when the public surface does not expose one; the importer never derives or fabricates it.

Visible author attribution and UI-verified prompt, model, size, date, title, and filename metadata are preserved as evidence, not inferred. Source-page URLs are retained even when a distinct remote media reference is available. Rights, canon, identity, continuity, truth, studio mode, audio, and production output use remain `REQUIRES_REVIEW`. These records are always `REVIEW_SEARCH_ONLY`, cannot make a vault `MATCH_READY`, and retain `generation_fallback=PROHIBITED` until a separate evidence-backed human review promotes the normalized record.

## Verified local production archives

`VERIFIED_LOCAL_ASSET` indexes existing files through a distinct `LOCAL_PRODUCTION_ARCHIVE` vault. It preserves the exact authorized local path, filename, byte size, SHA-256, media metadata, and filename-derived provisional production role. It does not claim a Higgsfield project ID, provider asset ID, Soul ID, canon identity, or rights status.

A successfully validated local archive may become `LOCAL_INDEX_READY`, which permits `REVIEW_SEARCH` only. This state is deliberately separate from `MATCH_READY` and cannot participate in `FINAL_PRODUCTION` until identity, canon, continuity, provenance, and rights reviews are recorded. Local source files remain external and read-only; ingestion writes metadata manifests and receipts only.
