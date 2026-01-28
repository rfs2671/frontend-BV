import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * Base44-style Toast Notification System
 * Dark-themed, glassmorphism toasts matching the design system
 */

// Toast Context
const ToastContext = createContext(null);

// Toast types and their configs
const toastConfig = {
  error: {
    icon: AlertCircle,
    borderColor: 'border-red-500/30',
    bgColor: 'bg-red-500/10',
    iconColor: 'text-red-400',
  },
  success: {
    icon: CheckCircle,
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-400',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-yellow-500/30',
    bgColor: 'bg-yellow-500/10',
    iconColor: 'text-yellow-400',
  },
  info: {
    icon: Info,
    borderColor: 'border-white/20',
    bgColor: 'bg-white/5',
    iconColor: 'text-white/60',
  },
};

// Individual Toast Component
const Toast = ({ id, type = 'info', title, message, onClose, duration = 5000 }) => {
  const config = toastConfig[type] || toastConfig.info;
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`
        relative overflow-hidden
        w-80 p-4 rounded-2xl
        backdrop-blur-xl
        ${config.bgColor}
        border ${config.borderColor}
        shadow-xl shadow-black/20
      `}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="relative z-10 flex items-start gap-3">
        <div className={`mt-0.5 ${config.iconColor}`}>
          <Icon className="w-5 h-5" strokeWidth={1.5} />
        </div>
        
        <div className="flex-1 min-w-0">
          {title && (
            <div className="text-white/90 font-medium text-sm mb-1">{title}</div>
          )}
          {message && (
            <div className="text-white/60 text-sm leading-relaxed">{message}</div>
          )}
        </div>

        <button
          onClick={() => onClose(id)}
          className="text-white/30 hover:text-white/60 transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </motion.div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback({
    error: (title, message) => addToast({ type: 'error', title, message }),
    success: (title, message) => addToast({ type: 'success', title, message }),
    warning: (title, message) => addToast({ type: 'warning', title, message }),
    info: (title, message) => addToast({ type: 'info', title, message }),
  }, [addToast]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
