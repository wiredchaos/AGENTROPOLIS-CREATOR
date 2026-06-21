# playhtml Presence Layer Doctrine

playhtml is the CHAOS ATRIUM v0 presence layer for AGENTROPOLIS-CREATOR.

It is useful for live, collaborative HTML elements, draggable agents, shared visual rooms, patch boards, and prototype collaboration surfaces.

It is not an authority layer.

```text
playhtml = presence layer
AGENTROPOLIS Grid = authority layer
```

---

## Approved uses

Use playhtml for:

- CHAOS ATRIUM v0
- draggable agents
- shared district rooms
- live patch boards
- memory shard visuals
- SignalForge newsroom cards
- Vault33 puzzle prototypes
- collaborative HTML/React visual surfaces
- non-secret shared presence and cursor/state overlays

---

## Do not use for

Do not use playhtml yet for:

- secrets
- private memory
- execution authority
- wallet actions
- policy mutation
- tenant key storage
- governance decisions
- raw agent memory writes
- cross-tenant state

---

## Security caveat

Current playhtml-style collaboration should be treated as non-private presence data.

Important caveat:

- shared state may persist through an external collaboration backend
- room names can function like access keys
- room data should not be treated as encrypted secret storage
- anyone with room access may be able to view or mutate room state

Therefore, playhtml state is visual/presence state only.

---

## Stack update

Recommended CHAOS ATRIUM v0 stack:

```text
Next.js
Tailwind
@playhtml/react
Zustand
Governance Gateway
Audit Ledger
Sandboxed Tool Executor
```

---

## Control boundary

```text
Browser presence layer
  -> playhtml shared state
  -> local UI state / Zustand
  -> Governance Gateway
  -> Audit Ledger
  -> Sandboxed Tool Executor
  -> AGENTROPOLIS Intelligence Grid
```

playhtml may display state. It does not authorize state.

---

## AGENTROPOLIS placement

```text
AGENTROPOLIS
└── Applications
    └── CHAOS ATRIUM v0
        └── playhtml presence layer
            ├── collaborative HTML elements
            ├── shared cursor/presence state
            ├── draggable visual agents
            ├── live patch boards
            └── prototype rooms
```

Authority remains in:

```text
Intelligence Grid
├── Governance Gateway
├── Policy/Risk Layer
├── Audit Ledger
├── Memory Layer
├── Dispatch Protocol
└── Sandboxed Tool Executor
```

---

## Mutation rule

A playhtml interaction may request a mutation. It may not perform the mutation directly.

Required route:

```text
User interaction
  -> playhtml visual event
  -> app server / proxy
  -> Governance Gateway
  -> Policy check
  -> Approval Gate when required
  -> Sandboxed Tool Executor
  -> Audit receipt
  -> visual state update
```

---

## Examples

### Safe

```text
Move an agent card across the CHAOS ATRIUM board.
Show another user viewing the same district room.
Pin a public patch note to a live board.
Display a visual memory shard placeholder.
```

### Unsafe

```text
Store a tenant API key inside shared room state.
Let a draggable agent execute a tool directly.
Use room name as private auth.
Write private memory from shared browser state.
Trigger wallet actions from collaborative HTML state.
```

---

## System line

```text
playhtml creates presence. The Grid grants authority.
```
