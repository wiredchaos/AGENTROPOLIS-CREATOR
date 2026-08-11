import { requireValue } from './types.js';

export function runDirectorQa(compiled) {
  const required = [
    'SCENE CONTEXT', 'ACTIVE REFERENCES', 'LOCATION MAP',
    'FIRST FRAME AND SPATIAL BLOCKING', 'FORMAT MODE', 'OPTICS', 'CAMERA',
    'ACTION TIMING', 'PHYSICS', 'LIGHTING', 'AUDIO', 'POSITIVE CONSTRAINTS',
  ];
  for (const section of required) requireValue(Object.hasOwn(compiled, section), 'OUTPUT_SECTION', `Missing ${section}.`);
  requireValue(compiled.generation_fallback === 'PROHIBITED', 'GENERATION_FALLBACK', 'Generation fallback must be prohibited.');
  return { pass: true, checks: required };
}
