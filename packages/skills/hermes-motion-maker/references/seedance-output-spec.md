# Seedance-Style Output Spec

## Purpose

Use this spec to turn a motion request into a delivery-ready AI video production packet.

The spec is provider-agnostic. Seedance-style means the packet is organized around scene direction, reference preservation, animation prompts, take review, and delivery QC.

## Output Structure

```yaml
motion_brief:
  title: ""
  duration_seconds: 6
  aspect_ratio: "9:16"
  platform: "x"
  intent: ""

reference_role_map:
  - asset_id: ref_01
    role: subject_identity
    locks: []

continuity_locks:
  must_preserve: []
  must_avoid: []

frame_plan:
  - frame_id: f01_start
    timestamp: "0.0s"
    camera: ""
    action: ""
    notes: ""

frame_prompt_batch:
  - frame_id: f01_start
    prompt: ""

video_prompt:
  prompt: ""
  negative_prompt: ""

arcads_mcp_packet:
  status: execution_ready
  adapter: arcads_motion
  required_review: true

qc_checklist:
  identity_drift: unchecked
  logo_warping: unchecked
  text_hallucination: unchecked
  hands_faces: unchecked
  background_integrity: unchecked
  crop_safe: unchecked
  rights_receipt: unchecked

delivery_packet:
  filename: ""
  format: mp4
  duration_seconds: 6
  aspect_ratio: "9:16"
  approved_for: internal_only | web | ott | social | game
  caption_notes: ""
  receipt_notes: ""
```

## Take Review Verdicts

Use one verdict per generated take:

```text
approved
approved_with_minor_notes
repair_required
reject_and_regenerate
blocked_rights_review
```

## Repair Levers

When a take fails, do not rewrite everything. Identify the smallest repair lever:

- reduce motion intensity
- lock camera
- use fewer frame transitions
- strengthen identity lock
- remove text/logos from generated region
- use parallax instead of full motion
- regenerate one keyframe only
- crop safer
- shorten duration
- switch to internal-only review

## Delivery Note Pattern

```markdown
Delivery status: [verdict]
Asset: [filename]
Use: [platform]
Known issues: [notes]
Rights status: [owned/licensed/public-safe/unknown]
Next action: [approve / repair / block / regenerate]
```
