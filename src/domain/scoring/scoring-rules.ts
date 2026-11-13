import { Team, RoundId, ScoreEvent } from '@/types/game';

export interface ScoringConfig {
  round1CluePoints: number; // 10
  round1BonusPoints: number; // 30
  round2CorrectPoints: number; // 20
  round3FullPoints: number; // 20
  round3PartialPoints: number; // 10
}

export const DEFAULT_SCORING_CONFIG: ScoringConfig = {
  round1CluePoints: 10,
  round1BonusPoints: 30,
  round2CorrectPoints: 20,
  round3FullPoints: 20,
  round3PartialPoints: 10,
};

export function calculateUpdatedTeams(
  teams: Team[],
  teamId: string,
  round: RoundId,
  points: number
): Team[] {
  return teams.map((team) => {
    if (team.id !== teamId) return team;

    const roundKey = `round${round}` as 'round1' | 'round2' | 'round3';
    const currentRoundScore = team.roundScores[roundKey] || 0;
    const newRoundScore = Math.max(0, currentRoundScore + points);
    const newTotalScore = Math.max(
      0,
      (round === 1 ? newRoundScore : team.roundScores.round1) +
        (round === 2 ? newRoundScore : team.roundScores.round2) +
        (round === 3 ? newRoundScore : team.roundScores.round3)
    );

    return {
      ...team,
      score: newTotalScore,
      roundScores: {
        ...team.roundScores,
        [roundKey]: newRoundScore,
      },
    };
  });
}

export function sortTeamsByScore(teams: Team[]): Team[] {
  return [...teams].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Tie breaker: round 3 score, then round 2, then name
    if (b.roundScores.round3 !== a.roundScores.round3) {
      return b.roundScores.round3 - a.roundScores.round3;
    }
    if (b.roundScores.round2 !== a.roundScores.round2) {
      return b.roundScores.round2 - a.roundScores.round2;
    }
    return a.name.localeCompare(b.name, 'vi');
  });
}

export function createScoreEvent(
  round: RoundId,
  questionId: string,
  teamId: string,
  points: number,
  description: string
): ScoreEvent {
  return {
    id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    round,
    questionId,
    teamId,
    points,
    description,
  };
}
