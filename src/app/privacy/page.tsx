import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata = {
  title: 'プライバシーポリシー',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="バズメモ" />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <article className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="px-6 py-8 space-y-6">
              <h1 className="text-3xl font-extrabold text-[#5C8DEC]">
                プライバシーポリシー
              </h1>
              <p className="text-gray-700 leading-relaxed">
                本ウェブサイト上で提供するサービス（以下，「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
              </p>

              <section className="space-y-8">
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第1条（個人情報）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    「個人情報」とは、個人情報保護法にいう「個人情報」を指すもので、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの情報を指します。
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第2条（個人情報の収集方法）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    当社は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号、運転免許証番号などをお尋ねすることがあります。また、提携先（情報提供元、広告主、広告配信先など）から取引記録や決済情報を収集することがあります。
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第3条（利用目的）
                  </h2>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>当社サービスの提供・運営</li>
                    <li>お問い合わせへの対応（本人確認含む）</li>
                    <li>新機能やキャンペーン等のご案内</li>
                    <li>メンテナンスや重要なお知らせの通知</li>
                    <li>違反ユーザーの特定と利用制限</li>
                    <li>登録情報の閲覧・変更・削除機能の提供</li>
                    <li>有料サービス利用料金の請求</li>
                    <li>その他、上記に付随する目的</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第4条（利用目的の変更）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    利用目的が変更前と関連性を有すると合理的に認められる場合に限り変更し、変更後はウェブサイト上で通知または公表します。
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第5条（第三者提供）
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    法令で認められる場合を除き、ユーザーの同意なく第三者に提供しません。
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>
                      生命・身体・財産保護のために必要かつ同意取得困難な場合
                    </li>
                    <li>
                      公衆衛生や児童育成のために必要かつ同意取得困難な場合
                    </li>
                    <li>
                      法令に基づく公的機関の事務協力が必要かつ同意障害がある場合
                    </li>
                    <li>
                      事前告知・届出のうえ、以下を満たす場合:
                      <ul className="list-disc list-inside ml-4 space-y-1 mt-2 text-gray-700">
                        <li>利用目的に第三者提供を含むこと</li>
                        <li>提供データの項目</li>
                        <li>提供手段または方法</li>
                        <li>提供停止の要請方法</li>
                        <li>要請受付方法</li>
                      </ul>
                    </li>
                  </ol>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第6条（訂正・削除）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    誤った個人情報については、当社所定の手続きにより訂正・追加・削除を請求でき、合理的と判断した場合は遅滞なく対応します。
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第7条（利用停止等）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    利用目的を超えた取り扱いや不正取得が疑われる場合、調査のうえ必要と判断されれば利用の停止または消去に対応します。
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第8条（ポリシー変更）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    法令上の義務を除き、ユーザーへの事前通知なく本ポリシーを変更でき、ウェブサイト掲載時に効力を生じます。
                  </p>
                </div>
              </section>
            </div>

            <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
              <p>以上</p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
