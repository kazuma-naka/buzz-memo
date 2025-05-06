'use client';

import { signIn } from 'next-auth/react';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionLogIn = motion(LogIn);

export default function LogInButton() {
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const iconVariants = {
    rest: { rotate: 0, y: 0 },
    hover: { rotate: 20, y: -2 },
  };

  const transition = { type: 'spring' as const, stiffness: 300, damping: 20 };

  return (
    <motion.button
      onClick={() => signIn()}
      className="
        flex items-center gap-2
        text-blue-600 hover:text-blue-800
        text-md font-medium cursor-pointer
      "
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      transition={transition}
    >
      <MotionLogIn size={20} variants={iconVariants} transition={transition} />
      ログイン
    </motion.button>
  );
}
