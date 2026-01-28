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
import StatCard from '../components/ui/StatCard';
import QuickActionCard from '../components/ui/QuickActionCard';
import GlassCard from '../components/ui/GlassCard';
import LiveIndicator from '../components/ui/LiveIndicator';

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

  return (
    <div className="min-h-screen relative pb-32">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 backdrop-blur-xl bg-[#070710]/80 border-b border-white/[0.05]"
        >
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                  <span className="text-sm font-semibold tracking-[0.2em] text-white/70">BLUEVIEW</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <LiveIndicator label="LIVE" />
                
                <button
                  onClick={onLogout}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all"
                >
                  <LogOut className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Welcome Section */}
        <div className="max-w-6xl mx-auto px-6 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <p className="text-white/30 text-sm tracking-wide mb-1">Welcome back,</p>
            <h1 className="text-4xl font-extralight text-white tracking-tight">
              {user?.name?.split(' ')[0] || 'User'}
            </h1>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              icon={Users} 
              value={stats.totalWorkers} 
              label="Total Workers" 
              delay={0}
            />
            <StatCard 
              icon={Building2} 
              value={stats.activeProjects} 
              label="Active Projects" 
              delay={0.05}
            />
            <StatCard 
              icon={MapPin} 
              value={stats.todayCheckins} 
              label="On-Site Today" 
              delay={0.1}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-6xl mx-auto px-6 mt-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 mb-4"
          >
            <h2 className="text-sm font-medium text-white/50 tracking-wide">Quick Actions</h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {user?.role === 'admin' && (
              <QuickActionCard
                icon={Shield}
                title="User Management"
                subtitle="Manage CPs and Workers"
                onClick={() => navigate('/admin/users')}
                delay={0}
              />
            )}
            
            <QuickActionCard
              icon={UserPlus}
              title="Worker Registry"
              subtitle="Manage worker passports"
              onClick={() => navigate('/workers')}
              delay={0.05}
            />
            
            <QuickActionCard
              icon={Building2}
              title="Projects"
              subtitle="Manage job sites"
              onClick={() => navigate('/projects')}
              delay={0.1}
            />
            
            <QuickActionCard
              icon={FileText}
              title="Super Daily Log"
              subtitle="Create today's site report"
              onClick={() => navigate('/daily-log')}
              delay={0.15}
            />
            
            <QuickActionCard
              icon={BarChart3}
              title="Reports"
              subtitle="View & download daily reports"
              onClick={() => navigate('/reports')}
              delay={0.2}
            />
            
            {user?.role === 'admin' && (
              <QuickActionCard
                icon={UsersRound}
                title="Subcontractors"
                subtitle="Manage subcontractor accounts"
                onClick={() => navigate('/admin/subcontractors')}
                delay={0.25}
              />
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="max-w-6xl mx-auto px-6 mt-10" data-testid="recent-projects">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 mb-4"
          >
            <h2 className="text-sm font-medium text-white/50 tracking-wide">Recent Projects</h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>
          
          <div className="space-y-3">
            {recentProjects.map((project, index) => (
              <GlassCard
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="p-4"
              >
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/90 font-medium text-sm">{project.name}</div>
                    <div className="text-white/30 text-xs">{project.location}</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                    <span className="text-[10px] font-mono font-medium text-white/50 tracking-wider">
                      {project.code}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20" strokeWidth={1.5} />
                </motion.div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default Dashboard;
