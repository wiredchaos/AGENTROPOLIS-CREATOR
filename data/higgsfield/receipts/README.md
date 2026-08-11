# Manifest ingestion receipts

Receipts in this directory describe local, read-only ingestion of user-controlled manifests for existing Higgsfield content. A receipt does not prove provider ownership, rights, canon, or production readiness and never authorizes generation.

Generated receipts must validate against `manifest-ingestion-receipt.schema.json`. Do not commit secrets, signed URLs, cookies, tokens, private media bytes, or fabricated provider references.

Receipts emitted by the human-verified UI inbox use
`ingestion_method=HUMAN_VERIFIED_UI`, remain `REVIEW_SEARCH_ONLY`, and include
the exact supplied local path, SHA-256, and byte length when `local_path` was
provided. `NOT_SUPPLIED` is recorded explicitly when it was omitted.
