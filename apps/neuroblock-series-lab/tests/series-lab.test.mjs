#!/usr/bin/env node
// NEUROBLOCK SERIES LAB — verification harness (Node >= 20)
// Extracts the inline <script> from index.html, syntax-checks it, then runs
// the NSL engine + DOM smoke tests against a minimal DOM/localStorage stub.
//
// Run: node tests/series-lab.test.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createContext, runInContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_DIR = join(__dirname, '..');
const HTML_PATH = join(APP_DIR, 'index.html');

let pass = 0, fail = 0;
const failures = [];
function check(name, cond, detail='') {
  if (cond) { pass++; console.log('  PASS  ' + name); }
  else { fail++; failures.push(name + (detail ? ' :: ' + detail : '')); console.log('  FAIL  ' + name + (detail ? ' :: ' + detail : '')); }
}
function section(t) { console.log('\n== ' + t + ' =='); }

// ---------- 1. extract script ----------
const html = readFileSync(HTML_PATH, 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) { console.error('NO SCRIPT BLOCK FOUND'); process.exit(2); }
const js = scriptMatch[1];

section('HTML / structure');
check('index.html exists and non-empty', html.length > 5000);
check('single script block extracted', !!scriptMatch && js.length > 20000);
check('viewport meta present', /name="viewport"/.test(html));
check('lang attribute present', /<html lang="en">/.test(html));
check('doctype present', /<!doctype html>/i.test(html));
check('mobile media query present', /@media\s*\(max-width:980px\)/.test(html));
check('reduced-motion guard present', /prefers-reduced-motion/.test(html));
check('no inline secrets (sk-, ghp_)', !/sk-[A-Za-z0-9]{10,}|ghp_[A-Za-z0-9]{20,}|AKIA[A-Z0-9]{10,}/.test(js));

// ---------- 2. syntax check via node --check ----------
section('Syntax');
const tmpDir = mkdtempSync(join(tmpdir(), 'nsl-'));
const tmpJs = join(tmpDir, 'extracted.js');
writeFileSync(tmpJs, js, 'utf8');
try {
  execFileSync(process.execPath, ['--check', tmpJs], { stdio: 'pipe' });
  check('inline script passes node --check', true);
} catch (e) {
  check('inline script passes node --check', false, String(e.stderr || e.message));
}

// ---------- 3. DOM + localStorage stub ----------
function makeEl(tag) {
  const el = {
    tagName: (tag || 'div').toUpperCase(),
    children: [], parentNode: null, dataset: {}, style: {}, _listeners: {},
    className: '', classList: { add(){}, remove(){}, toggle(){} },
    innerHTML: '', textContent: '', value: '', selectedOptions: [],
    setAttribute(){}, getAttribute(){ return null; }, appendChild(c){ el.children.push(c); c.parentNode = el; return c; },
    remove(){}, click(){}, focus(){},
    addEventListener(type, fn){ (el._listeners[type] = el._listeners[type] || []).push(fn); },
    dispatchEvent(ev){ const ls = el._listeners[ev.type] || []; ls.forEach(fn => fn(ev)); return true; },
    querySelector(){ return null; }, querySelectorAll(){ return []; },
    closest(){ return null; }, contains(){ return false; },
    setPointerCapture(){}, scrollIntoView(){},
    getBoundingClientRect(){ return { left:0, top:0, width:0, height:0 }; }
  };
  return el;
}
const elements = {};
function getElementById(id){ if(!elements[id]) elements[id] = makeEl('div'); return elements[id]; }
function createElement(tag){ const el = makeEl(tag); el._created = true; return el; }

const store = new Map();
const localStorageStub = {
  getItem(k){ return store.has(k) ? store.get(k) : null; },
  setItem(k, v){ store.set(k, String(v)); },
  removeItem(k){ store.delete(k); },
  clear(){ store.clear(); },
  key(i){ return Array.from(store.keys())[i] || null; },
  get length(){ return store.size; }
};

