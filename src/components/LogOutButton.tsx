'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionLogOut = motion(LogOut);

export default function LogoutButton() {
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const iconVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 90 },
  };

  return (
    <motion.button
      onClick={() => signOut()}
      className="
        flex items-center gap-2
        text-blue-600 hover:text-blue-800
        text-md font-medium cursor-pointer
      "
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <MotionLogOut
        size={20}
        variants={iconVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      ログアウト
    </motion.button>
  );
}
