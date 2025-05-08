'use client';

import React, { ReactNode, useState } from 'react';
import { motion, Variants } from 'framer-motion';

const pop: Variants = {
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

interface IconButtonProps {
  children: ReactNode;
  tooltip: string;
  ariaLabel: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function IconButton({
  children,
  tooltip,
  ariaLabel,
  onClick,
  className = '',
}: IconButtonProps) {
  const [popped, setPopped] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPopped(true);
    onClick(e);
    setTimeout(() => setPopped(false), 100);
  };

  return (
    <motion.button
      onClick={handleClick}
      aria-label={ariaLabel}
      initial={false}
      animate={popped ? 'show' : 'hide'}
      variants={pop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`
        ${className}
        relative flex items-center justify-center
        w-9 h-9 p-1 rounded-full bg-white hover:bg-gray-200
        group
      `}
    >
      {children}

      <span
        className="
          pointer-events-none absolute left-1/2 -translate-x-1/2
          bottom-full mb-2
          px-2 py-1 rounded bg-white shadow text-sm whitespace-nowrap
          opacity-0 group-hover:opacity-100 transition-opacity
          text-current
        "
      >
        {tooltip}
      </span>
    </motion.button>
  );
}
