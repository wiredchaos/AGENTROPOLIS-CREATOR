# RCP-0001: Reality Construction Protocol

**Status:** Draft v0.1  
**Authority:** AGENTROPOLIS-CREATOR / Construction District  
**Protocol name:** Reality Construction Protocol (RCP)  
**Scope:** Provider-neutral compilation of intent into governed, testable, portable world packages

## 1. Purpose

RCP defines how stories, briefs, simulations, communities, products, and district canon become interoperable spatial realities.

RCP is not a renderer, game engine, model, asset generator, or world application. It is the contract between intent, construction, execution, audit, and distribution.

```text
Intent
  -> semantic world model
  -> spatial constraint graph
  -> procedural laws
  -> geometry package
  -> runtime bindings
  -> embodied audit
  -> signed construction receipt
```

## 2. Design doctrine

RCP combines five operating lenses:

- **Jobs:** complexity disappears behind a coherent experience.
- **Gates:** the protocol is portable and supports an ecosystem of builders.
- **Wang:** the pipeline integrates vertically while Districts extend it horizontally.
- **Musk:** build the factory that manufactures world factories.
- **Tesla:** geometry expresses dynamic fields, signals, energy, and collective behavior.

Normative doctrine:

> The system SHOULD author the laws by which geometry organizes itself instead of hand-placing every polygon.

## 3. Authority boundaries

- `AGENTROPOLIS-CREATOR` owns RCP specifications, construction Skills, canonical schemas, conformance fixtures, and reference package templates.
- `AGENTROPOLIS-GAMING-DISTRICT` owns playable-world registration, player systems, game rules, and cross-game progression.
- `AGENTROPOLIS-ATG` carries mandates, authority scope, evidence, and receipts between agents and systems.
- `AGENTROPOLIS-ONTOLOGY` owns shared semantic identifiers and relationships.
- `AGENTROPOLIS-AGENT-MCP` gates tools and execution adapters and records execution receipts.
- `agentropolis-mission-control` supervises approvals, exceptions, risk, and operational state.
- Runtime and application repositories consume approved RCP packages; they MUST NOT silently redefine protocol authority.

## 4. Required package layers

An RCP World Package MUST contain:

1. **Manifest** — package identity, version, authority, provenance, and target profiles.
2. **World DNA** — entities, places, institutions, relationships, chronology, and world laws.
3. **Spatial graph** — containment, adjacency, visibility, reachability, routes, anchors, and scale constraints.
4. **Procedural laws** — terrain, architecture, population, ecosystem, field, and variation generators.
5. **Geometry contract** — render, collision, navigation, occlusion, interaction, semantic, physics, and audio geometry.
6. **Runtime bindings** — engine-neutral events, state, inputs, outputs, capabilities, and adapter requirements.
7. **Governance contract** — permissions, prohibited actions, approval requirements, rights status, privacy rules, and budget limits.
8. **Audit contract** — geometric, runtime, accessibility, narrative, lore, policy, performance, and security tests.
9. **Receipts** — compilation, inference, asset, execution, audit, repair, approval, and release records.

## 5. World lifecycle

```text
DRAFT
  -> NORMALIZED
  -> COMPILED
  -> GEOMETRY_VALIDATED
  -> RUNTIME_BOUND
  -> PLAYTESTED
  -> REVIEW_REQUIRED
  -> APPROVED
  -> RELEASED
  -> EVOLVING
  -> ARCHIVED
```

A package MUST NOT enter `APPROVED` without passing its required conformance profile and receiving the declared human or institutional approval.

## 6. Determinism and variation

Every procedural rule MUST declare:

- generator identifier and version
- seed or seed policy
- explicit inputs
- bounded output domain
- invariants
- mutation permissions
- reproducibility level: `exact`, `equivalent`, or `non_deterministic`

World variation is permitted. Untraceable variation is not.

## 7. Semantic geometry

Every consequential spatial object SHOULD be addressable as more than a mesh. It MAY declare:

- identity and ontology type
- owner or steward
- purpose and institution
- affordances
- authority requirements
- memory policy
- economic state
- interaction zones
- provenance
- lifecycle hooks

Render geometry MUST NOT be treated as the sole source of truth for navigation, authority, or interaction.

## 8. Field model

RCP supports dynamic fields that influence geometry and behavior. A field MUST declare:

- field type
- source signals
- sampling domain
- update cadence
- transformation rule
- geometric or behavioral effects
- clamps and safety boundaries
- rollback behavior

Examples include traffic, attention, trade, weather, sound, social activity, risk, resource scarcity, and governance state.

## 9. Compilation corridor

A compliant compiler MUST execute or explicitly skip these stages:

```text
1. Normalize intent
2. Resolve canon and rights
3. Build semantic world model
4. Build spatial constraint graph
5. Select or generate procedural laws
6. Compile geometry contracts
7. Bind runtime capabilities
8. Generate audit plan
9. Run static conformance
10. Route bounded execution
11. Run embodied playtests
12. Repair and regression test
13. Produce release packet and receipts
```

Skipped stages MUST appear in the construction receipt with a reason.

## 10. Mandatory audits

The baseline profile requires:

- schema validity
- stable identifiers
- no unresolved required references
- required-location reachability
- collision and navigation consistency
- blocked-door and trapped-agent checks
- event-zone reachability
- rights-state resolution
- authority-scope validation
- performance budget declaration
- accessibility declaration
- provenance completeness
- inference receipt completeness
- human review before public release

Higher-risk worlds SHOULD add adversarial gameplay, economic stability, privacy, identity, settlement, and physical-actuation tests.

## 11. Receipt chain

```text
mandate_receipt
  -> normalization_receipt
  -> inference_receipt
  -> compilation_receipt
  -> asset_receipts
  -> execution_receipts
  -> audit_receipts
  -> repair_receipts
  -> approval_receipt
  -> release_receipt
```

Receipts MUST bind the package identifier, protocol version, input digest, output digest, authority context, tool or adapter identity, timestamps, status, and disclosed failures.

## 12. Physical-world boundary

RCP packages MAY target robotics, fabrication, buildings, digital twins, or infrastructure. Physical actuation is a separate authority class.

A world package MUST NOT directly authorize consequential physical action. It MUST route through an approved execution corridor with independent policy, simulation, human review, fail-safe behavior, and actuation receipts.

## 13. Compatibility

RCP is engine-neutral. Adapters MAY target Three.js, WebGPU, Babylon.js, Godot, Unreal, Unity, Blender, robotics simulators, spatial-computing runtimes, video pipelines, or fabrication systems.

An adapter MUST publish:

- supported RCP version
- consumed package fields
- ignored fields
- degradation behavior
- deterministic guarantees
- capability and permission requirements
- audit coverage

## 14. Versioning

RCP uses semantic versioning.

- Patch: clarifications and backward-compatible validation changes.
- Minor: backward-compatible fields and profiles.
- Major: incompatible schema or authority changes.

Packages MUST declare `rcp_version` and SHOULD declare a compatibility range.

## 15. Non-goals

RCP does not:

- claim generated worlds are accurate merely because they render
- grant models self-authority
- require one engine, provider, chain, model, or file format
- replace District ownership
- collapse simulations into public facts
- permit undisclosed inferred canon or rights

## 16. North-star command

```text
Compile this intent into a governed civilization.
Preserve canon and rights.
Generate procedural laws before exhaustive geometry.
Bind every consequential action to authority.
Test the world from inside.
Repair regressions.
Return the world package and receipts.
```
