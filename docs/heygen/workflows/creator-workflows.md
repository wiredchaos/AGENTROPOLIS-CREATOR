# HeyGen Creator Workflow Playbooks

These playbooks extend the HeyGen Creator MCP lane inside AGENTROPOLIS-CREATOR.

Documentation index:

- https://heygen-1fa696a7.mintlify.app/llms.txt
- Remote MCP endpoint: `https://mcp.heygen.com/mcp/v1/`

Core doctrine:

```text
MCP first -> CLI second -> Raw API last
No API keys in chat
Human approval before public publishing
```

---

## Overview

HeyGen Developer Platform supports APIs for avatars, Video Agent, translation, streaming, MCP, Hyperframes, and automated video workflows.

New agents should begin with:

- Quick Start: https://developers.heygen.com/docs/quick-start
- For AI Agents: https://developers.heygen.com/docs/for-ai-agents
- Complete documentation index: https://heygen-1fa696a7.mintlify.app/llms.txt

---

# Workflow 1 - Automated Video Pipeline

Use case: data in, finished video out.

Pattern:

```text
Data event -> Template composition + injected data -> Hyperframes render -> Distribute
```

Best for:

- Weekly reports
- Personalized onboarding videos
- Per-customer dashboards
- Changelog announcements
- Automated broadcast segments

Implementation notes:

1. Create one reusable HTML composition.
2. Extract variable fields as placeholders.
3. Inject data into template.
4. Render with Hyperframes.
5. Distribute through the chosen channel.

Example template fragment:

```html
<div id="root" data-composition-id="main" data-start="0"
     data-duration="15" data-width="1920" data-height="1080">
  <div id="metric-1" class="clip" data-start="1" data-duration="4" data-track-index="2">
    <span class="value">{{ACTIVE_USERS}}</span>
    <span class="label">active users this week</span>
  </div>
</div>
```

AGENTROPOLIS use:

- Generate weekly district performance reports.
- Render MCP RANGER registry updates.
- Turn RELAY metrics into motion dashboards.
- Create creator economy recap videos.

---

# Workflow 2 - Social Media Content Pipeline

Use case: batch-generate platform-ready short-form videos.

Pattern:

```text
Choose topics -> Write prompts -> Batch generate videos -> Post
```

Recommended prompt structure:

```text
Create a 30-second vertical video for TikTok/Reels.

Topic: {topic}

Structure:
- Hook 0-5s: scroll-stopping statement or question
- Content 5-25s: 2-3 punchy insights
- CTA 25-30s: clear next action

Tone: casual, energetic, platform-native
Orientation: portrait
```

Platform guidance:

| Platform | Duration | Orientation | Notes |
|---|---:|---|---|
| TikTok | 15-60s | 9:16 | Hook in first 2 seconds |
| Instagram Reels | 15-60s | 9:16 | Clean visuals, text overlays |
| YouTube Shorts | 15-60s | 9:16 | Educational angle works well |
| LinkedIn | 30-90s | 16:9 | Professional tone |

AGENTROPOLIS use:

- Turn X posts into daily creator videos.
- Generate MCP RANGER announcement clips.
- Convert district updates into social assets.
- Repurpose AGENTROPOLIS build logs into short-form proof-of-work videos.

---

# Workflow 3 - Product Demo Videos

Use case: product screenshots + feature specs become narrated demos.

Pattern:

```text
Screenshots + feature specs -> Video Agent prompt -> Narrated walkthrough -> Regenerate when UI changes
```

Prompt structure:

```text
Create a 60-second product demo video for {product_name}.

Target audience: {audience}

Walk through these features using the attached screenshots:
- {feature_name}: {description}

Structure:
- Hook 5s: key value proposition
- Feature walkthrough: presenter explains visible UI and benefits
- CTA 5s: next step

Tone: knowledgeable, approachable, not salesy
```

AGENTROPOLIS use:

- Demonstrate Mission Control.
- Show Creator MCP routing.
- Explain NEMOclaw gate checks.
- Walk users through RELAY + district workflows.

---

# Workflow 4 - Automated Broadcast

Use case: scheduled video broadcasts from fresh data inputs.

Pattern:

```text
Schedule trigger -> Aggregate content -> LLM writes script -> Video Agent renders -> Auto-distribute
```

Best for:

- Daily news
- Weekly roundups
- Product changelogs
- Company updates
- Social digests
- Market updates

AGENTROPOLIS use:

- RED FANG 33.3FM daily broadcasts.
- CHAOS Newsroom bulletins.
- RANGER-WATCH source drift reports.
- Creator District scheduled content drops.

Required guardrails:

- Use approved RSS/API feeds only.
- Keep source receipts.
- Human approve sensitive broadcasts.
- Use webhooks for production rather than polling.

---

# Workflow 5 - Content Repurposing

Use case: blogs, podcasts, docs, and long-form posts become avatar-led clips.

Pattern:

```text
Written content -> LLM extracts key points -> Video Agent renders -> Distribute
```

Agent producer instruction:

```text
You are a video producer converting written content into a HeyGen Video Agent prompt.

Create a 60-second video prompt that:
1. Opens with the most compelling insight
2. Covers the 3 most important points
3. Uses specific visual descriptions
4. Ends with a CTA
5. Matches the tone of the original

Output only the Video Agent prompt.
```

AGENTROPOLIS use:

- Turn GitHub READMEs into explainers.
- Convert specs into launch content.
- Convert X threads into video scripts.
- Convert community updates into clips.

---

# Workflow 6 - Docs to Video

