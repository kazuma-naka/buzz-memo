import { auth } from '@/auth';
import WelcomePage from './welcome/page';
import Header from '@/components/Header';
import RegisterServiceButton from './_components/RegisterServiceButton';

export default async function Home() {
  const session = await auth();
  if (!session) {
    return <WelcomePage />;
  }
  const userId = session.user?.id?.toString();
  const userEmail = session.user?.email;
  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col">
      <Header title={'Buzz Memo'} />
      <main className="flex-1 flex items-start justify-center pt-12 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
          <section className="space-y-6">
            <RegisterServiceButton userId={userId!} userEmail={userEmail!} />
          </section>
        </div>
      </main>
    </div>
  );
}
