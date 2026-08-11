import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { validateAgainstSchema } from '../story-engine/schema-validator.js';
import { compileDirection } from './compiler.js';
import { validInput } from './compiler.test.js';
import { normalizeReference, parseReferenceTag } from './reference-tags.js';
import { assertVoiceIdentityImmutable } from './voice.js';

const load = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));

function performance(characterId, rhythmId, onsetSeconds, innerLine) {
  return {
    production_contract_version: '1.0.0',
    character_id: characterId,
    objective: 'Make the other character concede.',
    obstacle: 'The other character refuses.',
    stakes: 'The plan fails if neither yields.',
    tactics: ['PRESS', 'WAIT'],
    beats: [{ id: 'B1', tactic: 'PRESS' }, { id: 'B2', tactic: 'WAIT' }],
    subtext: 'I need you to believe me.',
    business: 'Keeps both hands occupied with the assigned task.',
    proxemics: { zone: 'SOCIAL', distance_m: 1.5 },
    status: 'CONTROLLED_HIGH',
    eye_life: 'Eyes reach the target before the head; deliberate live blinks.',
    reaction_timing: { rhythm_id: rhythmId, onset_seconds: onsetSeconds },
    physical_state: 'Grounded and breathing evenly.',
    scene_specific_behavior: 'Changes tactic after the other character refuses.',
    ...(innerLine ? { inner_line: innerLine } : {}),
  };
}

test('parses canonical character, location, and prop tags without changing raw text', () => {
  const character = parseReferenceTag('@char_CB_Kel_v9');
  assert.deepEqual({ type: character.reference_type, project: character.project_code, name: character.reference_name, scope: character.scene_scope, version: character.version, raw: character.raw_tag },
    { type: 'CHARACTER', project: 'CB', name: 'Kel', scope: null, version: 'v9', raw: '@char_CB_Kel_v9' });
  const location = parseReferenceTag('@loc_CB_warehouse_s6_v2');
  assert.deepEqual({ type: location.reference_type, name: location.reference_name, scope: location.scene_scope, version: location.version },
    { type: 'LOCATION', name: 'warehouse', scope: 's6', version: 'v2' });
  assert.equal(parseReferenceTag('@prop_CB_gunTobin_s26_v2').reference_type, 'PROP');
});

test('requires percent escaping for a literal reserved-looking terminal name token', () => {
  const escapedScope = parseReferenceTag('@other_CB_archive%5Fs26');
  assert.equal(escapedScope.reference_name, 'archive_s26');
  assert.equal(escapedScope.reference_name_raw, 'archive%5Fs26');
  assert.equal(escapedScope.reference_name_encoding, 'PERCENT_ESCAPED');
  assert.equal(escapedScope.scene_scope, null);
  const escapedVersion = parseReferenceTag('@other_CB_archive%5Fv2_s5_v3');
  assert.equal(escapedVersion.reference_name, 'archive_v2');
  assert.equal(escapedVersion.scene_scope, 's5');
  assert.equal(escapedVersion.version, 'v3');
  assert.throws(() => parseReferenceTag('@other_CB_archive%2Fs26'), /REFERENCE_TAG_ESCAPE/);
  assert.throws(() => normalizeReference({
    tag: '@other_CB_archive%5Fs26', reference_name: 'archive', role: 'OTHER', asset_id: 'asset-other',
  }), /REFERENCE_TAG_AMBIGUITY/);
  assert.throws(() => normalizeReference({
    tag: '@other_CB_archive_s26', role: 'OTHER', asset_id: 'asset-other',
  }), /REFERENCE_TAG_AMBIGUITY/);
});

test('parses multi-scene scope and leaves absent version unresolved', () => {
  const ranged = parseReferenceTag('@loc_CB_kal_street_s5-46_v3');
  assert.equal(ranged.reference_name, 'kal_street');
  assert.equal(ranged.scene_scope, 's5-46');
  const unversioned = parseReferenceTag('@prop_CB_sedan_interior_back');
  assert.equal(unversioned.version, null);
  assert.equal(unversioned.scene_scope, null);
});

test('uses tag semantics rather than depicted space for prop classification', () => {
  assert.equal(parseReferenceTag('@prop_CB_sedan_interior_back').reference_type, 'PROP');
});

