import { OUTPUT_USE_ELIGIBILITY_FIELDS } from './types.js';

export function normalize(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en-US');
}

function annotationTerms(annotation) {
  if (!annotation) return [];
  if (typeof annotation === 'string') return [normalize(annotation)];
  return [normalize(annotation.id), normalize(annotation.label)].filter(Boolean);
}

function annotationMatches(annotation, requirement) {
  const target = normalize(requirement);
  return target.length > 0 && annotationTerms(annotation).includes(target);
}

function gate(pass, code, explanation) {
  return { pass, code, explanation };
}

/** Return every fail-closed gate result so an editor can diagnose rejection. */
export function evaluateHardGates(scene, asset) {
  const allowedStatuses = new Set(
    (Array.isArray(scene.canon_status_requirement)
      ? scene.canon_status_requirement
      : [scene.canon_status_requirement]),
  );
  const assetStatuses = Object.values(asset.canon_status ?? {});
  const eligibilityField = OUTPUT_USE_ELIGIBILITY_FIELDS[scene.output_use];
  const eligibilityStatus = asset[eligibilityField]?.status ?? 'UNKNOWN';

  return [
    gate(
      assetStatuses.length > 0 && assetStatuses.every((status) => allowedStatuses.has(status)),
      'CANON_STATUS',
      assetStatuses.length === 0
        ? 'Asset has no claim-level canon status.'
        : `Asset statuses [${assetStatuses.join(', ')}] must all be allowed.`,
    ),
    gate(
      annotationMatches(asset.world, scene.world),
      'WORLD',
      `Required world “${scene.world}”; asset world “${asset.world?.label ?? 'unknown'}”.`,
    ),
    gate(
      annotationMatches(asset.era, scene.era),
      'ERA',
      `Required era “${scene.era}”; asset era “${asset.era?.label ?? 'unknown'}”.`,
    ),
    gate(
      annotationMatches(asset.location, scene.location),
      'LOCATION',
      `Required location “${scene.location}”; asset location “${asset.location?.label ?? 'unknown'}”.`,
    ),
    gate(
      eligibilityStatus === 'ELIGIBLE',
      'OUTPUT_USE',
      `${scene.output_use} maps to ${eligibilityField}=${eligibilityStatus}.`,
    ),
  ];
}

export function filterEligibleAssets(scene, assets) {
  const eligible = [];
  const rejected = [];

  for (const asset of assets) {
    const gates = evaluateHardGates(scene, asset);
    const failures = gates.filter((result) => !result.pass);
    if (failures.length === 0) {
      eligible.push({ asset, gates });
    } else {
      rejected.push({
        asset_id: asset.asset_id,
        failures: failures.map(({ code, explanation }) => ({ code, explanation })),
      });
    }
  }

  return { eligible, rejected };
}
