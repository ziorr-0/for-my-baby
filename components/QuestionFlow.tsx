import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface QuestionFlowProps {
  onComplete: () => void;
}

const questions = [
  "Do you like cute surprises? 🎀💗",
  "Did you know someone smiled just thinking about you today? 🥺💕",
  "Do you know how special you are to makram? 💖✨",
  "Are you smiling right now? Because I hope you are 💗🥺",
  "Do you know you make everything feel softer and happier? 🌸💕",
  "Can we agree this moment is kinda adorable? 🎀✨",
  "Ready for the cutest question ever? 🥺💝"
];

const cuteInterstitials = [
  "hehe 💗",
  "this is cute right? 🎀",
  "don't stop smiling 🥺",
  "you're the best ✨",
  "almost there... 💕",
  "just for you 🌸"
];

const QuestionFlow: React.FC<QuestionFlowProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [interstitialText, setInterstitialText] = useState("");
  
  // State for the runaway "No" button
  const [noBtnPosition, setNoBtnPosition] = useState<{top: string, left: string} | null>(null);

  const handleYes = () => {
    // Reset No button position for the next card
    setNoBtnPosition(null);

    if (currentIndex < questions.length - 1) {
      // Show interstitial
      const randomMsg = cuteInterstitials[Math.floor(Math.random() * cuteInterstitials.length)];
      setInterstitialText(randomMsg);
      setShowInterstitial(true);

      setTimeout(() => {
        setShowInterstitial(false);
        setCurrentIndex((prev) => prev + 1);
      }, 1500); // Show for 1.5s
    } else {
      onComplete();
    }
  };

  const moveNoButton = () => {
    const randomX = Math.random() * 60 + 20; // 20% to 80% of screen width
    const randomY = Math.random() * 60 + 20; // 20% to 80% of screen height
    setNoBtnPosition({ top: `${randomY}%`, left: `${randomX}%` });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 z-10 relative w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {showInterstitial ? (
          <motion.div
            key="interstitial"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="text-4xl md:text-5xl font-handwriting text-valentine-500 font-bold text-center drop-shadow-sm"
          >
            {interstitialText}
          </motion.div>
        ) : (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 1.1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            className="flex flex-col items-center w-full"
          >
            <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-valentine-200/50 border-8 border-valentine-100 transform w-full text-center relative overflow-hidden group">
              {/* Cute dashed border inside */}
              <div className="absolute inset-4 border-4 border-dashed border-valentine-200 rounded-[2.5rem] pointer-events-none opacity-50"></div>

              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} 
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-valentine-400 mb-8 flex justify-center relative z-10"
              >
                <Heart size={64} fill="#fb7185" className="drop-shadow-md" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-valentine-600 mb-12 leading-relaxed font-sans relative z-10">
                {questions[currentIndex]}
              </h2>

              <div className="flex justify-center items-center gap-6 relative z-10 min-h-[60px]">
                {/* YES Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYes}
                  className="px-8 py-3 bg-valentine-400 text-white text-xl rounded-full font-bold shadow-lg shadow-valentine-300 hover:bg-valentine-500 transition-colors flex items-center gap-2"
                >
                  YES 💕
                </motion.button>

                {/* NO Button (Runaway) */}
                <motion.button
                  onMouseEnter={moveNoButton}
                  onFocus={moveNoButton}
                  style={
                    noBtnPosition 
                    ? { 
                        position: 'fixed', 
                        top: noBtnPosition.top, 
                        left: noBtnPosition.left,
                        zIndex: 50
                      } 
                    : { position: 'static' }
                  }
                  animate={noBtnPosition ? { scale: [1, 0.9, 1], rotate: [0, 10, -10, 0] } : {}}
                  className={`px-8 py-3 bg-white text-valentine-400 text-xl rounded-full font-bold shadow-md border-2 border-valentine-200 hover:bg-gray-50 transition-colors flex items-center gap-2 ${noBtnPosition ? 'pointer-events-auto' : ''}`}
                >
                  NO 🙈
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionFlow;