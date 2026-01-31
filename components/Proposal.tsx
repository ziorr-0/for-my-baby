import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface ProposalProps {
  onYes: () => void;
}

const Proposal: React.FC<ProposalProps> = ({ onYes }) => {
  const [noBtnPosition, setNoBtnPosition] = useState({ top: '60%', left: '60%' });
  const [hoverCount, setHoverCount] = useState(0);
  const [reactionText, setReactionText] = useState("");

  const reactions = [
    "nooo 😭💗",
    "that button is shy 🎀",
    "makram believes in you 🥺",
    "try the other one! 💕",
    "don't click me! 🙈",
    "impossibru! ✨"
  ];

  const moveButton = () => {
    // Calculate random position within viewport
    const randomX = Math.random() * 70 + 10; 
    const randomY = Math.random() * 70 + 10; 
    setNoBtnPosition({ top: `${randomY}%`, left: `${randomX}%` });
    setHoverCount(prev => prev + 1);
    
    // Set random reaction
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    setReactionText(randomReaction);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden z-20 p-4">
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1, bounce: 0.5 }}
        className="text-center p-6 mb-8 relative"
      >
        <motion.div
            className="absolute -top-10 -right-10 text-6xl opacity-50"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            ✨
        </motion.div>
        <motion.div
            className="absolute -bottom-10 -left-10 text-6xl opacity-50"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            🌸
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-handwriting text-valentine-600 mb-4 drop-shadow-sm leading-tight">
          BASMA... <br/>
          <span className="text-4xl md:text-6xl mt-4 block text-valentine-500">
            will you be my Valentine? 💝💗
          </span>
        </h1>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-lg relative h-60 md:h-40">
        
        {/* YES BUTTON */}
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px rgba(244, 63, 94, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: ["0px 0px 0px rgba(244,63,94,0)", "0px 0px 20px rgba(244,63,94,0.3)", "0px 0px 0px rgba(244,63,94,0)"]
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={onYes}
          className="px-16 py-6 bg-gradient-to-r from-valentine-400 to-valentine-500 text-white text-4xl font-bold rounded-full shadow-2xl shadow-valentine-300 z-30 border-4 border-valentine-200"
        >
          YES 💕
        </motion.button>

        {/* NO BUTTON (Tricky) */}
        <motion.button
          onMouseEnter={moveButton}
          onFocus={moveButton} 
          style={{
            position: hoverCount > 0 ? 'fixed' : 'static', 
            top: hoverCount > 0 ? noBtnPosition.top : 'auto',
            left: hoverCount > 0 ? noBtnPosition.left : 'auto',
          }}
          animate={hoverCount > 0 ? {
            x: [0, -5, 5, -5, 5, 0], 
          } : {}}
          transition={{ duration: 0.1 }}
          className="px-8 py-3 bg-white text-valentine-300 text-xl font-bold rounded-full shadow-sm z-30 border-2 border-valentine-100 hover:bg-gray-50 transition-colors"
        >
          NO 🙃
        </motion.button>

        {/* Floating Reactions for No Button */}
        <AnimatePresence>
          {reactionText && (
            <motion.div
              key={hoverCount} // Re-animate on each hover
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed pointer-events-none text-valentine-500 font-bold text-xl md:text-2xl whitespace-nowrap z-40 bg-white/90 px-4 py-2 rounded-xl shadow-lg"
              style={{
                top: hoverCount > 0 ? `calc(${noBtnPosition.top} - 60px)` : 'auto',
                left: hoverCount > 0 ? noBtnPosition.left : 'auto',
              }}
            >
              {reactionText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </div>
  );
};

export default Proposal;