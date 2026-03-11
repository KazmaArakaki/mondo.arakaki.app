import type { Metadata } from "next";

import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "お問い合わせ | mondo",
  description: "mondoサービスへのお問い合わせページです。サービスに関するご質問、ご要望、不具合のご報告はこちらからお願いいたします。",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-app-dark-gray">
        お問い合わせ
      </h1>

      <div className="flex flex-col gap-5 text-sm text-app-dark-gray leading-relaxed">
        <p>
          mondoに関するご質問、ご要望、不具合のご報告は、以下の連絡先までお気軽にお問い合わせください。
        </p>

        <div className="flex flex-col gap-4 p-5 bg-app-light-gray rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-app-hot-pink to-app-purple text-white">
              <Mail size={20} />
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="text-xs text-app-medium-gray">
                メールでのお問い合わせ
              </div>

              <a
                href="mailto:mail@arakaki.app"
                className="text-sm font-bold text-app-hot-pink hover:opacity-80 transition-opacity">
                mail@arakaki.app
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-base font-bold">お問い合わせの際のお願い</h2>
          <ul className="list-disc list-inside space-y-1 pl-2 text-app-medium-gray">
            <li>ご利用の端末・ブラウザの情報</li>
            <li>不具合の場合は、発生状況の詳細</li>
            <li>スクリーンショット（可能であれば）</li>
          </ul>
          <p className="text-app-medium-gray text-xs mt-1">
            通常、2〜3営業日以内にご返信いたします。
          </p>
        </div>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">運営者情報</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-app-light-gray">
              <tr>
                <td className="py-2.5 pr-4 text-app-medium-gray whitespace-nowrap font-bold">運営者</td>
                <td className="py-2.5">新垣 克真</td>
              </tr>

              <tr>
                <td className="py-2.5 pr-4 text-app-medium-gray whitespace-nowrap font-bold">メール</td>
                <td className="py-2.5">mail@arakaki.app</td>
              </tr>

              <tr>
                <td className="py-2.5 pr-4 text-app-medium-gray whitespace-nowrap font-bold">サービス名</td>
                <td className="py-2.5">mondo</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
