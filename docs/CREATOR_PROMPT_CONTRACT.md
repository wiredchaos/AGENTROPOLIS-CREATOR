# AGENTROPOLIS-CREATOR Prompt Contract

## Purpose

The Creator Prompt Contract turns a plain-language creative request into a structured, provider-neutral execution packet.

It is designed for motion graphics, product videos, explainers, image-to-video, social clips, 3D captures, OTT bumpers, and other Creator Foundry media lanes.

The contract formalizes six decisions:

1. **Route** - the workflow or capability lane.
2. **Spec** - duration, dimensions, aspect ratio, platform, and delivery format.
3. **Beats** - what happens on screen and when.
4. **Copy** - exact visible or spoken language.
5. **Technique** - camera, animation, transition, lighting, and rendering instructions.
6. **Negatives** - what must not appear, change, or be inferred.

The pattern is informed by the public HeyGen HyperFrames prompt-structuring guidance, but this document does not make HyperFrames a runtime dependency or approved provider.

Reference:

- https://github.com/heygen-com/hyperframes

## Canon Lock

```text
Creator intent
  -> Creator Prompt Compiler
  -> six-decision validation
  -> timeline contract
  -> capability router
  -> approved MCP adapter or local renderer
  -> media diff
  -> human review
  -> execution receipt
```

The prompt is not treated as a wish.

The prompt becomes an editable production contract.

## Core Rule

> Do not make the provider guess when the Creator Foundry can make the decision explicit.

A request may still begin as one ordinary message. The compiler separates that message into structured fields before execution.

## The Six-Decision Contract

### 1. Route

Route identifies the correct workflow before model or provider selection.

Examples:

```text
/motion-graphics
/product-launch-video
/image-to-video
/explainer-video
/3d-flythrough
/social-short
/ott-bumper
```

Routes are capability labels, not vendor locks.

The active router may map a route to Blender, WebGL capture, OpenCut, Seedance-style prompting, Higgsfield-style explainers, a connected MCP provider, or another approved backend.

### 2. Spec

Spec defines the output boundary.

Minimum fields:

- duration in seconds
- aspect ratio or pixel dimensions
- target platform or surface
- output type

Example:

```yaml
spec:
  duration_seconds: 6
  width: 1080
  height: 1080
  aspect_ratio: "1:1"
  platform: "x"
  output_type: "motion_graphic"
```

Platform shorthand may resolve known profiles such as TikTok, Reels, Shorts, X, website hero, OTT, or presentation screen. Any resolved value must be written into the receipt.

### 3. Beats

Beats define the timeline.

Each beat must include:

- time range
- subject or object
- action
- position, origin, or destination
- visual treatment

Recommended sentence pattern:

```text
Beat N (start-end): [subject] [action] [origin/position/destination], rendered as [visual treatment].
```

Example:

```text
Beat 1 (0-2s): an oversized black cursor glides in from the lower-right and stops over the folder, rendered in a clean macOS-style silhouette.
```

Beat timing must not overlap unless the overlap is deliberate and labeled.

The final beat should account for the full duration. Dead time must be intentional.

### 4. Copy

Copy contains exact language that must appear or be spoken.

Rules:

- preserve exact copy in quotation marks
- identify whether copy is visible, narrated, captioned, or metadata-only
- do not paraphrase locked copy
- flag copy that exceeds the available screen or narration time
- require a text-lock review when typography fidelity matters

Example:

```yaml
copy:
  - text: "Authority is not a prompt. It is a runtime constraint."
    mode: visible_title
    beat_id: beat_03
    locked: true
```

### 5. Technique

Technique names the motion and rendering behavior.

Examples:

- soft squash-and-settle
- slow dolly push
- parallax drift
- faithful UI open animation
- snap zoom
- rack focus
- orbit reveal
- liquid-glass refraction
- soft contact shadow
- hard cut on beat
- match cut
- frame hold

Technique instructions should be observable. Avoid empty prestige phrases that cannot be tested.

### 6. Negatives

Negatives define forbidden output behavior.

Categories:

- content exclusions
- identity and continuity locks
- text restrictions
- camera restrictions
- audio restrictions
- provider restrictions
- privacy and licensing restrictions

Example:

```yaml
negatives:
  - no narration
  - no new logos
  - no text beyond locked copy
  - no character redesign
  - no camera shake
  - no unlicensed media
```

## No Silent Guessing Policy

The compiler must distinguish between four states:

```yaml
status:
  complete: all required decisions are explicit
  inferred_with_receipt: safe defaults were applied and disclosed
  planning_only: execution details are incomplete
  blocked: rights, credentials, policy, or required assets are unresolved
```

Resolution priority:

