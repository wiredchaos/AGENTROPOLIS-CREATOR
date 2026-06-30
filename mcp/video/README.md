# Video MCP Adapter Workspace

This workspace is reserved for video-rendering and timeline-automation adapters inside AGENTROPOLIS-CREATOR.

## Primary Candidate

| Adapter | Status | Role |
| --- | --- | --- |
| OpenCut | watch/evaluate | Open-source video editor candidate for AI-agent MCP control, timeline scripting, headless rendering, and batch export. |

## Guardrail

No adapter in this workspace may publish public media directly.

Allowed path:

```text
Timeline proposal
-> Preview render
-> Media diff
-> Verifier review
-> Human approval
-> Export package
-> Separate publishing handoff
```

## Required Adapter Contract

Every video adapter must report:

- input assets
- source licenses
- voice and music provenance
- caption source
- export settings
- render cost estimate
- output file hashes
- approval state

## Canon Line

> Video adapters are not content gods.  
> They are render rails with receipts.