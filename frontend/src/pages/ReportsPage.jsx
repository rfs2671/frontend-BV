import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download,
  FileText,
  Check,
  Server,
  Building2,
  Users,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';
import { GlassSkeleton } from '../components/ui/GlassSkeleton';
import { useToast } from '../components/ui/Toast';
import { projectsAPI, workersAPI, dailyLogsAPI } from '../utils/api';

const ReportsPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [stats, setStats] = useState({ projects: 0, workers: 0 });
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [dailyLogs, setDailyLogs] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsData, workersData] = await Promise.all([
        projectsAPI.getAll().catch(() => []),
        workersAPI.getAll().catch(() => []),
      ]);

      const projectList = Array.isArray(projectsData) ? projectsData : [];
      const workerList = Array.isArray(workersData) ? workersData : [];

      setProjects(projectList);
      setStats({
        projects: projectList.length,
        workers: workerList.length,
      });

      // Select first project by default
      if (projectList.length > 0) {
        setSelectedProject(projectList[0]);
        fetchDailyLogs(projectList[0]._id || projectList[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Load Error', 'Could not load report data');
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyLogs = async (projectId) => {
    try {
      const logs = await dailyLogsAPI.getByProject(projectId);
      setDailyLogs(Array.isArray(logs) ? logs : []);
    } catch (error) {
      console.error('Failed to fetch daily logs:', error);
      setDailyLogs([]);
    }
  };

  const handleProjectChange = (project) => {
    setSelectedProject(project);
    setShowProjectPicker(false);
    fetchDailyLogs(project._id || project.id);
  };

  const handleGenerateReport = async () => {
    if (!selectedProject) {
      toast.warning('No Project', 'Please select a project first');
      return;
    }

    if (dailyLogs.length === 0) {
      toast.warning('No Logs', 'No daily logs found for this project');
      return;
    }

    setGenerating(true);
    try {
      // Try to generate PDF for the most recent daily log
      const recentLog = dailyLogs[0];
      const logId = recentLog._id || recentLog.id;
      
      const blob = await dailyLogsAPI.getPdf(logId);
      
      // Download the PDF
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `daily-report-${selectedProject.name}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Downloaded', 'Report generated successfully');
    } catch (error) {
      console.error('Failed to generate report:', error);
      toast.error('Generate Error', error.message || 'Could not generate report');
    } finally {
      setGenerating(false);
    }
  };

  const getProjectId = (project) => project?._id || project?.id;

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
            <p className="text-label mb-3">Daily Field</p>
            <h1 
              className="text-5xl md:text-6xl font-extralight text-white tracking-tight"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
            >
              Reports
            </h1>
          </motion.div>

          {loading ? (
            <div className="space-y-6">
              <GlassSkeleton className="h-48 w-full rounded-[32px]" />
              <GlassSkeleton className="h-64 w-full rounded-[32px]" />
            </div>
          ) : (
            <>
              {/* System Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-8 mb-6"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="icon-pod">
                    <Server className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-white/80 font-medium text-lg">System Status</h2>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="stat-card p-5">
                    <div className="text-label mb-2">Database</div>
                    <div className="text-white/60 text-sm">MongoDB Atlas</div>
                  </div>
                  <div className="stat-card p-5">
                    <div className="text-label mb-2">Status</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-sm">Connected</span>
                    </div>
                  </div>
                  <div className="stat-card p-5" data-testid="stat-projects-count">
                    <div className="text-label mb-2">Projects</div>
                    <div className="text-3xl font-extralight text-white/90">{stats.projects}</div>
                  </div>
                  <div className="stat-card p-5" data-testid="stat-workers-count">
                    <div className="text-label mb-2">Workers</div>
                    <div className="text-3xl font-extralight text-white/90">{stats.workers}</div>
                  </div>
                </div>
              </motion.div>

              {/* Project Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="stat-card p-5 mb-6"
              >
                <button 
                  onClick={() => setShowProjectPicker(!showProjectPicker)} 
                  className="w-full flex items-center justify-between"
                  data-testid="report-project-selector"
                >
                  <div className="flex items-center gap-4">
                    <div className="icon-pod">
                      <Building2 className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                    </div>
                    <div className="text-left">
                      <div className="text-label mb-1">Select Project</div>
                      <div className="text-white/80 font-medium">
                        {selectedProject?.name || 'Choose a project'}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${showProjectPicker ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>
                
                {showProjectPicker && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }}
                    className="pt-4 mt-4 border-t border-white/10 space-y-2"
                  >
                    {projects.map(p => (
                      <button
                        key={getProjectId(p)}
                        onClick={() => handleProjectChange(p)}
                        className={`w-full p-3 rounded-xl text-left transition-all ${
                          getProjectId(selectedProject) === getProjectId(p) 
                            ? 'bg-white/10 text-white' 
                            : 'text-white/50 hover:bg-white/5'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                    {projects.length === 0 && (
                      <p className="text-white/40 text-center py-4">No projects available</p>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Report Generator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-12 text-center mb-6"
              >
                <div className="icon-pod mx-auto mb-8 w-20 h-20">
                  <FileText className="w-8 h-8 text-white/60" strokeWidth={1.5} />
                </div>
                
                <h2 
                  className="text-3xl font-extralight text-white mb-3"
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
                >
                  Generate Report
                </h2>
                <p className="text-white/40 mb-6 max-w-md mx-auto">
                  {selectedProject 
                    ? `Generate a PDF report for ${selectedProject.name}`
                    : 'Select a project to generate its report'
                  }
                </p>

                {selectedProject && (
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <FileText className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                      <span className="text-white/60 text-sm">
                        {dailyLogs.length} daily log{dailyLogs.length !== 1 ? 's' : ''} available
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-10">
                  {['Project details', 'Worker sign-in log', 'Subcontractor work', 'Site inspection'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                      <span className="text-sm text-white/50">{item}</span>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateReport}
                  disabled={generating || !selectedProject || dailyLogs.length === 0}
                  className="btn-glass inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="generate-report-btn"
                >
                  {generating ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" strokeWidth={1.5} />
                  )}
                  <span>{generating ? 'Generating...' : 'Download Report'}</span>
                </motion.button>
              </motion.div>

              {/* Daily Logs List */}
              {dailyLogs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="stat-card p-6"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="icon-pod">
                      <FileText className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white/80 font-medium">Recent Daily Logs</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {dailyLogs.slice(0, 5).map((log, index) => (
                      <div 
                        key={log._id || log.id || index}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-white/40 text-sm">
                            {new Date(log.date || log.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <span className="text-white/20">•</span>
                          <div className="text-white/60 text-sm">{log.weather || 'No weather'}</div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          log.status === 'submitted' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {log.status || 'draft'}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default ReportsPage;
