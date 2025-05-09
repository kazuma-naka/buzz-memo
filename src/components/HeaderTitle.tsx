'use client';

import { ChevronLeft } from 'lucide-react';
import router from 'next/router';
import LogoutButton from './LogOutButton';
import LogInButton from './LogInButton';
import MotionLink from './MotionLink';

interface HeaderTitleProps {
  displayTitle: string;
  textSize: string;
  session: boolean;
}

export default function HeaderTitle({
  displayTitle,
  textSize,
  session,
}: HeaderTitleProps) {
  return (
    <header className="bg-[#FAF9F5] shadow-lg">
      <div className="flex justify-between items-center h-16 max-w-xl mx-auto w-full px-4 text-[#222222]">
        {displayTitle !== '' ? (
          <MotionLink
            href="/"
            className={`${textSize} font-bold bg-[linear-gradient(90deg,#0D47A1,#1976D2,#42A5F5,#64B5F6,#0D47A1)]
        bg-[length:200%_200%]
        bg-clip-text text-transparent
        select-none
        animate-rainbow`}
            whileHover={{
              scale: 1.1,
              rotate: -1,
              y: -2,
              color: '#A68A64',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {displayTitle}
          </MotionLink>
        ) : (
          <ChevronLeft
            size={24}
            className={'cursor-pointer'}
            onClick={() => router.back()}
          />
        )}

        <nav>{session ? <LogoutButton /> : <LogInButton />}</nav>
      </div>
    </header>
  );
}
