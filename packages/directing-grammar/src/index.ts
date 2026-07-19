export const DIRECTING_CHANNELS = [
  'dialogue',
  'blocking',
  'framing',
  'camera_movement',
  'performance',
  'sound_design',
  'music',
  'silence',
  'editing',
  'production_design',
] as const;

export type DirectingChannel = (typeof DIRECTING_CHANNELS)[number];

export interface DirectingAudioLayer {
  present: boolean;
  purpose: string;
  content?: string;
}

export interface DirectingSilenceLayer {
  present: boolean;
  purpose: string;
  placement?: string;
  durationSeconds?: number;
}

export interface DirectingGrammar {
  focalCharacterId: string;
  objective: string;
  obstacle: string;
  conflict: string;
  objectiveChannel: DirectingChannel;
  obstacleChannel: DirectingChannel;
  blocking: string;
  framing: string;
  cameraBehavior: string;
  performance: string;
  dialogue: DirectingAudioLayer;
  soundDesign: DirectingAudioLayer;
  music: DirectingAudioLayer;
  silence: DirectingSilenceLayer;
  editRhythm: string;
  productionDesign: string;
  subtext: string;
}

export interface DirectingValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

const hasText = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export function validateDirectingGrammar(
  grammar: DirectingGrammar,
): DirectingValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!hasText(grammar.focalCharacterId)) {
    errors.push('A focal character is required.');
  }

  if (!hasText(grammar.objective)) {
    errors.push('The focal character must have one clear, playable objective.');
  }

  if (!hasText(grammar.obstacle)) {
    errors.push('The scene must contain one clear, active obstacle.');
  }

  if (!hasText(grammar.conflict)) {
    errors.push('The collision between objective and obstacle must be stated.');
  }

  if (grammar.objectiveChannel === grammar.obstacleChannel) {
    errors.push(
      'Objective and obstacle cannot be communicated through the same primary directing channel.',
    );
  }

  const nonDialogueNarrative = [
    grammar.blocking,
    grammar.framing,
    grammar.cameraBehavior,
    grammar.performance,
    grammar.soundDesign.purpose,
    grammar.music.purpose,
    grammar.silence.purpose,
    grammar.editRhythm,
    grammar.productionDesign,
  ].some(hasText);

  if (!nonDialogueNarrative) {
    errors.push(
      'Dialogue cannot carry the entire scene. At least one non-dialogue directing instrument must carry narrative information.',
    );
  }

  if (!hasText(grammar.blocking)) {
    errors.push('Blocking must have a declared narrative purpose.');
  }

  if (!hasText(grammar.framing)) {
    errors.push('Framing must have a declared narrative purpose.');
  }

  if (!hasText(grammar.cameraBehavior)) {
    errors.push('Camera behavior must be motivated by story, not decoration.');
  }

  if (!hasText(grammar.dialogue.purpose)) {
    errors.push('Dialogue must declare what it contributes or why it is absent.');
  }

  if (!hasText(grammar.soundDesign.purpose)) {
    errors.push('Sound design must declare what it contributes or why it is absent.');
  }

  if (!hasText(grammar.music.purpose)) {
    errors.push('Music must declare what it contributes or why it is absent.');
  }

  if (!hasText(grammar.silence.purpose)) {
    errors.push('Silence must be considered deliberately, even when it is not used.');
  }

  if (!grammar.silence.present && grammar.silence.durationSeconds) {
    warnings.push('Silence duration is set although silence is marked absent.');
  }

  if (grammar.dialogue.present && !hasText(grammar.dialogue.content)) {
    warnings.push('Dialogue is marked present but no dialogue content is attached.');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function assertDirectingGrammar(grammar: DirectingGrammar): void {
  const result = validateDirectingGrammar(grammar);

  if (!result.valid) {
    throw new Error(`Directing grammar rejected: ${result.errors.join(' ')}`);
  }
}

export function formatDirectingGrammarForPrompt(
  grammar: DirectingGrammar,
): string {
  assertDirectingGrammar(grammar);

  return [
    `FOCAL CHARACTER: ${grammar.focalCharacterId}`,
    `OBJECTIVE: ${grammar.objective}`,
    `OBSTACLE: ${grammar.obstacle}`,
    `CONFLICT: ${grammar.conflict}`,
    `OBJECTIVE CHANNEL: ${grammar.objectiveChannel}`,
    `OBSTACLE CHANNEL: ${grammar.obstacleChannel}`,
    `BLOCKING: ${grammar.blocking}`,
    `FRAMING: ${grammar.framing}`,
    `CAMERA BEHAVIOR: ${grammar.cameraBehavior}`,
    `PERFORMANCE: ${grammar.performance}`,
    `DIALOGUE FUNCTION: ${grammar.dialogue.purpose}`,
    `SOUND FUNCTION: ${grammar.soundDesign.purpose}`,
    `MUSIC FUNCTION: ${grammar.music.purpose}`,
    `SILENCE: ${grammar.silence.present ? 'used' : 'not used'}; ${grammar.silence.purpose}`,
    `EDIT RHYTHM: ${grammar.editRhythm}`,
    `PRODUCTION DESIGN: ${grammar.productionDesign}`,
    `SUBTEXT: ${grammar.subtext}`,
    'RULE: Do not make dialogue, blocking, framing, camera, sound, music, editing, performance, production design, and silence repeat the same information. Each chosen instrument must perform a distinct narrative job.',
  ].join('\n');
}
