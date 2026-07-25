const EXPORT_CAPABILITIES = new Set([
  'storyboard.export_board',
  'storyboard.export_animatic',
  'storyboard.export_pdf',
  'storyboard.export_shotlist'
])

const ANALYSIS_CAPABILITIES = new Set(['storyboard.describe_frame'])
const SHA256 = /^[a-fA-F0-9]{64}$/

/**
 * Deterministic, zero-dependency policy preflight.
 *
 * This function never contacts the upstream Storyboard Reference Studio,
 * resolves credentials, reads local files, or performs network activity.
 */
export function evaluateStoryboardPolicy(request) {
  const capability = request?.capability ?? 'unknown'

  if (!isNonEmptyString(request?.agentId)) {
    return blocked(capability, 'Missing agent identity.')
  }

  if (!isNonEmptyString(request?.mandateId)) {
    return blocked(capability, 'Missing mandate ID.')
  }

  if (!Array.isArray(request?.sourceMedia) || request.sourceMedia.length === 0) {
    return blocked(capability, 'No approved source media references supplied.')
  }

  for (const media of request.sourceMedia) {
    if (!isNonEmptyString(media?.workspaceRef) || !media.workspaceRef.startsWith('workspace://')) {
      return blocked(capability, 'Source media must use an approved workspace:// reference.')
    }

    if (!SHA256.test(media?.sha256 ?? '')) {
      return blocked(capability, 'Source media must include a valid SHA-256 hash.')
    }
  }

  if (request.rightsStatus === 'unknown' && ANALYSIS_CAPABILITIES.has(capability)) {
    return blocked(capability, 'Unknown rights status blocks external or model-assisted frame analysis.')
  }

  if (request.rightsStatus === 'unknown' && EXPORT_CAPABILITIES.has(capability)) {
    return blocked(capability, 'Unknown rights status blocks export or redistribution by default.')
  }

  if (request.publish === true && request.rightsStatus === 'unknown') {
    return blocked(capability, 'Unknown rights status blocks publication.')
  }

  if (request.publish === true && request.requireHumanReview !== true) {
    return blocked(capability, 'Publication requires human review.')
  }

  const route = request.modelRoute ?? 'offline-template'

  if (request.networkPolicy === 'local_only' && !isLocalRoute(route)) {
    return blocked(capability, 'Local-only policy forbids BYOK or cloud model routes.')
  }

  if (request.networkPolicy === 'byok') {
    if (!route.startsWith('approved-byok:')) {
      return blocked(capability, 'BYOK policy requires an approved-byok model route.')
    }
    if (request.providerApproved !== true) {
      return blocked(capability, 'BYOK provider route has not been approved.')
    }
  }

  if (request.networkPolicy === 'approved_cloud') {
    if (!route.startsWith('approved-cloud:')) {
      return blocked(capability, 'Approved-cloud policy requires an approved-cloud model route.')
    }
    if (request.providerApproved !== true) {
      return blocked(capability, 'Cloud provider route has not been approved.')
    }
  }

  if (request.frameBudget !== undefined && (!Number.isInteger(request.frameBudget) || request.frameBudget < 1 || request.frameBudget > 500)) {
    return blocked(capability, 'Frame budget must be an integer from 1 through 500.')
  }

  if (request.durationBudgetSeconds !== undefined && (!(request.durationBudgetSeconds > 0) || !Number.isFinite(request.durationBudgetSeconds))) {
    return blocked(capability, 'Duration budget must be a positive finite number.')
  }

  return {
    status: 'planning_only',
    capability,
    receiptRequired: true,
    transportInvoked: false,
    reason: 'Policy preflight passed. Upstream execution remains disabled pending governed transport activation.'
  }
}

function blocked(capability, reason) {
  return {
    status: 'blocked',
    capability,
    receiptRequired: true,
    transportInvoked: false,
    reason
  }
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function isLocalRoute(route) {
  return route === 'offline-template' || route.startsWith('local:')
}
