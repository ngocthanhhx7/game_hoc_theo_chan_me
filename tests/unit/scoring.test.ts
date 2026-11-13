import { describe, it, expect } from 'vitest';
import {
  calculateUpdatedTeams,
  sortTeamsByScore,
  createScoreEvent,
} from '@/domain/scoring/scoring-rules';
import { Team } from '@/types/game';

describe('Scoring Logic & Team Ranking', () => {
  const initialTeams: Team[] = [
    {
      id: 'team-1',
      name: 'Đội Sao Biển',
      color: '#4f80cf',
      score: 0,
      roundScores: { round1: 0, round2: 0, round3: 0 },
    },
    {
      id: 'team-2',
      name: 'Đội Hoa Huệ',
      color: '#d6b36b',
      score: 0,
      roundScores: { round1: 0, round2: 0, round3: 0 },
    },
  ];

  it('correctly awards points to a team for Round 1', () => {
    const updated = calculateUpdatedTeams(initialTeams, 'team-1', 1, 10);
    expect(updated[0].score).toBe(10);
    expect(updated[0].roundScores.round1).toBe(10);
    expect(updated[1].score).toBe(0);
  });

  it('correctly aggregates points across all three rounds', () => {
    let teams = calculateUpdatedTeams(initialTeams, 'team-1', 1, 10);
    teams = calculateUpdatedTeams(teams, 'team-1', 2, 20);
    teams = calculateUpdatedTeams(teams, 'team-1', 3, 20);

    expect(teams[0].score).toBe(50);
    expect(teams[0].roundScores.round1).toBe(10);
    expect(teams[0].roundScores.round2).toBe(20);
    expect(teams[0].roundScores.round3).toBe(20);
  });

  it('sorts teams by total score descending with tie breaking', () => {
    const teams: Team[] = [
      {
        id: 'team-a',
        name: 'Đội A',
        color: '#fff',
        score: 30,
        roundScores: { round1: 10, round2: 10, round3: 10 },
      },
      {
        id: 'team-b',
        name: 'Đội B',
        color: '#fff',
        score: 50,
        roundScores: { round1: 10, round2: 20, round3: 20 },
      },
      {
        id: 'team-c',
        name: 'Đội C',
        color: '#fff',
        score: 30,
        roundScores: { round1: 10, round2: 0, round3: 20 },
      },
    ];

    const sorted = sortTeamsByScore(teams);
    expect(sorted[0].id).toBe('team-b'); // 50 points
    expect(sorted[1].id).toBe('team-c'); // 30 points, higher Round 3 score (20 vs 10)
    expect(sorted[2].id).toBe('team-a'); // 30 points, lower Round 3 score (10)
  });

  it('creates valid traceable score events', () => {
    const event = createScoreEvent(1, 'c01', 'team-1', 10, 'Test clue solve');
    expect(event.round).toBe(1);
    expect(event.points).toBe(10);
    expect(event.teamId).toBe('team-1');
    expect(event.timestamp).toBeGreaterThan(0);
  });
});
