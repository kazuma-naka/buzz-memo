'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

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

interface MemoIconProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MemoIcon({ onClick }: MemoIconProps) {
  const [popped, setPopped] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPopped(true);
    onClick(e);
    setTimeout(() => setPopped(false), 400);
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={false}
      animate={popped ? 'show' : 'hide'}
      variants={popVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="group flex items-center p-1 bg-white rounded-full hover:bg-gray-200"
      aria-label="メモを編集"
    >
      <FileText className="w-6 h-6 text-gray-600 transition-transform group-hover:-translate-x-1" />
      <span className="hidden group-hover:inline-block ml-1 text-sm text-gray-800 whitespace-nowrap">
        メモを編集
      </span>
    </motion.button>
  );
}
