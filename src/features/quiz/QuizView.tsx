import { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle, XCircle, ArrowRight, Lock, Eye, RotateCcw } from 'lucide-react';
import { useGame } from '@/app/AppProviders';
import { QUIZ_ARTWORKS } from '@/content/artworks';
import { QUIZ_DATA } from '@/content/questions/quiz.data';
import { QuizOptionKey } from '@/types/game';
import { Button } from '@/components/ui/Button';
import { Countdown } from '@/components/feedback/Countdown';
import { SacredArt, ScoreStrip } from '@/components/sacred/Sacred';
import { useTimer } from '@/hooks/useTimer';
import { useSound } from '@/hooks/useSound';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { announceFeedback } from '@/components/feedback/JourneyEffects';
import { fireDivineCelebration } from '@/components/feedback/ConfettiCelebration';
import styles from './QuizView.module.css';

export const QuizView = () => {
  const {session,dispatch,canUndo}=useGame();
  const sound=useSound();
  const {status,selectedOption,currentQuestionIndex:index}=session.round2;
  const question=QUIZ_DATA[index];
  const artworkId=QUIZ_ARTWORKS[question.id];

  const [pending,setPending]=useState<QuizOptionKey|null>(null);
  const timer=useTimer({durationSeconds:20,onExpire:()=>{dispatch({type:'R2_TIMEOUT'});sound.playIncorrect();announceFeedback('Hết giờ!', 'Lượt trả lời đã khóa. MC có thể công bố đáp án.', 'encourage');},onTick:left=>{if(left>0&&left<=5)sound.playTick();}});
  useEffect(()=>{ if(status==='READY'){timer.reset(20);setPending(null);} if(status==='LOCKED'||status==='REVEALED')timer.pause(); },[status,index,timer.reset,timer.pause]);
  const start=()=>{if(status!=='READY')return;timer.reset(20);timer.start();dispatch({type:'R2_START_QUESTION'});sound.playClick();};
  const toggle=()=>{if(status==='READY')start();else if(status==='ACTIVE'){if(timer.isRunning)timer.pause();else timer.start();}};
  useKeyboardShortcuts({timerOnly:true,onToggleTimer:toggle});
  const lock=()=>{if(status!=='ACTIVE'||!pending)return;timer.pause();dispatch({type:'R2_LOCK_ANSWER',payload:{option:pending,teamId:session.activeTeamId||undefined,timeSpentMs:(20-timer.remainingSeconds)*1000}});sound.playClick();};
  const reveal=()=>{if(status!=='LOCKED')return;dispatch({type:'R2_REVEAL_ANSWER'});if(selectedOption===question.answer){sound.playCorrect();announceFeedback('Chính xác! +20 điểm','Một câu trả lời thật tuyệt.','success');}else if(selectedOption){sound.playIncorrect();announceFeedback('Cùng ghi nhớ nhé!','Đọc lời giải và thử sức ở câu tiếp theo.','encourage');}else sound.playClick();};
  const next=()=>{if(status!=='REVEALED')return;window.scrollTo(0,0);if(index+1===QUIZ_DATA.length){sound.playVictory();fireDivineCelebration();announceFeedback('Hoàn thành thử thách!','Cùng xem thành quả của các đội.','celebration');}timer.reset(20);setPending(null);dispatch({type:'R2_NEXT_QUESTION'});};
  const phaseLabel=status==='READY'?'Sẵn sàng':status==='ACTIVE'?(timer.isRunning?'Đang trả lời':'Tạm dừng'):status==='LOCKED'?(selectedOption?'Đã khóa đáp án':'Hết giờ · Đã khóa lượt'):'Đã công bố';
  return <div className={styles.container}>
    <header className={styles.metaBar}><div><p className="game-eyebrow">Vòng 2 · Thử sức</p><h1 className="game-heading">Thử thách đức tin</h1></div><div className={styles.progress}><span>Câu <strong>{String(index+1).padStart(2,'0')}</strong> / {QUIZ_DATA.length}</span><div><i style={{width:`${(index+1)/QUIZ_DATA.length*100}%`}}/></div></div><Countdown seconds={timer.remainingSeconds} running={timer.isRunning} label={phaseLabel}/></header>
    <section className={styles.questionCard} key={question.id}><SacredArt key={artworkId} kind={artworkId} hideTitle={status!=='REVEALED'} priority className={styles.questionArtwork}/><div className={styles.questionCopy}><span className={styles.questionLabel}>CÂU HỎI {String(index+1).padStart(2,'0')} <span>+20 điểm</span></span><h2>{question.prompt}</h2></div></section>
    <div className={styles.optionsGrid}>{(['A','B','C','D'] as QuizOptionKey[]).map(key=>{
      const chosen=(status==='ACTIVE'?pending:selectedOption)===key;
      const correct=status==='REVEALED'&&question.answer===key;
      const wrong=status==='REVEALED'&&chosen&&!correct;
      return <button key={key} aria-pressed={chosen} className={`${styles.optionCard} ${chosen?styles.selected:''} ${correct?styles.correct:''} ${wrong?styles.wrong:''}`} disabled={status!=='ACTIVE'||!timer.isRunning} onClick={()=>{setPending(key);sound.playClick();}}><span className={styles.optionKey}>{key}</span><span className={styles.optionText}>{question.options[key]}</span>{correct&&<span className={styles.result}><CheckCircle size={22}/> Đúng</span>}{wrong&&<span className={styles.result}><XCircle size={22}/> Chưa đúng</span>}</button>;
    })}</div>
    {status==='LOCKED'&&<p className={styles.lockedNote}><Lock size={16}/>{selectedOption?`Đã khóa phương án ${selectedOption}. Chờ công bố đáp án.`:'Hết thời gian trả lời. Chờ công bố đáp án.'}</p>}
    {status==='REVEALED'&&<section className={styles.explanation}><h3><CheckCircle size={20}/> Đáp án {question.answer}</h3><p>{question.explanation}</p>{question.reference&&<details className="game-help"><summary>Nguồn tham khảo</summary><p>{question.reference}</p></details>}</section>}
    <ScoreStrip disabled={status==='ACTIVE'||status==='LOCKED'}/>
    <div className="game-toolbar"><span>{session.gameMode==='MC_MODE'?'ĐIỀU KHIỂN MC':'LƯỢT CỦA BẠN'}</span>
      {status==='READY'&&<Button icon={<Play size={18}/>} onClick={start}>Bắt đầu đếm giờ (20s)</Button>}
      {status==='ACTIVE'&&<><Button variant="outline" icon={timer.isRunning?<Pause size={17}/>:<Play size={17}/>} onClick={toggle}>{timer.isRunning?'Tạm dừng':'Tiếp tục'}</Button><Button disabled={!pending} icon={<Lock size={17}/>} onClick={lock}>Khóa đáp án{pending?` ${pending}`:''}</Button></>}
      {status==='LOCKED'&&<Button icon={<Eye size={17}/>} onClick={reveal}>Công bố đáp án</Button>}
      <Button variant="ghost" icon={<RotateCcw size={17}/>} disabled={!canUndo} onClick={()=>{timer.pause();setPending(null);dispatch({type:'UNDO_LAST_ACTION'});}}>Hoàn tác</Button>
      {status==='REVEALED'&&<Button icon={<ArrowRight size={17}/>} onClick={next}>{index+1<QUIZ_DATA.length?'Câu tiếp theo':'Xem bảng điểm vòng 2'}</Button>}
    </div>
  </div>;
};
