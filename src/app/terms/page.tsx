import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata = {
  title: '利用規約',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="バズメモ" />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <article className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="px-6 py-8 space-y-6">
              <h1 className="text-3xl font-extrabold text-[#5C8DEC]">
                利用規約
              </h1>
              <p className="text-gray-700 leading-relaxed">
                この利用規約（以下，「本規約」といいます。）は，このウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものとします。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
              </p>
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第1条（適用）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。当社は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。本規約の規定が個別規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第2条（利用登録）
                  </h2>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>
                      登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当社が承認することで利用登録が完了します。
                    </li>
                    <li>
                      当社は，以下の場合には申請を承認しないことがあり，その理由は開示義務を負いません。
                      <ol className="list-decimal list-inside ml-4 space-y-1 mt-2">
                        <li>申請時に虚偽の事項を届け出た場合</li>
                        <li>本規約に違反したことがある者からの申請</li>
                        <li>その他，当社が不適切と判断した場合</li>
                      </ol>
                    </li>
                  </ol>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第3条（ユーザーIDおよびパスワードの管理）
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    ユーザーは自己の責任でユーザーIDおよびパスワードを適切に管理するものとします。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    ユーザーIDおよびパスワードの譲渡、貸与、共用は禁止されており、当社は登録情報と一致するログインをユーザー自身の利用とみなします。
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第4条（利用料金および支払方法）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    ユーザーは本サービスを無料で利用することができるものとします。したがって、料金の支払いに関する取り決めは一切いたしません。
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第5条（禁止事項）
                  </h2>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>法令または公序良俗に違反する行為</li>
                    <li>犯罪行為に関連する行為</li>
                    <li>知的財産権を侵害する行為</li>
                    <li>
                      他者のサーバー・ネットワーク機能を破壊・妨害する行為
                    </li>
                    <li>情報を商業的に利用する行為</li>
                    <li>サービス運営を妨害する恐れのある行為</li>
                    <li>不正アクセス、試みる行為</li>
                    <li>他ユーザーの個人情報を収集・蓄積する行為</li>
                    <li>不正目的の利用</li>
                    <li>他者に不利益・損害・不快感を与える行為</li>
                    <li>なりすまし行為</li>
                    <li>無断での宣伝・広告・勧誘・営業行為</li>
                    <li>面識のない異性との出会い目的の行為</li>
                    <li>反社会的勢力に利益を供与する行為</li>
                    <li>その他不適切と判断する行為</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第6条（本サービスの提供の停止等）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    当社は以下の場合、通知なく本サービスを停止または中断でき、損害賠償責任を負いません。
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>システム保守・点検・更新時</li>
                    <li>不可抗力（天災等）により提供困難となった場合</li>
                    <li>事故によりコンピュータや通信回線が停止した場合</li>
                    <li>その他提供困難と判断した場合</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第7条（利用制限および登録抹消）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    当社は以下の場合、通知なく利用制限または登録抹消ができ、損害賠償責任を負いません。
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>本規約違反時</li>
                    <li>登録事項に虚偽が判明した場合</li>
                    <li>料金債務不履行時</li>
                    <li>連絡に一定期間応答がない場合</li>
                    <li>最終利用から一定期間利用がない場合</li>
                    <li>その他不適切と判断した場合</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第8条（保証の否認および免責事項）
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    当社は本サービスに瑕疵がないことを明示的にも黙示的にも保証しません。
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    当社の故意・重大な過失を除き、サービスに起因するあらゆる損害に責任を負いません。ただし、消費者契約法が適用される場合は除きます。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    当社はユーザー間または第三者との取引・紛争等に一切責任を負いません。
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第9条（サービス内容の変更等）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    当社は事前告知の上、サービス内容の変更・追加・廃止ができ、ユーザーはこれを承諾します。
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第10条（利用規約の変更）
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    当社は以下の場合、ユーザーの同意なく本規約を変更できます。
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                    <li>変更がユーザーの一般の利益に適合するとき</li>
                    <li>変更が契約目的に反せず合理的と認められるとき</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    変更にあたり、変更内容と発効時期を事前に通知します。
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第11条（個人情報の取扱い）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    当社は取得した個人情報をプライバシーポリシーに従い適切に取り扱います。
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第12条（通知または連絡）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    通知・連絡は当社の定める方法で行い、登録連絡先へ送信時に到達したものとみなします。
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第13条（権利義務の譲渡の禁止）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    ユーザーは当社の書面承諾なく契約上の地位および権利義務を譲渡・担保提供できません。
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    第14条（準拠法・裁判管轄）
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    本規約の解釈には日本法を適用します。
                    <br />
                    本サービスに関する紛争は当社本店所在地の裁判所を専属的合意管轄とします。
                  </p>
                </div>
              </div>
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
