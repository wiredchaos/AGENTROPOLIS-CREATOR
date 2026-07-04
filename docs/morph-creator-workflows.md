# Morph Creator Workflows

Morph is added as an optional provider lane for AGENTROPOLIS creator and build workflows.

## Use cases

Use Morph for:

- coding agent experiments
- code search
- code patch workflows
- lightweight prototype generation
- preview testing when deployed URLs exist

## Environment

Do not commit real credentials.

```bash
MORPH_API_KEY=replace_with_local_secret
MORPH_BASE_URL=https://api.morphllm.com/v1
```

## Creator policy

Morph can help generate and test creator assets, but it should not become the only model provider.

AGENTROPOLIS-CREATOR should keep provider choices modular and swappable.

## Routing notes

Prefer Morph when the workflow needs:

- fast code edits
- search assisted refactors
- low cost validation
- coding agent plugin support

Use a second provider or local review for final release decisions and governance docs.

## Credit stance

Use free and startup credits to validate workflows before paid scaling.
