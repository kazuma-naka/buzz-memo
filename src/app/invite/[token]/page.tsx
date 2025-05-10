import { redirect } from 'next/navigation';
import { updateInvite } from '@/actions/invites';
import { createClient } from '@/lib/supabase/server';
import Header from '@/components/Header';

type InvitePageProps = {
  params: Promise<{ token: string }>;
};

export default async function InvitePage({ params }: InvitePageProps) {
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();

  if (user?.email) {
    updateInvite(user.email, (await params).token);
    redirect('/');
  }

  return (
    <>
      <Header title={'バズメモ'} />
      <main className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-bold">サービスに招待されました</h1>
        {user ? (
          <></>
        ) : (
          <>
            <span>ログインしてください。</span>
          </>
        )}
      </main>
    </>
  );
}
