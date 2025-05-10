import { updateInvite } from '@/actions/invites';
import { createClient } from '@/lib/supabase/server';
import Header from '@/components/Header';
import { redirect } from 'next/navigation';

type InvitePageProps = {
  params: Promise<{ token: string }>;
};

export default async function InvitePage({ params }: InvitePageProps) {
  const {
    data: { user },
    error: authError,
  } = await (await createClient()).auth.getUser();

  if (authError) {
    console.error('auth.getUser() error:', authError);
  }

  const token = (await params).token;
  if (user?.id && user.email) {
    const successfullyInvited = await updateInvite(user.id, token, user.email);
    if (successfullyInvited) {
    }
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
