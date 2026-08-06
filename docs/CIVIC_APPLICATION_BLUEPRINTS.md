# Governed Civic Application Blueprints

AGENTROPOLIS-CREATOR remains the Creator Foundry and Construction District. It may design and package reusable civic application Blueprints for execution by the separate Civic Foundry Runtime. A Blueprint is a governed application template registered with provenance, checksum, requested permissions, license, and review status. This document is contract doctrine for Blueprint packaging and publication; it does not claim any specific implementation.

## Blueprint manifest

Every Blueprint must declare ALL of the following fields:

- blueprint_id
- name
- version
- publisher
- publisher_district
- lineage
- source_repository
- source_commit
- checksum
- license
- attribution
- entrypoint
- bounded_activation_triggers
- requested_capabilities
- network_destinations
- data_classifications
- retention_behavior
- model_dependencies
- tool_dependencies
- runtime_profiles
- resource_limits
- cost_limits
- rollback_behavior
- destruction_behavior
- export_behavior
- test_receipts
- security_review_receipts
- compatibility_receipts
- registry_status

A manifest missing any of these fields is incomplete and must not proceed past static validation.

## Authority alignment

This contract is consistent with the Civic Foundry Runtime authority order: AEGIS issues policy decisions, AGENTROPOLIS-AGENT-MCP issues and enforces capabilities, HERMES presents approvals but never self-authorizes, ASBE is orchestration and compatibility only, and CREATOR designs and packages Blueprints without granting production execution authority.

## Entrypoint and bounded activation

Every Blueprint must declare an entrypoint plus bounded activation triggers. The entrypoint names the deterministic launch point the Civic Foundry Runtime invokes. The bounded activation triggers enumerate the exact conditions under which that entrypoint may be launched. The runtime must not launch a Blueprint whose entrypoint or activation triggers are undeclared, ambiguous, or unbounded.

## Publication flow

```text
creator intent
  -> Blueprint package
  -> static validation
  -> quarantine
  -> Civic Foundry sandbox execution
  -> security and compatibility testing
  -> AEGIS classification
  -> Agent MCP capability review
  -> required human approval
  -> registry publication
  -> citizen installation or fork
```

Sandbox execution, security and compatibility testing, classification, capability review, and required human approval all precede registry publication. No Blueprint reaches the registry without passing every gate in order.

## Capability approval

Capability approval routes through the AGENTROPOLIS-AGENT-MCP permission gate. Where policy requires it, human approval is recorded against the exact requested capability envelope before any capability is issued. HERMES may present the approval and execute afterward; HERMES never self-authorizes a capability. CREATOR designs and packages the requested capabilities but does not grant them.

## Classification authority

Threat and policy classification routes through the governance layer (AEGIS). ASBE remains an orchestration and compatibility participant only; it must never act as the Policy/Risk authority.

## Boundary

CREATOR designs, tests, renders, and packages Blueprints. It does not grant production execution authority, store credentials, approve external mutations, or write generated application state directly to sovereign memory. The Civic Foundry Runtime never receives sovereign authority.

## Modified forks

A citizen fork of a published Blueprint becomes a new lineage branch with a new checksum and a new review state. Modified code does not inherit the upstream Blueprint's production approval; it must pass the gates of the publication flow anew before it may be installed for production use.
