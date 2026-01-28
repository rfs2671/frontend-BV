import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  MapPin,
  LogOut,
  LayoutGrid
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

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen">
        {/* Header Bar */}
        <header className="header-bar flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="btn-icon">
              <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <span className="logo-text">
              <span>B</span>LUEVIEW
            </span>
          </div>
          
          <button onClick={onLogout} className="btn-icon">
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </header>

        {/* Main Container */}
        <div className="px-8 pt-6 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="main-container p-12"
          >
            {/* Date */}
            <div className="mb-8">
              <p className="text-date-day mb-1">{dayName}</p>
              <p className="text-date-full">{fullDate}</p>
            </div>

            {/* Name */}
            <h1 className="text-name mb-4">
              {user?.name?.split(' ')[0] || 'User'}
            </h1>
            
            {/* Email */}
            <p className="text-email mb-16">{user?.email || 'user@blueview.com'}</p>

            {/* Stats Grid - Nested inside main container */}
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
                    duration: 0.6, 
                    delay: 0.3 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="stat-card p-8"
                >
                  {/* Icon Pod */}
                  <div className="icon-pod mb-8">
                    <stat.icon className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                  </div>
                  
                  {/* Number */}
                  <div className="text-stat-number mb-3">{stat.value}</div>
                  
                  {/* Label */}
                  <div className="text-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default Dashboard;
