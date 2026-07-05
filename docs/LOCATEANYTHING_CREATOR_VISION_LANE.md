# LocateAnything Creator Vision Lane

Status: candidate

Repo role: Agentropolis Construction District and Foundry.

## Purpose

NVIDIA LocateAnything-3B is tracked as an optional vision grounding backend for creator-facing asset QA, scene inspection, and BoardForge world authoring.

This lane lets Creator tools ask visual questions like:

- locate every chess piece in this screenshot
- find the BF shield crown
- find all cyan buttons
- locate missing Doginal Dogs props
- find the PFP battle banner
- detect UI overlap in a mobile screenshot
- locate interactable Arena District objects

## Canon boundary

AGENTROPOLIS-CREATOR designs and packages assets.
It does not redefine Agentropolis law.
It does not bypass AGENTROPOLIS-AGENT-MCP governance.
It does not add wallet connection to BoardForge.

```text
creator asset
  -> visual grounding
  -> coordinates, labels, confidence
  -> QA report or repair prompt
  -> governed export packet
```

## BoardForge fit

BoardForge theme packs remain pure JSON data.

LocateAnything can support the authoring layer by helping creators validate that a theme pack visually resolves as intended.

Examples:

```text
Doginal Dogs world render
  -> locate crown, paw, banner, board, pieces
  -> compare against expected theme manifest
  -> emit QA warnings
```

```text
mobile gameplay screenshot
  -> locate buttons and board zones
  -> check tap target spacing
  -> flag overlap or unreadable UI
```

## Creator tool candidates

- `ground_asset_prompt`
- `locate_scene_object`
- `detect_missing_theme_props`
- `inspect_ui_layout`
- `extract_visual_feature_map`
- `generate_asset_qa_report`

These are Creator-facing workflow names. Execution should route through the MCP membrane when connected to live models or hosted inference.

## Theme manifest QA

Recommended manifest extension:

```json
{
  "vision_qa": {
    "provider": "nvidia-locateanything-3b",
    "required_targets": [
      "BF shield",
      "gold crown",
      "chess board",
      "PFP battle banner"
    ],
    "minimum_confidence": 0.75,
    "fail_mode": "warn"
  }
}
```

`fail_mode` should default to `warn` while the lane remains candidate.

## Asset storage

Do not commit generated screenshots, recordings, PFP uploads, model weights, or safetensors to this repository.

Large visual assets should route to an approved object store such as R2.

## License caution

The referenced Hugging Face screenshot identifies the model license as `nvidia-license`.

Until the license is reviewed:

- keep this lane optional
- keep adapters provider-replaceable
- do not bundle weights
- do not market it as permissive open source
- do not make it required for Creator exports

## District Exchange routing

```text
AGENTROPOLIS-CREATOR
  -> create visual asset or world render
  -> run optional vision QA
  -> produce repair prompt or QA report
  -> package District Exchange candidate
  -> AGENTROPOLIS-AGENT-MCP validates tool receipt
  -> agentropolis consumes approved package reference
```

## Decision

Approved as a Creator candidate lane for visual grounding, asset indexing, BoardForge world QA, and accessibility authoring.

Core lock:

```text
LocateAnything-3B = optional Creator perception backend
Creator = asset and world foundry
MCP = governed execution membrane
BoardForge = engine-first Arena District
```