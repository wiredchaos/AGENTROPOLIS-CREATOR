# Model Pack Verifier

## Name

model-pack-verifier

## Role

Verify Agentropolis model-pack candidates before they can enter District Exchange, city runtime references, or agent deployment lanes.

## District

Construction District / Model Training Foundry

## Tier

infrastructure

## Layer

institution

## Activation Triggers

Use this skill when the user asks to:

- verify a model pack
- approve a model pack
- inspect a fine-tuning package
- check a LoRA candidate
- prepare a model for District Exchange
- validate model-pack handoff
- block unsafe model release

## Requires

- repository access to the model-pack folder
- readable markdown/json/yaml files
- no live training required

## Expected Input

```json
{
  "model_pack_path": "packages/model-packs/<model-pack-id>",
  "target_release": "draft|candidate|district_exchange|city_runtime|agentropolis_runtime",
  "strict": true
}
```

## Required Files

The verifier must check for:

```text
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

## Verification Checklist

### Structure

- all required files exist
- package id is consistent across files
- status is explicit
- district is explicit
- target agents are explicit or intentionally empty

### Provenance

- base model source is listed
- base model license is listed
- training tool is listed
- training config is present
- dataset sources are listed
- data approval state is explicit

### License

- base model license is reviewed
- dataset licenses are reviewed
- tool licenses are reviewed
- output restrictions are documented

### Evaluation

- required evals are listed
- task eval results are present
- safety behavior check is present
- hallucination/factuality check is present
- regression check is present when replacing an existing model pack

### Risk

- risk level is assigned
- runtime constraints are listed
- unresolved risks are documented
- rollback trigger is defined

### Export

- export targets are listed
- required-before-release fields are complete
- rollback path exists
- downstream destination is explicit

## Release Rules

### Draft

May be incomplete.

### Candidate

Must include model card, dataset card, training config, and provenance.

### District Exchange

Must include all required files plus license review, risk review, and eval report.

### City Runtime / Agentropolis Runtime

Must include all required files, approval status, rollback path, and downstream owner approval.

## Blockers

Block release if:

- provenance is missing
- license is unknown
- eval report is missing
- risk level is missing
- rollback path is missing
- export target is unclear
- approval status is still draft
- package requests high-impact authority without governance constraints

## Output Structure

Return:

```json
{
  "model_pack_id": "id",
  "status": "pass|fail|needs_review",
  "release_allowed": false,
  "target_release": "district_exchange",
  "missing_files": [],
  "blocking_issues": [],
  "warnings": [],
  "required_next_actions": [],
  "handoff_targets": []
}
```

## Chains To

- registry/package-index.md
- workflows/model-pack-candidate.md
- docs/model-training-foundry.md
- docs/system-wide-execution-lane.md

## Example

```text
Verify packages/model-packs/construction-district-qwen-lora for District Exchange release.
```

Expected result: pass/fail report with blockers and handoff readiness.

## Canon Rule

No provenance, no package.
No eval, no release.
No governance, no city deployment.
