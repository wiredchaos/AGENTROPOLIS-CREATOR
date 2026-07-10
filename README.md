# AGENTROPOLIS-CREATOR

## Agentropolis Construction District

AGENTROPOLIS-CREATOR is the **Agentropolis Construction District** and the **Agentropolis Foundry**.

This is the place where the city builds itself.

It is the production layer for designing, generating, testing, governing, rendering, packaging, and exporting reusable 3D scenes, characters, crowds, districts, buildings, skills, templates, creator-facing asset systems, model packs, workflows, MCP kits, and publishable media for the Agentropolis ecosystem.

```text
Agentropolis
= the private city OS and runtime core

HERMES-CITY
= the public signal, civic shell, and safe coordination layer

AGENTROPOLIS-CREATOR
= the foundry

AGENTROPOLIS-AGENT-MCP
= the governed MCP routing and tool membrane
```

```text
wiredchaos/agentropolis
= private City OS and main app

wiredchaos/HERMES-CITY
= public signal layer, civic shell, and coordination surface

wiredchaos/AGENTROPOLIS-CREATOR
= Agentropolis Construction District and Foundry

wiredchaos/AGENTROPOLIS-AGENT-MCP
= MCP tool routing, model council routing, reference-lock intake, and guarded execution interface
```

## Agentropolis and Hermes City Integration

AGENTROPOLIS-CREATOR does not replace the private city runtime or the public city shell.

The relationship is:

```text
AGENTROPOLIS-CREATOR
  -> designs and generates district assets, rooms, avatars, NPCs, crowds, media, templates, skills, workflows, model packs, and MCP kits

HERMES-CITY
  -> publishes public-safe signals, civic-shell docs, interface patterns, release notes, and coordination maps

AGENTROPOLIS-AGENT-MCP
  -> validates packages, routes model council decisions, gates tool access, and logs receipts

agentropolis
  -> private City OS and runtime core that consumes approved package references
```

## Creator District Recruitment Swarm

The Foundry now treats every creator lane as a recruiting surface.

```text
Creator Lane Recruiter
  -> SLM scout
  -> LLM closer
  -> ML intern
  -> creator onboarding
  -> district reputation
```

The recruiter swarm turns old static citizen cards, Lovable prompts, NPC registries, and Creator Cup worlds into active agent-to-agent recruitment loops.

Implementation doctrine: [`docs/DISTRICT_RECRUITMENT_SWARM.md`](docs/DISTRICT_RECRUITMENT_SWARM.md).

## Current Focus

A modular open-source route for:

- Hermes City 3D environments
- district templates
- procedural rooms
- building interiors
- hero human characters
- NPC population pools
- companion and pet assets
- crowd presets
- Blender Geometry Nodes crowd generation
- MCP adapters for 3D tools
- OpenCut-style video rendering and timeline automation
- Seedance 2.0-style creator video direction, prompt compilation, continuity, and delivery/QC workflows
- DepthFlow-style 2.5D parallax motion rendering for static images, posters, OTT bumpers, web hero loops, and social clips
- Hermes Motion Maker-style reference-image-to-motion skill packets through Arcads MCP-style adapter contracts
- governed Audio-to-MIDI transcription, cleanup, confidence reporting, and DAW/game-engine handoff packets
- governed world-diff previews
- governed media-diff previews
- metadata and license tracking
- web-ready export planning
- model-pack candidates and training workflows
- executable skills, workflows, templates, evals, model packs, and MCP kits for District Exchange
- AuthorMind publishing workflows for manuscript cleanup, audiobook generation, podcast cuts, video companions, and distribution prep
- ODS creator workstation lane for local model, RAG, workflow, voice, and ComfyUI experiments

## ODS Creator Workstation Lane

ODS is tracked as an optional local AI server lane for Creator District workstations and labs.

It is infrastructure, not a new district and not a replacement for AGENTROPOLIS-CREATOR.

See [`docs/ODS_CREATOR_WORKSTATION_LANE.md`](docs/ODS_CREATOR_WORKSTATION_LANE.md).

Core pattern:

```text
Creator intent
  -> AGENTROPOLIS-CREATOR
  -> HERMES Dispatch
  -> AGENTROPOLIS-AGENT-MCP
  -> policy gate
  -> ODS creator workstation lane when approved
  -> local model, RAG, ComfyUI, n8n, voice, or agent service
  -> media diff or workflow draft
  -> human review
  -> receipt
```

