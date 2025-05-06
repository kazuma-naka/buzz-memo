import { auth } from '@/auth';
import WelcomePage from './welcome/page';
import Header from '@/components/Header';
import RegisterServiceButton from './_components/RegisterServiceButton';
import { createUserIfNotExists } from '@/actions/registerUser';

export default async function Home() {
  const session = await auth();
  if (!session) {
    return <WelcomePage />;
  }
  const userId = session.user?.id?.toString();
  const userName = session.user?.name;
  const userEmail = session.user?.email;
  const userImage = session.user?.image;

  try {
    await createUserIfNotExists({
      userId,
      userName,
      userEmail,
      userImage,
    });
    console.log('createUserIfNotExists ran');
  } catch (err) {
    console.error('Failed to create user:', err);
  }

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
