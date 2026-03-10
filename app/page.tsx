import Image from "next/image";
import { Suspense } from "react";

import { SignInForm } from "@/components/sign-in-form";

export default async function Page() {
  return (
    <div className="flex flex-col gap-8 px-10">
      <div className="flex flex-col items-center justify-center gap-12 h-80">
        <Image
          src="/logo.png"
          alt="mondo logo"
          height="421"
          width="1156"
          className="h-24 w-auto" />

        <div className="flex flex-col gap-2 text-white">
          <div className="text-xl text-center font-bold">
            URLを貼って、AIと喋るだけ🌟
          </div>

          <div className="text-sm text-center text-app-medium-gray">
            対話ログがそのままブログになる
            <br />
            新感覚プラットフォーム
          </div>
        </div>
      </div>

      <Suspense>
        <SignInForm
          redirect="/bookmarks" />
      </Suspense>
    </div>
  );
}
