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

  return <HeaderTitlte displayTitle={displayTitle} session={!!session} />;
}
