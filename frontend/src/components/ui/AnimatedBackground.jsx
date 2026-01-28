import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="animated-bg">
      {/* Subtle Grid Pattern */}
      <div className="grid-pattern" />
      
      {/* Very subtle scanline */}
      <div className="scanline" />
      
      {/* Muted gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
    </div>
  );
};

export default AnimatedBackground;
