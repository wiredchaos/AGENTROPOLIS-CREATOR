import assetSchema from '../../data/higgsfield/assets.schema.json' with { type: 'json' };
import vaultsSchema from '../../data/higgsfield/vaults.schema.json' with { type: 'json' };
import { validateAgainstSchema } from './schema-validator.js';
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

function reviewAllowsUnresolved(scene, asset, field) {
  return (
    scene.selection_mode === 'REVIEW_SEARCH' &&
    ['VAULT_MANIFEST', 'HUMAN_VERIFIED_UI', 'HIGGSFIELD_PUBLIC_REFERENCE'].includes(
      asset.provider_metadata?.ingestion_method,
    ) &&
    asset.provider_metadata?.manifest_unresolved_fields?.includes(field)
  );
}

function indexedVaults(registry) {
  const records = Array.isArray(registry) ? registry : registry?.vaults ?? [];
  return new Map(records.map((vault) => [vault.vault_id, vault]));
}

function vaultReadinessGate(scene, asset, vault) {
  const fixture = asset.provider_metadata?.fixture === true;
  const registered = vault?.registration_status === 'REGISTERED';
  const matchReady = vault?.readiness_status === 'MATCH_READY';
  const evidence = vault?.readiness_evidence;
  const readinessProven =
    evidence?.enumeration_complete === true &&
    evidence?.normalization_complete === true &&
    evidence?.schema_validation_complete === true &&
    evidence?.assets_available === true &&
    evidence?.receipt_references?.length > 0;
  const fixtureReady =
    scene.selection_mode === 'FIXTURE_TEST' &&
    fixture &&
    vault?.fixture_mode === true &&
    vault?.provider === 'fixture' &&
    matchReady &&
    readinessProven;
  const reviewReady =
    scene.selection_mode === 'REVIEW_SEARCH' && !fixture && registered;
  const productionReady =
    scene.selection_mode === 'FINAL_PRODUCTION' &&
    !fixture &&
    vault?.fixture_mode === false &&
    matchReady &&
    readinessProven;
  return gate(
    fixtureReady || reviewReady || productionReady,
    'VAULT_READINESS',
    `selection_mode=${scene.selection_mode}; registration=${vault?.registration_status ?? 'MISSING'}; readiness=${vault?.readiness_status ?? 'MISSING'}; readiness_proven=${readinessProven}; fixture_mode=${vault?.fixture_mode ?? 'MISSING'}.`,
  );
}

function annotationIds(annotations) {
  return new Set((annotations ?? []).map(({ id }) => normalize(id)).filter(Boolean));
}

function identityGate(scene, asset) {
  const required = scene.identity_requirements;
  const groups = [
    ['characters', 'characters', required.canonical_character_ids, annotationIds(asset.characters)],
    ['factions', 'factions', required.canonical_faction_ids, annotationIds(asset.factions)],
    ['artifacts', 'artifacts', required.canonical_artifact_ids, annotationIds(asset.artifacts)],
    [
      'continuity identities',
      'continuity_identity_ids',
      required.continuity_locked_identity_ids,
      new Set(asset.continuity_identity_ids.map(normalize)),
    ],
  ];
  const missing = groups.flatMap(([name, field, expected, actual]) =>
    reviewAllowsUnresolved(scene, asset, field)
      ? []
      : expected.filter((id) => !actual.has(normalize(id))).map((id) => `${name}:${id}`),
  );
  return gate(
    missing.length === 0,
    'IDENTITY_COMPATIBILITY',
    `Missing canonical identities [${missing.join(', ')}].`,
  );
}

export function evaluateRightsEligibility(scene, asset, vault) {
  const rights = asset.rights;
  const source = asset['source_url/reference'];
  const stableProviderAssetId = asset.provider_metadata?.provider_asset_id ?? source.value;
  const sourceConsistent =
    normalize(rights.source_provider) === normalize(vault?.provider) &&
    normalize(rights.source_asset_reference_id) === normalize(stableProviderAssetId) &&
    rights.provenance_references.length > 0;
  const reviewSearch = scene.selection_mode === 'REVIEW_SEARCH';
  const productionUseAllowed =
    rights.allowed_production_uses.includes(scene.rights_requirement.production_use) &&
    rights.allowed_production_uses.includes(scene.output_use);
  const derivativeEligible =
    !scene.rights_requirement.derivative_edit_required ||
    rights.derivative_edit_eligibility === 'ELIGIBLE';
  const distributionEligible =
    !scene.rights_requirement.distribution_required ||
    rights.distribution_eligibility === 'ELIGIBLE';
  const approved = rights.rights_state === 'APPROVED';
  const policyEligible =
    sourceConsistent && approved && productionUseAllowed && derivativeEligible && distributionEligible;
  const fixture = asset.provider_metadata?.fixture === true;
  const finalSelectionEligible =
    policyEligible && !fixture && scene.selection_mode === 'FINAL_PRODUCTION';
  const fixturePolicyEligible = scene.selection_mode === 'FIXTURE_TEST' && fixture && policyEligible;
  return {
    source_consistent: sourceConsistent,
    rights_state: rights.rights_state,
    production_use_allowed: productionUseAllowed,
    derivative_edit_eligible: derivativeEligible,
    distribution_eligible: distributionEligible,
    policy_eligible: policyEligible,
    final_selection_eligible: finalSelectionEligible,
    gate_pass: sourceConsistent && (reviewSearch || fixturePolicyEligible || finalSelectionEligible),
  };
}

