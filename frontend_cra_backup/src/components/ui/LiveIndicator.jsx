import React from 'react';
import { motion } from 'framer-motion';

const LiveIndicator = ({ 
  label = 'LIVE', 
  size = 'sm' // 'sm', 'md'
}) => {
  const sizes = {
    sm: { dot: 'w-1.5 h-1.5', text: 'text-[10px]', padding: 'px-2.5 py-1' },
    md: { dot: 'w-2 h-2', text: 'text-xs', padding: 'px-3 py-1.5' },
  };

  const s = sizes[size];

  return (
    <div className={`
      inline-flex items-center gap-2
      bg-white/[0.03]
      border border-white/[0.08]
      rounded-lg ${s.padding}
    `}>
      {/* Pulsing dot */}
      <div className="relative">
        <motion.div
          className={`${s.dot} rounded-full bg-white/60`}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Label */}
      <span className={`${s.text} font-medium tracking-[0.15em] text-white/50`}>
        {label}
      </span>
    </div>
  );
};

export default LiveIndicator;
