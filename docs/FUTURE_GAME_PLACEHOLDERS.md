# Future Game Placeholders

## Status

`creator_registry_seed`

The Citizen OS and Visual Content Engine must support future games, not only the original seven Lovable universe nodes.

Current nodes are seed surfaces. New games should plug in through a registry contract.

## Game placeholder fields

```text
id
name
status
district
nodeIds
ingestModes
eventTypes
visualOutputs
notes
```

Allowed status values:

```text
placeholder
prototype
live
retired
```

Allowed ingest modes:

```text
webhook
n8n
poll
manual
mcp
```

## Seed placeholders

### Chaos Game Hub

Status: live  
District: CHAOSPHERE  
Node IDs: chaos-hub  
Events: decision, milestone, cipher, faction, citizen_spawned  
Outputs: social card, profile card, video scene, timeline

Current ARG main portal and reference implementation.

### BoardForge Arena

Status: placeholder  
District: ARENA  
Node IDs: future-boardforge  
Events: match_started, move_made, match_finished, citizen_spawned  
Outputs: match card, player profile, timeline, highlight scene

Future strategy game and chess-first arena lane.

### AGENTtv Broadcast Game

Status: placeholder  
District: BROADCAST  
Node IDs: agenttv  
Events: channel_tuned, broadcast_started, broadcast_finished, citizen_recruited  
Outputs: broadcast card, channel profile, revenue ticker, clip scene

Turns channels into playable broadcast surfaces.

### Geoseeker Control Hub

Status: prototype  
District: CHAOSPHERE  
Node IDs: geoseeker  
Events: room_created, player_joined, round_action, guess_made, round_finished  
Outputs: map card, round recap, scoreboard, heatmap

Future multiplayer map game lane.

## Visual Content Engine rule

Every game placeholder must define:

- what events it emits
- what visuals it can generate
- what district owns it
- whether it can write to shared citizen state
- whether it needs MCP validation before sync

No future game should bypass the MCP receipt layer once it touches shared registry state.
