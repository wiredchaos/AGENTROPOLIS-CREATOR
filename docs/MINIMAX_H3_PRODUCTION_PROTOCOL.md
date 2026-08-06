# MiniMax H3 Production Protocol

**Status:** Adopted
**Canonical dialect source:** `wiredchaos/AGENTROPOLIS-ATG/protocols/minimax-h3.yaml`
**Creator responsibility:** Compile creator intent into a provider-neutral AGENTROPOLIS Production Program, then emit a MiniMax H3 Context-IR execution packet when H3 is selected.

## Creator Contract

CREATOR must capture:

- generation mode: T2VA, I2VA, FL2VA, L2VA, Ref2VA, or Edit
- asset-role ledger for every image, video, audio file, subject, annotation, style, motion, and composition source
- subject definitions and identity locks
- shot order and increasing timestamps
- action and motion-path instructions
- camera type, direction, speed, amplitude, target, start framing, and end framing
- persistent speaker IDs and exact dialogue blocks
- synchronized diegetic audio, overall soundscape, and non-diegetic music
- retention rules, exclusion rules, reconstruction rules, and output constraints
- validation thresholds and bounded repair policy

## H3 Dialect Mapping

```text
visual timeline       -> integrated_multimodal_description
ambient/Foley layer   -> overall_soundscape
score                  -> non_diegetic_music
subjects               -> subject_definitions
preservation analysis  -> retention_analysis
shots                  -> [Shot N]
temporal events        -> At 00:00.000
assets                 -> <Picture N>, <Video N>, <Audio N>, <Subject N>
dialogue               -> persistent speaker IDs + <d> blocks
```

## Required Compilation Chain

```text
creator request
  -> rights and provenance intake
  -> Creator Prompt Contract
  -> canonical Production Program
  -> route selection
  -> MiniMax H3 dialect compile when selected
  -> AGENTROPOLIS-AGENT-MCP execution packet
  -> media diff
  -> repair proposal
  -> human approval
  -> receipt
```

## Annotation-to-Motion Protocol

Annotations are temporary control metadata, never final-scene content.

The compiler must state:

1. which asset contains the annotation
2. what motion property it controls
3. what underlying appearance source remains authoritative
4. that the annotation must be completely removed
5. that no glow, trail, particle, shadow, or replacement object may survive
6. that trajectory, timing, body mechanics, and camera behavior must remain preserved

## Thermodynamic Checks

CREATOR emits measurements or QA requests for:

- identity entropy
- motion entropy
- timeline entropy
- camera entropy
- reference conflict entropy
- instruction ambiguity
- exclusion leakage
- vendor translation loss

MiniMax H3 is a supported rendering dialect, not the sovereign production language. The provider-neutral AGENTROPOLIS Production Program remains canonical.
