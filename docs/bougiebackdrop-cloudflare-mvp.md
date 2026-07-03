# BougieBackdrop Cloudflare MVP

## Product

**BougieBackdrop** is the first Manufacturing District production agent.

It helps Bad n Bougie Vintage create Vinted-ready listing packs from raw clothing photos.

## MVP Promise

```text
Take pictures.
Upload them.
Get clean listing images, title, description, category hints, keywords, and a safe Vinted version.
Approve before posting.
```

## User Flow

```text
Upload item photos
-> choose platform: Vinted default
-> choose background pack
-> agent drafts title/description
-> agent creates image variants
-> TrustVerifier checks accuracy
-> user approves
-> export listing pack
```

## Background Pack

1. Clean Marketplace
2. Matte Black Boutique
3. Gold Vintage Studio
4. Neon Pink Cyan Glow
5. Retro Cyber Closet
6. Safe Vinted Listing Version

## Listing Copy Output

```md
# Listing Draft

Title:

Description:

Category:

Brand:

Size:

Condition:

Color:

Material:

Suggested price:

Keywords:

Disclosure notes:
```

## Cloudflare Build Notes

- Frontend on Cloudflare Pages
- API on Workers
- Product photos and exports in R2
- Listing metadata in D1
- Multi-step listing processing in Workflows
- Batch image jobs in Queues
- AI Gateway for model routing
- Turnstile for public upload protection

## Required Screens

1. Upload screen
2. Listing session screen
3. Image variant review screen
4. Copy review screen
5. Export screen
6. Manufacturing District public demo screen

## Required Agents

### BougieBackdrop Agent

Creates background prompts and listing-ready image variants.

### ListingStylist

Writes marketplace copy.

### TrustVerifier

Checks whether output could mislead a buyer.

### BatchExporter

Packages final images and listing copy.

## Trust Rules

- Never change the item.
- Never hide flaws.
- Never fake labels or condition.
- Always preserve originals.
- Always create a safe marketplace version.
- Always require user approval before publishing.

## v1 Out of Scope

- automatic marketplace publishing
- payment processing
- inventory deletion
- fake try-on modeling
- authentication claims
- legal or tax workflows

## Codex Instruction

```text
Build BougieBackdrop as a Cloudflare-first app.

Use Cloudflare Pages for the frontend and Workers for API routes.
Use R2 for original and generated images.
Use D1 for listings, image metadata, and provenance events.
Create a simple upload -> processing -> review -> export workflow.
Do not implement direct marketplace publishing in v1.
Human approval is required before any marketplace action.
```
