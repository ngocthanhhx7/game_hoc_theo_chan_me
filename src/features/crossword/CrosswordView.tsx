import { useState } from 'react';
import { CheckCircle, XCircle, KeyRound, Sparkles, ArrowRight, Send, Eye, RotateCcw, BookOpen, Play, Pause, Lock } from 'lucide-react';
import { useGame } from '@/app/AppProviders';
import { CROSSWORD_DATA } from '@/content/questions/crossword.data';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { SacredArt, ScoreStrip } from '@/components/sacred/Sacred';
import { checkAnswerMatch } from '@/lib/normalize';
import { useSound } from '@/hooks/useSound';
import { fireDivineCelebration } from '@/components/feedback/ConfettiCelebration';
import { announceFeedback } from '@/components/feedback/JourneyEffects';
import styles from './CrosswordView.module.css';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useTimer } from '@/hooks/useTimer';
import { Countdown } from '@/components/feedback/Countdown';

export const CrosswordView = () => {
  const { session, dispatch, canUndo } = useGame();
  const sound = useSound();
  const [activeId, setActiveId] = useState(session.round1.selectedClueId || CROSSWORD_DATA[0].id);
  const [phase, setPhase] = useState<'READY'|'ACTIVE'|'LOCKED'|'REVEALED'|'GRADED'>('READY');
  const timer = useTimer({durationSeconds:30,onExpire:()=>{setPhase('LOCKED');sound.playIncorrect();announceFeedback('Hết giờ!', 'MC có thể công bố đáp án.', 'encourage');},onTick:left=>{if(left>0&&left<=5)sound.playTick();}});
  const [soloInput, setSoloInput] = useState('');
  const [soloError, setSoloError] = useState('');
  const [earlyGuess, setEarlyGuess] = useState(false);
  const [earlyTeam, setEarlyTeam] = useState(session.activeTeamId || session.teams[0]?.id || '');
  const clue = CROSSWORD_DATA.find(c => c.id === activeId) || CROSSWORD_DATA[0];
  const solved = session.round1.solvedClues.includes(clue.id);
  const count = session.round1.solvedClues.length;
  const complete = session.round1.isFullCipherRevealed;
  const isMC = session.gameMode === 'MC_MODE';
  const revealed = solved || phase === 'REVEALED' || phase === 'GRADED';
  const select = (id: string) => { sound.playClick(); timer.reset(30); setPhase('READY'); setActiveId(id); setSoloInput(''); setSoloError(''); dispatch({type:'R1_SELECT_CLUE',payload:id}); };
  const celebrate = () => { sound.playVictory(); fireDivineCelebration(); announceFeedback('Chúc mừng cộng đoàn!', 'Mật mã đã được thắp sáng.', 'celebration'); };
  const solve = (correct: boolean) => {
    if (solved || (isMC && phase !== 'REVEALED') || phase === 'GRADED') return;
    timer.pause();
    if (isMC || correct) setPhase('GRADED');
    if (!correct) { sound.playIncorrect(); announceFeedback('Một chút nữa thôi!', 'Cùng thử sức ở lượt tiếp theo nhé.', 'encourage'); return; }
    dispatch({type:'R1_SOLVE_CLUE',payload:{clueId:clue.id,teamId:session.activeTeamId || undefined,points:10}});
    if (count + 1 === CROSSWORD_DATA.length) celebrate();
    else { sound.playCorrect(); announceFeedback('Chính xác! +10 điểm', 'Một mảnh ghép mới đã được mở.', 'success'); }
  };
  useKeyboardShortcuts({timerOnly:true,onToggleTimer:()=>{if(phase==='READY'&&!solved){timer.reset(30);timer.start();setPhase('ACTIVE');}else if(phase==='ACTIVE'){if(timer.isRunning)timer.pause();else timer.start();}}});
  const groups = [CROSSWORD_DATA.slice(0,3),CROSSWORD_DATA.slice(3,5),CROSSWORD_DATA.slice(5,7),CROSSWORD_DATA.slice(7)];
  return <div className={styles.container}>
    <header className={styles.heading}><div><p className="game-eyebrow">Vòng 1 · Khám phá</p><h1 className="game-heading">11 mật mã đức tin</h1></div><Countdown seconds={timer.remainingSeconds} running={timer.isRunning} label={solved?'Đã giải':phase==='READY'?'Sẵn sàng':phase==='ACTIVE'?(timer.isRunning?'Đang trả lời':'Tạm dừng'):phase==='LOCKED'?'Đã khóa lượt':'Đã công bố'}/></header>
    <section className={styles.cipherAltar} aria-label="Mật mã trung tâm">
      <div className={styles.cipherMeta}><span>MẬT MÃ TRUNG TÂM</span><span>Đã giải <strong>{count} / 11</strong></span></div>
      <div className={styles.cipherLetters}>{groups.map((group,i)=><div className={styles.wordGroup} key={i}>{group.map(c=><span key={c.id} className={`${styles.cipherBox} ${complete || session.round1.solvedClues.includes(c.id) ? styles.revealedCipher : ''}`}>{complete || session.round1.solvedClues.includes(c.id) ? c.cipherLetter : <span aria-label="Chưa mở">?</span>}</span>)}</div>)}</div>
    </section>
    <div className={styles.boardLayout}>
      <aside className={styles.selector}><p className="game-eyebrow">Chọn mảnh ghép</p><div className={styles.clueGrid}>{CROSSWORD_DATA.map(c=><button key={c.id} onClick={()=>select(c.id)} aria-label={`Gợi ý ${c.index}`} aria-pressed={c.id===activeId} className={`${styles.medallion} ${c.id===activeId?styles.active:''} ${session.round1.solvedClues.includes(c.id)?styles.solved:''}`}><span>{String(c.index).padStart(2,'0')}</span>{session.round1.solvedClues.includes(c.id)?<CheckCircle size={16}/>:null}</button>)}</div>
      {isMC && !complete && <Button variant="outline" icon={<KeyRound size={16}/>} onClick={()=>setEarlyGuess(true)}>Đoán sớm (+30đ)</Button>}
      <details className="game-help"><summary>Cách chơi</summary><p>Giải đúng một gợi ý để mở một chữ của mật mã. Mỗi câu đúng được 10 điểm. Đây là trò giải mã, không phải ô chữ giao nhau.</p></details></aside>
      <section className={styles.clueStage} key={clue.id}>
        <SacredArt kind="glass" className={styles.clueArtwork}/>
        <div className={styles.clueContent}><p className="game-eyebrow"><BookOpen size={16}/> Gợi ý {String(clue.index).padStart(2,'0')} <span>+10 điểm</span></p><h2 className={styles.prompt}>{clue.clue}</h2><p className="game-note">{clue.rowLength} chữ cái</p>
        {revealed && <div className={styles.answer}><span>Đáp án</span><strong>{clue.answer}</strong><p>{clue.explanation}</p><small>{clue.reference}</small></div>}
        {!isMC && !solved && <form className={styles.soloForm} onSubmit={e=>{e.preventDefault();if(checkAnswerMatch(soloInput,clue.answer,clue.aliases)){solve(true);setSoloError('');}else{sound.playIncorrect();setSoloError('Chưa chính xác. Bạn thử lại nhé!');}}}><label htmlFor="cipher-answer">Câu trả lời của bạn</label><div><input disabled={phase!=='ACTIVE'||!timer.isRunning} id="cipher-answer" value={soloInput} onChange={e=>setSoloInput(e.target.value)} placeholder="Nhập câu trả lời…" autoComplete="off"/><Button disabled={phase!=='ACTIVE'||!timer.isRunning} type="submit" icon={<Send size={17}/>}>Kiểm tra</Button></div>{soloError&&<p role="alert">{soloError}</p>}</form>}
        {solved&&<p className={styles.solvedText}><CheckCircle size={18}/> Mảnh ghép đã mở</p>}</div>
      </section>
    </div>
    <ScoreStrip disabled={phase==='ACTIVE'||phase==='LOCKED'||phase==='REVEALED'}/>
    <div className="game-toolbar"><span>{isMC?'ĐIỀU KHIỂN MC':'HÀNH TRÌNH CỦA BẠN'}</span>
      {phase==='READY'&&!solved&&<Button icon={<Play size={17}/>} onClick={()=>{timer.reset(30);timer.start();setPhase('ACTIVE');sound.playClick();}}>Bắt đầu · 30 giây</Button>}
      {phase==='ACTIVE'&&!solved&&<><Button variant="outline" icon={timer.isRunning?<Pause size={17}/>:<Play size={17}/>} onClick={()=>timer.isRunning?timer.pause():timer.start()}>{timer.isRunning?'Tạm dừng':'Tiếp tục'}</Button>{isMC&&<Button variant="outline" icon={<Lock size={17}/>} onClick={()=>{timer.pause();setPhase('LOCKED');}}>Khóa lượt trả lời</Button>}</>}
      {phase==='LOCKED'&&!solved&&<Button icon={<Eye size={17}/>} onClick={()=>{setPhase(isMC?'REVEALED':'GRADED');sound.playClick();}}>Công bố đáp án</Button>}
      {isMC&&phase==='REVEALED'&&!solved&&<><Button icon={<CheckCircle size={18}/>} onClick={()=>solve(true)}>Chính xác (+10 điểm)</Button><Button variant="outline" icon={<XCircle size={18}/>} onClick={()=>solve(false)}>Chưa đúng</Button></>}
      {(solved||phase==='GRADED')&&<Button variant="marian" icon={<ArrowRight size={17}/>} onClick={()=>{const next=CROSSWORD_DATA.find(c=>c.id!==clue.id&&!session.round1.solvedClues.includes(c.id));if(next)select(next.id);}} disabled={!CROSSWORD_DATA.some(c=>c.id!==clue.id&&!session.round1.solvedClues.includes(c.id))}>Gợi ý tiếp theo</Button>}
      <Button variant="ghost" disabled={!canUndo} icon={<RotateCcw size={16}/>} onClick={()=>{timer.reset(30);setPhase('READY');dispatch({type:'UNDO_LAST_ACTION'});}}>Hoàn tác</Button>
    </div>
    {complete&&<section className={styles.completed}><Sparkles size={28}/><div><h2>Đức Mẹ La Vang</h2><p>Mật mã đã được mở. Cùng bước tiếp nào!</p></div><Button icon={<ArrowRight size={18}/>} onClick={()=>dispatch({type:'SELECT_ROUND',payload:2})}>Tiến vào vòng 2</Button></section>}
    {earlyGuess&&<Modal isOpen onClose={()=>setEarlyGuess(false)} title="Đoán sớm mật mã"><p className="game-note">Sau khi đội trả lời bằng lời nói, MC xác nhận để mở toàn bộ mật mã và thưởng 30 điểm. Cửa sổ này hiển thị trên cùng màn hình trình chiếu.</p><label className={styles.earlyLabel} htmlFor="early-team">Đội trả lời</label><select id="early-team" value={earlyTeam} onChange={e=>setEarlyTeam(e.target.value)}>{session.teams.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select><div className="game-toolbar"><Button variant="outline" onClick={()=>setEarlyGuess(false)}>Quay lại</Button><Button disabled={!earlyTeam} onClick={()=>{dispatch({type:'R1_REVEAL_FULL_CIPHER',payload:{teamId:earlyTeam,bonusPoints:30}});setEarlyGuess(false);celebrate();}}>Xác nhận đúng (+30đ)</Button></div></Modal>}
  </div>;
};