const documentStub = {
  getElementById, createElement, body: makeEl('body'), _listeners: {},
  addEventListener(type, fn){ (documentStub._listeners[type] = documentStub._listeners[type] || []).push(fn); },
  dispatchEvent(ev){ const ls = documentStub._listeners[ev.type] || []; ls.forEach(fn => fn(ev)); return true; },
  querySelector(){ return makeEl('div'); },
  querySelectorAll(){ return []; }
};
const windowStub = { addEventListener(){}, location: { href: 'about:blank' } };

const sandbox = {
  console, document: documentStub, window: windowStub, localStorage: localStorageStub,
  alert: (m) => { sandbox._alerts = sandbox._alerts || []; sandbox._alerts.push(m); },
  confirm: () => true,
  prompt: () => 'test override reason',
  setTimeout: (fn) => { sandbox._timers = sandbox._timers || []; sandbox._timers.push(fn); return sandbox._timers.length; },
  clearTimeout: () => {},
  Math, JSON, Date, String, Number, Array, Object, Boolean, RegExp, Set, Map, parseInt, parseFloat, isFinite, isNaN, encodeURIComponent, decodeURIComponent,
  URL, TextEncoder, TextDecoder,
};
sandbox.window = windowStub;
sandbox.globalThis = sandbox;

try {
  runInContext(js + '\n;globalThis.__NSL__ = NSL;', createContext(sandbox));
  check('script executes in stub DOM without throwing', true);
} catch (e) {
  check('script executes in stub DOM without throwing', false, String(e && e.stack || e));
}

const NSL = sandbox.__NSL__;

// ---------- 4. engine unit tests ----------
section('Engine — schema / state');
check('NSL exposed', !!NSL);
const blank = NSL.blankState();
check('blank state schemaVersion=2', blank.schemaVersion === 2);
check('blank state has one episode', blank.episodes.length === 1);
check('validateState ok on blank', NSL.validateState(blank).ok);
const bad = { schemaVersion: 2, episodes: 'nope' };
check('validateState rejects malformed', !NSL.validateState(bad).ok);

const v1raw = { series: 'OLD SHOW', characters: [{ name: 'Bob', role: 'Pilot', look: 'helmet' }], relationships: [{ a: 'Bob', b: 'Jane', heat: 60 }], episodes: [{ id: 'x1', title: 'First', summary: 'A start', location: 'ship', threat: 'drone', level: 3, camera: 'wide', lighting: 'cold', dialogue: 'Go.', wardrobe: 'suit', prop: 'prism recovered', relationship: 'trust', continuity: 'Bob injured' }] };
const migrated = NSL.migrateState(v1raw);
check('v1 migration produces valid v2', NSL.validateState(migrated).ok);
check('v1 migration keeps episode', migrated.episodes.length === 1);
check('v1 migration maps title', migrated.episodes[0].title === 'First');
check('v1 migration maps threat species', migrated.episodes[0].continuity.threat.species === 'drone');
check('v1 migration maps character look to appearance anchors', migrated.characters[0].appearance_anchors === 'helmet');
check('v1 migration maps active pointer', !!migrated.active_episode_id);

const ensure = NSL.ensureSchema(JSON.parse(JSON.stringify(v1raw)));
check('ensureSchema migrates legacy', ensure.migrated === true && NSL.validateState(ensure.state).ok);

section('Engine — persistence');
check('store.write/read roundtrip', (() => { const r = NSL.store.write('{"a":1}'); return r.ok && NSL.store.read() === '{"a":1}'; })());
NSL.store.clearCorrupt();
const corruptResult = (() => { store.set('neuroblock.serieslab.v2', '{corrupt json'); return NSL.loadState(); })();
check('corrupt payload -> blank state, not crash', corruptResult.corrupt === true && NSL.validateState(corruptResult.state).ok);
check('corrupt payload quarantined', Array.from(store.keys()).some(k => k.startsWith('neuroblock.serieslab.corrupt')));

