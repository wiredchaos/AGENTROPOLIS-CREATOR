# ODS Creator Workstation Lane

**Status:** Optional creator workstation infrastructure lane  
**External reference:** https://github.com/Osmantic/ODS  
**Agentropolis role:** Local stack candidate for creator-side models, workflows, RAG, image tools, and media experiments

ODS, the Osmantic Deployment System, is tracked by AGENTROPOLIS-CREATOR as an optional creator workstation lane.

This lane helps the Foundry test local AI workflows without turning every creator machine into a custom DevOps project.

## Canon Lock

ODS is not a Creator District product.

It is not:

- a new district
- a standalone Agentropolis repo
- a replacement for AGENTROPOLIS-CREATOR
- a replacement for HERMES Dispatch
- a replacement for the MCP policy membrane
- a production media authority by default

ODS is a local AI appliance candidate for creator workstations and labs.

## Creator Uses

The Foundry may use ODS for:

- local model testing
- prompt and storyboard drafting
- RAG over owned project docs
- Open WebUI-based creator chat
- local ComfyUI image experiments
- n8n workflow prototypes
- voice and narration tests
- creator-side automation labs
- local coding assistant tests
- private pre-production workflows

## Restricted Uses

ODS must not handle these without extra gates:

- client data without approval
- copyrighted source ingestion without rights
- wallet or settlement actions
- public publishing without human review
- autonomous outreach
- repository writes
- irreversible file deletion
- production rendering claims without QC receipts

## Foundry Routing Model

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

## Local-First Creator Stack

ODS can sit under the Foundry as a workstation bootstrap layer for:

| Foundry Need | ODS Candidate Service |
|---|---|
| creator chat | Open WebUI |
| local inference | llama-server or configured model service |
| workflow automation | n8n |
| image experiments | ComfyUI |
| private knowledge search | RAG and search services |
| voice tests | Whisper and text-to-speech components |
| diagnostics | dashboard and service health tooling |

## Promotion Path

```text
CANDIDATE
  -> local install receipt
  -> test asset receipt
  -> workflow receipt
  -> media-diff review
  -> creator QC pass
  -> MCP policy registration
  -> governed lane
```

## Public Copy

Use this wording when describing the lane:

```text
ODS is an optional local AI server lane for Agentropolis creator workstations. It can help run private models, RAG, workflows, voice tests, and ComfyUI experiments locally before anything becomes a production workflow.
```

## Anti-Moloch Rule

The Foundry should own its creative nervous system where practical.

But local tools still need receipts, rights checks, quality control, and human approval before public release.
