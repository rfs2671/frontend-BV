import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, borderRadius, spacing } from '../styles/theme';

/**
 * GlassCard - Glassmorphism card component
 */
export const GlassCard = ({ children, style, onPress, intensity = 20 }) => {
  const CardWrapper = onPress ? Pressable : View;
  
  return (
    <CardWrapper
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        style,
        pressed && onPress && styles.pressed,
      ]}
    >
      <BlurView intensity={intensity} tint="dark" style={styles.blur}>
        <View style={styles.content}>{children}</View>
      </BlurView>
      <View style={styles.border} />
    </CardWrapper>
  );
};

/**
 * StatCard - Statistics card with glass effect
 */
export const StatCard = ({ children, style, onPress }) => {
  const CardWrapper = onPress ? Pressable : View;
  
  return (
    <CardWrapper
      onPress={onPress}
      style={({ pressed }) => [
        styles.statContainer,
        style,
        pressed && onPress && styles.pressed,
      ]}
    >
      <View style={styles.statContent}>{children}</View>
    </CardWrapper>
  );
};

/**
 * IconPod - Circular icon container
 */
export const IconPod = ({ children, size = 52, style }) => (
  <View style={[styles.iconPod, { width: size, height: size }, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    position: 'relative',
  },
  blur: {
    overflow: 'hidden',
    borderRadius: borderRadius.xxl,
  },
  content: {
    backgroundColor: colors.glass.background,
    padding: spacing.xl,
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: borderRadius.xxl,
    borderWidth: 1,
    borderColor: colors.glass.border,
    pointerEvents: 'none',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  statContainer: {
    backgroundColor: colors.glass.background,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.glass.border,
    overflow: 'hidden',
  },
  statContent: {
    padding: spacing.lg,
  },
  iconPod: {
    borderRadius: borderRadius.full,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.glass.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GlassCard;
