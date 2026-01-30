import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  Check,
  X,
  Send,
  Building2,
  LogOut,
} from 'lucide-react-native';
import AnimatedBackground from '../src/components/AnimatedBackground';
import { GlassCard, StatCard, IconPod } from '../src/components/GlassCard';
import GlassButton from '../src/components/GlassButton';
import GlassInput from '../src/components/GlassInput';
import { GlassSkeleton } from '../src/components/GlassSkeleton';
import FloatingNav from '../src/components/FloatingNav';
import { useToast } from '../src/components/Toast';
import { useAuth } from '../src/context/AuthContext';
import { projectsAPI, dailyLogsAPI } from '../src/utils/api';
import { colors, spacing, borderRadius, typography } from '../src/styles/theme';

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

export default function DailyLogScreen() {
  const router = useRouter();
  const { logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [showWeatherPicker, setShowWeatherPicker] = useState(false);
  const [weather, setWeather] = useState('Sunny');
  const [expandedCard, setExpandedCard] = useState(null);
  const [notes, setNotes] = useState('');
  const [subcontractorCards, setSubcontractorCards] = useState([
    {
      company_name: 'Subcontractor 1',
      worker_count: 0,
      work_description: '',
      inspection: { cleanliness: 'pass', safety: 'pass' },
    },
  ]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const WeatherIcon = weatherOptions.find((w) => w.label === weather)?.icon || Sun;

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, authLoading]);

  // Fetch projects
  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectsAPI.getAll();
      const projectList = Array.isArray(data) ? data : [];
      setProjects(projectList);

      if (projectList.length > 0) {
        setSelectedProject(projectList[0]);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Load Error', 'Could not load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleProjectChange = (project) => {
    setSelectedProject(project);
    setShowProjectPicker(false);
  };

  const toggleInspection = (cardIndex, field) => {
    const updated = [...subcontractorCards];
    updated[cardIndex].inspection[field] =
      updated[cardIndex].inspection[field] === 'pass' ? 'fail' : 'pass';
    setSubcontractorCards(updated);
  };

  const addSubcontractorCard = () => {
    setSubcontractorCards([
      ...subcontractorCards,
      {
        company_name: `Subcontractor ${subcontractorCards.length + 1}`,
        worker_count: 0,
        work_description: '',
        inspection: { cleanliness: 'pass', safety: 'pass' },
      },
    ]);
  };

  const updateSubcontractorCard = (index, field, value) => {
    const updated = [...subcontractorCards];
    updated[index][field] = value;
    setSubcontractorCards(updated);
  };

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
      toast.error('Save Error', error.response?.data?.detail || 'Could not save daily log');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const getProjectId = (project) => project?._id || project?.id;

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
            <Text style={styles.titleLabel}>SUPER</Text>
            <Text style={styles.titleText}>Daily Log</Text>
            <Text style={styles.dateText}>{today}</Text>
          </View>

          {loading ? (
            <>
              <GlassSkeleton width="100%" height={70} style={styles.mb16} />
              <GlassSkeleton width="100%" height={90} style={styles.mb16} />
              <GlassSkeleton width="100%" height={150} />
            </>
          ) : (
            <>
              {/* Project Selector */}
              <Pressable
                style={styles.selectorCard}
                onPress={() => setShowProjectPicker(!showProjectPicker)}
              >
                <View style={styles.selectorContent}>
                  <IconPod size={44}>
                    <Building2 size={18} strokeWidth={1.5} color={colors.text.secondary} />
                  </IconPod>
                  <Text style={styles.selectorText}>
                    {selectedProject?.name || 'Select Project'}
                  </Text>
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
                </View>
              )}

              {/* Weather Selector */}
              <Pressable
                style={styles.selectorCard}
                onPress={() => setShowWeatherPicker(!showWeatherPicker)}
              >
                <View style={styles.selectorContent}>
                  <IconPod size={44}>
                    <WeatherIcon size={18} strokeWidth={1.5} color={colors.text.secondary} />
                  </IconPod>
                  <View>
                    <Text style={styles.selectorLabel}>WEATHER</Text>
                    <Text style={styles.selectorText}>{weather}</Text>
                  </View>
                </View>
                <ChevronDown
                  size={20}
                  strokeWidth={1.5}
                  color={colors.text.muted}
                  style={showWeatherPicker && styles.iconRotated}
                />
              </Pressable>

              {showWeatherPicker && (
                <View style={styles.weatherGrid}>
                  {weatherOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <Pressable
                        key={opt.label}
                        onPress={() => {
                          setWeather(opt.label);
                          setShowWeatherPicker(false);
                        }}
                        style={[
                          styles.weatherItem,
                          weather === opt.label && styles.weatherItemActive,
                        ]}
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          color={weather === opt.label ? colors.text.primary : colors.text.muted}
                        />
                        <Text
                          style={[
                            styles.weatherLabel,
                            weather === opt.label && styles.weatherLabelActive,
                          ]}
                        >
                          {opt.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}

              {/* Subcontractor Cards */}
              <View style={styles.subcontractorSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionLabel}>SUBCONTRACTOR CARDS</Text>
                  <GlassButton
                    title="Add"
                    icon={<Plus size={16} strokeWidth={1.5} color={colors.text.primary} />}
                    onPress={addSubcontractorCard}
                    style={styles.addButton}
                  />
                </View>

                {subcontractorCards.map((card, index) => (
                  <View key={index} style={styles.subcontractorCard}>
                    <Pressable
                      style={styles.subcontractorHeader}
                      onPress={() => setExpandedCard(expandedCard === index ? null : index)}
                    >
                      <View style={styles.subcontractorAvatar}>
                        <Text style={styles.avatarText}>{card.company_name.charAt(0)}</Text>
                      </View>
                      <View style={styles.subcontractorInfo}>
                        <GlassInput
                          value={card.company_name}
                          onChangeText={(text) => updateSubcontractorCard(index, 'company_name', text)}
                          placeholder="Company Name"
                          style={styles.companyInput}
                          inputStyle={styles.companyInputText}
                        />
                        <View style={styles.workerCountRow}>
                          <GlassInput
                            value={String(card.worker_count)}
                            onChangeText={(text) =>
                              updateSubcontractorCard(index, 'worker_count', parseInt(text) || 0)
                            }
                            keyboardType="numeric"
                            style={styles.workerCountInput}
                            inputStyle={styles.workerCountInputText}
                          />
                          <Text style={styles.workersLabel}>workers</Text>
                        </View>
                      </View>
                      {expandedCard === index ? (
                        <ChevronUp size={20} strokeWidth={1.5} color={colors.text.muted} />
                      ) : (
                        <ChevronDown size={20} strokeWidth={1.5} color={colors.text.muted} />
                      )}
                    </Pressable>

                    {expandedCard === index && (
                      <View style={styles.subcontractorExpanded}>
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>WORK PERFORMED</Text>
                          <GlassInput
                            value={card.work_description}
                            onChangeText={(text) =>
                              updateSubcontractorCard(index, 'work_description', text)
                            }
                            placeholder="Describe work performed..."
                            multiline
                            numberOfLines={3}
                          />
                        </View>

                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>INSPECTION</Text>
                          <View style={styles.inspectionRow}>
                            <Pressable
                              style={[
                                styles.inspectionBtn,
                                card.inspection.cleanliness === 'pass' && styles.inspectionBtnActive,
                              ]}
                              onPress={() => toggleInspection(index, 'cleanliness')}
                            >
                              {card.inspection.cleanliness === 'pass' ? (
                                <Check size={16} strokeWidth={1.5} color={colors.text.primary} />
                              ) : (
                                <X size={16} strokeWidth={1.5} color={colors.text.muted} />
                              )}
                              <Text
                                style={[
                                  styles.inspectionText,
                                  card.inspection.cleanliness === 'pass' && styles.inspectionTextActive,
                                ]}
                              >
                                Cleanliness
                              </Text>
                            </Pressable>
                            <Pressable
                              style={[
                                styles.inspectionBtn,
                                card.inspection.safety === 'pass' && styles.inspectionBtnActive,
                              ]}
                              onPress={() => toggleInspection(index, 'safety')}
                            >
                              {card.inspection.safety === 'pass' ? (
                                <Check size={16} strokeWidth={1.5} color={colors.text.primary} />
                              ) : (
                                <X size={16} strokeWidth={1.5} color={colors.text.muted} />
                              )}
                              <Text
                                style={[
                                  styles.inspectionText,
                                  card.inspection.safety === 'pass' && styles.inspectionTextActive,
                                ]}
                              >
                                Safety
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </View>

              {/* Notes */}
              <View style={styles.notesSection}>
                <Text style={styles.sectionLabel}>ADDITIONAL NOTES</Text>
                <GlassInput
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Any additional notes..."
                  multiline
                  numberOfLines={4}
                />
              </View>

              {/* Submit */}
              <GlassButton
                title="Submit Daily Log"
                icon={<Send size={20} strokeWidth={1.5} color={colors.text.primary} />}
                onPress={handleSave}
                loading={saving}
                disabled={!selectedProject}
                style={styles.submitButton}
              />
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
    marginBottom: spacing.xs,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.text.muted,
  },
  mb16: {
    marginBottom: spacing.md,
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
  weatherGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  weatherItem: {
    width: '23%',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.glass.background,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.glass.border,
    gap: spacing.xs,
  },
  weatherItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  weatherLabel: {
    fontSize: 11,
    color: colors.text.muted,
  },
  weatherLabelActive: {
    color: colors.text.primary,
  },
  subcontractorSection: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.text.muted,
  },
  addButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  subcontractorCard: {
    backgroundColor: colors.glass.background,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.glass.border,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  subcontractorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  subcontractorAvatar: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.glass.background,
    borderWidth: 1,
    borderColor: colors.glass.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  subcontractorInfo: {
    flex: 1,
  },
  companyInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginBottom: spacing.xs,
  },
  companyInputText: {
    fontSize: 16,
    fontWeight: '500',
    padding: 0,
  },
  workerCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  workerCountInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: 40,
    padding: 0,
  },
  workerCountInputText: {
    fontSize: 14,
    color: colors.text.muted,
    padding: 0,
  },
  workersLabel: {
    fontSize: 14,
    color: colors.text.muted,
  },
  subcontractorExpanded: {
    padding: spacing.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.glass.border,
  },
  inputGroup: {
    marginTop: spacing.md,
  },
  inputLabel: {
    ...typography.label,
    color: colors.text.muted,
    marginBottom: spacing.sm,
  },
  inspectionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  inspectionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: spacing.md,
    backgroundColor: colors.glass.background,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  inspectionBtnActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  inspectionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.muted,
  },
  inspectionTextActive: {
    color: colors.text.primary,
  },
  notesSection: {
    marginBottom: spacing.lg,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
});
