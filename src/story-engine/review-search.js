import { normalize } from './filters.js';

export const REVIEW_SEARCH_SCORE_WEIGHTS = Object.freeze({
  production_role_match: 0.25,
  local_family_match: 0.25,
  variant_match: 0.2,
  reference_tag_match: 0.15,
  local_context_match: 0.15,
});

function value(asset, field) {
  const metadata = asset?.[field];
  return metadata?.metadata_basis === 'FILENAME_DERIVED' ? metadata.value : null;
}

function values(asset, field) {
  const metadata = asset?.[field];
  return metadata?.metadata_basis === 'FILENAME_DERIVED' ? metadata.values ?? [] : [];
}

export function hasFilenameDerivedReviewMetadata(asset) {
  return asset?.production_role?.metadata_basis === 'FILENAME_DERIVED';
}

export function reviewSearchMetadata(asset) {
  if (!hasFilenameDerivedReviewMetadata(asset)) return null;
  return {
    metadata_basis: 'FILENAME_DERIVED',
    filename: asset.provider_metadata.filename,
    production_role: value(asset, 'production_role'),
    local_character_family: value(asset, 'local_character_family'),
    variant_labels: values(asset, 'variant_labels'),
    provisional_reference_tag: value(asset, 'provisional_reference_tag'),
    local_location_label: value(asset, 'local_location_label'),
    local_prop_label: value(asset, 'local_prop_label'),
    local_mech_label: value(asset, 'local_mech_label'),
    local_creature_label: value(asset, 'local_creature_label'),
    review_eligibility: asset.provider_metadata.review_eligibility,
    unresolved_human_review: {
      canon: asset.provider_metadata.canon,
      identity: asset.provider_metadata.identity,
      rights: asset.provider_metadata.rights,
      continuity: asset.provider_metadata.continuity,
      provider_asset_id: asset.provider_metadata.provider_asset_id,
    },
    generation_fallback: asset.provider_metadata.generation_fallback,
  };
}

function oneOf(actual, expected) {
  return expected.length === 0 || expected.some((item) => normalize(item) === normalize(actual));
}

function includesAll(actual, expected) {
  const normalized = new Set(actual.map(normalize));
  return expected.every((item) => normalized.has(normalize(item)));
}

export function sceneReviewConstraints(scene) {
  return {
    required_production_role: scene.required_production_role ?? null,
    required_local_character_family: scene.required_local_character_family ?? null,
    required_variant_labels: scene.required_variant_labels ?? [],
    preferred_variant_labels: scene.preferred_variant_labels ?? [],
    forbidden_variant_labels: scene.forbidden_variant_labels ?? [],
    required_reference_tags: scene.required_reference_tags ?? [],
    required_local_location_labels: scene.required_local_location_labels ?? [],
    required_local_prop_labels: scene.required_local_prop_labels ?? [],
    required_local_mech_labels: scene.required_local_mech_labels ?? [],
    required_local_creature_labels: scene.required_local_creature_labels ?? [],
  };
}

export function slotReviewConstraints(slot) {
  return {
    required_production_role: slot.role,
    required_local_character_family: slot.local_character_family ?? null,
    required_variant_labels: slot.variant_labels ?? [],
    preferred_variant_labels: slot.preferred_variant_labels ?? [],
    forbidden_variant_labels: slot.forbidden_variant_labels ?? [],
    required_reference_tags: slot.reference_tags ?? [],
    required_local_location_labels: slot.local_location_labels ?? [],
    required_local_prop_labels: slot.local_prop_labels ?? [],
    required_local_mech_labels: slot.local_mech_labels ?? [],
    required_local_creature_labels: slot.local_creature_labels ?? [],
  };
}

export function evaluateReviewPrefilter(asset, constraints) {
  const failures = [];
  const role = value(asset, 'production_role');
  const family = value(asset, 'local_character_family');
  const variants = values(asset, 'variant_labels');
  const referenceTag = value(asset, 'provisional_reference_tag');

  if (constraints.required_production_role && normalize(role) !== normalize(constraints.required_production_role)) {
    failures.push({
      code: 'PRODUCTION_ROLE_MISMATCH',
      explanation: `Required ${constraints.required_production_role}; filename-derived role is ${role ?? 'UNAVAILABLE'}.`,
    });
  }
  if (constraints.required_local_character_family && normalize(family) !== normalize(constraints.required_local_character_family)) {
    failures.push({
      code: 'LOCAL_CHARACTER_FAMILY_MISMATCH',
      explanation: `Required ${constraints.required_local_character_family}; filename-derived family is ${family ?? 'UNAVAILABLE'}.`,
    });
  }
  if (!includesAll(variants, constraints.required_variant_labels)) {
    failures.push({
      code: 'VARIANT_LABEL_MISMATCH',
      explanation: `Required [${constraints.required_variant_labels.join(', ')}]; filename-derived variants are [${variants.join(', ')}].`,
    });
  }
  const forbidden = constraints.forbidden_variant_labels ?? [];
  if (forbidden.some((item) => variants.some((actual) => normalize(actual) === normalize(item)))) {
    failures.push({
      code: 'VARIANT_LABEL_FORBIDDEN',
      explanation: `Forbidden variant labels [${forbidden.join(', ')}]; filename-derived variants are [${variants.join(', ')}].`,
    });
  }
  if (!oneOf(referenceTag, constraints.required_reference_tags)) {
    failures.push({
      code: 'REFERENCE_TAG_MISMATCH',
      explanation: `Required one of [${constraints.required_reference_tags.join(', ')}]; provisional tag is ${referenceTag ?? 'UNAVAILABLE'}.`,
    });
  }

  const contextChecks = [
    ['required_local_location_labels', 'local_location_label', 'LOCAL_LOCATION_LABEL_MISMATCH'],
    ['required_local_prop_labels', 'local_prop_label', 'LOCAL_PROP_LABEL_MISMATCH'],
    ['required_local_mech_labels', 'local_mech_label', 'LOCAL_MECH_LABEL_MISMATCH'],
    ['required_local_creature_labels', 'local_creature_label', 'LOCAL_CREATURE_LABEL_MISMATCH'],
  ];
  for (const [constraintField, assetField, code] of contextChecks) {
    if (!oneOf(value(asset, assetField), constraints[constraintField])) {
      failures.push({
        code,
        explanation: `Required one of [${constraints[constraintField].join(', ')}]; filename-derived label is ${value(asset, assetField) ?? 'UNAVAILABLE'}.`,
      });
    }
  }
  return failures;
}

