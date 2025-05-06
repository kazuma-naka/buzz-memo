'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-md font-medium cursor-pointer"
    >
      <LogOut size={20} />
      ログアウト
    </button>
  );
}
