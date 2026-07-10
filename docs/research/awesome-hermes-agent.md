# Hermes Ecosystem Intake

Upstream index: `0xNyk/awesome-hermes-agent`

## Purpose

Use Awesome Hermes Agent as a discovery feed for skills, plugins, memory providers, deployment tools, bridges, operational playbooks and multi-agent patterns relevant to AGENTROPOLIS.

## Intake rule

Discovery is not approval. Every candidate moves through:

`discover -> classify -> verify -> sandbox -> security review -> compatibility test -> registry proposal -> approve or reject`

## Classification

Tag each candidate by:

- maturity: production, beta or experimental
- district owner
- required runtime
- credentials and network access
- read-only or write-capable behavior
- data sensitivity
- license
- maintenance activity
- rollback path

## Priority lanes

1. Skills that improve testing, debugging, documentation and memory maintenance
2. Cost controls, auditability and approval gates
3. Incident response and operational resilience
4. Cross-runtime skill portability
5. Secure bridges into self-hosted services

## Exclusions by default

- autonomous financial actions
- unreviewed social posting
- credential collection outside the secret manager
- skills that modify policy, memory or registry state without an audit trail
- abandoned or opaque packages with no reproducible install path

## Registry requirement

Approved imports must include provenance, pinned version, checksum or commit, district ownership, activation triggers, dependencies, permissions and one tested usage example.

## Decision

Track this repository as an external ecosystem radar. Never auto-install from the list.
