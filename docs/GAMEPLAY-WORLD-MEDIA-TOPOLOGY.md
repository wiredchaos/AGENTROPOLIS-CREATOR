# Gameplay -> World -> Media -> Canon Topology

Status: Creator Foundry integration contract.

AGENTROPOLIS-CREATOR is a production consumer of governed gameplay evidence. It does not own player state, game progression, or source-property canon.

## Upstream authorities

| Surface | Authority |
|---|---|
| shared player/session/mission/achievement/reputation state | AGENTROPOLIS Gaming District |
| FRACTURE mechanics and NETERU-specific narrative state | `wiredchaos/wiredchaos-AGENTROPOLIS-NETERU` |
| PRG33 choices, scoring, endings and PURGE_FACTOR narrative state | `wiredchaos/prg33` |
| C0 INTEL PROTOCOL property-specific state | `wiredchaos/c0intelprotocol` |
| NETERU lore/canon records | approved NETERU canon authorities; Creator never silently promotes drafts |
| cross-property relationships | explicit approved relationship records only |

## Creator intake

CREATOR accepts only gameplay-media envelopes that have passed Gaming District validation and carry source event provenance, receipt identity, namespace, consent state, and idempotency information.

Allowed derivative intents include:

- cinematic
- dialogue packet
- promotional replay when consent permits
- trailer or social derivative after distribution approval
- adaptation candidate
- storyboard / shot-list package
- world or scene visualization

## Shared world assets

PRG33 already defines a rights-governed Gaussian Splat environment model where a physical `sceneId` can be referenced by multiple properties while each keeps its own lore namespace and branch graph.

Creator adopts that pattern as the cross-world media rule:

```text
approved scene asset
  -> immutable provenance / rights receipt / content hash
  -> property-specific binding
       PURGE_FACTOR
       NETERU
       C0INT3L
  -> Creator visualization or cinematic job
  -> continuity validation against the selected namespace
```

The environment is reusable. Narrative meaning is not automatically reusable.

## TARATIA-589-METAVERSE

The TARATIA-589 namespace remains isolated and reserved for explicitly approved `METAVERSE_SYNTHESIS` relationships. Its existence is not evidence that NETERU, PRG33, C0INT3L, 589, Crossing, Neiberau or DP-2147 are canonically connected.

Creator must fail closed when a requested cross-property relationship has no approved relationship record.

## Media-to-canon boundary

```text
gameplay evidence
  -> Creator draft
  -> media diff
  -> lore/continuity check
  -> human review
  -> approved derivative
```

An approved derivative does not retroactively change the source gameplay event or source-property canon. Canon promotion remains a separate governed decision.

## Prohibited authority

CREATOR and CREATOR-CORE must not directly mutate:

- inventory
- achievements
- rank
- reputation
- mission completion
- player balances
- player identity
- authoritative branch state
- canonical endings
- cross-game progression

## Canonical routing

```text
Game runtime
 -> Gaming District
 -> signed/validated event + receipt
 -> Hermes City
 -> CREATOR
 -> CREATOR-CORE gameplay contract
 -> production router / CINEDANCE / approved provider
 -> media diff + continuity
 -> human approval
 -> game / NTRU Studios / GTM / distribution
 -> receipt
```
