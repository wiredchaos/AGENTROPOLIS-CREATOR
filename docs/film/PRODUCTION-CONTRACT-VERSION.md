# Production Contract Version

`production_contract_version=1.0.0` identifies the compatible reference-tag grammar, immutable voice schema, master/scene acting schemas, normalized shot-spec schema, and director compiler contract.

The constant is defined once in `src/production-contract.js`. Compiled direction, normalized shot specifications, matcher batch receipts, and Higgsfield ingestion receipts must carry the same value. A breaking field, semantic, lock, or enum change requires a version change and migration review; implementation-only fixes that preserve the contract do not.
