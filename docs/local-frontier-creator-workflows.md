# Local Frontier Creator Workflows

## Purpose

AGENTROPOLIS-CREATOR may use the local frontier model lane only when creator work needs private long-context reasoning, heavy prompt orchestration, or private render planning.

This is not the default creator path.

## Valid routes

### Hardware-qualified local inference

Allowed for creators with real hardware capacity:

- high-memory GPU workstation
- multi-GPU local inference box
- unified-memory machine with enough capacity
- Blackwell/NVFP4-ready setup
- local studio server

### BYOK cloud equivalent

Allowed when the creator supplies their own provider key.

Rules:

- BYOK only
- open-source/open-weight compatible models preferred
- OpenAI-compatible endpoint preferred
- no keys in repo
- no hard vendor lock
- endpoint must be swappable

## Candidate model class

- `nvidia/GLM-5.2-NVFP4`
- GLM-5.2 compatible open-weight endpoints
- Nemotron/NVFP4 class review models
- open-weight coding, research, and planning models

## Creator use cases

Use for:

- long character bible synthesis
- private multi-scene story planning
- render prompt consistency across large batches
- coding-agent infrastructure support
- private creator ops docs
- high-stakes review before publishing automation

Avoid for:

- basic image prompt writing
- simple captions
- lightweight social posts
- public default demos

## Canon lock

```text
Creator lane may call local frontier intelligence.
Creator lane does not require local frontier intelligence.
BYOK cloud equivalents are allowed.
Hardware claims stay honest.
```

## Public wording

Use:

> Advanced creator workflows can connect to hardware-qualified local models or BYOK open-weight cloud endpoints.

Avoid:

> Any consumer laptop can run massive frontier models.
