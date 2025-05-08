import { createClient } from '@/lib/supabase/server';
import Header from '@/components/Header';
import RegisterServiceButton from './_components/RegisterServiceButton';
import WelcomePage from './welcome/page';
import RegisteredServiceList from './_components/registerd_service_list/RegisteredServiceList';
import { fetchServices } from '@/actions/services';

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

  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col">
      <Header title={'Buzz Memo'} />
      <main className="flex-1 flex items-start justify-center pt-12 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
          <section className="space-y-6">
            <RegisterServiceButton userId={userId!} userEmail={userEmail!} />
            <h2 className="text-lg font-bold mb-4 mt-4">登録したサービス</h2>
            <RegisteredServiceList services={services} />
          </section>
        </div>
      </main>
    </div>
  );
}
