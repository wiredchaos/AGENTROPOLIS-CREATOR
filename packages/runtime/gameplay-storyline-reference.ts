export const GAMEPLAY_SOURCE = {
  repository: 'wiredchaos/agenttropolisgame',
  authority: 'GAMEPLAY_RUNTIME',
} as const;

export type CanonState =
  | 'REPO_BACKED'
  | 'AUTHOR_DECLARED'
  | 'DISPUTED'
  | 'PROVISIONAL';

export type StoryPurpose =
  | 'FILM_BEAT'
  | 'HISTORICAL_RUPTURE'
  | 'CHOICE'
  | 'CONSEQUENCE'
  | 'LORE_REVEAL'
  | 'COGNITION_GATE'
  | 'REALWORLD_SCENE'
  | 'BRIDGE'
  | 'ENDING';

/**
 * A storyline-safe pointer into the canonical Gaming District source.
 * CREATOR CORE stores references, never a second authoritative game graph.
 */
export interface GameplayStorylineRef {
  gameId: string;
  gameRepository: typeof GAMEPLAY_SOURCE.repository;
  manifestRef: string;
  releaseId?: string;
  immutableRef?: string;
  nodeId: string;
  storyPurpose: StoryPurpose;
  filmSequenceId?: string;
  canonState: CanonState;
  provenance: string[];
}

export interface StorylineProjection {
  ref: GameplayStorylineRef;
  title: string;
  summary?: string;
  namespace: string;
  choices?: Array<{ id: string; label: string; targetNodeId: string }>;
  historicalPeriod?: string;
  futureMutation?: string;
  realWorldSceneId?: string;
  stale: boolean;
}

export function createGameplayStorylineRef(
  input: Omit<GameplayStorylineRef, 'gameRepository'>,
): GameplayStorylineRef {
  return {
    ...input,
    gameRepository: GAMEPLAY_SOURCE.repository,
  };
}

/**
 * CREATOR projections are caches/read models only. A projection is stale when
 * its immutable runtime reference no longer matches the currently resolved
 * game release. Resolution/fetching belongs to the governed adapter layer.
 */
export function isStorylineProjectionStale(
  ref: GameplayStorylineRef,
  resolvedImmutableRef?: string,
): boolean {
  if (!ref.immutableRef || !resolvedImmutableRef) return true;
  return ref.immutableRef !== resolvedImmutableRef;
}
