---
name: reality-construction-compiler
description: compile a story, simulation brief, community canon, product concept, educational scenario, district specification, or world request into an RCP World Package containing World DNA, spatial constraints, procedural laws, semantic geometry, runtime bindings, governance, audit requirements, and construction receipts. use when Agentropolis needs to construct, extend, port, test, or govern an interactive world, digital twin, game environment, spatial experience, or simulated civilization.
---

# Reality Construction Compiler

Compile intent into a governed, provider-neutral Reality Construction Protocol package.

## Role

The compiler designs the laws, constraints, semantics, and audit contract for a world. It does not claim that rendering, gameplay, deployment, or physical actuation occurred without execution and verification receipts.

## Activation triggers

Activate for requests such as:

- "build this world"
- "turn this story into a playable environment"
- "create an ephemeral GTA of this concept"
- "generate a procedural city"
- "compile this lore into a simulation"
- "make this district explorable"
- "create a digital twin"
- "build a civilization from this canon"
- "port this world to Three.js, Godot, or Unreal"
- "audit or repair this generated world"

## Authority

```text
AGENTROPOLIS-CREATOR
  -> owns the RCP package, schemas, construction workflow, and construction receipts

AGENTROPOLIS-ONTOLOGY
  -> resolves shared semantic identifiers

AGENTROPOLIS-ATG
  -> carries mandate, authority, evidence, and receipt semantics

AGENTROPOLIS-AGENT-MCP
  -> gates tools and runtime adapters

AGENTROPOLIS-GAMING-DISTRICT
  -> registers approved playable worlds and binds player systems

Mission Control
  -> supervises approvals, exceptions, and release state
```

## Required inputs

Require or explicitly infer:

- intent and world purpose
- source material and canon references
- rights status
- target participants and entry roles
- scale and persistence model
- target runtime profiles
- required places, entities, institutions, and events
- procedural variation policy
- governance and authority boundaries
- performance and cost budgets
- audit and release thresholds

Do not silently promote an inference into canon. Record every inferred field.

## Compilation stages

1. Normalize the request.
2. Resolve source, canon, and rights states.
3. Produce World DNA.
4. Produce the spatial constraint graph.
5. Select or generate procedural laws.
6. Define semantic geometry and geometry layers.
7. Define runtime events, state, capabilities, and adapters.
8. Define governance and authority boundaries.
9. Generate the conformance and embodied-audit plan.
10. Produce the execution handoff and receipt requirements.

## Core rule

Prefer compact generative laws over exhaustive coordinate placement.

```text
semantic instruction
  -> procedural law
  -> bounded geometry
  -> runtime state
  -> observable audit
```

Hand-authored transforms are allowed for landmarks, anchors, cinematic beats, and explicit canon constraints. They must not replace procedural systems where scale or variation is required.

## Required output

Return these sections in order:

1. **Normalized Intent**
2. **Construction Status**
3. **Source and Rights Ledger**
4. **World DNA**
5. **Spatial Constraint Graph**
6. **Procedural Law Set**
7. **Semantic Geometry Contract**
8. **Runtime Bindings**
9. **Governance Contract**
10. **Audit Contract**
11. **Inference Receipt**
12. **RCP World Package Manifest**
13. **Execution Handoff**

## Status model

```yaml
status: draft | normalized | compiled | blocked | execution_ready | review_required
```

- `draft`: essential intent remains unresolved.
- `normalized`: intent and sources are structured, but construction is incomplete.
- `compiled`: a schema-valid planning package exists.
- `blocked`: rights, canon, authority, required assets, or safety boundaries prevent progression.
- `execution_ready`: approved adapters can consume the package.
- `review_required`: audits or release require human judgment.

## World DNA shape

```yaml
world_dna:
  entities: []
  places: []
  institutions: []
  relationships: []
  chronology: []
  laws: []
```

Every identifier must be stable inside the package.

## Spatial graph shape

```yaml
spatial_graph:
  coordinate_system: right-handed-y-up
  units: meters
  nodes: []
  edges:
    - from: identity_plaza
      relation: connected
      to: mission_control
      constraints:
        traversable: true
        maximum_slope: 0.08
```

Use relationships such as `inside`, `contains`, `adjacent`, `connected`, `visible`, `hidden`, `reachable`, `above`, `below`, `near`, `far`, and `faces`.

## Procedural law shape

