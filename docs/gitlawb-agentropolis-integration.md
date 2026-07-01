# GitLawB Agentropolis Integration

## Purpose

GitLawB is an experimental decentralized git and MCP workflow rail for Agentropolis.

It should be treated as an alpha lane for agent-native source control, identity, repo discovery, pull request workflows, issue workflows, and signed coordination records.

It does not replace GitHub, the Agentropolis registry, Verifier, or human approval.

It becomes a candidate rail for:

- decentralized skill publishing
- agent-owned repositories
- DID-based agent identity
- MCP-accessible repo operations
- signed candidate packets
- signed world diffs and media diffs
- decentralized approval records
- Agentlink discovery sources

```text
GitHub = stable public repo rail
GitLawB = experimental agent-native decentralized git rail
Agentlink = discovery and install interface
Verifier = governance gate
Human approval = final production authority
```

## Fit Inside Agentropolis

Agentropolis is the Intelligence Grid.

GitLawB fits the grid only if it strengthens provenance, governance, and agent coordination. It should never become an unchecked publishing shortcut.

### Layer Role

**Layer:** Infrastructure  
**District Alignment:** CHAOS CODE, NEURO, NTRU, Construction District  
**Status:** watch / evaluate  
**Risk Level:** medium by default, high when touching production canon or public publishing

### Primary Use Cases

| Use Case | Agentropolis Function |
| --- | --- |
| Agent-owned repos | Give agents scoped workspaces without merging identity into one human operator |
| MCP repo workflows | Allow agents to inspect repos, open issues, draft PRs, and submit review artifacts |
| DID identity | Create verifiable identity rails for agents and maintainers |
| Decentralized skill publishing | Publish skills and adapters outside a single centralized repo |
| Candidate packet storage | Store manifests, sidecars, diffs, and reports as governed records |
| Agentlink source | Let Agentlink search GitLawB as an install/discovery source |
| NTRU trust layer | Explore signatures, provenance proofs, and verification handshakes |

## Relationship To The 3D MCP Agent Kit

GitLawB can support the Agentropolis 3D MCP Agent Kit as a decentralized record layer for candidate worlds and asset changes.

```text
WorldForge candidate
-> candidate packet
-> GitLawB experimental repo record
-> Verifier review
-> signed world diff
-> human approval
-> GitHub / production import
```

Recommended artifacts to store:

```text
candidate/
  manifest.yaml
  prompt.md
  source-media.md
  license.md
  performance.md
  import-checklist.md
  verifier-report.md
  world-diff.md
  media-diff.md
  approval-record.md
```

## Relationship To Agentlink

Agentlink should treat GitLawB as a searchable source, not a source of truth.

```text
npx agentlink search worldforge
-> official Agentropolis registry
-> GitHub public registry
-> GitLawB decentralized registry candidates
-> local workspace
-> Verifier status
```

Agentlink may surface GitLawB results only when the result includes:

- source repo
- owner or DID
- manifest
- license field
- risk level
- verifier status
- install command or import path
- last update date

## Governance Rules

### Allowed During Evaluation

- inspect public GitLawB repos
- index MCP tool metadata
- mirror non-sensitive manifests
- draft issues or PRs
- create candidate packets
- test DID-based agent identity
- store non-production world diffs
- store non-production media diffs

### Requires Human Approval

- importing a GitLawB-hosted asset into Agentropolis production
- publishing a GitLawB-originated skill as official
- granting write access to an autonomous agent
- using decentralized records as canonical governance proof
- attaching wallet execution to repo actions
- public media release based on GitLawB-originated files

### Blocked Until Proven Safe

- autonomous production merges
- unreviewed adapter installation
- unclear-license media imports
- private secret storage
- seed phrase or wallet key storage
- public publishing without Verifier and human approval
- treating DID identity alone as sufficient trust

## Risk Model

### Low Risk

- read-only repo inspection
- metadata indexing
- manifest drafting
- issue drafting
- local-only experiments

### Medium Risk

- agent-authored PRs
- MCP-driven repo changes
- decentralized candidate packet storage
- mirrored adapter manifests
- signed non-production diffs

### High Risk

- production scene mutation
- official skill publishing
- public media publishing
- wallet-connected repo actions
- autonomous merges
- identity or signature claims without independent verification

## First Implementation Path

1. Add GitLawB as an `experimental` source in the Agentlink source map.
2. Create a sample GitLawB adapter manifest.
3. Define a `gitlawb-record.md` sidecar for candidate packets.
4. Require Verifier to mark every GitLawB-originated artifact as `external-experimental`.
5. Mirror only non-sensitive test artifacts first.
6. Run one test flow with a WorldForge candidate for the Command Atrium.
7. Do not import into production until provenance, license, performance, district-fit, canon, and human approval all clear.

## Example Adapter Manifest

```yaml
adapter_id: gitlawb_agentropolis_source
name: GitLawB Agentropolis Source
class: decentralized_git
status: watch_evaluate
risk_level: medium
mcp_available: true
source_url: https://gitlawb.com/
used_by:
  - Agentlink
  - Verifier
  - WorldForge
  - CHAOS CODE
  - NTRU
allowed_actions:
  - inspect_repo
  - index_manifest
  - draft_issue
  - draft_pr
  - store_candidate_packet
blocked_actions:
  - autonomous_merge
  - production_import_without_review
  - wallet_execution_without_policy
  - secret_storage
requires:
  - provenance_review
  - license_review
  - verifier_report
  - human_approval_for_production
```

## Canon Line

> GitLawB is not the courthouse.  
> It is a candidate records rail for agents.  
> Verifier decides what can approach the city gates.  
> Human governance decides what becomes infrastructure.
