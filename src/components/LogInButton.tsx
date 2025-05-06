'use client';

import { signIn } from 'next-auth/react';
import { LogIn } from 'lucide-react';

export default function LogInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-md font-medium cursor-pointer"
    >
      <LogIn size={20} />
      ログイン
    </button>
  );
}
