import { requireValue } from './types.js';

export function compileAudio(input, context, dialogue) {
  const audio = structuredClone(input.audio ?? {});
  const owner = input.lip_sync_owner ?? audio.lip_sync_owner ?? null;
  const audibleOwner = audio.all_audible_words_owned_by ?? owner;
  const activeIds = new Set(context.active_characters.map(({ id }) => id));

  if (owner !== null) requireValue(activeIds.has(owner), 'LIP_SYNC_OWNERSHIP', `Lip-sync owner ${owner} is not active.`);
  if (audibleOwner !== null) requireValue(activeIds.has(audibleOwner), 'AUDIO_OWNERSHIP', `Audible-word owner ${audibleOwner} is not active.`);
  for (const line of dialogue) {
    if (owner !== null) requireValue(line.speaker_id === owner, 'LIP_SYNC_OWNERSHIP', `${line.speaker_id} cannot lip-sync words owned by ${owner}.`);
    if (audibleOwner !== null) requireValue(line.speaker_id === audibleOwner, 'AUDIO_OWNERSHIP', `${line.speaker_id} cannot reproduce words owned by ${audibleOwner}.`);
  }

  return {
    ...audio,
    dialogue,
    lip_sync_owner: owner,
    all_audible_words_owned_by: audibleOwner,
  };
}
