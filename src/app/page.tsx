import { auth } from '@/auth';
import WelcomePage from './welcome/page';
import Header from '@/components/Header';

export default async function Home() {
  const session = await auth();
  if (!session) {
    return <WelcomePage />;
  }
  return (
    <div>
      <Header />
    </div>
  );
}
