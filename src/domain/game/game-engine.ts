import { GameSession } from '@/types/game';
import { GameAction } from '@/types/actions';
import { calculateUpdatedTeams, createScoreEvent } from '../scoring/scoring-rules';
import { CROSSWORD_DATA } from '@/content/questions/crossword.data';
import { QUIZ_DATA } from '@/content/questions/quiz.data';
import { createInitialTeams } from '../teams/team-manager';

export const INITIAL_GAME_SESSION: GameSession = {
  sessionId: `marian-${Date.now()}`,
  version: 1,
  gameMode: 'MC_MODE',
  currentView: 'WELCOME',
  activeRound: 1,
  teams: createInitialTeams(2),
  activeTeamId: 'team-1',
  round1: {
    solvedClues: [],
    cipherLettersRevealed: [],
    isFullCipherRevealed: false,
    selectedClueId: null,
  },
  round2: {
    currentQuestionIndex: 0,
    selectedOption: null,
    status: 'READY',
    activeTeamId: null,
    answersHistory: {},
  },
  round3: {
    selectedQuestionIds: ['r01', 'r06', 'r07', 'r10'], // Default 4 representative questions
    currentQuestionId: null,
    status: 'SELECTING',
    thinkingTimeRemaining: 60,
    activeTeamId: null,
    awardedScores: {},
  },
  scoreEvents: [],
  isMuted: false,
  reducedMotion: false,
  isFullscreen: false,
  updatedAt: new Date().toISOString(),
};

export interface GameEngineState {
  current: GameSession;
  history: GameSession[];
}

export const INITIAL_ENGINE_STATE: GameEngineState = {
  current: INITIAL_GAME_SESSION,
  history: [],
};

