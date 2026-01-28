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
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';

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
    return new Date(isoString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
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
    if (newDate <= new Date()) setSelectedDate(newDate);
  };

  const uniqueProjects = new Set(checkins.map(c => c.project_name)).size;
  const uniqueCompanies = new Set(checkins.map(c => c.worker_company)).size;

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="px-8 py-6 flex items-center justify-between border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="btn-icon"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </motion.button>
            <span className="text-sm font-medium tracking-[0.2em] text-white/50">BLUEVIEW</span>
          </div>
          
          <button onClick={onLogout} className="btn-icon">
            <LogOut className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </header>

        <div className="px-8 pt-8 pb-36">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <p className="text-label mb-3">Daily</p>
            <h1 
              className="text-5xl md:text-6xl font-extralight text-white tracking-tight"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
            >
              Sign-In Log
            </h1>
          </motion.div>

          {/* Date Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="stat-card p-5 mb-8"
          >
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToPreviousDay}
                className="btn-icon"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </motion.button>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                <span className="text-white/80 font-medium">{formatDate(selectedDate)}</span>
                {isToday && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/60 font-medium">TODAY</span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToNextDay}
                disabled={isToday}
                className={`btn-icon ${isToday ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: Users, value: checkins.length, label: 'Workers' },
              { icon: Building2, value: uniqueProjects, label: 'Projects' },
              { icon: Briefcase, value: uniqueCompanies, label: 'Companies' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                className="stat-card p-6 text-center"
              >
                <div className="icon-pod mx-auto mb-4">
                  <stat.icon className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                </div>
                <div className="text-3xl font-extralight text-white/90 mb-1">{stat.value}</div>
                <div className="text-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Check-ins List */}
          <div className="space-y-3" data-testid="checkins-list">
            {checkins.map((checkin, index) => (
              <motion.div
                key={checkin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.03 }}
                className="stat-card p-5"
              >
                <div className="flex items-center gap-5">
                  {/* Time */}
                  <div className="text-center w-20">
                    <div className="text-white/70 font-medium">{formatTime(checkin.check_in_time)}</div>
                    {checkin.check_out_time && (
                      <div className="text-white/30 text-xs mt-1">Out: {formatTime(checkin.check_out_time)}</div>
                    )}
                  </div>
                  
                  {/* Divider */}
                  <div className="w-px h-12 bg-white/10" />
                  
                  {/* Worker Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 text-sm font-medium">
                        {checkin.worker_name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-white/90 font-medium">{checkin.worker_name}</div>
                        <div className="text-white/40 text-sm">{checkin.worker_trade}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/30">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" strokeWidth={1.5} />
                        {checkin.project_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" strokeWidth={1.5} />
                        {checkin.worker_company}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status */}
                  {!checkin.check_out_time ? (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
                      <span className="text-xs text-white/50 font-medium">ON-SITE</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <Clock className="w-3 h-3 text-white/30" strokeWidth={1.5} />
                      <span className="text-xs text-white/30 font-medium">DONE</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default WorkersPage;
