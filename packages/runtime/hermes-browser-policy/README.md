# @agentropolis/hermes-browser-policy

Dependency-light runtime gates for the Hermes Browser Operator.

This package does not drive a browser. It decides whether a proposed browser action is inside an approved Agentropolis task contract before any adapter, extension, CDP client, or MCP server is called.

## Enforced invariants

- isolated automation profile required
- verified and permission-reviewed bridge required
- explicit domain allowlist
- explicit action allowlist
- observe and propose modes cannot mutate state
- financial, identity, and exfiltration actions hard-blocked
- consequential actions require exact human approval
- consequential actions require before/after evidence capability
- batch counters cannot exceed contract limits
- blocked actions cannot be recorded as completed
- BYOK credentials remain hidden from the agent
- raw page content cannot be persisted as memory

## Usage

```ts
import {
  evaluateBrowserAction,
  createExecutionReceipt,
  type BrowserTaskContract,
  type BrowserActionRequest,
} from '@agentropolis/hermes-browser-policy';

const decision = evaluateBrowserAction(contract, request);

if (!decision.allowed) {
  return decision;
}

// Only now may the approved browser adapter be called.
const toolResult = await browserAdapter.execute(request);

return createExecutionReceipt(contract, request, decision, {
  completed: toolResult.ok,
  toolReceiptRef: toolResult.receiptRef,
  evidenceBeforeRef: toolResult.beforeRef,
  evidenceAfterRef: toolResult.afterRef,
});
```

## Boundary

This package is a policy kernel, not a browser bridge. Provider credentials, session cookies, browser profiles, screenshots, and user data must remain outside the repository and outside policy logs.
