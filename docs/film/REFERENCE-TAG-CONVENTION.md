# Production Reference Tag Convention

Canonical production references use:

```text
@<type>_<project>_<name>[_<scene-scope>][_v<version>]
```

The exact input is preserved as `raw_tag`. Parsing produces:

| Field | Meaning |
| --- | --- |
| `reference_type` | Semantic production role determined only by the type prefix. |
| `project_code` | Project namespace immediately following the prefix. |
| `reference_name` | Name portion, preserving case, underscores, and hyphens. |
| `reference_name_raw` | Exact encoded name token before suffix fields are removed. |
| `reference_name_encoding` | `PLAIN` or `PERCENT_ESCAPED`. |
| `scene_scope` | `s26`, `s5-46`, or `null` when absent. |
| `version` | `v2` or `null` when absent. |
| `raw_tag` | Original exact tag string. |

Recognized prefixes are `char` → `CHARACTER`, `loc` → `LOCATION`, `prop` → `PROP`, `veh` → `VEHICLE`, `creature` → `CREATURE`, `audio` → `AUDIO`, and `other` → `OTHER`.

The prefix is authoritative for production function. `@prop_CB_sedan_interior_back` is a prop reference even though the image may depict an interior space. Visual subject matter never silently changes the declared role.

Scene scope and version are optional and are never defaulted. A syntactically valid terminal `_sN` or `_sN-M` token is scope; a syntactically valid terminal `_vN` token is version.

For a literal reference name ending in one of those reserved-looking tokens, percent-encode the underscore as `%5F`. Encode a literal percent sign as `%25`. No other percent escapes are accepted. For example, `@other_CB_archive%5Fs26` has literal name `archive_s26` and no scene scope; `@other_CB_archive%5Fv2_s5_v3` has literal name `archive_v2`, scope `s5`, and version `v3`.

At normalization time, every parsed non-null scope/version must also be explicitly confirmed by the reference record's `scene_scope`/`version` fields. Thus an unescaped `@other_CB_archive_s26` without `scene_scope=s26` is rejected as unresolved ambiguity rather than silently treated as either a name or scope. Malformed escapes, conflicting declared names, and conflicting suffix confirmations also reject.

Examples:

```text
@char_CB_Kel_v9
@loc_CB_warehouse_s6_v2
@loc_CB_kal_street_s5-46_v3
@prop_CB_gunTobin_s26_v2
@prop_CB_sedan_interior_back
```

Parsed records validate against `data/story/reference-tag.schema.json`. The runtime parser is `src/director/reference-tags.js`.

Every parsed record also carries `production_contract_version=1.0.0`.
