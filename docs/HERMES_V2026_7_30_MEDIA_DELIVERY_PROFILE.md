# Hermes v2026.7.30 Creator Media Delivery Profile

**Runtime:** `NousResearch/hermes-agent@v2026.7.30`  
**Status:** CANARY

## Scope

This profile covers Hermes coordination of image, video, FLUX3, file attachment, and delivery workflows inside the Creator District.

Hermes may orchestrate production. AGENTROPOLIS-CREATOR owns project state, asset provenance, approval gates, publishing authority, and delivery receipts.

## Required workflow

```text
creative mandate
  -> asset plan
  -> approved model and tool lane
  -> generation
  -> artifact validation
  -> human or policy review
  -> approved destination
  -> delivery receipt
```

## Canary tests

- generation request survives normal session continuation;
- large attachment and media output remain associated with the correct project;
- retries do not create untracked duplicate assets or publications;
- failed delivery preserves the generated artifact and error evidence;
- filenames, MIME types, dimensions, and checksums are recorded;
- publishing destinations require explicit authority;
- private inputs and credentials are redacted from logs;
- FLUX3 and other provider failures degrade cleanly.

## Publishing rule

Successful generation is not successful publication. No asset may be posted, sent, minted, or distributed merely because Hermes produced it.