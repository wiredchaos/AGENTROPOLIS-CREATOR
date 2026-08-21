# NETERU APINAYA Creator Bridge

## Role

AGENTROPOLIS-CREATOR is the governed production foundry for NETERU APINAYA media. It does not own NETERU canon, the audience application, or authoritative gameplay state. It converts approved NETERU canon records and validated Gaming District events into production-ready assets and packages.

Canonical application/runtime owner: `wiredchaos/wiredchaos-AGENTROPOLIS-NETERU`.

`wiredchaos/ntru` and NETERU material in `wiredchaos/wired-chaos` are legacy reference/migration sources, not runtime dependencies.

## Runtime relationship

```text
AGENTROPOLIS Gaming District
  -> authoritative player/game services and validated gameplay events

wiredchaos/wiredchaos-AGENTROPOLIS-NETERU
  -> NETERU APINAYA application + apps/fracture game runtime

AGENTROPOLIS-CREATOR
  -> foundry orchestration, asset production, continuity/media review and packaging

AGENTROPOLIS-CREATOR-CORE
  -> provider-neutral direction compiler, asset/lore mapping, generation policy and provider adapters
```

CREATOR-CORE is a shared media runtime. It is not a game server and must not become authoritative for player identity, inventory, balances, achievements, missions, reputation, rank, or progression.

## Inputs

Canon-driven jobs may include:

- canon scene or chapter ID
- property and volume metadata
- approved characters and visual references
- audience classification
- target format
- exact copy and dialogue locks
- rights and provenance references
- production mandate ID

Gameplay-derived jobs must additionally include:

- immutable gameplay `event_id`
- gameplay receipt ID
- session ID
- FRACTURE build SHA
- event timestamp
- promotional-use consent state
- requested derivative class
- source canon IDs when known

## Supported outputs

- ebook EPUB and PDF packages
- graphic novel issues, pages and panels
- NTRUtv scripts, storyboards, shot lists and episode packages
- NTRU-OTT masters, trailers, captions and metadata
- FRACTURE cinematics, dialogue packets and promotional replays
- gameplay-derived adaptation candidate packages
- audiobook and serialized audio packages
- social-safe derivative assets

## Gameplay derivative classes

Initially approved Creator-facing derivative classes:

- `cinematic`
- `dialogue-packet`
- `promotional-replay`
- `adaptation-candidate`

Gameplay events are evidence/input, not automatic canon. A player action may propose a derivative or adaptation candidate but cannot silently rewrite NETERU canon or directly publish an episode.

## Production contract

```text
NETERU canon record OR validated gameplay event
  -> validate source receipt / reference locks
  -> resolve approved lore mappings
  -> compile Creator Prompt Contract / Creator Core direction contract
  -> select approved model and tool lanes through MCP
  -> generate draft asset
  -> media diff and continuity validation
  -> human approval when required
  -> package for Entertainment, Gaming or GTM
  -> derivative receipt linked to source receipt
```

## Gameplay-to-Creator boundary

```text
FRACTURE
  -> signed event
  -> Gaming District validation + receipt
  -> Hermes City
  -> CREATOR job request
  -> CREATOR-CORE compile / provider route
  -> generated or assembled derivative
  -> media diff + lore / continuity review
  -> approval
  -> Gaming / Entertainment / GTM handoff
  -> receipt
```

Rules:

1. CREATOR accepts only validated gameplay events for authoritative derivatives.
2. The gameplay receipt ID is immutable provenance and must be retained on downstream packages.
3. Duplicate source event + derivative-class requests must be idempotent.
4. Promotional derivatives must respect the player's promotional-use consent state.
5. CREATOR may produce a representation of gameplay; it may not rewrite the underlying gameplay event.
6. CREATOR-CORE provider/source labels never automatically become NETERU lore identities; approved lore mapping is required.
7. Provider execution remains policy-gated and receipted.

## Canon protections

- Creator agents may adapt presentation but may not silently rewrite canon.
- Character identity, relationships, chronology and locked dialogue require explicit change approval.
- Every generated asset must retain source scene IDs and/or gameplay receipt provenance.
- Mature NETERU masters route through NTRU Studios and NTRU-OTT. A 789 Studios cel-shaded anime passage may appear inside an approved master as a distinct representational layer, but 789 Studios is not the routing or release owner.
- NTRU Studios and 789 Studios are separate visual lanes. They may depict the same locked story event and meet through editorial match cuts, but their render languages must not be blended within a frame.
- Promotional derivatives require separate distribution approval.

## Required package envelope

```json
{
  "packageId": "uuid",
  "propertyId": "neteru-apinaya",
  "sourceCanonIds": ["scene-id"],
  "sourceGameplayEventId": null,
  "sourceGameplayReceiptId": null,
  "target": "ntru.tv.episode",
  "derivativeClass": null,
  "audienceClass": "mature",
  "mandateId": "uuid",
  "assets": [],
  "continuityReport": {},
  "rightsReport": {},
  "approvalStatus": "pending",
  "receiptId": null
}
```
