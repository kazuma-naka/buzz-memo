export default function AppDescription() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20">
      <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-5xl">
        Buzz Memo で <span className="text-[#5C8DEC]">“Buzz”</span> を
        ひとまとめ
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-center text-lg/relaxed text-gray-600 dark:text-gray-300">
        Chrome Extension でワンクリック登録。タグ付け、メモ、公開設定を
        <span className="whitespace-nowrap">自由自在。</span>
        あなたのサービス言及記事をすべて一箇所に集約します。
      </p>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-semibold">ワンクリック取込</h3>
          <p className="mt-2 text-sm/relaxed text-gray-600 dark:text-gray-300">
            ブラウザで記事を開いたまま
            <span className="font-medium">1 クリック</span>
            でタイトル・URL・Favicon を保存。
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-semibold">タグ &amp; メモ</h3>
          <p className="mt-2 text-sm/relaxed text-gray-600 dark:text-gray-300">
            記事ごとにタグやメモを書き込み、
            <span className="font-medium">検索性</span>と{' '}
            <span className="font-medium">文脈</span> をプラス。
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-semibold">公開／非公開切替</h3>
          <p className="mt-2 text-sm/relaxed text-gray-600 dark:text-gray-300">
            URL 単位で可視性を設定。公開するリンクと内部メモを
            明確に分けられます。
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold">登録状況を即確認</h3>
          <p className="mt-2 text-sm/relaxed text-gray-600 dark:text-gray-300">
            拡張アイコンが<span className="font-medium">登録済み / 未登録</span>
            をリアルタイム表示。二重登録を防ぎます。
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:col-span-2">
          <h3 className="text-lg font-semibold">チーム共有 &amp; 協力</h3>
          <p className="mt-2 text-sm/relaxed text-gray-600 dark:text-gray-300">
            生成された公開ページを URL 一つでシェア。フィードバックを集め、
            プロダクト改善に活用しましょう。
          </p>
        </article>
      </div>
    </section>
  );
}
