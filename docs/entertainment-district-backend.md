# Entertainment District Creator Bridge

## Status

**Online target:** `agenticstudio-pbx`  
**District:** Entertainment District  
**Backend entrypoint:** `server/index.js` in `wiredchaos/agenticstudio-pbx`  
**Default local port:** `8787`

## Role inside AGENTROPOLIS-CREATOR

AGENTROPOLIS-CREATOR is the creative workflow layer. The Entertainment District backend gives creator operations a proper district home for studios, shows, assets, prompts, publishing tasks, and media pipelines.

This repo should treat `agenticstudio-pbx` as the production backend for creator-facing entertainment workflows.

## Canonical backend routes

```txt
GET /api/health
GET /api/district
GET /api/district/services
GET /api/ecosystem/repos
```

## Creator workflow map

```txt
Idea / prompt
  -> script / concept
  -> studio or show
  -> asset registry
  -> publishing queue
  -> distribution surface
  -> analytics / archive
```

## Recommended creator modules

```txt
studio-registry
show-registry
asset-registry
prompt-library
script-builder
media-render-queue
publishing-queue
campaign-calendar
distribution-brief
analytics-summary
```

## Repo relationships

| Repo | Role |
|---|---|
| `wiredchaos/HERMES-CITY` | City runtime and district shell |
| `wiredchaos/AGENTROPOLIS-AGENT-MCP` | Agent/tool bridge and MCP handoff layer |
| `wiredchaos/AGENTROPOLIS-CREATOR` | Creator workflow and media production layer |
| `wiredchaos/agenticstudio-pbx` | Entertainment District backend/application surface |

## Next creator work

- Add creator-facing client calls to read `/api/district` and `/api/district/services`.
- Define schema for studios, shows, assets, and publishing tasks.
- Connect creator workflows to MCP once AGENTROPOLIS-AGENT-MCP exposes tool contracts.
- Keep brand/channel ownership clear: studios own shows, shows generate assets, assets enter distribution.

## Canon lock

AGENTROPOLIS-CREATOR owns creative workflows. Entertainment District owns the production backend and registry structure those workflows flow through.
