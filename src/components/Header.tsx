import HeaderTitlte from './HeaderTitle';
import { createClient } from '@/lib/supabase/server';

type HeaderProps = {
  title?: string | null;
};

export default async function Header({ title }: HeaderProps) {
  const {
    data: { session },
  } = await (await createClient()).auth.getSession();
  const displayTitle = title ?? '';
  const textSize = title == null ? 'text-2xl' : 'text-2xl';

  return (
    <HeaderTitlte
      displayTitle={displayTitle}
      textSize={textSize}
      session={!!session}
    />
  );
}
