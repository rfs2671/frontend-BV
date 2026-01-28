import React from 'react';
import { motion } from 'framer-motion';

/**
 * Base44-style Glassmorphism Skeleton Loader
 * Matches the frosted, translucent aesthetic of the design system
 */

// Base shimmer animation
const shimmerVariants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Basic skeleton block
export const GlassSkeleton = ({ className = '', style = {} }) => (
  <motion.div
    className={`relative overflow-hidden rounded-xl bg-white/5 ${className}`}
    style={style}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
      }}
      variants={shimmerVariants}
      animate="animate"
    />
  </motion.div>
);

// Stat card skeleton (for dashboard stats)
export const StatCardSkeleton = () => (
  <div className="stat-card p-8">
    <GlassSkeleton className="w-[52px] h-[52px] rounded-full mb-8" />
    <GlassSkeleton className="h-10 w-16 mb-3" />
    <GlassSkeleton className="h-3 w-24" />
  </div>
);

// Project card skeleton
export const ProjectCardSkeleton = () => (
  <div className="stat-card p-6">
    <div className="flex items-center gap-6">
      <GlassSkeleton className="w-[52px] h-[52px] rounded-full" />
      <div className="flex-1">
        <GlassSkeleton className="h-5 w-48 mb-2" />
        <GlassSkeleton className="h-4 w-32" />
      </div>
      <GlassSkeleton className="h-8 w-20 rounded-full" />
    </div>
  </div>
);

// Worker/Checkin card skeleton
export const WorkerCardSkeleton = () => (
  <div className="stat-card p-5">
    <div className="flex items-center gap-5">
      <GlassSkeleton className="w-20 h-12" />
      <div className="w-px h-12 bg-white/10" />
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <GlassSkeleton className="w-10 h-10 rounded-full" />
          <div>
            <GlassSkeleton className="h-4 w-32 mb-1" />
            <GlassSkeleton className="h-3 w-24" />
          </div>
        </div>
        <GlassSkeleton className="h-3 w-48" />
      </div>
      <GlassSkeleton className="h-8 w-24 rounded-full" />
    </div>
  </div>
);

// Dashboard glass card skeleton
export const DashboardSkeleton = () => (
  <div className="glass-card p-12">
    {/* Date */}
    <div className="mb-10">
      <GlassSkeleton className="h-3 w-20 mb-2" />
      <GlassSkeleton className="h-4 w-40" />
    </div>

    {/* Name */}
    <GlassSkeleton className="h-14 w-48 mb-4" />
    <GlassSkeleton className="h-4 w-56 mb-16" />

    {/* Stats Grid */}
    <div className="grid grid-cols-3 gap-6">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
  </div>
);

// Quick action skeleton
export const QuickActionSkeleton = () => (
  <div className="stat-card p-6 flex items-center justify-between">
    <div>
      <GlassSkeleton className="h-5 w-24 mb-2" />
      <GlassSkeleton className="h-4 w-32" />
    </div>
    <GlassSkeleton className="w-5 h-5 rounded" />
  </div>
);

// Full page loading skeleton
export const PageSkeleton = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-4"
  >
    {children}
  </motion.div>
);

// Text line skeleton
export const TextSkeleton = ({ width = 'w-full', height = 'h-4' }) => (
  <GlassSkeleton className={`${width} ${height}`} />
);

// Circle skeleton (for avatars)
export const CircleSkeleton = ({ size = 'w-10 h-10' }) => (
  <GlassSkeleton className={`${size} rounded-full`} />
);

export default GlassSkeleton;
