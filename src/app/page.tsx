import { auth } from '@/auth';
import WelcomePage from './welcome/page';

export default async function Home() {
  const session = await auth();
  if (!session) {
    return <WelcomePage />;
  }
  return <div></div>;
}
