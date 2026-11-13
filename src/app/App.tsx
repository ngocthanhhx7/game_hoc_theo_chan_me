import React, { useEffect } from 'react';
import { JourneyEffects } from '@/components/feedback/JourneyEffects';
import { useGame } from './AppProviders';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WelcomeView } from '@/features/welcome/WelcomeView';
import { EventIntroView } from '@/features/welcome/EventIntroView';
import { TeamSetupView } from '@/features/game-setup/TeamSetupView';
import { CrosswordView } from '@/features/crossword/CrosswordView';
import { QuizView } from '@/features/quiz/QuizView';
import { ReflectionView } from '@/features/reflection/ReflectionView';
import { ScoreboardView } from '@/features/scoreboard/ScoreboardView';
import { ResultsView } from '@/features/results/ResultsView';
import { SettingsView } from '@/features/mc-controls/SettingsView';

export const App: React.FC = () => {
  const { session } = useGame();
  useEffect(() => { window.scrollTo?.(0, 0); }, [session.currentView]);

  const renderCurrentView = () => {
    switch (session.currentView) {
      case 'WELCOME':
        return <WelcomeView />;
      case 'EVENT_INTRO':
        return <EventIntroView />;
      case 'TEAM_SETUP':
        return <TeamSetupView />;
      case 'ROUND_1':
        return <CrosswordView />;
      case 'ROUND_2':
        return <QuizView />;
      case 'ROUND_3':
        return <ReflectionView />;
      case 'SCOREBOARD':
        return <ScoreboardView />;
      case 'RESULTS':
        return <ResultsView />;
      case 'SETTINGS':
        return <SettingsView />;
      default:
        return <WelcomeView />;
    }
  };

  return (
    <>
      <Header />
      <main data-view={session.currentView} style={{ flex: 1 }}>{renderCurrentView()}</main>
      <Footer />
      <JourneyEffects />
    </>
  );
};
