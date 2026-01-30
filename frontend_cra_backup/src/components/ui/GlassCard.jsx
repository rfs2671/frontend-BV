import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  onClick,
  hoverable = true,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverable ? { y: -2 } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30 
      }}
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.08]
        rounded-2xl
        transition-all duration-400 ease-out
        ${hoverable ? 'hover:bg-white/[0.05] hover:border-white/[0.12] cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
