# Hermes Chief of Staff Operating Model

Status: architecture note
Scope: AGENTROPOLIS CREATOR

## Core lock

AGENTROPOLIS CREATOR should use Hermes as the operator that turns briefs into branded artifacts, build tickets, and approval ready outputs.

The goal is not more chat.

The goal is a creator system that compounds.

## Creator role

This repo should support the creative production lane for AGENTROPOLIS:

- branded one pagers
- media kits
- launch briefs
- campaign docs
- carousels
- ad concepts
- scripts
- thumbnails
- product explainers
- district specific artifacts

## Brand Codex pattern

Every brand lane should be able to carry its own design and voice files.

Examples:

- WIRED CHAOS
- BWB
- 33.3FM
- GMN
- NEURA
- BoardForge
- DDChess
- 789 Studios

Hermes should read the right brand file before creating output.

## Operating doctrine

1. Brief once.
2. Pull current context from memory and repo docs.
3. Match the correct brand lane.
4. Draft the artifact.
5. Route to approval.
6. Save the final decision.
7. Reuse the pattern next time.

## AGENTROPOLIS mapping

| System concept | Creator equivalent |
| --- | --- |
| Hermes | Creative chief of staff |
| Brand Codex | design and voice source |
| Media District | publishing lane |
| Knowledge District | canon and context source |
| GitHub | artifact and issue spine |
| Approval queue | final human review |

## Artifact workflow

1. User gives a plain language brief.
2. Hermes identifies the brand lane.
3. Hermes checks existing docs and memory.
4. Specialist creator agent drafts the artifact.
5. Hermes checks for canon conflicts.
6. Output is queued for approval.
7. Approved output is saved back into the repo or publishing queue.

## Approval gates

Creator agents may draft:

- posts
- emails
- scripts
- ads
- proposals
- landing page copy
- one pagers
- press notes

Creator agents must request approval before:

- publishing
- changing official brand rules
- replacing canonical assets
- deleting repo files

## Anti drift note

Do not let Creator become random content generation.

Every output should know:

- brand lane
- audience
- artifact type
- source context
- approval state
- final destination

Hermes is the operator.

Creator is the artifact factory.

NEURO remains the final approval layer.