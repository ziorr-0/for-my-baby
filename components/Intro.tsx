import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-center p-4 z-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8"
      >
         <span className="text-8xl drop-shadow-md">🎀</span>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
        className="mb-4"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-valentine-500 drop-shadow-sm mb-2 font-handwriting tracking-wide">
          Hiiii BASMA 💕💗
        </h1>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
      >
        <p className="text-2xl md:text-4xl font-bold text-valentine-400 max-w-lg mx-auto leading-relaxed">
          Makram made this just for you 🥺🎀
        </p>
      </motion.div>
      
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        whileHover={{ scale: 1.1, rotate: 3, boxShadow: "0 10px 25px -5px rgba(255, 182, 193, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        onClick={onComplete}
        className="mt-16 px-10 py-5 bg-white text-valentine-500 text-2xl font-bold rounded-[2rem] shadow-xl shadow-valentine-200 border-4 border-valentine-100 flex items-center gap-3 hover:bg-valentine-50 transition-all"
      >
        <Sparkles size={24} />
        Tap here 💕
        <Sparkles size={24} />
      </motion.button>
    </motion.div>
  );
};

export default Intro;