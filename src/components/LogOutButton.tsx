'use client';

import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const MotionLogOut = motion(LogOut);

export default function LogoutButton() {
  const router = useRouter();

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const iconVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 90 },
  };

  const handleLogout = async () => {
    const { error } = await createClient().auth.signOut();
    if (error) {
      alert(`エラーが発生しました：${error.message}`);
    } else {
      router.push('/');
    }
  };

  return (
    <motion.button
      onClick={handleLogout}
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
