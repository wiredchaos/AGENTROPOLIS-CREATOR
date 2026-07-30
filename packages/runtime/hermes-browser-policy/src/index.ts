export type BrowserMode =
  | 'observe'
  | 'propose'
  | 'execute_with_approval'
  | 'bounded_batch';

export type ActionClass =
  | 'read'
  | 'draft'
  | 'submit'
  | 'publish'
  | 'upload'
  | 'download'
  | 'install'
  | 'destructive'
  | 'financial'
  | 'identity'
  | 'exfiltration';

export interface BrowserTaskContract {
  taskId: string;
  requestedBy: 'human';
  operator: 'hermes-browser-operator';
  mode: BrowserMode;
  objective: string;
  allowedDomains: string[];
  blockedDomains?: string[];
  allowedActions: ActionClass[];
  blockedActions?: ActionClass[];
  session: {
    profile: string;
    reusePersonalSession: false;
    retainCookies: boolean;
  };
  credentials: {
    mode: 'byok';
    secretValuesVisibleToAgent: false;
    requiredSecretRefs?: string[];
  };
  limits: {
    maxSteps: number;
    maxSubmissions: number;
    maxDownloads: number;
    maxUploads: number;
    timeoutMinutes: number;
  };
  evidence: {
    captureBefore: boolean;
    captureAfter: boolean;
    redactSensitiveFields: boolean;
  };
  memory: {
    writeMode: 'disabled' | 'review_required';
    storeRawPageContent: false;
  };
}

export interface BrowserActionRequest {
  actionId: string;
  url: string;
  actionClass: ActionClass;
  description: string;
  approved: boolean;
  counters: {
    steps: number;
    submissions: number;
    downloads: number;
    uploads: number;
  };
  bridge: {
    sourceVerified: boolean;
    permissionsReviewed: boolean;
    isolatedProfile: boolean;
    connected: boolean;
  };
  evidenceReady: {
    before: boolean;
    afterCapable: boolean;
  };
}

export type DecisionCode =
  | 'allow'
  | 'approval_required'
  | 'blocked_contract_invalid'
  | 'blocked_domain'
  | 'blocked_action'
  | 'blocked_mode'
  | 'blocked_bridge'
  | 'blocked_personal_profile'
  | 'blocked_limit'
  | 'blocked_evidence'
  | 'blocked_hard_class';

export interface PolicyDecision {
  allowed: boolean;
  code: DecisionCode;
  reasons: string[];
  requiresHumanApproval: boolean;
}

const HARD_BLOCKED = new Set<ActionClass>([
  'financial',
  'identity',
  'exfiltration',
]);

const CONSEQUENCE_ACTIONS = new Set<ActionClass>([
  'submit',
  'publish',
  'upload',
  'download',
  'install',
  'destructive',
]);

function normalizeHost(value: string): string {
  const host = value.trim().toLowerCase().replace(/^\.+/, '');
  if (!host) throw new Error('domain cannot be empty');
  return host;
}

function hostMatches(host: string, rule: string): boolean {
  const normalized = normalizeHost(rule);
  return host === normalized || host.endsWith(`.${normalized}`);
}

function getHost(url: string): string {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(`unsupported protocol: ${parsed.protocol}`);
  }
  return parsed.hostname.toLowerCase();
}

export function validateContract(contract: BrowserTaskContract): string[] {
  const errors: string[] = [];

  if (!contract.taskId.trim()) errors.push('taskId is required');
  if (!contract.objective.trim()) errors.push('objective is required');
  if (contract.allowedDomains.length === 0) errors.push('at least one allowed domain is required');
  if (contract.session.reusePersonalSession !== false) errors.push('personal browser sessions are forbidden');
  if (contract.credentials.mode !== 'byok') errors.push('credentials must use BYOK mode');
  if (contract.credentials.secretValuesVisibleToAgent !== false) errors.push('secret values must remain hidden');
  if (contract.memory.storeRawPageContent !== false) errors.push('raw page persistence is forbidden');

  for (const [name, value] of Object.entries(contract.limits)) {
    if (!Number.isInteger(value) || value < 0) errors.push(`${name} must be a non-negative integer`);
  }

  return errors;
}

