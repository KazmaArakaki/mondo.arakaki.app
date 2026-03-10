import { AuthPage } from "@/components/auth-page";

import { BookmarkCreateForm } from "./_components/bookmark-create-form";

export default AuthPage(async () => {
  return (
    <div className="flex flex-col gap-8 px-10">
      <div className="flex flex-col items-center justify-center gap-12 h-60">
        <div className="flex flex-col gap-2 text-white">
          <div className="text-xl text-center font-bold">
            気になるURL見つけた？🌟
          </div>

          <div className="text-sm text-center text-app-text-gray">
            URLを貼るだけ。
            <br />
            AIと語り合おう💞
          </div>
        </div>
      </div>

      <BookmarkCreateForm />
    </div>
  );
});
