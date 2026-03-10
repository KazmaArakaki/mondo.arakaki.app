import { notFound, redirect } from "next/navigation";
import Markdown from "react-markdown";
import z from "zod";

import { getBookmark } from "@/actions/noauth/bookmark/get-bookmark";
import { CallToActionCard } from "@/components/card/call-to-action-card";
import { ErrorCode } from "@/lib/server-action";
import { cn, PageProps } from "@/lib/utils";

import { ChatMessageList } from "./_components/chat-message-list";
import { Header } from "./_components/header";

const paramsSchema = z.object({
  bookmarkId: z.string(),
});

export default async function Page(props: PageProps) {
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

  if (!bookmark.post) {
    return notFound();
  }

  return (
    <div className="relative flex flex-col h-dvh">
      <Header
        bookmark={{
          url: bookmark.url,
          post: {
            title: bookmark.post.title,
          },
        }} />

      <div className="flex-1 pt-24 pb-8 overflow-y-auto">
        <div className="p-4">
          <div className="p-4 bg-white/75">
            <Markdown
              components={{
                p: (props) => {
                  const {
                    className,
                    ...rest
                  } = props;

                  return (
                    <p {...rest} className={cn(
                      className,
                      "mb-4",
                    )} />
                  );
                },
              }}>
              {bookmark.post.body}
            </Markdown>
          </div>
        </div>

        <ChatMessageList
          bookmark={bookmark} />

        <div className="p-4">
          <CallToActionCard />
        </div>
      </div>
    </div>
  );
};
