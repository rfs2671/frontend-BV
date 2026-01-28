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
  UsersRound,
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
    { id: '3', name: 'Metro Station Expansion', location: 'Manhattan, NY', code: 'MS-003' },
  ]);

  const quickActions = [
    { icon: Shield, title: 'User Management', subtitle: 'Manage CPs and Workers', path: '/admin/users', adminOnly: true },
    { icon: UserPlus, title: 'Worker Registry', subtitle: 'Manage worker passports', path: '/workers' },
    { icon: Building2, title: 'Projects', subtitle: 'Manage job sites', path: '/projects' },
    { icon: FileText, title: 'Super Daily Log', subtitle: 'Create today\'s site report', path: '/daily-log' },
    { icon: BarChart3, title: 'Reports', subtitle: 'View & download reports', path: '/reports' },
    { icon: UsersRound, title: 'Subcontractors', subtitle: 'Manage subcontractor accounts', path: '/admin/subcontractors', adminOnly: true },
  ];

  return (
    <div className="min-h-screen relative pb-32">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40"
          style={{ 
            background: 'rgba(5, 10, 18, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                <span className="text-sm font-medium tracking-[0.2em] text-white/60">BLUEVIEW</span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Live Indicator with subtle orange glow */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-[#FF6B00]/60 animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#FF6B00]/30 animate-ping" />
                  </div>
                  <span className="text-[10px] font-medium tracking-[0.15em] text-white/50">LIVE</span>
                </div>
                
                <button
                  onClick={onLogout}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white/70 hover:bg-white/[0.06] hover:border-white/[0.15] transition-all"
                >
                  <LogOut className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Welcome Section */}
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <p className="text-white/30 text-sm tracking-wide mb-2">Welcome back,</p>
            <h1 className="text-5xl font-extralight text-white tracking-tight">
              {user?.name?.split(' ')[0] || 'User'}
            </h1>
          </motion.div>
        </div>

        {/* Stats Grid - Glass Cards with Holographic Border */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Users, value: stats.totalWorkers, label: 'TOTAL WORKERS' },
              { icon: Building2, value: stats.activeProjects, label: 'ACTIVE PROJECTS' },
              { icon: MapPin, value: stats.todayCheckins, label: 'ON-SITE TODAY' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, type: "spring", stiffness: 400, damping: 30 }}
                className="holographic-card p-6"
              >
                <div className="relative z-10">
                  {/* Icon with subtle blue glow */}
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-6">
                    <stat.icon className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                  </div>
                  
                  {/* Value */}
                  <div className="text-5xl font-extralight text-white mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-[10px] text-white/30 font-medium tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-5"
          >
            <h2 className="text-xs font-medium text-white/40 tracking-[0.15em]">QUICK ACTIONS</h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickActions
              .filter(action => !action.adminOnly || user?.role === 'admin')
              .map((action, index) => (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.03 }}
                  whileHover={{ x: 4 }}
                  onClick={() => navigate(action.path)}
                  className="glass-card p-4 flex items-center gap-4 text-left group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center transition-all group-hover:bg-white/[0.08] group-hover:border-white/[0.15]">
                    <action.icon className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/80 font-medium text-sm">{action.title}</div>
                    <div className="text-white/30 text-xs mt-0.5">{action.subtitle}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" strokeWidth={1.5} />
                </motion.button>
              ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="max-w-6xl mx-auto px-6 mt-12" data-testid="recent-projects">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <h2 className="text-xs font-medium text-white/40 tracking-[0.15em]">RECENT PROJECTS</h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>
          
          <div className="space-y-3">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + index * 0.03 }}
                whileHover={{ y: -2 }}
                onClick={() => navigate(`/project/${project.id}`)}
                className="glass-card p-4 flex items-center gap-4 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white/80 font-medium text-sm">{project.name}</div>
                  <div className="text-white/30 text-xs">{project.location}</div>
                </div>
                {/* Code badge with subtle blue indicator */}
                <div className="px-3 py-1.5 rounded-lg bg-[#00D4FF]/[0.05] border border-[#00D4FF]/[0.15]">
                  <span className="text-[10px] font-mono font-medium text-[#00D4FF]/70 tracking-wider">
                    {project.code}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" strokeWidth={1.5} />
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
