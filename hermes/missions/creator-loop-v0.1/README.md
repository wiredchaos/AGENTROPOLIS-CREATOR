# Hermes Mission — CREATOR LOOP v0.1.0

## Truth state

`DISPATCHED / AWAITING LIVE HERMES RECEIPT`

This directory is a governed execution packet for the live Hermes operator runtime. Committing this packet does not prove that Hermes executed it.

The mission is complete only when the live runtime writes:

```text
hermes/missions/creator-loop-v0.1/receipts/hermes-completion-receipt.json
```

with:

```json
{
  "runtime": "hermes",
  "validation_status": "PASS",
  "status": "COMPLETED"
}
```

## Runtime lane

```text
Mission Control mandate
  -> 54T / AEGIS policy decision
  -> governed capability authorization
  -> Hermes creator-steward
  -> bounded offline execution
  -> validation
  -> completion receipt
  -> human review
```

## Artifact handoff

Expected archive:

```text
agentropolis-creator-loop-v0.1.0.zip
```

Expected SHA-256:

```text
c8dc0756cb5f7dfb94587481e8fb61c1b1abdba75de739f9f7b9a5985b232ade
```

Place the archive inside the Hermes workspace, then set its absolute path:

```bash
export CREATOR_LOOP_ZIP=/absolute/path/agentropolis-creator-loop-v0.1.0.zip
```

## Execute

From the repository root:

```bash
bash hermes/missions/creator-loop-v0.1/run-hermes-mission.sh
```

## Boundaries

- Claude dependency is prohibited.
- Model-provider lock-in is prohibited.
- Agent spawning is prohibited for this mission.
- External publishing, deployment, payments, and destructive actions are prohibited.
- Network use is read-only and requires explicit approval.
- The launcher may decode, verify, install declared dependencies, compile, test, run the offline demo, inspect evidence, and write the completion receipt.

## Failure semantics

The launcher writes a structured receipt with one of:

- `COMPLETED`
- `BLOCKED`
- `FAILED`

A missing artifact is `BLOCKED`, not success. A checksum mismatch or failed validation is `FAILED`, not partial completion.
