# Training Adapter Registry

This registry tracks open-source training tools AGENTROPOLIS-CREATOR should evaluate for fine-tuning, alignment, model packaging, evals, and District Exchange release workflows.

## Adapter Classes

| Class | Purpose |
| --- | --- |
| Local Fine-Tuning | fast LoRA/QLoRA experiments on limited hardware |
| Training Workbench | repeatable CLI or UI training flows for operators |
| Alignment / Preference | DPO, GRPO, preference tuning, behavioral refinement, regression testing |
| Distributed Training | multi-GPU or multi-node scale training |
| Packaging / Export | model cards, dataset cards, export manifests, adapter packaging |
| Verification | eval reports, license checks, risk review, behavior regression |

## Initial Targets

| Adapter | Class | Status | Notes |
| --- | --- | --- | --- |
| Unsloth AI | Local Fine-Tuning | evaluate | Strong candidate for fast LoRA/QLoRA experiments and low-resource fine-tuning lanes. |
| LLaMA Factory | Training Workbench | evaluate | Candidate for broad model support, operator-facing workflows, dataset templates, training configs, and export flows. |
| Axolotl | Alignment / Preference | evaluate | Candidate for YAML-driven research workflows, LoRA/QLoRA, preference tuning, and multimodal experiments. |
| DeepSpeed | Distributed Training | evaluate | Candidate for large training runs when multi-GPU or multi-node scale is justified. |

## Adapter Metadata Template

```json
{
  "id": "unsloth_training_adapter",
  "name": "Unsloth AI Training Adapter",
  "class": "Local Fine-Tuning",
  "repo_url": "https://github.com/unslothai/unsloth",
  "license": "verify",
  "status": "evaluate",
  "local_required": true,
  "gpu_required": true,
  "risk_level": "medium",
  "allowed_actions": [
    "draft_training_config",
    "run_local_finetune_candidate",
    "export_adapter_candidate",
    "create_training_metadata",
    "create_eval_report"
  ],
  "blocked_actions": [
    "train_on_secrets",
    "train_on_unlicensed_data",
    "unapproved_production_deploy",
    "overwrite_approved_model_pack",
    "publish_without_eval"
  ],
  "notes": "Use for candidate adapters only until provenance, license, eval, and district approval gates pass."
}
```

## Candidate Adapter Entries

### Unsloth AI

```json
{
  "id": "unsloth_training_adapter",
  "name": "Unsloth AI Training Adapter",
  "class": "Local Fine-Tuning",
  "repo_url": "https://github.com/unslothai/unsloth",
  "license": "verify",
  "status": "evaluate",
  "local_required": true,
  "gpu_required": true,
  "risk_level": "medium",
  "allowed_actions": [
    "draft_lora_recipe",
    "draft_qlora_recipe",
    "run_local_candidate_training",
    "export_adapter_candidate",
    "create_eval_report"
  ],
  "blocked_actions": [
    "production_deploy_without_approval",
    "train_on_unknown_source_data",
    "train_on_private_keys_or_credentials"
  ],
  "notes": "Best fit for fast local model specialization and small training experiments."
}
```

### LLaMA Factory

```json
{
  "id": "llama_factory_training_adapter",
  "name": "LLaMA Factory Training Adapter",
  "class": "Training Workbench",
  "repo_url": "https://github.com/hiyouga/LLaMA-Factory",
  "license": "verify",
  "status": "evaluate",
  "local_required": true,
  "gpu_required": true,
  "risk_level": "medium",
  "allowed_actions": [
    "draft_training_workflow",
    "prepare_dataset_template",
    "create_operator_recipe",
    "export_model_candidate",
    "create_package_manifest"
  ],
  "blocked_actions": [
    "production_deploy_without_approval",
    "unapproved_dataset_import",
    "publish_without_license_review"
  ],
  "notes": "Best fit for repeatable creator-facing training workflows with a clear operator path."
}
```

### Axolotl

```json
{
  "id": "axolotl_training_adapter",
  "name": "Axolotl Training Adapter",
  "class": "Alignment / Preference",
  "repo_url": "https://github.com/axolotl-ai-cloud/axolotl",
  "license": "verify",
  "status": "evaluate",
  "local_required": true,
  "gpu_required": true,
  "risk_level": "medium",
  "allowed_actions": [
    "draft_yaml_training_config",
    "draft_preference_training_config",
    "run_alignment_candidate",
    "export_adapter_candidate",
    "create_behavior_regression_report"
  ],
  "blocked_actions": [
    "remove_safety_behavior_without_review",
    "production_deploy_without_approval",
    "train_on_unlicensed_data"
  ],
  "notes": "Best fit for research-grade configuration, alignment experiments, and reproducible training recipes."
}
```

### DeepSpeed

```json
{
  "id": "deepspeed_training_adapter",
  "name": "DeepSpeed Training Adapter",
  "class": "Distributed Training",
  "repo_url": "https://github.com/deepspeedai/DeepSpeed",
  "license": "verify",
  "status": "evaluate",
  "local_required": false,
  "gpu_required": true,
  "risk_level": "high",
  "allowed_actions": [
    "draft_distributed_training_plan",
    "estimate_hardware_requirements",
    "create_deepspeed_config_candidate",
    "create_failure_recovery_plan",
    "export_checkpoint_manifest"
  ],
  "blocked_actions": [
    "unbounded_training_run",
    "production_deploy_without_approval",
    "start_large_training_without_cost_review",
    "train_on_unknown_source_data"
  ],
  "notes": "Use only when scale is justified and cost, hardware, failure recovery, and governance gates are documented."
}
```

## Required Adapter Questions

Before adopting a training adapter, answer:

1. What license governs the repo?
2. What licenses govern the base model and datasets?
3. Does the workflow run locally, in cloud, or both?
4. What hardware is required?
5. What is the expected training cost?
6. Does it support LoRA or QLoRA?
7. Does it support full fine-tuning?
8. Does it support preference tuning or alignment workflows?
9. Can all training configs be committed as text?
10. Can outputs be versioned and rolled back?
11. Can it export open or standard model formats?
12. Can it produce model cards and dataset cards?
13. Can it preserve provenance metadata?
14. Can the trained output be evaluated before release?
15. Can it be blocked from production deployment without approval?

## Training Risk Levels

### Low Risk

- draft config
- generate dataset card
- create model card
- run toy training job
- produce eval report
- export local candidate adapter

### Medium Risk

- train on business records
- train on generated datasets
- ship candidate model pack to District Exchange
- replace staging agent model
- alter behavior of a district assistant

### High Risk

- train on secrets, credentials, private keys, or client records
- train on unknown-source or unlicensed data
- deploy to production without evals
- remove safety behavior without review
- give trained agents financial, legal, medical, or destructive authority without governance gates
- run large distributed training without cost and failure controls

## Approval Rule

Any model output from these adapters is a candidate artifact until approved.

No candidate model pack becomes Agentropolis infrastructure without:

- dataset provenance
- license review
- eval report
- risk review
- rollback plan
- district owner approval
- governance record

```text
No provenance, no package.
No eval, no release.
No governance, no city deployment.
```
