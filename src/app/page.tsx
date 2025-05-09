import { createClient } from '@/lib/supabase/server';
import Header from '@/components/Header';
import RegisterServiceButton from './_components/RegisterServiceButton';
import WelcomePage from './welcome/page';
import RegisteredServiceList from './_components/registerd_service_list/RegisteredServiceList';
import { fetchServices } from '@/actions/services';
import { getInvites } from '@/actions/invites';
import InvitingServicesList from './_components/InvitingServicesList';
import { InviteWithList } from '@/types/inviteWithList';
import { BookmarkCheck, UserCheck, UserPlus } from 'lucide-react';
import InvitedServices from './_components/InvitedServicesList';

export default async function Home() {
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();
  if (!user) {
    return <WelcomePage />;
  }
  const userId = user.id?.toString();
  const userEmail = user.email;

  const services = await fetchServices(userId);
  const invites = await getInvites();
  const unwraInvitesList = (inv: InviteWithList) =>
    Array.isArray(inv.invite_lists) ? inv.invite_lists[0] : inv.invite_lists;
  const invitesReceived = invites.filter((i) => i.invited_user_id === userId);
  const invitesCreated = invites.filter(
    (i) => unwraInvitesList(i)?.created_user_id === userId,
  );

  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col">
      <Header title={'バズメモ'} />
      <main className="flex-1 flex items-start justify-center pt-12 px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
          <section className="space-y-6">
            <RegisterServiceButton userId={userId!} userEmail={userEmail!} />
            <h2 className="text-lg font-bold mb-4 mt-4 flex items-center">
              <BookmarkCheck className="mr-2 w-5 h-5 text-[#222222]" />
              登録したサービス
            </h2>
            <RegisteredServiceList services={services} />

            <h2 className="text-lg font-bold mb-2 flex items-center">
              <UserCheck className="mr-2 w-5 h-5 text-indigo-800" />
              招待されたサービス
            </h2>

            <InvitedServices invites={invitesReceived} userId={userId} />

            <h2 className="text-lg font-bold mb-2 flex items-center">
              <UserPlus className="mr-2 w-5 h-5 text-green-800" />
              招待をしたサービス
            </h2>
            <InvitingServicesList
              services={services}
              invites={invitesCreated}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
