export const DIRECTOR_GRAMMAR = 'CINEDANCE_V4';
export const DIRECTOR_VERSION = '1.1.0';

export const DEFAULT_PRODUCTION_POLICY = Object.freeze({
  optics: {
    fov_tolerance_degrees: 2,
    profiles: {
      WIDE: { minimum_lens_mm: 18, maximum_lens_mm: 35 },
      NORMAL: { minimum_lens_mm: 36, maximum_lens_mm: 60 },
      TELEPHOTO: { minimum_lens_mm: 61, maximum_lens_mm: 200 },
    },
    behavior: {
      WIDE: { depth_behavior: 'DEEP_SPATIAL_CONTEXT', compression_behavior: 'PERSPECTIVE_EXPANSION' },
      NORMAL: { depth_behavior: 'NATURAL_DEPTH', compression_behavior: 'NATURAL_PERSPECTIVE' },
      TELEPHOTO: { depth_behavior: 'SHALLOW_ISOLATION', compression_behavior: 'BACKGROUND_COMPRESSION' },
    },
  },
  timing: { maximum_dialogue_words_per_second: 3.5 },
  physics: { default_max_character_speed_mps: 8 },
});

export class DirectorCompileError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = 'DirectorCompileError';
    this.code = code;
  }
}

export function requireValue(condition, code, message) {
  if (!condition) throw new DirectorCompileError(code, message);
}
