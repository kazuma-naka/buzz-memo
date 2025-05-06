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
    <div>
      <Header title={'Buzz Memo'} />
      <RegisterServiceButton userId={userId!} userEmail={userEmail!} />
    </div>
  );
}
