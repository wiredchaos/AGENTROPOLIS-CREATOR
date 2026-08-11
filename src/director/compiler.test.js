import assert from 'node:assert/strict';
import test from 'node:test';
import { compileDirection } from './compiler.js';

export function validInput() {
  return {
    scene_id: 'SHOT_TRAINING_A',
    selected_asset_ids: ['asset-character-a', 'asset-character-b', 'asset-location'],
    active_characters: [
      { id: 'CHAR_A', label: 'Character A' },
      { id: 'CHAR_B', label: 'Character B' },
    ],
    active_references: [
      { tag: '@char_TEST_a_v1', version: 'v1', asset_id: 'asset-character-a', role: 'CHARACTER', subject_id: 'CHAR_A' },
      { tag: '@char_TEST_b_v1', version: 'v1', asset_id: 'asset-character-b', role: 'CHARACTER', subject_id: 'CHAR_B' },
      { tag: '@loc_TEST_training_hall_v1', version: 'v1', asset_id: 'asset-location', role: 'LOCATION' },
    ],
    location: { id: 'TRAINING_HALL', reference_tag: '@loc_TEST_training_hall_v1' },
    props: [{ id: 'TABLET', assigned_character_id: 'CHAR_B', required_hand: 'LEFT' }],
    vehicles: [],
    format_mode: { mode: 'SINGLE_TAKE', duration_seconds: 8, cut_times_seconds: [] },
    first_frame_requirements: { required_character_ids: ['CHAR_A', 'CHAR_B'] },
    spatial_blocking: {
      landmarks: [{ id: 'DOOR', maximum_proximity_m: 2 }],
      placements: [
        { subject_id: 'CHAR_A', at_seconds: 0, landmark_id: 'DOOR', distance_m: 1, screen_position: 'SCREEN_LEFT', world_position: { x_m: 0, y_m: 1 }, body_orientation: 'THREE_QUARTER_RIGHT', gaze_target: 'CHAR_B', held_props: [] },
        { subject_id: 'CHAR_B', at_seconds: 0, landmark_id: 'DOOR', distance_m: 1.5, screen_position: 'SCREEN_RIGHT', world_position: { x_m: 1, y_m: 1 }, body_orientation: 'THREE_QUARTER_LEFT', gaze_target: 'CHAR_A', held_props: [{ prop_id: 'TABLET', hand: 'LEFT' }] },
      ],
    },
    camera_mode: { mode: 'LOCKED_HANDHELD', axis: 'DOOR_SIDE', camera_side: 'DOOR_SIDE', camera_motion: 'OPERATOR_BREATH', focus_behavior: 'CHAR_A_TO_CHAR_B' },
    optics: { source_text: '40mm normal lens, approximately 48.46 degrees horizontal FOV', profile: 'NORMAL', lens_mm: 40, sensor_width_mm: 36, horizontal_fov_degrees: 48.46 },
    action_timing: [{ id: 'LOOK', start_seconds: 0, end_seconds: 4, action: 'CHAR_A looks to CHAR_B.' }],
    physics: [{ subject_id: 'CHAR_A', distance_m: 2, duration_seconds: 2, maximum_speed_mps: 3 }],
    lighting: { key_direction: 'CAMERA_LEFT', cut_states: [] },
    audio: { mode: 'DIEGETIC_ONLY', music: false, audio_reference: 'LOCAL_DIALOGUE_REFERENCE', all_audible_words_owned_by: 'CHAR_A' },
    dialogue: [{ id: 'LINE_A', speaker_id: 'CHAR_A', text: 'You are late.', start_seconds: 4, end_seconds: 6 }],
    lip_sync_owner: 'CHAR_A',
    offscreen_only_entities: [],
    voice_profiles: [
      { production_contract_version: '1.0.0', character_id: 'CHAR_A', voice_profile: 'Permanent voice A.', voice_version: 'v1', source: { kind: 'CREATOR_APPROVED', id: 'VOICE_A' }, review_state: 'APPROVED' },
      { production_contract_version: '1.0.0', character_id: 'CHAR_B', voice_profile: 'Permanent voice B.', voice_version: 'v1', source: { kind: 'CREATOR_APPROVED', id: 'VOICE_B' }, review_state: 'APPROVED' },
    ],
    performance_modifiers: [{ character_id: 'CHAR_A', modifier: 'deadpan' }],
    continuity_requirements: {
      locked_values: [{ key: 'TABLET_HAND', value: 'LEFT' }],
      cut_states: [],
    },
    forbidden_carryover: ['RAIN_STATE'],
    positive_constraints: ['Exactly two active characters.'],
  };
}

test('removes stale tags that are not selected or active', () => {
  const input = validInput();
  input.active_references.push({ tag: '@char_TEST_stale_v1', version: 'v1', asset_id: 'old-asset', role: 'CHARACTER', subject_id: 'OLD' });
  const output = compileDirection(input);
  assert.deepEqual(output['SCENE CONTEXT'].stale_tags_removed, ['@char_TEST_stale_v1']);
  assert(!output['ACTIVE REFERENCES'].some(({ tag }) => tag === '@char_TEST_stale_v1'));
});

