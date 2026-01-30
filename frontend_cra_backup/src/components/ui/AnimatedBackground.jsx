import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="tech-bg">
      {/* Grid Overlay */}
      <div className="grid-overlay" />
      
      {/* Scanline Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ y: '-100%' }}
        animate={{ y: '100%' }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-full h-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent blur-sm" />
      </motion.div>
      
      {/* Floating Glow Orb 1 - Top Right */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white pointer-events-none"
        style={{ filter: 'blur(120px)' }}
        animate={{
          opacity: [0.05, 0.08, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Floating Glow Orb 2 - Bottom Left */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white pointer-events-none"
        style={{ filter: 'blur(120px)' }}
        animate={{
          opacity: [0.04, 0.07, 0.04],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      
      {/* Floating Glow Orb 3 - Center */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full bg-white pointer-events-none"
        style={{ filter: 'blur(120px)' }}
        animate={{
          opacity: [0.03, 0.05, 0.03],
          x: [-50, 50, -50],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
