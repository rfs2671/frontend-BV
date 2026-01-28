import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardHat, Mail, Lock, Eye, EyeOff, LogIn, Info } from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import GlowInput from '../components/ui/GlowInput';
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

    // Simulate login - in real app, connect to backend
    setTimeout(() => {
      if (email === 'admin@blueview.com' && password === 'BlueviewAdmin123') {
        onLogin({
          id: '1',
          email: email,
          name: 'Admin User',
          role: 'admin',
        });
      } else {
        setError('Invalid credentials. Try the demo credentials below.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo Section */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 mb-6"
          >
            <HardHat className="w-10 h-10 text-orange-500" />
          </motion.div>
          
          <h1 className="text-4xl font-extrabold tracking-[0.2em] text-white mb-2">
            BLUEVIEW
          </h1>
          <p className="text-white/40 text-sm font-light tracking-wide">
            Site Operations Hub
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-8"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Welcome Back</h2>
            <p className="text-white/40 text-sm mt-1">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@blueview.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_0_3px_rgba(255,107,0,0.1)] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_0_3px_rgba(255,107,0,0.1)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
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
              icon={LogIn}
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
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-cyan-400 font-medium">Demo Credentials</p>
              <p className="text-xs text-white/40 mt-1">
                Email: admin@blueview.com<br />
                Password: BlueviewAdmin123
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 grid grid-cols-2 gap-4"
        >
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center mb-2">
              <HardHat className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-xs text-white/60">Admin Login</p>
            <p className="text-[10px] text-white/30 mt-1">Full system access</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center mb-2">
              <Mail className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-xs text-white/60">Field Workers</p>
            <p className="text-[10px] text-white/30 mt-1">Via SMS check-in</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
