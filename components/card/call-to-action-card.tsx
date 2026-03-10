import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Card } from "./card";

export function CallToActionCard() {
  return (
    <Card className="flex flex-col items-center gap-4">
      <Image
        src="/logo.png"
        alt="mondo logo"
        height="421"
        width="1156"
        className="w-[50%] h-auto" />

      <div className="flex flex-col gap-2">
        <div className="text-xl text-center font-bold">
          URLを貼って、AIと喋るだけ🌟
        </div>

        <div className="text-sm text-center text-app-medium-gray">
          対話ログがそのままブログになる
          <br />
          新感覚プラットフォーム
        </div>
      </div>

      <Link href="/">
        <Button
          size="lg"
          className="w-full">
          試しに使ってみる 🚀
        </Button>
      </Link>
    </Card>
  );
}
