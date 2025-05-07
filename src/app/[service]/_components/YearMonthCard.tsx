import React from 'react';
import { motion, Variants } from 'framer-motion';

const shakeVariants: Variants = {
  rest: { rotate: 0 },
  hover: {
    rotate: [0, -3, 3, -3, 3, 0],
    transition: {
      duration: 0.8,
      times: [0, 0.15, 0.3, 0.45, 0.6, 1],
      loop: Infinity,
      ease: 'easeInOut',
    },
  },
};

const panningTransition = {
  duration: 8,
  ease: 'linear',
  repeat: Infinity,
  repeatType: 'reverse' as const,
};

export const YearMonthCard: React.FC<{ label: string }> = ({ label }) => (
  <motion.div
    className="
      p-4 text-center font-semibold text-white
      rounded-lg h-[8vh] w-auto
      flex items-center justify-center
      cursor-pointer text-xl
    "
    style={{
      backgroundImage: 'linear-gradient(270deg, #5C8DEC, #8EC5FC, #5C8DEC)',
      backgroundSize: '400% 400%',
      backgroundPosition: '0% 50%',
    }}
    variants={shakeVariants}
    initial="rest"
    whileHover="hover"
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%'],
      rotate: 0,
    }}
    transition={{
      backgroundPosition: panningTransition,
      rotate: { type: 'spring', stiffness: 300, damping: 20 },
    }}
  >
    {label}
  </motion.div>
);
