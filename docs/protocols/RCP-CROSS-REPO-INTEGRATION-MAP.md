# Reality Construction Protocol: Cross-Repository Integration Map

RCP is authored in `wiredchaos/AGENTROPOLIS-CREATOR` and consumed through adapters. Repositories must reference the protocol rather than fork its authority.

## Authority topology

```text
AGENTROPOLIS-CREATOR
  RCP specification, schemas, compiler Skills, fixtures
        |
        +--> AGENTROPOLIS-ONTOLOGY
        |      semantic identifiers and relationships
        |
        +--> AGENTROPOLIS-ATG
        |      mandates, authority scope, evidence, receipts
        |
        +--> AGENTROPOLIS-AGENT-MCP
        |      adapter gates, execution boundaries, receipts
        |
        +--> agentropolis-mission-control
        |      approval, risk, exceptions, operations
        |
        +--> AGENTROPOLIS-GAMING-DISTRICT
        |      playable registration and player systems
        |
        +--> runtimes and applications
               rendering, simulation, distribution, interaction
```

## Tier 0: Protocol authority

### `wiredchaos/AGENTROPOLIS-CREATOR`

Owns:

- RCP RFCs
- World Package schema
- compiler and audit Skills
- reference fixtures
- adapter contracts
- world-diff format
- construction receipts
- conformance profiles

Must not absorb player identity, settlement, Mission Control, or general MCP authority.

## Tier 1: Required infrastructure integrations

### `wiredchaos/AGENTROPOLIS-ONTOLOGY`

Add:

- RCP entity classes
- spatial-relation vocabulary
- geometry-layer vocabulary
- world-law and procedural-law types
- institution, field, affordance, and world-package identifiers

Role: semantic source of truth.

### `wiredchaos/AGENTROPOLIS-ATG`

Add:

- world construction mandate type
- compile, execute, audit, repair, approve, and release actions
- RCP package reference and digest fields
- construction-receipt profile
- authority class for simulation versus physical actuation

Role: protocol transport for authority and receipts.

### `wiredchaos/AGENTROPOLIS-AGENT-MCP`

Add read-only first:

- `validate_rcp_world_package`
- `inspect_rcp_manifest`
- `list_rcp_adapter_capabilities`
- `assess_rcp_execution_risk`

Later, behind authenticated execution corridors:

- `compile_rcp_adapter_target`
- `run_rcp_static_audit`
- `run_rcp_playtest_suite`
- `record_rcp_repair_receipt`

Role: governed capability membrane. Public tools remain non-mutating.

### `wiredchaos/agentropolis-mission-control`

Add:

- world-build queue
- package status and lifecycle panel
- audit failures and repair-loop view
- approval packets
- cost and performance budgets
- adapter execution receipts
- release and rollback controls

Role: human control plane.

## Tier 2: Primary consumers

### `wiredchaos/AGENTROPOLIS-GAMING-DISTRICT`

Consumes approved RCP packages and adds:

- game registration reference
- player entry roles
- session and progression bindings
- missions and achievements
- gameplay event contracts
- cross-game identity and receipt mapping

Must not redefine World Package schemas.

### `wiredchaos/AGENTROPOLIS-GAMING-DISTRICT-AISTUDIO`

Consumes:

- approved world previews
- playable launch manifests
- world status and audit badges
- role-selection surfaces
- world-diff and release notes

Role: player-facing hub, not state authority.

### `wiredchaos/agenttropolisgame`

Use as:

- migration and compatibility target
- runtime adapter testbed
- initial embodied-playtest environment

Existing playable work should be wrapped with an RCP manifest before invasive refactoring.

### `wiredchaos/AGENTROPOLIS-ATG`

Also acts as the public WebGPU reference surface for visualizing RCP concepts, but not as the construction authority.

## Tier 3: Construction and media adapters

### `wiredchaos/ASBE`

Role:

- reference build orchestration
- multi-stage construction pipelines
- asset and package assembly
- reproducible job execution

Potential adapter: `rcp-asbe-build`.

### `wiredchaos/agenticstudio`

Role:

- creator-facing world authoring surface
- source and canon intake
- preview and revision interface

Potential adapter: `rcp-studio-authoring`.

### `wiredchaos/agenticstudio-pbx`

Role:

- cinematic, broadcast, and timeline outputs from approved worlds
- spatial capture and world-to-media packages

Potential adapter: `rcp-pbx-capture`.

### `wiredchaos/AGENTROPOLIS-33.3` and `wiredchaos/33.3fm`

Role:

- dynamic audio fields
- diegetic broadcasts
- spatial audio zones
- gameplay-authenticated event feeds

Potential adapter: `rcp-audio-field`.

### `wiredchaos/AGENTROPILIS-Model-Forge`

Role:

- model and generator evaluation
- procedural-law candidates
- geometry and world-model benchmark packs

Must not become RCP authority.

