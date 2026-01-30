import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Download,
  FileText,
  Check,
  Server,
  Building2,
  Users,
  ChevronDown,
  LogOut,
} from 'lucide-react-native';
import AnimatedBackground from '../src/components/AnimatedBackground';
import { GlassCard, StatCard, IconPod } from '../src/components/GlassCard';
import GlassButton from '../src/components/GlassButton';
import { GlassSkeleton } from '../src/components/GlassSkeleton';
import FloatingNav from '../src/components/FloatingNav';
import { useToast } from '../src/components/Toast';
import { useAuth } from '../src/context/AuthContext';
import { projectsAPI, workersAPI, dailyLogsAPI } from '../src/utils/api';
import { colors, spacing, borderRadius, typography } from '../src/styles/theme';

export default function ReportsScreen() {
  const router = useRouter();
  const { logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [stats, setStats] = useState({ projects: 0, workers: 0 });
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [dailyLogs, setDailyLogs] = useState([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, authLoading]);

  // Fetch data
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

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
      const recentLog = dailyLogs[0];
      const logId = recentLog._id || recentLog.id;

      await dailyLogsAPI.getPdf(logId);
      toast.success('Downloaded', 'Report generated successfully');
    } catch (error) {
      console.error('Failed to generate report:', error);
      toast.error('Generate Error', error.response?.data?.detail || 'Could not generate report');
    } finally {
      setGenerating(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const getProjectId = (project) => project?._id || project?.id;

  const reportFeatures = [
    'Project details',
    'Worker sign-in log',
    'Subcontractor work',
    'Site inspection',
  ];

  return (
    <AnimatedBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <GlassButton
              variant="icon"
              icon={<ArrowLeft size={20} strokeWidth={1.5} color={colors.text.primary} />}
              onPress={() => router.push('/')}
            />
            <Text style={styles.logoText}>BLUEVIEW</Text>
          </View>
          <GlassButton
            variant="icon"
            icon={<LogOut size={20} strokeWidth={1.5} color={colors.text.primary} />}
            onPress={handleLogout}
          />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <View style={styles.titleSection}>
            <Text style={styles.titleLabel}>DAILY FIELD</Text>
            <Text style={styles.titleText}>Reports</Text>
          </View>

          {loading ? (
            <>
              <GlassSkeleton width="100%" height={180} borderRadiusValue={borderRadius.xxl} style={styles.mb16} />
              <GlassSkeleton width="100%" height={280} borderRadiusValue={borderRadius.xxl} />
            </>
          ) : (
            <>
              {/* System Status */}
              <GlassCard style={styles.statusCard}>
                <View style={styles.statusHeader}>
                  <IconPod size={44}>
                    <Server size={18} strokeWidth={1.5} color={colors.text.secondary} />
                  </IconPod>
                  <Text style={styles.statusTitle}>System Status</Text>
                </View>

                <View style={styles.statusGrid}>
                  <StatCard style={styles.statusItem}>
                    <Text style={styles.statusLabel}>DATABASE</Text>
                    <Text style={styles.statusValue}>MongoDB Atlas</Text>
                  </StatCard>
                  <StatCard style={styles.statusItem}>
                    <Text style={styles.statusLabel}>STATUS</Text>
                    <View style={styles.statusIndicator}>
                      <View style={styles.statusDot} />
                      <Text style={styles.statusConnected}>Connected</Text>
                    </View>
                  </StatCard>
                  <StatCard style={styles.statusItem}>
                    <Text style={styles.statusLabel}>PROJECTS</Text>
                    <Text style={styles.statusNumber}>{stats.projects}</Text>
                  </StatCard>
                  <StatCard style={styles.statusItem}>
                    <Text style={styles.statusLabel}>WORKERS</Text>
                    <Text style={styles.statusNumber}>{stats.workers}</Text>
                  </StatCard>
                </View>
              </GlassCard>

              {/* Project Selector */}
              <Pressable
                style={styles.selectorCard}
                onPress={() => setShowProjectPicker(!showProjectPicker)}
              >
                <View style={styles.selectorContent}>
                  <IconPod size={44}>
                    <Building2 size={18} strokeWidth={1.5} color={colors.text.secondary} />
                  </IconPod>
                  <View>
                    <Text style={styles.selectorLabel}>SELECT PROJECT</Text>
                    <Text style={styles.selectorText}>
                      {selectedProject?.name || 'Choose a project'}
                    </Text>
                  </View>
                </View>
                <ChevronDown
                  size={20}
                  strokeWidth={1.5}
                  color={colors.text.muted}
                  style={showProjectPicker && styles.iconRotated}
                />
              </Pressable>

              {showProjectPicker && (
                <View style={styles.dropdown}>
                  {projects.map((p) => (
                    <Pressable
                      key={getProjectId(p)}
                      onPress={() => handleProjectChange(p)}
                      style={[
                        styles.dropdownItem,
                        getProjectId(selectedProject) === getProjectId(p) && styles.dropdownItemActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          getProjectId(selectedProject) === getProjectId(p) && styles.dropdownTextActive,
                        ]}
                      >
                        {p.name}
                      </Text>
                    </Pressable>
                  ))}
                  {projects.length === 0 && (
                    <Text style={styles.emptyDropdown}>No projects available</Text>
                  )}
                </View>
              )}

              {/* Report Generator */}
              <GlassCard style={styles.generatorCard}>
                <IconPod size={80} style={styles.generatorIcon}>
                  <FileText size={32} strokeWidth={1.5} color={colors.text.secondary} />
                </IconPod>

                <Text style={styles.generatorTitle}>Generate Report</Text>
                <Text style={styles.generatorSubtitle}>
                  {selectedProject
                    ? `Generate a PDF report for ${selectedProject.name}`
                    : 'Select a project to generate its report'}
                </Text>

                {selectedProject && (
                  <View style={styles.logsCount}>
                    <FileText size={14} strokeWidth={1.5} color={colors.text.muted} />
                    <Text style={styles.logsCountText}>
                      {dailyLogs.length} daily log{dailyLogs.length !== 1 ? 's' : ''} available
                    </Text>
                  </View>
                )}

                <View style={styles.featuresGrid}>
                  {reportFeatures.map((feature) => (
                    <View key={feature} style={styles.featureItem}>
                      <Check size={14} strokeWidth={1.5} color={colors.text.muted} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <GlassButton
                  title={generating ? 'Generating...' : 'Download Report'}
                  icon={<Download size={20} strokeWidth={1.5} color={colors.text.primary} />}
                  onPress={handleGenerateReport}
                  loading={generating}
                  disabled={!selectedProject || dailyLogs.length === 0}
                  style={styles.downloadButton}
                />
              </GlassCard>

              {/* Daily Logs List */}
              {dailyLogs.length > 0 && (
                <View style={styles.logsSection}>
                  <View style={styles.logsHeader}>
                    <IconPod size={44}>
                      <FileText size={18} strokeWidth={1.5} color={colors.text.secondary} />
                    </IconPod>
                    <Text style={styles.logsTitle}>Recent Daily Logs</Text>
                  </View>

                  {dailyLogs.slice(0, 5).map((log, index) => (
                    <View key={log._id || log.id || index} style={styles.logItem}>
                      <Text style={styles.logDate}>
                        {new Date(log.date || log.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Text>
                      <Text style={styles.logDivider}>•</Text>
                      <Text style={styles.logWeather}>{log.weather || 'No weather'}</Text>
                      <View
                        style={[
                          styles.logStatus,
                          log.status === 'submitted' && styles.logStatusSubmitted,
                        ]}
                      >
                        <Text
                          style={[
                            styles.logStatusText,
                            log.status === 'submitted' && styles.logStatusTextSubmitted,
                          ]}
                        >
                          {log.status || 'draft'}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}
        </ScrollView>

        <FloatingNav />
      </SafeAreaView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  logoText: {
    ...typography.label,
    color: colors.text.muted,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
  titleSection: {
    marginBottom: spacing.xl,
  },
  titleLabel: {
    ...typography.label,
    color: colors.text.muted,
    marginBottom: spacing.sm,
  },
  titleText: {
    fontSize: 48,
    fontWeight: '200',
    color: colors.text.primary,
    letterSpacing: -1,
  },
  mb16: {
    marginBottom: spacing.md,
  },
  statusCard: {
    marginBottom: spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text.primary,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statusItem: {
    width: '48%',
    padding: spacing.md,
  },
  statusLabel: {
    ...typography.label,
    color: colors.text.muted,
    marginBottom: spacing.xs,
  },
  statusValue: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ade80',
  },
  statusConnected: {
    fontSize: 14,
    color: '#4ade80',
  },
  statusNumber: {
    fontSize: 28,
    fontWeight: '200',
    color: colors.text.primary,
  },
  selectorCard: {
    backgroundColor: colors.glass.background,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.glass.border,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  selectorLabel: {
    ...typography.label,
    color: colors.text.muted,
    marginBottom: 2,
  },
  selectorText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
  iconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  dropdown: {
    backgroundColor: colors.glass.background,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.glass.border,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: spacing.md,
  },
  dropdownItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownText: {
    fontSize: 15,
    color: colors.text.muted,
  },
  dropdownTextActive: {
    color: colors.text.primary,
  },
  emptyDropdown: {
    padding: spacing.md,
    textAlign: 'center',
    color: colors.text.muted,
  },
  generatorCard: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    marginBottom: spacing.md,
  },
  generatorIcon: {
    marginBottom: spacing.lg,
  },
  generatorTitle: {
    fontSize: 28,
    fontWeight: '200',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  generatorSubtitle: {
    fontSize: 15,
    color: colors.text.muted,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: spacing.lg,
  },
  logsCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.glass.background,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.glass.border,
    marginBottom: spacing.lg,
  },
  logsCountText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    width: '45%',
  },
  featureText: {
    fontSize: 13,
    color: colors.text.muted,
  },
  downloadButton: {
    paddingHorizontal: spacing.xl,
  },
  logsSection: {
    backgroundColor: colors.glass.background,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.glass.border,
    padding: spacing.lg,
  },
  logsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  logsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.glass.background,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
  },
  logDate: {
    fontSize: 13,
    color: colors.text.muted,
  },
  logDivider: {
    marginHorizontal: spacing.sm,
    color: colors.text.subtle,
  },
  logWeather: {
    flex: 1,
    fontSize: 13,
    color: colors.text.secondary,
  },
  logStatus: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    borderRadius: borderRadius.sm,
  },
  logStatusSubmitted: {
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
  },
  logStatusText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#fbbf24',
  },
  logStatusTextSubmitted: {
    color: '#4ade80',
  },
});
