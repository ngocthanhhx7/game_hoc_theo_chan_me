import React from 'react';
import { Trophy, Medal, ArrowRight, RotateCcw } from 'lucide-react';
import { useGame } from '@/app/AppProviders';
import { Button } from '@/components/ui/Button';
import { sortTeamsByScore } from '@/domain/scoring/scoring-rules';
import { useSound } from '@/hooks/useSound';
import styles from './ScoreboardView.module.css';

export const ScoreboardView: React.FC = () => {
  const { session, dispatch } = useGame();
  const { playClick, playVictory } = useSound();

  const sortedTeams = sortTeamsByScore(session.teams);

  const handleProceed = () => {
    playClick();
    // If not all 3 rounds played, recommend next round
    if (session.activeRound === 1) {
      dispatch({ type: 'SELECT_ROUND', payload: 2 });
    } else if (session.activeRound === 2) {
      dispatch({ type: 'SELECT_ROUND', payload: 3 });
    } else {
      playVictory();
      dispatch({ type: 'SET_VIEW', payload: 'RESULTS' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>BẢNG TỔNG SẮP ĐIỂM SỐ</span>
        <h2 className={styles.title}>BẢNG XẾP HẠNG THÁNH</h2>
        <p className={styles.subtitle}>
          Tổng kết thành tích học hỏi Giáo lý và Kinh Thánh của các đội qua các
          vòng thi.
        </p>
      </div>

      {/* Podium Cards for Top 3 */}
      <div className={styles.podiumGrid}>
        {sortedTeams.slice(0, 3).map((team, rankIndex) => {
          const medalColors = ['#f5df9e', '#cfd8dc', '#d7ccc8'];
          const rankLabels = ['Quán Quân', 'Á Quân 1', 'Á Quân 2'];

          return (
            <div
              key={team.id}
              className={`${styles.podiumCard} ${
                rankIndex === 0 ? styles.firstPlace : ''
              }`}
            >
              <div
                className={styles.rankBadge}
                style={{ backgroundColor: medalColors[rankIndex] }}
              >
                {rankIndex === 0 ? (
                  <Trophy size={26} color="#08162f" />
                ) : (
                  <Medal size={24} color="#08162f" />
                )}
              </div>
              <span className={styles.rankTitle}>{rankLabels[rankIndex]}</span>
              <h3 className={styles.teamName}>{team.name}</h3>
              <div className={styles.scoreNumber}>{team.score}</div>
              <span className={styles.scoreUnit}>ĐIỂM TỔNG CỘNG</span>
            </div>
          );
        })}
      </div>

      {/* Detailed Rounds Breakdown Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3>CHI TIẾT ĐIỂM TỪNG VÒNG THI</h3>
        </div>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Hạng</th>
                <th>Tên Đội</th>
                <th>V1: Ô Chữ</th>
                <th>V2: Trắc Nghiệm</th>
                <th>V3: Tự Luận</th>
                <th>Tổng Điểm</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, idx) => (
                <tr
                  key={team.id}
                  className={idx === 0 ? styles.topRow : undefined}
                >
                  <td className={styles.rankCell}>#{idx + 1}</td>
                  <td className={styles.nameCell}>
                    <span
                      className={styles.colorTag}
                      style={{ backgroundColor: team.color }}
                    />
                    <strong>{team.name}</strong>
                  </td>
                  <td>{team.roundScores.round1}đ</td>
                  <td>{team.roundScores.round2}đ</td>
                  <td>{team.roundScores.round3}đ</td>
                  <td className={styles.totalCell}>{team.score}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Navigation Bar */}
      <div className={styles.actionsBar}>
        <Button
          variant="outline"
          size="lg"
          icon={<RotateCcw size={18} />}
          onClick={() => dispatch({ type: 'SELECT_ROUND', payload: 1 })}
        >
          Trở Lại Vòng 1
        </Button>

        <Button
          variant="gold"
          size="xl"
          icon={<ArrowRight size={22} />}
          onClick={handleProceed}
        >
          {session.activeRound === 1
            ? 'Tiến Vào Vòng 2 (Trắc Nghiệm)'
            : session.activeRound === 2
            ? 'Tiến Vào Vòng 3 (Tự Luận)'
            : 'Công Bố Kết Quả Chung Cuộc'}
        </Button>
      </div>
    </div>
  );
};
