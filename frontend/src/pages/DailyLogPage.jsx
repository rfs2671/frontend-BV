import React, { useState } from 'react';
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

const DailyLogPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState({ id: '1', name: 'Downtown Tower Phase 2' });
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [showWeatherPicker, setShowWeatherPicker] = useState(false);
  const [weather, setWeather] = useState('Sunny');
  const [expandedCard, setExpandedCard] = useState(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const projects = [
    { id: '1', name: 'Downtown Tower Phase 2' },
    { id: '2', name: 'Harbor Bridge Renovation' },
    { id: '3', name: 'Metro Station Expansion' },
  ];

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

  const [subcontractorCards, setSubcontractorCards] = useState([
    { 
      company_name: 'Elite Electric Co',
      worker_count: 4,
      work_description: 'Completed wiring on floors 3-5.',
      inspection: { cleanliness: 'pass', safety: 'pass' }
    },
    { 
      company_name: 'Precision Plumbing',
      worker_count: 3,
      work_description: 'Installed water lines in east wing.',
      inspection: { cleanliness: 'pass', safety: 'fail' }
    },
  ]);

  const toggleInspection = (cardIndex, field) => {
    const updated = [...subcontractorCards];
    updated[cardIndex].inspection[field] = updated[cardIndex].inspection[field] === 'pass' ? 'fail' : 'pass';
    setSubcontractorCards(updated);
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const WeatherIcon = weatherOptions.find(w => w.label === weather)?.icon || Sun;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Daily log saved!');
    }, 1500);
  };

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

          {/* Project Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="stat-card p-5 mb-4"
          >
            <button onClick={() => setShowProjectPicker(!showProjectPicker)} className="w-full flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="icon-pod">
                  <Building2 className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                </div>
                <span className="text-white/80 font-medium">{selectedProject.name}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${showProjectPicker ? 'rotate-180' : ''}`} strokeWidth={1.5} />
            </button>
            
            <AnimatePresence>
              {showProjectPicker && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                    {projects.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setSelectedProject(p); setShowProjectPicker(false); }}
                        className={`w-full p-3 rounded-xl text-left transition-all ${selectedProject.id === p.id ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'}`}
                      >
                        {p.name}
                      </button>
                    ))}
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
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-glass text-sm flex items-center gap-2">
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
                >
                  <button onClick={() => setExpandedCard(expandedCard === index ? null : index)} className="w-full p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 font-medium">
                      {card.company_name.charAt(0)}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white/80 font-medium">{card.company_name}</div>
                      <div className="text-white/40 text-sm">{card.worker_count} workers</div>
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
                                placeholder="Describe work..."
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
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving}
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
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default DailyLogPage;