test('permanent voice identity is immutable and scene acting cannot override it', () => {
  const master = validInput().voice_profiles[0];
  assert.throws(() => assertVoiceIdentityImmutable(master, { ...master, voice_profile: 'Rewritten voice.' }), /VOICE_IDENTITY_MUTATION/);
  const input = validInput();
  input.scene_acting = [performance('CHAR_A', 'A_EARLY', 0.1), { ...performance('CHAR_B', 'B_LATE', 0.6), voice_profile: 'Scene override.' }];
  assert.throws(() => compileDirection(input), /VOICE_IDENTITY_MUTATION/);
});

test('preserves explicitly supplied FOV without assuming a sensor', () => {
  const input = validInput();
  input.optics = {
    source_text: '200mm long telephoto, FOV approximately 12 degrees',
    profile: 'TELEPHOTO', focal_length_mm: 200, field_of_view_degrees: 12,
    field_of_view_basis: 'DIAGONAL', camera_distance: { meters: 22 },
    depth_behavior: 'RAZOR_THIN_SUBJECT_ISOLATION', compression_behavior: 'STRONG_BACKGROUND_COMPRESSION',
  };
  const output = compileDirection(input);
  assert.equal(output.OPTICS.field_of_view_degrees, 12);
  assert.equal(output.OPTICS.fov_source, 'EXPLICIT_SOURCE_VALUE');
  assert.equal(output.OPTICS.sensor_width_mm, null);
  assert.equal(output.OPTICS.source_text, input.optics.source_text);
});

test('enforces the 180-degree camera-side lock across cuts', () => {
  const input = validInput();
  input.camera_mode.cut_states = [{ cut_id: 'B', camera_side: 'OPPOSITE_SIDE' }];
  input.continuity_requirements.hard_locks = [{ type: 'CAMERA_SIDE_180', camera_side: 'DOOR_SIDE' }];
  assert.throws(() => compileDirection(input), /CAMERA_SIDE_180/);
});

test('enforces offscreen-only subjects', () => {
  const input = validInput();
  input.offscreen_only_entities = ['CHAR_B'];
  input.first_frame_requirements.required_character_ids = ['CHAR_A'];
  input.continuity_requirements.hard_locks = [{ type: 'OFFSCREEN_ONLY', entity_ids: ['CHAR_B'] }];
  assert.throws(() => compileDirection(input), /OFFSCREEN_ONLY/);
  input.spatial_blocking.placements = input.spatial_blocking.placements.filter(({ subject_id }) => subject_id !== 'CHAR_B');
  const output = compileDirection(input);
  assert.deepEqual(output.shot_spec.offscreen_only_entities, ['CHAR_B']);
  assert.equal(output.shot_spec.continuity_locks.hard_locks[0].validation_status, 'PASS');
});

test('enforces exact speech-segment count and lip-sync ownership locks', () => {
  const count = validInput();
  count.continuity_requirements.hard_locks = [{ type: 'SPEECH_SEGMENT_COUNT', owner_id: 'CHAR_A', exact_count: 2 }];
  assert.throws(() => compileDirection(count), /SPEECH_SEGMENT_COUNT/);
  const owner = validInput();
  owner.dialogue[0].speaker_id = 'CHAR_B';
  assert.throws(() => compileDirection(owner), /LIP_SYNC_OWNERSHIP/);
});

test('keeps inner_line in acting motivation and out of audio or captions', () => {
  const input = validInput();
  const innerLine = 'Do not let them see you panic.';
  input.scene_acting = [performance('CHAR_A', 'A_EARLY', 0.1, innerLine), performance('CHAR_B', 'B_LATE', 0.7)];
  const output = compileDirection(input);
  assert.equal(output.ACTING.scene_performances[0].inner_line, innerLine);
  assert(!JSON.stringify(output.AUDIO).includes(innerLine));
  assert(!JSON.stringify(output.shot_spec.dialogue).includes(innerLine));
  const leaked = structuredClone(input);
  leaked.dialogue[0].text = innerLine;
  assert.throws(() => compileDirection(leaked), /INNER_LINE_LEAKAGE/);
});

test('requires distinct ensemble reaction rhythms', () => {
  const valid = validInput();
  valid.scene_acting = [performance('CHAR_A', 'A_EARLY', 0.1), performance('CHAR_B', 'B_LATE', 0.7)];
  assert.equal(compileDirection(valid).ACTING.scene_performances.length, 2);
  const synchronized = validInput();
  synchronized.scene_acting = [performance('CHAR_A', 'SAME', 0.1), performance('CHAR_B', 'SAME', 0.1)];
  assert.throws(() => compileDirection(synchronized), /ENSEMBLE_REACTION_SYNC/);
});

