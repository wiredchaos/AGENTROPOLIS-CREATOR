# NETERU APINAYA Creator Bridge

## Role

AGENTROPOLIS-CREATOR is the governed production foundry for NETERU APINAYA media. It does not own the canon or audience application. It converts approved NETERU canon records into production-ready assets and packages.

## Inputs

- canon scene or chapter ID
- property and volume metadata
- approved characters and visual references
- audience classification
- target format
- exact copy and dialogue locks
- rights and provenance references
- production mandate ID

## Supported outputs

- ebook EPUB and PDF packages
- graphic novel issues, pages and panels
- NTRUtv scripts, storyboards, shot lists and episode packages
- NTRU-OTT masters, trailers, captions and metadata
- FRACTURE cinematics, dialogue packets and promotional replays
- audiobook and serialized audio packages
- social-safe derivative assets

## Production contract

```text
NETERU canon record
  -> validate reference locks
  -> compile Creator Prompt Contract
  -> select approved model and tool lanes through MCP
  -> generate draft asset
  -> media diff and continuity validation
  -> human approval
  -> package for Entertainment, Gaming or GTM
  -> receipt
```

## Canon protections

- Creator agents may adapt presentation but may not silently rewrite canon.
- Character identity, relationships, chronology and locked dialogue require explicit change approval.
- Every generated asset must retain source scene IDs and provenance.
- Mature NETERU assets route through NTRU Studios and NTRU-OTT, never 789 Studios.
- Promotional derivatives require separate distribution approval.

## Required package envelope

```json
{
  "packageId": "uuid",
  "propertyId": "neteru-apinaya",
  "sourceCanonIds": ["scene-id"],
  "target": "ntru.tv.episode",
  "audienceClass": "mature",
  "mandateId": "uuid",
  "assets": [],
  "continuityReport": {},
  "rightsReport": {},
  "approvalStatus": "pending",
  "receiptId": null
}
```
