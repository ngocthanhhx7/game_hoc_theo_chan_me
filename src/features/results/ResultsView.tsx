import React, { useEffect, useRef } from 'react';
import { Trophy, Sparkles, RotateCcw, Home } from 'lucide-react';
import { useGame } from '@/app/AppProviders';
import { Button } from '@/components/ui/Button';
import { sortTeamsByScore } from '@/domain/scoring/scoring-rules';
import { fireDivineCelebration } from '@/components/feedback/ConfettiCelebration';
import { useSound } from '@/hooks/useSound';
import styles from './ResultsView.module.css';

export const ResultsView: React.FC = () => {
  const { session, dispatch } = useGame();
  const { playVictory, playClick } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedTeams = sortTeamsByScore(session.teams);
  const champion = sortedTeams[0];

  useEffect(() => {
    playVictory();
    fireDivineCelebration();
    const timer = setTimeout(() => {
      fireDivineCelebration();
    }, 1500);
    return () => clearTimeout(timer);
  }, [playVictory]);

  const handleReset = () => {
    playClick();
    dispatch({ type: 'RESET_GAME' });
    dispatch({ type: 'SET_VIEW', payload: 'WELCOME' });
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.divineGlow} />

      <div className={styles.card}>
        <div className={styles.trophyAura}>
          <div className={styles.laurelRing}>⚜</div>
          <Trophy size={64} className={styles.trophyIcon} />
        </div>

        <span className={styles.championBadge}>VINH DANH QUÁN QUÂN CHUNG CUỘC</span>
        <h2 className={styles.championName}>
          {champion ? champion.name : 'Người Chơi Xuất Sắc'}
        </h2>
        <div className={styles.championScore}>
          {champion ? champion.score : 0} <span>ĐIỂM</span>
        </div>

        {/* Spiritual Benediction for the Event */}
        <div className={styles.messageBox}>
          <div className={styles.messageHeader}>
            <Sparkles size={20} className={styles.messageIcon} />
            <h4>TÂM TÌNH TẠ ƠN & LINH ĐẠO TẬN HIẾN</h4>
          </div>
          <p className={styles.messageContent}>
            Cảm ơn cộng đoàn đã cùng nhau học hỏi và chia sẻ. Xin cho những điều
            chúng ta khám phá hôm nay trở thành lời Xin Vâng trong đời sống mỗi ngày.

          </p>
          <span className={styles.eventSignature}>
            — Gặp mặt Gia đình Tận hiến • Lương Sơn, ngày 25 tháng 11 năm 2026 —
          </span>
        </div>

        {/* Final Ranking Overview */}
        <div className={styles.rankingPills}>
          {sortedTeams.map((t, idx) => (
            <div key={t.id} className={styles.teamPill}>
              <span className={styles.pillRank}>#{idx + 1}</span>
              <span
                className={styles.pillDot}
                style={{ backgroundColor: t.color }}
              />
              <span className={styles.pillTitle}>{t.name}</span>
              <span className={styles.pillPts}>{t.score}đ</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className={styles.actionsBar}>
          <Button
            variant="outline"
            size="lg"
            icon={<Home size={18} />}
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'WELCOME' })}
          >
            Về Trang Chủ
          </Button>

          <Button
            variant="gold"
            size="lg"
            icon={<RotateCcw size={18} />}
            onClick={handleReset}
          >
            Bắt Đầu Phiên Chơi Mới
          </Button>
        </div>
      </div>
    </div>
  );
};