test('allows choreographed unison only with an authored reason and source', () => {
  const missingAuthority = validInput();
  missingAuthority.ensemble_sync_mode = 'CHOREOGRAPHED_UNISON';
  missingAuthority.scene_acting = [performance('CHAR_A', 'SYNC', 0.1), performance('CHAR_B', 'SYNC', 0.1)];
  assert.throws(() => compileDirection(missingAuthority), /ENSEMBLE_SYNC_AUTHORIZATION/);
  missingAuthority.ensemble_sync_authorization = {
    reason: 'Authored mechanical drill beat.', source: { kind: 'SHOT_DIRECTION', id: 'SYNC-001' },
  };
  const output = compileDirection(missingAuthority);
  assert.equal(output.shot_spec.ensemble_sync_mode, 'CHOREOGRAPHED_UNISON');
});

test('does not pass evidence-dependent locks when structured state is absent', () => {
  const input = validInput();
  delete input.offscreen_only_entities;
  input.continuity_requirements.hard_locks = [
    { type: 'VISIBLE_DOORS_STATIC', landmark_ids: ['DOOR'], state: 'CLOSED' },
    { type: 'PROP_STATE', prop_id: 'TABLET', state: 'ON' },
    { type: 'EVENT_TIMECODE', event_id: 'MISSING', start_seconds: 1, end_seconds: 2 },
    { type: 'HAND_OWNERSHIP', prop_id: 'TABLET', owner_id: 'CHAR_B', hand: 'LEFT' },
    { type: 'OFFSCREEN_ONLY', entity_ids: ['CHAR_B'] },
  ];
  delete input.spatial_blocking.placements[1].held_props;
  const statuses = compileDirection(input).shot_spec.continuity_locks.hard_locks.map(({ validation_status }) => validation_status);
  assert.deepEqual(statuses, Array(5).fill('NOT_MACHINE_VERIFIABLE'));
});

test('passes evidence-dependent locks only when structured state is present', () => {
  const input = validInput();
  input.format_mode = { mode: 'CONTROLLED_MULTI_SHOT', duration_seconds: 8, cut_times_seconds: [4] };
  input.spatial_blocking.landmarks[0].state = 'CLOSED';
  input.props[0].state = 'ON';
  input.continuity_requirements.cut_states = [{ cut_id: 'B', state: { TABLET_HAND: 'LEFT', 'DOOR:DOOR': 'CLOSED' } }];
  input.continuity_requirements.hard_locks = [
    { type: 'VISIBLE_DOORS_STATIC', landmark_ids: ['DOOR'], state: 'CLOSED' },
    { type: 'PROP_STATE', prop_id: 'TABLET', state: 'ON' },
    { type: 'EVENT_TIMECODE', event_id: 'LOOK', start_seconds: 0, end_seconds: 4 },
    { type: 'HAND_OWNERSHIP', prop_id: 'TABLET', owner_id: 'CHAR_B', hand: 'LEFT' },
  ];
  const locks = compileDirection(input).shot_spec.continuity_locks.hard_locks;
  assert.deepEqual(locks.map(({ validation_status }) => validation_status), Array(4).fill('PASS'));
});

test('new production schemas validate normalized contract examples', async () => {
  const [tagSchema, voiceSchema, actingMasterSchema, actingSchema, shotSchema] = await Promise.all([
    load('../../data/story/reference-tag.schema.json'),
    load('../../data/story/character-voice-profile.schema.json'),
    load('../../data/story/character-acting-profile.schema.json'),
    load('../../data/story/acting-performance.schema.json'),
    load('../../data/story/shot-spec.schema.json'),
  ]);
  const input = validInput();
  input.scene_acting = [performance('CHAR_A', 'A_EARLY', 0.1), performance('CHAR_B', 'B_LATE', 0.7)];
  const output = compileDirection(input);
  assert.deepEqual(validateAgainstSchema(parseReferenceTag('@loc_CB_warehouse_s6_v2'), tagSchema), []);
  assert.deepEqual(validateAgainstSchema(input.voice_profiles[0], voiceSchema), []);
  assert.deepEqual(validateAgainstSchema({
    production_contract_version: '1.0.0', character_id: 'CHAR_A', acting_profile: 'Permanent observable behavior.', acting_version: 'v1',
    source: { kind: 'CREATOR_APPROVED', id: 'ACTING_A' }, review_state: 'APPROVED',
  }, actingMasterSchema), []);
  assert.deepEqual(validateAgainstSchema(input.scene_acting[0], actingSchema), []);
  assert.deepEqual(validateAgainstSchema(output.shot_spec, shotSchema), []);
});
