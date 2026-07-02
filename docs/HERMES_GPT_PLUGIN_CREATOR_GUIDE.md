# HERMES GPT Plugin Creator Guide

## Purpose

This guide explains how creators should use GPT Plugins / Connectors inside Agentropolis without losing control of brand, canon, workflow, or permissions.

The Creator layer should generate assets, docs, prompts, and campaign plans. It should not deploy, delete, spend, or modify production systems without approval.

## Creator Stack

| Need | Plugin |
| --- | --- |
| Brand assets | Canva |
| Source docs | GitHub |
| Asset library | Box / Drive |
| Campaign tracking | Airtable |
| Task workflow | ClickUp |
| Scheduling | Calendar / Calendly |
| Analytics | BigQuery |

## Creator Agent Permissions

Allowed by default:

- draft brand sheets
- create prompt packs
- create content calendars
- organize asset references
- open GitHub documentation issues
- create ClickUp tasks
- read Airtable campaign records

Blocked by default:

- production deploys
- financial actions
- credential changes
- destructive file deletion
- hidden memory writes
- changing canon without registry update

## Canon-Safe Workflow

```text
Idea -> Creator Agent -> Canon Check -> Draft Asset -> Human Review -> Publish Queue -> Audit Log
```

## Prompt Pack Template

```md
# Prompt Pack

## Asset Name

## Project / Realm

## Canon Source

## Visual Rules

## Must Include

## Must Avoid

## Output Format

## Review Status
```

## Plugin Registry Entry

```json
{
  "plugin_id": "canva",
  "display_name": "Canva",
  "owner_agent": "Creator",
  "approved_roles": ["Creator", "Brand", "PM"],
  "risk_level": "low",
  "human_approval_required": false,
  "allowed_actions": ["draft_design", "create_presentation", "create_social_asset"],
  "blocked_actions": ["publish_paid_campaign", "delete_brand_assets"],
  "audit_required": true
}
```

## Creator App Views

1. Campaign Board
2. Prompt Packs
3. Asset Library
4. Canon Registry
5. Review Queue
6. Publish Queue
7. Analytics
8. Audit Log

## Optimization Rules

- Reuse locked character sheets and style guides.
- Store canon decisions in GitHub or Airtable.
- Use drafts before publishing.
- Keep every generated asset tied to a source prompt.
- Track which prompts produce winning outputs.
- Separate Akashic, business, and public layers.
- Never let creator tools override governance.

## Anti-Moloch Guardrails

- no random canon drift
- no unauthorized brand mutation
- no automatic publish without review
- no hidden file deletion
- no production deployment from Creator role
- no financial action from Creator role

## Status

Canonical creator-side guide for GPT Plugins / Connectors in Agentropolis.
