# Mission Control Bumper Example

## Input

```text
Make a six-second square Agentropolis Mission Control bumper. Show a mandate signal entering the router, planner, specialists, and skeptic activating, then an approved receipt locking into the ledger. Put "Authority is not a prompt. It is a runtime constraint." on the final beat. Black liquid glass, restrained red and cyan signals, no narration, no random cyberpunk clutter.
```

## Normalized Request

Create a six-second square motion graphic that explains the governed Agentropolis execution path from mandate intake through audited approval.

## Status

```yaml
status: complete
```

## Decision Ledger

```yaml
decision_ledger:
  route: "/motion-graphics"
  spec:
    duration_seconds: 6
    width: 1080
    height: 1080
    aspect_ratio: "1:1"
    platform: "x"
    output_type: "motion_graphic"
  beats:
    - id: "beat_01"
      start_seconds: 0
      end_seconds: 2
      subject: "mandate signal"
      action: "travels into and stops at the router"
      position: "top-center to center"
      visual: "black liquid glass with restrained red refraction"
    - id: "beat_02"
      start_seconds: 2
      end_seconds: 4
      subject: "planner, specialists, and skeptic"
      action: "activate in sequence and converge on the capability bus"
      position: "three-column center grid"
      visual: "restrained cyan edge light and soft contact shadows"
    - id: "beat_03"
      start_seconds: 4
      end_seconds: 6
      subject: "approved execution receipt"
      action: "stamps into place and locks into the audit ledger"
      position: "center frame"
      visual: "hard settle with subtle glass distortion"
  copy:
    - text: "Authority is not a prompt. It is a runtime constraint."
      mode: "visible_title"
      beat_id: "beat_03"
      locked: true
  technique:
    - "controlled signal travel"
    - "sequential node activation"
    - "soft contact shadows"
    - "hard settle on the final receipt"
  negatives:
    - "no narration"
    - "no extra copy"
    - "no self-authorizing agent imagery"
    - "no random cyberpunk clutter"
    - "no provider watermark"
```

## Missing Decision Report

```yaml
missing_decisions: []
```

## Inference Receipt

```yaml
inference_receipt:
  - field: "spec.platform"
    value: "x"
    source: "current_campaign_surface"
    confidence: "medium"
    user_overridable: true
  - field: "spec.width"
    value: 1080
    source: "square_social_profile"
    confidence: "high"
    user_overridable: true
  - field: "spec.height"
    value: 1080
    source: "square_social_profile"
    confidence: "high"
    user_overridable: true
```

## Timeline Map

```text
0.0-2.0  mandate signal -> router
2.0-4.0  planner + specialists + skeptic -> capability bus
4.0-6.0  approved receipt -> audit ledger + locked title
```

## Provider-Neutral Prompt

```text
/motion-graphics Make a 6-second 1080x1080 video. Beat 1 (0-2s): a red mandate signal travels from the top-center through the black liquid-glass Mission Control spine and stops at the central router, with controlled refraction and no decorative particles. Beat 2 (2-4s): planner, specialist, and skeptic nodes activate in sequence across a three-column grid and converge on the MCP capability bus, using restrained cyan edge light and soft contact shadows. Beat 3 (4-6s): an approved execution receipt stamps into place at center frame and locks into the audit ledger with a hard settle and subtle glass distortion. Display the exact title "Authority is not a prompt. It is a runtime constraint." during Beat 3. No narration, no extra copy, no self-authorizing agent imagery, no random cyberpunk clutter, no provider watermark.
```

## Execution Manifest

```yaml
skill: "creator-prompt-compiler"
lane: "creator.prompt_compilation"
status: "complete"
contract:
  route: "/motion-graphics"
  duration_seconds: 6
  aspect_ratio: "1:1"
  timeline_segments: 3
  locked_copy_items: 1
assets:
  references: []
  rights_status: "not_required"
governance:
  require_human_review: true
  require_media_diff: true
  record_inferred_defaults: true
  locked_copy_must_match: true
routing:
  capability: "creator.motion_graphics"
  provider: "unresolved_until_router_selection"
```

## QC Contract

Check for:

- exact title match
- no extra text
- no timeline gap after the final action
- clear separation between planner, specialists, and skeptic
- receipt visibly entering the audit ledger
- no implication that an agent self-authorized
- restrained red and cyan palette
- no random particles, skyline clutter, or decorative circuitry
- no watermark
- square-safe title placement

## Handoff

```text
creator-prompt-compiler
  -> Video Director Agent
  -> Motion Design Agent
  -> capability router
  -> approved renderer or MCP adapter
  -> Verifier Agent
  -> human approval
  -> receipt
```
