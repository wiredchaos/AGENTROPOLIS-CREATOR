# Creator Lanes: DeepSeek V4 Flash 0731 + MiniMax H3

AGENTROPOLIS-CREATOR uses these providers at different stages of the foundry.

## DeepSeek V4 Flash 0731: Foundry acceleration

Use as a temporary preferred worker for:

- prompt-pack compilation
- skill and MCP scaffold drafts
- schema and metadata generation
- test and eval generation
- repository cleanup proposals
- documentation variants
- batch classification and tagging
- storyboard and shot-list normalization

Outputs remain candidates until linting, tests, provenance checks and human review are complete. Discounted inference does not bypass the Creator handoff contract.

## MiniMax H3: Media candidate generation

Use as a bounded rendering worker for:

- character and world trailers
- product and campaign clips
- reference-driven motion studies
- short-form narrative scenes
- interface and title motion
- dialogue, ambience and music-bearing audiovisual candidates

Every H3 job must include a structured reference manifest:

```yaml
references:
  - id: neuro-canon-full-body
    role: character_identity
    rights: owned
    consent: approved
  - id: obsidian-agentropolis-hoodie
    role: wardrobe
    rights: owned
  - id: agentropolis-city-master
    role: environment
    rights: owned
prompt_role: scene_direction
```

Do not rely on prose alone for persistent IP. Canonical identity, wardrobe, environment, camera, motion and voice references must be declared separately.

## Creator handoff

```text
idea
  -> DeepSeek-assisted package or prompt draft
  -> Creator validation
  -> AEGIS provenance / rights gate
  -> H3 candidate generation when media is required
  -> ASBE assembly and QC
  -> Mission Control approval
  -> Registry or GTM handoff
```

## Required artifacts

- provider-neutral prompt contract
- model-routing recommendation with fallback
- asset manifest and rights metadata
- generation receipt
- validation report
- accepted-output cost
- distribution handoff manifest

## Guardrails

- no keys in repository files
- no automatic public publishing
- no unauthorized face or voice references
- no permanent dependency on a temporary promotion
- no benchmark claim in public copy without source and date
- no adoption based solely on first-pass output quality

CREATOR builds candidate intelligence and media. The city decides what becomes infrastructure or public culture.
