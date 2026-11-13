import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  durationSeconds: number;
  onExpire?: () => void;
  onTick?: (remaining: number) => void;
  autoStart?: boolean;
}

export function useTimer({
  durationSeconds,
  onExpire,
  onTick,
  autoStart = false,
}: UseTimerOptions) {
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  const endTimeRef = useRef<number | null>(null);
  const remainingMsRef = useRef<number>(durationSeconds * 1000);
  const lastTickRef = useRef(durationSeconds);
  const onExpireRef = useRef(onExpire);
  const onTickRef = useRef(onTick);

  onExpireRef.current = onExpire;
  onTickRef.current = onTick;

  const start = useCallback(() => {
    if (endTimeRef.current || remainingMsRef.current <= 0) return;
    endTimeRef.current = Date.now() + remainingMsRef.current;
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    if (endTimeRef.current) {
      remainingMsRef.current = Math.max(0, endTimeRef.current - Date.now());
      endTimeRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (newDuration?: number) => {
      const dur = newDuration !== undefined ? newDuration : durationSeconds;
      lastTickRef.current = dur;
      remainingMsRef.current = dur * 1000;
      endTimeRef.current = null;
      setRemainingSeconds(dur);
      setIsRunning(false);
    },
    [durationSeconds]
  );

  useEffect(() => {
    if (!isRunning) return;

    if (!endTimeRef.current) {
      endTimeRef.current = Date.now() + remainingMsRef.current;
    }

    const interval = setInterval(() => {
      if (!endTimeRef.current) return;

      const diff = endTimeRef.current - Date.now();
      const secondsLeft = Math.max(0, Math.ceil(diff / 1000));

      setRemainingSeconds(secondsLeft);
      if (onTickRef.current && secondsLeft !== lastTickRef.current) {
        lastTickRef.current = secondsLeft;
        onTickRef.current(secondsLeft);
      }

      if (diff <= 0) {
        clearInterval(interval);
        setIsRunning(false);
        endTimeRef.current = null;
        remainingMsRef.current = 0;
        if (onExpireRef.current) {
          onExpireRef.current();
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Handle visibility change (tab switch / background)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        // Tab hidden: calculate accurate remaining time
        if (isRunning && endTimeRef.current) {
          remainingMsRef.current = Math.max(0, endTimeRef.current - Date.now());
        }
      } else {
        // Tab restored: resume with correct timestamp
        if (isRunning && endTimeRef.current) {
          const diff = endTimeRef.current - Date.now();
          const secondsLeft = Math.max(0, Math.ceil(diff / 1000));
          setRemainingSeconds(secondsLeft);
          if (diff <= 0) {
            setIsRunning(false);
            endTimeRef.current = null;
            remainingMsRef.current = 0;
            if (onExpireRef.current) onExpireRef.current();
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isRunning]);

  return {
    remainingSeconds,
    isRunning,
    start,
    pause,
    reset,
  };
}
