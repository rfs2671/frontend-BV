import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download,
  FileText,
  Check,
  Server,
  Key,
  Loader2,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import FloatingNav from '../components/ui/FloatingNav';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';

const ReportsPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const setupStatus = {
    admin_exists: true,
    project_count: 3,
    worker_count: 24,
  };

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReportGenerated(true);
    }, 2000);
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
              
              <div className="flex-1 text-center">
                <h1 className="text-lg font-medium text-white">Reports</h1>
                <p className="text-white/30 text-xs">Daily Field Reports</p>
              </div>
              
              <div className="w-10" />
            </div>
          </div>
        </motion.header>

        <div className="max-w-6xl mx-auto px-6 mt-6 space-y-6">
          {/* System Status */}
          <GlassCard className="p-6" hoverable={false}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                <Server className="w-4 h-4 text-white/50" strokeWidth={1.5} />
              </div>
              <h2 className="text-white/80 font-medium">System Status</h2>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-white/30 text-[10px] tracking-wider uppercase mb-2">Database</div>
                <div className="text-xs text-white/60">MongoDB Atlas</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-white/30 text-[10px] tracking-wider uppercase mb-2">Admin</div>
                <div className="text-xs text-white/60">{setupStatus.admin_exists ? 'Active' : 'Not Created'}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-white/30 text-[10px] tracking-wider uppercase mb-2">Projects</div>
                <div className="text-2xl font-extralight text-white">{setupStatus.project_count}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-white/30 text-[10px] tracking-wider uppercase mb-2">Workers</div>
                <div className="text-2xl font-extralight text-white">{setupStatus.worker_count}</div>
              </div>
            </div>
          </GlassCard>

          {/* Sample Report Card */}
          <GlassCard className="p-10 text-center" hoverable={false}>
            <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mx-auto mb-6">
              <FileText className="w-7 h-7 text-white/50" strokeWidth={1.5} />
            </div>
            
            <h2 className="text-xl font-light text-white mb-2">Sample Daily Report</h2>
            <p className="text-white/30 text-sm mb-8 max-w-md mx-auto">
              Generate a complete professional PDF report with sample data
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-8">
              {[
                'Project details & weather',
                'Worker sign-in ledger',
                'Subcontractor summaries',
                'Site inspection results'
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-left">
                  <Check className="w-3 h-3 text-white/40 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-xs text-white/50">{feature}</span>
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
                className="flex items-center justify-center gap-2 mt-4 text-white/50 text-sm"
              >
                <Check className="w-4 h-4" strokeWidth={1.5} />
                <span>Report generated</span>
              </motion.div>
            )}
          </GlassCard>

          {/* Create Sample Data */}
          <GlassCard className="p-6" hoverable={false}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white/50" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-white/80 font-medium text-sm">Create Sample Data</h2>
                  <p className="text-white/30 text-xs">Populate with test projects and workers</p>
                </div>
              </div>
              <GlowButton variant="secondary" size="md">
                Generate
              </GlowButton>
            </div>
          </GlassCard>

          {/* Admin Credentials */}
          <GlassCard className="p-6" hoverable={false}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                <Key className="w-4 h-4 text-white/50" strokeWidth={1.5} />
              </div>
              <h2 className="text-white/80 font-medium">Admin Credentials</h2>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02]">
                <span className="text-white/30 text-xs w-16">Email</span>
                <span className="text-white/60 font-mono text-xs">admin@blueview.com</span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02]">
                <span className="text-white/30 text-xs w-16">Password</span>
                <span className="text-white/60 font-mono text-xs">BlueviewAdmin123</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <FloatingNav user={user} onLogout={onLogout} />
    </div>
  );
};

export default ReportsPage;
