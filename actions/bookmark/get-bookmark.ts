"use server";

import {
  action, ErrorCode, failed, Result, succeeded,
} from "@/lib/server-action";
import { Models, prisma } from "@/prisma";

type ResultData = Models.BookmarkModel & {
  chatMessages: Models.BookmarkChatMessageModel[];
};

export async function getBookmark(id: string): Promise<Result<ResultData>> {
  return action<ResultData>("getBookmark", async (user) => {
    const bookmark = await prisma.bookmark.findFirst({
      include: {
        chatMessages: {
          where: {
            deletedAt: null,
          },
          orderBy: [
            {
              createdAt: "asc",
            },
          ],
        },
      },
      where: {
        deletedAt: null,
        userId: user.id,
        id,
      },
    });

    if (!bookmark) {
      return failed({
        code: ErrorCode.Bookmark.NotFound,
        message: "getBookmark",
        id,
      });
    }

    return succeeded(bookmark);
  });
}
