'use client';

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
    className="p-1 bg-white rounded-full hover:bg-gray-200"
  >
    {isVisible ? (
      <Eye className="w-7 h-7 text-gray-600" />
    ) : (
      <EyeOff className="w-7 h-7 text-[#FF6B6B]" />
    )}
  </motion.button>
);
