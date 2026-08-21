/**
 * AGENTROPOLIS-CREATOR — creative package adapter
 *
 * Converts the CREATOR-owned native creative package (version-addressable
 * refs) into the FILM DISTRICT bridge contract
 * (AGENTROPOLIS-FILM-DISTRICT/contracts/creator-to-asbe.schema.json).
 *
 * This resolves the Phase-1 pending architecture decisions M3 (creative
 * package -> ASBE scene/shot mapping) and M4 (prompt versioning + hashing)
 * at the district boundary: the adapter materializes the inline
 * prompt_version {version, prompt_hash} and shot_plan required by the
 * bridge schema from CREATOR's canonical package refs.
 *
 * Pure functions only — file resolution and hashing happen at the caller
 * (see creative-package-adapter.test.ts).
 */

export interface VersionedRef {
  id: string;
  version: string;
}

export interface CreativePackageSpec {
  duration_seconds: number;
  aspect_ratio: string;
  resolution: string;
  fps: number;
  platform: string;
  delivery_format: string;
}

export interface CreativeBeat {
  time: string;
  description: string;
  visual?: string;
  audio?: string;
}

export interface ContinuityBible {
  characters?: Record<string, unknown>;
  locations?: Record<string, unknown>;
  props?: Record<string, unknown>;
  style_rules?: string[];
  never_change?: string[];
}

export interface CreativePackage {
  package_id: string;
  package_version: string;
  brief_id: string;
  route: string;
  campaign_ref: VersionedRef;
  prompt_package_ref: VersionedRef & { canonical_content_hash: string };
  visual_canon_ref: VersionedRef;
  spec: CreativePackageSpec;
  beats: CreativeBeat[];
  copy: string;
  technique: string;
  negatives: string;
  continuity_bible: ContinuityBible;
  shot_plan_ref: VersionedRef;
  storyboard_refs: VersionedRef[];
  asset_hashes: Record<string, string>;
  distribution_targets: string[];
  asbe_scene_ref?: string;
  asbe_shot_ref?: string;
}

export interface DistrictShot {
  id: string;
  order: number;
  description?: string;
}

export interface DistrictStoryboard {
  shot_id?: string;
  asset_path?: string;
  camera_notes?: string;
}

export interface CampaignVariant {
  variant_id: string;
  target: string;
  notes?: string;
}

/** Resolved refs the adapter materializes inline for the bridge packet. */
export interface ResolvedRefs {
  shot_plan: DistrictShot[];
  storyboards?: DistrictStoryboard[];
  campaign_variants?: CampaignVariant[];
}

/** Prompt identity materialized from the canonical prompt package. */
export interface ResolvedPrompt {
  version: string;
  hash: string;
  text_path: string;
}

/** Shape of the FILM DISTRICT bridge contract (creator-to-asbe.schema.json). */
export interface DistrictBridgePackage {
  brief_id: string;
  route: string;
  spec: CreativePackageSpec;
  beats: CreativeBeat[];
  copy: string;
  technique: string;
  negatives: string;
  continuity_bible: ContinuityBible;
  prompt_version: { version: string; prompt_hash: string; prompt_text_path?: string };
  asset_hashes: Record<string, string>;
  shot_plan: DistrictShot[];
  storyboards?: DistrictStoryboard[];
  campaign_variants?: CampaignVariant[];
  distribution_targets: string[];
  asbe_scene_ref?: string;
  asbe_shot_ref?: string;
}

export function toDistrictBridge(
  pkg: CreativePackage,
  resolved: ResolvedRefs,
  prompt: ResolvedPrompt,
): DistrictBridgePackage {
  if (!pkg || !resolved || !resolved.shot_plan || resolved.shot_plan.length === 0) {
    throw new Error('creative-package adapter: resolved shot_plan is required');
  }
  if (!prompt || !prompt.hash || !/^[a-f0-9]{64}$/.test(prompt.hash)) {
    throw new Error('creative-package adapter: prompt hash must be a 64-char hex SHA-256');
  }
  const bridge: DistrictBridgePackage = {
    brief_id: pkg.brief_id,
    route: pkg.route,
    spec: pkg.spec,
    beats: pkg.beats,
    copy: pkg.copy,
    technique: pkg.technique,
    negatives: pkg.negatives,
    continuity_bible: pkg.continuity_bible,
    prompt_version: {
      version: prompt.version,
      prompt_hash: prompt.hash,
      prompt_text_path: prompt.text_path,
    },
    asset_hashes: pkg.asset_hashes ?? {},
    shot_plan: resolved.shot_plan,
    distribution_targets: pkg.distribution_targets,
  };
  if (resolved.storyboards && resolved.storyboards.length > 0) {
    bridge.storyboards = resolved.storyboards;
  }
  if (resolved.campaign_variants && resolved.campaign_variants.length > 0) {
    bridge.campaign_variants = resolved.campaign_variants;
  }
  if (pkg.asbe_scene_ref) bridge.asbe_scene_ref = pkg.asbe_scene_ref;
  if (pkg.asbe_shot_ref) bridge.asbe_shot_ref = pkg.asbe_shot_ref;
  return bridge;
}
