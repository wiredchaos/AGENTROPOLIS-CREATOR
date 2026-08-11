import { requireValue } from './types.js';

export function calculatedHorizontalFov(lensMm, sensorWidthMm) {
  return (2 * Math.atan(sensorWidthMm / (2 * lensMm)) * 180) / Math.PI;
}

export function compileOptics(input, policy) {
  const optics = input.optics ?? {};
  const profileName = optics.profile ?? optics.lens_class;
  const profile = policy.optics.profiles[profileName];
  requireValue(profile, 'OPTICS_PROFILE', `Unknown optics profile ${profileName}.`);
  const focalLength = optics.focal_length_mm ?? optics.lens_mm ?? null;
  if (focalLength !== null) {
    requireValue(
      focalLength >= profile.minimum_lens_mm && focalLength <= profile.maximum_lens_mm,
      'LENS_POLICY',
      `${focalLength}mm is outside ${profileName} policy.`,
    );
  }

  const explicitFov = optics.field_of_view_degrees ?? optics.horizontal_fov_degrees ?? null;
  const explicitBasis = optics.field_of_view_basis ?? (optics.horizontal_fov_degrees !== undefined ? 'HORIZONTAL' : 'UNKNOWN');
  requireValue(
    ['DIAGONAL', 'HORIZONTAL', 'VERTICAL', 'UNKNOWN'].includes(explicitBasis),
    'FOV_BASIS',
    `Unsupported field-of-view basis ${explicitBasis}.`,
  );
  const sensor = optics.sensor_width_mm ?? null;
  const calculated = focalLength !== null && sensor !== null
    ? calculatedHorizontalFov(focalLength, sensor)
    : null;

  if (explicitFov !== null && calculated !== null && explicitBasis === 'HORIZONTAL') {
    requireValue(
      Math.abs(calculated - explicitFov) <= policy.optics.fov_tolerance_degrees,
      'FOV_CONSISTENCY',
      `Declared FOV ${explicitFov}° conflicts with ${focalLength}mm/${sensor}mm (${calculated.toFixed(2)}°).`,
    );
  }

  const fieldOfView = explicitFov ?? (calculated === null ? null : Number(calculated.toFixed(2)));
  const depthDefaults = policy.optics.behavior?.[profileName] ?? {};
  return {
    source_text: optics.source_text ?? null,
    field_of_view_degrees: fieldOfView,
    field_of_view_basis: explicitFov !== null ? explicitBasis : (calculated === null ? 'UNKNOWN' : 'HORIZONTAL'),
    lens_class: profileName,
    camera_distance: structuredClone(optics.camera_distance ?? 'UNKNOWN'),
    depth_behavior: optics.depth_behavior ?? depthDefaults.depth_behavior ?? 'REQUIRES_REVIEW',
    compression_behavior: optics.compression_behavior ?? depthDefaults.compression_behavior ?? 'REQUIRES_REVIEW',
    focal_length_mm: focalLength,
    profile: profileName,
    lens_mm: focalLength,
    sensor_width_mm: sensor,
    fov_source: explicitFov !== null ? 'EXPLICIT_SOURCE_VALUE' : (calculated === null ? 'REQUIRES_SENSOR_ASSUMPTION' : 'CALCULATED_FROM_KNOWN_SENSOR'),
    calculated_horizontal_fov_degrees: calculated === null ? null : Number(calculated.toFixed(2)),
  };
}
