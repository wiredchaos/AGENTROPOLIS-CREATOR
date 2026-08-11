import { requireValue } from './types.js';

export function compilePhysics(input, policy) {
  const rules = input.physics ?? [];
  for (const movement of rules) {
    if (movement.distance_m !== undefined && movement.duration_seconds !== undefined) {
      const speed = movement.distance_m / movement.duration_seconds;
      const maximum = movement.maximum_speed_mps ?? policy.physics.default_max_character_speed_mps;
      requireValue(speed <= maximum, 'IMPOSSIBLE_MOVEMENT', `${movement.subject_id} requires ${speed.toFixed(2)}m/s, above ${maximum}m/s.`);
    }
    requireValue(movement.duration_seconds === undefined || movement.duration_seconds > 0, 'IMPOSSIBLE_MOVEMENT', 'Movement duration must be positive.');
  }
  return structuredClone(rules);
}
