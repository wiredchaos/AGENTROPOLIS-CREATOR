# Blender Scripts

This folder is reserved for Python helpers that support the Agentropolis Creator asset pipeline.

## Planned Scripts

### register_asset_metadata.py

Purpose:

- read selected Blender objects
- apply Agentropolis metadata fields
- export sidecar `.json` files

### build_npc_pool.py

Purpose:

- collect human variants
- assign district tags
- group by LOD
- prepare collections for Geometry Nodes crowd presets

### validate_asset_license.py

Purpose:

- check required metadata fields
- flag missing source, author, or license data
- prevent unknown assets from being exported as public-ready

### export_web_scene.py

Purpose:

- export selected scene layers to `.glb`
- keep hero, midground, and background assets separated
- prepare R3F or Claw3D-friendly scene bundles

## Metadata Fields

Scripts should preserve these fields where possible:

```json
{
  "asset_id": "",
  "asset_type": "human",
  "district": "creator",
  "source_tool": "",
  "source_url": "",
  "author": "",
  "license": "",
  "license_status": "UNKNOWN",
  "rig": "",
  "lod": "",
  "tags": []
}
```

## Safety Rule

No script should mark an asset public-ready unless the license status is VERIFIED or ATTRIBUTION.
