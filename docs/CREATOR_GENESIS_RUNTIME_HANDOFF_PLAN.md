# Creator Genesis Runtime Handoff Plan

## Status and claim boundary

This document is an implementation plan, not evidence of runtime integration. The current Creator Genesis command surface is a simulation. Integration is complete only when a real production-contract instance crosses the Creator Genesis -> HERMES -> Entertainment boundary and a Council/Verifier-approved Mission Control receipt can be validated against the canonical schemas.

The canonical JSON Schemas remain in `wiredchaos/agentropolis`. This repository consumes versioned schema references and must not copy or silently fork them.

## Executable path

```text
Creator Genesis project
  -> retrieve an access-scoped project RAG snapshot
  -> compile and validate a Creator Genesis Production Contract
  -> HERMES creates a bounded, reviewable plan
  -> dispatch NEXUS / ARCHITECT / SCRIBE / PRAXIS / EGOS jobs
  -> generate content-addressed artifact candidates
  -> record instrument-produced telemetry (otherwise UNKNOWN)
  -> Council / Verifier evaluates evidence and authority gates
  -> validate an Entertainment Routing Decision
  -> route to exactly one studio lane: 789 Studios or NTRU Studios
  -> request separately authorized distribution
  -> append a signed Mission Control receipt
```

Every arrow is a durable state transition. Workers exchange identifiers and validated envelopes rather than mutable shared prompts.

## Components

### 1. Project RAG retriever

- Accept `project_id`, principal, purpose, and a pinned retrieval-policy version.
- Enforce tenant, project, audience, rights, and secret scopes before retrieval.
- Return immutable source references, content digests, provenance, and an expiry time.
- Exclude credentials and private runtime state from model context.
- Record retrieval inputs and source digests, not secret-bearing source bodies, in the audit trail.

### 2. Production-contract compiler

- Transform the approved brief and RAG snapshot into the canonical Creator Genesis Production Contract.
- Pin `schema_version`, compiler version, policy version, input digests, and correlation ID.
- Reject invalid contracts before dispatch; never repair invalid authority fields by inference.
- Keep approval records separate from generated creative fields so a worker cannot manufacture approval.

### 3. HERMES planner and dispatcher

- Compile a finite dependency graph with retry, time, compute, and cost ceilings.
- Issue least-authority, short-lived capability tokens per job.
- Dispatch role-specific work to NEXUS, ARCHITECT, SCRIBE, PRAXIS, and EGOS through a queue/outbox boundary.
- Make jobs idempotent with `(production_id, step_id, attempt)` keys.
- Halt on exhausted bounds, policy denial, approval expiry, schema mismatch, or lane ambiguity.

HERMES may plan, dispatch, retry within approved bounds, and assemble evidence. It may not approve its own output, publish, spend $XENTS, mutate canonical memory, or perform irreversible external actions.

### 4. Replaceable execution adapters

Define capability interfaces rather than provider names:

```ts
interface GenerationAdapter {
  capabilities(): Promise<CapabilityManifest>;
  estimate(request: GenerationRequest): Promise<CostEstimate>;
  generate(request: AuthorizedGenerationRequest): Promise<ArtifactCandidate>;
  cancel(jobId: string): Promise<void>;
}

interface RenderAdapter {
  inspect(): Promise<RenderCapabilityManifest>;
  render(request: AuthorizedRenderRequest): Promise<ArtifactCandidate>;
}
```

Adapters declare modalities, limits, data-handling class, region, model/render-engine revision, and metering support. Selection is policy-driven. No contract field should require Anthropic, OpenAI, or any single media provider. Credentials resolve only inside the governed execution membrane and never enter contracts, logs, artifacts, telemetry, or receipts.

### 5. Artifact and telemetry stores

- Store candidates in quarantine by content digest; immutable lineage links each output to inputs, adapter revision, and job receipt.
- Promotion creates a new approved reference rather than mutating the candidate.
- Accept telemetry only from registered instruments with unit, method, timestamp, sample window, and instrument version.
- Represent absent measurements as `UNKNOWN` / `NOT_INSTRUMENTED`; never substitute synthetic percentages.
- Separate operational telemetry from approval evidence and redact sensitive prompt or source content.

### 6. Council / Verifier gate

Council defines policy and adjudicates exceptions. Verifier independently checks schema validity, provenance, rights/likeness evidence, artifact integrity, telemetry honesty, budget state, and audience classification. Neither a production worker nor HERMES can write an approval decision.

