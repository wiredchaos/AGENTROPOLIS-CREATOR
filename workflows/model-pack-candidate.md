# Model Pack Candidate Workflow

## Purpose

Create a governed model-pack candidate from a training idea, then move it through verification before any District Exchange or runtime handoff.

## Trigger Phrases

- build a model pack
- fine-tune this for Agentropolis
- create a LoRA candidate
- package this model for District Exchange
- verify this model pack
- prepare model pack handoff

## Inputs

```json
{
  "request": "plain-language training goal",
  "base_model": "model name and source",
  "training_tool": "unsloth|llama_factory|axolotl|deepspeed|other",
  "training_method": "lora|qlora|full|frozen|preference|other",
  "dataset_sources": [],
  "target_district": "Construction District",
  "target_agents": [],
  "risk_level": "low|medium|high"
}
```

## Steps

### 1. Create Candidate Folder

Copy:

```text
templates/model-pack/
```

into:

```text
packages/model-packs/<model-pack-id>/
```

### 2. Fill Required Cards

Complete:

- `model-card.md`
- `dataset-card.md`
- `training-config.yaml`
- `provenance.json`

### 3. Run Training Candidate

Training may use:

- Unsloth AI for fast local LoRA/QLoRA
- LLaMA Factory for broad operator workflows
- Axolotl for YAML-driven research and preference training
- DeepSpeed for justified distributed jobs

Training output remains candidate-only.

### 4. Create Evaluation Report

Complete:

- `eval-report.md`
- task-specific evals
- hallucination/factuality checks
- safety behavior checks
- regression checks

### 5. Complete Reviews

Complete:

- `risk-review.md`
- `license-review.md`
- `export-manifest.json`

### 6. Verify Package

Run or invoke:

```text
skills/model-pack-verifier/skill.md
```

The verifier checks required files, metadata, release blockers, and handoff readiness.

### 7. Register Candidate

If verified, add an entry to:

```text
registry/package-index.md
```

### 8. Handoff

Only approved model packs may be routed to:

- District Exchange
- AGENTROPOLIS-CITY
- wiredchaos/agentropolis
- runtime agents

## Release Blockers

A model pack must not be approved if:

- dataset provenance is missing
- base model license is unknown
- dataset license is unknown
- eval report is missing
- risk review is missing
- export manifest is incomplete
- rollback plan is missing
- district owner approval is missing

## Output Structure

```text
packages/model-packs/<model-pack-id>/
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

## Final Rule

Candidate is not canon.

Verified is not deployed.

Approved is eligible for release.

Released is still rollback-ready.
