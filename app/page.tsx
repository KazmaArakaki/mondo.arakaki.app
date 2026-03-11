import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { SignInForm } from "@/components/sign-in-form";
import { Button } from "@/components/ui/button";

import { LandingSections } from "./_components/landing-sections";

export default async function Page() {
  return (
    <div className="flex flex-col gap-8">
      {/* ── Hero Section ── */}
      <section className="flex flex-col items-center justify-center gap-8 pt-16 pb-4 px-10">
        <Image
          src="/logo.png"
          alt="mondo logo"
          height={421}
          width={1156}
          className="h-24 w-auto drop-shadow-lg animate-fade-in" />

        <div className="flex flex-col gap-3 text-white">
          <div className="text-xl text-center font-bold">
            URLを貼って、AIと喋るだけ🌟
          </div>

          <div className="text-sm text-center text-white/70 leading-relaxed">
            対話ログがそのままブログになる
            <br />
            新感覚プラットフォーム
          </div>
        </div>

        <Link href="#sign-in">
          <Button size="lg">
            今すぐ始める 🚀
          </Button>
        </Link>
      </section>

      {/* ── Landing Sections (Steps, Features, etc.) ── */}
      <LandingSections />

      {/* ── Sign In Section ── */}
      <section
        id="sign-in"
        className="flex flex-col gap-4 px-10 pb-12">
        <div className="flex flex-col items-center gap-1">
          <div className="text-2xl">
            🌟
          </div>

          <div className="text-lg text-center text-white font-bold">
            さっそく始めよう
          </div>

          <div className="text-xs text-center text-white/70">
            アカウントを作成して、mondoを体験
          </div>
        </div>

        <Suspense>
          <SignInForm
            redirect="/bookmarks" />
        </Suspense>
      </section>

      {/* ── Section 7: フッターCTA ── */}
      <section className="flex flex-col items-center gap-4 px-6 py-8">
        <Image
          src="/logo.png"
          alt="mondo logo"
          height={421}
          width={1156}
          className="h-10 w-auto opacity-80" />

        <div className="text-sm text-center text-white/70">
          URLを貼って、AIと喋るだけ。
          <br />
          あなたの「気になる」を、世界に届けよう。
        </div>

        <div className="text-xs text-center text-white/40 mt-2">
          © 2026 mondo
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-3">
          <Link href="/legal/tokushoho" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            特定商取引法に基づく表記
          </Link>

          <Link href="/legal/terms" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            利用規約
          </Link>

          <Link href="/legal/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            プライバシーポリシー
          </Link>

          <Link href="/legal/contact" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  );
}
