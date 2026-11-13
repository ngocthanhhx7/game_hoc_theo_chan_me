import { describe, it, expect } from 'vitest';
import {
  gameReducer,
  INITIAL_ENGINE_STATE,
} from '@/domain/game/game-engine';

describe('Game Engine State Transitions & Undo', () => {
  it('prevents double scoring on the same clue in Round 1', () => {
    let state = gameReducer(INITIAL_ENGINE_STATE, {
      type: 'R1_SOLVE_CLUE',
      payload: { clueId: 'c01', teamId: 'team-1', points: 10 },
    });

    const team1Score = state.current.teams.find((t) => t.id === 'team-1')?.score;
    expect(team1Score).toBe(10);
    expect(state.current.round1.solvedClues).toContain('c01');

    // Attempt to solve the exact same clue again
    state = gameReducer(state, {
      type: 'R1_SOLVE_CLUE',
      payload: { clueId: 'c01', teamId: 'team-1', points: 10 },
    });

    // Score must remain 10, not 20!
    const unchangedScore = state.current.teams.find((t) => t.id === 'team-1')?.score;
    expect(unchangedScore).toBe(10);
  });

  it('correctly locks answers and calculates Round 2 score', () => {
    // Start question 1 (answer is B)
    let state = gameReducer(INITIAL_ENGINE_STATE, {
      type: 'R2_START_QUESTION',
    });
    expect(state.current.round2.status).toBe('ACTIVE');

    // Lock option B (correct)
    state = gameReducer(state, {
      type: 'R2_LOCK_ANSWER',
      payload: { option: 'B', teamId: 'team-1', timeSpentMs: 5000 },
    });

    expect(state.current.round2.status).toBe('LOCKED');
    expect(state.current.teams.find((t) => t.id === 'team-1')?.score).toBe(0);
    state = gameReducer(state, {type:'R2_REVEAL_ANSWER'});
    expect(state.current.teams.find((t) => t.id === 'team-1')?.score).toBe(20);
    state = gameReducer(state, {type:'R2_REVEAL_ANSWER'});
    expect(state.current.teams.find((t) => t.id === 'team-1')?.score).toBe(20);
  });

  it('accurately restores state via Undo action', () => {
    let state = gameReducer(INITIAL_ENGINE_STATE, {
      type: 'R1_SOLVE_CLUE',
      payload: { clueId: 'c01', teamId: 'team-1', points: 10 },
    });

    expect(state.current.teams.find((t) => t.id === 'team-1')?.score).toBe(10);
    expect(state.history.length).toBe(1);

    // Perform Undo
    state = gameReducer(state, { type: 'UNDO_LAST_ACTION' });

    expect(state.current.teams.find((t) => t.id === 'team-1')?.score).toBe(0);
    expect(state.current.round1.solvedClues).not.toContain('c01');
    expect(state.history.length).toBe(0);
  });
  it('rejects publishing a quiz answer before a turn has been locked', () => {
    const state = gameReducer(INITIAL_ENGINE_STATE, {type:'R2_REVEAL_ANSWER'});
    expect(state.current.round2.status).toBe('READY');
    expect(state.current.teams[0].score).toBe(0);
  });
  it('does not award the final cipher bonus twice', () => {
    const action = {type:'R1_REVEAL_FULL_CIPHER',payload:{teamId:'team-1',bonusPoints:30}} as const;
    const once = gameReducer(INITIAL_ENGINE_STATE, action);
    const twice = gameReducer(once, action);
    expect(twice.current.teams[0].score).toBe(30);
  });

});
