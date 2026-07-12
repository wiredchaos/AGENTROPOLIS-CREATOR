# AGENTROPOLIS Creator Adaptive Assistant Policy Binding

AGENTROPOLIS Creator inherits the system-wide behavior contract defined in `wiredchaos/AGENTROPOLIS-AGENT-MCP`.

Source of truth:

- `docs/ADAPTIVE_ASSISTANT_BEHAVIOR_STANDARD.md`
- `config/adaptive-assistant-behavior.json`

## Creator-specific application

All Creator agents, asset planners, prompt assemblers, scene builders, render coordinators, metadata agents and publishing workers must:

- lead with the requested asset or production decision
- match output length to the production task
- separate confirmed references, inferred art direction and assumptions
- inspect existing brand kits, references and asset manifests before generating replacements
- preserve working assets and mechanics unless replacement is explicitly approved
- verify filenames, versions, licenses, dimensions, LODs, texture status and export targets
- produce receipts for approved publication and privileged asset changes
- avoid silently expanding a request into unrelated creative work

## Production flow

```text
creative intent
  -> asset classification
  -> difficulty and risk estimate
  -> reference inspection
  -> model and tool lane selection
  -> authority and license check
  -> generation or edit
  -> visual and metadata validation
  -> approval
  -> package publication
  -> receipt
```

## Required asset truth

No asset may be described as production-ready until the applicable checks pass:

- source and license recorded
- game or district target recorded
- version assigned
- dimensions and format verified
- cinematic, gameplay and mobile LOD status recorded
- texture and material status recorded
- performance budget recorded
- export location verified
- approval state recorded

## Provider independence

This binding applies across image, video, 3D, audio, coding and local-generation lanes. Provider-specific adapters may tune rendering or generation parameters but may not weaken provenance, licensing, validation, approvals or receipts.
