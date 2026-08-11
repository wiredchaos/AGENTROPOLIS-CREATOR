/** Provider-neutral, read-only local archive indexing. */
import { ingestLocalArchive } from './higgsfield/local-asset-adapter.js';

export const LOCAL_ARCHIVE_NORMALIZER_VERSION = '1.0.0';

export function normalizeLocalCollection(sourceRoot, options = {}) {
  if (!sourceRoot) throw new TypeError('sourceRoot is required');
  if (!options.vaultId) throw new TypeError('vaultId is required');
  if (!options.provider) throw new TypeError('provider is required');
  if (!options.sourceClass) throw new TypeError('sourceClass is required');
  const result = ingestLocalArchive(sourceRoot, {
    ...options,
    generic: true,
    projectCode: options.projectCode ?? 'LOCAL',
    readinessAssessment: options.readinessAssessment ?? 'LOCAL_INDEX_READY_CANDIDATE',
  });
  result.manifest.normalizer_version = LOCAL_ARCHIVE_NORMALIZER_VERSION;
  result.manifest.source_class = options.sourceClass;
  result.manifest.ownership_basis = options.ownershipBasis ?? null;
  result.receipt.normalizer_version = LOCAL_ARCHIVE_NORMALIZER_VERSION;
  result.receipt.source_class = options.sourceClass;
  result.receipt.ownership_basis = options.ownershipBasis ?? null;
  result.receipt.readiness_assessment = options.readinessAssessment ?? 'LOCAL_INDEX_READY_CANDIDATE';
  return result;
}