function rightsGate(scene, asset, vault) {
  const eligibility = evaluateRightsEligibility(scene, asset, vault);
  return gate(
    eligibility.gate_pass,
    'RIGHTS_ELIGIBILITY',
    `rights_state=${eligibility.rights_state}; source_consistent=${eligibility.source_consistent}; production_use_allowed=${eligibility.production_use_allowed}; derivative_edit_eligible=${eligibility.derivative_edit_eligible}; distribution_eligible=${eligibility.distribution_eligible}; policy_eligible=${eligibility.policy_eligible}; final_selection_eligible=${eligibility.final_selection_eligible}.`,
  );
}

function availableDuration(asset) {
  if (asset.segment) return asset.segment.end_seconds - asset.segment.start_seconds;
  return asset.duration;
}

function continuityGate(scene, asset) {
  if (reviewAllowsUnresolved(scene, asset, 'continuity_tags')) {
    return gate(true, 'CONTINUITY', 'Continuity is unresolved and retained for review search only.');
  }
  const actual = new Set((asset.continuity_tags ?? []).map(normalize));
  const missing = (scene.required_continuity_tags ?? []).filter((tag) => !actual.has(normalize(tag)));
  const forbidden = (scene.forbidden_continuity_tags ?? []).filter((tag) => actual.has(normalize(tag)));
  return gate(
    missing.length === 0 && forbidden.length === 0,
    'CONTINUITY',
    `Missing required tags [${missing.join(', ')}]; present forbidden tags [${forbidden.join(', ')}].`,
  );
}

function durationGate(scene, asset) {
  if (!scene.duration_requirement) return gate(true, 'DURATION', 'No duration constraint required.');
  if (reviewAllowsUnresolved(scene, asset, 'duration')) {
    return gate(true, 'DURATION', 'Duration is unresolved and retained for review search only.');
  }
  const requirement = scene.duration_requirement;
  const duration = availableDuration(asset);
  const pass =
    typeof duration === 'number' &&
    duration >= requirement.minimum_seconds &&
    duration <= requirement.maximum_seconds &&
    (requirement.segment_allowed || asset.segment === null);
  return gate(
    pass,
    'DURATION',
    `Available duration ${duration ?? 'unknown'}s must be within ${requirement.minimum_seconds}-${requirement.maximum_seconds}s; segment_allowed=${requirement.segment_allowed}.`,
  );
}

function audioGate(scene, asset) {
  const requirement = scene.audio_requirement;
  if (!requirement) return gate(true, 'AUDIO', 'No audio/dialogue constraint required.');
  if (reviewAllowsUnresolved(scene, asset, 'audio')) {
    return gate(true, 'AUDIO', 'Audio metadata is unresolved and retained for review search only.');
  }
  const audio = asset.dialogue_or_audio ?? {};
  const presencePass =
    !['REQUIRED', 'PROHIBITED'].includes(requirement.mode) ||
    (requirement.mode === 'REQUIRED' ? audio.present === true : audio.present === false);
  const prohibitedDialoguePass =
    requirement.mode !== 'PROHIBITED' ||
    (audio.transcript === null && (audio.speaker_ids ?? []).length === 0);
  const dialoguePass =
    requirement.exact_dialogue === null || normalize(audio.transcript) === normalize(requirement.exact_dialogue);
  const actualSpeakers = new Set((audio.speaker_ids ?? []).map(normalize));
  const speakersPass = requirement.speaker_ids.every((speaker) => actualSpeakers.has(normalize(speaker)));
  const rightsPass = !requirement.rights_approval_required || audio.rights_review === 'APPROVED';
  return gate(
    presencePass && prohibitedDialoguePass && dialoguePass && speakersPass && rightsPass,
    'AUDIO',
    `Required mode=${requirement.mode}, exact dialogue=${requirement.exact_dialogue !== null}, speakers=[${requirement.speaker_ids.join(', ')}], rights approval=${requirement.rights_approval_required}.`,
  );
}

function sourceGate(asset, vault) {
  const source = asset['source_url/reference'] ?? {};
  const fixture = asset.provider_metadata?.fixture === true;
  const fixtureConsistent =
    fixture
      ? asset.asset_id.startsWith('fixture-') && vault?.fixture_mode === true && vault?.provider === 'fixture'
      : !asset.asset_id.startsWith('fixture-') && vault?.fixture_mode === false && vault?.provider !== 'fixture';
  const pass =
    source.contains_secrets === false &&
    source.kind !== 'UNKNOWN' &&
    typeof source.value === 'string' &&
    source.value.trim().length > 0 &&
    fixtureConsistent;
  return gate(
    pass,
    'SOURCE_PROVENANCE',
    `Source kind=${source.kind ?? 'missing'}, stable value=${typeof source.value === 'string' && source.value.trim().length > 0}, contains_secrets=${source.contains_secrets ?? 'missing'}, fixture provenance consistent=${fixtureConsistent}.`,
  );
}

