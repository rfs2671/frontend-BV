import React from 'react';
import { motion } from 'framer-motion';

const GlowInput = ({
  label,
  icon: Icon,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-white/60">
          {label}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        {/* Input */}
        <motion.input
          whileFocus={{ scale: 1.01 }}
          className={`
            w-full
            bg-white/[0.03] backdrop-blur-sm
            border border-white/10
            rounded-xl
            px-4 py-4
            ${Icon ? 'pl-12' : ''}
            text-white placeholder-white/30
            text-base
            transition-all duration-300
            focus:outline-none focus:border-orange-500/50
            focus:shadow-[0_0_0_3px_rgba(255,107,0,0.1)]
            focus:bg-white/[0.05]
            ${error ? 'border-red-500/50' : ''}
          `}
          {...props}
        />
        
        {/* Glow effect on focus */}
        <div className="absolute inset-0 rounded-xl bg-orange-500/5 opacity-0 focus-within:opacity-100 transition-opacity pointer-events-none" />
      </div>
      
      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default GlowInput;
