import { z } from 'zod';
import { GameSession } from '@/types/game';

const STORAGE_KEY = 'marian_light_journey_session_v1';

export const GameSessionSchema = z.object({
  sessionId: z.string(),
  version: z.number(),
  gameMode: z.enum(['MC_MODE', 'SOLO_MODE']),
  currentView: z.string(),
  activeRound: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  teams: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      color: z.string(),
      score: z.number(),
      roundScores: z.object({
        round1: z.number(),
        round2: z.number(),
        round3: z.number(),
      }),
    })
  ),
  activeTeamId: z.string().nullable(),
  round1: z.object({
    solvedClues: z.array(z.string()),
    cipherLettersRevealed: z.array(z.string()),
    isFullCipherRevealed: z.boolean(),
    selectedClueId: z.string().nullable(),
    earlyGuessedTeamId: z.string().optional(),
  }),
  round2: z.object({
    currentQuestionIndex: z.number(),
    selectedOption: z.enum(['A', 'B', 'C', 'D']).nullable(),
    status: z.enum(['READY', 'ACTIVE', 'LOCKED', 'REVEALED']),
    activeTeamId: z.string().nullable(),
    answersHistory: z.record(z.any()),
  }),
  round3: z.object({
    selectedQuestionIds: z.array(z.string()),
    currentQuestionId: z.string().nullable(),
    status: z.enum(['SELECTING', 'THINKING', 'LOCKED', 'REVEALED', 'GRADED']),
    thinkingTimeRemaining: z.number(),
    activeTeamId: z.string().nullable(),
    awardedScores: z.record(z.any()),
  }),
  scoreEvents: z.array(z.any()),
  isMuted: z.boolean(),
  reducedMotion: z.boolean(),
  isFullscreen: z.boolean(),
  updatedAt: z.string(),
});

export function saveSessionToStorage(session: GameSession): boolean {
  try {
    const serialized = JSON.stringify(session);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (err) {
    console.error('Failed to save session to localStorage:', err);
    return false;
  }
}

export function loadSessionFromStorage(): GameSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const validated = GameSessionSchema.safeParse(parsed);
    if (validated.success) {
      return validated.data as unknown as GameSession;
    } else {
      console.warn('Stored session invalid schema:', validated.error);
      return null;
    }
  } catch (err) {
    console.error('Failed to load session from localStorage:', err);
    return null;
  }
}

export function clearSessionStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear storage:', err);
  }
}

export function exportSessionJson(session: GameSession): string {
  return JSON.stringify(session, null, 2);
}

export function importSessionJson(jsonStr: string): GameSession {
  const parsed = JSON.parse(jsonStr);
  const validated = GameSessionSchema.parse(parsed);
  return validated as unknown as GameSession;
}
