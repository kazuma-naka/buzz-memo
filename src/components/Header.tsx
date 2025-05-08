import { Mynerve } from 'next/font/google';
import HeaderTitlte from './HeaderTitle';
import { createClient } from '@/lib/supabase/server';

const mynerve = Mynerve({
  subsets: ['latin'],
  weight: '400',
});

type HeaderProps = {
  title?: string | null;
};

export default async function Header({ title }: HeaderProps) {
  const {
    data: { session },
  } = await (await createClient()).auth.getSession();
  const displayTitle = title ?? '';
  const textSize = title == null ? 'text-2xl' : 'text-5xl';

  return (
    <HeaderTitlte
      displayTitle={displayTitle}
      textSize={textSize}
      session={!!session}
      fontClassName={mynerve.className}
    />
  );
}
