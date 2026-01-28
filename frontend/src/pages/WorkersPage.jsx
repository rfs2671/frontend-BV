import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Users,
  Building2,
  Briefcase,
  Clock,
  MapPin,
  Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';
import GlassCard from '../components/ui/GlassCard';
import StatCard from '../components/ui/StatCard';

const WorkersPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checkins, setCheckins] = useState([
    { 
      id: '1', 
      worker_name: 'John Martinez', 
      worker_trade: 'Electrician', 
      worker_company: 'Elite Electric Co', 
      project_name: 'Downtown Tower Phase 2',
      check_in_time: '2026-01-28T07:30:00',
      check_out_time: null
    },
    { 
      id: '2', 
      worker_name: 'Mike Thompson', 
      worker_trade: 'Plumber', 
      worker_company: 'Precision Plumbing',
      project_name: 'Harbor Bridge Renovation',
      check_in_time: '2026-01-28T07:45:00',
      check_out_time: '2026-01-28T16:30:00'
    },
    { 
      id: '3', 
      worker_name: 'Sarah Chen', 
      worker_trade: 'HVAC Technician', 
      worker_company: 'CoolAir Systems',
      project_name: 'Downtown Tower Phase 2',
      check_in_time: '2026-01-28T08:00:00',
      check_out_time: null
    },
    { 
      id: '4', 
      worker_name: 'David Wilson', 
      worker_trade: 'Carpenter', 
      worker_company: 'Master Woodworks',
      project_name: 'Metro Station Expansion',
      check_in_time: '2026-01-28T06:15:00',
      check_out_time: null
    },
  ]);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    if (newDate <= new Date()) {
      setSelectedDate(newDate);
    }
  };

  // Stats
  const uniqueProjects = new Set(checkins.map(c => c.project_name)).size;
  const uniqueCompanies = new Set(checkins.map(c => c.worker_company)).size;

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
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white">Daily Sign-In Log</h1>
                <p className="text-white/40 text-sm">{checkins.length} Check-ins</p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Date Selector */}
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <GlassCard className="p-4" hoverable={false}>
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToPreviousDay}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span className="text-white font-semibold">{formatDate(selectedDate)}</span>
                {isToday && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500 text-white">
                    TODAY
                  </span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToNextDay}
                disabled={isToday}
                className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-colors ${
                  isToday ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </GlassCard>
        </div>

        {/* Summary Stats */}
        <div className="max-w-7xl mx-auto px-6 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard 
              icon={Users} 
              value={checkins.length} 
              label="Workers" 
              color="success"
            />
            <StatCard 
              icon={Building2} 
              value={uniqueProjects} 
              label="Projects" 
              color="cyan"
            />
            <StatCard 
              icon={Briefcase} 
              value={uniqueCompanies} 
              label="Companies" 
              color="warning"
            />
          </div>
        </div>

        {/* Check-ins List */}
        <div className="max-w-7xl mx-auto px-6 mt-6" data-testid="checkins-list">
          <div className="space-y-3">
            {checkins.map((checkin, index) => (
              <motion.div
                key={checkin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className="p-4" hoverable={false}>
                  <div className="flex items-stretch gap-4">
                    {/* Time Column */}
                    <div className="flex flex-col items-center justify-center w-20 py-2">
                      <div className="text-green-400 font-bold text-sm">
                        {formatTime(checkin.check_in_time)}
                      </div>
                      {checkin.check_out_time && (
                        <div className="text-white/40 text-xs mt-1">
                          Out: {formatTime(checkin.check_out_time)}
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="w-0.5 bg-white/10 rounded-full" />

                    {/* Worker Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                          {checkin.worker_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-medium">{checkin.worker_name}</div>
                          <div className="text-cyan-400 text-sm">{checkin.worker_trade}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5 text-white/40">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          {checkin.project_name}
                        </div>
                        <div className="flex items-center gap-1.5 text-white/40">
                          <Building className="w-3 h-3" />
                          {checkin.worker_company}
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                      {!checkin.check_out_time ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-400/10 border border-green-400/20">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs font-medium text-green-400">On-Site</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                          <Clock className="w-3 h-3 text-white/40" />
                          <span className="text-xs font-medium text-white/40">Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Empty State */}
            {checkins.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium">No Check-Ins</h3>
                <p className="text-white/40 text-sm mt-2">
                  No workers have checked in {isToday ? 'today' : 'on this day'}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default WorkersPage;
