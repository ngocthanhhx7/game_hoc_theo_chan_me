import { useState } from 'react';
import { BookOpen, Play, Pause, Lock, Eye, CheckCircle, RotateCcw, ArrowRight, Award } from 'lucide-react';
import { useGame } from '@/app/AppProviders';
import { REFLECTION_ARTWORKS } from '@/content/artworks';
import { REFLECTION_DATA } from '@/content/questions/reflection.data';
import { Button } from '@/components/ui/Button';
import { SacredArt, ScoreStrip } from '@/components/sacred/Sacred';
import { Countdown } from '@/components/feedback/Countdown';
import { useTimer } from '@/hooks/useTimer';
import { useSound } from '@/hooks/useSound';
import { announceFeedback } from '@/components/feedback/JourneyEffects';
import { fireDivineCelebration } from '@/components/feedback/ConfettiCelebration';
import styles from './ReflectionView.module.css';

export const ReflectionView = () => {
 const {session,dispatch,canUndo}=useGame();
 const sound=useSound();
 const [category,setCategory]=useState('ALL');
 const [bankOpen,setBankOpen]=useState(!session.round3.currentQuestionId);
 const {currentQuestionId,status,awardedScores}=session.round3;
 const question=REFLECTION_DATA.find(q=>q.id===currentQuestionId);
 const graded=question?awardedScores[question.id]:undefined;
 const revealed=status==='REVEALED'||status==='GRADED'||!!graded;
 const timer=useTimer({durationSeconds:60,onExpire:()=>{dispatch({type:'R3_LOCK_ANSWER'});sound.playIncorrect();announceFeedback('Hết giờ suy nghĩ','Cùng lắng nghe phần chia sẻ và công bố lời giải.','encourage');},onTick:left=>{if(left>0&&left<=5)sound.playTick();}});
 const choose=(id:string)=>{timer.reset(60);dispatch({type:'R3_ACTIVATE_QUESTION',payload:id});setBankOpen(false);sound.playClick();};
 const grade=(grade:'FULL'|'PARTIAL'|'NONE')=>{if(!question||graded||status!=='REVEALED')return;const score=grade==='FULL'?20:grade==='PARTIAL'?10:0;dispatch({type:'R3_GRADE_ANSWER',payload:{questionId:question.id,teamId:session.activeTeamId||session.teams[0]?.id||'',grade,score}});if(score>0){sound.playCorrect();announceFeedback(`Đã ghi nhận +${score} điểm`,'Cảm ơn phần chia sẻ của bạn!','success');}else{sound.playClick();announceFeedback('Cảm ơn bạn đã thử sức!','Cùng đọc lại các ý chính nhé.','encourage');}};
 const next=REFLECTION_DATA.find(q=>q.id!==question?.id&&!awardedScores[q.id]);
 return <div className={styles.container}>
  <header className={styles.heading}><div><p className="game-eyebrow">Vòng 3 · Lắng đọng</p><h1 className="game-heading">Hành trình Xin Vâng</h1></div><Countdown seconds={timer.remainingSeconds} running={timer.isRunning} label={!question?'Chọn câu hỏi':status==='SELECTING'?'Sẵn sàng':status==='THINKING'?(timer.isRunning?'Đang suy nghĩ':'Tạm dừng'):status==='LOCKED'?'Đã khóa lượt':graded?'Đã chấm':'Đã công bố'}/></header>
  <details className={styles.bank} open={bankOpen} onToggle={e=>setBankOpen(e.currentTarget.open)}><summary><BookOpen size={19}/> Khám phá 12 câu hỏi <span>{Object.keys(awardedScores).length} đã hoàn thành</span></summary><div className={styles.categories}>{[['ALL','Tất cả'],['LIFE','Cuộc đời'],['DOGMAS','Tín điều'],['FAITH_INQUIRIES','Giải đáp']].map(([id,label])=><button key={id} aria-pressed={category===id} onClick={()=>setCategory(id)}>{label}</button>)}</div><div className={styles.questions}>{REFLECTION_DATA.filter(q=>category==='ALL'||category===q.category).map(q=><button key={q.id} onClick={()=>choose(q.id)} aria-pressed={q.id===currentQuestionId}><span>{awardedScores[q.id]?<CheckCircle size={18}/>:String(q.index).padStart(2,'0')}</span>{q.prompt}</button>)}</div></details>
  <div className={styles.stage}>
   <div className={styles.artColumn}><SacredArt key={question?.id || 'intro'} kind={question ? REFLECTION_ARTWORKS[question.id] : 'annunciation'} hideTitle={!!question&&!revealed} className={styles.reflectionArt}/><span className={styles.handNote}>Lắng nghe bằng cả trái tim.</span></div>
   <section className={styles.questionArea}>{question?<><p className="game-eyebrow">{question.categoryLabel} · Câu {String(question.index).padStart(2,'0')}</p><h2>{question.prompt}</h2>{!revealed&&<p className={styles.invitation}>Một chút suy nghĩ, một lời chia sẻ…</p>}
    {revealed&&<div className={styles.manuscript}><h3><BookOpen size={20}/> Cùng mở trang lời giải</h3><p>{question.referenceAnswer}</p><details className={styles.keyPoints} open><summary>Các ý chính</summary><ul>{question.keyPoints.map(pt=><li key={pt}>{pt}</li>)}</ul></details><details className={styles.sources}><summary>Nguồn tham khảo</summary><p>{question.reference}</p></details></div>}
   </>:<div className={styles.invite}><BookOpen size={40}/><h2>Một câu hỏi,<br/>một điều để khám phá.</h2><Button variant="outline" onClick={()=>setBankOpen(true)}>Chọn câu hỏi để bắt đầu</Button></div>}</section>
  </div>
  <ScoreStrip disabled={status==='THINKING'||status==='LOCKED'||status==='REVEALED'}/>
  <div className="game-toolbar"><span>{session.gameMode==='MC_MODE'?'ĐIỀU KHIỂN MC':'TỰ ĐỐI CHIẾU & TỰ ĐÁNH GIÁ'}</span>
   {question&&status==='SELECTING'&&!graded&&<Button icon={<Play size={17}/>} onClick={()=>{timer.reset(60);timer.start();dispatch({type:'R3_START_THINKING'});}}>Bắt đầu · 60 giây</Button>}
   {question&&status==='THINKING'&&<><Button variant="outline" icon={timer.isRunning?<Pause size={17}/>:<Play size={17}/>} onClick={()=>timer.isRunning?timer.pause():timer.start()}>{timer.isRunning?'Tạm dừng':'Tiếp tục'}</Button><Button variant="outline" icon={<Lock size={17}/>} onClick={()=>{timer.pause();dispatch({type:'R3_LOCK_ANSWER'});}}>Khóa lượt trả lời</Button></>}
   {question&&status==='LOCKED'&&<Button icon={<Eye size={17}/>} onClick={()=>{timer.pause();dispatch({type:'R3_REVEAL_ANSWER'});}}>Công bố đáp án tham khảo</Button>}
   {question&&status==='REVEALED'&&!graded&&<><Button onClick={()=>grade('FULL')}>Đúng trọn vẹn (+20đ)</Button><Button variant="outline" onClick={()=>grade('PARTIAL')}>Đúng một phần (+10đ)</Button><Button variant="ghost" onClick={()=>grade('NONE')}>Chưa đạt (0đ)</Button></>}
   <Button variant="ghost" disabled={!canUndo} icon={<RotateCcw size={16}/>} onClick={()=>{timer.reset(60);dispatch({type:'UNDO_LAST_ACTION'});}}>Hoàn tác</Button>
   {graded&&next&&<Button icon={<ArrowRight size={17}/>} onClick={()=>choose(next.id)}>Câu tiếp theo</Button>}
   <Button variant="outline" icon={<Award size={17}/>} onClick={()=>{timer.pause();sound.playVictory();fireDivineCelebration();announceFeedback('Cảm ơn những lời chia sẻ!','Cùng nhìn lại thành quả hành trình.','celebration');dispatch({type:'SET_VIEW',payload:'SCOREBOARD'});}}>Hoàn tất vòng 3</Button>
  </div>{session.gameMode==='SOLO_MODE'&&<p className="game-note">Điểm vòng này do bạn tự đối chiếu và tự đánh giá theo đáp án tham khảo.</p>}
 </div>;
};
