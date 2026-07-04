# AGENTROPOLIS-CREATOR Hackathon District Build Spec

## Core decision

Yes. The Hackathon District applies to AGENTROPOLIS-CREATOR.

CREATOR should own the build and packaging side: converting HERMES/ZERO strategy into components, docs, submission pages, demo scripts, and deployable hackathon surfaces.

Morph applies only as a coding-agent infrastructure lane. It can help with code search, fast apply, context compaction, routing, and trace diagnostics, but it does not become the Creator itself and does not become a separate repo yet.

## Creator responsibility

```txt
AGENTROPOLIS-CREATOR
└─ Hackathon District build lane
   ├─ convert chat data into reusable React components
   ├─ package application answers into submission surfaces
   ├─ generate augmentation specs
   ├─ produce demo scripts
   ├─ preserve AGENTROPOLIS canon
   └─ keep secrets out of frontend code
```

## District shell

The pasted prototype should be refactored into a single default export and split into smaller component files over time.

```txt
src/districts/HackathonDistrict.jsx
src/districts/hackathon/ApplicationCenter.jsx
src/districts/hackathon/HackathonRadar.jsx
src/districts/hackathon/HermesAgent.jsx
src/districts/hackathon/SubmissionConsole.jsx
src/districts/hackathon/BuildPlan.jsx
src/districts/hackathon/BuildArsenal.jsx
```

## Required tabs

```txt
RADAR
APPLICATIONS
HERMES AGENT
SUBMISSIONS
BUILD PLAN
ARSENAL
```

## Implementation corrections from chat

Fix these before shipping:

- remove duplicate `import` lines
- keep only one `export default`
- do not call Anthropic directly from browser React
- route model calls through an internal API route
- move hardcoded competition data into a seed file later
- separate UI chrome from agent execution logic
- keep application answers editable and copyable

## Safe API route pattern

Frontend:

```js
await fetch("/api/claude", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});
```

Backend:

```js
export default async function handler(req, res) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify(req.body)
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
```

## Morph use in Creator

Allowed:

- semantic search for existing component reuse
- fast apply for targeted component patches
- compact long build sessions
- route coding tasks to the best available coding model
- classify broken build loops or failed traces

Not allowed:

- making Morph the public product
- creating a Morph repo before it has service boundaries
- committing provider keys
- letting Morph rewrite canon without review

## Seed build inventory

- NDLP Dashboard
- AGENTROPOLIS 3D City
- GNOSIS 33.3 Agent Forge
- Local Acquisition Engine
- SIGNAL/ZERO
- Viral Launch Agent
- Claude Doctor
- Workflow Agent
- LinkedIn Intel Agent
- Design Agent
- HACKATHON/ZERO
- Cognitive Stack
- NDLP Command plus GNOSIS Swarm

## Current lock

CREATOR builds the Hackathon District surface.

HERMES decides. CREATOR builds. MCP routes. Morph supports coding-agent infrastructure. AGENTROPOLIS governs.
