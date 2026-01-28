import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  onClick,
  glowColor = 'orange', // 'orange', 'cyan', 'white', 'success'
  hoverable = true,
  ...props 
}) => {
  const glowColors = {
    orange: 'hover:border-orange-500/30 hover:shadow-[0_0_40px_rgba(255,107,0,0.15)]',
    cyan: 'hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]',
    white: 'hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]',
    success: 'hover:border-green-400/30 hover:shadow-[0_0_40px_rgba(0,255,136,0.15)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverable ? { y: -4, scale: 1.01 } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.08]
        rounded-2xl
        transition-all duration-500 ease-out
        ${hoverable ? glowColors[glowColor] : ''}
        ${hoverable ? 'hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-500/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
