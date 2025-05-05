import Logo from '@/components/Logo';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import WelcomeHero from './_components/WelcomeHero';
import AppDescription from './_components/AppDescription';

export default function WelcomePage() {
  return (
    <div className="className=min-h-screen flex flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <header
        role="banner"
        className="flex flex-col items-center justify-center flex-1 text-center py-20 gap-8"
      >
        <Logo />
        <WelcomeHero />
        <GoogleSignInButton />
      </header>
      <AppDescription />
    </div>
  );
}
