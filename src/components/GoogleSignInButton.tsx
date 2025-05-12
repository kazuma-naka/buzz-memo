'use client';

import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignInWithGoogleButton() {
  const pathname = usePathname();
  const handleSignIn = async () => {
    const origin = window.location.origin;
    const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(pathname)}`;

    const { error } = await createClient().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) console.error('Error signing in:', error);
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
}
