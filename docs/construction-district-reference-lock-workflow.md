# Construction District Reference Lock Workflow

## Purpose

This workflow turns rough image references into a governed AGENTROPOLIS-CREATOR production pack.

The pack locks:

- character identity
- costume and silhouette
- facial expression range
- props
- environment
- camera language
- weather continuity
- scene staging
- metadata sidecars
- downstream handoff rules

This is not random image generation. This is reference-locked asset production for Agentropolis.

```text
reference images
  -> character sheets
  -> prop sheets
  -> environment sheets
  -> shot prompt pack
  -> continuity review
  -> approved candidate package
  -> District Exchange / City handoff
```

## Construction District Canon

AGENTROPOLIS-CREATOR is the Construction District and Foundry.

The Construction District creates reusable city assets, but it does not decide what becomes permanent canon. Permanent adoption requires verification, registry entry, and downstream approval.

```text
AGENTROPOLIS-CREATOR
  builds the asset pack

Verifier
  checks structure, provenance, continuity, license, risk, and handoff readiness

District Exchange
  indexes approved packages

agentropolis
  owns city law and canon

HERMES-CITY / AGENTROPOLIS-CITY
  visualize approved public or runtime surfaces

AGENTROPOLIS-AGENT-MCP
  exposes controlled tool lanes and machine-readable schemas
```

## Reference Image Classes

Each production pack should separate references into explicit classes.

| Class | Purpose |
| --- | --- |
| Character sheet | Locks identity, body, face, outfit, acting range |
| Prop sheet | Locks object scale, material, damage states, held views |
| Environment sheet | Locks buildings, street layout, weather, lighting, staging |
| Action sheet | Locks movement style, throws, catches, impacts, idles |
| Shot sheet | Locks camera, lens feel, edit timing, audio, and continuity |

## Required Output Pack

```text
references/
  characters/
    construction_foreman_agent/
      character_sheet.png
      expression_sheet.png
      animation_sheet.png
      metadata.json
      voice_profile.md
      prompt.md
    chaos_builder_agent/
      character_sheet.png
      expression_sheet.png
      animation_sheet.png
      metadata.json
      voice_profile.md
      prompt.md
  props/
    prototype_model_pack/
    blueprint_tube/
    failed_eval_stamp/
    asset_crate/
  environments/
    construction_district_intersection/
      environment_sheet.png
      weather_lock.md
      staging_lock.md
      camera_lock.md
      metadata.json

templates/
  video-prompts/
    construction-district-reference-lock.md
    construction-district-shotlist.json

workflows/
  construction-district-reference-lock-review.md
```

## Character Sheet Standard

Every character sheet must include at least eight panels:

1. Front full body neutral stance
2. Left profile full body
3. Right profile full body
4. Rear full body
5. Front portrait neutral expression
6. Angry expression
7. Laughing expression
8. Signature action pose

Recommended optional panels:

- wet weather version
- prop-held version
- impact reaction
- walking pose
- idle pose
- close-up profile

## Character Metadata Schema

```json
{
  "character_id": "construction_foreman_agent",
  "district": "Construction District",
  "faction": "Agentropolis Engineering Authority",
  "role": "Verification Supervisor",
  "age_range": "older adult",
  "height": "tall",
  "body_type": "sturdy, upright, heavy stance",
  "skin_tone": "defined by approved reference sheet",
  "hair": "white or grey, locked to sheet",
  "eyes": "locked to sheet",
  "primary_colors": ["white", "safety yellow", "industrial grey"],
  "accent_colors": ["red", "cyan"],
  "materials": ["wet fabric", "rubber boots", "metal cane", "plastic hardhat"],
  "accessories": ["glasses", "inspection cane", "utility belt", "work gloves"],
  "signature_props": ["blueprint tube", "failed eval stamp", "inspection cane"],
  "movement_style": "slow, stiff, cranky, deliberate, cane-led gestures",
  "personality": "old systems inspector, unimpressed, dry humor, hard to rattle",
  "voice_profile": "older, gruff, slow cadence, dry, natural breathing",
  "continuity_notes": [
    "never becomes glossy or animated",
    "keeps verification gate behind him",
    "stays on his side of the street"
  ]
}
```

## Character Sheet Prompt: Construction Foreman Agent