/** Return every fail-closed gate result so an editor can diagnose rejection. */
export function evaluateHardGates(scene, asset, vaultRegistry) {
  const schemaErrors = validateAgainstSchema(asset, assetSchema);
  if (schemaErrors.length > 0) {
    return [gate(false, 'ASSET_SCHEMA', schemaErrors.join(' '))];
  }

  const registryErrors = validateAgainstSchema(vaultRegistry, vaultsSchema);
  const vault = registryErrors.length === 0 ? indexedVaults(vaultRegistry).get(asset.vault_id) : undefined;
  const allowedStatuses = new Set(scene.canon_status_requirement);
  const assetStatuses = Object.values(asset.canon_status);
  const eligibilityField = OUTPUT_USE_ELIGIBILITY_FIELDS[scene.output_use];
  const eligibilityStatus = asset[eligibilityField]?.status ?? 'UNKNOWN';
  const allowedTruthStates = scene.truth_states_allowed;
  const canonUnresolved = reviewAllowsUnresolved(scene, asset, 'canon_status');
  const outputUseUnresolved = reviewAllowsUnresolved(scene, asset, 'output_use');

  return [
    vaultReadinessGate(scene, asset, vault),
    gate(
      eligibilityStatus === 'ELIGIBLE' ||
        (outputUseUnresolved && ['UNKNOWN', 'REVIEW_REQUIRED'].includes(eligibilityStatus)),
      'OUTPUT_USE',
      `${scene.output_use} maps to ${eligibilityField}=${eligibilityStatus}.`,
    ),
    gate(
      (canonUnresolved && assetStatuses.length === 0) ||
        (assetStatuses.length > 0 && assetStatuses.every((status) => allowedStatuses.has(status))),
      'CANON_STATUS',
      assetStatuses.length === 0
        ? 'Asset has no claim-level canon status.'
        : `Asset statuses [${assetStatuses.join(', ')}] must all be allowed.`,
    ),
    gate(
      annotationMatches(asset.world, scene.world) || reviewAllowsUnresolved(scene, asset, 'world'),
      'WORLD',
      `Required world “${scene.world}”; asset world “${asset.world?.label ?? 'unknown'}”.`,
    ),
    gate(
      annotationMatches(asset.era, scene.era) || reviewAllowsUnresolved(scene, asset, 'era'),
      'ERA',
      `Required era “${scene.era}”; asset era “${asset.era?.label ?? 'unknown'}”.`,
    ),
    gate(
      annotationMatches(asset.location, scene.location) ||
        reviewAllowsUnresolved(scene, asset, 'location'),
      'LOCATION',
      `Required location “${scene.location}”; asset location “${asset.location?.label ?? 'unknown'}”.`,
    ),
    gate(
      normalize(asset.studio_mode) === normalize(scene.studio_mode) ||
        reviewAllowsUnresolved(scene, asset, 'studio_mode'),
      'STUDIO_MODE',
      `Required studio mode ${scene.studio_mode}; asset studio mode ${asset.studio_mode}.`,
    ),
    identityGate(scene, asset),
    continuityGate(scene, asset),
    durationGate(scene, asset),
    gate(
      !allowedTruthStates ||
        allowedTruthStates.includes(asset.truth_state) ||
        reviewAllowsUnresolved(scene, asset, 'truth_state'),
      'TRUTH_STATE',
      allowedTruthStates
        ? `Truth state ${asset.truth_state} must be one of [${allowedTruthStates.join(', ')}].`
        : 'No truth-state constraint required.',
    ),
    audioGate(scene, asset),
    sourceGate(asset, vault),
    rightsGate(scene, asset, vault),
  ];
}

export function filterEligibleAssets(scene, assets, vaultRegistry) {
  const eligible = [];
  const rejected = [];

  for (const [index, asset] of assets.entries()) {
    const gates = evaluateHardGates(scene, asset, vaultRegistry);
    const failures = gates.filter((result) => !result.pass);
    if (failures.length === 0) {
      eligible.push({ asset, gates });
    } else {
      rejected.push({
        asset_id: typeof asset?.asset_id === 'string' ? asset.asset_id : `<invalid:${index}>`,
        vault_id: typeof asset?.vault_id === 'string' ? asset.vault_id : null,
        source_provider: asset?.rights?.source_provider ?? null,
        source_reference_id: asset?.rights?.source_asset_reference_id ?? null,
        fixture: asset?.provider_metadata?.fixture === true,
        failures: failures.map(({ code, explanation }) => ({ code, explanation })),
      });
    }
  }

  return { eligible, rejected };
}
