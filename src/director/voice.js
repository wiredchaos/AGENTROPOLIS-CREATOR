import { requireValue } from './types.js';
import { PRODUCTION_CONTRACT_VERSION } from '../production-contract.js';

export const PERFORMANCE_MODIFIERS = Object.freeze([
  'flat', 'tired', 'deadpan', 'angry', 'whispered', 'panicked',
]);

export function validateVoiceProfiles(profiles = []) {
  requireValue(Array.isArray(profiles), 'VOICE_PROFILE', 'voice_profiles must be an array.');
  const ids = new Set();
  return profiles.map((profile) => {
    requireValue(profile.production_contract_version === PRODUCTION_CONTRACT_VERSION, 'PRODUCTION_CONTRACT_VERSION', `Voice profile must use ${PRODUCTION_CONTRACT_VERSION}.`);
    requireValue(typeof profile.character_id === 'string' && profile.character_id, 'VOICE_PROFILE', 'character_id is required.');
    requireValue(!ids.has(profile.character_id), 'VOICE_PROFILE_DUPLICATE', `Duplicate voice profile for ${profile.character_id}.`);
    ids.add(profile.character_id);
    requireValue(typeof profile.voice_profile === 'string' && profile.voice_profile, 'VOICE_PROFILE', `Voice text is required for ${profile.character_id}.`);
    requireValue(typeof profile.voice_version === 'string' && profile.voice_version, 'VOICE_PROFILE', `Voice version is required for ${profile.character_id}.`);
    requireValue(profile.source !== undefined, 'VOICE_PROFILE', `Voice source is required for ${profile.character_id}.`);
    requireValue(['APPROVED', 'REQUIRES_REVIEW'].includes(profile.review_state), 'VOICE_PROFILE', `Invalid voice review state for ${profile.character_id}.`);
    return structuredClone(profile);
  });
}

export function assertVoiceIdentityImmutable(master, candidate) {
  for (const key of ['character_id', 'voice_profile', 'voice_version', 'source']) {
    requireValue(
      JSON.stringify(master[key]) === JSON.stringify(candidate[key]),
      'VOICE_IDENTITY_MUTATION',
      `Scene data cannot change permanent voice field ${key} for ${master.character_id}.`,
    );
  }
  return true;
}

export function compileVoice(input, context) {
  const profiles = validateVoiceProfiles(input.voice_profiles ?? []);
  const byCharacter = new Map(profiles.map((profile) => [profile.character_id, profile]));
  const modifiers = input.performance_modifiers ?? [];
  for (const modifier of modifiers) {
    requireValue(context.active_characters.some(({ id }) => id === modifier.character_id), 'PERFORMANCE_MODIFIER', `Modifier targets inactive ${modifier.character_id}.`);
    requireValue(PERFORMANCE_MODIFIERS.includes(modifier.modifier), 'PERFORMANCE_MODIFIER', `Unsupported modifier ${modifier.modifier}.`);
    for (const forbidden of ['voice_profile', 'voice_version', 'source']) {
      requireValue(!Object.hasOwn(modifier, forbidden), 'VOICE_IDENTITY_MUTATION', `Performance modifier cannot contain ${forbidden}.`);
    }
  }
  for (const line of input.dialogue ?? []) {
    requireValue(byCharacter.has(line.speaker_id), 'VOICE_PROFILE_MISSING', `Speaking character ${line.speaker_id} needs a permanent voice profile.`);
  }
  return {
    permanent_profiles: profiles,
    scene_performance_modifiers: structuredClone(modifiers),
  };
}