```yaml
procedural_laws:
  - id: district_street_growth
    generator: agentropolis.street-growth
    generator_version: 0.1.0
    seed_policy: package_seed_plus_district_id
    reproducibility: equivalent
    inputs:
      traffic_field: live
      parcel_constraints: canon_locked
    invariants:
      - emergency_routes_remain_open
      - governance_spire_sightline_preserved
    mutation_permissions:
      - width
      - storefront_density
    output_domain: roads_and_public_space
```

Every procedural law must expose inputs, invariants, output domain, mutation permissions, and reproducibility.

## Semantic geometry

For consequential objects, define:

- entity reference
- geometry layers
- affordances
- authority requirements
- owner or steward
- memory policy
- provenance reference
- lifecycle behavior

Required geometry layers should be selected from:

```text
render
collision
navigation
occlusion
interaction
semantic
physics
audio
```

## Dynamic fields

A world may contain fields such as:

- movement and traffic
- attention
- trade
- risk
- sound
- weather
- scarcity
- social activity
- governance state

Every field must declare inputs, cadence, effects, clamps, and rollback behavior.

## Baseline audit contract

Require:

- schema validity
- stable identifiers
- resolved references
- required-location reachability
- collision and navigation consistency
- blocked-door and trapped-agent checks
- event-zone reachability
- source and rights resolution
- mandate and permission validation
- performance budget declaration
- accessibility declaration
- provenance completeness
- inference receipt completeness
- human approval before public release

Add gameplay, economy, settlement, privacy, security, or physical-actuation tests when those capabilities exist.

## Embodied testing

When runtime access exists, chain to role-specific test agents:

- Explorer
- Citizen
- Chaos Player
- Story Keeper
- Camera Auditor
- Accessibility Auditor
- Performance Auditor
- Governance Adversary
- Lore Auditor

The compiler must distinguish planned tests from executed tests.

## Execution manifest

```yaml
skill: reality-construction-compiler
protocol: RCP
rcp_version: 0.1.0
package_id: agentropolis.example-world
status: compiled
authority:
  owner_repo: wiredchaos/AGENTROPOLIS-CREATOR
  district: construction
  mandate_ref: atg:mandate:pending
routing:
  ontology: wiredchaos/AGENTROPOLIS-ONTOLOGY
  capability_membrane: wiredchaos/AGENTROPOLIS-AGENT-MCP
  playable_registry: wiredchaos/AGENTROPOLIS-GAMING-DISTRICT
governance:
  require_human_review: true
  require_world_diff: true
  require_execution_receipts: true
outputs:
  - world_package
  - inference_receipt
  - audit_contract
  - adapter_handoff
```

## Handoffs

Chains to:

- Creator Prompt Compiler for cinematics and media
- Geometry Foundry adapters for meshes, terrain, interiors, and crowds
- Blender or Geometry Nodes adapters for offline construction
- Three.js, WebGPU, Godot, Unreal, or other runtime adapters
- Gaming District for playable registration
- Agent MCP for bounded tool execution
- ATG for mandate and receipt transport
- Mission Control for approval and operational supervision
- Reality Auditor for conformance, playtest, and regression receipts

Chains from:

- district construction requests
- story and lore compilers
- simulation briefs
- digital-twin requests
- creator applications
- game projects
- education and training scenarios
- civilization and economy simulations

## Guardrails

- Do not claim the world exists because a package was compiled.
- Do not claim a test passed without evidence or a receipt.
- Do not invent source rights or provider capability.
- Do not collapse a simulation into a statement of fact.
- Do not grant the model authority to approve its own consequential actions.
- Do not route physical actuation directly from a world package.
- Preserve canon locks and disclose inferred defaults.
- Keep the protocol engine-neutral and model-neutral.

## Example

Input:

```text
Turn the Agentropolis city canon into an explorable civilization where each District owns an institution, agents can work and trade, Mission Control supervises consequential actions, and city geometry changes according to actual use.
```

Expected compilation outcome:

```text
World DNA defines Districts, institutions, agents, roles, laws, and chronology.
Spatial graph defines the city, corridors, institutions, routes, and visibility locks.
Procedural laws define growth, traffic, architecture, population, and field response.
Semantic geometry binds buildings to permissions, memory, affordances, and provenance.
Runtime bindings connect agents, economy, events, Mission Control, and receipts.
Audit contract verifies reachability, authority, stability, lore, accessibility, and performance.
```

## Reference

- `docs/protocols/RCP-0001-REALITY-CONSTRUCTION-PROTOCOL.md`
- `schemas/rcp/world-package.schema.json`
