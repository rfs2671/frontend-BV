import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  MapPin, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [stats] = useState({
    totalWorkers: 24,
    activeProjects: 5,
    todayCheckins: 18,
  });

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen pb-36">
        {/* Header - Minimal */}
        <header className="px-20 pt-14">
          <div className="flex items-center justify-between">
            <span className="text-label">BLUEVIEW</span>
            <button onClick={onLogout} className="btn-soft flex items-center gap-2">
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Hero Section - Large Name with Breathing Room */}
        <div className="px-20 pt-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-muted text-sm mb-6">Welcome back,</p>
            <h1 className="text-hero mb-6">
              {user?.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-muted text-sm">{user?.email}</p>
            <p className="text-muted text-sm mt-1">{today}</p>
          </motion.div>
        </div>

        {/* Stats Grid - Frosted Glass Cards */}
        <div className="px-20 pb-16">
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: Users, value: stats.totalWorkers, label: 'Total Workers' },
              { icon: Building2, value: stats.activeProjects, label: 'Active Projects' },
              { icon: MapPin, value: stats.todayCheckins, label: 'On-Site Today' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="glass-card p-10"
              >
                <div className="icon-pod mb-8">
                  <stat.icon className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                </div>
                <div className="text-stat mb-3">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-20">
          <p className="text-label mb-6">Quick Actions</p>
          
          <div className="grid grid-cols-2 gap-5">
            {[
              { title: 'Projects', subtitle: 'Manage job sites', path: '/projects' },
              { title: 'Workers', subtitle: 'Daily sign-in log', path: '/workers' },
              { title: 'Daily Log', subtitle: 'Create site report', path: '/daily-log' },
              { title: 'Reports', subtitle: 'View & download', path: '/reports' },
            ].map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -3 }}
                onClick={() => navigate(action.path)}
                className="glass-card p-8 flex items-center justify-between text-left group"
              >
                <div>
                  <div className="text-white/80 font-medium text-base mb-1">{action.title}</div>
                  <div className="text-muted text-sm">{action.subtitle}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/40 transition-colors" strokeWidth={1.5} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default Dashboard;
