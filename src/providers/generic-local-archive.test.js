import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { normalizeLocalCollection } from './generic-local-archive.js';

function jpegLike(width = 640, height = 480) {
  const b = Buffer.alloc(32);
  b[0] = 0xff; b[1] = 0xd8;
  b[2] = 0xff; b[3] = 0xc0; b.writeUInt16BE(11, 4); b[6] = 8;
  b.writeUInt16BE(height, 7); b.writeUInt16BE(width, 9); b[11] = 1;
  return b;
}

async function archive(files) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'generic-local-'));
  for (const [name, content] of Object.entries(files)) await writeFile(path.join(root, name), content);
  return root;
}

test('normalizes creator-original archives without folder/provider inference', async () => {
  const root = await archive({
    '2 STUDENTS IN CLASS.png': jpegLike(),
    '2 STUDENTS IN CLASS ACTION.png': jpegLike(800, 600),
  });
  try {
    const result = normalizeLocalCollection(root, {
      vaultId: 'creator-original-f5e8n9-v1', provider: 'USER_ORIGINAL',
      sourceClass: 'CREATOR_ORIGINAL_ARCHIVE', ownershipBasis: 'USER_DECLARED_ORIGINAL',
      rightsStatus: 'OWNER_ASSERTED_REQUIRES_RECORD', projectCode: 'F5E8N9',
    });
    assert.equal(result.manifest.assets.length, 2);
    assert.equal(result.manifest.provider, 'USER_ORIGINAL');
    assert.equal(result.manifest.source_class, 'CREATOR_ORIGINAL_ARCHIVE');
    assert.equal(result.manifest.assets[0].provider, 'USER_ORIGINAL');
    assert.equal(result.manifest.assets[0].provider_asset_id, 'UNKNOWN');
    assert.equal(result.receipt.readiness_assessment, 'LOCAL_INDEX_READY_CANDIDATE');
    assert.ok(result.normalizedAssets.every((asset) => asset.provider_metadata.generation_fallback === 'PROHIBITED'));
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('keeps identical filenames distinct across source collections', async () => {
  const left = await archive({ 'shared.png': jpegLike(640, 480) });
  const right = await archive({ 'shared.png': jpegLike(641, 480) });
  try {
    const a = normalizeLocalCollection(left, { vaultId: 'creator-original-a-v1', provider: 'USER_ORIGINAL', sourceClass: 'CREATOR_ORIGINAL_ARCHIVE', projectCode: 'A' });
    const b = normalizeLocalCollection(right, { vaultId: 'hell-grind-public-capture-v1', provider: 'HIGGSFIELD', sourceClass: 'HIGGSFIELD_PUBLIC_REFERENCE', projectCode: 'HELLGRIND' });
    assert.notEqual(a.manifest.assets[0].asset_id, b.manifest.assets[0].asset_id);
    assert.equal(a.manifest.assets[0].provider, 'USER_ORIGINAL');
    assert.equal(b.manifest.assets[0].provider, 'HIGGSFIELD');
  } finally {
    await rm(left, { recursive: true, force: true });
    await rm(right, { recursive: true, force: true });
  }
});
