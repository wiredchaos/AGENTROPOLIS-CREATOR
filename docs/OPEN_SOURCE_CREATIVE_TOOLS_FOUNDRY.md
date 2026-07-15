# Open Source Creative Tools Foundry

AGENTROPOLIS-CREATOR adopts three Apache-2.0 open-source applications as governed external Foundry capabilities:

- `wassermanproductions/blockout`
- `wassermanproductions/motion-previs-studio`
- `wassermanproductions/stem-studio`

These projects remain upstream-owned. Agentropolis does not silently fork, rebrand, or claim authorship. The Construction District provides Windows build automation, adapter contracts, governed execution, reproducible receipts, testing, and optional upstream contributions.

## Capability placement

| Tool | Creator lane | Foundry role | Primary outputs |
|---|---|---|---|
| Blockout | Previsualization | Stage scenes, block characters and cameras, prepare motion-reference packages | scene plans, camera paths, blocking exports, reference bundles |
| Motion Previs Studio | Motion intelligence | Extract pose, depth, camera and motion information from rights-cleared media | pose/depth maps, motion metadata, Blender/AI-video bundles |
| Stem Studio | Audio post-production | Separate rights-cleared mixed soundtracks into editable stems | dialogue, music and SFX WAVs; optional multitrack video |

## Grid route

```text
Creator mandate
  -> AGENTROPOLIS-CREATOR Foundry
  -> district agent kit
  -> AGENTROPOLIS-AGENT-MCP
  -> policy, rights and privacy gates
  -> local Windows workstation or approved compute runner
  -> Blockout | Motion Previs Studio | Stem Studio
  -> output manifest + hashes + logs
  -> media-diff / human review
  -> receipt -> Audit Ledger
```

## Non-negotiable controls

1. Rights-cleared inputs only.
2. Local-first execution by default.
3. No hidden repository, media or telemetry uploads.
4. Network access is denied unless declared in the tool manifest and approved for the run.
5. Every run records tool version, upstream commit, parameters, input hashes, output hashes and reviewer disposition.
6. Generated installers are unsigned until a trusted signing workflow is explicitly configured.
7. Upstream licenses and attribution ship with every packaged build.

## Adapter IDs

- `creator.blockout`
- `creator.motion_previs`
- `creator.stem_studio`

The executable adapters live behind AGENTROPOLIS-AGENT-MCP. CREATOR owns workflow design, presets, templates, evaluations and human-facing production surfaces.

## Windows enablement lane

The first implementation target is a reproducible Windows build and validation path:

1. Build upstream source at a pinned commit.
2. Run static checks and available tests.
3. Package Electron applications as NSIS installers and portable artifacts.
4. Execute clean-machine smoke tests.
5. Publish a software bill of materials, hashes and build receipt.
6. Send fixes upstream when they are generally useful.

## Agent Kit relationship

Each district receives an Agent Kit rather than direct unrestricted tool access. The Creator District kit binds roles, skills, MCP capabilities, policy profiles, memory scope, output contracts and receipt requirements into one installable package.

See `agent-kits/README.md` and `agent-kits/creator-construction/kit.yaml`.
