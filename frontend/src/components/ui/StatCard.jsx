import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        delay 
      }}
      className="
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.08]
        rounded-2xl p-6
        transition-all duration-400
        hover:bg-white/[0.05] hover:border-white/[0.12]
      "
    >
      {/* Icon - subtle */}
      <div className="
        w-12 h-12 rounded-xl bg-white/[0.05]
        flex items-center justify-center mb-5
        border border-white/[0.08]
      ">
        {Icon && <Icon className="w-5 h-5 text-white/50" strokeWidth={1.5} />}
      </div>

      {/* Value - large and clean */}
      <motion.div 
        className="text-5xl font-extralight text-white tracking-tight mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.1 }}
      >
        {value}
      </motion.div>

      {/* Label - muted uppercase */}
      <div className="text-[11px] text-white/40 font-medium tracking-[0.15em] uppercase">
        {label}
      </div>
    </motion.div>
  );
};

export default StatCard;
