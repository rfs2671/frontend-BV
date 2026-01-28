import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download,
  FileText,
  Check,
  Server,
  Key,
  Plus,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';

const ReportsPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReportGenerated(true);
    }, 2000);
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
            <p className="text-label mb-3">Daily Field</p>
            <h1 
              className="text-5xl md:text-6xl font-extralight text-white tracking-tight"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
            >
              Reports
            </h1>
          </motion.div>

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
              {[
                { label: 'Database', value: 'MongoDB Atlas' },
                { label: 'Admin', value: 'Active' },
                { label: 'Projects', value: '3', large: true },
                { label: 'Workers', value: '24', large: true },
              ].map((item, index) => (
                <div key={item.label} className="stat-card p-5">
                  <div className="text-label mb-2">{item.label}</div>
                  {item.large ? (
                    <div className="text-3xl font-extralight text-white/90">{item.value}</div>
                  ) : (
                    <div className="text-white/60 text-sm">{item.value}</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sample Report */}
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
              Sample Daily Report
            </h2>
            <p className="text-white/40 mb-10 max-w-md mx-auto">
              Generate a professional PDF report with sample data
            </p>
            
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
              disabled={loading}
              className="btn-glass inline-flex items-center gap-3"
              data-testid="generate-report-btn"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Download className="w-5 h-5" strokeWidth={1.5} />
              )}
              <span>{loading ? 'Generating...' : 'Download Sample Report'}</span>
            </motion.button>
            
            {reportGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 mt-6 text-white/50"
              >
                <Check className="w-5 h-5" strokeWidth={1.5} />
                <span>Report generated</span>
              </motion.div>
            )}
          </motion.div>

          {/* Create Sample Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="stat-card p-6 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="icon-pod">
                  <Plus className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white/80 font-medium">Create Sample Data</h3>
                  <p className="text-white/40 text-sm">Populate with test projects and workers</p>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-glass">
                Generate
              </motion.button>
            </div>
          </motion.div>

          {/* Admin Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="stat-card p-6"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="icon-pod">
                <Key className="w-5 h-5 text-white/60" strokeWidth={1.5} />
              </div>
              <h3 className="text-white/80 font-medium">Admin Credentials</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                <span className="text-white/40 text-sm w-20">Email</span>
                <span className="text-white/60 font-mono text-sm">admin@blueview.com</span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                <span className="text-white/40 text-sm w-20">Password</span>
                <span className="text-white/60 font-mono text-sm">BlueviewAdmin123</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default ReportsPage;
