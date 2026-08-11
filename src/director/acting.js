import { requireValue } from './types.js';
import { PRODUCTION_CONTRACT_VERSION } from '../production-contract.js';

const REQUIRED_PERFORMANCE_FIELDS = [
  'character_id', 'objective', 'obstacle', 'stakes', 'tactics', 'beats',
  'subtext', 'business', 'proxemics', 'status', 'eye_life', 'reaction_timing',
  'physical_state', 'scene_specific_behavior',
];

export function compileActing(input, context) {
  const masterProfiles = structuredClone(input.master_acting_profiles ?? []);
  const scenePerformances = structuredClone(input.scene_acting ?? []);
  const activeIds = new Set(context.active_characters.map(({ id }) => id));
  const seen = new Set();
  const rhythms = new Set();
  const syncMode = input.ensemble_sync_mode ?? 'NATURAL_STAGGER';
  requireValue(['NATURAL_STAGGER', 'CHOREOGRAPHED_UNISON'].includes(syncMode), 'ENSEMBLE_SYNC_MODE', `Unsupported ensemble sync mode ${syncMode}.`);
  const syncAuthorization = input.ensemble_sync_authorization ?? null;
  if (syncMode === 'CHOREOGRAPHED_UNISON') {
    requireValue(typeof syncAuthorization?.reason === 'string' && syncAuthorization.reason.trim().length > 0, 'ENSEMBLE_SYNC_AUTHORIZATION', 'Choreographed unison requires an authored reason.');
    requireValue(
      typeof syncAuthorization?.source?.kind === 'string' && syncAuthorization.source.kind.length > 0 &&
      typeof syncAuthorization?.source?.id === 'string' && syncAuthorization.source.id.length > 0,
      'ENSEMBLE_SYNC_AUTHORIZATION',
      'Choreographed unison requires a structured authored source with kind and id.',
    );
  } else {
    requireValue(syncAuthorization === null, 'ENSEMBLE_SYNC_AUTHORIZATION', 'Natural stagger must not carry an unison authorization.');
  }

  const masterIds = new Set();
  for (const profile of masterProfiles) {
    requireValue(profile.production_contract_version === PRODUCTION_CONTRACT_VERSION, 'PRODUCTION_CONTRACT_VERSION', `Master acting profile must use ${PRODUCTION_CONTRACT_VERSION}.`);
    for (const field of ['character_id', 'acting_profile', 'acting_version', 'source', 'review_state']) {
      requireValue(Object.hasOwn(profile, field), 'ACTING_MASTER_PROFILE', `${field} is required for a master acting profile.`);
    }
    requireValue(!masterIds.has(profile.character_id), 'ACTING_MASTER_PROFILE', `Duplicate master acting profile for ${profile.character_id}.`);
    requireValue(['APPROVED', 'REQUIRES_REVIEW'].includes(profile.review_state), 'ACTING_MASTER_PROFILE', `Invalid acting review state for ${profile.character_id}.`);
    masterIds.add(profile.character_id);
  }

  for (const performance of scenePerformances) {
    requireValue(performance.production_contract_version === PRODUCTION_CONTRACT_VERSION, 'PRODUCTION_CONTRACT_VERSION', `Scene acting must use ${PRODUCTION_CONTRACT_VERSION}.`);
    for (const field of REQUIRED_PERFORMANCE_FIELDS) {
      requireValue(Object.hasOwn(performance, field), 'ACTING_CONTRACT', `${field} is required for scene acting.`);
    }
    requireValue(activeIds.has(performance.character_id), 'ACTING_INACTIVE_CHARACTER', `Acting targets inactive ${performance.character_id}.`);
    requireValue(!seen.has(performance.character_id), 'ACTING_DUPLICATE', `Duplicate scene acting for ${performance.character_id}.`);
    seen.add(performance.character_id);
    for (const forbidden of ['voice_profile', 'voice_version', 'voice_override']) {
      requireValue(!Object.hasOwn(performance, forbidden), 'VOICE_IDENTITY_MUTATION', `Scene acting cannot contain ${forbidden}.`);
    }
    const rhythmId = performance.reaction_timing?.rhythm_id;
    requireValue(typeof rhythmId === 'string' && rhythmId, 'REACTION_RHYTHM', `${performance.character_id} needs a reaction rhythm.`);
    if (syncMode === 'NATURAL_STAGGER') {
      requireValue(!rhythms.has(rhythmId), 'ENSEMBLE_REACTION_SYNC', `Ensemble reaction rhythm ${rhythmId} is duplicated.`);
    }
    rhythms.add(rhythmId);
  }

  return {
    ensemble_sync_mode: syncMode,
    ensemble_sync_authorization: structuredClone(syncAuthorization),
    master_profiles: masterProfiles,
    scene_performances: scenePerformances,
  };
}

export function assertActingProfileImmutable(master, candidate) {
  for (const key of ['character_id', 'acting_profile', 'acting_version', 'source']) {
    requireValue(
      JSON.stringify(master[key]) === JSON.stringify(candidate[key]),
      'ACTING_PROFILE_MUTATION',
      `Scene data cannot change master acting field ${key} for ${master.character_id}.`,
    );
  }
  return true;
}

export function assertInnerLinesAreMotivationOnly(acting, input) {
  const exposed = JSON.stringify({
    audio: input.audio,
    dialogue: input.dialogue,
    subtitles: input.subtitles,
    captions: input.captions,
  });
  for (const performance of acting.scene_performances) {
    if (!performance.inner_line) continue;
    requireValue(
      !exposed.includes(performance.inner_line),
      'INNER_LINE_LEAKAGE',
      `inner_line for ${performance.character_id} leaked into audible or visible text.`,
    );
  }
}
