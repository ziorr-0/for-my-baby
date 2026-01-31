import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Point {
  x: number;
  y: number;
  id: number;
}

const CursorFollower: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      
      setPoints(prev => [...prev.slice(-15), newPoint]); // Keep last 15 points
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {points.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute text-pink-400"
            style={{ 
              left: point.x, 
              top: point.y,
              marginLeft: '-10px',
              marginTop: '-10px'
            }}
          >
            {index % 2 === 0 ? '💕' : '✨'}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorFollower;