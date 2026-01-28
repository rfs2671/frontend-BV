import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const QuickActionCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  onClick,
  delay = 0,
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        delay 
      }}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="
        group w-full
        flex items-center gap-4 p-4
        bg-white/[0.02] backdrop-blur-sm
        border border-white/[0.06]
        rounded-xl
        transition-all duration-300
        hover:bg-white/[0.04] hover:border-white/[0.1]
        text-left
      "
    >
      {/* Icon */}
      <div className="
        w-11 h-11 rounded-xl bg-white/[0.05]
        flex items-center justify-center
        border border-white/[0.08]
        transition-all duration-300
        group-hover:bg-white/[0.08]
      ">
        {Icon && <Icon className="w-5 h-5 text-white/50" strokeWidth={1.5} />}
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <div className="text-white/90 font-medium text-sm">{title}</div>
        <div className="text-white/30 text-xs mt-0.5 truncate">{subtitle}</div>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" strokeWidth={1.5} />
    </motion.button>
  );
};

export default QuickActionCard;
