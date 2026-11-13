import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameSession } from '@/types/game';
import { GameAction } from '@/types/actions';
import {
  gameReducer,
  INITIAL_ENGINE_STATE,
} from '@/domain/game/game-engine';
import {
  saveSessionToStorage,
  loadSessionFromStorage,
} from '@/domain/session/session-manager';
import { soundManager } from '@/lib/audio';

interface GameContextValue {
  session: GameSession;
  dispatch: React.Dispatch<GameAction>;
  canUndo: boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [engineState, dispatch] = useReducer(gameReducer, INITIAL_ENGINE_STATE);

  // Restore session from localStorage on mount if exists
  useEffect(() => {
    const saved = loadSessionFromStorage();
    if (saved) {
      dispatch({ type: 'LOAD_SESSION', payload: saved });
    }
  }, []);

  // Sync mute state to audio synthesizer
  useEffect(() => {
    soundManager.setMuted(engineState.current.isMuted);
  }, [engineState.current.isMuted]);

  // Sync reduced motion class to body
  useEffect(() => {
    if (engineState.current.reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [engineState.current.reducedMotion]);

  // Auto-persist session changes
  useEffect(() => {
    saveSessionToStorage(engineState.current);
  }, [engineState.current]);

  const value: GameContextValue = {
    session: engineState.current,
    dispatch,
    canUndo: engineState.history.length > 0,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within an AppProviders');
  }
  return context;
}
