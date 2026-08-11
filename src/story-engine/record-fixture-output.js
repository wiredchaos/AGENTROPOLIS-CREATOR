import { readFile, writeFile } from 'node:fs/promises';
import { buildFixtureReceipt } from './fixture-receipt.js';
import { matchScenes } from './matcher.js';

const loadJson = async (relativePath) =>
  JSON.parse(await readFile(new URL(relativePath, import.meta.url), 'utf8'));

const scenes = await loadJson('../../data/story/test-scenes.json');
const assets = await loadJson('../../data/higgsfield/assets.fixture.json');
const vaults = await loadJson('../../data/higgsfield/vaults.json');
const outputUrl = new URL('../../data/story/test-scene-match-output.json', import.meta.url);
const receipt = buildFixtureReceipt(matchScenes(scenes, assets, { vaults }));

await writeFile(outputUrl, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
