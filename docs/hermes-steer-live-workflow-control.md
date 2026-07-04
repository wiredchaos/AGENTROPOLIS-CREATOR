# Hermes /steer Live Workflow Control

`/steer` applies to AGENTROPOLIS-CREATOR as a live workflow-control primitive for active builder tasks.

## Command Difference

```text
/interrupt
= stop the current work and start a new turn

/queue
= wait until the current work finishes

/steer
= keep the current work running and inject new context into the active flow
```

## Creator Foundry Use

AGENTROPOLIS-CREATOR runs candidate-building work: assets, docs, package specs, MCP kits, model packs, workflows, and verification scaffolds.

`/steer` lets the operator add direction without killing the current foundry run.

Example:

```text
Build a character reference package with props, environment, and shot prompts.

/steer Add continuity checks for rain intensity and wardrobe lock.
```

Expected behavior:

```text
No restart.
No lost context.
No waiting.
The active build plan absorbs the new requirement.
```

## Foundry Pattern

```text
Operator intent
  -> HERMES / OpenWorks command layer
  -> active Creator build lane
  -> /steer context injection
  -> candidate plan updates
  -> verification expectations update
  -> receipt logs steering event
```

## Safety Boundary

`/steer` is not permission escalation.

If the steering instruction changes rights, licensing, secrets, production deployment, repo authority, wallet access, client data, or private governance scope, the system must re-check policy before acting.

Core rule:

```text
Steer the build.
Do not skip verification.
```
