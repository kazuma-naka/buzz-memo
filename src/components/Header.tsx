import { Mynerve } from 'next/font/google';
import { auth } from '@/auth';
import HeaderTitlte from './HeaderTitle';

const mynerve = Mynerve({
  subsets: ['latin'],
  weight: '400',
});

type HeaderProps = {
  title?: string | null;
};

export default async function Header({ title }: HeaderProps) {
  const session = await auth();
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
