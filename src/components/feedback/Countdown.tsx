import { Timer } from 'lucide-react';
import styles from './Countdown.module.css';
export function Countdown({seconds,running,label}:{seconds:number;running:boolean;label:string}) {
 return <div className={`${styles.clock} ${seconds<=5&&running?styles.urgent:''}`}><Timer size={23} aria-hidden="true"/><div><span role="timer" aria-live="off" aria-label={`Còn ${seconds} giây`}>{String(Math.floor(seconds/60)).padStart(2,'0')}:{String(seconds%60).padStart(2,'0')}</span><small>{label}</small></div></div>;
}