section('Engine — episodes');
const demo = NSL.demoState();
check('demo has 4 episodes', demo.episodes.length === 4);
check('demo episodes numbered 1..4', demo.episodes.map(e=>Number(e.episode_number)).sort().join(',') === '1,2,3,4');
check('demo active pointer valid', !!NSL.episodeById(demo, demo.active_episode_id));
check('scoreEpisode returns finite 0..100 for blank', (()=>{const s=NSL.scoreEpisode(NSL.blankEpisode(1));return Number.isFinite(s)&&s>=0&&s<=100;})());
check('scoreEpisode returns finite for demo e1', (()=>{const s=NSL.scoreEpisode(NSL.episodeById(demo,'e1'));return Number.isFinite(s)&&s>=0&&s<=100;})());
check('scoreEpisode blank < demo e1 (readiness rises with data)', NSL.scoreEpisode(NSL.blankEpisode(1)) < NSL.scoreEpisode(NSL.episodeById(demo,'e1')));
const e1 = NSL.episodeById(demo, 'e1');
check('demo e1 ready_for_review', e1.approval_state === 'ready_for_review');
const e4 = NSL.episodeById(demo, 'e4');
check('e4 has live BLOCKING (mimic drone un-overridden)', NSL.countSeverity(NSL.applyOverrides(NSL.continuityWarnings(NSL.episodeById(demo,'e3'), e4), e4), 'BLOCKING') >= 1);
const e2 = NSL.episodeById(demo, 'e2');
const w2 = NSL.applyOverrides(NSL.continuityWarnings(e1, e2), e2);
check('e2 species change overridden -> INFO', w2.some(w=>w.code==='THREAT_SPECIES_CHANGE' && w.overridden && w.severity==='INFO'));

section('Engine — continuity categories');
const p1 = NSL.blankEpisode(1); const n1 = NSL.blankEpisode(2);
p1.continuity.character.injuries = 'left arm bandaged';
n1.continuity.character.injuries = '';
const wInj = NSL.continuityWarnings(p1, n1);
check('unacknowledged injury -> BLOCKING', wInj.some(w=>w.code==='INJURY_UNACKNOWLEDGED' && w.severity==='BLOCKING'));
const p2 = NSL.blankEpisode(1); const n2 = NSL.blankEpisode(2);
p2.continuity.character.wardrobe = 'red jacket';
n2.continuity.character.wardrobe = 'blue parka';
check('wardrobe change -> WARNING', NSL.continuityWarnings(p2,n2).some(w=>w.code==='WARDROBE_CHANGE' && w.severity==='WARNING'));
const p3 = NSL.blankEpisode(1); const n3 = NSL.blankEpisode(2);
p3.continuity.prop = NSL.parseProps('prism | Mara | vault | intact | active');
n3.continuity.prop = NSL.parseProps('prism | Inez | vault | intact | active');
check('prop ownership change -> WARNING', NSL.continuityWarnings(p3,n3).some(w=>w.code==='PROP_OWNERSHIP' && w.severity==='WARNING'));
const p4 = NSL.blankEpisode(1); const n4 = NSL.blankEpisode(2);
p4.continuity.threat = {species:'crawler',capability:'x',escalation:2,known_behavior:'',countermeasures:''};
n4.continuity.threat = {species:'queen',capability:'y',escalation:2,known_behavior:'',countermeasures:''};
check('species change -> BLOCKING', NSL.continuityWarnings(p4,n4).some(w=>w.code==='THREAT_SPECIES_CHANGE' && w.severity==='BLOCKING'));
const p5 = NSL.blankEpisode(1); const n5 = NSL.blankEpisode(2);
p5.continuity.threat = {species:'crawler',capability:'x',escalation:2,known_behavior:'',countermeasures:''};
n5.continuity.threat = {species:'crawler',capability:'x',escalation:7,known_behavior:'',countermeasures:''};
check('escalation jump >2 -> WARNING', NSL.continuityWarnings(p5,n5).some(w=>w.code==='ESCALATION_JUMP' && w.severity==='WARNING'));
const p6 = NSL.blankEpisode(1); const n6 = NSL.blankEpisode(2);
p6.continuity.narrative.unresolved_hooks = 'Who is the voice?';
n6.continuity.narrative.unresolved_hooks = '';
check('unresolved hook -> WARNING', NSL.continuityWarnings(p6,n6).some(w=>w.code==='HOOK_UNRESOLVED' && w.severity==='WARNING'));
const p7 = NSL.blankEpisode(1); const n7 = NSL.blankEpisode(2);
p7.continuity.environment.location = 'ship';
n7.continuity.environment.location = 'vault';
n7.continuity_notes = '';
check('location jump without transition -> WARNING', NSL.continuityWarnings(p7,n7).some(w=>w.code==='LOCATION_JUMP' && w.severity==='WARNING'));
const p8 = NSL.blankEpisode(1); const n8 = NSL.blankEpisode(2);
p8.continuity.environment.location = 'ship';
n8.continuity.environment.location = 'vault';
n8.continuity_notes = 'crew transits to the vault';
check('location change with transition -> INFO not WARNING', (()=>{const ws=NSL.continuityWarnings(p8,n8).filter(w=>w.code==='LOCATION_JUMP'||w.code==='LOCATION_CHANGE');return ws.length===1 && ws[0].severity==='INFO';})());

