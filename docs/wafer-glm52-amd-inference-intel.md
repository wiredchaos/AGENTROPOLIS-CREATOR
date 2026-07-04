# Wafer GLM-5.2 AMD Inference Intel

Source: https://www.wafer.ai/blog/glm52-amd

## Verdict

Yes, this applies to AGENTROPOLIS-CREATOR.

Core lock:

```text
Wafer + GLM-5.2 + AMD = inference infrastructure lane.
Not a separate repo yet.
```

This belongs behind the Model Router and Intelligence Grid. It should support creator workflows, not become the creator product itself.

## What the signal says

Wafer announced GLM-5.2 served through Vercel AI Gateway and OpenRouter, with AMD MI355X performance positioned around performance-per-dollar rather than raw brand loyalty.

Key reported signals:

- GLM-5.2 live through Vercel AI Gateway and OpenRouter.
- AMD MI355X deployment reached 2626 tok/s/node on Wafer's benchmark workload.
- Single-stream GLM-5.2 reached 213 tok/s.
- Wafer frames AMD as cheaper capacity against Blackwell scarcity.
- The engineering work focused on quantization, sglang, speculative decode, ROCm fixes, KV cache tuning, and MoE kernel selection.
- Wafer's conclusion: the CUDA moat is eroding as support improves.

## Agentropolis interpretation

This validates the low-overhead doctrine:

```text
Cloud API-first.
Local optional.
Self-hosted later.
Dedicated AMD/NVIDIA inference only when workload proves it.
```

Agentropolis should not make AMD, NVIDIA, Wafer, GLM, OpenRouter, or Vercel the city brain.

Agentropolis should route to them as supply lines.

## Where it fits

```text
Creator request
  -> AGENTROPOLIS-CREATOR
  -> HERMES Dispatch
  -> Policy Gate
  -> Model Router
  -> Provider Lane
      -> OpenRouter
      -> Vercel AI Gateway
      -> Wafer
      -> Direct GLM API
      -> Other hosted inference
  -> Artifact / Skill / App Output
  -> Telemetry
  -> Audit Log
```

## AGENTROPOLIS-CREATOR impact

This repo should treat the signal as builder-runtime intelligence.

Useful later for:

- code generation agents
- app scaffolders
- skill builders
- artifact factories
- long-context planning
- batch content and documentation generation
- cost-aware provider selection

Creator should call the router. Creator should not own inference servers.

## Do now

- Keep this as provider intelligence.
- Add model-provider registry fields when the router is implemented.
- Track Wafer/OpenRouter/Vercel as possible provider lanes.
- Do not create a dedicated Wafer repo.

## Do not do yet

- Do not self-host GLM-5.2 just because AMD performance improved.
- Do not optimize kernels before creator workload exists.
- Do not bind Creator identity to any one provider.
- Do not turn inference benchmarking into the product.

## Canon line

```text
Creator builds with the grid.
The grid routes compute.
Compute providers are replaceable supply lines.
```