export function gameReducer(
  state: GameEngineState,
  action: GameAction
): GameEngineState {
  const current = state.current;

  switch (action.type) {
    case 'SET_VIEW': {
      if (current.currentView === action.payload) return state;
      return {
        ...state,
        current: {
          ...current,
          currentView: action.payload,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'SET_GAME_MODE': {
      return {
        ...state,
        current: {
          ...current,
          gameMode: action.payload,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'SET_TEAMS': {
      return {
        ...state,
        current: {
          ...current,
          teams: action.payload,
          activeTeamId: action.payload.length > 0 ? action.payload[0].id : null,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'SET_ACTIVE_TEAM': {
      return {
        ...state,
        current: {
          ...current,
          activeTeamId: action.payload,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'SELECT_ROUND': {
      const targetRound = action.payload;
      const targetView =
        targetRound === 1
          ? 'ROUND_1'
          : targetRound === 2
          ? 'ROUND_2'
          : 'ROUND_3';

      return {
        ...state,
        current: {
          ...current,
          activeRound: targetRound,
          currentView: targetView,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'TOGGLE_MUTE': {
      return {
        ...state,
        current: {
          ...current,
          isMuted: !current.isMuted,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'TOGGLE_REDUCED_MOTION': {
      return {
        ...state,
        current: {
          ...current,
          reducedMotion: !current.reducedMotion,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    // --- ROUND 1 ACTIONS ---
    case 'R1_SELECT_CLUE': {
      return {
        ...state,
        current: {
          ...current,
          round1: {
            ...current.round1,
            selectedClueId: action.payload,
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'R1_SOLVE_CLUE': {
      const { clueId, teamId, points } = action.payload;
      // Prevent double solving
      if (current.round1.solvedClues.includes(clueId)) {
        return state;
      }

      const clue = CROSSWORD_DATA.find((c) => c.id === clueId);
      const cipherLetter = clue ? clue.cipherLetter : '';

      const newSolvedClues = [...current.round1.solvedClues, clueId];
      const newCipherLetters = cipherLetter
        ? [...current.round1.cipherLettersRevealed, cipherLetter]
        : current.round1.cipherLettersRevealed;

      const isAllSolved = newSolvedClues.length >= CROSSWORD_DATA.length;

      let updatedTeams = current.teams;
      let newScoreEvents = current.scoreEvents;

      if (teamId && points > 0) {
        updatedTeams = calculateUpdatedTeams(current.teams, teamId, 1, points);
        newScoreEvents = [
          ...current.scoreEvents,
          createScoreEvent(
            1,
            clueId,
            teamId,
            points,
            `Giải đúng gợi ý số ${clue?.index || ''}: ${clue?.answer || ''}`
          ),
        ];
      }

      // Push snapshot to history for Undo
      return {
        history: [...state.history, current],
        current: {
          ...current,
          teams: updatedTeams,
          scoreEvents: newScoreEvents,
          round1: {
            ...current.round1,
            solvedClues: newSolvedClues,
            cipherLettersRevealed: newCipherLetters,
            isFullCipherRevealed: isAllSolved,
            selectedClueId: null,
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'R1_REVEAL_FULL_CIPHER': {
      if (current.round1.isFullCipherRevealed) return state;
      const { teamId, bonusPoints } = action.payload;
      let updatedTeams = current.teams;
      let newScoreEvents = current.scoreEvents;

      if (teamId && bonusPoints > 0) {
        updatedTeams = calculateUpdatedTeams(
          current.teams,
          teamId,
          1,
          bonusPoints
        );
        newScoreEvents = [
          ...current.scoreEvents,
          createScoreEvent(
            1,
            'CIPHER_FINAL',
            teamId,
            bonusPoints,
            'Đoán chính xác Mật Mã Thánh: ĐỨC MẸ LA VANG'
          ),
        ];
      }

      return {
        history: [...state.history, current],
        current: {
          ...current,
          teams: updatedTeams,
          scoreEvents: newScoreEvents,
          round1: {
            ...current.round1,
            isFullCipherRevealed: true,
            earlyGuessedTeamId: teamId,
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    // --- ROUND 2 ACTIONS ---
    case 'R2_START_QUESTION': {
      if (current.round2.status !== 'READY') return state;
      return {
        ...state,
        current: {
          ...current,
          round2: {
            ...current.round2,
            status: 'ACTIVE',
            selectedOption: null,
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'R2_LOCK_ANSWER': {
      if (current.round2.status !== 'ACTIVE') return state;
      const { option, teamId, timeSpentMs } = action.payload;
      const question = QUIZ_DATA[current.round2.currentQuestionIndex];
      if (!question) return state;
      return {
        history: [...state.history, current],
        current: {
          ...current,
          round2: {
            ...current.round2,
            status: 'LOCKED',
            selectedOption: option,
            answersHistory: {...current.round2.answersHistory, [question.id]: { teamId, selectedOption: option, isCorrect: question.answer === option, timeSpentMs }},
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'R2_REVEAL_ANSWER': {
      if (current.round2.status !== 'LOCKED') return state;
      const question = QUIZ_DATA[current.round2.currentQuestionIndex];
      const answer = current.round2.answersHistory[question.id];
      const award = answer?.isCorrect && answer.teamId && !current.scoreEvents.some(event => event.round === 2 && event.questionId === question.id);
      return {
        history: [...state.history, current],
        current: {
          ...current,
          teams: award ? calculateUpdatedTeams(current.teams, answer.teamId!, 2, 20) : current.teams,
          scoreEvents: award ? [...current.scoreEvents, createScoreEvent(2, question.id, answer.teamId!, 20, `Đáp án đúng câu trắc nghiệm ${question.index}`)] : current.scoreEvents,
          round2: {...current.round2, status: 'REVEALED'},
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'R2_NEXT_QUESTION': {
      if (current.round2.status !== 'REVEALED') return state;
      const nextIndex = current.round2.currentQuestionIndex + 1;
      if (nextIndex >= QUIZ_DATA.length) {
        // Round 2 finished, navigate to scoreboard
        return {
          history: [...state.history, current],
          current: {
            ...current,
            currentView: 'SCOREBOARD',
            updatedAt: new Date().toISOString(),
          },
        };
      }

      return {
        ...state,
        current: {
          ...current,
          round2: {
            ...current.round2,
            currentQuestionIndex: nextIndex,
            selectedOption: null,
            status: 'READY',
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'R2_TIMEOUT': {
      if (current.round2.status !== 'ACTIVE') return state;
      const currentQ = QUIZ_DATA[current.round2.currentQuestionIndex];

      return {
        history: [...state.history, current],
        current: {
          ...current,
          round2: {
            ...current.round2,
            status: 'LOCKED',
            selectedOption: null,
            answersHistory: {
              ...current.round2.answersHistory,
              [currentQ.id]: {
                teamId: current.activeTeamId || undefined,
                selectedOption: 'A', // Fallback
                isCorrect: false,
                timeSpentMs: 20000,
              },
            },
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    // --- ROUND 3 ACTIONS ---
    case 'R3_SELECT_QUESTIONS': {
      return {
        ...state,
        current: {
          ...current,
          round3: {
            ...current.round3,
            selectedQuestionIds: action.payload,
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'R3_ACTIVATE_QUESTION': {
      return {
        ...state,
        current: {
          ...current,
          round3: {
            ...current.round3,
            currentQuestionId: action.payload,
            status: 'SELECTING',
            thinkingTimeRemaining: 60,
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'R3_START_THINKING': {
      if (current.round3.status !== 'SELECTING' || !current.round3.currentQuestionId) return state;
      return {
        ...state,
        current: {
          ...current,
          round3: {
            ...current.round3,
            status: 'THINKING',
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'R3_LOCK_ANSWER': {
      if (current.round3.status !== 'THINKING') return state;
      return {...state, current: {...current, round3: {...current.round3, status: 'LOCKED'}, updatedAt: new Date().toISOString()}};
    }

    case 'R3_REVEAL_ANSWER': {
      if (current.round3.status !== 'LOCKED') return state;
      return {
        ...state,
        current: {
          ...current,
          round3: {
            ...current.round3,
            status: 'REVEALED',
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'R3_GRADE_ANSWER': {
      const { questionId, teamId, grade, score } = action.payload;
      if (current.round3.status !== 'REVEALED' || current.round3.currentQuestionId !== questionId || current.round3.awardedScores[questionId]) return state;
      let updatedTeams = current.teams;
      let newScoreEvents = current.scoreEvents;

      if (teamId && score > 0) {
        updatedTeams = calculateUpdatedTeams(current.teams, teamId, 3, score);
        newScoreEvents = [
          ...current.scoreEvents,
          createScoreEvent(
            3,
            questionId,
            teamId,
            score,
            `Chấm tự luận câu ${questionId} mức ${grade}`
          ),
        ];
      }

      return {
        history: [...state.history, current],
        current: {
          ...current,
          teams: updatedTeams,
          scoreEvents: newScoreEvents,
          round3: {
            ...current.round3,
            status: 'GRADED',
            awardedScores: {
              ...current.round3.awardedScores,
              [questionId]: { teamId, score, grade },
            },
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }

    // --- UNIVERSAL / HOST CONTROLS ---
    case 'MANUAL_SCORE_ADJUSTMENT': {
      const { teamId, round, points, reason } = action.payload;
      const updatedTeams = calculateUpdatedTeams(
        current.teams,
        teamId,
        round,
        points
      );
      const newScoreEvents = [
        ...current.scoreEvents,
        createScoreEvent(round, 'MANUAL_ADJUST', teamId, points, reason),
      ];

      return {
        history: [...state.history, current],
        current: {
          ...current,
          teams: updatedTeams,
          scoreEvents: newScoreEvents,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'UNDO_LAST_ACTION': {
      if (state.history.length === 0) return state;
      const previous = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      return {
        history: newHistory,
        current: previous,
      };
    }

    case 'RESET_GAME': {
      return {
        history: [...state.history, current],
        current: {
          ...INITIAL_GAME_SESSION,
          sessionId: `marian-${Date.now()}`,
          teams: current.teams.map((t) => ({
            ...t,
            score: 0,
            roundScores: { round1: 0, round2: 0, round3: 0 },
          })),
          updatedAt: new Date().toISOString(),
        },
      };
    }

    case 'LOAD_SESSION': {
      return {
        history: [...state.history, current],
        current: action.payload,
      };
    }

    default:
      return state;
  }
}