An approval is bound to the production-contract digest, artifact-manifest digest, routing-decision digest, policy version, reviewer identity class, and expiry. Any digest change invalidates approval and returns the workflow to review.

### 7. Entertainment router

- Validate the canonical Entertainment Routing Decision before resolving a destination.
- Enforce `youth/family/education/cartoons -> 789 Studios -> AGENT TV NETWORK`.
- Enforce `mature/adult/cyberpunk/psychological/underground/experimental -> NTRU Studios -> NTRU-OTT`.
- Default deny on mixed, missing, disputed, or stale classification; never fall back across lanes.
- Treat any public-safe NTRU transmission as a new, separately reviewed derivative decision.

### 8. Distribution and Mission Control

Distribution is a distinct command requiring a fresh human authorization bound to exact artifact and destination digests. Preview, render, upload, schedule, and publish are separate capabilities. Paid generation additionally requires an explicit, bounded spend authorization; estimates are not authorizations.

Canonical memory writes use a proposed-change record and an independent approval capability. Successful generation, routing, or publishing must never imply memory-write authority.

Mission Control appends a tamper-evident receipt after each terminal outcome. A successful integration receipt includes:

- production, correlation, contract, artifact-manifest, and routing-decision digests;
- canonical schema and policy versions;
- Creator, HERMES, worker, Entertainment, and distribution transition receipts;
- instrument-qualified drift and entropy states (including honest unknown states);
- test, build, and schema-validation results;
- reviewer identity class and approval state, without secrets or unnecessary personal data;
- spend, publishing, memory-mutation, and irreversible-action authorization references or explicit `not_authorized` states;
- final studio lane, destination, timestamps, and receipt signature/key identifier.

## Default-deny state machine

Suggested states are `DRAFT`, `RAG_PINNED`, `CONTRACT_VALID`, `PLANNED`, `DISPATCHED`, `ARTIFACTS_READY`, `VERIFICATION_PENDING`, `VERIFIED`, `ROUTED`, `DISTRIBUTION_PENDING`, `DISTRIBUTED`, `RECEIPTED`, `DENIED`, and `FAILED`.

Only the transition service may advance state, using compare-and-swap plus an outbox. Policy checks are evaluated on every transition. Publishing, paid generation, canonical memory mutation, studio-lane changes, and irreversible external actions require purpose-specific authorization capabilities; no broad approval or earlier state unlocks them.

## Verification strategy

1. Contract tests pin canonical schema fixtures and reject unknown or incompatible schema versions.
2. Policy tests prove every privileged action is denied without its exact authorization.
3. Routing property tests generate classifications and prove no youth/mature crossover is reachable.
4. Adapter conformance tests run against fakes, then each provider/render implementation.
5. Fault-injection tests cover duplicate delivery, retry exhaustion, stale approvals, changed digests, partial uploads, and unavailable telemetry.
6. Secret-scanning tests inspect logs, queues, artifacts, telemetry, and receipts.
7. An end-to-end test uses a non-publishing sandbox destination and produces a schema-valid, signature-verifiable Mission Control receipt.

## Runtime gaps

The following remain implementation work and must not be reported as existing integration:

- a canonical-schema client with compatibility and digest pinning;
- scoped project-RAG retrieval and provenance enforcement;
- the compiler, transition service, durable queue/outbox, and idempotent worker protocol;
- worker implementations and provider/render adapter conformance suites;
- artifact quarantine, immutable lineage, and real telemetry instrumentation;
- independent Council/Verifier identity, policy, and signed approval services;
- audience-routing enforcement connected to the canonical Entertainment service;
- separate spend, publishing, memory-change, and irreversible-action authorization services;
- authorized distribution adapters and tamper-evident Mission Control receipt storage;
- a real cross-repository end-to-end run producing a verified receipt.

## Delivery sequence

1. Pin canonical schemas and build contract-validation/compatibility tests.
2. Implement the transition journal, outbox, capability verifier, and deny-by-default policy tests.
3. Add RAG retrieval and the production-contract compiler with provenance fixtures.
4. Add HERMES planning plus fake role workers; prove bounded and idempotent dispatch.
5. Add artifact lineage and registered telemetry instruments.
6. Integrate independent Council/Verifier approval and digest invalidation.
7. Integrate the Entertainment router and exhaustive audience-boundary tests.
8. Add replaceable generation/render adapters, then separately authorized distribution adapters.
9. Generate, sign, validate, and retain the first sandbox Mission Control receipt.
10. Enable production destinations only after security review, operational rollback tests, and explicit human authorization.
