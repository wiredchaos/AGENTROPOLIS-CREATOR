# Asset Source Registry

Track every human, pet, companion, clothing, motion, texture, and crowd asset source before it enters Agentropolis Creator.

## Source Status Codes

| Code | Meaning |
| --- | --- |
| VERIFIED | License checked and safe for intended use. |
| ATTRIBUTION | Allowed, but attribution is required. |
| INTERNAL_ONLY | Safe for private prototype only. Do not distribute. |
| BLOCKED | Do not use. License, origin, likeness, or trademark risk. |
| UNKNOWN | Not cleared yet. Treat as blocked until reviewed. |

## Preferred Source Types

| Source type | Use case | Notes |
| --- | --- | --- |
| Blender-generated | Hero characters, NPCs, scene extras | Best for clean ownership. |
| MB-Lab-generated | Hero and stylized humans | Check generated asset license before distribution. |
| MakeHuman-generated | Human base meshes | MakeHuman exports may have permissive exceptions, but still document exact version/source. |
| MPFB2-generated | Blender-native MakeHuman workflow | Good for repeatable generation. |
| CC0 assets | Pets, props, background pieces | Best external asset class. |
| CC-BY assets | Pets, props, clothing, textures | Keep attribution file. |
| GPL add-ons | Blender tooling | Code license does not automatically clear asset output. Verify separately. |

## Asset Entry Template

```markdown
## Asset Name

- Asset ID:
- Asset Type:
- Source Tool or URL:
- Author:
- License:
- Commercial Use Allowed: yes/no/unknown
- Attribution Required: yes/no/unknown
- Distribution Allowed: yes/no/unknown
- Status: VERIFIED / ATTRIBUTION / INTERNAL_ONLY / BLOCKED / UNKNOWN
- District:
- Tags:
- Notes:
```

## Blocked Asset Rules

Block assets when any of the following are true:

- license is unclear
- source looks ripped from a game, movie, or commercial pack
- asset uses a celebrity likeness without clearance
- asset includes protected brand marks or uniforms
- creator says personal use only
- attribution cannot be preserved
- redistribution is forbidden

## Attribution File Pattern

When attribution is required, add a plain text or markdown file near the asset metadata:

```text
Asset: Example Dog Companion
Author: Example Artist
Source: source URL
License: CC-BY 4.0
Changes: rig cleanup, material simplification, GLB export
Used in: Agentropolis Creator prototype scenes
```

## Repo Policy

Large binary assets should use Git LFS or external storage.

Keep this registry in version control even if the assets themselves live elsewhere.
