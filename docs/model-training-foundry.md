# Model Training Foundry

## Purpose

The Model Training Foundry extends AGENTROPOLIS-CREATOR from visual construction into intelligence construction.

CREATOR already builds district assets, rooms, NPCs, media packages, workflows, skills, MCP kits, and governed construction outputs. The Model Training Foundry adds a controlled lane for creating, fine-tuning, evaluating, packaging, and exporting specialized models and agent brains for Agentropolis.

This is not a random model zoo.

It is a governed training floor for city-native intelligence.

```text
Agentropolis
= the city

AGENTROPOLIS-CREATOR
= the foundry

Model Training Foundry
= where specialized model capability is produced, tested, and packaged

District Exchange
= where verified model packs, skills, workflows, evals, and MCP kits ship
```

## Core Position

Fine-tuning is becoming faster and more accessible.

The advantage is not simply training another model.

The advantage is controlling the full loop:

```text
data -> training -> evaluation -> policy review -> packaging -> routing -> deployment -> observability -> retraining
```

Agentropolis needs this loop because districts will require different kinds of intelligence:

- fast local workers
- domain-specific copilots
- creator assistants
- verifier agents
- policy reviewers
- memory-aware operators
- 3D/world-building assistants
- media production agents
- commerce and settlement agents
- research and planning councils

## Candidate Open-Source Stack

| Tool | Foundry Role | Best Fit | Status |
| --- | --- | --- | --- |
| Unsloth AI | Fast fine-tuning lane | Local LoRA/QLoRA experiments, low-resource model specialization | evaluate |
| LLaMA Factory | General model workbench | CLI/WebUI fine-tuning, dataset templates, export paths | evaluate |
| Axolotl | Research and alignment lane | YAML-driven LoRA/QLoRA, preference tuning, multimodal experiments | evaluate |
| DeepSpeed | Scale infrastructure lane | Distributed training, larger jobs, multi-GPU and multi-node training | evaluate |

## District Mapping

| Agentropolis Layer | Training Function |
| --- | --- |
| Intelligence Grid | model registry, eval routing, memory constraints, deployment permissions |
| Construction District | dataset preparation, fine-tuning recipes, model package creation |
| Research District | experiment design, alignment methods, benchmark selection |
| Governance District | safety policy review, audit trails, approval gates |
| District Exchange | distribution of verified model packs and training workflows |
| City Runtime | consumption of approved models by agents and applications |

## Foundry Lanes

### 1. Local Fine-Tuning Lane

Use for small models, quick experiments, private prototypes, and consumer-GPU workflows.

Candidate tools:

- Unsloth AI
- LLaMA Factory
- Axolotl

Outputs:

- LoRA adapters
- QLoRA adapters
- dataset cards
- training cards
- eval summaries
- model package manifests

### 2. Workbench Lane

Use for repeatable creator-facing training jobs where operators need a clear CLI or UI workflow.

Candidate tools:

- LLaMA Factory
- Axolotl

Outputs:

- reusable training configs
- task-specific recipes
- export-ready checkpoints
- District Exchange package candidates

### 3. Alignment and Preference Lane

Use for preference optimization, instruction behavior, domain alignment, and controlled agent personality updates.

Candidate tools:

- Axolotl
- LLaMA Factory where supported

Outputs:

- preference datasets
- DPO or similar training configs
- alignment eval reports
- behavior regression checks

### 4. Scale Lane

Use only when the job requires larger training runs and the cost, hardware, and governance case are justified.

Candidate tools:

- DeepSpeed

Outputs:

- distributed training config
- cost estimate
- hardware requirement report
- checkpoint manifest
- failure recovery notes

## Package Contract

Every model package candidate must include:

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

## Minimum Metadata

```json
{
  "id": "agentropolis-model-pack-id",
  "name": "Human readable model pack name",
  "base_model": "verify",
  "training_tool": "unsloth|llama_factory|axolotl|deepspeed|other",
  "training_method": "lora|qlora|full|frozen|preference|other",
  "dataset_sources": [],
  "license_status": "verify",
  "intended_district": "Construction District",
  "intended_agents": [],
  "evals_required": [],
  "risk_level": "low|medium|high",
  "approval_status": "draft|candidate|approved|rejected",
  "export_targets": []
}
```

## Required Evaluation Gates

No model package becomes Agentropolis infrastructure without passing these gates:

1. Dataset provenance review
2. License review
3. Safety and refusal behavior check
4. Hallucination and factuality check
5. Domain task evaluation
6. Regression test against prior approved pack
7. Cost and hardware review
8. Export and rollback plan
9. District owner approval
10. Governance record

## Risk Rules

### Low Risk

- drafting a training config
- creating a dataset card
- running a small local experiment
- exporting a non-production adapter
- generating an eval report

### Medium Risk

- training on private or business records
- shipping a model pack to District Exchange
- replacing an existing agent brain in staging
- using generated or scraped datasets
- changing refusal or safety behavior

### High Risk

- production deployment without evals
- training on unlicensed or unknown-source data
- fine-tuning with secrets, credentials, client records, or private keys
- removing safety boundaries
- giving autonomous agents financial, legal, medical, or destructive authority without governance gates

## Approval Rule

Training output is not infrastructure by default.

It is a candidate artifact until evaluation, provenance, license review, and district approval are complete.

```text
No dataset provenance, no model pack.
No eval report, no District Exchange release.
No governance record, no city deployment.
```

## First Build Path

1. Create `registry/training-adapters.md`.
2. Create one starter model-pack template.
3. Add a small local LoRA/QLoRA recipe lane.
4. Define evaluation gates for Construction District agents.
5. Package the first training workflow as a District Exchange candidate.
6. Route approved model packs to Agentropolis runtime through the Intelligence Grid.

## Canon Line

> AGENTROPOLIS-CREATOR does not just build the city surface. It builds the intelligence supply chain behind the city.
