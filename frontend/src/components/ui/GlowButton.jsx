import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const GlowButton = ({ 
  children, 
  variant = 'primary', // 'primary', 'secondary', 'ghost', 'danger'
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: `
      bg-gradient-to-r from-orange-500 to-orange-600
      text-white font-semibold
      hover:from-orange-400 hover:to-orange-500
      hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]
      active:from-orange-600 active:to-orange-700
    `,
    secondary: `
      bg-white/[0.05] backdrop-blur-sm
      border border-white/10
      text-white font-medium
      hover:bg-white/[0.1] hover:border-white/20
      hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
    `,
    ghost: `
      bg-transparent
      text-white/70 font-medium
      hover:bg-white/[0.05] hover:text-white
    `,
    danger: `
      bg-red-500/10 border border-red-500/30
      text-red-400 font-semibold
      hover:bg-red-500/20 hover:border-red-500/50
      hover:shadow-[0_0_20px_rgba(255,68,68,0.2)]
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
    md: 'px-6 py-3 text-sm rounded-xl gap-2',
    lg: 'px-8 py-4 text-base rounded-xl gap-2.5',
    xl: 'px-10 py-5 text-lg rounded-2xl gap-3',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative inline-flex items-center justify-center
        ${sizes[size]}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      )}
      
      {/* Icon left */}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={iconSizes[size]} />
      )}
      
      {/* Children */}
      {children}
      
      {/* Icon right */}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={iconSizes[size]} />
      )}
    </motion.button>
  );
};

export default GlowButton;
