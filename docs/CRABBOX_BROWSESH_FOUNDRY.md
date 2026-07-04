# Crabbox + browse.sh in AGENTROPOLIS-CREATOR

## Role

AGENTROPOLIS-CREATOR is the foundry layer.

This repo should use:

- `Crabbox` for disposable build and test environments.
- `browse.sh` for reusable browser workflows.

Creator builds. Crabbox executes. browse.sh navigates.

## Standard wording

> browse.sh does not replace the agent.
>
> It gives agents reusable browser skills so web workflows can be repeated safely, consistently, and audibly.

> Crabbox does not replace the builder.
>
> It gives agents disposable execution environments so code can be tested, verified, and discarded without exposing the operator machine.

## Foundry placement

```txt
AGENTROPOLIS-CREATOR
├─ Foundry workflows
├─ Skills
├─ Builders
├─ Packaged workflows
├─ Browser workflows
│  └─ browse.sh = repeatable website muscle memory
└─ Build/test workflows
   └─ Crabbox = disposable remote machine execution
```

## Creator responsibilities

Creator should define packaged workflows that can be reused by builders:

- website research flows
- screenshot and page review flows
- form walkthrough flows
- Lovable, Replit, and Figma build review flows
- code smoke-test flows
- generated app verification flows
- repo scaffold verification flows

## Review gates

Creator should route higher-risk actions through the governed tool membrane and the City OS review layer.

Examples:

- publishing
- social posting
- account-level actions
- production deploys
- destructive repo operations

## Operating stack

```txt
Hermes decides.
Creator builds.
MCP routes.
browse.sh navigates.
Crabbox executes.
Agentropolis governs.
```

## Repo update guidance

This repo gets the Creator-side implementation notes.

Do not split this into a new repo unless the workflow becomes an independent product with its own deployable app, database, queues, platform auth, analytics, and reusable SDK/API.
