import { readFile, rename, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { mergeInboxIntoManifest } from './inbox-import.js';

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith('--') || value === undefined) {
      throw new TypeError('Expected --input, --manifest, and --receipts arguments.');
    }
    args[key.slice(2)] = value;
  }
  for (const required of ['input', 'manifest', 'receipts']) {
    if (!args[required]) throw new TypeError(`Missing --${required}.`);
  }
  return args;
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function atomicJsonWrite(path, value) {
  const temporary = `${path}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
  await rename(temporary, path);
}

const args = parseArgs(process.argv.slice(2));
const inputPath = resolve(args.input);
const manifestPath = resolve(args.manifest);
const receiptsDirectory = resolve(args.receipts);
const ingestionTimestamp = new Date().toISOString();
const result = await mergeInboxIntoManifest(await readJson(inputPath), await readJson(manifestPath), {
  ingestionTimestamp,
  localPathBase: process.cwd(),
});

const receiptName = `${basename(manifestPath, '.manifest.json')}.${ingestionTimestamp.replaceAll(':', '-')}.receipt.json`;
const receiptPath = join(receiptsDirectory, receiptName);
await atomicJsonWrite(manifestPath, result.manifest);
await atomicJsonWrite(receiptPath, result.receipt);

process.stdout.write(
  `${JSON.stringify({
    manifest: manifestPath,
    receipt: receiptPath,
    ...result.receipt.inbox_import,
    readiness_assessment: result.receipt.readiness_assessment,
    generation_fallback: result.receipt.generation_fallback,
  }, null, 2)}\n`,
);
