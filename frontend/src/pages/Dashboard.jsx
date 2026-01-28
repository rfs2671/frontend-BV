import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  MapPin,
  LogOut,
  LayoutGrid,
  ChevronRight
} from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [stats] = useState({
    activeWorkers: 24,
    liveProjects: 5,
    onSiteNow: 18,
  });

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const fullDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const quickActions = [
    { title: 'Projects', subtitle: 'Manage job sites', path: '/projects' },
    { title: 'Workers', subtitle: 'Daily sign-in log', path: '/workers' },
    { title: 'Daily Log', subtitle: 'Create site report', path: '/daily-log' },
    { title: 'Reports', subtitle: 'View & download', path: '/reports' },
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="px-8 py-6 flex items-center justify-between border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="btn-icon">
              <LayoutGrid className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium tracking-[0.2em] text-white/50">BLUEVIEW</span>
          </div>
          
          <button onClick={onLogout} className="btn-icon">
            <LogOut className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </header>

        {/* Main Content */}
        <div className="px-8 pt-8 pb-36">
          {/* Main Glass Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="glass-card p-12 relative group"
          >
            {/* White glow on hover */}
            <motion.div
              className="absolute inset-0 bg-white/5 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            />
            
            {/* Holographic border effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-[32px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '200% 200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Scanline shimmer on hover */}
            <motion.div
              className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100"
            >
              <motion.div
                className="w-full h-24 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
            
            {/* Floating accent orb */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/20 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Date */}
              <div className="mb-10">
                <p className="text-label mb-2">{dayName}</p>
                <p className="text-white/50 font-light">{fullDate}</p>
              </div>

              {/* Name */}
              <motion.h1 
                className="text-hero text-white/90 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {user?.name?.split(' ')[0] || 'User'}
              </motion.h1>
              
              {/* Email */}
              <p className="text-muted font-light mb-16">{user?.email || 'user@blueview.com'}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Users, value: stats.activeWorkers, label: 'Active Workers' },
                  { icon: Building2, value: stats.liveProjects, label: 'Live Projects' },
                  { icon: MapPin, value: stats.onSiteNow, label: 'On Site Now' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      delay: 0.3 + index * 0.1 
                    }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="stat-card p-8 cursor-pointer group/stat"
                  >
                    {/* Stat card hover glow */}
                    <div className="absolute inset-0 bg-white/5 rounded-3xl blur-xl opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    <div className="relative z-10">
                      {/* Icon Pod */}
                      <div className="icon-pod mb-8">
                        <stat.icon className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                      </div>
                      
                      {/* Number */}
                      <div className="text-stat text-white/90 mb-3">{stat.value}</div>
                      
                      {/* Label */}
                      <div className="text-label">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="mt-10">
            <p className="text-label mb-6 px-2">Quick Actions</p>
            
            <div className="grid grid-cols-2 gap-5">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    delay: 0.6 + index * 0.05 
                  }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(action.path)}
                  className="stat-card p-6 flex items-center justify-between text-left group/action"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-3xl blur-xl opacity-0 group-hover/action:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="text-white/80 font-medium mb-1">{action.title}</div>
                    <div className="text-white/40 text-sm font-light">{action.subtitle}</div>
                  </div>
                  
                  <ChevronRight className="relative z-10 w-5 h-5 text-white/30 group-hover/action:text-white/60 transition-colors" strokeWidth={1.5} />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default Dashboard;
