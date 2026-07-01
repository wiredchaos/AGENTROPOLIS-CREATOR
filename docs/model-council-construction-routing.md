# Model Council Construction Routing

AGENTROPOLIS-CREATOR is the foundry. It should use model lanes the way a real construction district uses trades.

No single model owns the build.

## Construction District Model Lanes

| Foundry Function | Model Candidates | Output |
| --- | --- | --- |
| World planning | `deepreinforce-ai/Ornith-1.0-35B`, `zai-org/GLM-5.2` | district plans, build sequences, asset dependency maps |
| Code/build implementation | `moonshotai/Kimi-K2.7-Code`, `Qwen/Qwen3-Coder-30B-A3B-Instruct` | scripts, app code, MCP adapters, package scaffolds |
| Asset research | `Qwen/Qwen3.6-35B-A3B`, `moonshotai/Kimi-K2.6`, `MiniMaxAI/MiniMax-M3` | open-source tool research, license notes, pipeline options |
| Fast metadata work | `deepseek-ai/DeepSeek-V4-Flash` | tags, sidecars, summaries, extraction, routine workflow tasks |
| Governance review | `nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4` | high-stakes plan review, canon conflict review, safety review |
| Lightweight fallback | `google/gemma-4-31B-it`, `google/gemma-4-26B-A4B-it`, `meta-llama/Llama-3.1-8B-Instruct`, `openai/gpt-oss-20b` | fallback, low-cost drafts, constrained tasks |

## Foundry Flow

```text
Build request
  -> HERMES intake
  -> classify asset / code / workflow / MCP kit
  -> route to model lane
  -> NemoClaw checkpoint
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
NemoClaw checks
```

## Anti-Moloch Rule

Specialize the agents.
Route the intelligence.
Keep receipts.
Preview diffs before canon.
