/**
 * AGENTROPOLIS-CREATOR — creative package adapter test
 *
 * Node-runnable (node --experimental-strip-types), zero dependencies:
 * loads the real promo package + storyboard handoff + canonical prompt,
 * computes the canonical hash, and asserts the bridge packet shape and
 * hash fidelity against the FILM DISTRICT contract requirements.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { toDistrictBridge, type DistrictBridgePackage } from './creative-package-adapter.ts';

const HERE = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = join(HERE, '..');
const REPO = join(PKG_DIR, '..', '..');

const example = JSON.parse(
  readFileSync(join(PKG_DIR, 'examples', 'agp-what-is-it.creative-package.json'), 'utf8'),
);
const shotPlan = JSON.parse(
  readFileSync(join(REPO, 'packages', 'storyboard-handoff', 'agp-what-is-it', 'shot-plan.json'), 'utf8'),
);
const storyboard = JSON.parse(
  readFileSync(join(REPO, 'packages', 'storyboard-handoff', 'agp-what-is-it', 'storyboard.json'), 'utf8'),
);
const canonicalPrompt = readFileSync(
  join(REPO, 'packages', 'prompts', 'agp-what-is-it', 'canonical-prompt.md'),
  'utf8',
);
const canonicalHash = createHash('sha256').update(canonicalPrompt).digest('hex');

const variants = example.campaign_variants as { variant_id: string; target: string; notes?: string }[];

const bridge: DistrictBridgePackage = toDistrictBridge(
  example,
  {
    shot_plan: shotPlan.shots,
    storyboards: storyboard.frames.map((f: { shot_id?: string; camera_notes?: string }) => ({
      shot_id: f.shot_id,
      camera_notes: f.camera_notes,
    })),
    campaign_variants: variants,
  },
  {
    version: '1.0.0',
    hash: canonicalHash,
    text_path: 'packages/prompts/agp-what-is-it/canonical-prompt.md',
  },
);

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error('ADAPTER TEST FAIL: ' + msg);
}

// Bridge required fields per FILM DISTRICT contracts/creator-to-asbe.schema.json
for (const field of [
  'brief_id', 'route', 'spec', 'beats', 'copy', 'technique', 'negatives',
  'continuity_bible', 'prompt_version', 'asset_hashes', 'shot_plan', 'distribution_targets',
]) {
  assert(bridge[field as keyof DistrictBridgePackage] !== undefined, `missing bridge field ${field}`);
}
assert(bridge.prompt_version.version === '1.0.0', 'prompt_version.version');
assert(/^[a-f0-9]{64}$/.test(bridge.prompt_version.prompt_hash), 'prompt_hash shape');
assert(bridge.prompt_version.prompt_hash === canonicalHash, 'prompt hash must equal sha256(canonical-prompt.md)');
assert(bridge.shot_plan.length === 6, 'shot plan should have 6 shots');
assert(bridge.storyboards && bridge.storyboards.length === 8, 'storyboard should have 8 frames');
assert(bridge.campaign_variants && bridge.campaign_variants.length >= 3, 'campaign variants present');
assert(Array.isArray(bridge.distribution_targets) && bridge.distribution_targets.length > 0, 'distribution targets');

console.log('creative-package adapter: PASS');
console.log('  bridge prompt_version:', JSON.stringify(bridge.prompt_version));
console.log('  shots:', bridge.shot_plan.length, '| storyboard frames:', bridge.storyboards?.length);
