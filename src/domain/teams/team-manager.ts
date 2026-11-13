import { Team } from '@/types/game';

export interface DefaultTeamPreset {
  name: string;
  color: string;
}

export const SACRED_TEAM_PRESETS: DefaultTeamPreset[] = [
  { name: 'Đội Sao Biển (Stella Maris)', color: '#4f80cf' },
  { name: 'Đội Hoa Huệ (Lilium Marianum)', color: '#d6b36b' },
  { name: 'Đội Ánh Sáng (Lumen Christi)', color: '#2d6a4f' },
  { name: 'Đội Bình An (Regina Pacis)', color: '#e76f51' },
  { name: 'Đội Trinh Nữ (Virgo Fidelis)', color: '#9e2a2b' },
  { name: 'Đội Xin Vâng (Fiat Mariae)', color: '#87b4b0' },
];

export function createInitialTeams(count = 2): Team[] {
  const safeCount = Math.max(1, Math.min(count, SACRED_TEAM_PRESETS.length));
  return Array.from({ length: safeCount }, (_, i) => ({
    id: `team-${i + 1}`,
    name: SACRED_TEAM_PRESETS[i].name,
    color: SACRED_TEAM_PRESETS[i].color,
    score: 0,
    roundScores: {
      round1: 0,
      round2: 0,
      round3: 0,
    },
  }));
}