export function evaluateBrowserAction(
  contract: BrowserTaskContract,
  request: BrowserActionRequest,
): PolicyDecision {
  const contractErrors = validateContract(contract);
  if (contractErrors.length > 0) {
    return {
      allowed: false,
      code: 'blocked_contract_invalid',
      reasons: contractErrors,
      requiresHumanApproval: false,
    };
  }

  if (!request.bridge.isolatedProfile) {
    return {
      allowed: false,
      code: 'blocked_personal_profile',
      reasons: ['browser automation must use an isolated profile'],
      requiresHumanApproval: false,
    };
  }

  if (!request.bridge.connected || !request.bridge.sourceVerified || !request.bridge.permissionsReviewed) {
    return {
      allowed: false,
      code: 'blocked_bridge',
      reasons: ['browser bridge is disconnected, unverified, or has unreviewed permissions'],
      requiresHumanApproval: false,
    };
  }

  let host: string;
  try {
    host = getHost(request.url);
  } catch (error) {
    return {
      allowed: false,
      code: 'blocked_domain',
      reasons: [error instanceof Error ? error.message : 'invalid URL'],
      requiresHumanApproval: false,
    };
  }

  const blockedDomain = (contract.blockedDomains ?? []).some((rule) => hostMatches(host, rule));
  const allowedDomain = contract.allowedDomains.some((rule) => hostMatches(host, rule));
  if (blockedDomain || !allowedDomain) {
    return {
      allowed: false,
      code: 'blocked_domain',
      reasons: [`domain ${host} is outside the approved boundary`],
      requiresHumanApproval: false,
    };
  }

  if (HARD_BLOCKED.has(request.actionClass)) {
    return {
      allowed: false,
      code: 'blocked_hard_class',
      reasons: [`${request.actionClass} actions require a dedicated policy outside the general browser operator`],
      requiresHumanApproval: false,
    };
  }

  if ((contract.blockedActions ?? []).includes(request.actionClass) || !contract.allowedActions.includes(request.actionClass)) {
    return {
      allowed: false,
      code: 'blocked_action',
      reasons: [`action class ${request.actionClass} is not allowed by the task contract`],
      requiresHumanApproval: false,
    };
  }

  const isConsequential = CONSEQUENCE_ACTIONS.has(request.actionClass);
  if (contract.mode === 'observe' && request.actionClass !== 'read') {
    return { allowed: false, code: 'blocked_mode', reasons: ['observe mode permits read actions only'], requiresHumanApproval: false };
  }
  if (contract.mode === 'propose' && !['read', 'draft'].includes(request.actionClass)) {
    return { allowed: false, code: 'blocked_mode', reasons: ['propose mode permits read and draft actions only'], requiresHumanApproval: false };
  }

  if (request.counters.steps >= contract.limits.maxSteps) {
    return { allowed: false, code: 'blocked_limit', reasons: ['maximum step count reached'], requiresHumanApproval: false };
  }
  if (request.actionClass === 'submit' && request.counters.submissions >= contract.limits.maxSubmissions) {
    return { allowed: false, code: 'blocked_limit', reasons: ['maximum submission count reached'], requiresHumanApproval: false };
  }
  if (request.actionClass === 'download' && request.counters.downloads >= contract.limits.maxDownloads) {
    return { allowed: false, code: 'blocked_limit', reasons: ['maximum download count reached'], requiresHumanApproval: false };
  }
  if (request.actionClass === 'upload' && request.counters.uploads >= contract.limits.maxUploads) {
    return { allowed: false, code: 'blocked_limit', reasons: ['maximum upload count reached'], requiresHumanApproval: false };
  }

  if (isConsequential && (!request.evidenceReady.before || !request.evidenceReady.afterCapable)) {
    return {
      allowed: false,
      code: 'blocked_evidence',
      reasons: ['consequential actions require before evidence and after-capture capability'],
      requiresHumanApproval: false,
    };
  }

  if (isConsequential && !request.approved) {
    return {
      allowed: false,
      code: 'approval_required',
      reasons: ['exact human approval is required for this consequential action'],
      requiresHumanApproval: true,
    };
  }

  return {
    allowed: true,
    code: 'allow',
    reasons: ['action is inside the contract boundary'],
    requiresHumanApproval: false,
  };
}

export interface ExecutionReceipt {
  taskId: string;
  actionId: string;
  decision: PolicyDecision;
  url: string;
  actionClass: ActionClass;
  attemptedAt: string;
  completed: boolean;
  toolReceiptRef?: string;
  evidenceBeforeRef?: string;
  evidenceAfterRef?: string;
}

export function createExecutionReceipt(
  contract: BrowserTaskContract,
  request: BrowserActionRequest,
  decision: PolicyDecision,
  result: Omit<ExecutionReceipt, 'taskId' | 'actionId' | 'decision' | 'url' | 'actionClass' | 'attemptedAt'>,
  now = new Date(),
): ExecutionReceipt {
  if (result.completed && !decision.allowed) {
    throw new Error('a blocked action cannot be recorded as completed');
  }

  return {
    taskId: contract.taskId,
    actionId: request.actionId,
    decision,
    url: request.url,
    actionClass: request.actionClass,
    attemptedAt: now.toISOString(),
    ...result,
  };
}
