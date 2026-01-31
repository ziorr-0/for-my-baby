import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingBackground from './components/FloatingBackground';
import Intro from './components/Intro';
import QuestionFlow from './components/QuestionFlow';
import Proposal from './components/Proposal';
import Success from './components/Success';
import CursorFollower from './components/CursorFollower';
import { AppStep } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('intro');

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return <Intro key="intro" onComplete={() => setStep('questions')} />;
      case 'questions':
        return <QuestionFlow key="questions" onComplete={() => setStep('proposal')} />;
      case 'proposal':
        return <Proposal key="proposal" onYes={() => setStep('success')} />;
      case 'success':
        return <Success key="success" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-slate-800 font-sans selection:bg-pink-200">
      <FloatingBackground />
      <CursorFollower />
      
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </main>

      <div className="fixed bottom-2 right-2 text-valentine-300 text-xs font-light z-0 opacity-50">
        💕
      </div>
    </div>
  );
};

export default App;