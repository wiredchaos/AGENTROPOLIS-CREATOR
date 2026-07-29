# Hermes Streaming TTS Adoption — AGENTROPOLIS CREATOR

**Status:** Adopted architecture; implementation verification required  
**Canonical specification:** https://github.com/wiredchaos/agentropolis/blob/main/docs/HERMES_STREAMING_TTS.md

Creator uses the Voice Transit Layer for narration previews, dubbing, character voices, podcast production, and export monitoring.

Requirements: use provider adapters behind the Voice Gateway; begin speech only after a safe complete clause; preserve whole-file and text fallbacks; support interruption and cancel; keep vendor credentials outside prompts, clients, and media metadata; require approval before publishing or contacting third parties; retain source audio and transcripts only under project policy; disclose synthetic voices and prohibit unauthorized impersonation.

A feature is production-ready only after latency, fallback, interruption, consent, rights, and receipt tests pass.
