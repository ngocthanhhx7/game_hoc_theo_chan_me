export type GameMode = 'MC_MODE' | 'SOLO_MODE';

export type RoundId = 1 | 2 | 3;

export interface Team {
  id: string;
  name: string;
  color: string;
  score: number;
  roundScores: {
    round1: number;
    round2: number;
    round3: number;
  };
}

export interface CrosswordClue {
  id: string;
  index: number; // 1 to 11
  cipherLetter: string; // Đ, Ứ, C, M, Ẹ, L, A, V, A, N, G
  clue: string;
  answer: string;
  aliases: string[];
  explanation: string;
  reference: string;
  rowLength: number;
}

export type QuizOptionKey = 'A' | 'B' | 'C' | 'D';

export interface QuizQuestion {
  id: string;
  index: number; // 1 to 10
  prompt: string;
  options: Record<QuizOptionKey, string>;
  answer: QuizOptionKey;
  explanation: string;
  reference?: string;
}

export interface ReflectionQuestion {
  id: string;
  index: number; // 1 to 12
  category: 'LIFE' | 'DOGMAS' | 'FAITH_INQUIRIES';
  categoryLabel: string;
  prompt: string;
  referenceAnswer: string;
  keyPoints: string[];
  rubric: {
    full: number; // 20
    partial: number; // 10
    none: number; // 0
  };
  reference: string;
}

export interface ScoreEvent {
  id: string;
  timestamp: number;
  round: RoundId;
  questionId: string;
  teamId: string;
  points: number;
  description: string;
}

export interface Round1State {
  solvedClues: string[]; // Clue IDs that have been solved
  cipherLettersRevealed: string[]; // Array of revealed cipher letters
  isFullCipherRevealed: boolean;
  selectedClueId: string | null;
  earlyGuessedTeamId?: string;
}

export interface Round2State {
  currentQuestionIndex: number;
  selectedOption: QuizOptionKey | null;
  status: 'READY' | 'ACTIVE' | 'LOCKED' | 'REVEALED';
  activeTeamId: string | null;
  answersHistory: Record<
    string,
    {
      teamId?: string;
      selectedOption: QuizOptionKey;
      isCorrect: boolean;
      timeSpentMs: number;
    }
  >;
}

export interface Round3State {
  selectedQuestionIds: string[];
  currentQuestionId: string | null;
  status: 'SELECTING' | 'THINKING' | 'LOCKED' | 'REVEALED' | 'GRADED';
  thinkingTimeRemaining: number;
  activeTeamId: string | null;
  awardedScores: Record<
    string,
    {
      teamId: string;
      score: number;
      grade: 'FULL' | 'PARTIAL' | 'NONE';
    }
  >;
}

export type AppView =
  | 'WELCOME'
  | 'EVENT_INTRO'
  | 'MODE_SELECT'
  | 'TEAM_SETUP'
  | 'RULES_INTRO'
  | 'ROUND_SELECT'
  | 'ROUND_1'
  | 'ROUND_2'
  | 'ROUND_3'
  | 'SCOREBOARD'
  | 'RESULTS'
  | 'SETTINGS';

export interface GameSession {
  sessionId: string;
  version: number;
  gameMode: GameMode;
  currentView: AppView;
  activeRound: RoundId;
  teams: Team[];
  activeTeamId: string | null;
  round1: Round1State;
  round2: Round2State;
  round3: Round3State;
  scoreEvents: ScoreEvent[];
  isMuted: boolean;
  reducedMotion: boolean;
  isFullscreen: boolean;
  updatedAt: string;
}
