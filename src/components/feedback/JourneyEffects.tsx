import { useEffect, useRef, useState } from 'react';
import { Sparkles, CheckCircle, Heart, ArrowRight } from 'lucide-react';
import { useGame } from '@/app/AppProviders';
import { soundManager } from '@/lib/audio';
import styles from './JourneyEffects.module.css';

type Feedback = { title: string; message: string; kind: 'success' | 'celebration' | 'encourage' };
export function announceFeedback(title: string, message: string, kind: Feedback['kind']) {
  window.dispatchEvent(new CustomEvent<Feedback>('journey-feedback', { detail: { title, message, kind } }));
}
const rounds: Record<string, {number: string; title: string; note: string}> = {
  ROUND_1: { number: '01', title: 'Mật mã đức tin', note: 'Chúc may mắn! Cùng mở những mảnh ghép đầu tiên.' },
  ROUND_2: { number: '02', title: 'Thử thách đức tin', note: 'Bình tĩnh, tự tin và cùng thử sức nhé!' },
  ROUND_3: { number: '03', title: 'Hành trình Xin Vâng', note: 'Cùng lắng nghe, suy ngẫm và chia sẻ.' },
};
export function JourneyEffects() {
  const {session} = useGame();
  const previous = useRef(session.currentView);
  const [intro,setIntro] = useState<{title:string;note:string;number:string}|null>({title:'Hành trình ánh sáng',note:'Một hành trình, cùng Mẹ.',number:'✦'});
  const [feedback,setFeedback] = useState<Feedback|null>(null);
  useEffect(()=>{
    const handler=(e:Event)=>setFeedback((e as CustomEvent<Feedback>).detail);
    window.addEventListener('journey-feedback',handler);
    return()=>window.removeEventListener('journey-feedback',handler);
  },[]);
  useEffect(()=>{
    if(previous.current===session.currentView)return;
    previous.current=session.currentView;
    const round=rounds[session.currentView];
    if(round){setFeedback(null);setIntro(round);soundManager.playGoodLuck();} else {setIntro(null);}
  },[session.currentView]);
  useEffect(()=>{
    if(!intro)return;
    const timer=window.setTimeout(()=>setIntro(null),session.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches?500:1800);
    return()=>window.clearTimeout(timer);
  },[intro,session.reducedMotion]);
  useEffect(()=>{
    if(!feedback)return;
    const timer=window.setTimeout(()=>setFeedback(null),feedback.kind==='celebration'?3000:2200);
    return()=>window.clearTimeout(timer);
  },[feedback]);
  return <>
    {intro&&<div className={styles.transition} key={intro.title}>
      <div className={styles.arch} aria-hidden="true"/><div className={styles.introText}><span className={styles.number}>{intro.number}</span><p className={styles.hand}>Cùng nhau bước tiếp</p><h2>{intro.title}</h2><p>{intro.note}</p><button onClick={()=>setIntro(null)}>Sẵn sàng <ArrowRight size={16}/></button></div>
    </div>}
    <div aria-live="polite" aria-atomic="true">{feedback&&<div className={`${styles.feedback} ${feedback.kind==='celebration'?styles.celebration:''}`} key={feedback.title}>
      {feedback.kind==='success'?<CheckCircle size={30}/>:feedback.kind==='celebration'?<Sparkles size={38}/>:<Heart size={30}/>}
      <div><strong>{feedback.title}</strong><p>{feedback.message}</p></div>
    </div>}</div>
  </>;
}
