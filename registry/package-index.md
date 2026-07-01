# Package Index

District Exchange package index for AGENTROPOLIS-CREATOR.

This file tracks governed candidate and approved packages produced by the Foundry.

## Package States

| State | Meaning |
| --- | --- |
| draft | incomplete working package |
| candidate | structurally complete, not yet verified |
| verified | passed required checks, not yet approved for release |
| approved | eligible for release or handoff |
| released | published to District Exchange or downstream runtime reference |
| deprecated | replaced, retired, or blocked from future use |
| rejected | failed review and cannot move forward without rebuild |

## Package Types

| Type | Description | Required Verifier |
| --- | --- | --- |
| skill | executable skill contract | Verifier |
| workflow | repeatable operating procedure | Verifier |
| mcp_kit | governed tool adapter kit | Verifier |
| worldforge_pack | scene/world candidate package | Verifier |
| media_pack | timeline/render package | Verifier |
| model_pack | fine-tuned model or adapter package | Model Pack Verifier |
| eval_suite | benchmark and scoring package | Verifier |
| commerce_kit | wallet/payment/settlement package | Verifier + governance gate |

## Handoff Destinations

| Destination | Receives | Rule |
| --- | --- | --- |
| District Exchange | approved package metadata and install path | only approved or released packages |
| AGENTROPOLIS-CITY | approved room specs, world packs, scene references, visual runtime packages | no candidate packages |
| wiredchaos/agentropolis | approved City OS references, registry routes, skill/runtime package references | no unverified packages |
| Runtime Agents | approved capabilities with rollback path | no direct candidate access |

## Package Entry Template

```json
{
  "id": "package-id",
  "name": "Human Readable Name",
  "type": "skill|workflow|mcp_kit|worldforge_pack|media_pack|model_pack|eval_suite|commerce_kit",
  "district": "Construction District",
  "status": "draft|candidate|verified|approved|released|deprecated|rejected",
  "risk_level": "low|medium|high",
  "source_path": "packages/...",
  "verifier": "Verifier|Model Pack Verifier",
  "approval_required": true,
  "approved_by": null,
  "handoff_targets": [
    "District Exchange"
  ],
  "rollback_path": "verify",
  "notes": ""
}
```

## Initial Registry Hooks

```json
[
  {
    "id": "model-training-foundry",
    "name": "Model Training Foundry",
    "type": "workflow",
    "district": "Construction District",
    "status": "candidate",
    "risk_level": "medium",
    "source_path": "docs/model-training-foundry.md",
    "verifier": "Verifier",
    "approval_required": true,
    "approved_by": null,
    "handoff_targets": [
      "District Exchange",
      "wiredchaos/agentropolis"
    ],
    "rollback_path": "remove registry hook and model-pack lane references",
    "notes": "Foundry lane for model-pack production, eval, provenance, and handoff."
  },
  {
    "id": "model-pack-verifier",
    "name": "Model Pack Verifier",
    "type": "skill",
    "district": "Construction District",
    "status": "candidate",
    "risk_level": "medium",
    "source_path": "skills/model-pack-verifier/skill.md",
    "verifier": "Verifier",
    "approval_required": true,
    "approved_by": null,
    "handoff_targets": [
      "District Exchange"
    ],
    "rollback_path": "remove verifier skill from package index",
    "notes": "Checks model-pack candidates before release."
  }
]
```

## Global Rule

The package index is the boundary between foundry work and city infrastructure.

If it is not indexed, verified, and approved, it is not infrastructure.
