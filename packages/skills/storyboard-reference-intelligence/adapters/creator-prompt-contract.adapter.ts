export interface ShotContract {
  shotId: string
  label?: string
  source: {
    mediaRef: string
    mediaHash: string
    timestampSeconds: number | null
    frameHash?: string | null
  }
  framing: {
    aspectRatio: string
    crop: {
      x: number
      y: number
      width: number
      height: number
      coordinateSpace: 'normalized_source'
    }
    shotSize?: string | null
    cameraAngle?: string | null
    lens?: string | null
    blocking?: string[]
  }
  timing: {
    durationSeconds: number
    movement?: string | null
    transition?: string | null
  }
  analysis: {
    facts: Record<string, unknown>
    inferences: Array<{
      field: string
      value: unknown
      source: 'vision_model' | 'offline_template' | 'project_profile' | 'district_canon' | 'safe_default'
      confidence: 'low' | 'medium' | 'high'
      userOverridable: true
    }>
    missingFields: string[]
    environment?: string | null
    lighting?: string | null
    colorMood?: string | null
    styleKeywords?: string[]
  }
  rights: {
    status: 'user_owned' | 'licensed' | 'public_domain' | 'unknown'
    evidenceRefs?: string[]
    redistributionAllowed: boolean
  }
  governance: {
    agentId: string
    mandateId: string
    privacyClass: 'local' | 'restricted' | 'public'
    networkPolicy: 'local_only' | 'byok' | 'approved_cloud'
    modelRoute?: string | null
    requireHumanReview: true
    requireMediaDiff?: boolean
  }
}

export interface CreatorPromptContractManifest {
  skill: 'creator-prompt-compiler'
  lane: 'creator.storyboard_reference'
  status: 'complete' | 'inferred_with_receipt' | 'planning_only' | 'blocked'
  input: {
    sourceShotId: string
    sourceMediaRef: string
    sourceMediaHash: string
    sourceTimestampSeconds: number | null
  }
  contract: {
    route: '/storyboard-reference'
    spec: {
      durationSeconds: number
      aspectRatio: string
      outputType: 'storyboard_shot'
      crop: ShotContract['framing']['crop']
    }
    beats: Array<{
      id: string
      startSeconds: number
      endSeconds: number
      subject: string
      action: string
      visualTreatment: string[]
    }>
    copy: []
    technique: string[]
    negatives: string[]
  }
  assets: {
    references: Array<{
      role: 'source_frame'
      mediaRef: string
      sha256: string
      timestampSeconds: number | null
    }>
    rightsStatus: ShotContract['rights']['status']
    redistributionAllowed: boolean
  }
  decisionLedger: {
    explicitFacts: Record<string, unknown>
    missingFields: string[]
  }
  inferenceReceipt: ShotContract['analysis']['inferences']
  governance: {
    agentId: string
    mandateId: string
    privacyClass: ShotContract['governance']['privacyClass']
    networkPolicy: ShotContract['governance']['networkPolicy']
    requireHumanReview: true
    requireMediaDiff: boolean
    lockedCopyMustMatch: true
  }
  routing: {
    capability: 'creator.storyboard_reference'
    provider: 'unresolved_until_router_selection' | string
  }
  outputs: Array<
    | 'provider_neutral_prompt'
    | 'timeline_map'
    | 'qc_contract'
    | 'inference_receipt'
    | 'execution_manifest'
  >
}

/**
 * Converts one normalized shot into the existing Creator Prompt Contract shape.
 * It never generates provider-specific syntax and never promotes an inference
 * into the explicit-facts ledger.
 */
export function toCreatorPromptContract(shot: ShotContract): CreatorPromptContractManifest {
  const blocked = shot.rights.status === 'unknown'
  const hasInferences = shot.analysis.inferences.length > 0
  const hasMissingFields = shot.analysis.missingFields.length > 0

  const status: CreatorPromptContractManifest['status'] = blocked
    ? 'blocked'
    : hasMissingFields
      ? 'planning_only'
      : hasInferences
        ? 'inferred_with_receipt'
        : 'complete'

  const techniques = compact([
    shot.framing.shotSize,
    shot.framing.cameraAngle,
    shot.framing.lens,
    shot.timing.movement,
    shot.timing.transition,
    shot.analysis.lighting,
    shot.analysis.colorMood,
    ...(shot.analysis.styleKeywords ?? []),
    ...(shot.framing.blocking ?? [])
  ])

  const subject = stringFact(shot.analysis.facts.subject) ?? shot.label ?? `shot ${shot.shotId}`
  const action = stringFact(shot.analysis.facts.action) ?? 'hold the referenced composition'

  return {
    skill: 'creator-prompt-compiler',
    lane: 'creator.storyboard_reference',
    status,
    input: {
      sourceShotId: shot.shotId,
      sourceMediaRef: shot.source.mediaRef,
      sourceMediaHash: shot.source.mediaHash,
      sourceTimestampSeconds: shot.source.timestampSeconds
    },
    contract: {
      route: '/storyboard-reference',
      spec: {
        durationSeconds: shot.timing.durationSeconds,
        aspectRatio: shot.framing.aspectRatio,
        outputType: 'storyboard_shot',
        crop: shot.framing.crop
      },
      beats: [
        {
          id: `${shot.shotId}-beat-1`,
          startSeconds: 0,
          endSeconds: shot.timing.durationSeconds,
          subject,
          action,
          visualTreatment: techniques
        }
      ],
      copy: [],
      technique: techniques,
      negatives: [
        'do not alter source identity without an explicit mandate',
        'do not invent visible text',
        'do not discard source crop provenance',
        'do not present inferred fields as observed facts'
      ]
    },
    assets: {
      references: [
        {
          role: 'source_frame',
          mediaRef: shot.source.mediaRef,
          sha256: shot.source.frameHash ?? shot.source.mediaHash,
          timestampSeconds: shot.source.timestampSeconds
        }
      ],
      rightsStatus: shot.rights.status,
      redistributionAllowed: shot.rights.redistributionAllowed
    },
    decisionLedger: {
      explicitFacts: shot.analysis.facts,
      missingFields: shot.analysis.missingFields
    },
    inferenceReceipt: shot.analysis.inferences,
    governance: {
      agentId: shot.governance.agentId,
      mandateId: shot.governance.mandateId,
      privacyClass: shot.governance.privacyClass,
      networkPolicy: shot.governance.networkPolicy,
      requireHumanReview: true,
      requireMediaDiff: shot.governance.requireMediaDiff ?? true,
      lockedCopyMustMatch: true
    },
    routing: {
      capability: 'creator.storyboard_reference',
      provider: shot.governance.modelRoute ?? 'unresolved_until_router_selection'
    },
    outputs: [
      'provider_neutral_prompt',
      'timeline_map',
      'qc_contract',
      'inference_receipt',
      'execution_manifest'
    ]
  }
}

function compact(values: Array<string | null | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => typeof value === 'string' && value.trim().length > 0))]
}

function stringFact(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null
}
