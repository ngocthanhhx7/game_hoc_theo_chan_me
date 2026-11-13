import { useMemo } from 'react';
import { soundManager } from '@/lib/audio';
import { useGame } from '@/app/AppProviders';
export function useSound() {
  const { session } = useGame();
  return useMemo(() => ({
    isMuted: session.isMuted,
    playCorrect: () => soundManager.playCorrectChime(),
    playIncorrect: () => soundManager.playIncorrectSound(),
    playTick: () => soundManager.playTick(),
    playVictory: () => soundManager.playVictoryFanfare(),
    playClick: () => soundManager.playClick(),
  }), [session.isMuted]);
}