```text
Create a photoreal character reference sheet for AGENTROPOLIS-CREATOR.

CHARACTER:
Construction Foreman Agent, older verification supervisor for the Agentropolis Construction District.

IDENTITY LOCK:
Older adult, stern face, white or grey hair, short beard or goatee, glasses, weathered features, serious eyes, cranky systems-architect energy.

WARDROBE:
White or pale industrial work suit, wet safety vest, white hardhat, work gloves, steel-toe boots, utility belt, inspection cane or inspection rod, optional blueprint tube.

STYLE:
Photoreal, raw production reference, neutral lens, no stylization, no cartoon, no anime, no glossy color grade.

SHEET LAYOUT:
8-panel reference sheet on a clean neutral background.
Panel 1: front full body neutral stance.
Panel 2: left full body profile.
Panel 3: right full body profile.
Panel 4: rear full body.
Panel 5: front portrait neutral expression.
Panel 6: angry expression, jaw tight, nostrils flared, brow compressed.
Panel 7: dry smug smirk, unimpressed eyes.
Panel 8: signature action pose holding inspection cane and blueprint tube.

CONTINUITY:
Same face, same body, same outfit, same materials, same colors, same accessories in every panel.
No on-screen text except small panel labels if the tool requires labels.
```

## Character Sheet Prompt: Chaos Builder Agent

```text
Create a photoreal character reference sheet for AGENTROPOLIS-CREATOR.

CHARACTER:
Chaos Builder Agent, loud creator-engineer for the Agentropolis Construction District.

IDENTITY LOCK:
Expressive face, wild hair or helmet silhouette, manic builder energy, fast comedic movement, big eyes, wide mouth expressions, elastic but fully photoreal performance.

WARDROBE:
Bright construction jumpsuit, red-white striped sleeves or high-contrast creator-worker sleeves, work boots, tool belt, rain-wet fabric, optional gloves, optional prototype pack harness.

STYLE:
Photoreal, raw production reference, neutral lens, no stylization, no cartoon, no anime, no glossy color grade.

SHEET LAYOUT:
8-panel reference sheet on a clean neutral background.
Panel 1: front full body neutral stance.
Panel 2: left full body profile.
Panel 3: right full body profile.
Panel 4: rear full body.
Panel 5: front portrait neutral expression.
Panel 6: laughing expression, doubled-over energy, eyes squeezed, mouth wide.
Panel 7: taunting expression, eyebrows raised, grin sharp.
Panel 8: signature action pose throwing a prototype model pack.

CONTINUITY:
Same face, same body, same outfit, same materials, same colors, same accessories in every panel.
No on-screen text except small panel labels if the tool requires labels.
```

## Prop Sheet Prompt

```text
Create a photoreal prop reference sheet for AGENTROPOLIS-CREATOR.

PROP:
Prototype model pack for the Construction District.

LOOK:
A wet, compact, throwable asset bundle about the size of a burger box or small toolkit. It contains miniature foam blocks, tags, model fragments, paper plans, resin-like splatter material, and tiny construction labels.

SHEET LAYOUT:
8-panel prop sheet on neutral background.
Panel 1: front view closed.
Panel 2: side view closed.
Panel 3: rear view closed.
Panel 4: top view.
Panel 5: open view showing contents.
Panel 6: held in hand for scale.
Panel 7: mid-air thrown pose.
Panel 8: exploded wet impact state with fragments and splatter.

STYLE:
Photoreal, practical prop, no cartoon, no glossy render, no fake UI.
```

## Environment Sheet Prompt

```text
Create a photoreal environment reference sheet for AGENTROPOLIS-CREATOR.

ENVIRONMENT:
Agentropolis Construction District intersection on a rainy overcast day.

LOCKED STAGING:
Two industrial storefronts or facilities sit on opposite corners across a wide wet American downtown street.
Left / Foreman side: red-white verification gate, engineering authority facade, inspection bay, asset approval signage, scaffolding, loading door.
Right / Builder side: yellow-red creator workshop, model forge, prop loading bay, tool carts, asset crates, construction barriers.

WEATHER:
Grey cloudy sky, steady moderate rain, visible streaks, wet reflective asphalt, puddles, rain light enough to read faces.

SHEET LAYOUT:
6-panel environment sheet.
Panel 1: wide street view showing both opposite corners.
Panel 2: Foreman verification gate facade.
Panel 3: Builder creator workshop facade.
Panel 4: street-level puddle and reflective asphalt detail.
Panel 5: prop-littered street after the duel.
Panel 6: top-down staging diagram showing both character zones and no-go middle street.

STYLE:
Raw camera reference, natural light, no color grading, no glossy cinematic polish.
No on-screen text except environmental signage that belongs to the district.
```

## Main Video Prompt Template

