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
  Upload,
  Send,
  Building2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';

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
      photos: [],
      work_description: 'Completed wiring on floors 3-5. Installed main panel boxes.',
      inspection: { cleanliness: 'pass', safety: 'pass' }
    },
    { 
      company_name: 'Precision Plumbing',
      worker_count: 3,
      photos: [],
      work_description: 'Installed water lines in east wing bathrooms.',
      inspection: { cleanliness: 'pass', safety: 'fail', comments: 'Safety barriers need reinforcement' }
    },
  ]);

  const toggleInspection = (cardIndex, field) => {
    const updated = [...subcontractorCards];
    updated[cardIndex].inspection[field] = 
      updated[cardIndex].inspection[field] === 'pass' ? 'fail' : 'pass';
    setSubcontractorCards(updated);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Daily log saved successfully!');
    }, 1500);
  };

  const getWeatherIcon = () => {
    const option = weatherOptions.find(w => w.label === weather);
    return option?.icon || Sun;
  };

  const WeatherIcon = getWeatherIcon();

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
                <h1 className="text-lg font-medium text-white">Super Daily Log</h1>
                <p className="text-white/30 text-xs">{today}</p>
              </div>
              
              <GlowButton
                variant="primary"
                size="md"
                icon={Upload}
                onClick={handleSave}
                loading={saving}
              >
                Save
              </GlowButton>
            </div>
          </div>
        </motion.header>

        <div className="max-w-6xl mx-auto px-6 mt-6 space-y-4">
          {/* Project Selector */}
          <GlassCard className="p-4" hoverable={false}>
            <button
              onClick={() => setShowProjectPicker(!showProjectPicker)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white/50" strokeWidth={1.5} />
                </div>
                <span className="text-white/80 font-medium text-sm">{selectedProject.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${showProjectPicker ? 'rotate-180' : ''}`} strokeWidth={1.5} />
            </button>
            
            <AnimatePresence>
              {showProjectPicker && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-2">
                    {projects.map(project => (
                      <button
                        key={project.id}
                        onClick={() => {
                          setSelectedProject(project);
                          setShowProjectPicker(false);
                        }}
                        className={`w-full p-3 rounded-xl text-left text-sm transition-all ${
                          selectedProject.id === project.id 
                            ? 'bg-white/[0.08] text-white' 
                            : 'bg-white/[0.02] text-white/50 hover:bg-white/[0.05] hover:text-white/80'
                        }`}
                      >
                        {project.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          {/* Weather Card */}
          <GlassCard className="p-4" hoverable={false}>
            <button
              onClick={() => setShowWeatherPicker(!showWeatherPicker)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                  <WeatherIcon className="w-4 h-4 text-white/50" strokeWidth={1.5} />
                </div>
                <div className="text-left">
                  <div className="text-white/30 text-[10px] tracking-wider uppercase">Weather</div>
                  <div className="text-white/80 font-medium text-sm">{weather || 'Set weather'}</div>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${showWeatherPicker ? 'rotate-180' : ''}`} strokeWidth={1.5} />
            </button>
            
            <AnimatePresence>
              {showWeatherPicker && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-white/[0.06] grid grid-cols-4 gap-2">
                    {weatherOptions.map(option => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.label}
                          onClick={() => {
                            setWeather(option.label);
                            setShowWeatherPicker(false);
                          }}
                          className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                            weather === option.label 
                              ? 'bg-white/[0.08] text-white' 
                              : 'bg-white/[0.02] text-white/40 hover:bg-white/[0.05] hover:text-white/70'
                          }`}
                        >
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                          <span className="text-[10px]">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          {/* Subcontractor Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-white/50">Subcontractor Cards</h2>
              <GlowButton variant="secondary" size="sm" icon={Plus}>
                Add
              </GlowButton>
            </div>

            <div className="space-y-3">
              {subcontractorCards.map((card, index) => (
                <GlassCard key={index} className="overflow-hidden" hoverable={false}>
                  <button
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="w-full p-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/60 text-xs font-medium">
                      {card.company_name.charAt(0)}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white/80 font-medium text-sm">{card.company_name}</div>
                      <div className="text-white/30 text-xs">
                        {card.worker_count} workers • {card.photos.length} photos
                      </div>
                    </div>
                    {expandedCard === index ? (
                      <ChevronUp className="w-4 h-4 text-white/30" strokeWidth={1.5} />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/30" strokeWidth={1.5} />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedCard === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 space-y-4 border-t border-white/[0.06]">
                          {/* Photos */}
                          <div>
                            <div className="text-white/30 text-xs mb-2">Photos</div>
                            <div className="flex gap-2">
                              <button className="w-14 h-14 rounded-xl bg-white/[0.03] border border-dashed border-white/[0.15] flex flex-col items-center justify-center text-white/30 hover:text-white/50 hover:border-white/[0.25] transition-all">
                                <Camera className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>

                          {/* Work Description */}
                          <div>
                            <div className="text-white/30 text-xs mb-2">Work Performed Today</div>
                            <div className="relative">
                              <textarea
                                value={card.work_description}
                                onChange={(e) => {
                                  const updated = [...subcontractorCards];
                                  updated[index].work_description = e.target.value;
                                  setSubcontractorCards(updated);
                                }}
                                placeholder="Describe work performed..."
                                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 pr-12 text-white text-sm placeholder-white/20 min-h-[80px] resize-none focus:outline-none focus:border-white/[0.15] transition-all"
                              />
                              <button className="absolute right-3 top-3 w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-white/40">
                                <Mic className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>

                          {/* Inspection */}
                          <div>
                            <div className="text-white/30 text-xs mb-2">Site Inspection</div>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                onClick={() => toggleInspection(index, 'cleanliness')}
                                className={`p-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${
                                  card.inspection.cleanliness === 'pass'
                                    ? 'bg-white/[0.05] text-white/70 border-white/[0.15]'
                                    : 'bg-white/[0.02] text-white/30 border-white/[0.08]'
                                }`}
                              >
                                {card.inspection.cleanliness === 'pass' ? (
                                  <Check className="w-4 h-4" strokeWidth={1.5} />
                                ) : (
                                  <X className="w-4 h-4" strokeWidth={1.5} />
                                )}
                                <span className="text-xs font-medium">Cleanliness</span>
                              </button>
                              <button
                                onClick={() => toggleInspection(index, 'safety')}
                                className={`p-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${
                                  card.inspection.safety === 'pass'
                                    ? 'bg-white/[0.05] text-white/70 border-white/[0.15]'
                                    : 'bg-white/[0.02] text-white/30 border-white/[0.08]'
                                }`}
                              >
                                {card.inspection.safety === 'pass' ? (
                                  <Check className="w-4 h-4" strokeWidth={1.5} />
                                ) : (
                                  <X className="w-4 h-4" strokeWidth={1.5} />
                                )}
                                <span className="text-xs font-medium">Safety</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h2 className="text-sm font-medium text-white/50 mb-3">Additional Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes for today..."
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 text-white text-sm placeholder-white/20 min-h-[100px] resize-none focus:outline-none focus:border-white/[0.15] transition-all"
            />
          </div>

          {/* Submit Button */}
          <GlowButton
            variant="primary"
            size="lg"
            fullWidth
            icon={Send}
            data-testid="submit-daily-log-btn"
          >
            Submit Daily Log
          </GlowButton>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default DailyLogPage;
