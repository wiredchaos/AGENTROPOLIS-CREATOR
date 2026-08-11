import { requireValue } from './types.js';

export function compileTiming(input, policy) {
  const mode = input.format_mode ?? {};
  requireValue(['SINGLE_TAKE', 'CONTROLLED_MULTI_SHOT'].includes(mode.mode), 'FORMAT_MODE', 'Unsupported format mode.');
  const cuts = mode.cut_times_seconds ?? [];
  requireValue(mode.mode !== 'SINGLE_TAKE' || cuts.length === 0, 'SINGLE_TAKE_CUT', 'A single take cannot contain cuts.');
  requireValue(mode.mode !== 'CONTROLLED_MULTI_SHOT' || cuts.length > 0, 'MULTI_SHOT_CUTS', 'Controlled multi-shot requires declared cuts.');
  for (const cut of cuts) requireValue(cut > 0 && cut < mode.duration_seconds, 'CUT_TIMING', `Cut ${cut}s is outside the take.`);

  const actions = input.action_timing ?? [];
  for (const action of actions) {
    requireValue(action.start_seconds >= 0 && action.end_seconds <= mode.duration_seconds && action.end_seconds > action.start_seconds, 'ACTION_TIMING', `Invalid action interval ${action.id}.`);
  }
  for (const line of input.dialogue ?? []) {
    requireValue(line.start_seconds >= 0 && line.end_seconds <= mode.duration_seconds && line.end_seconds > line.start_seconds, 'DIALOGUE_TIMING', `Dialogue for ${line.speaker_id} is outside the take.`);
    const wordCount = line.text.trim().split(/\s+/u).filter(Boolean).length;
    const rate = wordCount / (line.end_seconds - line.start_seconds);
    requireValue(rate <= policy.timing.maximum_dialogue_words_per_second, 'DIALOGUE_TIMING', `Dialogue for ${line.speaker_id} exceeds speaking-rate policy.`);
  }
  return { format_mode: structuredClone(mode), action_timing: structuredClone(actions), dialogue: structuredClone(input.dialogue ?? []) };
}
