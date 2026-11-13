import { useEffect } from 'react';
import { useGame } from '@/app/AppProviders';

interface ShortcutHandlers {
  timerOnly?: boolean;
  onToggleTimer?: () => void;
  onNext?: () => void;
  onEscape?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers = {}) {
  const { session, dispatch, canUndo } = useGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      // Don't trigger shortcuts if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Space: Timer toggle
      if (e.code === 'Space') {
        if (handlers.onToggleTimer && target.tagName !== 'BUTTON') { e.preventDefault(); handlers.onToggleTimer(); }
        return;
      }

      // Escape: Close / Back
      if (e.code === 'Escape') {
        e.preventDefault();
        handlers.onEscape?.();
        return;
      }

      if (handlers.timerOnly) return;

      // M: Toggle Mute
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_MUTE' });
        return;
      }

      // F: Toggle Fullscreen
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
        return;
      }

      // U or Ctrl+Z: Undo
      if (
        (e.key === 'u' || e.key === 'U' || (e.ctrlKey && e.key === 'z')) &&
        canUndo
      ) {
        e.preventDefault();
        dispatch({ type: 'UNDO_LAST_ACTION' });
        return;
      }

      // Number keys 1-6: Quick select active team
      const num = parseInt(e.key, 10);
      if (!['ROUND_1', 'ROUND_2', 'ROUND_3'].includes(session.currentView) && num >= 1 && num <= session.teams.length) {
        const team = session.teams[num - 1];
        if (team) {
          dispatch({ type: 'SET_ACTIVE_TEAM', payload: team.id });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, session.teams, session.currentView, canUndo, handlers]);
}
