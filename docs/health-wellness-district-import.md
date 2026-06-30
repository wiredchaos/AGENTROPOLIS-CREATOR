# Health + Wellness District Incorporation

This document captures the incorporation path for the private source repo:

```text
wiredchaos/agentropolis-health-n-wellness
```

Source clone URL:

```text
https://github.com/wiredchaos/agentropolis-health-n-wellness.git
```

## Why It Matters

The Health + Wellness repo is not just another Lovable app.

It already contains a Vite, React, TypeScript, shadcn-ui, Tailwind, React Three Fiber, Three.js, Supabase, WebLLM, Framer Motion, and Agentropolis-aware app scaffold.

That makes it a strong candidate for becoming the **Health + Wellness District** inside AGENTROPOLIS-CREATOR.

## Source Repo Snapshot

The source README identifies the project as a Lovable project and confirms the stack:

```text
Vite
TypeScript
React
shadcn-ui
Tailwind CSS
```

The package manifest also includes additional strategic dependencies:

```text
@react-three/fiber
@react-three/drei
three
@mlc-ai/web-llm
@supabase/supabase-js
framer-motion
recharts
html2canvas
```

The app route map already exposes Agentropolis-oriented surfaces, including:

```text
/
/dashboard
/wcu-human
/pitch
/doctrine
/hedera
/doge
/profiles
/profile/:handle
/skills/nemoclaw
/outreach
/openclaw
/studio
/ecosystem
/infra
/vault
/documentary
/shroud
```

## Incorporation Strategy

Do not blindly dump the full app into the Creator root.

AGENTROPOLIS-CREATOR is currently a static GitHub Pages site and docs scaffold.

The Health + Wellness repo is a full Vite React app.

The clean pattern is to incorporate it as a district module, then promote reusable pieces into the Creator architecture.

## Recommended Target Layout

```text
AGENTROPOLIS-CREATOR/
  districts/
    health-wellness/
      README.md
      source-repo.md
      route-map.md
      migration-plan.md
      reusable-components.md
  docs/
    health-wellness-district-import.md
  registry/
    source-repos.md
```

## District Role

**District:** Health + Wellness

**Purpose:** Human-centered wellness, education, profile chambers, dashboards, outreach, life systems, and health/wellness-aligned city services.

**Strategic Fit:** This district balances the heavy AI infrastructure, media forge, and 3D world-building layers with a human support surface.

## What To Reuse

### 1. React/Vite App Pattern

Use the source repo as the blueprint for a future interactive district app.

### 2. Route Architecture

The route map can inform Creator District navigation and future portal links.

### 3. Agentropolis Provider Pattern

The source app imports:

```ts
AgentropolisProvider
AgentStage
```

This suggests the repo already has a city context/provider concept worth extracting into a reusable package later.

### 4. 3D UI Stack

React Three Fiber, Drei, and Three.js align directly with the AGENTROPOLIS-CREATOR cinematic homepage roadmap.

### 5. Local AI / WebLLM

The WebLLM dependency fits the broader cost-controlled, local-first, vendor-agnostic strategy.

### 6. Supabase

Supabase can support profile chambers, wellness logs, dashboard data, and persistent district state if governance approves.

## Hard Guardrails

Health + Wellness needs stricter boundaries than media or 3D demos.

- No diagnosis claims.
- No emergency medical advice.
- No replacing clinicians.
- No medication instructions.
- No unsupported health claims.
- No private health data without explicit privacy architecture.
- No public demos with sensitive personal data.
- Use educational and support language.

## Migration Phases

### Phase 1: Reference Incorporation

- Register source repo.
- Document stack and route map.
- Add Health + Wellness to the Creator homepage.
- Create district folder.

### Phase 2: Component Audit

- Identify reusable components.
- Identify Agentropolis-specific providers.
- Identify 3D scene components.
- Identify Supabase assumptions.
- Identify any sensitive health data flows.

### Phase 3: Static Portal

- Add a static Health + Wellness district page or section.
- Link to the source repo.
- Explain district purpose.

### Phase 4: React District Merge

- Decide whether AGENTROPOLIS-CREATOR remains static or upgrades to Vite/R3F.
- If upgraded, port reusable components from the source repo.
- Keep health logic behind strict safety and privacy gates.

### Phase 5: MCP + Agent Integration

- Add HealthGuide Agent.
- Add WellnessContent Agent.
- Add PrivacyVerifier Agent.
- Add HumanEscalation Agent.
- Add safe wellness content workflows.

## Initial District Agents

### HealthGuide Agent
Educational wellness guide. No diagnosis. No medical replacement.

### WellnessContent Agent
Creates safe wellness explainers, routines, checklists, and content drafts.

### PrivacyVerifier Agent
Checks whether any output or workflow risks exposing sensitive personal information.

### HumanEscalation Agent
Flags cases that require professional, emergency, or human support instead of automation.

## Anti-Moloch Rule

The Health + Wellness District exists to keep the city human.

Automation can support wellness.

Automation cannot pretend to be medical authority.
