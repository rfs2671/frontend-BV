import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const QuickActionCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  color = 'orange', // 'orange', 'cyan', 'purple', 'success', 'warning'
  onClick,
  delay = 0,
}) => {
  const colors = {
    orange: {
      iconBg: 'bg-orange-500/15',
      iconColor: 'text-orange-500',
      borderColor: 'border-l-orange-500',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(255,107,0,0.15)]',
    },
    cyan: {
      iconBg: 'bg-cyan-400/15',
      iconColor: 'text-cyan-400',
      borderColor: 'border-l-cyan-400',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]',
    },
    purple: {
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-500',
      borderColor: 'border-l-purple-500',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    },
    success: {
      iconBg: 'bg-green-400/15',
      iconColor: 'text-green-400',
      borderColor: 'border-l-green-400',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]',
    },
    warning: {
      iconBg: 'bg-yellow-400/15',
      iconColor: 'text-yellow-400',
      borderColor: 'border-l-yellow-400',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(255,184,0,0.15)]',
    },
  };

  const c = colors[color];

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        delay 
      }}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        group w-full
        flex items-center gap-4 p-4
        bg-white/[0.02] backdrop-blur-sm
        border border-white/[0.06] border-l-4 ${c.borderColor}
        rounded-xl
        transition-all duration-300
        hover:bg-white/[0.04] hover:border-white/[0.1]
        ${c.hoverGlow}
        text-left
      `}
    >
      {/* Icon */}
      <div className={`
        w-12 h-12 rounded-xl ${c.iconBg}
        flex items-center justify-center
        transition-transform duration-300
        group-hover:scale-110
      `}>
        {Icon && <Icon className={`w-6 h-6 ${c.iconColor}`} />}
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold text-base">{title}</div>
        <div className="text-white/40 text-sm font-light mt-0.5 truncate">{subtitle}</div>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
    </motion.button>
  );
};

export default QuickActionCard;
