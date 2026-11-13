import { useState } from 'react';
import { useGame } from '@/app/AppProviders';
import styles from './Sacred.module.css';
import { ARTWORKS } from '@/content/artworks';

export function SacredArt({ kind = 'mary', className = '', priority = false, hideTitle = false, showCaption = true }: { kind?: string; className?: string; priority?: boolean; hideTitle?: boolean; showCaption?: boolean }) {
  const [failed, setFailed] = useState(false);
  const art = ARTWORKS[kind] || ARTWORKS.mary;
  return <figure className={`${styles.art} ${className}`}>
    <div className={styles.artImage}>
      {failed ? <div className={styles.fallback}><span>Tranh theo chủ đề</span></div> : <img key={kind} src={`${import.meta.env.BASE_URL}${art.path}`} srcSet={art.smallPath ? `${import.meta.env.BASE_URL}${art.smallPath} 840w, ${import.meta.env.BASE_URL}${art.path} 1680w` : undefined} sizes="(max-width: 700px) 100vw, 40vw" alt={hideTitle ? 'Tranh minh họa theo chủ đề câu hỏi' : art.title} style={{objectPosition:art.position}} loading={priority ? 'eager' : 'lazy'} onError={() => setFailed(true)} />}
    </div>
    {showCaption && <figcaption>{art.generated ? <span>Minh họa AI · Marian Light Journey</span> : <a href={art.source} target="_blank" rel="noreferrer">{!hideTitle && `${art.title} · `}{art.author} · {art.license}</a>}</figcaption>}
  </figure>;
}

export function TeamEmblem({ color, index = 0 }: { color: string; index?: number }) {
  return <span className={styles.emblem} style={{ color, backgroundColor: `${color}22` }} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>;
}

export function ScoreStrip({ disabled = false }: { disabled?: boolean }) {
  const { session, dispatch } = useGame();
  return <section className={styles.scoreStrip} aria-label="Bảng điểm đội chơi">
    <span className={styles.scoreLabel}>{session.gameMode === 'MC_MODE' ? 'ĐỘI TRẢ LỜI' : 'ĐIỂM CỦA BẠN'}</span>
    <div className={styles.teams}>{session.teams.map((team, i) => <button key={team.id} disabled={disabled} aria-pressed={session.activeTeamId === team.id} className={session.activeTeamId === team.id ? styles.selectedTeam : ''} onClick={() => dispatch({type:'SET_ACTIVE_TEAM', payload:team.id})}>
      <TeamEmblem color={team.color} index={i} /><span>{team.name.replace(/ \(.+\)$/, '')}</span><strong>{team.score}<small>đ</small></strong>
    </button>)}</div>
  </section>;
}