## Tier 4: City and spatial applications

### `wiredchaos/agentropolis`

Role:

- private City OS consumer
- institution and District world binding
- approved package runtime

Consumes package references only after governance gates.

### `wiredchaos/AGENTROPOLIS-CITY`

Role:

- city-specific World DNA and spatial graph
- public or internal city-shell packages

### `wiredchaos/agentropolisworldgrid`

Role:

- large-scale world-grid and interoperability testbed
- multi-world routing and federation experiments

### `wiredchaos/AGENTROPOLIS-MAIN-STREET`

Role:

- economic-street and public-space procedural-law profile
- storefront, traffic, footfall, and district-growth field tests

### `wiredchaos/AGENTROPOLIS-DIRECTOR`

Role:

- runtime direction
- event pacing
- camera and encounter orchestration
- civilization scenario control

Director consumes runtime bindings; it does not alter construction authority.

## Tier 5: Governance, identity, economy, and operations

### `wiredchaos/AGENTROPOLIS-AEGIS-ASSURANCE`

Role:

- RCP assurance profile
- security and risk requirements
- adversarial conformance tests

### `wiredchaos/AGENT-SEATBELTS-NMX`

Role:

- cognitive pacing, interruption, consent, and safety constraints for embodied agents and users

### `wiredchaos/BarkID`

Role:

- participant, agent, object, or institution identity bindings where approved

### `wiredchaos/AGENTROPOLIS-PAY-PROTOCOL` and `wiredchaos/AGENTROPOLIS-PAYRAIL`

Role:

- economic runtime bindings
- simulated versus live settlement distinction
- transaction mandates and receipts

No World Package directly authorizes custody or settlement.

### `wiredchaos/AGENTROPOLIS-OPS`, `wiredchaos/agentropolis-ai-ops`, and `wiredchaos/AGENTROPOLIS-DEPLOY`

Role:

- deployment profiles
- telemetry
- health checks
- rollback
- environment and cost controls

## Tier 6: Domain District consumers

The following repos may publish domain-specific World DNA, procedural laws, institutions, or audit profiles without forking RCP:

- `AGENTROPOLIS-TRVL-DSTRT` and `54-TRVL`
- `AGENTROPOLIS-FASHION-DSTRT` and `54-tailors-manufacturing`
- `AGENTROPOLIS-FIN54`
- `AGENTROPOLIS-HRM54`
- `AGENTROPOLIS-NEXUS54`
- `AGENTROPOLIS-CAPITAL-ATLAS`
- `AGENTROPOLIS-SOCIAL-SYSTEM`
- `AGENTROPOLIS-HEALTH-N-WELLNESS`
- `AGENTROPOLIS-OFFGRID-PUB` and `AGENTRPOLIS-OFFGRID`
- `AGENTROPOLIS-Public-IP-DISTRICT`
- `AGENTROPOLIS-CHAOS-RANK`

Examples:

- Travel publishes destination, route, accessibility, and cultural-provenance profiles.
- Fashion publishes garment, showroom, fit, material, and manufacturing geometry profiles.
- Finance publishes simulated market institutions and economic audit profiles.
- HR publishes workplace and organization simulations.
- Offgrid publishes energy, resource, and resilience fields.

## Initial integration sequence

### Phase 1: Authority and validation

1. Merge RCP v0.1 into Creator.
2. Add RCP vocabulary to Ontology.
3. Add RCP mandate and receipt profile to ATG.
4. Add read-only validation tools to Agent MCP.
5. Add package lifecycle panels to Mission Control.

### Phase 2: First runtime corridor

1. Wrap one existing `agenttropolisgame` environment in an RCP package.
2. Validate schema and static geometry.
3. Register it in Gaming District.
4. Launch from the AI Studio hub.
5. Produce construction, audit, and release receipts.

### Phase 3: Living world

1. Add traffic, attention, trade, and governance fields.
2. Bind agent perception to semantic geometry.
3. Run Explorer, Citizen, Chaos, Story, Accessibility, and Governance test agents.
4. Repair failures and preserve regression receipts.

### Phase 4: Cross-District civilization

1. Connect identity, economy, audio, social, and District institutions.
2. Run accelerated civilization simulations.
3. Compare branches through world diffs.
4. Require Mission Control approval for consequential transitions.

## Integration rule

Each consumer repository should add a small `rcp.adapter.json` or equivalent manifest containing:

```json
{
  "rcp_version": "0.1.0",
  "repository": "wiredchaos/example",
  "role": "runtime_adapter",
  "consumes": ["world_dna", "spatial_graph", "geometry_contract"],
  "ignores": [],
  "capabilities": [],
  "degradation_behavior": "fail_closed",
  "authority_source": "wiredchaos/AGENTROPOLIS-CREATOR"
}
```

No consumer should copy the canonical schema into a divergent local version. Pin a version, validate compatibility, and disclose ignored fields.