function rejection(asset, failures) {
  return {
    asset_id: asset.asset_id,
    vault_id: asset.vault_id ?? null,
    source_provider: asset.rights?.source_provider ?? null,
    source_reference_id: asset.rights?.source_asset_reference_id ?? null,
    fixture: asset.provider_metadata?.fixture === true,
    failures,
  };
}

export function prefilterReviewAssets(scene, assets, constraints = sceneReviewConstraints(scene)) {
  if (scene.selection_mode !== 'REVIEW_SEARCH') return { eligible: [...assets], rejected: [] };
  const eligible = [];
  const rejected = [];
  for (const asset of assets) {
    const failures = evaluateReviewPrefilter(asset, constraints);
    if (failures.length > 0) rejected.push(rejection(asset, failures));
    else eligible.push(asset);
  }
  return { eligible, rejected };
}

export function scoreReviewSearch(asset, constraints) {
  const roleRequired = Boolean(constraints.required_production_role);
  const familyRequired = Boolean(constraints.required_local_character_family);
  const variantsRequired = constraints.required_variant_labels.length > 0;
  const variantsPreferred = (constraints.preferred_variant_labels ?? []).length > 0;
  const variantsConstrained = variantsRequired || variantsPreferred;
  const referencesRequired = constraints.required_reference_tags.length > 0;
  const contextRequired = [
    constraints.required_local_location_labels,
    constraints.required_local_prop_labels,
    constraints.required_local_mech_labels,
    constraints.required_local_creature_labels,
  ].some((items) => items.length > 0);
  const applicable = {
    production_role_match: roleRequired,
    local_family_match: familyRequired,
    variant_match: variantsConstrained,
    reference_tag_match: referencesRequired,
    local_context_match: contextRequired,
  };
  const activeWeight = Object.entries(applicable).reduce(
    (sum, [name, active]) => sum + (active ? REVIEW_SEARCH_SCORE_WEIGHTS[name] : 0),
    0,
  );
  const scoreByName = {
    production_role_match: !roleRequired || normalize(value(asset, 'production_role')) === normalize(constraints.required_production_role),
    local_family_match: !familyRequired || normalize(value(asset, 'local_character_family')) === normalize(constraints.required_local_character_family),
    variant_match: variantsRequired
      ? includesAll(values(asset, 'variant_labels'), constraints.required_variant_labels)
      : !variantsPreferred || constraints.preferred_variant_labels.some((preferred) =>
        values(asset, 'variant_labels').some((actual) => normalize(actual) === normalize(preferred)),
      ) || values(asset, 'variant_labels').length === 0,
    reference_tag_match: !referencesRequired || oneOf(value(asset, 'provisional_reference_tag'), constraints.required_reference_tags),
    local_context_match: !contextRequired || evaluateReviewPrefilter(asset, {
      required_production_role: null,
      required_local_character_family: null,
      required_variant_labels: [],
      preferred_variant_labels: [],
      forbidden_variant_labels: [],
      required_reference_tags: [],
      required_local_location_labels: constraints.required_local_location_labels,
      required_local_prop_labels: constraints.required_local_prop_labels,
      required_local_mech_labels: constraints.required_local_mech_labels,
      required_local_creature_labels: constraints.required_local_creature_labels,
    }).length === 0,
  };
  const dimensions = Object.keys(REVIEW_SEARCH_SCORE_WEIGHTS).map((dimension) => {
    const active = applicable[dimension];
    const weight = active && activeWeight > 0 ? REVIEW_SEARCH_SCORE_WEIGHTS[dimension] / activeWeight : 0;
    const score = active ? Number(scoreByName[dimension]) : 0;
    return {
      dimension,
      metadata_basis: 'FILENAME_DERIVED',
      applicable: active,
      score,
      weight: Number(weight.toFixed(6)),
      contribution: Number((score * weight).toFixed(6)),
    };
  });
  return {
    metadata_basis: 'FILENAME_DERIVED',
    total_score: Number(dimensions.reduce((sum, item) => sum + item.contribution, 0).toFixed(6)),
    score_dimensions: dimensions,
    truth_effect: 'REVIEW_ONLY_NO_VERIFICATION',
  };
}