```text
PROJECT:
AGENTROPOLIS-CREATOR / Construction District reference-lock scene test.

GOAL:
Create raw cinematic proof footage for a governed 3D/video asset pipeline. The scene must prove that character identity, props, environment, camera behavior, acting style, and continuity can remain locked across multiple generations.

LOOK:
Raw film camera footage, overcast rainy day, grey cloudy sky, steady moderate rain with visible streaks, wet reflective streets, puddles, soft flat daylight. No color grading. No glossy commercial polish. Real unedited production footage.

CAMERA:
Handheld shaky throughout. Dynamic whip-pans, fast snap pushes, quick zooms, impact-timed camera movement. Tight close-ups may stabilize briefly.

CHARACTER LOCK:
Use the approved reference sheet for each character. Maintain face, costume, silhouette, colors, age, expression range, and body language across every shot.

CHARACTER A:
Construction Foreman Agent. Older cranky systems architect energy. White or pale industrial work suit, glasses, utility cane or inspection rod, stern face, slow heavy movement, dismissive hand waves, annoyed eye-rolls. Acts like the old city inspector who has seen every broken build before.

CHARACTER B:
Chaos Builder Agent. Loud creator-engineer energy. Bright construction district jumpsuit, wild hair or helmet silhouette, rubbery expressive movement, big arm swings, taunting laughter, fast lunges, over-the-top but photoreal.

ENVIRONMENT LOCK:
Agentropolis Construction District. Rainy wide city street inside the Agentropolis foundry zone. Opposite corners: red-white industrial verification gate and yellow-red creator workshop / asset forge. Wet asphalt, puddles, reflective sidewalks, unfinished towers, cranes, scaffolding, construction barriers, loading bays, tool carts, asset crates.

STAGING:
Foreman Agent always remains in front of the verification gate. Chaos Builder Agent always remains in front of the creator workshop across the street. They never meet in the middle. Each character's building must remain visible behind them.

PROPS:
Foreman throws rejected build manifests, broken asset crates, failed eval stamps, and heavy blueprint tubes. Chaos Builder throws prototype model packs, glitched props, foam blocks, and chaotic scene kits.

AUDIO:
No music. Only diegetic sound: rain, boots in puddles, distant generators, crane beeps, tool clanks, object whooshes, wet impacts, breathing, clothing movement, street ambience.

TEXT:
No subtitles. No on-screen captions. No floating labels. No fake UI text unless it is part of locked environment signage.

SHOT 1:
Medium shot on Foreman Agent standing in front of the verification gate. Rain beads on his glasses. He raises one hand to catch a flying prototype model pack. It swerves past his palm and splats into his face, bursting into foam blocks, sauce-like resin, paper tags, and wet asset fragments. Quick zoom in. His face trembles. Jaw twitching. Nostrils flare. One eye ticks. His knuckles whiten around the inspection cane. He drags one slow breath through gritted teeth and says: "You brought a prototype to a production gate, kid."

SHOT 2:
Hard cut to high angle close-up on Chaos Builder Agent doubled over laughing in front of the creator workshop. He slaps his knee, rain bouncing off his shoulders, eyes squeezed into manic slits. He howls: "What about a whole district?"

SHOT 3:
Whip-pan back to Foreman Agent. He slowly lifts a heavy blueprint tube like a cannon. Rain runs down his face. He scowls, taps the cane once, then launches the tube across the street. The camera snap-pushes with the throw.

SHOT 4:
Chaos Builder Agent catches the blueprint tube badly. It bursts open into soaked district plans, asset cards, and glowing construction diagrams. He staggers back, still laughing, then suddenly freezes when he sees the approved stamp inside.

SHOT 5:
Wide street shot. Both characters are visible on opposite corners with their buildings behind them. Rain continues at same intensity. The street between them becomes littered with prototypes, manifests, props, asset crates, and broken test objects. The city is being built through chaos.

FINAL FEEL:
Comedic infrastructure war. Photoreal. Raw footage. Agentropolis foundry energy. The city builds itself, but governance still checks the work.
```

## Verification Checklist

A candidate fails review if any of the following happen:

- character face drifts from sheet
- costume or silhouette changes without approval
- rain intensity changes across shots
- scene becomes glossy, graded, animated, or game-like when prompt requires raw footage
- characters meet in the middle of the street
- the wrong building appears behind the wrong character
- subtitles or on-screen captions appear
- logos from external brands appear by accident
- props are unrecognizable or inconsistent
- voice tone does not match performance
- camera becomes too stable during action beats
- metadata sidecar is missing
- license or provenance is unclear

## Candidate Package Metadata

```json
{
  "package_id": "construction-district-reference-lock-demo",
  "repo": "wiredchaos/AGENTROPOLIS-CREATOR",
  "district": "Construction District",
  "status": "candidate",
  "asset_classes": ["characters", "props", "environment", "video_prompt", "shotlist"],
  "requires_review": true,
  "handoff_targets": [
    "wiredchaos/agentropolis",
    "wiredchaos/HERMES-CITY",
    "wiredchaos/AGENTROPOLIS-AGENT-MCP"
  ],
  "guardrails": [
    "reference lock required",
    "metadata sidecars required",
    "no live runtime state in CREATOR",
    "no permanent canon adoption without approval"
  ]
}
```

## Anti-Moloch Rule

Speed does not override coherence.

A faster generation that breaks identity, staging, provenance, or governance is not a win. It is entropy entering the city.

The Foundry can produce chaos, but the city only adopts governed chaos.
