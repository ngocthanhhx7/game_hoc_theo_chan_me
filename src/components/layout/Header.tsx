import React from 'react';
import {
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Trophy,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useGame } from '@/app/AppProviders';
import { AppView } from '@/types/game';
import styles from './Header.module.css';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export const Header: React.FC = () => {
  const { session, dispatch, canUndo } = useGame();
  useKeyboardShortcuts();
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const navigateTo = (view: AppView) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          className={styles.logoBtn}
          onClick={() => navigateTo('WELCOME')}
          title="Về trang đón tiếp"
        >
          <img className={styles.marianLogo} src={`${import.meta.env.BASE_URL}assets/images/marian-logo-64.webp`} srcSet={`${import.meta.env.BASE_URL}assets/images/marian-logo-64.webp 1x, ${import.meta.env.BASE_URL}assets/images/marian-logo-128.webp 2x`} width={48} height={48} alt="Biểu trưng Đức Maria: chữ M, khăn choàng và hoa huệ" />
          <div className={styles.titleGroup}>
            <span className={styles.mainTitle}>Hành trình ánh sáng</span>
            <span className={styles.subTitle}>HỌC HỎI VỀ ĐỨC MARIA</span>
          </div>
        </button>

        {/* Quick Nav for Rounds */}
        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${
              session.currentView === 'ROUND_1' ? styles.active : ''
            }`}
            onClick={() => dispatch({ type: 'SELECT_ROUND', payload: 1 })}
          >
            Vòng 1: Mật mã
          </button>
          <button
            className={`${styles.navItem} ${
              session.currentView === 'ROUND_2' ? styles.active : ''
            }`}
            onClick={() => dispatch({ type: 'SELECT_ROUND', payload: 2 })}
          >
            Vòng 2: Trắc nghiệm
          </button>
          <button
            className={`${styles.navItem} ${
              session.currentView === 'ROUND_3' ? styles.active : ''
            }`}
            onClick={() => dispatch({ type: 'SELECT_ROUND', payload: 3 })}
          >
            Vòng 3: Xin Vâng
          </button>
          <button
            className={`${styles.navItem} ${
              session.currentView === 'SCOREBOARD' ? styles.active : ''
            }`}
            onClick={() => navigateTo('SCOREBOARD')}
          >
            <Trophy size={16} /> Bảng Điểm
          </button>
        </nav>
      </div>

      <div className={styles.right}>
        {/* Control Tools */}
        <div className={styles.controlsGroup}>
          {canUndo && (
            <button
              className={styles.toolBtn}
              onClick={() => dispatch({ type: 'UNDO_LAST_ACTION' })}
              title="Hoàn tác thao tác trước (Phím U)"
            >
              <RotateCcw size={18} />
              <span className={styles.toolLabel}>Hoàn tác</span>
            </button>
          )}

          <button
            className={styles.toolBtn}
            onClick={() => dispatch({ type: 'TOGGLE_MUTE' })}
            title={session.isMuted ? 'Bật âm thanh (M)' : 'Tắt âm thanh (M)'}
          >
            {session.isMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}
          </button>

          <button
            className={styles.toolBtn}
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Thu nhỏ màn hình (F)' : 'Toàn màn hình trình chiếu (F)'}
          >
            {isFullscreen ? <Minimize2 size={19} /> : <Maximize2 size={19} />}
          </button>

          <button
            className={styles.toolBtn}
            onClick={() => navigateTo('EVENT_INTRO')}
            title="Xem thông tin sự kiện & Giáo lý"
          >
            <HelpCircle size={19} />
          </button>

          <button
            className={styles.toolBtn}
            onClick={() => navigateTo('SETTINGS')}
            title="Cài đặt & Quản lý phiên chơi"
          >
            <Settings size={19} />
          </button>
        </div>
      </div>
    </header>
  );
};
