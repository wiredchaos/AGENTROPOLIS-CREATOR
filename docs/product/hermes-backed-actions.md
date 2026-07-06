# Hermes-Backed Product Actions

## Product lock

AGENTROPOLIS-CREATOR should present clean product actions to users while Hermes performs narrow backend workflows behind an API boundary.

The user should not need to operate Hermes directly. The Creator surface owns the button, form, preview, and approval screen. Hermes owns the structured workflow behind that action.

## Core pattern

```txt
Creator UI action -> structured API payload -> Hermes skill workflow -> review packet -> user approval -> saved output
```

## Recommended Creator actions

```txt
Generate Skill Card
Create District Spec
Check Canon Conflict
Draft Launch Note
Build Skill README
Queue GitHub Patch
Save Review Note
Run Agent Audit
```

## Example: Generate Skill Card

### User-facing button

```txt
Generate Skill Card
```

### Creator payload

```json
{
  "action": "generate_skill_card",
  "district": "Creator",
  "skill_name": "Skill Card Builder",
  "source_context": "User supplied rough skill idea.",
  "review_required": true
}
```

### Hermes workflow

```txt
read_creator_context
load_skill_template
check_agentropolis_canon
generate_skill_card
return_review_packet
```

### Review packet

```json
{
  "status": "draft_ready",
  "review_required": true,
  "outputs": {
    "skill_card": "Ready for preview.",
    "registry_entry": "Ready for review."
  },
  "risks": [],
  "next_allowed_actions": [
    "edit",
    "approve",
    "save_review_note",
    "queue_github_patch"
  ]
}
```

## Boundary rules

Creator can ask Hermes to draft, inspect, compare, and prepare.

Creator should require human approval before Hermes commits, publishes, sends, deletes, or mutates public-facing state.

## UI implication

Do not expose raw agent operations as the primary interface.

Use normal software controls:

```txt
buttons
forms
previews
status chips
approval queues
activity receipts
```

Hermes should feel invisible until the user opens the receipt.

## Final lock

AGENTROPOLIS-CREATOR is the product surface. Hermes is the backend worker. Skills are the workflow contracts. The API is the permission boundary.
