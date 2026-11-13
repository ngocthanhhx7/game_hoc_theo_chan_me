import React from 'react';
import styles from './GothicCard.module.css';

interface GothicCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  accentColor?: string;
  hasGothicArch?: boolean;
  className?: string;
}

export const GothicCard: React.FC<GothicCardProps> = ({
  children,
  title,
  subtitle,
  accentColor,
  hasGothicArch = false,
  className = '',
}) => {
  return (
    <div
      className={`${styles.card} ${
        hasGothicArch ? styles.gothicArch : ''
      } ${className}`}
      style={accentColor ? ({ '--accent-glow': accentColor } as any) : undefined}
    >
      {/* Decorative Golden Arch filigree top border */}
      <div className={styles.filigreeTop}>
        <div className={styles.goldLine} />
        <div className={styles.fleurDeLis}>⚜</div>
        <div className={styles.goldLine} />
      </div>

      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      <div className={styles.content}>{children}</div>
    </div>
  );
};
