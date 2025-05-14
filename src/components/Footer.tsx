'use client';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="py-6 text-center text-xl text-gray-500 bg-white">
      <div className="mb-4 flex justify-center items-center space-x-2">
        <Link href="/terms" className="underline">
          利用規約
        </Link>
        <span className="text-gray-400">|</span>
        <Link href="/privacy" className="underline">
          プライバシーポリシー
        </Link>
        <span className="text-gray-400">|</span>
        <a
          href="https://github.com/kazuma-naka/buzz-memo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition-colors"
        >
          <SiGithub size={24} />
        </a>
      </div>
      <div>&copy; {new Date().getFullYear()} Buzz Memo</div>
    </footer>
  );
}
