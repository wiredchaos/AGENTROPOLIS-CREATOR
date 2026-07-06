# Motion Prompt Patterns

## Prompt Contract

Every prompt should protect the reference image first.

```text
[subject lock], [environment lock], [camera motion], [action], [lighting], [style fidelity], [duration/aspect], [negative constraints]
```

## Motion Brief Pattern

```markdown
Create a [duration]-second [aspect ratio] motion clip from the reference image.
Preserve [identity/wardrobe/props/environment/logo/color palette].
Camera: [motion].
Action: [specific micro-action].
Mood: [tone].
Do not change [negative constraints].
```

## Nano Banana-Style Frame Prompt Batch

Use for still frame generation before video assembly.

```yaml
frames:
  - frame_id: f01_start
    prompt: "Exact reference subject preserved, starting pose, camera locked, environment unchanged, clean readable details."
  - frame_id: f02_motion
    prompt: "Same subject and wardrobe, slight motion progression, camera begins slow push, lighting unchanged, no identity drift."
  - frame_id: f03_end
    prompt: "Same subject and setting, final pose, subtle expression or prop movement, consistent composition, no extra objects."
```

## Seedance-Style Video Prompt

Use for image-to-video or frame-to-video animation.

```text
Use the reference image as the identity and composition anchor. Create a smooth [duration]-second [aspect ratio] video. Preserve the subject's face, wardrobe, props, logo placement, background layout, and color palette. Camera performs [camera motion]. Subject performs [action]. Lighting remains [lighting]. Motion should feel [style]. Avoid face changes, hand distortion, text warping, logo mutation, background melting, extra characters, and wardrobe changes.
```

## Camera Motion Library

| Motion | Use |
|---|---|
| slow_push | luxury reveal, poster animation, cinematic intro |
| dolly_in | dramatic emphasis, character reveal |
| orbit | product, avatar, hero object |
| locked_off_micro_motion | safest character continuity |
| handheld_energy | chaotic live footage style |
| whip_pan | action cuts and sports/news energy |
| parallax_depth | still poster to motion plate |
| rack_focus | object or logo emphasis |

## Continuity Locks

Always name what cannot change:

```yaml
continuity_locks:
  identity:
    - face shape
    - hairstyle
    - skin tone
    - expression baseline
  wardrobe:
    - clothing type
    - color
    - accessories
  props:
    - object count
    - object position
    - logo/text placement
  environment:
    - background layout
    - lighting direction
    - palette
```

## Negative Constraints

```text
no identity drift, no face morphing, no extra people, no text hallucination, no logo warping, no hand distortion, no melted background, no wardrobe swap, no prop mutation, no random camera shake unless requested
```
