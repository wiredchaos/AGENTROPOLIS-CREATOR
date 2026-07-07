# GLM-5.2 Hybrid NVIDIA Inference Intel

Source: https://huggingface.co/madeby561/GLM-5.2-MXFP8-NVFP4-NF3-Hybrid

## Verdict

Yes, this applies to AGENTROPOLIS-CREATOR.

Core lock:

```text
GLM-5.2 MXFP8/NVFP4/NF3 Hybrid = optional private long-context creator/research lane.
Use hosted models first. Self-host only after workload proves demand.
```

This is infrastructure intelligence for the creator stack, not a separate product and not a default creative runtime.

## What the signal says

The model card presents a community-built hybrid quant of GLM-5.2 designed to make a full large MoE deployment fit on a 4-card NVIDIA workstation/server class box.

Reported model-card signals:

- Base: `zai-org/GLM-5.2`.
- Quantized lineage includes `lukealonso/GLM-5.2-NVFP4`.
- License listed on Hugging Face: MIT.
- Format tags include safetensors, GLM MoE, NVFP4, NF3, MXFP8, quantization, and modelopt.
- The author warns it loads only through a custom serving image using an in-house NF3 3-bit kernel.
- Claimed serving target: 4x 96GB sm120 GPUs plus about 64GB RAM.
- Claimed deployment size: about 327GB total.
- Claimed usable context profile: about 118k context with concurrency headroom, or up to about 240k single stream.
- The card explicitly says this is not the official model's 1M context and is not officially supported.
- Hugging Face shows no hosted Inference Provider deployment for this checkpoint at time of capture.

## Creator interpretation

Creator workflows can benefit from long-context private reasoning when handling:

- multi-document brand systems
- script bibles
- lore registries
- product campaigns
- long-form planning
- internal creative strategy
- private client work

But the correct order remains:

```text
Hosted provider first
  -> router abstraction
  -> policy gates
  -> receipts
  -> private self-host lane only when telemetry proves it
```

## Creator routing rule

Do not bind AGENTROPOLIS-CREATOR to this checkpoint.

Creator agents should request a capability:

```text
long_context_private_research
brand_system_synthesis
multi_doc_story_bible_review
private_campaign_planning
```

Model Exchange should decide whether that capability routes to hosted GLM, another provider, or the experimental self-host lane.

## Do now

- Track as infrastructure intelligence.
- Keep creator agents model-agnostic.
- Add this as a possible future provider lane.
- Benchmark against hosted GLM-5.2 before activation.

## Do not do yet

- Do not create a GLM creator product.
- Do not buy hardware for creator workflows before telemetry proves demand.
- Do not treat longer context as automatic canon accuracy.
- Do not bypass canon governance or receipts.

## Canon line

```text
Creator agents ask for capabilities.
Model Exchange chooses capacity.
Canon stays governed by registries, receipts, and human locks.
```