Use case: README files and docs become avatar-led explainers.

Pattern:

```text
Doc changes -> LLM writes video prompt -> Video Agent renders -> Embed or distribute
```

CI/CD trigger:

```yaml
name: Generate Doc Video
on:
  push:
    paths: ['docs/**', 'README.md', 'CHANGELOG.md']

jobs:
  generate-video:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Generate video
        env:
          HEYGEN_API_KEY: ${{ secrets.HEYGEN_API_KEY }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: python scripts/generate-doc-video.py
```

Security rule:

- Store API keys as encrypted secrets.
- Never commit secrets.
- Never paste API keys into chat.

AGENTROPOLIS use:

- Auto-generate explainer videos when MCP RANGER docs update.
- Generate onboarding videos for AGENTROPOLIS-CREATOR releases.
- Create changelog videos for every public release.

---

# Workflow 7 - Video Agent Styles

Use case: apply curated visual styles to Video Agent outputs.

CLI examples:

```bash
heygen video-agent styles list

heygen video-agent create \
  --prompt "A 30-second explainer about how AI is transforming video production" \
  --style-id "349d91e1ad2444eabab2672a9057f298"
```

Override agent choices:

```bash
heygen video-agent create \
  --prompt "A product launch announcement" \
  --style-id "349d91e1ad2444eabab2672a9057f298" \
  --avatar-id "avt_angela_01" \
  --voice-id "1bd001e7e50f421d891986aad5e3e5d2" \
  --orientation landscape
```

AGENTROPOLIS use:

- Maintain district-specific visual styles.
- Generate style variants for A/B testing.
- Apply NEURO / RED FANG / CHAOS RANK aesthetics consistently.

---

# Workflow 8 - Design a Custom Voice

Use case: generate a new voice from a natural-language prompt.

Example:

```bash
heygen voice create --prompt "warm, confident female narrator with a slight British accent"
```

Useful voice prompts:

| Prompt | Result |
|---|---|
| deep male voice with authority, like a movie trailer narrator | dramatic bass |
| friendly young woman, upbeat and energetic, American accent | casual and approachable |
| calm, measured British male, BBC documentary style | professional and trustworthy |
| enthusiastic tech reviewer, fast-paced, excited | high energy |
| soft-spoken female, ASMR-like, soothing | gentle and intimate |

AGENTROPOLIS use:

- Create repeatable narrator identities.
- Maintain district-specific voice profiles.
- Keep voice generation behind consent and approval gates.

---

# Workflow 9 - Photo to Video

Use case: turn a headshot into a talking avatar video.

CLI flow:

```bash
heygen asset create --file ./headshot.jpg
heygen avatar create -d '{"files": [{"type": "asset_id", "asset_id": "ast_abc123"}]}'
heygen avatar looks get avt_xyz789
heygen video create -d '{
  "type": "avatar",
  "avatar_id": "avt_xyz789",
  "script": "Hi there. I was created from a single photo using the HeyGen CLI.",
  "voice_id": "1bd001e7e50f421d891986aad5e3e5d2",
  "aspect_ratio": "auto"
}'
```

Guardrails:

- Use only authorized images.
- Respect avatar consent flows.
- Never generate impersonation content.
- Store generated avatar IDs in a controlled registry.

---

# Workflow 10 - Real Estate Listing Videos

Use case: listing photos and property data become narrated tours.

Pattern:

```text
Property photos + listing data -> Video Agent prompt -> Narrated property tour -> Listing/social distribution
```

AGENTROPOLIS use:

- Creator commerce vertical.
- RWA property content generation.
- Local service provider video automation.

Prompt structure:

```text
Create a 45-second property tour video.

Property: {address}
Price: {price} | {bedrooms} bed / {bathrooms} bath | {sqft} sq ft

Use attached property photos.
Cover opening, kitchen/living, primary suite, outdoor space, and closing CTA.
Tone: warm, professional, inviting.
```

---

# Workflow 11 - Data Visualization Videos

Use case: spreadsheets, dashboards, and analytics become explainer videos.

Pattern:

```text
Data source -> Generate visualization HTML -> Animate with GSAP -> Render to MP4
```

Best for:

- Animated bar charts
- Counters/tickers
- Line charts
- Dashboards
- Algorithm visualizations
- Motion dashboards

AGENTROPOLIS use:

- District health videos.
- RANGER registry growth visuals.
- RELAY routing metrics.
- Creator performance recap videos.

---

# Workflow 12 - Lovable MCP Connection

Use case: connect HeyGen to Lovable as a custom MCP chat connector.

Remote MCP URL:

```text
https://mcp.heygen.com/mcp/v1/
```

Steps:

1. Open Lovable.
2. Go to **Connectors -> Chat connectors**.
3. Choose **Add custom MCP server**.
4. Name it `HeyGen`.
5. Enter `https://mcp.heygen.com/mcp/v1/`.
6. Save and connect.
7. Complete the one-time HeyGen OAuth flow.

Usage prompt:

```text
Generate a short product walkthrough video with HeyGen for this app.
```

Important:

- Lovable custom MCP servers are per-user chat connectors.
- They are personal, not workspace-shared.
- They provide context to Lovable chat during app creation.
- They are not bundled into the deployed app.

---

# Production Gates

Before publication:

1. Confirm source content rights.
2. Confirm avatar and voice consent.
3. Confirm no secrets were exposed.
4. Confirm target platform format.
5. Confirm callback/webhook safety.
6. Human approve final video.
7. Log video ID, source prompt, assets, and output URL.
