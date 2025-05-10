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

  console.log(
    `update invite: ${user?.id} ${user?.email} ${(await params).token}`,
  );
  if (user?.email) {
    try {
      await updateInvite(user.email, (await params).token);
    } catch (e) {}
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
