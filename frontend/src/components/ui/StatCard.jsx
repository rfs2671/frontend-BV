import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  trend, 
  trendValue,
  color = 'orange', // 'orange', 'cyan', 'white', 'success'
  delay = 0,
}) => {
  const colors = {
    orange: {
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-500',
      glow: 'group-hover:shadow-[0_0_30px_rgba(255,107,0,0.2)]',
    },
    cyan: {
      iconBg: 'bg-cyan-400/10',
      iconColor: 'text-cyan-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]',
    },
    white: {
      iconBg: 'bg-white/10',
      iconColor: 'text-white',
      glow: 'group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]',
    },
    success: {
      iconBg: 'bg-green-400/10',
      iconColor: 'text-green-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]',
    },
    warning: {
      iconBg: 'bg-yellow-400/10',
      iconColor: 'text-yellow-400',
      glow: 'group-hover:shadow-[0_0_30px_rgba(255,184,0,0.2)]',
    },
  };

  const c = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        delay 
      }}
      whileHover={{ y: -4 }}
      className={`
        group relative
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.08]
        rounded-2xl p-6
        transition-all duration-500
        hover:border-white/[0.15]
        ${c.glow}
      `}
    >
      {/* Icon */}
      <div className={`
        w-12 h-12 rounded-xl ${c.iconBg}
        flex items-center justify-center mb-4
        transition-transform duration-300
        group-hover:scale-110
      `}>
        {Icon && <Icon className={`w-6 h-6 ${c.iconColor}`} />}
      </div>

      {/* Value */}
      <motion.div 
        className="text-4xl font-bold text-white mb-1"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {value}
      </motion.div>

      {/* Label */}
      <div className="text-sm text-white/50 font-light tracking-wide">
        {label}
      </div>

      {/* Trend */}
      {trend && (
        <div className={`
          mt-3 flex items-center gap-1 text-xs
          ${trend === 'up' ? 'text-green-400' : 'text-red-400'}
        `}>
          <span>{trend === 'up' ? '↑' : '↓'}</span>
          <span>{trendValue}</span>
        </div>
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default StatCard;
