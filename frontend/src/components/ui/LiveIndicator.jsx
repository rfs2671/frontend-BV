import React from 'react';
import { motion } from 'framer-motion';

const LiveIndicator = ({ 
  label = 'LIVE', 
  color = 'success', // 'success', 'orange', 'cyan', 'warning'
  size = 'sm' // 'sm', 'md', 'lg'
}) => {
  const colors = {
    success: {
      bg: 'bg-green-400',
      glow: 'shadow-[0_0_10px_rgba(0,255,136,0.5)]',
      text: 'text-green-400',
      border: 'border-green-400/30',
    },
    orange: {
      bg: 'bg-orange-500',
      glow: 'shadow-[0_0_10px_rgba(255,107,0,0.5)]',
      text: 'text-orange-500',
      border: 'border-orange-500/30',
    },
    cyan: {
      bg: 'bg-cyan-400',
      glow: 'shadow-[0_0_10px_rgba(0,212,255,0.5)]',
      text: 'text-cyan-400',
      border: 'border-cyan-400/30',
    },
    warning: {
      bg: 'bg-yellow-400',
      glow: 'shadow-[0_0_10px_rgba(255,184,0,0.5)]',
      text: 'text-yellow-400',
      border: 'border-yellow-400/30',
    },
  };

  const sizes = {
    sm: { dot: 'w-2 h-2', text: 'text-[10px]', padding: 'px-2 py-1' },
    md: { dot: 'w-2.5 h-2.5', text: 'text-xs', padding: 'px-3 py-1.5' },
    lg: { dot: 'w-3 h-3', text: 'text-sm', padding: 'px-4 py-2' },
  };

  const c = colors[color];
  const s = sizes[size];

  return (
    <div className={`
      inline-flex items-center gap-2
      bg-black/30 backdrop-blur-sm
      border ${c.border}
      rounded-full ${s.padding}
    `}>
      {/* Pulsing dot */}
      <div className="relative">
        <motion.div
          className={`${s.dot} rounded-full ${c.bg} ${c.glow}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute inset-0 ${s.dot} rounded-full ${c.bg}`}
          animate={{
            scale: [1, 2],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </div>
      
      {/* Label */}
      <span className={`${s.text} font-semibold tracking-wider ${c.text}`}>
        {label}
      </span>
    </div>
  );
};

export default LiveIndicator;
