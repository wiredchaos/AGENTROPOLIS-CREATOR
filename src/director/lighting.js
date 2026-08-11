import { requireValue } from './types.js';

export function compileLighting(input) {
  const lighting = input.lighting ?? {};
  requireValue(Boolean(lighting.key_direction), 'LIGHTING_DIRECTION', 'A key-light direction is required.');
  for (const state of lighting.cut_states ?? []) {
    requireValue(state.key_direction === lighting.key_direction, 'LIGHTING_DIRECTION', `Cut ${state.cut_id} changes key-light direction.`);
  }
  return structuredClone(lighting);
}
