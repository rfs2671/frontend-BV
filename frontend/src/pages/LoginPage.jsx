import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Info } from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import GlowButton from '../components/ui/GlowButton';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'admin@blueview.com' && password === 'BlueviewAdmin123') {
        onLogin({
          id: '1',
          email: email,
          name: 'Admin User',
          role: 'admin',
        });
      } else {
        setError('Invalid credentials');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <AnimatedBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.08] mb-6">
            <Building2 className="w-6 h-6 text-white/60" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-2xl font-semibold tracking-[0.2em] text-white mb-2">
            BLUEVIEW
          </h1>
          <p className="text-white/30 text-sm font-light">
            Site Operations Hub
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8"
        >
          <div className="mb-8">
            <h2 className="text-lg font-medium text-white">Welcome back</h2>
            <p className="text-white/30 text-sm mt-1">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/40 tracking-wider uppercase">Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@blueview.com"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/40 tracking-wider uppercase">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Lock className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-12 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white/60 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <GlowButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
              data-testid="login-submit-btn"
            >
              Sign In
            </GlowButton>
          </form>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
        >
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-xs text-white/40 font-medium">Demo Credentials</p>
              <p className="text-xs text-white/25 mt-1 font-mono">
                admin@blueview.com / BlueviewAdmin123
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
