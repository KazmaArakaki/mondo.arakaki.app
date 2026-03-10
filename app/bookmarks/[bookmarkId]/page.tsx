import { ExternalLink, Globe } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import z from "zod";

import { getBookmark } from "@/actions/bookmark/get-bookmark";
import { AuthPage } from "@/components/auth-page";
import { Card } from "@/components/card";
import { ErrorCode } from "@/lib/server-action";
import { generateBookmarkBlogUrl } from "@/lib/url/generate-bookmark-blog-url";

import { BookmarkChatMessageCreateForm } from "./_components/bookmark-chat-message-create-form";
import { BookmarkIsPublishedSwitch } from "./_components/bookmark-is-published-switch";
import { ChatMessageList } from "./_components/chat-message-list";
import { Header } from "./_components/header";
import BookmarkChatContext from "./_contexts/bookmark-chat-context";

const paramsSchema = z.object({
  bookmarkId: z.string(),
});

export default AuthPage(async (props) => {
  const params = paramsSchema.parse(await props.params);

  const getBookmarkResult = await getBookmark(params.bookmarkId);

  if (!getBookmarkResult.success) {
    if (getBookmarkResult.errorCode === ErrorCode.Bookmark.NotFound) {
      return redirect([
        "/bookmarks",
        `?${new URLSearchParams({
          error: "記事/チャット履歴が見つかりませんでした。",
        }).toString()}`,
      ].join(""));
    }

    return redirect([
      "/bookmarks",
      `?${new URLSearchParams({
        error: "エラーが発生しました。",
      }).toString()}`,
    ].join(""));
  }

  const bookmark = getBookmarkResult.data;

  return (
    <div className="relative flex flex-col h-dvh">
      <Header
        bookmark={bookmark} />

      <BookmarkChatContext
        bookmark={bookmark}
        messages={bookmark.chatMessages}>
        <div className="flex-1 pt-24 pb-8 overflow-y-auto">
          <ChatMessageList />

          <div className="flex flex-col gap-4 mt-4 px-6">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-app-light-gray" />

              <div className="text-sm text-app-light-gray">
                公開設定
              </div>

              <div className="flex-1 h-px bg-app-light-gray" />
            </div>

            <Link
              href={generateBookmarkBlogUrl(bookmark)}
              target="_blank">
              <Card className="flex flex-col gap-3">
                <div className="flex justify-between items-center gap-2 py-3 px-4 bg-app-light-gray border border-app-medium-gray rounded-xl">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Globe size={16} />

                      一般公開
                    </div>

                    <div className="text-xs text-app-medium-gray">
                      このチャットをブログ記事として公開します
                    </div>
                  </div>

                  <BookmarkIsPublishedSwitch />
                </div>

                <div className="flex justify-between items-center gap-2 py-3 px-4 bg-[#fff0f8] border border-app-light-pink rounded-xl">
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-bold">
                      公開ページを確認
                    </div>

                    <div className="text-xs text-app-hot-pink truncate">
                      {generateBookmarkBlogUrl(bookmark)}
                    </div>
                  </div>

                  <ExternalLink
                    size={18}
                    className="text-app-hot-pink" />
                </div>
              </Card>
            </Link>
          </div>
        </div>

        <div className="p-5 bg-app-light-gray">
          <BookmarkChatMessageCreateForm />
        </div>
      </BookmarkChatContext>
    </div>
  );
});
