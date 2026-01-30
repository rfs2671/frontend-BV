import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSun,
  Wind,
  Snowflake,
  Thermometer,
  Plus,
  ChevronDown,
  ChevronUp,
  Camera,
  Mic,
  Check,
  X,
  Send,
  Building2,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';
import { GlassSkeleton } from '../components/ui/GlassSkeleton';
import { useToast } from '../components/ui/Toast';
import { projectsAPI, dailyLogsAPI } from '../utils/api';

const DailyLogPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [showWeatherPicker, setShowWeatherPicker] = useState(false);
  const [weather, setWeather] = useState('Sunny');
  const [expandedCard, setExpandedCard] = useState(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const [subcontractorCards, setSubcontractorCards] = useState([]);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectsAPI.getAll();
      const projectList = Array.isArray(data) ? data : [];
      setProjects(projectList);
      
      // Select first project by default
      if (projectList.length > 0) {
        setSelectedProject(projectList[0]);
        // Try to fetch existing daily log for today
        fetchDailyLog(projectList[0]._id || projectList[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Load Error', 'Could not load projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyLog = async (projectId) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const log = await dailyLogsAPI.getByProjectAndDate(projectId, today);
      
      if (log) {
        setWeather(log.weather || 'Sunny');
        setNotes(log.notes || '');
        setSubcontractorCards(log.subcontractor_cards || []);
      } else {
        // Initialize with default subcontractor cards
        setSubcontractorCards([
          { 
            company_name: 'Subcontractor 1',
            worker_count: 0,
            work_description: '',
            inspection: { cleanliness: 'pass', safety: 'pass' }
          },
        ]);
      }
    } catch (error) {
      // No existing log, start fresh
      setSubcontractorCards([
        { 
          company_name: 'Subcontractor 1',
          worker_count: 0,
          work_description: '',
          inspection: { cleanliness: 'pass', safety: 'pass' }
        },
      ]);
    }
  };

  const handleProjectChange = (project) => {
    setSelectedProject(project);
    setShowProjectPicker(false);
    fetchDailyLog(project._id || project.id);
  };

  const weatherOptions = [
    { label: 'Sunny', icon: Sun },
    { label: 'Partly Cloudy', icon: CloudSun },
    { label: 'Cloudy', icon: Cloud },
    { label: 'Rainy', icon: CloudRain },
    { label: 'Windy', icon: Wind },
    { label: 'Snow', icon: Snowflake },
    { label: 'Hot', icon: Thermometer },
    { label: 'Cold', icon: Thermometer },
  ];

  const toggleInspection = (cardIndex, field) => {
    const updated = [...subcontractorCards];
    updated[cardIndex].inspection[field] = updated[cardIndex].inspection[field] === 'pass' ? 'fail' : 'pass';
    setSubcontractorCards(updated);
  };

  const addSubcontractorCard = () => {
    setSubcontractorCards([
      ...subcontractorCards,
      {
        company_name: `Subcontractor ${subcontractorCards.length + 1}`,
        worker_count: 0,
        work_description: '',
        inspection: { cleanliness: 'pass', safety: 'pass' }
      }
    ]);
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const WeatherIcon = weatherOptions.find(w => w.label === weather)?.icon || Sun;

  const handleSave = async () => {
    if (!selectedProject) {
      toast.warning('No Project', 'Please select a project first');
      return;
    }

    setSaving(true);
    try {
      const logData = {
        project_id: selectedProject._id || selectedProject.id,
        date: new Date().toISOString().split('T')[0],
        weather: weather,
        notes: notes,
        subcontractor_cards: subcontractorCards,
      };

      await dailyLogsAPI.create(logData);
      toast.success('Saved', 'Daily log saved successfully');
    } catch (error) {
      console.error('Failed to save daily log:', error);
      toast.error('Save Error', error.message || 'Could not save daily log');
    } finally {
      setSaving(false);
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
            <p className="text-label mb-3">Super</p>
            <h1 
              className="text-5xl md:text-6xl font-extralight text-white tracking-tight mb-2"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
            >
              Daily Log
            </h1>
            <p className="text-white/40 font-light">{today}</p>
          </motion.div>

          {loading ? (
            <div className="space-y-4">
              <GlassSkeleton className="h-20 w-full rounded-3xl" />
              <GlassSkeleton className="h-24 w-full rounded-3xl" />
              <GlassSkeleton className="h-40 w-full rounded-3xl" />
            </div>
          ) : (
            <>
              {/* Project Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="stat-card p-5 mb-4"
              >
                <button 
                  onClick={() => setShowProjectPicker(!showProjectPicker)} 
                  className="w-full flex items-center justify-between"
                  data-testid="project-selector"
                >
                  <div className="flex items-center gap-4">
                    <div className="icon-pod">
                      <Building2 className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                    </div>
                    <span className="text-white/80 font-medium">
                      {selectedProject?.name || 'Select Project'}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${showProjectPicker ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>
                
                <AnimatePresence>
                  {showProjectPicker && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                        {projects.map(p => (
                          <button
                            key={getProjectId(p)}
                            onClick={() => handleProjectChange(p)}
                            className={`w-full p-3 rounded-xl text-left transition-all ${
                              getProjectId(selectedProject) === getProjectId(p) 
                                ? 'bg-white/10 text-white' 
                                : 'text-white/50 hover:bg-white/5'
                            }`}
                            data-testid={`project-option-${getProjectId(p)}`}
                          >
                            {p.name}
                          </button>
                        ))}
                        {projects.length === 0 && (
                          <p className="text-white/40 text-center py-4">No projects available</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Weather */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="stat-card p-5 mb-8"
              >
                <button onClick={() => setShowWeatherPicker(!showWeatherPicker)} className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="icon-pod">
                      <WeatherIcon className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                    </div>
                    <div className="text-left">
                      <div className="text-label mb-1">Weather</div>
                      <div className="text-white/80 font-medium">{weather}</div>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${showWeatherPicker ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>
                
                <AnimatePresence>
                  {showWeatherPicker && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pt-4 mt-4 border-t border-white/10 grid grid-cols-4 gap-2">
                        {weatherOptions.map(opt => {
                          const Icon = opt.icon;
                          return (
                            <button
                              key={opt.label}
                              onClick={() => { setWeather(opt.label); setShowWeatherPicker(false); }}
                              className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${weather === opt.label ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5'}`}
                            >
                              <Icon className="w-5 h-5" strokeWidth={1.5} />
                              <span className="text-xs">{opt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Subcontractor Cards */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-label">Subcontractor Cards</p>
                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    onClick={addSubcontractorCard}
                    className="btn-glass text-sm flex items-center gap-2"
                    data-testid="add-subcontractor-btn"
                  >
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                    Add
                  </motion.button>
                </div>
                
                <div className="space-y-3">
                  {subcontractorCards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="stat-card overflow-hidden"
                      data-testid={`subcontractor-card-${index}`}
                    >
                      <button onClick={() => setExpandedCard(expandedCard === index ? null : index)} className="w-full p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 font-medium">
                          {card.company_name.charAt(0)}
                        </div>
                        <div className="flex-1 text-left">
                          <input
                            type="text"
                            value={card.company_name}
                            onChange={(e) => {
                              e.stopPropagation();
                              const updated = [...subcontractorCards];
                              updated[index].company_name = e.target.value;
                              setSubcontractorCards(updated);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-transparent text-white/80 font-medium outline-none w-full"
                            placeholder="Company Name"
                          />
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="number"
                              value={card.worker_count}
                              onChange={(e) => {
                                e.stopPropagation();
                                const updated = [...subcontractorCards];
                                updated[index].worker_count = parseInt(e.target.value) || 0;
                                setSubcontractorCards(updated);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="bg-transparent text-white/40 text-sm outline-none w-12"
                              min="0"
                            />
                            <span className="text-white/40 text-sm">workers</span>
                          </div>
                        </div>
                        {expandedCard === index ? <ChevronUp className="w-5 h-5 text-white/40" strokeWidth={1.5} /> : <ChevronDown className="w-5 h-5 text-white/40" strokeWidth={1.5} />}
                      </button>
                      
                      <AnimatePresence>
                        {expandedCard === index && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="p-5 pt-0 border-t border-white/10 space-y-4">
                              {/* Photos */}
                              <div>
                                <p className="text-label mb-3">Photos</p>
                                <button className="w-16 h-16 rounded-xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center text-white/30 hover:text-white/50 transition-colors">
                                  <Camera className="w-5 h-5" strokeWidth={1.5} />
                                </button>
                              </div>
                              
                              {/* Work Description */}
                              <div>
                                <p className="text-label mb-3">Work Performed</p>
                                <div className="relative">
                                  <textarea
                                    value={card.work_description}
                                    onChange={(e) => {
                                      const updated = [...subcontractorCards];
                                      updated[index].work_description = e.target.value;
                                      setSubcontractorCards(updated);
                                    }}
                                    className="input-glass min-h-[80px] pr-14 resize-none"
                                    placeholder="Describe work performed..."
                                  />
                                  <button className="absolute right-4 top-4 btn-icon w-10 h-10">
                                    <Mic className="w-4 h-4" strokeWidth={1.5} />
                                  </button>
                                </div>
                              </div>
                              
                              {/* Inspection */}
                              <div>
                                <p className="text-label mb-3">Inspection</p>
                                <div className="grid grid-cols-2 gap-3">
                                  <button
                                    onClick={() => toggleInspection(index, 'cleanliness')}
                                    className={`p-4 rounded-xl flex items-center justify-center gap-2 transition-all border ${card.inspection.cleanliness === 'pass' ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}
                                  >
                                    {card.inspection.cleanliness === 'pass' ? <Check className="w-4 h-4" strokeWidth={1.5} /> : <X className="w-4 h-4" strokeWidth={1.5} />}
                                    <span className="text-sm font-medium">Cleanliness</span>
                                  </button>
                                  <button
                                    onClick={() => toggleInspection(index, 'safety')}
                                    className={`p-4 rounded-xl flex items-center justify-center gap-2 transition-all border ${card.inspection.safety === 'pass' ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}
                                  >
                                    {card.inspection.safety === 'pass' ? <Check className="w-4 h-4" strokeWidth={1.5} /> : <X className="w-4 h-4" strokeWidth={1.5} />}
                                    <span className="text-sm font-medium">Safety</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-8">
                <p className="text-label mb-4">Additional Notes</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-glass min-h-[100px] resize-none"
                  placeholder="Any additional notes..."
                  data-testid="daily-log-notes"
                />
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={saving || !selectedProject}
                className="btn-glass w-full flex items-center justify-center gap-3"
                data-testid="submit-daily-log-btn"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" strokeWidth={1.5} />
                    <span>Submit Daily Log</span>
                  </>
                )}
              </motion.button>
            </>
          )}
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default DailyLogPage;
