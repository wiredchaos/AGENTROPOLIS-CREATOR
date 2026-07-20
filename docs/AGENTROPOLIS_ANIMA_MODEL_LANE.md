# AGENTROPOLIS ANIMA

AGENTROPOLIS ANIMA is the Creator District's governed animation foundation-model program.

It is not an AnimeGen integration and it is not a thin reskin of a third-party checkpoint. AnimeGen and Wan-family implementations may be studied as reference architectures, benchmark targets, and optional initialization sources where their licenses permit. The target is an Agentropolis-owned training, evaluation, control, provenance, and inference stack.

## Mission

Build a directable animation model system that preserves character identity, obeys cinematic instructions, maintains continuity across shots, exposes repairable failure states, and produces execution receipts.

```text
SCRIPT / STORYBOARD
        |
        v
ASBE SHOT CONTRACT
        |
        v
ANIMA MODEL ROUTER
  |         |         |
  v         v         v
T2V       I2V      KEYFRAME / REPAIR
  \         |         /
        v
CONTINUITY + IDENTITY EVALS
        |
        v
HUMAN APPROVAL
        |
        v
RECEIPT + PROVENANCE + EXPORT
```

## Non-negotiable design rules

1. ASBE directs the production. ANIMA executes bounded shot contracts.
2. No model may self-authorize publication or silently expand a mandate.
3. Character, wardrobe, prop, camera, and scene continuity are explicit state.
4. Missing information must surface as an inference receipt, not be invented invisibly.
5. Training data must be licensed, public domain, creator-authorized, or Agentropolis-owned.
6. Every generated shot records model, adapter, seed, inputs, controls, policy decisions, and output hashes.
7. Failed regions or frame ranges should be repairable without regenerating an entire accepted shot.
8. External models remain replaceable adapters, never sovereign dependencies.

## Architecture strategy

### Stage A: reference and benchmark

Compare a Wan-family base checkpoint, AnimeGen, and other eligible animation checkpoints against a fixed benchmark suite. Treat AnimeGen as an engineering reference and failure baseline, not the destination.

Initial score categories:

- character identity retention
- face, eye, hand, and accessory stability
- temporal flicker
- camera instruction compliance
- motion coherence
- environment persistence
- wardrobe and prop continuity
- shot-to-shot continuity
- render latency, memory, and cost
- policy and provenance completeness

### Stage B: control-plane prototype

Prove the ASBE shot contract, validation, reference locking, benchmark harness, and receipt format on a smaller model or adapter before attempting expensive full-model training.

### Stage C: licensed dataset program

Create a versioned dataset registry containing:

- source and contributor
- license and permitted uses
- territory and expiration where applicable
- character and style permissions
- shot, camera, pose, motion, and scene annotations
- opt-out and revocation status
- dataset and asset hashes

### Stage D: specialist training

Train separate capabilities where useful:

- composition, blocking, camera, and broad motion
- face, hands, linework, costume, props, and fine detail
- reference-image identity adapters
- pose, depth, edge, storyboard, and keyframe controls
- temporal continuity and shot extension
- dialogue and performance synchronization
- regional and frame-range repair

### Stage E: production promotion

A model or adapter is promoted only after it passes benchmark thresholds, license review, privacy review, red-team evaluation, runtime-cost review, and human approval.

## ASBE shot contract

A shot request is structured production state, not a prose-only prompt.

```yaml
schema_version: 0.1.0
shot_id: SC03_SH07
project_id: red-fang-pilot
character_refs:
  - character_id: RED_FANG_V4
    identity_asset: assets://characters/red-fang/v4/master.png
    wardrobe_id: PIRATE_RADIO_02
scene:
  location_id: RADIO_TOWER_INT_01
  time_of_day: night
performance:
  action: turns toward the transmitter
  emotion: suspicious
camera:
  framing: medium_closeup
  movement: slow_dolly_in
  lens_mm: 50
continuity:
  previous_shot_id: SC03_SH06
  preserve:
    - face
    - hair
    - jacket
    - screen_direction
    - transmitter_position
generation:
  mode: image_to_video
  duration_seconds: 4
  fps: 16
  seed: 82675
approval:
  human_required: true
```

The canonical machine-readable schema lives at:

- `schemas/anima-shot-contract.schema.json`

## Character identity package

Each production character should have a versioned identity package containing:

- canonical face and body references
- silhouette and proportion constraints
- expression and pose libraries
- wardrobe, prop, and palette definitions
- allowed and forbidden mutations
- screen-direction and blocking history
- voice and performance metadata
- approved adapter references
- continuity state and prior-shot hashes

## Evaluation and repair loop

```text
GENERATE
   |
   v
IDENTITY CHECK
   |
   v
MOTION + FLICKER CHECK
   |
   v
CAMERA + BLOCKING CHECK
   |
   v
CONTINUITY CHECK
   |
   +--> PASS --> HUMAN REVIEW
   |
   +--> FAIL --> REGION / FRAME RANGE DETECTION
                     |
                     v
                TARGETED REPAIR
                     |
                     +--> RE-EVALUATE
```

An evaluator may reject or route a shot for repair. It may not publish, waive rights requirements, or rewrite the production mandate.

## Repository placement

The first implementation stays inside AGENTROPOLIS-CREATOR until the model program has enough code, training operations, users, and release surface to justify extraction into a dedicated repository.

```text
packages/model-packs/agentropolis-anima/
schemas/anima-shot-contract.schema.json
evals/anima/benchmark-manifest.yaml
docs/AGENTROPOLIS_ANIMA_MODEL_LANE.md
```

Future extraction candidate:

```text
wiredchaos/AGENTROPOLIS-ANIMA
```

## District routing

- **ASBE**: screenplay, scene, shot, camera, blocking, and continuity compilation
- **AGENTROPOLIS-CREATOR**: training, adapters, creator controls, model packs, evaluation, and export
- **789 Studios**: cartoon, youth, and general-audience animation production
- **NTRU-OTT**: adult-faction productions only when the project mandate routes there
- **AGENTROPOLIS-AGENT-MCP**: governed capability routing, policy gates, and receipts
- **Mission Control**: approval, revocation, audit, and release authority

## Initial delivery gates

### Gate 0: scaffold

- shot-contract schema
- model-pack manifest
- benchmark manifest
- provenance and receipt requirements
- architecture and training brief

### Gate 1: benchmark harness

- 100-shot evaluation set
- deterministic run manifests
- model comparison report
- failure taxonomy

### Gate 2: control prototype

- reference locking
- identity package validation
- camera and blocking controls
- evaluator-generated repair requests

### Gate 3: first owned adapter

- trained only on approved data
- reproducible training receipt
- versioned model card
- benchmark results against reference checkpoints

### Gate 4: production candidate

- multi-shot continuity
- targeted repair
- rights and provenance enforcement
- human release gate
- cost and hardware profile

## Definition of success

ANIMA succeeds when it can produce a sequence of directed shots while preserving approved identity and continuity state, obeying ASBE camera and performance instructions, exposing failures to evaluators, and leaving a complete production receipt.

A model makes frames. AGENTROPOLIS makes a governed production system.