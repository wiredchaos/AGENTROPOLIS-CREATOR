import { describe, expect, it } from 'vitest';
import {
  assertDirectingGrammar,
  validateDirectingGrammar,
  type DirectingGrammar,
} from './index';

const validGrammar: DirectingGrammar = {
  focalCharacterId: 'character_01',
  objective: 'Reach the door before the guard turns around.',
  obstacle: 'The guard controls the only visible exit.',
  conflict: 'The character must cross the guarded space without revealing intent.',
  objectiveChannel: 'blocking',
  obstacleChannel: 'framing',
  blocking: 'The character advances only when the guard looks away.',
  framing: 'The guard remains foregrounded between the character and the exit.',
  cameraBehavior: 'A restrained lateral track preserves the spatial problem.',
  performance: 'The character suppresses urgency and avoids looking at the door.',
  dialogue: { present: false, purpose: 'Absence of speech protects the deception.' },
  soundDesign: { present: true, purpose: 'Footsteps expose every attempted movement.' },
  music: { present: false, purpose: 'No score; environmental sound owns the tension.' },
  silence: {
    present: true,
    purpose: 'A hard silence lands when the guard nearly turns.',
    placement: 'Immediately before the final crossing.',
    durationSeconds: 1.5,
  },
  editRhythm: 'Long holds interrupted by one decisive cut.',
  productionDesign: 'The exit light visually marks the objective.',
  subtext: 'Appearing calm is the only way to escape.',
};

describe('directing grammar', () => {
  it('accepts a scene that distributes narrative work across distinct channels', () => {
    expect(validateDirectingGrammar(validGrammar)).toEqual({
      valid: true,
      errors: [],
      warnings: [],
    });
    expect(() => assertDirectingGrammar(validGrammar)).not.toThrow();
  });

  it('rejects objective and obstacle expressed through the same primary channel', () => {
    const result = validateDirectingGrammar({
      ...validGrammar,
      obstacleChannel: validGrammar.objectiveChannel,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toContain('cannot be communicated through the same');
  });

  it('rejects a dialogue-only scene', () => {
    const result = validateDirectingGrammar({
      ...validGrammar,
      blocking: '',
      framing: '',
      cameraBehavior: '',
      performance: '',
      soundDesign: { present: false, purpose: '' },
      music: { present: false, purpose: '' },
      silence: { present: false, purpose: '' },
      editRhythm: '',
      productionDesign: '',
      dialogue: {
        present: true,
        purpose: 'Dialogue explains the objective and obstacle.',
        content: 'I need the door, but the guard is blocking it.',
      },
    });

    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toContain('Dialogue cannot carry the entire scene');
  });
});
