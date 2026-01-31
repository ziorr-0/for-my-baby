import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Gift, Sparkles } from 'lucide-react';

const Success: React.FC = () => {
  useEffect(() => {
    // Initial burst
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ffc0cb', '#ff69b4', '#e11d48', '#ffffff']
      });
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffc0cb', '#ff69b4', '#e11d48', '#ffffff']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 z-20 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-white/60 to-transparent pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-white/90 backdrop-blur-md p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-valentine-400 border-8 border-valentine-100 max-w-3xl relative"
      >
        <motion.div 
          className="absolute -top-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-8xl filter drop-shadow-lg">💝</span>
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 mb-6"
        >
            <h1 className="text-4xl md:text-6xl font-handwriting text-valentine-600 mb-6 leading-tight">
            YAYYY 💕 <br/>
            <span className="text-valentine-500">BASMA</span> just made makram the happiest Valentine ever
            </h1>
        </motion.div>
        
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="text-2xl md:text-3xl text-valentine-400 font-bold mb-8 flex items-center justify-center gap-2"
        >
            <Sparkles size={24} />
            You’re officially his Valentine 💝
            <Sparkles size={24} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex flex-col items-center gap-2 pt-6 border-t-2 border-valentine-100"
        >
          <p className="text-xl md:text-2xl text-valentine-400 font-medium font-handwriting">
            Made with endless love by makram 💌
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Success;