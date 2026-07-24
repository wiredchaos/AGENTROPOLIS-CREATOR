export type StoryboardCapability =
  | 'storyboard.get_state'
  | 'storyboard.add_frame'
  | 'storyboard.auto_board'
  | 'storyboard.set_label'
  | 'storyboard.set_crop'
  | 'storyboard.describe_frame'
  | 'storyboard.extract_frame'
  | 'storyboard.set_frame_duration'
  | 'storyboard.set_shot_meta'
  | 'storyboard.add_annotation'
  | 'storyboard.clear_annotations'
  | 'storyboard.export_board'
  | 'storyboard.export_animatic'
  | 'storyboard.export_pdf'
  | 'storyboard.export_shotlist'

export interface GovernedStoryboardRequest {
  agentId: string
  mandateId: string
  capability: StoryboardCapability
  rightsStatus: 'user_owned' | 'licensed' | 'public_domain' | 'unknown'
  privacyClass: 'local' | 'restricted' | 'public'
  networkPolicy: 'local_only' | 'byok' | 'approved_cloud'
  workspaceRefs: string[]
  params?: Record<string, unknown>
}

export interface GovernedStoryboardResult {
  status: 'planning_only' | 'blocked'
  capability: StoryboardCapability
  receiptRequired: true
  reason: string
}

/**
 * Non-executing integration boundary for Storyboard Reference Studio.
 *
 * The upstream localhost MCP server is intentionally not contacted here.
 * Execution must remain disabled until AGENTROPOLIS-AGENT-MCP supplies:
 * identity verification, mandate validation, capability scope, workspace
 * allowlisting, rights/privacy policy, network policy, budgets, secret
 * resolution, receipt persistence, and human-review requirements.
 */
export async function invokeStoryboardCapability(
  request: GovernedStoryboardRequest
): Promise<GovernedStoryboardResult> {
  if (!request.agentId.trim()) {
    return blocked(request.capability, 'Missing agent identity.')
  }

  if (!request.mandateId.trim()) {
    return blocked(request.capability, 'Missing mandate ID.')
  }

  if (request.workspaceRefs.length === 0) {
    return blocked(request.capability, 'No approved source workspace references supplied.')
  }

  if (request.rightsStatus === 'unknown' && isRedistributionCapability(request.capability)) {
    return blocked(
      request.capability,
      'Unknown rights status blocks export or redistribution by default.'
    )
  }

  return {
    status: 'planning_only',
    capability: request.capability,
    receiptRequired: true,
    reason:
      'Upstream execution is disabled until the governed MCP membrane and update strategy are approved.'
  }
}

function blocked(capability: StoryboardCapability, reason: string): GovernedStoryboardResult {
  return {
    status: 'blocked',
    capability,
    receiptRequired: true,
    reason
  }
}

function isRedistributionCapability(capability: StoryboardCapability): boolean {
  return capability.startsWith('storyboard.export_')
}
