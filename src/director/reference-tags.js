import { PRODUCTION_CONTRACT_VERSION } from '../production-contract.js';
import { requireValue } from './types.js';

export const REFERENCE_TYPES = Object.freeze({
  char: 'CHARACTER', loc: 'LOCATION', prop: 'PROP', veh: 'VEHICLE',
  mech: 'MECH', creature: 'CREATURE', audio: 'AUDIO', other: 'OTHER',
});

const TAG_PATTERN = /^@(char|loc|prop|veh|mech|creature|audio|other)_([A-Za-z0-9]+)_([A-Za-z0-9][A-Za-z0-9_%\-]*?)$/u;
const VERSION_PATTERN = /_v([1-9][0-9]*)$/u;
const SCENE_SCOPE_PATTERN = /_s([1-9][0-9]*)(?:-([1-9][0-9]*))?$/u;
const VALID_ESCAPE_PATTERN = /%(?:25|5F)/gu;

function decodeReferenceName(encoded, rawTag) {
  for (const escape of encoded.match(/%[0-9A-Fa-f]{2}|%/gu) ?? []) {
    requireValue(VALID_ESCAPE_PATTERN.test(escape.toUpperCase()), 'REFERENCE_TAG_ESCAPE', `Unsupported or malformed escape ${escape} in ${rawTag}.`);
    VALID_ESCAPE_PATTERN.lastIndex = 0;
  }
  return encoded.replaceAll(/%5F/giu, '_').replaceAll(/%25/giu, '%');
}

/**
 * Parse a canonical production reference tag. Literal underscores that would
 * create a terminal _sN, _sN-M, or _vN name suffix must be encoded as %5F.
 */
export function parseReferenceTag(rawTag) {
  requireValue(typeof rawTag === 'string', 'REFERENCE_TAG', 'Reference tag must be a string.');
  const match = TAG_PATTERN.exec(rawTag);
  requireValue(match, 'REFERENCE_TAG', `Invalid canonical reference tag ${rawTag}.`);
  const [, prefix, projectCode, rawTail] = match;
  let tail = rawTail;
  let version = null;
  let sceneScope = null;

  const versionMatch = VERSION_PATTERN.exec(tail);
  if (versionMatch) {
    version = `v${versionMatch[1]}`;
    tail = tail.slice(0, versionMatch.index);
  }
  const scopeMatch = SCENE_SCOPE_PATTERN.exec(tail);
  if (scopeMatch) {
    const first = Number(scopeMatch[1]);
    const last = scopeMatch[2] ? Number(scopeMatch[2]) : first;
    requireValue(last >= first, 'REFERENCE_TAG_SCOPE', `Invalid descending scene scope in ${rawTag}.`);
    sceneScope = scopeMatch[2] ? `s${first}-${last}` : `s${first}`;
    tail = tail.slice(0, scopeMatch.index);
  }
  requireValue(tail.length > 0, 'REFERENCE_TAG_NAME', `Reference name is missing in ${rawTag}.`);
  const referenceName = decodeReferenceName(tail, rawTag);

  return {
    production_contract_version: PRODUCTION_CONTRACT_VERSION,
    reference_type: REFERENCE_TYPES[prefix],
    project_code: projectCode,
    reference_name: referenceName,
    reference_name_raw: tail,
    reference_name_encoding: tail === referenceName ? 'PLAIN' : 'PERCENT_ESCAPED',
    scene_scope: sceneScope,
    version,
    raw_tag: rawTag,
  };
}

export function normalizeReference(reference) {
  const parsed = parseReferenceTag(reference.tag);
  for (const field of ['scene_scope', 'version']) {
    if (parsed[field] !== null) {
      requireValue(
        reference[field] === parsed[field],
        'REFERENCE_TAG_AMBIGUITY',
        `${reference.tag} must explicitly confirm parsed ${field}=${parsed[field]}; escape a literal reserved-looking name suffix instead.`,
      );
    } else if (reference[field] !== undefined && reference[field] !== null) {
      requireValue(false, 'REFERENCE_TAG_AMBIGUITY', `${reference.tag} does not encode declared ${field}=${reference[field]}.`);
    }
  }
  if (reference.reference_name !== undefined) {
    requireValue(reference.reference_name === parsed.reference_name, 'REFERENCE_TAG_AMBIGUITY', `Declared name does not match escaped tag ${reference.tag}.`);
  }
  if (reference.role !== undefined) {
    requireValue(reference.role === parsed.reference_type, 'REFERENCE_ROLE', `${reference.tag} declares ${parsed.reference_type}, not ${reference.role}.`);
  }
  return { ...structuredClone(reference), ...parsed, tag: parsed.raw_tag };
}
