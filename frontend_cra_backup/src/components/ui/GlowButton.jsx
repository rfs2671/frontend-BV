import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const GlowButton = ({ 
  children, 
  variant = 'primary', // 'primary', 'secondary', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
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
      bg-white/[0.08]
      border border-white/[0.12]
      text-white font-medium
      hover:bg-white/[0.12] hover:border-white/[0.18]
    `,
    secondary: `
      bg-transparent
      border border-white/[0.08]
      text-white/70 font-medium
      hover:bg-white/[0.05] hover:border-white/[0.12] hover:text-white
    `,
    ghost: `
      bg-transparent
      border border-transparent
      text-white/50 font-medium
      hover:bg-white/[0.05] hover:text-white
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
    md: 'px-5 py-3 text-sm rounded-xl gap-2',
    lg: 'px-7 py-4 text-base rounded-xl gap-2',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative inline-flex items-center justify-center
        ${sizes[size]}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {loading && (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      )}
      
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={iconSizes[size]} strokeWidth={1.5} />
      )}
      
      {children}
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={iconSizes[size]} strokeWidth={1.5} />
      )}
    </motion.button>
  );
};

export default GlowButton;
