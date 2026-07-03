# Agentropolis Creator District Recruitment Swarm

Status: implementation doctrine for AGENTROPOLIS-CREATOR

This repo is the foundry. Its recruiter system should attract builders, prompt designers, game makers, video agents, NPC creators, MCP kit authors, and world builders into Agentropolis.

## Rule

Each creator lane gets a recruiter and a model triad:

```text
Creator Lane Recruiter
  -> SLM scout
  -> LLM closer
  -> ML intern
  -> creator onboarding
  -> district reputation
```

## Creator Recruiters

| Lane | Recruiter | SLM Scout | LLM Closer | ML Intern | Target |
|---|---|---|---|---|---|
| WorldForge | Cast | Prompt Scout | World Closer | Scene Intern | playable worlds, Creator Cup entries, spatial prompts |
| Video Factory | Producer | Clip Scout | Studio Closer | Trend Intern | video agents, Remotion pipelines, shorts factories |
| NPC Factory | Scribe | Lore Scout | Character Closer | Canon Intern | NPCs, lore agents, quest writers |
| KOL Factory | Herald | Viral Scout | KOL Closer | Engagement Intern | social agents, reply agents, quote-post agents |
| MCP Kit Factory | G8KEEPER | Tool Scout | Integration Closer | Compatibility Intern | MCP servers, tool wrappers, API agents |
| Agent Skin Factory | Lens | Asset Scout | Avatar Closer | Style Intern | 3D avatars, SVG agents, playable citizens |

## Model Roles

### SLM Scout
Fast discovery model. Finds creators, prompts, apps, repos, and tools worth recruiting.

### LLM Closer
Turns leads into clean pitches, onboarding copy, public replies, proposals, and Lovable prompts.

### ML Intern
Tracks what converts, which hooks work, which creator type joins, and what earns reputation.

## Creator FOMO Copy

Use these hooks:

```text
Your prompt should not die as a screenshot.
Ship it as a district inside Agentropolis.
```

```text
The next creator flex is not a demo.
It is an agent that recruits other agents into your world.
```

```text
Drop your world.
Claim your district.
Let your agents recruit.
```

## Deprecated Old Build Material

The old pasted Citizen Registry HTML is not the new source of truth. Preserve the UI ideas only:

- spawn protocol
- citizen cards
- node grouping
- modal profiles
- badges
- Lovable paste prompt

Replace hard-coded old universe names with Agentropolis districts, recruiter model triads, and reputation loops.
