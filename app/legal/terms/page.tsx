import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | mondo",
  description: "mondoサービスの利用規約です。サービスの利用条件、禁止事項、免責事項などを記載しています。",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-app-dark-gray">
        利用規約
      </h1>

      <p className="text-xs text-app-medium-gray">
        最終更新日: 2026年3月1日
      </p>

      <div className="flex flex-col gap-5 text-sm text-app-dark-gray leading-relaxed">
        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">第1条（適用）</h2>
          <p>
            本規約は、新垣 克真（以下「運営者」）が提供するWebサービス「mondo」（以下「本サービス」）の利用に関する条件を定めるものです。
            ユーザーは、本規約に同意した上で本サービスを利用するものとします。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">第2条（サービスの内容）</h2>
          <p>
            本サービスは、ユーザーがWebページのURLを登録し、AIとの対話を通じてコンテンツを深く理解し、
            その対話ログをブログとして公開できるプラットフォームです。主な機能は以下の通りです。
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>URLの登録・ブックマーク管理</li>
            <li>AIとの対話機能</li>
            <li>対話ログのブログ公開機能</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">第3条（アカウント登録）</h2>
          <p>
            本サービスの利用にはアカウント登録が必要です。ユーザーは、正確かつ最新の情報を登録するものとし、
            自己の責任においてアカウントを管理するものとします。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">第4条（禁止事項）</h2>
          <p>
            ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>運営者のサーバーまたはネットワークに過度な負荷をかける行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>他のユーザーの個人情報を不正に収集・蓄積する行為</li>
            <li>他のユーザーに成りすます行為</li>
            <li>本サービスに関連して反社会的勢力に利益を供与する行為</li>
            <li>第三者の知的財産権、プライバシー権、名誉権その他の権利を侵害する行為</li>
            <li>その他、運営者が不適切と判断する行為</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">第5条（コンテンツの取扱い）</h2>
          <p>
            ユーザーが本サービスを通じて公開したコンテンツ（対話ログ等）の著作権はユーザーに帰属します。
            ただし、運営者は、本サービスの提供・改善・宣伝のために必要な範囲で、当該コンテンツを利用できるものとします。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">第6条（サービスの変更・中断・終了）</h2>
          <p>
            運営者は、ユーザーに事前に通知することなく、本サービスの内容を変更し、
            または本サービスの提供を中断・終了することができるものとします。
            これによりユーザーに生じた損害について、運営者は一切の責任を負いません。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">第7条（免責事項）</h2>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>運営者は、本サービスに事実上または法律上の瑕疵がないことを保証しません。</li>
            <li>AIによる応答内容の正確性・完全性は保証されません。</li>
            <li>ユーザー間またはユーザーと第三者との間で生じたトラブルについて、運営者は一切の責任を負いません。</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">第8条（個人情報の取扱い）</h2>
          <p>
            本サービスにおける個人情報の取扱いについては、別途定める
            <a href="/legal/privacy" className="text-app-hot-pink underline hover:opacity-80 transition-opacity">
              プライバシーポリシー
            </a>
            に従います。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">第9条（規約の変更）</h2>
          <p>
            運営者は、必要と判断した場合には、ユーザーに通知することなく本規約を変更することができるものとします。
            変更後の利用規約は、本サービス上に掲示した時点から効力を生じるものとします。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">第10条（準拠法・管轄裁判所）</h2>
          <p>
            本規約の解釈は日本法に準拠するものとします。
            本サービスに関する紛争については、運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>
      </div>
    </div>
  );
}
