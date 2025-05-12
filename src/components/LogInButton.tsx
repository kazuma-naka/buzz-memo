'use client';

import { usePathname } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

const MotionLogIn = motion.create(LogIn);

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
  const pathname = usePathname();

  const handleLogin = async () => {
    const redirectTo =
      `${window.location.origin}/auth/callback` +
      `?next=${encodeURIComponent(pathname)}`;
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });

    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }

    if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <motion.button
      onClick={handleLogin}
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
