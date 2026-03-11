"use client";

import {
  BookOpen, ChevronDown, ChevronUp, Globe, Link as LinkIcon, MessageCircle, Sparkles, Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Card } from "@/components/card";

/* ─────────────────────────────────────────────
   Step Card (for "3ステップ" section)
   ───────────────────────────────────────────── */
function StepCard({
  step,
  icon,
  title,
  description,
}: {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-app-hot-pink to-app-purple text-white text-sm font-bold shadow-lg">
          {step}
        </div>

        {step < 3 && (
          <div className="w-px h-6 bg-app-light-pink" />
        )}
      </div>

      <Card className="flex-1 flex items-start gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-app-light-pink/30 text-app-hot-pink shrink-0">
          {icon}
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-sm font-bold">
            {title}
          </div>

          <div className="text-xs text-app-medium-gray leading-relaxed">
            {description}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Feature Card (for "特徴" section)
   ───────────────────────────────────────────── */
function FeatureCard({
  icon,
  title,
  description,
  accentColor,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}) {
  return (
    <Card className="flex items-start gap-3 transition-transform duration-200 hover:scale-[1.02]">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
        style={{ backgroundColor: accentColor }}>
        {icon}
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-sm font-bold">
          {title}
        </div>

        <div className="text-xs text-app-medium-gray leading-relaxed">
          {description}
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Target User Card
   ───────────────────────────────────────────── */
function TargetUserCard({
  emoji,
  text,
}: {
  emoji: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl backdrop-blur-sm">
      <div className="text-2xl">
        {emoji}
      </div>

      <div className="text-sm text-app-dark-gray">
        {text}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQ Item
   ───────────────────────────────────────────── */
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:scale-[1.01]">
      <button
        type="button"
        className="flex justify-between items-center gap-3 w-full text-left"
        onClick={() => setIsOpen((prev) => !prev)}>
        <div className="text-sm font-bold">
          {question}
        </div>

        {isOpen
          ? <ChevronUp size={16} className="text-app-medium-gray shrink-0" />
          : <ChevronDown size={16} className="text-app-medium-gray shrink-0" />}
      </button>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-app-light-gray text-xs text-app-medium-gray leading-relaxed">
          {answer}
        </div>
      )}
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Section Header
   ───────────────────────────────────────────── */
function SectionHeader({
  emoji,
  title,
  subtitle,
  light,
}: {
  emoji: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-2xl">
        {emoji}
      </div>

      <div className={`text-lg text-center font-bold ${light ? "text-white" : ""}`}>
        {title}
      </div>

      {subtitle && (
        <div className={`text-xs text-center ${light ? "text-white/70" : "text-app-medium-gray"}`}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Landing Sections
   ───────────────────────────────────────────── */
export function LandingSections() {
  return (
    <div className="flex flex-col gap-12 pb-6">
      {/* ── Section 2: 3ステップでわかる使い方 ── */}
      <section className="flex flex-col gap-5 px-6">
        <SectionHeader
          emoji="✨"
          title="3ステップでかんたん"
          subtitle="URLを貼るだけで始められます" />

        <div className="flex flex-col gap-1">
          <StepCard
            step={1}
            icon={<LinkIcon size={16} />}
            title="URLを貼る"
            description="気になる記事やWebページのURLをペーストするだけ" />

          <StepCard
            step={2}
            icon={<MessageCircle size={16} />}
            title="AIと語り合う"
            description="AIがコンテンツを理解して、あなたと自然に対話します" />

          <StepCard
            step={3}
            icon={<Globe size={16} />}
            title="ブログとして公開"
            description="対話ログがそのままブログ記事に。ワンクリックで世界に公開" />
        </div>
      </section>

      {/* ── Section 3: 主な特徴 ── */}
      <section className="flex flex-col gap-5 px-6">
        <SectionHeader
          emoji="💡"
          title="mondoの特徴"
          subtitle="あなたの「気になる」を価値に変える" />

        <div className="flex flex-col gap-3">
          <FeatureCard
            icon={<Sparkles size={20} className="text-white" />}
            title="AI対話"
            description="URLの中身をAIが深く理解。気になるポイントについて自由に語り合えます。"
            accentColor="rgba(255, 20, 147, 0.15)" />

          <FeatureCard
            icon={<BookOpen size={20} className="text-white" />}
            title="ブログ自動生成"
            description="チャットを公開するだけで記事が完成。文章を書く手間はゼロ。"
            accentColor="rgba(156, 39, 176, 0.15)" />

          <FeatureCard
            icon={<Zap size={20} className="text-white" />}
            title="ブックマーク管理"
            description="読んだ記事をAIとの対話付きでまとめて管理。あとで振り返りもかんたん。"
            accentColor="rgba(0, 188, 212, 0.15)" />

          <FeatureCard
            icon={<Globe size={20} className="text-white" />}
            title="ワンクリック公開"
            description="スイッチひとつでチャットを世界に公開。非公開への切り替えもすぐ。"
            accentColor="rgba(255, 215, 0, 0.2)" />
        </div>
      </section>

      {/* ── Section 4: 利用イメージ ── */}
      <section className="flex flex-col gap-5">
        <SectionHeader
          emoji="📱"
          title="こんな画面で使えます"
          subtitle="シンプルで直感的なデザイン"
          light />

        <div className="flex flex-col gap-4 px-6">
          <Card className="flex flex-col gap-3 overflow-hidden">
            <div className="flex items-center gap-2 text-xs text-app-medium-gray">
              <MessageCircle size={14} />
              チャット画面のイメージ
            </div>

            <div className="flex flex-col gap-2 p-3 bg-app-light-gray rounded-xl">
              <div className="flex justify-end">
                <div className="max-w-[80%] p-2.5 bg-linear-to-r from-app-hot-pink to-app-purple text-white text-xs rounded-2xl rounded-br-sm">
                  この記事のポイントを教えて！
                </div>
              </div>

              <div className="flex justify-start">
                <div className="max-w-[80%] p-2.5 bg-white text-xs text-app-dark-gray rounded-2xl rounded-bl-sm shadow-sm">
                  この記事では3つの重要なポイントが紹介されています ✨ まず...
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[80%] p-2.5 bg-linear-to-r from-app-hot-pink to-app-purple text-white text-xs rounded-2xl rounded-br-sm">
                  もっと詳しく聞きたい！
                </div>
              </div>
            </div>
          </Card>

          <Card className="flex flex-col gap-3 overflow-hidden">
            <div className="flex items-center gap-2 text-xs text-app-medium-gray">
              <Globe size={14} />
              ブログ公開のイメージ
            </div>

            <div className="flex flex-col gap-2 p-3 bg-app-light-gray rounded-xl">
              <div className="flex justify-between items-center py-2 px-3 bg-white rounded-lg">
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-app-hot-pink" />

                  <span className="text-xs font-bold">
                    一般公開
                  </span>
                </div>

                <div className="w-8 h-4 bg-linear-to-r from-app-hot-pink to-app-purple rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>

              <div className="text-[10px] text-center text-app-medium-gray">
                スイッチひとつで公開/非公開を切り替え
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ── Section 5: こんな人におすすめ ── */}
      <section className="flex flex-col gap-5 px-6">
        <SectionHeader
          emoji="🎯"
          title="こんな人におすすめ"
          light />

        <div className="flex flex-col gap-2">
          <TargetUserCard
            emoji="🔍"
            text="気になる記事をもっと深掘りしたい人" />

          <TargetUserCard
            emoji="✍️"
            text="ブログを書きたいけど、文章が苦手な人" />

          <TargetUserCard
            emoji="📚"
            text="読んだ記事を整理・記録しておきたい人" />

          <TargetUserCard
            emoji="💬"
            text="記事の感想を誰かとシェアしたい人" />
        </div>
      </section>

      {/* ── Section 6: よくある質問 ── */}
      <section className="flex flex-col gap-5 px-6">
        <SectionHeader
          emoji="❓"
          title="よくある質問"
          light />

        <div className="flex flex-col gap-3">
          <FAQItem
            question="無料で使えますか？"
            answer="はい！mondoは無料でお使いいただけます。アカウントを作成するだけで、すべての機能をご利用いただけます。" />

          <FAQItem
            question="どんなURLでも使えますか？"
            answer="一般的に公開されているWebページであれば、ほとんどのURLに対応しています。記事、ブログ、ニュースサイトなど幅広くご利用いただけます。" />

          <FAQItem
            question="公開したブログは非公開にできますか？"
            answer="もちろんです！公開設定はいつでもスイッチひとつで切り替えられます。公開・非公開を自由にコントロールできます。" />

          <FAQItem
            question="対話は他の人に見られますか？"
            answer="公開設定をオンにしない限り、あなたの対話は完全にプライベートです。自分だけのメモとしてもお使いいただけます。" />
        </div>
      </section>
    </div>
  );
}
