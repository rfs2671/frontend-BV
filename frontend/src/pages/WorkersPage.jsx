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
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';
import GlassCard from '../components/ui/GlassCard';
import StatCard from '../components/ui/StatCard';

const WorkersPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checkins] = useState([
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
          className="sticky top-0 z-40 backdrop-blur-xl bg-[#070710]/80 border-b border-white/[0.05]"
        >
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/')}
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              </motion.button>
              
              <div className="flex-1">
                <h1 className="text-lg font-medium text-white">Daily Sign-In Log</h1>
                <p className="text-white/30 text-xs">{checkins.length} Check-ins</p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Date Selector */}
        <div className="max-w-6xl mx-auto px-6 mt-6">
          <GlassCard className="p-4" hoverable={false}>
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPreviousDay}
                className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              </motion.button>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                <span className="text-white/80 font-medium text-sm">{formatDate(selectedDate)}</span>
                {isToday && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-white/[0.08] text-white/60 tracking-wider">
                    TODAY
                  </span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNextDay}
                disabled={isToday}
                className={`w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center transition-colors ${
                  isToday ? 'text-white/15 cursor-not-allowed' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </motion.button>
            </div>
          </GlassCard>
        </div>

        {/* Summary Stats */}
        <div className="max-w-6xl mx-auto px-6 mt-4">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={Users} value={checkins.length} label="Workers" />
            <StatCard icon={Building2} value={uniqueProjects} label="Projects" />
            <StatCard icon={Briefcase} value={uniqueCompanies} label="Companies" />
          </div>
        </div>

        {/* Check-ins List */}
        <div className="max-w-6xl mx-auto px-6 mt-6" data-testid="checkins-list">
          <div className="space-y-3">
            {checkins.map((checkin, index) => (
              <motion.div
                key={checkin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <GlassCard className="p-4" hoverable={false}>
                  <div className="flex items-stretch gap-4">
                    {/* Time Column */}
                    <div className="flex flex-col items-center justify-center w-16 py-2">
                      <div className="text-white/60 font-medium text-sm">
                        {formatTime(checkin.check_in_time)}
                      </div>
                      {checkin.check_out_time && (
                        <div className="text-white/30 text-xs mt-1">
                          Out: {formatTime(checkin.check_out_time)}
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-white/[0.08] rounded-full" />

                    {/* Worker Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/60 text-xs font-medium">
                          {checkin.worker_name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-white/90 font-medium text-sm">{checkin.worker_name}</div>
                          <div className="text-white/40 text-xs">{checkin.worker_trade}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5 text-white/30">
                          <MapPin className="w-3 h-3" strokeWidth={1.5} />
                          {checkin.project_name}
                        </div>
                        <div className="flex items-center gap-1.5 text-white/30">
                          <Building2 className="w-3 h-3" strokeWidth={1.5} />
                          {checkin.worker_company}
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                      {!checkin.check_out_time ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                          <span className="text-[10px] font-medium text-white/50 tracking-wider">ON-SITE</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                          <Clock className="w-3 h-3 text-white/25" strokeWidth={1.5} />
                          <span className="text-[10px] font-medium text-white/25 tracking-wider">DONE</span>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {checkins.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Calendar className="w-12 h-12 text-white/10 mx-auto mb-4" strokeWidth={1} />
                <h3 className="text-white/50 font-medium">No Check-Ins</h3>
                <p className="text-white/25 text-sm mt-2">
                  No workers checked in {isToday ? 'today' : 'on this day'}
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