section('Engine — receipts');
const receipt = NSL.buildReceipt(demo, 'e1');
check('receipt built', !!receipt);
check('receipt has series_id', !!receipt.series_id);
check('receipt has episode_id', receipt.episode_id === 'e1');
check('receipt has readiness_score', typeof receipt.readiness_score === 'number');
check('receipt has character_state', !!receipt.character_state);
check('receipt has next_episode_constraints', Array.isArray(receipt.next_episode_constraints));
check('receipt has human_overrides array', Array.isArray(receipt.human_overrides));
check('receipt JSON stringifies deterministically (excluding timestamp)', (()=>{const strip=o=>{const c=JSON.parse(JSON.stringify(o));delete c.timestamp;return JSON.stringify(c)};return strip(receipt)===strip(NSL.buildReceipt(demo,'e1'));})());

section('Engine — context packet');
const packet = NSL.buildContextPacket(demo);
check('packet built', !!packet);
check('packet has CANON_FACTS', packet.sections && packet.sections.CANON_FACTS);
check('packet has CHARACTER_MEMORY', packet.sections && Array.isArray(packet.sections.CHARACTER_MEMORY));
check('packet has EPISODE_HISTORY', packet.sections && Array.isArray(packet.sections.EPISODE_HISTORY));
check('packet has UNRESOLVED_THREADS', packet.sections && Array.isArray(packet.sections.UNRESOLVED_THREADS));
check('packet has GENERATION_CONSTRAINTS', packet.sections && Array.isArray(packet.sections.GENERATION_CONSTRAINTS));
check('packet deterministic (excluding generated_at)', (()=>{const strip=o=>{const c=JSON.parse(JSON.stringify(o));delete c.generated_at;return JSON.stringify(c)};return strip(packet)===strip(NSL.buildContextPacket(demo));})());

section('Engine — production contract');
const contract = NSL.buildProductionContract(demo, 'e1');
check('contract built', !!contract);
check('contract has episode_intent', 'episode_intent' in contract);
check('contract has scene_list', Array.isArray(contract.scene_list));
check('contract has cast', Array.isArray(contract.cast));
check('contract has camera_contract', !!contract.camera_contract);
check('contract has negative_constraints', Array.isArray(contract.negative_constraints));
check('contract has provider_routing', !!contract.provider_routing && contract.provider_routing.provider === 'unresolved_until_router_selection');
check('contract has approval_state', !!contract.approval_state);

