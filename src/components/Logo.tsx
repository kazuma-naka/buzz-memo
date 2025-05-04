'use client';

import { Mynerve } from 'next/font/google';
import { motion } from 'framer-motion';

const mynerve = Mynerve({
  subsets: ['latin'],
  weight: '400',
});

export default function Logo() {
  return (
    <motion.h1
      className={`
        ${mynerve.className}
        text-6xl md:text-8xl font-bold mb-4 inline-block
        bg-[linear-gradient(90deg,#0D47A1,#1976D2,#42A5F5,#64B5F6,#0D47A1)]
        bg-size-[200%_200%]
        bg-clip-text text-transparent
        select-none
        animate-rainbow
      `}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Buzz Memo
    </motion.h1>
  );
}
