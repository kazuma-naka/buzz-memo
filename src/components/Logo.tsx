'use client';

import { Roboto } from 'next/font/google';
import { motion } from 'framer-motion';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
});

export default function Logo() {
  return (
    <motion.h1
      className={`
      ${roboto.className}
      font-bold
      text-8xl
      bg-[linear-gradient(90deg,#0D47A1,#1976D2,#42A5F5,#64B5F6,#0D47A1)]
        bg-size-[200%_200%]
        bg-clip-text text-transparent
        select-none
        animate-rainbow
    `}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      バズメモ
    </motion.h1>
  );
}
