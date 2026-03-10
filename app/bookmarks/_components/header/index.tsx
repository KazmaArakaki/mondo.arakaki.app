"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Header(props: {
  user: {
    name: string;
  };
}) {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col gap-1 p-5">
        <div className="text-xl font-bold">
          {`こんにちは、${props.user.name}さん👋`}
        </div>

        <div className="text-sm text-app-medium-gray">
          今日もお話ししよ！✨
        </div>
      </div>

      <div className="flex flex-col py-3 px-4 border-t">
        <Link href="/bookmarks/new">
          <Button
            size="lg">
            新しいURLでチャットをはじめよう 🚀
          </Button>
        </Link>
      </div>
    </div>
  );
}