```text
explicit user instruction
  -> project or campaign profile
  -> district canon and continuity ledger
  -> platform profile
  -> safe default
```

Every inferred field must include:

- inferred value
- source of the default
- confidence
- whether the user may override it

The system must not pretend an inferred decision came from the user.

## Organic Illustration and Live-Action Limits

### Organic illustration

Text alone may underdetermine hand-drawn characters, painterly texture, or highly specific illustration language.

Preferred routes:

- bind an approved reference image
- define simple geometric construction language
- generate and approve a source frame before animation

### Photography and live action

Real footage must be supplied as a rights-cleared asset or captured through an approved workflow.

The compiler may plan live-action edits, but it must not claim footage exists when no file or capture receipt is present.

## Provider-Neutral Packet

```yaml
creator_prompt_contract:
  version: "1.0"
  route: "/motion-graphics"
  status: "complete"
  intent: "Agentropolis Mission Control governance bumper"
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
      subject: "red mandate signal"
      action: "travels through the Mission Control spine"
      position: "top-center to central router"
      visual: "black liquid-glass interface with red refraction"
    - id: "beat_02"
      start_seconds: 2
      end_seconds: 4
      subject: "planner, specialists, and skeptic nodes"
      action: "activate in sequence and converge on the MCP capability bus"
      position: "three-column center grid"
      visual: "cyan edge light, restrained pulse, no decorative particles"
    - id: "beat_03"
      start_seconds: 4
      end_seconds: 6
      subject: "execution receipt"
      action: "stamps approved and locks into the audit ledger"
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
    - "hard settle on final receipt"
  negatives:
    - "no narration"
    - "no extra copy"
    - "no self-authorizing agent imagery"
    - "no random cyberpunk clutter"
    - "no provider watermark"
  assets:
    references: []
    rights_status: "not_required_for_generated_geometry"
  governance:
    requires_human_approval: true
    requires_media_diff: true
    log_prompt_and_defaults: true
  routing:
    capability: "creator.motion_graphics"
    provider: "unresolved_until_router_selection"
```

## Timeline Semantics

Each beat becomes a timeline segment or clip instruction.

```text
beat time range
  -> timeline segment
  -> asset and motion bindings
  -> transition boundary
  -> QC checkpoint
```

Changing a time value changes the edit contract.

This supports:

- provider prompt generation
- OpenCut-style timeline automation
- Blender marker generation
- WebGL animation sequencing
- storyboard cards
- render retries by failed beat
- media-diff comparison by segment

## Compiler Output

The Creator Prompt Compiler must return:

1. **Normalized Request** - concise statement of intent.
2. **Decision Ledger** - route, spec, beats, copy, technique, negatives.
3. **Missing Decision Report** - fields still unresolved.
4. **Inference Receipt** - defaults applied and their source.
5. **Timeline Map** - non-overlapping beat ranges.
6. **Provider-Neutral Prompt** - one-message human-readable prompt.
7. **Execution Manifest** - machine-readable packet.
8. **QC Contract** - what must be checked after rendering.
9. **Handoff** - capability router, adapter, or local renderer target.

## Validation Rules

A prompt is execution-ready only when:

- a route is resolved
- duration and output shape are resolved
- beats cover the intended runtime
- locked copy is exact
- techniques are observable
- negatives are present or explicitly empty
- source assets have rights status
- required credentials are referenced through an approved secret layer
- human approval is enabled for public release

The compiler must flag:

- timeline gaps
- unintended beat overlap
- impossible copy density
- contradictory motion instructions
- conflicting aspect ratios
- missing source files
- unknown rights status
- provider-specific claims without adapter verification
- negative constraints that conflict with the requested action

## Agentropolis Placement

```text
AGENTROPOLIS-CREATOR
  -> owns prompt compilation, storyboard timing, continuity, and delivery contracts

AGENTROPOLIS-AGENT-MCP
  -> validates adapter access, secret references, execution boundaries, and receipts

HERMES-CITY
  -> exposes public-safe creator commands and coordination surfaces

agentropolis
  -> consumes approved media references and receipts
```

## Governance Rules

- Do not claim a render occurred unless an execution tool returned an artifact or receipt.
- Do not infer provider availability, pricing, credentials, or account status.
- Do not expose raw API keys, private asset URLs, or client data.
- Do not execute rights-unclear source assets.
- Do not paraphrase locked copy.
- Do not silently invent missing creative decisions.
- Record all inferred defaults.
- Preserve district canon, subject identity, logos, and continuity locks.
- Require human review before public release.

## Canon Status

Status: Active Creator Foundry contract

Layer: Infrastructure

Owner: AGENTROPOLIS-CREATOR

Primary skill: `creator-prompt-compiler`

External pattern reference: HeyGen HyperFrames prompt anatomy guidance
