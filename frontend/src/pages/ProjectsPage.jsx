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
    { id: '1', name: 'Downtown Tower Phase 2', location: 'New York, NY', address: '123 Main Street', qr_code: 'DT-001', nfc_tags: [{ tag_id: 'ABC123' }] },
    { id: '2', name: 'Harbor Bridge Renovation', location: 'Brooklyn, NY', address: '456 Harbor Road', qr_code: 'HB-002', nfc_tags: [] },
    { id: '3', name: 'Metro Station Expansion', location: 'Manhattan, NY', address: '789 Transit Ave', qr_code: 'MS-003', nfc_tags: [{ tag_id: 'DEF456' }, { tag_id: 'GHI789' }] },
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
                <h1 className="text-lg font-medium text-white">Projects</h1>
                <p className="text-white/30 text-xs">{projects.length} Sites</p>
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
        <div className="max-w-6xl mx-auto px-6 mt-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/[0.15] transition-all"
              data-testid="search-projects-input"
            />
          </div>
        </div>

        {/* Projects List */}
        <div className="max-w-6xl mx-auto px-6 mt-6">
          <div className="space-y-3">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <GlassCard 
                    className="p-5"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white/90 font-medium">{project.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-white/30 text-sm">
                          <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                          {project.location}
                        </div>
                        
                        {/* NFC Badge */}
                        {project.nfc_tags?.length > 0 && (
                          <div className="inline-flex items-center gap-1.5 mt-3 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                            <Wifi className="w-3 h-3 text-white/40" strokeWidth={1.5} />
                            <span className="text-[10px] font-medium text-white/40">{project.nfc_tags.length} NFC</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                          <span className="text-[10px] font-mono font-medium text-white/50 tracking-wider">
                            {project.qr_code}
                          </span>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                          className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all"
                          data-testid={`delete-project-${project.id}`}
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
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
                <Building2 className="w-12 h-12 text-white/10 mx-auto mb-4" strokeWidth={1} />
                <h3 className="text-white/50 font-medium">No Projects Found</h3>
                <p className="text-white/25 text-sm mt-2">
                  {searchQuery ? 'Try a different search term' : 'Create your first project'}
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
              className="fixed bottom-0 left-0 right-0 z-50 p-6 pb-10"
            >
              <div className="max-w-lg mx-auto bg-[#0c0c18] border border-white/[0.08] rounded-2xl p-6" data-testid="add-project-modal">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-white">New Project</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-white/40 tracking-wider uppercase mb-2 block">Project Name</label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      placeholder="Downtown Tower Phase 2"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/[0.15] transition-all"
                      data-testid="project-name-input"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-white/40 tracking-wider uppercase mb-2 block">Location</label>
                    <input
                      type="text"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      placeholder="New York, NY"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/[0.15] transition-all"
                      data-testid="project-location-input"
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
