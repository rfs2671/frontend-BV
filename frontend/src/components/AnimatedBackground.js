import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../styles/theme';

const { width, height } = Dimensions.get('window');

/**
 * AnimatedBackground - Base44 deep blue gradient with subtle animations
 */
const AnimatedBackground = ({ children }) => {
  const scanlineAnim = useRef(new Animated.Value(0)).current;
  const orb1Opacity = useRef(new Animated.Value(0.2)).current;
  const orb2Opacity = useRef(new Animated.Value(0.15)).current;

  useEffect(() => {
    // Scanline animation
    Animated.loop(
      Animated.timing(scanlineAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    // Orb pulsing animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(orb1Opacity, {
          toValue: 0.4,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(orb1Opacity, {
          toValue: 0.2,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(orb2Opacity, {
          toValue: 0.3,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(orb2Opacity, {
          toValue: 0.1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const scanlineTranslateY = scanlineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, height + 100],
  });

  return (
    <View style={styles.container}>
      {/* Base gradient */}
      <LinearGradient
        colors={[colors.background.start, colors.background.middle, colors.background.end]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Grid overlay */}
      <View style={styles.gridOverlay} />

      {/* Moving scanline */}
      <Animated.View
        style={[
          styles.scanline,
          { transform: [{ translateY: scanlineTranslateY }] },
        ]}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.03)', 'transparent']}
          style={styles.scanlineGradient}
        />
      </Animated.View>

      {/* Floating orbs */}
      <Animated.View
        style={[
          styles.orb,
          styles.orb1,
          { opacity: orb1Opacity },
        ]}
      />
      <Animated.View
        style={[
          styles.orb,
          styles.orb2,
          { opacity: orb2Opacity },
        ]}
      />

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.start,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.02,
    // Grid pattern simulated with border
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 100,
  },
  scanlineGradient: {
    flex: 1,
  },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  orb1: {
    width: 200,
    height: 200,
    top: -50,
    right: -50,
  },
  orb2: {
    width: 150,
    height: 150,
    bottom: 100,
    left: -50,
  },
  content: {
    flex: 1,
  },
});

export default AnimatedBackground;
