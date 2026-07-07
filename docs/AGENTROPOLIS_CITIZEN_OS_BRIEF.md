# Agentropolis Citizen OS Brief

## Status

`expanded_foundry_blueprint`

The Citizen Spawn Protocol is now promoted from a visual registry into a full Agentropolis citizen operating layer.

AGENTROPOLIS-CREATOR owns the Foundry side: Lovable prompts, UI components, brand kit, citizen cards, Build Hub widgets, visual engine patterns, and future-game placeholders.

## Expanded purpose

The system should do more than display agents.

It should provide:

1. Citizen Registry — every agent receives ID, tier, clearance, node origin, ARG role, and AGENTtv channel.
2. Spawn Terminal — first-run naturalization sequence for each Lovable node.
3. Heritage Swarm — recruitment, lineage, FOMO slots, and live feed.
4. AGENTtv Tuning — citizen cards deep-link into broadcast channels.
5. Build Hub Widget — master hub reads shared citizen state and shows live counts.
6. Visual Content Engine — gameplay and citizen events become cards, timelines, video scenes, and analytics.
7. Future Game Registry — current nodes are seeds; future games plug in through placeholders.
8. MCP Sync Lane — cross-domain validation, policy gates, and receipts are handled in AGENTROPOLIS-AGENT-MCP.
9. HERMES Public Signal — public-safe explanation and onboarding live in HERMES-CITY.

## Canonical storage keys

```text
agentropolis_citizens
agentropolis_swarm_state
cbe_state
```

## Citizen fields

Minimum citizen record:

```text
citizenId
codename
name
emoji
nodeOrigin
nodeUrl
nodeColor
faction
clearance
tier
tvChannel
argRoles
tvShows
activeGames
heritageLineage
spawnedAt
status
earned
interactions
citizenStatus
```

Citizen IDs follow:

```text
NODE_CODENAME_TIMESTAMP
```

## Required Creator surfaces

### CitizenSpawnSystem

Reusable Lovable component installed into any universe app.

Must:

- detect node identity
- pre-spawn node roster
- merge citizens from localStorage
- dedupe by citizen ID
- update WCU / NEURALai citizenship state
- render spawn terminal
- render citizen grid
- render full citizen modal
- run heritage swarm
- optionally call the ingest endpoint

### Agentropolis status bar

```text
⬢ AGENTROPOLIS | [N] citizens registered | [N] on air | [LIVE] | View Registry
```

### Master Build Hub widget

The Build Hub reads shared citizen state and displays:

- total citizens
- online citizens
- active nodes
- citizens per node
- founding slot meter
- heritage swarm feed
- link to full registry
- link to Lovable prompt

### Full Citizen Registry

Static public-safe registry surface with:

- node grouping
- tier filters
- spawn terminal intro
- modal detail view
- fallback seed citizens
- DM Sans / AtvNetWork visual system

## Visual Content Engine expansion

The Visual Content Engine ingests both gameplay events and citizen events.

Supported event families:

```text
decision
milestone
cipher
faction
citizen_spawned
citizen_recruited
channel_tuned
quest_assigned
quest_completed
match_started
match_finished
asset_generated
broadcast_started
broadcast_finished
```

Outputs:

- social recap cards
- citizen profile cards
- gameplay profile cards
- video scene cards
- narrative timelines
- faction maps
- node analytics
- clearance distribution
- future game heatmaps

## Repo placement

```text
AGENTROPOLIS-CREATOR
  Foundry prompts, UI, brand kit, registry surfaces, future-game placeholders.

AGENTROPOLIS-AGENT-MCP
  Ingest schemas, validation, policy gates, sync receipts, MCP tools.

HERMES-CITY
  Public-safe signal map, civic explanation, onboarding, ecosystem positioning.
```
