# HOLOFOIL Avatar Renderer

Creator District package for converting a verified Gaming District avatar-card source into approved HOLOFOIL card art.

## Boundary

This package renders. It does not determine gameplay truth, ownership, achievements, card stats, or rarity eligibility.

## Inputs

- signed `avatar-card-source` payload
- 2D avatar image, GLB/VRM model, or approved animation frame
- appearance hash
- approved pose identifier
- frame, background, foil, and card-back selections
- rights and attribution metadata

## Outputs

- transparent avatar portrait PNG
- card hero image
- thumbnail
- optional animated card loop
- render manifest
- rights and attribution record
- render receipt

## Protected fields

The renderer must preserve:

- player ID
- game ID
- avatar ID
- appearance hash
- gameplay values
- achievements
- card stats
- rarity ceiling
- source receipt ID

## Determinism

The same source payload, renderer version, and style configuration must produce the same render manifest and content hash.

## Event flow

```text
avatar.card_render.requested
  -> validate source signature
  -> resolve rights-cleared avatar asset
  -> render preview
  -> human/player approval when required
  -> render final assets
  -> emit avatar.card_render.completed
  -> issue receipt
```

## Required manifest fields

```json
{
  "schemaVersion": "1.0.0",
  "packageVersion": "0.1.0",
  "sourceReceiptId": "rcpt_...",
  "avatarId": "avatar_...",
  "appearanceHash": "sha256:...",
  "approvedPoseId": "pose_front_01",
  "frameId": "frame_arcade_01",
  "backgroundId": "bg_neon_grid_01",
  "foilStyleId": "foil_prismatic_01",
  "outputs": {
    "portraitPng": "https://...",
    "cardHeroPng": "https://...",
    "thumbnailPng": "https://..."
  },
  "rightsStatus": "approved",
  "attribution": [],
  "renderer": {
    "name": "agentropolis-creator",
    "version": "0.1.0"
  },
  "renderReceiptId": "rcpt_..."
}
```

## Card templates

- Avatar Card
- Achievement Card
- Mission Card
- Evolution Card
- Crew/Faction Card

No collection-specific branding may be hard-coded into this shared package.
