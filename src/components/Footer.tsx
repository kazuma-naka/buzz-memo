`use client`;
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-6 text-center text-xl text-gray-500 bg-white">
      &copy; {new Date().getFullYear()} Buzz Memo |{' '}
      <Link href="/terms" className="underline">
        利用規約
      </Link>{' '}
      |{' '}
      <Link href="/privacy" className="underline">
        プライバシーポリシー
      </Link>{' '}
      |{' '}
      <Link href="/contact" className="underline">
        お問い合わせ
      </Link>
    </footer>
  );
}
