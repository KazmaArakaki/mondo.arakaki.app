import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | mondo",
  description: "mondoサービスのプライバシーポリシーです。個人情報の取得、利用目的、第三者提供、安全管理についてご説明します。",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-app-dark-gray">
        プライバシーポリシー
      </h1>

      <p className="text-xs text-app-medium-gray">
        最終更新日: 2026年3月1日
      </p>

      <div className="flex flex-col gap-5 text-sm text-app-dark-gray leading-relaxed">
        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">1. はじめに</h2>
          <p>
            新垣 克真（以下「運営者」）は、Webサービス「mondo」（以下「本サービス」）における
            ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">2. 取得する情報</h2>
          <p>本サービスでは、以下の情報を取得することがあります。</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>メールアドレス（アカウント登録時）</li>
            <li>ユーザー名（アカウント登録時）</li>
            <li>登録されたURLおよびブックマーク情報</li>
            <li>AIとの対話内容</li>
            <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時等）</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">3. 利用目的</h2>
          <p>取得した個人情報は、以下の目的で利用します。</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>本サービスの提供・運営</li>
            <li>ユーザー認証およびアカウント管理</li>
            <li>AI対話機能の提供</li>
            <li>サービスの改善・新機能の開発</li>
            <li>お問い合わせへの対応</li>
            <li>利用規約に違反する行為への対応</li>
            <li>サービスに関する重要なお知らせの送信</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">4. 第三者提供</h2>
          <p>
            運営者は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>ユーザーの同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>人の生命・身体・財産の保護に必要な場合</li>
            <li>本サービスの提供に必要な業務委託先に対して、必要最小限の範囲で提供する場合</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">5. 外部サービスの利用</h2>
          <p>本サービスでは、以下の外部サービスを利用しています。</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              <span className="font-bold">Google Gemini API</span>
              ：AI対話機能の提供のため。対話内容がGoogle LLCのサーバーに送信されます。
            </li>
            <li>
              <span className="font-bold">Stripe</span>
              ：決済処理のため。Stripe, Inc.のプライバシーポリシーに従い情報が取り扱われます。
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">6. データの安全管理</h2>
          <p>
            運営者は、個人情報の漏洩、滅失、毀損の防止のため、適切なセキュリティ対策を講じます。
            ただし、インターネット上の通信について完全な安全性を保証するものではありません。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">7. データの保存期間</h2>
          <p>
            ユーザーの個人情報は、利用目的に必要な期間保存します。
            アカウントを削除された場合、合理的な期間内に個人情報を削除いたします。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">8. ユーザーの権利</h2>
          <p>
            ユーザーは、自己の個人情報について、開示・訂正・削除を請求する権利を有します。
            ご希望の場合は、下記のお問い合わせ先までご連絡ください。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">9. Cookieの使用</h2>
          <p>
            本サービスでは、ユーザー認証やセッション管理のためにCookieを使用します。
            ブラウザの設定によりCookieを無効にすることが可能ですが、
            その場合、本サービスの一部機能がご利用いただけなくなる場合があります。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">10. ポリシーの変更</h2>
          <p>
            運営者は、必要に応じて本ポリシーを変更することがあります。
            重要な変更がある場合は、本サービス上で通知いたします。
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-base font-bold">11. お問い合わせ</h2>
          <p>
            個人情報の取扱いに関するお問い合わせは、以下までご連絡ください。
          </p>
          <div className="p-3 bg-app-light-gray rounded-xl text-sm">
            <p>
              <span className="text-app-medium-gray">メール：</span>
              mail@arakaki.app
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
