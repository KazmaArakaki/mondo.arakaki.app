import Link from "next/link";
import { redirect } from "next/navigation";

import { listBookmark } from "@/actions/bookmark/list-bookmark";
import { AuthPage } from "@/components/auth-page";
import { Card } from "@/components/card";
import { datetime } from "@/lib/datetime";

import { Header } from "./_components/header";

export default AuthPage(async (_, user) => {
  const listBookmarkResult = await listBookmark();

  if (!listBookmarkResult.success) {
    return redirect([
      "/",
      `?${new URLSearchParams({
        error: "エラーが発生しました。",
      }).toString()}`,
    ].join(""));
  }

  const bookmarks = listBookmarkResult.data;

  return (
    <div className="relative flex flex-col h-dvh bg-app-light-gray">
      <Header
        user={user} />

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 p-4">
          <div className="font-bold">
            最近のチャット
          </div>

          <div className="flex flex-col gap-2">
            {bookmarks.map((bookmark) => (
              <Link
                key={bookmark.id}
                href={[
                  `/bookmarks/${bookmark.id}`,
                ].join("")}>
                <Card>
                  <div className="flex justify-between items-center gap-4">
                    <div className="max-w-full text-sm font-bold truncate">
                      {bookmark.title}
                    </div>

                    <div className="flex justify-end items-center text-xs text-app-medium-gray">
                      {datetime.format(bookmark.createdAt, "YYYY/MM/DD")}
                    </div>
                  </div>

                  <div className="max-w-full text-xs text-app-medium-gray truncate">
                    {bookmark.url}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
