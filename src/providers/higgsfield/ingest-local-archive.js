#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { ingestLocalArchive } from './local-asset-adapter.js';

const [sourceRoot, manifestPath, receiptPath] = process.argv.slice(2);
if (!sourceRoot || !manifestPath || !receiptPath) {
  console.error('Usage: node ingest-local-archive.js <source-root> <manifest.json> <receipt.json>');
  process.exit(2);
}

const result = ingestLocalArchive(sourceRoot);
for (const outputPath of [manifestPath, receiptPath]) mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(manifestPath, `${JSON.stringify(result.manifest, null, 2)}\n`, { encoding: 'utf8', flag: 'w' });
writeFileSync(receiptPath, `${JSON.stringify(result.receipt, null, 2)}\n`, { encoding: 'utf8', flag: 'w' });
console.log(JSON.stringify({
  vault_id: result.manifest.vault_id,
  asset_count: result.manifest.assets.length,
  schema_valid_count: result.receipt.schema_valid_count,
  schema_invalid_count: result.receipt.schema_invalid_count,
  readiness_assessment: result.receipt.readiness_assessment,
  generation_fallback: result.receipt.generation_fallback,
}, null, 2));
