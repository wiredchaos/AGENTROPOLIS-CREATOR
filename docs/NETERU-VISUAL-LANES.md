# NETERU Dual Visual Lane Lock

**Authority:** operator direction supplied 2026-08-10
**Applies to:** COINTELPR0/NETERU moving-image production
**Invariant:** `STYLE + CONTINUITY + DIRECTION` remain locked; `SHOT` is the only variable.

## NTRU Studios — photoreal lane

### `NTRU_STYLE_LOCK`

- Hyper-real cinematic 3D photorealism with an Octane-like path-traced aesthetic.
- Physically based materials and lighting: skin microtexture and pores, individual hair fibers, fabric weave, brushed metal, glass, dust, fingerprints, and plausible surface wear.
- High-dynamic-range illumination with motivated practical sources, physically plausible bounce, natural shadow falloff, and restrained volumetric atmosphere.
- Live-action optical behavior: controlled depth of field, lens characteristics, subtle chromatic aberration, realistic motion blur, and credible sensor response.
- No anime linework, illustration, painterly treatment, plastic CGI skin, or generic game-engine look.

“Octane-like” describes the target path-traced appearance; it does not require or falsely claim use of a particular renderer.

### `NTRU_CONTINUITY_LOCK`

Characters retain identical facial structure, hairstyles, skin tone, body proportions, wardrobe, weapons, and insignia across shots. Environmental geography and all hero-prop dimensions remain stable.

ALKebulan's locked material language is blackened metal, warm gold inlay, deep emerald-black surfaces, African geometric architecture, advanced holographic systems, handcrafted detail, and futuristic engineering. ALKebulan is the canonical cultural/world reference.

**Absolute negative:** no Wakanda references, text, iconography, branding, prompt shorthand, filenames, or metadata. Do not fill canon gaps with generic Egyptian mythology, generic Afrofuturism, or numerology.

### `NTRU_DIRECTION_LOCK`

- Use live-action camera grammar. Every shot declares lens/focal length, camera height, movement, focal target, motivated light sources, and cut motivation.
- Preferred vocabulary includes 24mm slow dolly, 35mm handheld follow, 50mm locked medium, 85mm shallow-depth close-up, and 100mm macro insert—but focal length follows story function.
- Movement has weight and inertia. Characters and objects obey realistic physics.
- No floating-camera AI drift, arbitrary zooms, unmotivated orbiting, or focal-target wandering.

## 789 Studios — cel-shaded anime lane

789 Studios retains a clearly cel-shaded anime language. It is not replaced by NTRU photorealism and must not inherit photoreal skin, lens, or surface treatment. Its exact anime style sheet, palette, line behavior, effects language, and animation cadence remain pending approved live-canon or character references.

A mature master remains routed through NTRU Studios/NTRU-OTT. An approved 789 passage may exist within that master as a distinct representational layer; 789 is not the release owner.

## Editorial fusion rule

Fusion happens in editing, never by muddying both render languages inside a frame. NTRU and 789 may show the same locked event through:

- match cuts on pose, silhouette, gaze, prop orientation, or composition;
- cuts on motion, impact, light change, or sound transient;
- shared action IDs and continuity state before and after the cut.

Do not create half-anime/half-photoreal dissolves, hybrid skin shaders, style morphs, or generic “AI fusion” frames.

## Locked ALKebulan classroom translation

### Continuity

- Two Black teenage students stand back-to-back in the center aisle.
- The girl has long cobalt-blue braids with gold cuffs, a black academy uniform with restrained gold geometric embroidery, and an ornate black-and-gold scythe.
- The boy has short textured locs, a matching black academy uniform, and a large black-and-gold ceremonial combat hammer.
- The fixed room has a chalkboard wall, African continental schematic, black/gold desks, cyan holographic interfaces, and large windows overlooking a futuristic African metropolis.
- Reference-image numerals, incidental generated text, generic Egyptian marks, and studio marks are not automatically part of the set or costumes.

### Establishing shot

```text
SHOT NTRU_CLASSROOM_001
Lens: 35mm cinema lens.
Camera: eye-level, medium-wide, symmetrical; slow controlled dolly inward.
Focus: both students in the center aisle.
Light: warm late-afternoon sunlight from camera left; cyan holographic practicals as secondary illumination; natural skin exposure; subtle volumetric dust.
Action: neither student changes position. The girl watches camera-left; the boy watches camera-right. Both weapons remain lowered but ready. One holographic panel changes from blue to warning amber.
```

### Cross-lane match-cut example

```text
SHOT NTRU_017
85mm macro. The girl's fingers tighten around the physical scythe handle: brushed black titanium, approved gold geometry, shallow depth of field. A cyan diagnostic reflection crosses her eye.

CUT ON MOTION

SHOT 789_018
Extreme anime close-up. The same grip closes around the cel-shaded scythe. An approved 789 reflection color crosses her eye, followed by a whip-pan into the same locked action event.
```

The reflection color and attack remain approval fields until the 789 palette and story action are canon-locked.

## Cost-controlled production path

```text
approved script
  -> shot contract
  -> spatial blockout
  -> motion/camera previs
  -> approved framing
  -> existing-vault asset enumeration
  -> story/asset matching
  -> editorial selection and conform
  -> stem assembly
  -> edit, grade, mix, and finish
```

The open-source Higgsfield skills layer is required content-inventory infrastructure, subject to the read-only gates in `film/HIGGSFIELD-CONTENT-VAULTS.md`; it is not a generation fallback. Existing vault media is matched to story requirements. Wasserman's Filmmaker Suite supplies the intended blockout, motion-previs, stem, and DaVinci lane after its installed revision is audited. Tool choice does not alter canon or visual locks.
