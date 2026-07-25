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

export interface SourceMediaReference {
  workspaceRef: string
  sha256: string
  label?: string
}

export interface StoryboardExecutionRequest {
  agentId: string
  mandateId: string
  capability: StoryboardCapability
  sourceMedia: SourceMediaReference[]
  rightsStatus: 'user_owned' | 'licensed' | 'public_domain' | 'unknown'
  privacyClass: 'local' | 'restricted' | 'public'
  networkPolicy: 'local_only' | 'byok' | 'approved_cloud'
  modelRoute?: string
  providerApproved?: boolean
  frameBudget?: number
  durationBudgetSeconds?: number
  outputs: Array<
    | 'board_package'
    | 'animatic_mp4'
    | 'storyboard_pdf'
    | 'shot_list_csv'
    | 'prompt_manifest'
    | 'receipt'
  >
  requireHumanReview: boolean
  publish: boolean
  params?: Record<string, unknown>
}

export interface MandateDecision {
  allowed: boolean
  mandateId: string
  capability: StoryboardCapability
  reason?: string
  expiresAt?: string
}

export interface WorkspaceDecision {
  allowed: boolean
  resolvedRefs: Array<{
    workspaceRef: string
    opaqueLocalHandle: string
    sha256: string
  }>
  reason?: string
}

export interface BudgetDecision {
  allowed: boolean
  maxFrames: number
  maxDurationSeconds: number
  maxEstimatedCostUsd: number
  reason?: string
}

export interface SecretReferenceDecision {
  allowed: boolean
  provider?: string
  secretRef?: string
  reason?: string
}

export interface ReceiptDraft {
  receiptVersion: '1.0'
  agentId: string
  mandateId: string
  capability: StoryboardCapability
  sourceMediaHashes: string[]
  rightsStatus: StoryboardExecutionRequest['rightsStatus']
  privacyClass: StoryboardExecutionRequest['privacyClass']
  networkPolicy: StoryboardExecutionRequest['networkPolicy']
  modelRoute: string | null
  provider: string | null
  estimatedCost: number
  outputs: Array<{ kind: string; artifactRef: string; sha256: string }>
  status: 'blocked' | 'planning_only' | 'ready_for_transport' | 'failed'
  reason: string
}

export interface MandateVerifier {
  verify(request: StoryboardExecutionRequest): Promise<MandateDecision>
}

export interface WorkspaceAuthorizer {
  authorize(request: StoryboardExecutionRequest): Promise<WorkspaceDecision>
}

export interface BudgetAuthorizer {
  authorize(request: StoryboardExecutionRequest): Promise<BudgetDecision>
}

export interface SecretReferenceResolver {
  resolve(request: StoryboardExecutionRequest): Promise<SecretReferenceDecision>
}

export interface ReceiptStore {
  persist(receipt: ReceiptDraft): Promise<{ receiptRef: string }>
}

export interface StoryboardTransport {
  invoke(
    request: StoryboardExecutionRequest,
    context: {
      mandate: MandateDecision
      workspace: WorkspaceDecision
      budget: BudgetDecision
      secret: SecretReferenceDecision
      receiptRef: string
    }
  ): Promise<never>
}

/**
 * The transport method intentionally returns Promise<never> in this phase.
 * No implementation may be registered until AGENTROPOLIS-AGENT-MCP owns the
 * mandate, workspace, budget, secret, receipt, and review boundaries.
 */
export class DisabledStoryboardTransport implements StoryboardTransport {
  async invoke(): Promise<never> {
    throw new Error('Storyboard upstream transport is disabled by governance policy.')
  }
}

export interface ExecutionBoundaryDependencies {
  mandates: MandateVerifier
  workspaces: WorkspaceAuthorizer
  budgets: BudgetAuthorizer
  secrets: SecretReferenceResolver
  receipts: ReceiptStore
  transport: StoryboardTransport
}

export async function prepareStoryboardExecution(
  request: StoryboardExecutionRequest,
  deps: ExecutionBoundaryDependencies
): Promise<{ status: 'blocked' | 'ready_for_transport'; receiptRef: string; reason: string }> {
  const mandate = await deps.mandates.verify(request)
  if (!mandate.allowed) return persistBlocked(request, deps.receipts, mandate.reason ?? 'Mandate denied.')

  const workspace = await deps.workspaces.authorize(request)
  if (!workspace.allowed) return persistBlocked(request, deps.receipts, workspace.reason ?? 'Workspace denied.')

  const budget = await deps.budgets.authorize(request)
  if (!budget.allowed) return persistBlocked(request, deps.receipts, budget.reason ?? 'Budget denied.')

  const secret = await deps.secrets.resolve(request)
  if (!secret.allowed) return persistBlocked(request, deps.receipts, secret.reason ?? 'Provider secret route denied.')

  const receipt = baseReceipt(request, 'ready_for_transport', 'Execution boundary passed; transport remains disabled.')
  const { receiptRef } = await deps.receipts.persist(receipt)

  return {
    status: 'ready_for_transport',
    receiptRef,
    reason: receipt.reason
  }
}

async function persistBlocked(
  request: StoryboardExecutionRequest,
  receipts: ReceiptStore,
  reason: string
): Promise<{ status: 'blocked'; receiptRef: string; reason: string }> {
  const receipt = baseReceipt(request, 'blocked', reason)
  const { receiptRef } = await receipts.persist(receipt)
  return { status: 'blocked', receiptRef, reason }
}

function baseReceipt(
  request: StoryboardExecutionRequest,
  status: ReceiptDraft['status'],
  reason: string
): ReceiptDraft {
  return {
    receiptVersion: '1.0',
    agentId: request.agentId,
    mandateId: request.mandateId,
    capability: request.capability,
    sourceMediaHashes: request.sourceMedia.map((item) => item.sha256),
    rightsStatus: request.rightsStatus,
    privacyClass: request.privacyClass,
    networkPolicy: request.networkPolicy,
    modelRoute: request.modelRoute ?? null,
    provider: providerFromRoute(request.modelRoute),
    estimatedCost: 0,
    outputs: [],
    status,
    reason
  }
}

function providerFromRoute(route?: string): string | null {
  if (!route || route === 'offline-template' || route.startsWith('local:')) return null
  const separator = route.indexOf(':')
  if (separator === -1) return null
  return route.slice(separator + 1).split('/')[0] || null
}
