'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface VisibilityToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

const popVariants = {
  show: {
    scale: [1, 1.3, 1],
    rotate: [0, 15, 0],
    transition: { duration: 0.4, times: [0, 0.5, 1], ease: 'easeOut' },
  },
  hide: {
    scale: [1, 1.3, 1],
    rotate: [0, -15, 0],
    transition: { duration: 0.4, times: [0, 0.5, 1], ease: 'easeOut' },
  },
};

export const VisibilityToggle: React.FC<VisibilityToggleProps> = ({
  isVisible,
  onToggle,
}) => (
  <motion.button
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    aria-label={isVisible ? 'Hide bookmark' : 'Show bookmark'}
    initial={false}
    animate={isVisible ? 'show' : 'hide'}
    variants={popVariants}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`
      group flex items-center p-1 bg-white rounded-full
      hover:bg-gray-200
      ${!isVisible ? 'text-[#FF6B6B]' : ''}
    `}
  >
    {isVisible ? (
      <Eye className="w-7 h-7 transition-transform group-hover:-translate-x-1" />
    ) : (
      <EyeOff className="w-7 h-7 transition-transform group-hover:-translate-x-1" />
    )}
    <span
      className={`
      hidden group-hover:inline-block ml-1 text-sm whitespace-nowrap
      ${isVisible ? 'text-gray-800' : 'text-[#FF6B6B]'}
    `}
    >
      {isVisible ? '表示' : '非表示'}
    </span>
  </motion.button>
);
