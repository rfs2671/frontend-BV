import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { BlurView } from 'expo-blur';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  ClipboardList,
  FileText,
} from 'lucide-react-native';
import { colors, borderRadius, spacing } from '../styles/theme';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/projects', icon: FolderKanban, label: 'Projects' },
  { path: '/workers', icon: Users, label: 'Workers' },
  { path: '/daily-log', icon: ClipboardList, label: 'Daily Log' },
  { path: '/reports', icon: FileText, label: 'Reports' },
];

/**
 * FloatingNav - Bottom navigation with glassmorphism
 */
const FloatingNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <BlurView intensity={40} tint="dark" style={styles.blur}>
        <View style={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Pressable
                key={item.path}
                onPress={() => router.push(item.path)}
                style={({ pressed }) => [
                  styles.navItem,
                  isActive && styles.navItemActive,
                  pressed && styles.navItemPressed,
                ]}
              >
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  color={isActive ? colors.text.primary : colors.text.muted}
                />
                <Text
                  style={[
                    styles.navLabel,
                    isActive && styles.navLabelActive,
                  ]}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </BlurView>
      <View style={styles.border} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: [{ translateX: -200 }],
    width: 400,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  blur: {
    borderRadius: borderRadius.full,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    gap: 2,
    backgroundColor: colors.glass.background,
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.glass.border,
    pointerEvents: 'none',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  navItemPressed: {
    opacity: 0.7,
  },
  navLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text.muted,
  },
  navLabelActive: {
    color: colors.text.primary,
  },
});

export default FloatingNav;
