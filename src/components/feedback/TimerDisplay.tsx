import React from 'react';
import styles from './TimerDisplay.module.css';

interface TimerDisplayProps {
  remainingSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
  onToggle?: () => void;
  size?: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  remainingSeconds,
  totalSeconds,
  isRunning,
  onToggle,
  size = 110,
}) => {
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(1, Math.max(0, remainingSeconds / totalSeconds));
  const strokeDashoffset = circumference - progress * circumference;

  const isUrgent = remainingSeconds <= 5 && remainingSeconds > 0;

  return (
    <div
      className={`${styles.container} ${isUrgent ? styles.urgent : ''} ${
        isRunning ? styles.running : ''
      }`}
      onClick={onToggle}
      role="timer"
      aria-live="polite"
      aria-label={`Thời gian còn lại: ${remainingSeconds} giây`}
      title={onToggle ? 'Nhấn để Tạm dừng / Tiếp tục' : undefined}
    >
      <svg width={size} height={size} className={styles.svg}>
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={styles.track}
          strokeWidth={strokeWidth}
        />
        {/* Active progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={styles.indicator}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className={styles.label}>
        <span className={styles.timeNumber}>{remainingSeconds}</span>
        <span className={styles.timeUnit}>giây</span>
      </div>
    </div>
  );
};
