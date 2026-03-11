import Link from "next/link";

import { ArrowLeft } from "lucide-react";

export default function LegalLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-6 px-6 py-8">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors w-fit">
        <ArrowLeft size={16} />
        トップに戻る
      </Link>

      <div className="bg-white rounded-2xl drop-shadow-lg drop-shadow-app-blue/10 p-6">
        {children}
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-xs text-white/50">
        <Link href="/legal/tokushoho" className="hover:text-white/80 transition-colors">
          特定商取引法に基づく表記
        </Link>

        <Link href="/legal/terms" className="hover:text-white/80 transition-colors">
          利用規約
        </Link>

        <Link href="/legal/privacy" className="hover:text-white/80 transition-colors">
          プライバシーポリシー
        </Link>

        <Link href="/legal/contact" className="hover:text-white/80 transition-colors">
          お問い合わせ
        </Link>
      </div>
    </div>
  );
}
