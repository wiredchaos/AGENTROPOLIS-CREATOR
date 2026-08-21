# AGENTROPOLIS-CREATOR — Creative Package

The CREATOR-owned creative package format: the packet CREATOR produces for
every district production and hands to FILM DISTRICT validation, which hands
it to ASBE execution.

## Contents

- `schemas/creative-package.schema.json` — CREATOR-owned native format
  (draft 2020-12). Version-addressable refs (`id` + `version`) point at
  canonical prompt packages, visual canon, shot plans, storyboards, and
  campaigns. No runtime/provider mutations may overwrite canonical prompts.
- `src/creative-package-adapter.ts` — pure adapter converting the native
  format to the FILM DISTRICT bridge contract
  (`AGENTROPOLIS-FILM-DISTRICT/contracts/creator-to-asbe.schema.json`):
  materializes `prompt_version {version, prompt_hash}` and the inline
  `shot_plan` required by the bridge.
- `src/creative-package-adapter.test.ts` — node-runnable test
  (`node --experimental-strip-types src/creative-package-adapter.test.ts`,
  zero deps) that loads the real promo package, computes the canonical hash
  from `canonical-prompt.md`, and asserts bridge fidelity.
- `examples/agp-what-is-it.creative-package.json` — the first creative
  package instance: "AGENTROPOLIS — What Is It?" promo.
- `examples/agp-what-is-it.asbe-bridge.json` — adapter output fixture
  (validated against the FILM DISTRICT bridge schema in the cross-repo test).

## Resolves (Phase-1 pending decisions)

- M3 (creative package -> ASBE scene/shot mapping): the adapter emits the
  district bridge packet with inline shot_plan + storyboards and ASBE
  scene/shot URL refs.
- M4 (prompt versioning gap): every package references a canonical prompt
  package by `prompt_id` + `prompt_version` + `canonical_content_hash`;
  the bridge materializes `prompt_version` for ASBE receipts.

## Canonical prompt packages

Canonical prompt packages live under `packages/prompts/<prompt-id>/`:
`package.yaml` (prompt_id, prompt_version, canonical_content_hash,
continuity rules, approved versions), `canonical-prompt.md` (hash source),
`negative-constraints.md` (binding negatives). The FILM DISTRICT Prompt
Registry indexes these as canonical records; runtime mutations are recorded
as execution records and never overwrite the canonical version.

Owner: AGENTROPOLIS-CREATOR.
