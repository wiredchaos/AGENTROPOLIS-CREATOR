# Model Council Construction Routing

AGENTROPOLIS-CREATOR is the foundry. It should use model lanes the way a real construction district uses trades.

No single model owns the build.

## Construction District Model Lanes

| Foundry Function | Model Candidates | Output |
| --- | --- | --- |
| World planning baseline | `deepreinforce-ai/Ornith-1.0-35B`, `zai-org/GLM-5.2` | district plans, build sequences, asset dependency maps |
| World planning challenger | `Ornith-1.5-35B-A3B` after provenance + BE evaluation | planning/tool-orchestration trials; no automatic promotion |
| Code/build implementation | `moonshotai/Kimi-K2.7-Code`, `Qwen/Qwen3-Coder-30B-A3B-Instruct` | scripts, app code, MCP adapters, package scaffolds |
| Asset research | `Qwen/Qwen3.6-35B-A3B`, `moonshotai/Kimi-K2.6`, `MiniMaxAI/MiniMax-M3` | open-source tool research, license notes, pipeline options |
| Fast metadata work | `deepseek-ai/DeepSeek-V4-Flash` | tags, sidecars, summaries, extraction, routine workflow tasks |
| Governance review | `nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4` | high-stakes plan review, canon conflict review, safety review |
| Lightweight fallback | `google/gemma-4-31B-it`, `google/gemma-4-26B-A4B-it`, `meta-llama/Llama-3.1-8B-Instruct`, `openai/gpt-oss-20b` | fallback, low-cost drafts, constrained tasks |

## R0B0T Model Watch Rule

R0B0T Model Watch is an external intelligence source for candidate model/quantization/runtime/hardware configurations. CREATOR may use those signals to nominate construction-lane challengers, but the signal is never production approval.

```text
R0B0T signal
  -> provenance / WATCH
  -> 54-T capability review
  -> BE evaluation
  -> Quantization Torque analysis
  -> construction-lane tournament
  -> approval or rejection
```

For long-context candidates, configured context capacity must not be confused with actually occupied and validated context. External results remain experimental until reproduced or explicitly accepted by policy.

## Foundry Flow

```text
Build request
  -> HERMES intake
  -> classify asset / code / workflow / MCP kit
  -> route to approved model lane
  -> governed execution interface
       -> optional Claw/NemoClaw adapter when selected
  -> preview diff
  -> verify metadata and license
  -> package for District Exchange
```

## Creator Guardrail

CREATOR generates candidate assets, room specs, workflows, MCP kits, and media plans.

CREATOR does not directly mutate live runtime state.

```text
CREATOR produces
CITY visualizes
District Exchange distributes
HERMES routes
BE evaluates candidate model/runtime profiles
54-T constrains effective capability
optional Claw/NemoClaw adapters bound execution when selected
```

## Role Lock

- **BE is the evaluator.**
- **ASBE is the Agentic Studios backend**, not the model evaluation gate.
- **HERMES is the router/orchestrator.**
- **Quantization Torque controls compute, precision, memory, and context pressure within evidence-backed quality floors.**
- **NemoClaw/Claw-class infrastructure is optional**, not a mandatory sovereign dependency.

## Anti-Moloch Rule

Specialize the agents.
Route the intelligence.
Keep receipts.
Preview diffs before canon.
Prefer the smallest verified capability/context surface that completes the build task.
