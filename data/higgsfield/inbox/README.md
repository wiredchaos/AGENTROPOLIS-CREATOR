# Human-verified Higgsfield asset inbox

Populate `pilot-import-template.json` with records copied from the Higgsfield UI. This
workflow records existing content only. It does not contact Higgsfield, download
media, generate replacements, or change vault readiness.

Each record requires `provider_asset_id`, `project_id`, `source_reference`, and
`media_type`. The optional fields are `title`, `description`, `filename`,
`duration`, `tags`, and `local_path`. Do not paste signed or secret-bearing URLs. A source
reference must explicitly declare `contains_secrets: false`.

When `local_path` is supplied, it must identify an existing regular file. An
absolute WSL path is recommended. Relative paths are resolved from the directory
where the import command is run. The importer reads the file only to calculate
its byte length and SHA-256; it does not copy, move, rename, or upload it.

Example using placeholders only:

```json
{
  "provider_asset_id": "PLACEHOLDER_PROVIDER_ASSET_ID",
  "project_id": "b619c13c-83ba-4ea3-b85c-de9be41bd01b",
  "source_reference": {
    "kind": "SANITIZED_URL",
    "value": "https://placeholder.invalid/existing-asset-reference",
    "contains_secrets": false
  },
  "media_type": "VIDEO",
  "title": "PLACEHOLDER_TITLE",
  "filename": "PLACEHOLDER_FILENAME.mp4",
  "local_path": "/mnt/c/PLACEHOLDER/EXISTING_FILE.mp4",
  "tags": ["PLACEHOLDER_TAG"]
}
```

From the repository root, import the completed file with:

```sh
node src/providers/higgsfield/import-inbox.js \
  --input data/higgsfield/inbox/pilot-import-template.json \
  --manifest data/higgsfield/manifests/b619c13c-83ba-4ea3-b85c-de9be41bd01b.manifest.json \
  --receipts data/higgsfield/receipts
```

The command accepts any number of records in one batch. Duplicate provider IDs
within the batch are rejected before files are written. An ID already in the
manifest is updated without changing its stable local `asset_id`; other manifest
assets are retained. New records are sorted deterministically.

The resulting manifest, batch receipt, and normalized assets record
`ingestion_method=HUMAN_VERIFIED_UI`.
New records receive explicit unresolved canon, continuity, identity, rights,
truth, audio, studio, and output-use states. They are available only to
`REVIEW_SEARCH`; the receipt remains `REVIEW_SEARCH_ONLY`, and the command never
marks the vault `MATCH_READY`.

Promotion to `FINAL_PRODUCTION` is a separate human-review operation. Reviewers
must supply evidence-backed canon, continuity, canonical identity, rights,
output-use, truth, audio, and other scene-required metadata in the vault
manifest. The resulting manifest must pass the normal hard gates and readiness
review. Inbox re-imports preserve those reviewed fields rather than silently
downgrading them.

## Public/open-source references

Use `higgsfield-public-reference.schema.json` for public project records when the
public surface does not expose a Higgsfield asset ID. Omit `provider_asset_id` in
that case; do not supply the literal value `UNKNOWN` as if it were verified.
Each record must preserve a verified HTTPS public project page, its project slug
or project ID, media type, and either a readable local file (hashed during
import) or a directly verified remote-media reference. Author, prompt, model,
size, and date fields may be included only when verified from the public UI or
page. The public-reference importer retains those fields but produces
`REVIEW_SEARCH_ONLY` assets with unresolved rights and never changes vault
readiness.
