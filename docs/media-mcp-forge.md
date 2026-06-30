# Media MCP Forge

The **Media MCP Forge** extends AGENTROPOLIS-CREATOR beyond static 3D assets into AI-native media execution.

The purpose is to connect video, image, motion, audio, narration, dubbing, and scene-editing tools into the same governed MCP pipeline as the 3D World Forge.

## Core Thesis

Higgsfield-style MCP media layers, Gemini Omni Flash-style video editing models, Seed Audio-style voice models, HeyGen-style avatar systems, xAI Imagine-style generation, and browser-based creative tools are becoming programmable production surfaces.

The opportunity is not one media model.

The opportunity is a vendor-agnostic creator operating system where agents can route tasks across media tools, verify outputs, and package reusable assets for Agentropolis worlds.

## Stack Position

```text
AGENTROPOLIS-CREATOR
  3D MCP Agent Kit
  Procedural World Forge
  Human + Crowd Stack
  Media MCP Forge
    Video Forge
    Motion Forge
    Audio Forge
    Dialogue Forge
    Localization Forge
    Avatar Forge
    Render Review Gate
```

## Reference Flow

```text
Scene Brief / Prompt / Script / World State
-> Hermes Planner
-> NemoClaw Builder
-> MCP Router
-> Media Adapter
   -> Higgsfield-style MCP
   -> Gemini Omni Flash-style video layer
   -> Seed Audio-style voice layer
   -> HeyGen-style avatar layer
   -> xAI Imagine-style visual layer
   -> Browser Use creative workflows
-> Media Diff Preview
-> Verifier Agent
-> Human Approval
-> Export Package
-> Memory Writeback
```

## Media Agents

### VideoForge Agent
Creates cinematic clips, product demos, district trailers, briefing scenes, social video, and world previews.

Duties:

- scene prompt planning
- shot list creation
- frame consistency checks
- text consistency checks
- render variant generation
- social export packaging

### MotionForge Agent
Designs movement language for characters, crowds, cameras, and product moments.

Duties:

- camera path planning
- character motion notes
- crowd motion prompts
- timing beats
- transition planning
- motion reference metadata

### AudioForge Agent
Creates narration, NPC dialogue, ambience, and dubbing.

Duties:

- narrator scripts
- voice selection metadata
- safety checks for voice likeness
- multilingual dubbing plan
- caption file generation
- audio export notes

### AvatarForge Agent
Connects avatar/video presenter systems to Agentropolis characters.

Duties:

- host avatar briefs
- presenter scripts
- outfit and identity constraints
- background scene constraints
- voice and caption alignment

### Localization Agent
Creates multilingual versions of media assets.

Duties:

- translation brief
- tone preservation
- subtitle generation
- dubbing notes
- language QA checklist

### RenderVerifier Agent
Checks media output before publication or world insertion.

Duties:

- text legibility
- continuity
- brand palette
- character canon
- missing frames
- audio sync
- likeness risks
- export format checks

## Media Diff Preview

Before running or publishing media generation, the system should create an approval packet.

```json
{
  "run_id": "media_forge_0001",
  "requested_by": "agent_or_user",
  "media_type": "video",
  "district": "creator",
  "tools": ["higgsfield_mcp", "seed_audio"],
  "estimated_cost": "low_or_external",
  "assets_used": [],
  "scripts_used": [],
  "voice_likeness_risks": [],
  "license_risks": [],
  "approval_required": true
}
```

## Export Targets

| Target | Use |
| --- | --- |
| MP4 | social video, demos, trailers |
| WebM | browser-native video use |
| WAV / MP3 | narration, NPC voice, ambience |
| SRT / VTT | captions and localization |
| PNG / JPG | thumbnails and stills |
| GLB-linked metadata | connect videos/audio to 3D world objects |
| JSON sidecar | store prompts, tools, costs, rights, and approvals |

## Integration With 3D World Forge

The Media MCP Forge should be able to consume outputs from the World Forge.

Example:

```text
HY-World or Blender scene
-> Mission Control room preview
-> VideoForge creates cinematic briefing clip
-> AudioForge creates narration
-> Localization Agent creates subtitles
-> RenderVerifier checks quality
-> Export package attaches to Mission Control scene metadata
```

## Hard Rules

- No voice cloning without rights or explicit permission.
- No celebrity likeness generation without rights.
- No unverified publication.
- No media export without prompt and tool metadata.
- No final upload without human approval.
- No unclear-license source material.
- No uncontrolled recursive render loops.

## First Prototype

Build a media package for **Mission Control**:

```text
1. 15-second Mission Control cinematic prompt
2. NEURO narrator script
3. NPC operator dialogue sample
4. Caption file template
5. Media metadata sidecar
6. Render verification checklist
```

## Strategic Position

AGENTROPOLIS-CREATOR is becoming the place where agents build not just worlds, but the media layers that make those worlds explainable, cinematic, social, and alive.
