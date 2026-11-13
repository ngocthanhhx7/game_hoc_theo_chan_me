import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Play, BookOpen, Users, User, KeyRound, ArrowRight, CircleHelp } from 'lucide-react';
import { useGame } from '@/app/AppProviders';
import { Button } from '@/components/ui/Button';
import styles from './WelcomeView.module.css';
import { SacredArt } from '@/components/sacred/Sacred';
import { soundManager } from '@/lib/audio';

export const WelcomeView: React.FC = () => {
  const { session, dispatch } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (session.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(`.${styles.roseWindow}`, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
      })
        .from(
          `.${styles.sacredTitle}`,
          {
            y: 35,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.6'
        )
        .from(
          `.${styles.subHeading}`,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          `.${styles.actionCards}`,
          {
            y: 30,
            opacity: 0,
            stagger: 0.18,
            duration: 0.8,
          },
          '-=0.4'
        );
    },
    { scope: containerRef, dependencies: [session.reducedMotion] }
  );

  const startMCMode = () => {
    soundManager.playClick();
    dispatch({ type: 'SET_GAME_MODE', payload: 'MC_MODE' });
    dispatch({ type: 'SET_VIEW', payload: 'TEAM_SETUP' });
  };

  const startSoloMode = () => {
    soundManager.playClick();
    dispatch({ type: 'SET_GAME_MODE', payload: 'SOLO_MODE' });
    dispatch({
      type: 'SET_TEAMS',
      payload: [
        {
          id: 'solo-player',
          name: 'Người Chơi',
          color: '#d6b36b',
          score: 0,
          roundScores: { round1: 0, round2: 0, round3: 0 },
        },
      ],
    });
    dispatch({ type: 'SET_VIEW', payload: 'ROUND_1' });
  };

  return (
    <div className={styles.welcomePage} ref={containerRef}>
      <div className={styles.stainedGlassGlow} aria-hidden="true" />
      <div className={styles.eventBadge}>GIA ĐÌNH TẬN HIẾN · LƯƠNG SƠN · 25.11.2026</div>
      <div className={styles.roseWindow}>
        <span className={styles.artNote}>Một hành trình, cùng Mẹ.</span>
        <SacredArt kind="virgin-prayer" priority showCaption={false} className={styles.portrait} />
      </div>
      <div className={styles.heroContent}>
        <p className={styles.subHeading}>MARIAN LIGHT JOURNEY</p>
        <h1 className={styles.sacredTitle}>Cùng Mẹ bước vào<br /><em>hành trình ánh sáng.</em></h1>
        <p className={styles.tagline}>Khám phá, thử sức và cùng nhau sống lời Xin Vâng.</p>
        <div className={styles.actionCards}>
          <div className={styles.modeCard}>
            <Users size={22} aria-hidden="true" /><h2>Cùng cộng đoàn</h2>
            <p>MC dẫn dắt · Các đội cùng chơi</p>
            <Button icon={<Play size={18} />} onClick={startMCMode}>Bắt Đầu Trình Chiếu</Button>
          </div>
          <div className={styles.modeCard}>
            <User size={22} aria-hidden="true" /><h2>Tự mình khám phá</h2>
            <p>Học hỏi theo nhịp độ của bạn</p>
            <Button variant="outline" icon={<User size={18} />} onClick={startSoloMode}>Chơi Một Mình</Button>
          </div>
        </div>
        <button className={styles.learnLink} onClick={() => dispatch({type:'SET_VIEW',payload:'EVENT_INTRO'})}><BookOpen size={17} /> Tìm hiểu chủ đề và giáo lý <ArrowRight size={16} /></button>
      </div>
      <div className={styles.journey}>
        <div className={styles.journeyLabel}><span>Ba chặng, một hành trình</span><small>Bạn đã sẵn sàng?</small></div>
        <ol className={styles.journeySteps}>
          <li className={styles.chapterGlass}><KeyRound size={24} /><span>01</span><h3>Mật mã đức tin</h3><small>11 mảnh ghép khám phá</small></li>
          <li className={styles.chapterChurch}><CircleHelp size={24} /><span>02</span><h3>Thử thách đức tin</h3><small>10 câu hỏi thử sức</small></li>
          <li className={styles.chapterArt}><BookOpen size={24} /><span>03</span><h3>Hành trình Xin Vâng</h3><small>Lắng đọng và chia sẻ</small></li>
        </ol>
      </div>
    </div>
  );
};
