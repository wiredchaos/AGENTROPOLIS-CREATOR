import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createExecutionReceipt,
  evaluateBrowserAction,
  validateContract,
} from '../dist/index.js';

const contract = {
  taskId: 'browser-task-001',
  requestedBy: 'human',
  operator: 'hermes-browser-operator',
  mode: 'execute_with_approval',
  objective: 'Research and submit one approved form',
  allowedDomains: ['example.com'],
  blockedDomains: ['admin.example.com'],
  allowedActions: ['read', 'draft', 'submit', 'upload'],
  blockedActions: [],
  session: {
    profile: 'isolated_automation_profile',
    reusePersonalSession: false,
    retainCookies: false,
  },
  credentials: {
    mode: 'byok',
    secretValuesVisibleToAgent: false,
    requiredSecretRefs: [],
  },
  limits: {
    maxSteps: 10,
    maxSubmissions: 1,
    maxDownloads: 0,
    maxUploads: 1,
    timeoutMinutes: 15,
  },
  evidence: {
    captureBefore: true,
    captureAfter: true,
    redactSensitiveFields: true,
  },
  memory: {
    writeMode: 'review_required',
    storeRawPageContent: false,
  },
};

const request = {
  actionId: 'action-001',
  url: 'https://www.example.com/form',
  actionClass: 'submit',
  description: 'Submit approved form',
  approved: true,
  counters: { steps: 1, submissions: 0, downloads: 0, uploads: 0 },
  bridge: {
    sourceVerified: true,
    permissionsReviewed: true,
    isolatedProfile: true,
    connected: true,
  },
  evidenceReady: { before: true, afterCapable: true },
};

test('valid contract passes validation', () => {
  assert.deepEqual(validateContract(contract), []);
});

test('allows an approved consequential action inside the boundary', () => {
  const decision = evaluateBrowserAction(contract, request);
  assert.equal(decision.allowed, true);
  assert.equal(decision.code, 'allow');
});

test('requires approval for consequential actions', () => {
  const decision = evaluateBrowserAction(contract, { ...request, approved: false });
  assert.equal(decision.allowed, false);
  assert.equal(decision.code, 'approval_required');
  assert.equal(decision.requiresHumanApproval, true);
});

test('blocks subdomain explicitly placed on blocked list', () => {
  const decision = evaluateBrowserAction(contract, {
    ...request,
    url: 'https://admin.example.com/delete',
  });
  assert.equal(decision.code, 'blocked_domain');
});

test('blocks financial actions even when mistakenly added to allowed actions', () => {
  const decision = evaluateBrowserAction(
    { ...contract, allowedActions: [...contract.allowedActions, 'financial'] },
    { ...request, actionClass: 'financial' },
  );
  assert.equal(decision.code, 'blocked_hard_class');
});

test('blocks personal browser profiles', () => {
  const decision = evaluateBrowserAction(contract, {
    ...request,
    bridge: { ...request.bridge, isolatedProfile: false },
  });
  assert.equal(decision.code, 'blocked_personal_profile');
});

test('blocks submissions after the contract limit is consumed', () => {
  const decision = evaluateBrowserAction(contract, {
    ...request,
    counters: { ...request.counters, submissions: 1 },
  });
  assert.equal(decision.code, 'blocked_limit');
});

test('refuses to record a blocked action as completed', () => {
  const decision = evaluateBrowserAction(contract, { ...request, approved: false });
  assert.throws(() =>
    createExecutionReceipt(contract, request, decision, { completed: true }),
  );
});
