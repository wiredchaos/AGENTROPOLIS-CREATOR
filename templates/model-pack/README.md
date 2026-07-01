# Model Pack Template

Use this template for any fine-tuned model, adapter, alignment candidate, or model capability package produced by the Model Training Foundry.

A model pack is not approved by default.

It is a candidate until the required review files are complete and accepted.

## Required Files

```text
model-pack/
  README.md
  model-card.md
  dataset-card.md
  training-config.yaml
  eval-report.md
  risk-review.md
  license-review.md
  provenance.json
  export-manifest.json
```

## Package Lifecycle

```text
draft -> candidate -> verified -> approved -> released -> deprecated
```

## Required Fields

| Field | Required | Notes |
| --- | --- | --- |
| Package ID | yes | stable slug for registry |
| Base Model | yes | include model name, source, license |
| Training Tool | yes | Unsloth, LLaMA Factory, Axolotl, DeepSpeed, or other |
| Training Method | yes | LoRA, QLoRA, full, frozen, preference, other |
| Dataset Sources | yes | all sources must be listed |
| License Review | yes | no unknown license allowed for release |
| Eval Report | yes | required before approval |
| Risk Review | yes | required before approval |
| Rollback Plan | yes | required before runtime adoption |

## Approval Rule

No model pack ships without:

- dataset provenance
- license review
- eval report
- risk review
- export manifest
- rollback path
- district owner approval
