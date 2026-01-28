import React, { useState, useEffect } from 'react';
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
  Building
} from 'lucide-react';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';
import StatCard from '../components/ui/StatCard';
import QuickActionCard from '../components/ui/QuickActionCard';
import GlassCard from '../components/ui/GlassCard';
import LiveIndicator from '../components/ui/LiveIndicator';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalWorkers: 24,
    activeProjects: 5,
    todayCheckins: 18,
  });
  const [recentProjects, setRecentProjects] = useState([
    { id: '1', name: 'Downtown Tower Phase 2', location: 'New York, NY', qr_code: 'DT-001' },
    { id: '2', name: 'Harbor Bridge Renovation', location: 'Brooklyn, NY', qr_code: 'HB-002' },
    { id: '3', name: 'Metro Station Expansion', location: 'Manhattan, NY', qr_code: 'MS-003' },
  ]);

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'orange';
      case 'cp': return 'cyan';
      default: return 'success';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen relative pb-32">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/40 text-sm font-light">Site Operations Hub</p>
                <h1 className="text-2xl font-extrabold tracking-[0.15em] text-white">BLUEVIEW</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <LiveIndicator label="LIVE" color="success" />
                
                <div className={`badge badge-${getRoleBadgeColor(user?.role)}`}>
                  {user?.role?.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* User Info Bar */}
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/5"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </div>
            <div>
              <div className="text-white font-semibold">{user?.name}</div>
              <div className="text-white/40 text-sm">{user?.email}</div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto px-6 mt-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <StatCard 
              icon={Users} 
              value={stats.totalWorkers} 
              label="Total Workers" 
              color="orange"
              delay={0}
            />
            <StatCard 
              icon={Building2} 
              value={stats.activeProjects} 
              label="Active Projects" 
              color="cyan"
              delay={0.1}
            />
            <StatCard 
              icon={MapPin} 
              value={stats.todayCheckins} 
              label="On-Site Today" 
              color="success"
              delay={0.2}
            />
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-7xl mx-auto px-6 mt-10">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-semibold text-white mb-4"
          >
            Quick Actions
          </motion.h2>
          
          <div className="space-y-3">
            {user?.role === 'admin' && (
              <QuickActionCard
                icon={Shield}
                title="User Management"
                subtitle="Manage CPs and Workers"
                color="orange"
                onClick={() => navigate('/admin/users')}
                delay={0}
              />
            )}
            
            <QuickActionCard
              icon={UserPlus}
              title="Worker Registry"
              subtitle="Manage worker passports"
              color="orange"
              onClick={() => navigate('/workers')}
              delay={0.1}
            />
            
            <QuickActionCard
              icon={Building2}
              title="Projects"
              subtitle="Manage job sites"
              color="cyan"
              onClick={() => navigate('/projects')}
              delay={0.2}
            />
            
            <QuickActionCard
              icon={FileText}
              title="Super Daily Log"
              subtitle="Create today's site report"
              color="warning"
              onClick={() => navigate('/daily-log')}
              delay={0.3}
            />
            
            <QuickActionCard
              icon={BarChart3}
              title="Reports"
              subtitle="View & download daily reports"
              color="purple"
              onClick={() => navigate('/reports')}
              delay={0.4}
            />
            
            {user?.role === 'admin' && (
              <QuickActionCard
                icon={UsersRound}
                title="Subcontractors"
                subtitle="Manage subcontractor accounts"
                color="cyan"
                onClick={() => navigate('/admin/subcontractors')}
                delay={0.5}
              />
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="max-w-7xl mx-auto px-6 mt-10" data-testid="recent-projects">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-semibold text-white mb-4"
          >
            Recent Projects
          </motion.h2>
          
          <div className="space-y-3">
            {recentProjects.map((project, index) => (
              <GlassCard
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                glowColor="cyan"
                className="p-4"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Building className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium">{project.name}</div>
                    <div className="text-white/40 text-sm">{project.location}</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/20">
                    <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                      {project.qr_code}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30" />
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
