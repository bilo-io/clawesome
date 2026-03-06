'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedDownloadProps {
  color?: string;
  className?: string;
  size?: number;
}

export const AnimatedDownload: React.FC<AnimatedDownloadProps> = ({ 
  color = 'url(#primary-gradient)', 
  className = "",
  size = 48
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`} style={{ width: size, height: size * 1.2 }}>
      <svg
        width={size}
        height={size * 1.2}
        viewBox={`0 0 ${size} ${size * 1.2}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8C00FF" />
            <stop offset="100%" stopColor="#008FD6" />
          </linearGradient>
        </defs>

        {/* Animated Arrow */}
        <motion.g
          animate={{
            y: [0, size * 0.4, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.path
            d={`M${size / 2} 0V${size * 0.6}M${size / 2} ${size * 0.6}L${size * 0.2} ${size * 0.3}M${size / 2} ${size * 0.6}L${size * 0.8} ${size * 0.3}`}
            stroke={color}
            strokeWidth={size * 0.08}
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.g>

        {/* Animated Tray (U-shape) */}
        <motion.path
          d={`M${size * 0.1} ${size * 0.9}V${size * 1.1}H${size * 0.9}V${size * 0.9}`}
          stroke={color}
          strokeWidth={size * 0.08}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bouncing Platform (Base line) */}
        <motion.path
          d={`M0 ${size * 1.2}H${size}`}
          stroke={color}
          strokeWidth={size * 0.04}
          strokeLinecap="round"
          className="opacity-20"
        />
      </svg>
    </div>
  );
};
