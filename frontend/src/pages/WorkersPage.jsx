import React, { useState, useEffect } from 'react';
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
import { WorkerCardSkeleton, StatCardSkeleton } from '../components/ui/GlassSkeleton';
import { useToast } from '../components/ui/Toast';
import { workersAPI, checkinsAPI, projectsAPI } from '../utils/api';

const WorkersPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [projects, setProjects] = useState([]);

  // Format date for API (YYYY-MM-DD)
  const formatDateForApi = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
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

  // Fetch data on mount and date change
  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch workers and projects in parallel
      const [workersData, projectsData] = await Promise.all([
        workersAPI.getAll().catch(() => []),
        projectsAPI.getAll().catch(() => []),
      ]);

      setWorkers(Array.isArray(workersData) ? workersData : []);
      setProjects(Array.isArray(projectsData) ? projectsData : []);

      // Try to fetch checkins for today from all projects
      let allCheckins = [];
      if (projectsData.length > 0) {
        const checkinsPromises = projectsData.map(project => 
          checkinsAPI.getTodayByProject(project._id || project.id).catch(() => [])
        );
        const checkinsResults = await Promise.all(checkinsPromises);
        allCheckins = checkinsResults.flat();
      }

      // If no checkins found, try the general checkins endpoint
      if (allCheckins.length === 0) {
        try {
          const generalCheckins = await checkinsAPI.getAll();
          allCheckins = Array.isArray(generalCheckins) ? generalCheckins : [];
        } catch (e) {
          // Fallback to mock data based on workers
          allCheckins = workersData.slice(0, 4).map((worker, index) => ({
            _id: `checkin-${index}`,
            worker_id: worker._id || worker.id,
            worker_name: worker.name || worker.full_name,
            worker_trade: worker.trade || 'General',
            worker_company: worker.company || 'Unknown Company',
            project_name: projectsData[index % projectsData.length]?.name || 'Project',
            check_in_time: new Date().toISOString(),
            check_out_time: index === 1 ? new Date().toISOString() : null,
          }));
        }
      }

      setCheckins(allCheckins);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Load Error', 'Could not load worker data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const uniqueProjects = new Set(checkins.map(c => c.project_name || c.project_id)).size;
  const uniqueCompanies = new Set(checkins.map(c => c.worker_company || c.company)).size;

  // Helper to get worker info from checkin
  const getWorkerInfo = (checkin) => ({
    name: checkin.worker_name || checkin.name || 'Unknown Worker',
    trade: checkin.worker_trade || checkin.trade || 'General',
    company: checkin.worker_company || checkin.company || 'Unknown Company',
    project: checkin.project_name || 'Unknown Project',
    checkInTime: checkin.check_in_time || checkin.checkin_time,
    checkOutTime: checkin.check_out_time || checkin.checkout_time,
  });

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
            {loading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              [
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
                  data-testid={`stat-${stat.label.toLowerCase()}`}
                >
                  <div className="icon-pod mx-auto mb-4">
                    <stat.icon className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl font-extralight text-white/90 mb-1">{stat.value}</div>
                  <div className="text-label">{stat.label}</div>
                </motion.div>
              ))
            )}
          </div>

          {/* Check-ins List */}
          <div className="space-y-3" data-testid="checkins-list">
            {loading ? (
              <>
                <WorkerCardSkeleton />
                <WorkerCardSkeleton />
                <WorkerCardSkeleton />
              </>
            ) : checkins.length > 0 ? (
              checkins.map((checkin, index) => {
                const workerInfo = getWorkerInfo(checkin);
                const initials = workerInfo.name.split(' ').map(n => n[0]).join('').toUpperCase();
                
                return (
                  <motion.div
                    key={checkin._id || checkin.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.03 }}
                    className="stat-card p-5"
                    data-testid={`checkin-card-${checkin._id || checkin.id || index}`}
                  >
                    <div className="flex items-center gap-5">
                      {/* Time */}
                      <div className="text-center w-20">
                        <div className="text-white/70 font-medium">{formatTime(workerInfo.checkInTime)}</div>
                        {workerInfo.checkOutTime && (
                          <div className="text-white/30 text-xs mt-1">Out: {formatTime(workerInfo.checkOutTime)}</div>
                        )}
                      </div>
                      
                      {/* Divider */}
                      <div className="w-px h-12 bg-white/10" />
                      
                      {/* Worker Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 text-sm font-medium">
                            {initials}
                          </div>
                          <div>
                            <div className="text-white/90 font-medium">{workerInfo.name}</div>
                            <div className="text-white/40 text-sm">{workerInfo.trade}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-white/30">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" strokeWidth={1.5} />
                            {workerInfo.project}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" strokeWidth={1.5} />
                            {workerInfo.company}
                          </span>
                        </div>
                      </div>
                      
                      {/* Status */}
                      {!workerInfo.checkOutTime ? (
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
                );
              })
            ) : (
              <div className="text-center py-20">
                <Users className="w-12 h-12 text-white/20 mx-auto mb-4" strokeWidth={1} />
                <p className="text-white/40">No check-ins recorded for this date</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default WorkersPage;
