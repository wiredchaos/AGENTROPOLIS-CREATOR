# Governed Civic Application Blueprints

AGENTROPOLIS-CREATOR remains the Creator Foundry and Construction District. It may design and package reusable civic application Blueprints for execution by the separate Civic Foundry Runtime.

## Blueprint package

Every Blueprint must include:

- name, version, publisher district, and lineage
- source provenance and checksum
- license and attribution
- requested capabilities and network access
- data classifications
- model and tool dependencies
- runtime compatibility profiles
- resource limits
- threat-model and ASBE review status
- benchmark and test receipts
- rollback, destruction, and export behavior

## Boundary

CREATOR designs, tests, renders, and packages Blueprints. It does not grant production authority, store credentials, approve external mutations, or write generated application state directly to sovereign memory.

## Flow

```text
creator intent
  -> Blueprint package
  -> static and adversarial validation
  -> ASBE classification
  -> registry publication
  -> citizen fork or installation
  -> Civic Foundry sandbox
  -> capability request
  -> HERMES approval
  -> receipt
```

A user fork becomes a new lineage branch with a new checksum and review state. Upstream approval does not automatically transfer to modified code.