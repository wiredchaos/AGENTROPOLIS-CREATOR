# ScriptBreak Screenplay Intelligence Lane

## Classification

- **Upstream:** `wassermanproductions/scriptbreak`
- **Owner:** Sam Wasserman / Wasserman Productions
- **License:** Apache-2.0
- **Agentropolis role:** external local-first screenplay intelligence source
- **Execution mode:** read-only MCP over a saved `.scriptbreak` project
- **Default status:** optional adapter, disabled until locally configured

ScriptBreak is not an Agentropolis fork, district, runtime, or replacement for ASBE. It is an upstream production tool that converts a rights-cleared screenplay into structured scenes, characters, locations, props, production elements, shot lists, project-look fields, style guidance, and generator-ready prompt packs.

## Grid placement

```text
rights-cleared screenplay
  -> ScriptBreak desktop app
  -> saved .scriptbreak project
  -> ScriptBreak read-only MCP
  -> AGENTROPOLIS-AGENT-MCP policy gate
  -> scriptbreak-screenplay-intake skill
  -> AGENTROPOLIS-CREATOR normalized production packet
  -> ASBE / PBX / Storyboard / Previs / Gaming / 789 / NTRU-OTT / 33.3FM
  -> human review
  -> execution receipt
```

ScriptBreak extracts production intelligence. CREATOR normalizes and governs the handoff. ASBE decides how approved packets move through production.

## Supported upstream tools

The upstream MCP currently exposes these read-only capabilities:

- `get_breakdown`
- `list_scenes`
- `get_scene`
- `list_elements`
- `get_character_bible`
- `get_location_bible`
- `get_shot_list`
- `list_generators`
- `export_prompt_pack`

The MCP reads an already-saved project. It does not parse raw scripts, mutate the project, open network connections, render media, or publish output.

## Creator-owned normalization contract

CREATOR must translate upstream responses into a provider-neutral packet before any district consumes them.

```yaml
packet_type: creator.screenplay_intelligence
source:
  provider: wassermanproductions/scriptbreak
  project_path_ref: local-secret-reference
  project_checksum: required
  project_version: required
  imported_at: required
rights:
  screenplay_status: owned | licensed | public_domain | permission_verified | unknown
  adaptation_scope: required
  release_restrictions: []
project:
  title: ""
  draft: ""
  page_count: 0
  look: {}
  style_guide: {}
scenes: []
characters: []
locations: []
props: []
production_elements: []
shots: []
upstream_prompt_packs: []
normalization:
  inferred_fields: []
  rejected_fields: []
  schema_warnings: []
governance:
  read_only_source: true
  require_human_review: true
  public_release_allowed: false
  receipt_required: true
```

The local file path must remain a secret reference. Do not place an operator's absolute filesystem path in public logs, prompts, issues, or receipts.

## District and application handoffs

| Consumer | Approved use | Authority boundary |
| --- | --- | --- |
| **ASBE / PBX** | Normalize scripts, scenes, shots, assets, studio jobs, and distribution queues | ASBE schemas remain authoritative after validation |
| **AGENTROPOLIS-DIRECTOR** | Seed expected scene, character, shot, and cue maps for recorded-media comparison | Confirmed transcript and media evidence remain authoritative |
| **Gaming District** | Convert approved scenes into quests, cutscenes, NPC briefs, world events, cinematics, and gameplay-to-episode plans | No player state, reward, balance, or mission settlement may be imported from ScriptBreak |
| **789 STUDIOS** | Children's animation breakdowns, storyboards, animatics, character/location continuity, and production packets | 789 remains cartoons and children's programming only |
| **NTRU-OTT** | Adult-faction episodes and gameplay-produced narrative packages | NTRU-OTT classification and release controls remain mandatory |
| **33.3FM** | Derive score-cue requests, theme notes, scene timing, voice requirements, and broadcast-production briefs | Script text and private project data do not become public radio copy automatically |
| **Storyboard / Previs lanes** | Generate scoped visual prompt packs and coverage plans | Provider execution still requires adapter approval and media-diff review |

## Workflow

1. Verify the operator owns or is authorized to process the screenplay.
2. Process the screenplay inside the local ScriptBreak desktop app.
3. Save a `.scriptbreak` project file.
4. Pin the approved local project through `SCRIPTBREAK_PROJECT` or a tool-call path reference.
5. Call `get_breakdown` first.
6. Select only the scenes, pages, characters, locations, elements, or shots required by the mandate.
7. Normalize the result into `creator.screenplay_intelligence`.
8. Record inferred values, omissions, rights state, source checksum, and schema warnings.
9. Route the packet through AGENTROPOLIS-AGENT-MCP.
10. Require human review before rendering, publication, game integration, or distribution.

## Guardrails

- Do not fork or silently copy ScriptBreak source code.
- Preserve Apache-2.0 license and Sam Wasserman / Wasserman Productions attribution.
- Do not imply sponsorship, partnership, or endorsement.
- Do not expose the MCP beyond the local stdio process boundary.
- Do not upload private scripts merely because a downstream model can accept them.
- Do not pass an entire screenplay when a scoped scene or metadata query is sufficient.
- Do not treat auto-tagged elements, bibles, shots, or prompt packs as verified production truth without review.
- Do not write back to the `.scriptbreak` project through an Agentropolis adapter.
- Do not publish generated media without rights verification, continuity review, media diff, and a receipt.
- Do not collapse children's 789 programming and adult NTRU-OTT routing into one release lane.

## Attribution

ScriptBreak is created by **Sam Wasserman / Wasserman Productions** and remains an external upstream project. Agentropolis integrates its exported data and read-only MCP surface while preserving upstream authorship and license requirements.
