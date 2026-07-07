# Ebook Studio Creator Lane

## Status

Ebook Studio is tracked as a Creator District publishing tool for white-label interactive ebooks.

It belongs inside `AGENTROPOLIS-CREATOR` as a public-safe creator product lane, not as a separate Agentropolis repo yet.

```text
AGENTROPOLIS-CREATOR
  -> Publishing District
      -> AuthorMind
      -> Ebook Studio
          -> visual ebook builder
          -> chapter reader
          -> video explainer embeds
          -> branded cover scene
          -> single-file HTML export
```

## Core Positioning

Ebook Studio is a no-code white-label builder for creators, agencies, educators, coaches, and client deliverables.

The user fills in a visual form, checks a live preview, and exports one standalone HTML ebook that can be hosted anywhere.

```text
creator inputs
  -> brand + palette
  -> optional animated cover
  -> video slots
  -> chapters
  -> live preview
  -> exported single HTML file
```

## Product Boundary

This template is intentionally simple.

It does not include an AI tutor, backend, database, API key, login system, wallet connection, or private runtime dependency.

That makes it safe as a client-facing Creator District template: portable, inspectable, and easy to host.

## Pack Files

```text
ebook-studio-pack/
├─ ebook-studio-template.html
├─ nova-forge-example.html
└─ HOW-TO-GUIDE.md
```

### `ebook-studio-template.html`

The builder. Open this file in a modern browser to create ebooks.

Core modules:

- brand and cover text form
- palette presets and color pickers
- optional animated 3D cover scene
- video slot manager
- chapter editor
- desktop, tablet, and phone preview frame
- single-file HTML export

### `nova-forge-example.html`

A finished exported ebook used as a reference artifact.

Important implementation note: do not paste the builder HTML and exported example HTML into one file. They must remain two separate HTML documents.

### `HOW-TO-GUIDE.md`

Operator guide for non-technical users.

It explains:

- the five build steps
- tiny chapter markup
- video embed options
- hosting options
- runtime CDN dependency notes

## Chapter Markup

The chapter body field supports a tiny forgiving syntax:

| User types | Output |
|---|---|
| blank line | new paragraph |
| `**important**` | bold text |
| `` `code` `` | inline code styling |
| `- item` | bullet point |
| `> note` | highlighted callout |
| `## Heading` | section heading |

Everything else renders as a standard paragraph.

## Video Embeds

Supported inputs:

- YouTube links
- Vimeo links
- direct MP4 URLs
- blank URL placeholders

Blank URL mode is useful while a creator is still producing the explainer videos.

## Hosting Model

Exported ebooks are single HTML files.

They can be hosted on:

- Netlify Drop
- GitHub Pages
- S3-compatible static hosting
- any basic web server

Runtime external loads:

- Google Fonts
- Three.js CDN only when the animated cover is enabled

If a fully offline ebook is needed, disable the cover and swap the font link for system fonts.

## Agentropolis Fit

Ebook Studio sits in the Creator District as a productized publishing template.

It turns long-form knowledge, tutorials, playbooks, course notes, and client guides into branded interactive artifacts without requiring a full app stack.

```text
AuthorMind writes and packages the knowledge.
Ebook Studio turns it into a readable interactive object.
HERMES-CITY can explain and publish the public-safe pattern.
AGENTROPOLIS-AGENT-MCP can govern future tool execution if the builder becomes callable.
```

## Extraction Rule

Do not create a separate repo yet.

Extraction becomes justified only if Ebook Studio grows into a maintained standalone product with its own issue surface, roadmap, versioning, templates, and user base.

Until then, it remains a Creator District publishing lane.