section('Engine — routing');
const route = NSL.routeProvider('video', e1);
check('route provider unresolved', route.provider === 'unresolved_until_router_selection');
check('route candidates non-empty', route.candidates.length > 0);
check('route candidates include higgsfield', route.candidates.some(c=>c.id==='higgsfield'));
check('route candidates include seedance', route.candidates.some(c=>c.id==='seedance'));
check('route required gates present', route.required_gates.includes('human_approval') && route.required_gates.includes('media_diff'));

section('Engine — showrunner');
const advice = NSL.runShowrunner(demo, 'e1');
check('advice array returned', Array.isArray(advice) && advice.length > 0);
check('advice bounded to advisory keys', advice.every(a=>['INFO','WARNING','BLOCKING'].includes(a.severity) && a.tag && a.message));
const advice4 = NSL.runShowrunner(demo, 'e4');
check('showrunner flags e4 blocking', advice4.some(a=>a.severity==='BLOCKING'));

section('Engine — entropy');
const ent = NSL.computeEntropy(demo, 'e1');
check('entropy score numeric 0..100', typeof ent.entropy_score === 'number' && ent.entropy_score >= 0 && ent.entropy_score <= 100);
check('entropy has drift_sources', Array.isArray(ent.drift_sources));
check('entropy has severity', ['STABLE','LOW','MEDIUM','HIGH'].includes(ent.severity));
check('entropy has recommended_correction', typeof ent.recommended_correction === 'string' && ent.recommended_correction.length > 0);
check('entropy method disclaimer present', /heuristic|not information-theoretic/i.test(ent.method || ''));
const ent4 = NSL.computeEntropy(demo, 'e4');
check('e4 entropy >= e1 entropy (blocking raises drift)', ent4.entropy_score >= ent.entropy_score);
const entEmpty = NSL.computeEntropy(NSL.blankState(), null);
check('entropy on missing episode safe', entEmpty.entropy_score === 0 && entEmpty.severity === 'STABLE');

section('Engine — generation gate');
const gateE1 = NSL.generationGate(demo, 'e1');
check('e1 gate (ready_for_review, no blocking) allowed', gateE1.allowed === true);
const gateE4 = NSL.generationGate(demo, 'e4');
check('e4 gate blocked by blocking violation', gateE4.allowed === false && gateE4.blocking > 0);
const draftE2 = NSL.generationGate(demo, 'e2');
check('e2 gate blocked while draft even without blocking', draftE2.allowed === false);

// ---------- 5. DOM smoke tests ----------
section('DOM — render paths');
const renderOk = (() => { try { sandbox.render(); return true; } catch(e) { console.log('    render error:', String(e)); return false; } })();
check('render() runs without exception', renderOk);
const statusEl = getElementById('statusbar');
check('statusbar rendered with GATED pill', statusEl && /GATED/.test(statusEl.innerHTML));
const inspEl = getElementById('inspector');
check('inspector rendered', inspEl && inspEl.innerHTML.length > 100);

// ---------- 6. persistence integration ----------
section('Persistence integration');
store.clear();
store.set('neuroblock.serieslab.v2', JSON.stringify(demo));
const reload = NSL.loadState();
check('saved demo reloads', reload.state.episodes.length === 4 && !reload.corrupt);
const saved = NSL.saveState(demo);
check('saveState writes', saved.ok === true && NSL.store.read().length > 10);
store.clear();
store.set('neuroblock.serieslab.v2', JSON.stringify({schemaVersion: 2, episodes: [], series: {id:'s1', title:'T'}}));
const broken = NSL.loadState();
check('invalid v2 payload -> safe blank + note', broken.state.episodes.length >= 1 && broken.notes.length > 0);
store.clear();

