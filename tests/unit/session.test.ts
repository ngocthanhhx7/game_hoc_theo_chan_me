import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveSessionToStorage,
  loadSessionFromStorage,
  exportSessionJson,
  importSessionJson,
} from '@/domain/session/session-manager';
import { INITIAL_GAME_SESSION } from '@/domain/game/game-engine';

describe('Session Persistence & JSON Export/Import', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and restores game session from localStorage', () => {
    const sessionToSave = {
      ...INITIAL_GAME_SESSION,
      teams: [
        {
          id: 'test-1',
          name: 'Đội Thử Nghiệm',
          color: '#d6b36b',
          score: 40,
          roundScores: { round1: 20, round2: 20, round3: 0 },
        },
      ],
    };

    const saved = saveSessionToStorage(sessionToSave);
    expect(saved).toBe(true);

    const loaded = loadSessionFromStorage();
    expect(loaded).not.toBeNull();
    expect(loaded?.teams[0].name).toBe('Đội Thử Nghiệm');
    expect(loaded?.teams[0].score).toBe(40);
  });

  it('exports and safely imports session JSON', () => {
    const jsonStr = exportSessionJson(INITIAL_GAME_SESSION);
    const imported = importSessionJson(jsonStr);

    expect(imported.sessionId).toBe(INITIAL_GAME_SESSION.sessionId);
    expect(imported.version).toBe(1);
  });

  it('throws an error when importing malformed or corrupted JSON', () => {
    const corruptedJson = '{"sessionId": "invalid", "incomplete": true}';
    expect(() => importSessionJson(corruptedJson)).toThrow();
  });
});
