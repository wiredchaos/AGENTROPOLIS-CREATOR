# Open Human Crowd

Open Human Crowd defines the open source character and crowd population pipeline for Agentropolis Creator.

## Role

Generate and manage human, NPC, companion, and crowd assets for Agentropolis scenes using open source or license-safe tools.

This skill replaces the need for a single commercial Humaniq-style dependency by chaining character generation, rigging, metadata, crowd placement, and license checks into one predictable workflow.

## Activation Triggers

Use this skill when the user asks to:

- find an open source equivalent to Humaniq
- create human assets for Blender
- populate a 3D Agentropolis scene
- generate NPC crowds
- build background characters
- rig human characters
- make a Blender crowd generator
- organize human or pet assets
- prepare characters for Claw3D, R3F, Hyperfy, Unreal-style previews, or cinematic web scenes

## Required Environment

Recommended:

- Blender 4.2 LTS or newer
- Rigify enabled
- Geometry Nodes enabled
- MB-Lab, MakeHuman, or MPFB2 for human generation
- Git LFS for large `.blend`, `.fbx`, `.glb`, image, and texture assets

Optional:

- CMU MoCap for motion data
- Mixamo for fast animation testing, free but not open source
- ComfyUI or Stable Diffusion for texture and wardrobe variations

## Chain Relationships

### Chains In

- Character concept prompts
- District population briefs
- Scene layout requirements
- Brand kit or wardrobe rules
- Canon character rules
- Asset license requirements

### Chains Out

- Blender asset metadata
- NPC pool definitions
- Geometry Nodes crowd presets
- Rigging notes
- License audit lists
- Scene population plans
- Web-ready export guidance

## Output Structure

When activated, return:

1. **Asset role**: hero, NPC, crowd, pet, companion, or background.
2. **Source path**: MB-Lab, MakeHuman, MPFB2, custom Blender, or external licensed asset.
3. **Rig path**: Rigify, source rig, simple gaze/torso rig, or no rig.
4. **Crowd plan**: surface scatter, curve path, density zone, or manual placement.
5. **License status**: verified, needs attribution, internal-only, or blocked.
6. **Export target**: `.blend`, `.glb`, `.fbx`, R3F, Claw3D, Hyperfy, or render-only.
7. **Next action**: exact file, preset, or scene step to create.

## Example

User request:

```text
Build me an open source Humaniq equivalent for Agentropolis Creator.
```

Expected response:

```text
Asset role: NPC crowd system
Source path: MPFB2 for base humans, MB-Lab for hero humans
Rig path: Rigify for hero assets, simplified rigs for background NPCs
Crowd plan: Geometry Nodes scatter presets for lobby, street, and conference floor
License status: generated assets need documented source and license sidecars
Export target: Blender master files plus GLB exports for web scenes
Next action: create registry/crowd-presets.md and blender/geometry-nodes/README.md
```

## Governance Notes

Do not import assets with unclear licenses.

Do not store large binaries directly in Git unless Git LFS is configured.

Do not treat free downloads as open source.

Do not use celebrity likenesses, trademarked uniforms, or ripped game assets.

Agentropolis needs reusable populations, not random asset hoarding.
