# CHRONOSCOPE Construction Lane

## Status

Proposed canonical Creator Foundry lane.

## Purpose

CHRONOSCOPE is the accountable temporal and agent-interaction visualization capability of AGENTROPOLIS. Inside AGENTROPOLIS-CREATOR, this lane constructs the reusable agents, environments, interaction templates, continuity rules, camera grammar, voice identities, soundscapes, overlays, and export profiles consumed by ASBE productions.

CHRONOSCOPE is not a standalone truth authority, production orchestrator, model router, or publishing authority.

## Ownership boundary

```text
ATG
  -> supplies identity, mandate, communication, evidence, decision, and receipt events

AGENTROPOLIS-CREATOR
  -> constructs reusable visual and media packages

ASBE
  -> compiles events and packages into scenes, shots, timelines, and production jobs

AGENTROPOLIS-AGENT-MCP
  -> validates and executes approved tool calls through bounded corridors

CHRONOSCOPE
  -> renders temporal worlds and agent interactions

789 STUDIOS
  -> directs and assembles finished media

PBX
  -> routes approved outputs to distribution lanes
```

## Construction outputs

### Agent Visual Identity Manifest

Defines a persistent cinematic identity without granting runtime authority.

Required fields:

- `agent_id`
- `display_name`
- `district`
- `role`
- `visual_identity`
- `voice_identity`
- `interaction_rules`
- `continuity_version`
- `license_records`

### Temporal World Manifest

Defines a reusable world package.

Required fields:

- `world_id`
- `location`
- `time_range`
- `reconstruction_doctrine`
- `environment_assets`
- `claim_bindings`
- `uncertainty_labels`
- `lighting_profiles`
- `soundscape_profiles`
- `license_records`

### Interaction Template

Defines how an ATG event class may be visualized.

Initial templates:

- identity established
- mandate granted
- task delegated
- evidence presented
- challenge raised
- policy denied
- consensus reached
- execution started
- execution completed
- receipt issued

Every template must preserve the source event meaning. It may add staging and camera direction, but it may not invent authority, consensus, evidence, execution, or outcomes.

### CHRONOSCOPE Package

A versioned package exported by Creator and resolved by ASBE.

```json
{
  "package_id": "creator_chronoscope_nexus_01",
  "version": "0.1.0",
  "agents": [],
  "environments": [],
  "interaction_templates": [],
  "voice_profiles": [],
  "camera_presets": [],
  "soundscape_profiles": [],
  "continuity_rules": [],
  "license_records": []
}
```

## Creator workflow

```text
creator intent
  -> agent/world/interaction construction
  -> schema validation
  -> continuity preview
  -> rights and license review
  -> media diff
  -> human approval
  -> package export
  -> MCP registration proposal
  -> receipt
```

## Initial skill packages

### `agent-identity-builder`

**Role:** Build persistent visual and voice manifests for registered agents.

**Triggers:** "Build this agent", "Give this agent a cinematic identity", "Create a district character pack".

**Chains to:** `continuity-locker`, `chronoscope-package-exporter`.

**Output:** Agent Visual Identity Manifest plus preview and license report.

### `temporal-world-builder`

**Role:** Build evidence-bound historical, inferred, counterfactual, or forecast world packages.

**Triggers:** "Build this time period", "Construct this historical location", "Create a future scenario world".

**Chains to:** evidence and claim services, then `continuity-locker`.

**Output:** Temporal World Manifest with reconstruction doctrine and claim bindings.

### `interaction-template-builder`

**Role:** Convert an ATG event class into a reusable visual interaction template.

**Triggers:** "Visualize mandate transfer", "Create an agent debate template", "Build a receipt ceremony".

**Chains to:** ASBE scene compilation.

**Output:** Interaction Template with allowed staging, forbidden inventions, and camera grammar.

### `continuity-locker`

**Role:** Validate recurring agent, world, prop, voice, and district continuity.

**Output:** Continuity report, blocking conflicts, and approved version references.

### `chronoscope-package-exporter`

**Role:** Package approved Creator assets for ASBE and MCP consumption.

**Output:** Versioned CHRONOSCOPE Package, checksums, license records, and receipt proposal.

## Governance invariants

1. Creator packages describe media identity, not operational authority.
2. Every agent representation resolves to a registered `agent_id`.
3. Every historical world declares its reconstruction doctrine.
4. Every important visible claim is bindable to evidence, inference, dispute, speculation, or counterfactual state.
5. Generated dialogue must remain traceable to ATG events or be labeled narration.
6. No package can authorize model execution or publication.
7. Rights, licenses, model versions, and continuity versions remain visible in receipts.
8. Public release requires media-diff review and human approval.

## Planned repository structure

```text
packages/chronoscope-construction/
  agents/
  environments/
  interaction-templates/
  camera-grammar/
  voice-manifests/
  soundscapes/
  temporal-presets/
  export-profiles/

packages/skills/
  agent-identity-builder/
  temporal-world-builder/
  interaction-template-builder/
  continuity-locker/
  chronoscope-package-exporter/

packages/schemas/
  agent-visual-manifest.schema.json
  temporal-world-manifest.schema.json
  interaction-template.schema.json
  chronoscope-package.schema.json
```

## Canonical line

> Creator constructs the cinematic language. ATG supplies the agent truth. ASBE compiles the production. MCP controls execution. CHRONOSCOPE renders the world.
