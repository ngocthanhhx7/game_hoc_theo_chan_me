import { useState } from 'react';
import { Plus, X, ArrowRight, ArrowLeft, Users } from 'lucide-react';
import { useGame } from '@/app/AppProviders';
import { Button } from '@/components/ui/Button';
import { SacredArt, TeamEmblem } from '@/components/sacred/Sacred';
import { Team } from '@/types/game';
import { SACRED_TEAM_PRESETS } from '@/domain/teams/team-manager';
import styles from './TeamSetupView.module.css';

export const TeamSetupView = () => {
 const {session,dispatch}=useGame();
 const [teams,setTeams]=useState<Team[]>(session.teams);
 const add=()=>{if(teams.length>=6)return;const preset=SACRED_TEAM_PRESETS[teams.length];setTeams([...teams,{id:crypto.randomUUID(),name:preset.name.replace(/ \(.+\)$/,''),color:preset.color,score:0,roundScores:{round1:0,round2:0,round3:0}}]);};
 const valid=teams.length>0&&teams.every(t=>t.name.trim());
 return <div className={styles.container}>
  <header className={styles.header}><Button variant="ghost" icon={<ArrowLeft size={17}/>} onClick={()=>dispatch({type:'SET_VIEW',payload:'WELCOME'})}>Quay lại</Button><div><p className="game-eyebrow"><Users size={16}/> Cùng cộng đoàn</p><h1 className="game-heading">Đoàn con quy tụ</h1></div><span className={styles.count}>{teams.length} / 6 đội</span></header>
  <div className={styles.layout}><section className={styles.teamArea} aria-label="Thiết lập các đội thi đấu"><div className={styles.teamList}>{teams.map((team,index)=><article className={styles.teamCard} key={team.id}>
   <TeamEmblem color={team.color} index={index}/><div className={styles.fields}><label htmlFor={`name-${team.id}`}>ĐỘI {String(index+1).padStart(2,'0')}</label><input id={`name-${team.id}`} maxLength={40} value={team.name} onChange={e=>setTeams(teams.map(t=>t.id===team.id?{...t,name:e.target.value}:t))} placeholder="Tên đội của bạn…" aria-invalid={!team.name.trim()}/></div>
   <button className={styles.remove} aria-label={`Xóa đội ${index+1}`} disabled={teams.length<=1} onClick={()=>setTeams(teams.filter(t=>t.id!==team.id))}><X size={18}/></button>
   <details className={styles.customize}><summary>Chọn màu đại diện</summary><div className={styles.palette}>{SACRED_TEAM_PRESETS.map((p,presetIndex)=><button key={p.color} title={p.name} aria-label={p.name} aria-pressed={p.color===team.color} onClick={()=>setTeams(teams.map(t=>t.id===team.id?{...t,color:p.color}:t))}><TeamEmblem color={p.color} index={presetIndex}/></button>)}</div></details>
  </article>)}</div><Button className={styles.add} variant="outline" icon={<Plus size={18}/>} disabled={teams.length>=6} onClick={add}>{teams.length>=6?'Đã đủ 6 đội':'Thêm đội mới'}</Button></section>
  <aside className={styles.side}><SacredArt kind="annunciation" className={styles.setupArt}/><div className={styles.confirm}><span className={styles.hand}>Cùng nhau, ta sẵn sàng!</span><p className="game-note">Đặt tên, chọn màu, rồi bước vào vòng khám phá.</p><Button disabled={!valid} icon={<ArrowRight size={18}/>} onClick={()=>{dispatch({type:'SET_TEAMS',payload:teams.map(t=>({...t,name:t.name.trim()}))});dispatch({type:'SELECT_ROUND',payload:1});}}>Hoàn tất — Bắt đầu vòng 1</Button>{!valid&&<p role="alert">Mỗi đội cần có tên trước khi bắt đầu.</p>}</div></aside>
  </div>
 </div>;
};
