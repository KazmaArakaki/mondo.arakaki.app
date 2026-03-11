import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | mondo",
  description: "mondoの特定商取引法に基づく表記ページです。販売事業者情報、販売価格、支払い方法、返品・キャンセルに関する情報を記載しています。",
};

export default function TokushohoPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-app-dark-gray">
        特定商取引法に基づく表記
      </h1>

      <div className="flex flex-col gap-5 text-sm text-app-dark-gray leading-relaxed">
        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">販売事業者</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-app-light-gray">
              <tr>
                <td className="py-2.5 pr-4 text-app-medium-gray whitespace-nowrap align-top font-bold">事業者名</td>
                <td className="py-2.5">新垣 克真</td>
              </tr>

              <tr>
                <td className="py-2.5 pr-4 text-app-medium-gray whitespace-nowrap align-top font-bold">所在地</td>
                <td className="py-2.5">請求があった場合は遅滞なく開示いたします</td>
              </tr>

              <tr>
                <td className="py-2.5 pr-4 text-app-medium-gray whitespace-nowrap align-top font-bold">電話番号</td>
                <td className="py-2.5">請求があった場合は遅滞なく開示いたします</td>
              </tr>

              <tr>
                <td className="py-2.5 pr-4 text-app-medium-gray whitespace-nowrap align-top font-bold">メールアドレス</td>
                <td className="py-2.5">mail@arakaki.app</td>
              </tr>

              <tr>
                <td className="py-2.5 pr-4 text-app-medium-gray whitespace-nowrap align-top font-bold">運営責任者</td>
                <td className="py-2.5">新垣 克真</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">販売価格</h2>
          <p>
            毎月100円（税別）でご利用いただけます。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">販売価格以外に必要な費用</h2>
          <p>
            インターネット接続に必要な通信費等はお客様のご負担となります。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">支払い方法</h2>
          <p>
            クレジットカード決済（Stripe経由）に対応しています。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">支払い時期</h2>
          <p>
            毎月Stripeによる決済が行われます。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">サービスの提供時期</h2>
          <p>
            アカウント登録完了後、ただちにサービスをご利用いただけます。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">返品・キャンセルについて</h2>
          <p>
            デジタルサービスの性質上、サービス提供開始後の返品・返金は原則としてお受けしておりません。
            ただし、サービスに重大な瑕疵がある場合は、個別に対応いたします。
            キャンセルをご希望の場合は、下記のお問い合わせ先までご連絡ください。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">動作環境</h2>
          <p>
            最新版のGoogle Chromeでの動作を推奨しています。
          </p>
        </section>
      </div>
    </div>
  );
}
