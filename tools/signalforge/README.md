# SignalForge: AGENTROPOLIS Micro-Graphic Generator

SignalForge is a browser-only HTML/CSS/JS generator for AGENTROPOLIS micro-graphics: repo badges, district passes, agent ID cards, transmission slips, lab labels, and game tiles.

## Canon lock

SignalForge belongs in `AGENTROPOLIS-CREATOR` as a creator tool. Other repos may reference it, but this repo owns the canonical implementation.

## Outputs

- SVG export for clean vector badges and README assets
- PNG export for social graphics, posts, and stickers
- GIF export for subtle animated signal cards

## Visual grammar

- Off-white utility paper background
- Black ink / monochrome print system
- Dense but readable micro layout
- Barcodes, QR-like blocks, waveform strips, revision tags, tiny coordinate tables, build IDs, and district stamps
- No glossy AI look
- No vendor-specific dependency in canon

## Templates

| Template | Purpose |
| --- | --- |
| District Pass | HERMES CITY, CREATOR, NEURA, ARENA, CLEAR, BWB |
| Repo Badge | GitHub README and release visuals |
| Agent ID Card | NPC / agent profile cards |
| Transmission Slip | BWB, 33.3FM, CLEAR signal cards |
| Lab Label | Ontology, MCP, Codex systems |
| Game Tile | BoardForge / Arena District assets |

## GIF motion rules

GIF animation should stay technical and print-like. Use subtle motion only:

- scanline sweep
- barcode flicker
- waveform drift
- QR block glitch
- revision tag blink
- micro-text scramble
- district stamp cycling

Target: 24 to 48 frames, optimized loop, suitable for X posts, GitHub READMEs, sticker packs, and AGENTROPOLIS UI assets.

## Easter eggs

Allowed lore-safe Easter eggs:

- NEURO
- NPC
- 82675
- 333
- 589
- 33.3FM
- AGT-OPS-007
- HERMES-CITY / REV-A
- ARENA-DISTRICT / BOARD-FORGE

## Recommended stack

- `index.html`
- `style.css`
- `app.js`
- `html2canvas` for PNG frames
- `gif.js` for GIF export
- Native SVG serialization for SVG export

## Implementation prompt

```txt
Create an HTML based micro-graphic generator for AGENTROPOLIS.

Build a single page vanilla HTML/CSS/JS app that generates randomized monochrome sci-fi utility graphics inspired by technical labels, access cards, operations slips, repo badges, lab panels, QR blocks, barcodes, small data tables, serial numbers, coordinates, and transmission cards.

Requirements:
- No backend
- Lucky button randomizes the whole graphic
- Export as PNG
- Export as SVG
- Export as GIF
- Templates: District Pass, Repo Badge, Agent ID Card, Transmission Slip, Lab Label, Game Tile
- Themes: HERMES CITY, AGENTROPOLIS CREATOR, NEURA, ARENA DISTRICT, BWB, CLEAR, 33.3FM DOGECHAIN
- Include AGENTROPOLIS lore-safe text only
- Add Easter eggs for NEURO, NPC, 82675, 333, 589, 33.3FM
- Monochrome off-white paper background with black ink
- Add random micro tables, waveform lines, barcode blocks, QR-like squares, glyphs, revision tags, build numbers, and coordinates
- For GIF export use html2canvas and gif.js
- Generate 24 to 48 frames
- Animate scanlines, barcode flicker, waveform movement, QR glitch blocks, blinking revision tags, and micro-text scramble
- Keep animation subtle, monochrome, technical, and print-like
- Provide clean code split into index.html, style.css, app.js
- Make output suitable for GitHub README images, social posts, stickers, badges, and UI assets
```

## Guardrail

SignalForge is a visual asset generator, not a wallet, not an identity provider, and not a blockchain dependency. Chain, wallet, or marketplace integrations must remain outside the generator.