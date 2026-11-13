import { GameMode, RoundId, AppView, Team, QuizOptionKey } from './game';

export type GameAction =
  | { type: 'SET_VIEW'; payload: AppView }
  | { type: 'SET_GAME_MODE'; payload: GameMode }
  | { type: 'SET_TEAMS'; payload: Team[] }
  | { type: 'SET_ACTIVE_TEAM'; payload: string | null }
  | { type: 'SELECT_ROUND'; payload: RoundId }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'TOGGLE_REDUCED_MOTION' }
  // Round 1 Actions
  | { type: 'R1_SELECT_CLUE'; payload: string | null }
  | {
      type: 'R1_SOLVE_CLUE';
      payload: { clueId: string; teamId?: string; points: number };
    }
  | {
      type: 'R1_REVEAL_FULL_CIPHER';
      payload: { teamId?: string; bonusPoints: number };
    }
  // Round 2 Actions
  | { type: 'R2_START_QUESTION' }
  | {
      type: 'R2_LOCK_ANSWER';
      payload: {
        option: QuizOptionKey;
        teamId?: string;
        timeSpentMs: number;
      };
    }
  | { type: 'R2_REVEAL_ANSWER' }
  | { type: 'R2_NEXT_QUESTION' }
  | { type: 'R2_TIMEOUT' }
  // Round 3 Actions
  | { type: 'R3_SELECT_QUESTIONS'; payload: string[] }
  | { type: 'R3_ACTIVATE_QUESTION'; payload: string }
  | { type: 'R3_START_THINKING' }
  | { type: 'R3_LOCK_ANSWER' }
  | { type: 'R3_REVEAL_ANSWER' }
  | {
      type: 'R3_GRADE_ANSWER';
      payload: {
        questionId: string;
        teamId: string;
        grade: 'FULL' | 'PARTIAL' | 'NONE';
        score: number;
      };
    }
  // Universal Scoring / Host Controls
  | {
      type: 'MANUAL_SCORE_ADJUSTMENT';
      payload: {
        teamId: string;
        round: RoundId;
        points: number;
        reason: string;
      };
    }
  | { type: 'UNDO_LAST_ACTION' }
  | { type: 'RESET_GAME' }
  | { type: 'LOAD_SESSION'; payload: any };