## AuthorMind Publishing Lane

AuthorMind is tracked as the Creator District publishing wrapper for manuscript-to-media workflows.

It is not a separate Agentropolis repo yet. It belongs inside AGENTROPOLIS-CREATOR under the Publishing District until it has enough standalone code, users, and operational surface to justify extraction.

```text
AuthorMind
  -> manuscript intake
  -> text cleanup
  -> chapter detection
  -> narration planning
  -> audiobook generation
  -> podcast clips
  -> video companion assets
  -> distribution package
```

The Audiobook Studio may use `ebook2audiobook` as an optional local/open-source backend candidate for legally acquired, non-DRM content the user owns or has rights to convert.

Creator reference: [`docs/AUTHORMIND_AUDIOBOOK_STUDIO.md`](docs/AUTHORMIND_AUDIOBOOK_STUDIO.md)

## Seedance 2.0 Creator Video Lane

CREATOR now tracks Seedance 2.0 Skill OS as an external reference and adapter target for the video foundry lane.

This is not a core runtime dependency and not a separate Agentropolis repo yet. It is a candidate pattern for provider-agnostic AI video direction: scene intent, shot contracts, reference-role binding, prompt batches, continuation ledgers, take triage, repair loops, media-diff preview, and delivery/QC packets.

Creator reference: [`docs/SEEDANCE_2_CREATOR_VIDEO_LANE.md`](docs/SEEDANCE_2_CREATOR_VIDEO_LANE.md)

## DepthFlow Creator Motion Lane

CREATOR now tracks DepthFlow as an optional external renderer candidate for 2.5D parallax video assets.

This is not a core runtime dependency and not a separate Agentropolis repo yet. It is a Foundry motion lane for turning approved static images into cinematic loops, OTT bumpers, social shorts, web hero backgrounds, loading screens, and motion posters.

Creator reference: [`docs/DEPTHFLOW_CREATOR_MOTION_LANE.md`](docs/DEPTHFLOW_CREATOR_MOTION_LANE.md)

## Hermes Motion Arcads Skill Lane

CREATOR now tracks Hermes Motion Maker as a candidate Foundry skill package for turning rights-cleared reference images into governed motion-animation packets.

This is not a hard runtime dependency and not a separate Agentropolis repo yet. It is the bridge between reference-image intake, Nano Banana-style frame prompt batches, Seedance-style video prompting, Arcads MCP-style execution packets, take triage, and media-diff delivery/QC.

Creator reference: [`docs/HERMES_MOTION_ARCADS_SKILL_LANE.md`](docs/HERMES_MOTION_ARCADS_SKILL_LANE.md)

Skill package: [`packages/skills/hermes-motion-maker/`](packages/skills/hermes-motion-maker/)

## Audio-to-MIDI Foundry Lane

CREATOR now tracks Audio-to-MIDI as a governed symbolic-audio capability for converting rights-cleared recordings into editable note events, tempo maps, confidence reports, and downstream creator packets.

Mirelo is recorded as a research reference only. No provider, model, API, SDK, license, price, or deployment path is treated as approved until it passes adapter, privacy, license, benchmark, and MCP-routing review.

Creator reference: [`docs/AUDIO_TO_MIDI_FOUNDRY_LANE.md`](docs/AUDIO_TO_MIDI_FOUNDRY_LANE.md)

Skill package: [`packages/skills/audio-to-midi-foundry/`](packages/skills/audio-to-midi-foundry/)

## FreeLLM Creator Model Scouting

FreeLLM is tracked as a creator-side model scouting directory and rapid prototype lane, not a permanent production dependency.

The Foundry may use it to compare free provider-backed models, generate config cards, and run prompt/eval tests before any model is promoted into AGENTROPOLIS-AGENT-MCP routing.

Creator reference: [`docs/FREELLM_CREATOR_MODEL_SCOUTING_BRIEF.md`](docs/FREELLM_CREATOR_MODEL_SCOUTING_BRIEF.md)

## Hermes Rankings and Backends Showcase

The Foundry now has a showcase brief for turning model ranking boards, backend provider matrices, skill registries, UNBROKER install cards, Model Council routing, and MCP guardrails into public-safe creator assets.