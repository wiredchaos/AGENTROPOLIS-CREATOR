# Procedural VFX Foundry Lane

## Role

`AGENTROPOLIS-CREATOR` owns the reusable procedural VFX authoring and packaging contract for Agentropolis.

This lane converts approved creative intent into reusable effect definitions that may be consumed by the Gaming District, Agentic Studios, Agentropolis Wood, web experiences, trailers, cinematics, and other approved applications.

It is not a gameplay authority, player-state authority, publishing authority, or unrestricted editor lane.

## Upstream reference

Initial architecture reference:

`achrefelouafi/LinearAbiltyCastingThreeJS`

The upstream project is MIT licensed and demonstrates a Three.js + Vite + GLSL procedural ability sandbox with live effect controls, GPU particles, line and zone targeting, animation bindings, post-processing, and runtime-editable parameters.

Status:

```text
REFERENCE_ONLY
-> ingest review
-> dependency and asset review
-> 54-T containment checks
-> adapter extraction
-> internal benchmark
-> approved capability package
```

Do not silently vendor or promote upstream code, binary assets, models, HDRI files, or animation files into production. Preserve upstream copyright and license notices for any reused code.

## Shared capability

Canonical capability name:

`AGENTROPOLIS VFX FOUNDRY CORE`

Creator owns effect authoring, validation, packaging, provenance, performance metadata, and handoff contracts.

```text
creative intent
  -> Creator Prompt Contract
  -> rights/provenance checks
  -> EffectDefinition
  -> shader / particle / geometry graph
  -> preview sandbox
  -> media diff + performance diff
  -> human approval
  -> versioned VFX package
  -> district adapter
```

## Core modules

- `VFXRuntime` — executes approved procedural effects in a preview/runtime sandbox.
- `EffectDefinition` — provider-neutral effect schema.
- `AbilityComposer` — composes reusable effect primitives into authored abilities or events.
- `EffectPresetRegistry` — versions approved presets and keeps provenance/compatibility metadata.
- `AgentVFXInterpreter` — converts natural-language creative intent into draft effect parameters.
- `CharacterCastAdapter` — binds approved effects to animation events and character rigs.
- `TimelineController` — supports pause, scrub, timing, and cinematic tuning.
- `VFXExporter` — packages approved effect definitions for district-specific consumers.

## EffectDefinition contract

A draft effect must carry at minimum:

```json
{
  "effect_id": "string",
  "version": "semver",
  "display_name": "string",
  "intent": "string",
  "cast_shape": "LINE | ZONE | CONE | SELF | PROJECTILE | EVENT",
  "duration_ms": 0,
  "range_m": 0,
  "radius_m": 0,
  "timing": {},
  "geometry": {},
  "materials": {},
  "particles": {},
  "lights": {},
  "decals": {},
  "postprocessing": {},
  "animation_binding": {},
  "performance_budget": {},
  "rights_records": [],
  "source_provenance": [],
  "benchmark_state": "UNVERIFIED | TESTED | APPROVED",
  "approval_state": "DRAFT_ONLY | REVIEW_REQUIRED | APPROVED"
}
```

Gameplay damage, hit detection, rewards, cooldown settlement, inventory, player identity, balances, rank, or authoritative combat state must never be encoded as trusted authority in this creative package.

## Live authoring doctrine

The upstream reference demonstrates a useful pattern: effect state is parameterized and read continuously at runtime, allowing artists or agents to pause a frame and reshape an effect without rebuilding the application.

CREATOR should preserve that pattern where practical:

```text
parameter graph
  -> runtime-bound effect state
  -> live preview
  -> pause/scrub
  -> mutate draft parameters
  -> deterministic snapshot
  -> versioned preset
```

Runtime mutability is an authoring capability, not production authority. Approved production packages remain versioned and auditable.

## Gaming District handoff

The Gaming District consumes approved VFX packages through a gameplay adapter.

Supported use cases include:

- character abilities and skillshots
- line, zone, cone and projectile targeting visuals
- combat impacts and telegraphs
- elemental powers
- boss mechanics visuals
- environmental hazards
- portals and world events
- interactive UI/world feedback
- Three.js/WebGL prototypes
- cinematic gameplay effects

Gaming remains authoritative for gameplay semantics. Creator supplies presentation and reusable authored effect packages.

```text
CREATOR EffectDefinition
  -> approved VFX package
  -> Gaming VFX Ability Adapter
  -> gameplay-owned trigger
  -> visual execution
  -> performance receipt
```

## Entertainment / Agentic Studios handoff

The same approved effect definition may be consumed by Agentic Studios and Agentropolis Wood for previs, virtual production, trailers, cinematics, title sequences, virtual sets, and rendered media.

ASBE remains the Agentic Studios Back End. It coordinates scene, shot, sequence, and production workflow; it does not change the ownership of the VFX Foundry contract.

```text
EffectDefinition
  -> Gaming adapter for interactive runtime
  -> ASBE / cinematic adapter for production
```

One effect definition may therefore support both interactive and cinematic representations without duplicating creative logic.

## Governance and security

External source, shader, model, texture, animation, package, dependency, preset, or adapter intake must pass through the Ingest Membrane and applicable 54-T containment and transitive-capability checks before production activation.

Required checks include:

- license and provenance state
- dependency inventory
- binary asset inventory
- network and filesystem behavior
- shader/runtime resource limits
- package-manager and build-script behavior
- performance budget
- deterministic export checks where applicable
- benchmark receipt
- human approval before production promotion

## Canon lock

```text
Creator authors the effect.
Gaming owns gameplay truth.
ASBE coordinates cinematic production.
The Grid routes approved capability.
54-T verifies the boundary.
Every promoted package leaves a receipt.
```
