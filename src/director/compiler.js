import { compileBlocking } from './blocking.js';
import { compileActing, assertInnerLinesAreMotivationOnly } from './acting.js';
import { compileAudio } from './audio.js';
import { compileContinuity } from './continuity.js';
import { compileLighting } from './lighting.js';
import { compileOptics } from './optics.js';
import { compilePhysics } from './physics.js';
import { runDirectorQa } from './qa.js';
import { formatSceneContext, isolateShotContext } from './shot-context.js';
import { compileTiming } from './timing.js';
import { compileShotSpec } from './shot-spec.js';
import { DEFAULT_PRODUCTION_POLICY, DIRECTOR_GRAMMAR, DIRECTOR_VERSION } from './types.js';
import { compileVoice } from './voice.js';
import { PRODUCTION_CONTRACT_VERSION } from '../production-contract.js';

function mergePolicy(overrides = {}) {
  return {
    optics: {
      ...DEFAULT_PRODUCTION_POLICY.optics,
      ...(overrides.optics ?? {}),
      profiles: { ...DEFAULT_PRODUCTION_POLICY.optics.profiles, ...(overrides.optics?.profiles ?? {}) },
      behavior: { ...DEFAULT_PRODUCTION_POLICY.optics.behavior, ...(overrides.optics?.behavior ?? {}) },
    },
    timing: { ...DEFAULT_PRODUCTION_POLICY.timing, ...(overrides.timing ?? {}) },
    physics: { ...DEFAULT_PRODUCTION_POLICY.physics, ...(overrides.physics ?? {}) },
  };
}

/** Compile matcher-selected existing assets into direction. No selection or generation occurs here. */
export function compileDirection(input, options = {}) {
  const context = isolateShotContext(input);
  const policy = mergePolicy(options.productionPolicy);
  const blocking = compileBlocking(input, context);
  const timing = compileTiming(input, policy);
  const optics = compileOptics(input, policy);
  const lighting = compileLighting(input);
  const voice = compileVoice(input, context);
  const acting = compileActing(input, context);
  assertInnerLinesAreMotivationOnly(acting, input);
  const audio = compileAudio(input, context, timing.dialogue);
  const continuity = compileContinuity(input, { context, blocking, timing, lighting, audio });
  const compiled = {
    director_grammar: DIRECTOR_GRAMMAR,
    director_version: DIRECTOR_VERSION,
    production_contract_version: PRODUCTION_CONTRACT_VERSION,
    generation_fallback: 'PROHIBITED',
    'SCENE CONTEXT': formatSceneContext(context),
    'ACTIVE REFERENCES': context.active_references,
    'LOCATION MAP': blocking.location_map,
    'FIRST FRAME AND SPATIAL BLOCKING': blocking.first_frame_and_spatial_blocking,
    'FORMAT MODE': timing.format_mode,
    OPTICS: optics,
    CAMERA: structuredClone(input.camera_mode),
    'ACTION TIMING': timing.action_timing,
    PHYSICS: compilePhysics(input, policy),
    LIGHTING: lighting,
    AUDIO: audio,
    VOICE: voice,
    ACTING: acting,
    'POSITIVE CONSTRAINTS': {
      continuity,
      constraints: structuredClone(input.positive_constraints ?? []),
    },
  };
  compiled.shot_spec = compileShotSpec(input, {
    production_contract_version: PRODUCTION_CONTRACT_VERSION,
    context, blocking, timing, optics, lighting, audio, continuity, acting, voice,
  });
  compiled.qa = runDirectorQa(compiled);
  return compiled;
}
