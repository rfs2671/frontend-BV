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
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';

const ProjectsPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [projects, setProjects] = useState([
    { id: '1', name: 'Downtown Tower Phase 2', location: 'New York, NY', address: '123 Main Street', qr_code: 'DT-001', nfc_tags: [{ tag_id: 'ABC123', location_description: 'Main Entrance' }] },
    { id: '2', name: 'Harbor Bridge Renovation', location: 'Brooklyn, NY', address: '456 Harbor Road', qr_code: 'HB-002', nfc_tags: [] },
    { id: '3', name: 'Metro Station Expansion', location: 'Manhattan, NY', address: '789 Transit Ave', qr_code: 'MS-003', nfc_tags: [{ tag_id: 'DEF456', location_description: 'Gate A' }, { tag_id: 'GHI789', location_description: 'Gate B' }] },
  ]);
  const [newProject, setNewProject] = useState({ name: '', location: '', address: '' });

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
    setNewProject({ name: '', location: '', address: '' });
    setShowAddModal(false);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
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
                <h1 className="text-xl font-bold text-white">Projects</h1>
                <p className="text-white/40 text-sm">{projects.length} Sites</p>
              </div>
              
              <GlowButton
                variant="primary"
                size="md"
                icon={Plus}
                onClick={() => setShowAddModal(true)}
                data-testid="add-project-btn"
              >
                New Project
              </GlowButton>
            </div>
          </div>
        </motion.header>

        {/* Search */}
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-all"
              data-testid="search-projects-input"
            />
          </div>
        </div>

        {/* Projects List */}
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="space-y-4">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlassCard 
                    className="p-5"
                    glowColor="cyan"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-7 h-7 text-orange-500" />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg">{project.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-cyan-400 text-sm">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                        {project.address && (
                          <p className="text-white/40 text-sm mt-1">{project.address}</p>
                        )}
                        
                        {/* NFC Badge */}
                        {project.nfc_tags?.length > 0 && (
                          <div className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full bg-green-400/10 border border-green-400/20">
                            <Wifi className="w-3 h-3 text-green-400" />
                            <span className="text-xs font-medium text-green-400">{project.nfc_tags.length} NFC</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/20">
                          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                            {project.qr_code}
                          </span>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                          className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                          data-testid={`delete-project-${project.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Building2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium">No Projects Found</h3>
                <p className="text-white/40 text-sm mt-2">
                  {searchQuery ? 'Try a different search term' : 'Create your first project to get started'}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-50 p-6 pb-10"
            >
              <div className="max-w-lg mx-auto bg-[#0a0a0f] border border-white/10 rounded-3xl p-6" data-testid="add-project-modal">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">New Project</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2 block">Project Name *</label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      placeholder="Downtown Tower Phase 2"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-all"
                      data-testid="project-name-input"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2 block">Location *</label>
                    <input
                      type="text"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      placeholder="New York, NY"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-all"
                      data-testid="project-location-input"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2 block">Address (Optional)</label>
                    <input
                      type="text"
                      value={newProject.address}
                      onChange={(e) => setNewProject({ ...newProject, address: e.target.value })}
                      placeholder="123 Main Street"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-all"
                    />
                  </div>
                  
                  <GlowButton
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={Plus}
                    onClick={handleAddProject}
                    data-testid="create-project-btn"
                  >
                    Create Project
                  </GlowButton>
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