test('requires every active character in the first frame', () => {
  const input = validInput();
  input.spatial_blocking.placements.pop();
  assert.throws(() => compileDirection(input), /FIRST_FRAME_OCCUPANCY/);
});

test('requires gaze and body orientation', () => {
  const gaze = validInput();
  gaze.spatial_blocking.placements[0].gaze_target = 'MISSING';
  assert.throws(() => compileDirection(gaze), /GAZE_DIRECTION/);
  const body = validInput();
  delete body.spatial_blocking.placements[0].body_orientation;
  assert.throws(() => compileDirection(body), /BODY_ORIENTATION/);
});

test('enforces landmark proximity', () => {
  const input = validInput();
  input.spatial_blocking.placements[0].distance_m = 3;
  assert.throws(() => compileDirection(input), /LANDMARK_PROXIMITY/);
});

test('prevents wrong-hand props and undefined props', () => {
  const wrongHand = validInput();
  wrongHand.spatial_blocking.placements[1].held_props[0].hand = 'RIGHT';
  assert.throws(() => compileDirection(wrongHand), /WRONG_HAND_PROP/);
  const undefinedProp = validInput();
  undefinedProp.spatial_blocking.placements[1].held_props[0].prop_id = 'INVENTED';
  assert.throws(() => compileDirection(undefinedProp), /UNDEFINED_PROP/);
});

test('distinguishes single-take and controlled multi-shot formats', () => {
  const single = validInput();
  single.format_mode.cut_times_seconds = [4];
  assert.throws(() => compileDirection(single), /SINGLE_TAKE_CUT/);
  const multi = validInput();
  multi.format_mode = { mode: 'CONTROLLED_MULTI_SHOT', duration_seconds: 8, cut_times_seconds: [4] };
  assert.equal(compileDirection(multi)['FORMAT MODE'].mode, 'CONTROLLED_MULTI_SHOT');
});

test('preserves locked continuity across cuts', () => {
  const input = validInput();
  input.format_mode = { mode: 'CONTROLLED_MULTI_SHOT', duration_seconds: 8, cut_times_seconds: [4] };
  input.continuity_requirements.cut_states = [{ cut_id: 'B', state: { TABLET_HAND: 'RIGHT' } }];
  assert.throws(() => compileDirection(input), /CONTINUITY_DRIFT/);
});

test('enforces configurable lens and FOV consistency', () => {
  const input = validInput();
  input.optics.horizontal_fov_degrees = 80;
  assert.throws(() => compileDirection(input), /FOV_CONSISTENCY/);
  const custom = validInput();
  custom.optics.profile = 'CUSTOM';
  const output = compileDirection(custom, {
    productionPolicy: { optics: { profiles: { CUSTOM: { minimum_lens_mm: 35, maximum_lens_mm: 45 } } } },
  });
  assert.equal(output.OPTICS.profile, 'CUSTOM');
});

test('preserves lighting direction across cuts', () => {
  const input = validInput();
  input.lighting.cut_states = [{ cut_id: 'B', key_direction: 'CAMERA_RIGHT' }];
  assert.throws(() => compileDirection(input), /LIGHTING_DIRECTION/);
});

test('rejects physically impossible movement', () => {
  const input = validInput();
  input.physics[0] = { subject_id: 'CHAR_A', distance_m: 100, duration_seconds: 1, maximum_speed_mps: 8 };
  assert.throws(() => compileDirection(input), /IMPOSSIBLE_MOVEMENT/);
});

test('validates dialogue timing and speaking rate', () => {
  const outside = validInput();
  outside.dialogue[0].end_seconds = 9;
  assert.throws(() => compileDirection(outside), /DIALOGUE_TIMING/);
  const rushed = validInput();
  rushed.dialogue[0] = { speaker_id: 'CHAR_A', text: 'one two three four five six seven eight', start_seconds: 4, end_seconds: 5 };
  assert.throws(() => compileDirection(rushed), /DIALOGUE_TIMING/);
});

test('rejects prior-scene wording, scene-number pollution, and invented references', () => {
  const prior = validInput();
  prior.action_timing[0].action = 'Continue from the previous scene.';
  assert.throws(() => compileDirection(prior), /CONTEXT_LEAKAGE/);
  const numbered = validInput();
  numbered.action_timing[0].action = 'Scene 12 begins with a look.';
  assert.throws(() => compileDirection(numbered), /CONTEXT_LEAKAGE/);
  const invented = validInput();
  invented.action_timing[0].action = 'Use @invented for the face.';
  assert.throws(() => compileDirection(invented), /INVENTED_REFERENCE/);
});

test('emits every CINEDANCE V4 section without a generation fallback', () => {
  const output = compileDirection(validInput());
  assert.equal(output.director_grammar, 'CINEDANCE_V4');
  assert.equal(output.production_contract_version, '1.0.0');
  assert.equal(output.generation_fallback, 'PROHIBITED');
  assert.equal(output.qa.pass, true);
});
