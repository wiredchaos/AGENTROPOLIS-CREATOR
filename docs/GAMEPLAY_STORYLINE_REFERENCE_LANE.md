# CREATOR Gameplay Storyline Reference Lane

Status: additive storyline architecture. This is not a gameplay engine fork.

## Canonical ownership

`wiredchaos/agenttropolisgame` remains the canonical source of truth for executable gameplay, Bandersnatch graphs, runtime behavior, game manifests, historical rupture execution, and Gaussian Splat gameplay bindings.

CREATOR consumes gameplay as storyline intelligence by reference. CREATOR must not copy, vendor, or independently mutate gameplay engine source.

## Purpose

CREATOR uses gameplay state to author and maintain the story relationship between:

- Higgsfield film sequences
- PURGE FACTOR / COGNITION 140+
- NETERU historical ruptures
- COINT3LPRO investigations and dossiers
- TARATIA 589 overlay relationships
- Neuro Tokyo / Yasuke timeline crossings
- Gaussian Splat real-world locations
- Bandersnatch choices and alternate endings
- post-film ARG and Gaming District experiences

The film and the interactive game may share story structure without sharing executable code.

## Reference flow

```text
wiredchaos/agenttropolisgame
        |
        | immutable manifest / graph / release refs
        v
CREATOR CORE reference adapter
        |
        v
CREATOR STORYLINE GRAPH
        |
        +--> film beat / sequence
        +--> historical rupture
        +--> player choice consequence
        +--> lore reveal
        +--> scene / splat binding
        +--> ending state
```

## What CREATOR may do

- read approved `GameManifest` and branch graph metadata
- select gameplay nodes as story beats
- attach a film sequence to a game node
- visualize alternate branch outcomes while writing
- reference `HISTORICAL_RUPTURE` nodes from the Neteru timeline grammar
- reference `REALWORLD_SCENE` IDs for storyline continuity
- plan cognition gates and consequence reveals
- map clues in the film to later game unlocks
- map one canonical film traversal through a larger Bandersnatch graph
- record which facts are REPO_BACKED, AUTHOR_DECLARED, DISPUTED, or PROVISIONAL

## What CREATOR may not do

- duplicate the gameplay engine
- silently fork branch logic
- change runtime scoring rules locally and call them canonical
- embed a second copy of the game manifest as an authoritative source
- treat CREATOR's cached storyline projection as the runtime source of truth

## Storyline pointer contract

Every storyline use of gameplay should carry:

- `gameId`
- `gameRepository`: `wiredchaos/agenttropolisgame`
- `manifestRef`
- `releaseId` or immutable commit/hash where available
- `nodeId`
- `storyPurpose`
- `filmSequenceId` when applicable
- `canonState`
- `provenance[]`

CREATOR may cache a compact read model for authoring performance, but it must be rebuildable from the canonical game source.

## Higgsfield film mapping

The submitted film is one canonical traversal of the larger interactive graph. Higgsfield-provided visual content creates the appearance and juxtaposition; CREATOR uses the referenced game graph to determine what each sequence means and what post-film branch it unlocks.

Example:

```text
FILM_SEQUENCE: NTKY_YASUKE_RUPTURE
GAME: purge-factor
NODE: rupture-yasuke-1579-1582

2090 Neuro Tokyo
  -> NTRU rupture
  -> 1579 Yasuke
  -> 1582 Erasure
  -> crossing payload PERSON
  -> return 2090
  -> future-state mutation
```

The game can later expose alternate branches such as FOLLOW_YASUKE, FOLLOW_CHRYSANTHEUM, FOLLOW_THE_ERASURE, and FOLLOW_THE_SIGNAL without requiring the film to contain every traversal.

## CREATOR / CREATOR CORE split

### CREATOR

Human/agent-facing story design surface. It composes film beats, lore, historical ruptures, choices, consequences, asset juxtaposition, clue placement, and the canonical film traversal.

### CREATOR CORE

Shared reference and validation layer. It knows how to resolve a storyline pointer to `agenttropolisgame`, validate namespace/canon metadata, and return a compact story-safe projection. It does not execute gameplay and does not own gameplay state.

## Non-duplication law

**One gameplay source. Multiple story projections.**

If `agenttropolisgame` changes, CREATOR projections must be revalidated against the referenced manifest/release rather than hand-synchronized by copying source files.
