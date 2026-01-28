import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  MapPin, 
  Shield, 
  UserPlus, 
  FileText, 
  BarChart3, 
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
  const [recentProjects] = useState([
    { id: '1', name: 'Downtown Tower Phase 2', location: 'New York, NY', code: 'DT-001' },
    { id: '2', name: 'Harbor Bridge Renovation', location: 'Brooklyn, NY', code: 'HB-002' },
  ]);

  const quickActions = [
    { icon: Shield, title: 'User Management', subtitle: 'Manage CPs and Workers', path: '/admin/users' },
    { icon: UserPlus, title: 'Worker Registry', subtitle: 'Manage worker passports', path: '/workers' },
    { icon: Building2, title: 'Projects', subtitle: 'Manage job sites', path: '/projects' },
    { icon: FileText, title: 'Daily Log', subtitle: 'Create site report', path: '/daily-log' },
    { icon: BarChart3, title: 'Reports', subtitle: 'View reports', path: '/reports' },
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 pb-40">
        {/* Minimal Header */}
        <header className="px-16 pt-12 pb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="icon-pod-sm">
                <Building2 className="w-4 h-4 text-white/40" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-medium tracking-[0.25em] text-white/40">BLUEVIEW</span>
            </div>
            
            <button
              onClick={onLogout}
              className="btn-ghost flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </header>

        {/* Hero Welcome - Large, Thin Typography */}
        <div className="px-16 pt-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label mb-4">Welcome back</p>
            <h1 className="text-hero text-white/90">
              {user?.name?.split(' ')[0] || 'User'}
            </h1>
          </motion.div>
        </div>

        {/* Stats - Airy Layout with Frosted Glass */}
        <div className="px-16 pb-16">
          <div className="grid grid-cols-3 gap-8">
            {[
              { icon: Users, value: stats.totalWorkers, label: 'Total Workers' },
              { icon: Building2, value: stats.activeProjects, label: 'Active Projects' },
              { icon: MapPin, value: stats.todayCheckins, label: 'On-Site Today' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.1 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="glass-card p-10"
              >
                {/* Icon Pod with inner glow */}
                <div className="icon-pod mb-8">
                  <stat.icon className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                </div>
                
                {/* Large thin number */}
                <div className="text-stat text-white/90 mb-3">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-sm text-white/30 font-light">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions - Minimal List */}
        <div className="px-16 pb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-label mb-8"
          >
            Quick Actions
          </motion.p>
          
          <div className="grid grid-cols-2 gap-6">
            {quickActions.slice(0, 4).map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -2 }}
                onClick={() => navigate(action.path)}
                className="glass-card p-8 flex items-center gap-6 text-left group"
              >
                <div className="icon-pod-sm">
                  <action.icon className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                </div>
                
                <div className="flex-1">
                  <div className="text-white/80 font-medium mb-1">{action.title}</div>
                  <div className="text-sm text-white/30">{action.subtitle}</div>
                </div>
                
                <ChevronRight className="w-5 h-5 text-white/15 group-hover:text-white/30 transition-colors" strokeWidth={1.5} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="px-16" data-testid="recent-projects">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-label mb-8"
          >
            Recent Projects
          </motion.p>
          
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.9 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -2 }}
                onClick={() => navigate(`/project/${project.id}`)}
                className="glass-card p-8 flex items-center gap-6 cursor-pointer group"
              >
                <div className="icon-pod-sm">
                  <Building2 className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                </div>
                
                <div className="flex-1">
                  <div className="text-white/80 font-medium mb-1">{project.name}</div>
                  <div className="text-sm text-white/30">{project.location}</div>
                </div>
                
                <div className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-xs font-mono text-white/40">{project.code}</span>
                </div>
                
                <ChevronRight className="w-5 h-5 text-white/15 group-hover:text-white/30 transition-colors" strokeWidth={1.5} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default Dashboard;
