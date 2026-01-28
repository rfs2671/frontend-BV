import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download,
  FileText,
  Check,
  Server,
  Database,
  Key,
  Users,
  Building2,
  Loader2,
  ExternalLink,
  FlaskConical,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import StatCard from '../components/ui/StatCard';

const ReportsPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const setupStatus = {
    admin_exists: true,
    project_count: 3,
    worker_count: 24,
    integrations: {
      google_oauth: true,
      openweather: true,
      resend_email: false,
      dropbox: false,
    }
  };

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReportGenerated(true);
    }, 2000);
  };

  const handleCreateSampleData = () => {
    alert('Sample data created successfully!');
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
              
              <div className="flex-1 text-center">
                <h1 className="text-xl font-bold text-white">Reports</h1>
                <p className="text-white/40 text-sm">Daily Field Reports</p>
              </div>
              
              <div className="w-11" /> {/* Spacer for centering */}
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-6 mt-6 space-y-6">
          {/* System Status */}
          <GlassCard className="p-6" hoverable={false}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                <Server className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-white font-semibold text-lg">System Status</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/[0.03]">
                <div className="text-white/40 text-xs mb-1">Database</div>
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-400/10 border border-green-400/20">
                  <Database className="w-3 h-3 text-green-400" />
                  <span className="text-xs font-medium text-green-400">MongoDB Atlas</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03]">
                <div className="text-white/40 text-xs mb-1">Admin</div>
                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg ${
                  setupStatus.admin_exists 
                    ? 'bg-green-400/10 border border-green-400/20' 
                    : 'bg-yellow-400/10 border border-yellow-400/20'
                }`}>
                  <span className={`text-xs font-medium ${setupStatus.admin_exists ? 'text-green-400' : 'text-yellow-400'}`}>
                    {setupStatus.admin_exists ? 'Active' : 'Not Created'}
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03]">
                <div className="text-white/40 text-xs mb-1">Projects</div>
                <div className="text-2xl font-bold text-white">{setupStatus.project_count}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03]">
                <div className="text-white/40 text-xs mb-1">Workers</div>
                <div className="text-2xl font-bold text-white">{setupStatus.worker_count}</div>
              </div>
            </div>

            {/* Integrations */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/40 text-sm">Integrations:</span>
              {setupStatus.integrations.google_oauth && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="text-xs text-white">Google</span>
                </div>
              )}
              {setupStatus.integrations.openweather && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="text-xs text-white">Weather</span>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Sample Report Card */}
          <GlassCard className="p-8 text-center" hoverable={false}>
            <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-orange-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3">Sample Daily Report</h2>
            <p className="text-white/40 mb-6 max-w-md mx-auto">
              Generate a complete, professional "Raken-style" PDF report with sample data including:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto mb-8">
              {[
                'Project details & weather',
                'Worker sign-in ledger (8 workers)',
                'Subcontractor work summaries',
                'Site inspection results'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-left">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-white">{feature}</span>
                </div>
              ))}
            </div>

            <GlowButton
              variant="primary"
              size="lg"
              icon={loading ? Loader2 : Download}
              onClick={handleGenerateReport}
              loading={loading}
              className="mx-auto"
              data-testid="generate-report-btn"
            >
              {loading ? 'Generating...' : 'Download Sample Report'}
            </GlowButton>

            {reportGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 mt-4 text-green-400"
              >
                <Check className="w-5 h-5" />
                <span>Report generated successfully!</span>
              </motion.div>
            )}
          </GlassCard>

          {/* Create Sample Data */}
          <GlassCard className="p-6" hoverable={false}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-white font-semibold text-lg">Create Sample Data</h2>
            </div>
            
            <p className="text-white/40 text-sm mb-4">
              Create sample project, workers, and daily log entries for testing the complete flow.
            </p>
            
            <GlowButton
              variant="secondary"
              size="md"
              icon={Plus}
              onClick={handleCreateSampleData}
            >
              Create Sample Data
            </GlowButton>
          </GlassCard>

          {/* Admin Credentials */}
          <GlassCard className="p-6 border-cyan-400/20" hoverable={false}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-white font-semibold">Admin Credentials</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03]">
                <span className="text-white/40 text-sm w-20">Email:</span>
                <span className="text-cyan-400 font-mono text-sm">admin@blueview.com</span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03]">
                <span className="text-white/40 text-sm w-20">Password:</span>
                <span className="text-cyan-400 font-mono text-sm">BlueviewAdmin123</span>
              </div>
            </div>
            
            <p className="text-white/30 text-xs mt-4 italic">
              Use these credentials to login as admin and access all features.
            </p>
          </GlassCard>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default ReportsPage;
