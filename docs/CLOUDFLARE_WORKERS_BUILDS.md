# Cloudflare Workers Builds Git Integration

## Role in AGENTROPOLIS-CREATOR

AGENTROPOLIS-CREATOR is the Construction District and Foundry. Cloudflare Workers Builds should treat this repository as the deployment lane for builder UI, construction previews, package review surfaces, and governed export workflows.

```text
wiredchaos/AGENTROPOLIS-CREATOR
  -> GitHub foundry source
  -> Cloudflare Workers Builds
  -> Builder / preview deployment
  -> Construction District surface
```

## Deployment Rule

The Foundry should deploy from Git pushes so every construction workflow, asset package, skill package, model-pack candidate, and interface change has a commit trail.

## Recommended Branch Map

| Branch | Cloudflare Target | Purpose |
| --- | --- | --- |
| `main` | Production builder | Stable foundry surface |
| `develop` | Staging builder | Integration testing |
| `feature/*` | Preview | World-diff, media-diff, package-diff review |

## Git Integration Setup

1. Open Cloudflare Dashboard.
2. Go to **Workers & Pages**.
3. Select the AGENTROPOLIS-CREATOR Worker or Pages project.
4. Open **Settings** > **Builds**.
5. Under **Git Repository**, select **Manage**.
6. Connect GitHub and authorize access to `wiredchaos/AGENTROPOLIS-CREATOR`.
7. Set production branch to `main`.
8. Enable pull request previews when available.

## Foundry Review Pattern

```text
candidate package
  -> branch
  -> pull request
  -> Cloudflare preview
  -> world-diff / media-diff / package-diff review
  -> verifier approval
  -> merge to main
  -> deployment receipt
```

## Guardrails

- Keep large binaries out of standard Git unless Git LFS is intentionally configured.
- Keep provenance, license, eval, risk, and rollback metadata with candidate packages.
- Use previews before adopting visual, runtime, or model-pack changes.
- CREATOR exports governed construction assets. It does not pull live runtime state directly.
- Runtime state belongs to the city shell.

## Canon Line

The Foundry builds the world. Governance decides what becomes permanent.