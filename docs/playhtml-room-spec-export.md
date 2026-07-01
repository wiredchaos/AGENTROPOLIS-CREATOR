# playhtml Room Spec Export

## Purpose

AGENTROPOLIS-CREATOR is the Foundry. It does not run live Agentropolis state.

For playhtml / CHAOS ATRIUM work, CREATOR should generate room specs, object presets, district palettes, avatar cards, board layouts, and metadata sidecars that can be consumed by the live city OS.

## Export Direction

```text
AGENTROPOLIS-CREATOR
  -> exports room specs and object presets
  -> agentropolis consumes governed runtime specs
  -> HERMES-CITY may receive sanitized public demo specs
```

CREATOR must not pull live runtime state directly.

## Room Spec Shape

```json
{
  "roomId": "neuro-engineering",
  "district": "NEURO",
  "purpose": "Systems architecture and governed execution planning",
  "palette": {
    "background": "obsidian",
    "primary": "cyan",
    "accent": "red"
  },
  "allowedObjects": [
    "agent-avatar",
    "task-card",
    "memory-shard",
    "threat-card",
    "patch-board",
    "audit-shard"
  ],
  "forbiddenState": [
    "secrets",
    "wallet-authority",
    "root-memory",
    "policy-mutation",
    "direct-execution"
  ]
}
```

## Object Presets

| Preset | Purpose |
| --- | --- |
| agent-avatar | visual agent entity |
| task-card | movable work item |
| memory-shard | referenced context artifact |
| threat-card | drift / risk / immune signal |
| patch-board | proposed system update board |
| audit-shard | receipt display object |
| district-portal | room navigation marker |

## Foundry Guardrail

```text
CREATOR builds the room objects.
The city decides what becomes live.
```

## First Export Pack

Create a `chaos-atrium-v0` candidate pack containing:

- NEURO room spec
- CHAOS RANK room spec
- NTRU room spec
- 789 STUDIOS room spec
- Nexus Publica room spec
- HERMES Dispatch Hall spec
- shared object preset schema
- district color palette file
- metadata sidecar template
- governance boundary note
