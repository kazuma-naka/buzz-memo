'use client';

import { createClient } from '@/lib/supabase/client';
import { usePathname } from 'next/navigation';

export default function GoogleSignInButton() {
  const pathname = usePathname();

  const signInWithGoogle = async () => {
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(pathname)}`;
    const { error } = await createClient().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) console.error('Error signing in:', error);
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="relative inline-block px-10 py-3 text-lg text-[#5C8DEC] font-medium border-4 border-[#5C8DEC] cursor-pointer overflow-hidden z-10 hover:text-white transition-colors duration-300 group rounded-lg"
      type="button"
    >
      <span className="absolute inset-0 bg-transparent z-[-1] border-4 border-[#5C8DEC] rounded-lg" />
      <span className="absolute left-1/2 top-1/2 w-[8%] h-[500%] bg-gray-200 -translate-x-1/2 -translate-y-1/2 -rotate-[60deg] transition-all duration-300 group-hover:rotate-[270deg] group-hover:w-full group-hover:bg-[#5C8DEC] z-[-2]" />
      <div className="flex items-center gap-4">
        <div className="w-[42px] h-[42px] bg-[url('https://developers.google.com/identity/images/g-logo.png')] bg-no-repeat bg-[length:32px_32px] bg-center" />
        <span className="text-sm font-bold font-['Roboto']">
          Google でログイン
        </span>
      </div>
    </button>
  );
}