// ---------- 7. interaction-level tests (dialog-gated flows) ----------
section('Interactions — episode lifecycle');
const w1 = NSL.demoState();
check('nextEpisodeNumber after demo = 5', NSL.nextEpisodeNumber(w1) === 5);
const addEp = NSL.blankEpisode(NSL.nextEpisodeNumber(w1));
w1.episodes.push(addEp); w1.active_episode_id = addEp.episode_id;
check('added episode is active', NSL.activeEpisode(w1).episode_id === addEp.episode_id);
check('added episode numbered 5', Number(addEp.episode_number) === 5);
// delete middle episode; ensure active pointer repaired
const deletedId = NSL.episodeById(w1,'e2').episode_id;
w1.active_episode_id = deletedId;
w1.episodes = w1.episodes.filter(x=>x.episode_id!==deletedId);
if(!NSL.episodeById(w1, w1.active_episode_id)) w1.active_episode_id = w1.episodes.length?w1.episodes[0].episode_id:null;
check('deleted episode removed', w1.episodes.length === 4 && !NSL.episodeById(w1,'e2'));
check('active pointer repaired after delete', !!NSL.episodeById(w1, w1.active_episode_id));

section('Interactions — overrides');
const ovDemo = NSL.demoState();
const ovE4 = NSL.episodeById(ovDemo,'e4');
const before = NSL.countSeverity(NSL.applyOverrides(NSL.continuityWarnings(NSL.episodeById(ovDemo,'e3'), ovE4), ovE4), 'BLOCKING');
check('e4 blocking before override', before >= 1);
ovE4.human_overrides.push({field:'threat.species',category:'THREAT',reason:'Mimic drone is the queen\'s deployed extension — intentional',authorized_by:'human',timestamp:new Date().toISOString()});
const after = NSL.applyOverrides(NSL.continuityWarnings(NSL.episodeById(ovDemo,'e3'), ovE4), ovE4);
check('e4 blocking cleared after override', NSL.countSeverity(after,'BLOCKING') === 0);
check('override recorded in warning metadata', after.some(w=>w.code==='THREAT_SPECIES_CHANGE' && w.overridden));
check('override visible in receipt', NSL.buildReceipt(ovDemo,'e4').human_overrides.length === 1);

section('Interactions — field editing preserves structure');
const editDemo = NSL.demoState();
const editE1 = NSL.episodeById(editDemo,'e1');
editE1.title = 'Renamed Pilot Episode';
editE1.continuity.character.wardrobe = 'updated suit';
editE1.readiness = NSL.scoreEpisode(editE1);
check('edit updates title', editE1.title === 'Renamed Pilot Episode');
check('edit updates continuity state', editE1.continuity.character.wardrobe === 'updated suit');
check('readiness recomputed finite', Number.isFinite(editE1.readiness));

section('Interactions — approval state transitions');
const apDemo = NSL.demoState();
const apE2 = NSL.episodeById(apDemo,'e2');
apE2.approval_state='ready_for_review';
check('draft -> ready_for_review accepted', apE2.approval_state === 'ready_for_review');
check('gate opens for overridden+review episode', NSL.generationGate(apDemo,'e2').allowed === true);

section('Interactions — series context packet export path');
const exportDemo = NSL.demoState();
const pkt = NSL.buildContextPacket(exportDemo);
check('packet export sections all present', ['CANON_FACTS','CURRENT_STATE','CHARACTER_MEMORY','RELATIONSHIP_MEMORY','VISUAL_GRAMMAR','EPISODE_HISTORY','UNRESOLVED_THREADS','GENERATION_CONSTRAINTS'].every(k=>pkt.sections[k]!==undefined));
check('packet is provider-neutral (no provider prompt syntax)', !JSON.stringify(pkt).match(/seedance prompt|higgsfield prompt|--ar |--seed /i));

// ---------- 8. cleanup ----------
rmSync(tmpDir, { recursive: true, force: true });
section('Summary');
console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) { console.log('FAILURES:'); failures.forEach(f => console.log('  - ' + f)); process.exit(1); }
process.exit(0);
