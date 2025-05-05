import type { Metadata } from 'next';
import { syne, sourceSerif } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Buzz Memo',
  description:
    'Buzz Memo というサービスは、 自分の運営しているサービスの言及記事のまとめサイトを作り公開したい サービス運営者向けの、 公開ブックマーク作成サービスです。 ユーザーは自分が運営しているサービスに言及のあった記事を、その記事を開いている状態でChrome Extensionを使い即座にページタイトルとURLとFaviconをサイトに登録することができ、 運営者がそれぞれサイトにURLを書き込むのとは違って、そのURLが登録済が未登録かがChrome Extensionのアイコンを見るだけわかり、登録したURLにメモ書き、タグ付け、URL毎の公開・非公開設定が行えることが特徴です。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${syne.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
