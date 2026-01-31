import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const elements = ['💕', '🎀', '🌸', '✨', '💖', '💝', '🍧', '🍥', '🐰'];

interface FloatingItem {
  id: number;
  x: number;
  y: number;
  emoji: string;
  duration: number;
  delay: number;
  scale: number;
}

const FloatingBackground: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    // Generate random floating elements
    const newItems = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      emoji: elements[Math.floor(Math.random() * elements.length)],
      duration: 15 + Math.random() * 20, // Slower, gentler float
      delay: Math.random() * 10,
      scale: 0.5 + Math.random() * 0.8, 
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-br from-valentine-50 via-valentine-100 to-pink-200">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-2xl md:text-4xl opacity-30 select-none"
          initial={{ x: `${item.x}vw`, y: '110vh', rotate: 0 }}
          animate={{ 
            y: '-10vh', 
            rotate: 360,
            x: [`${item.x}vw`, `${item.x + (Math.random() * 20 - 10)}vw`] 
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
          style={{
            fontSize: `${item.scale}rem`,
            filter: 'blur(0.5px)',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
      {/* Soft glitter/grain overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-soft-light"></div>
      
      {/* Gradient mesh blobs for extra softness */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-300 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-valentine-200 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

export default FloatingBackground;