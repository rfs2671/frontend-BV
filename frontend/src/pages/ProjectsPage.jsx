import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Plus, 
  Building2, 
  MapPin, 
  Wifi, 
  Trash2, 
  X,
  Search,
  LayoutGrid,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';

const ProjectsPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [projects, setProjects] = useState([
    { id: '1', name: 'Downtown Tower Phase 2', location: 'New York, NY', qr_code: 'DT-001', nfc_tags: [{ tag_id: 'ABC123' }] },
    { id: '2', name: 'Harbor Bridge Renovation', location: 'Brooklyn, NY', qr_code: 'HB-002', nfc_tags: [] },
    { id: '3', name: 'Metro Station Expansion', location: 'Manhattan, NY', qr_code: 'MS-003', nfc_tags: [{ tag_id: 'DEF456' }, { tag_id: 'GHI789' }] },
  ]);
  const [newProject, setNewProject] = useState({ name: '', location: '' });

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProject = () => {
    if (!newProject.name.trim() || !newProject.location.trim()) return;
    const project = {
      id: Date.now().toString(),
      ...newProject,
      qr_code: `PRJ-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      nfc_tags: [],
    };
    setProjects([...projects, project]);
    setNewProject({ name: '', location: '' });
    setShowAddModal(false);
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

        {/* Main Content */}
        <div className="px-8 pt-8 pb-36">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <p className="text-label mb-3">Manage</p>
            <h1 
              className="text-5xl md:text-6xl font-extralight text-white tracking-tight"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
            >
              Projects
            </h1>
          </motion.div>

          {/* Search & Add */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" strokeWidth={1.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="input-glass pl-14"
                data-testid="search-projects-input"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              className="btn-glass flex items-center gap-2"
              data-testid="add-project-btn"
            >
              <Plus className="w-5 h-5" strokeWidth={1.5} />
              <span>New Project</span>
            </motion.button>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className="stat-card p-6 cursor-pointer group"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <div className="absolute inset-0 bg-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="relative z-10 flex items-center gap-6">
                  {/* Icon */}
                  <div className="icon-pod">
                    <Building2 className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-white/90 font-medium text-lg mb-1">{project.name}</h3>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <MapPin className="w-4 h-4" strokeWidth={1.5} />
                      <span>{project.location}</span>
                    </div>
                  </div>
                  
                  {/* NFC Badge */}
                  {project.nfc_tags?.length > 0 && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10">
                      <Wifi className="w-4 h-4 text-white/50" strokeWidth={1.5} />
                      <span className="text-xs text-white/50">{project.nfc_tags.length} NFC</span>
                    </div>
                  )}
                  
                  {/* Code */}
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <span className="text-xs font-mono text-white/50">{project.qr_code}</span>
                  </div>
                  
                  {/* Delete */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setProjects(projects.filter(p => p.id !== project.id));
                    }}
                    className="btn-icon opacity-0 group-hover:opacity-100 transition-opacity"
                    data-testid={`delete-project-${project.id}`}
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                  </motion.button>
                </div>
              </motion.div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <Building2 className="w-12 h-12 text-white/20 mx-auto mb-4" strokeWidth={1} />
                <p className="text-white/40">No projects found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-50 p-6"
            >
              <div className="max-w-lg mx-auto glass-card p-8" data-testid="add-project-modal">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-light text-white">New Project</h2>
                  <button onClick={() => setShowAddModal(false)} className="btn-icon">
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="text-label mb-3 block">Project Name</label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      placeholder="Downtown Tower Phase 2"
                      className="input-glass"
                      data-testid="project-name-input"
                    />
                  </div>
                  <div>
                    <label className="text-label mb-3 block">Location</label>
                    <input
                      type="text"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      placeholder="New York, NY"
                      className="input-glass"
                      data-testid="project-location-input"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddProject}
                    className="btn-glass w-full"
                    data-testid="create-project-btn"
                  >
                    Create Project
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default ProjectsPage;
