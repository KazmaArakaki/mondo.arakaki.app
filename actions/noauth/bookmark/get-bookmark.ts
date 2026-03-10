"use server";

import {
  ErrorCode, failed, Result, succeeded,
} from "@/lib/server-action";
import { Models, prisma } from "@/prisma";

type ResultData = Models.BookmarkModel & {
  chatMessages: Models.BookmarkChatMessageModel[];
  post: Models.BookmarkPostModel | null;
};

export async function getBookmark(id: string): Promise<Result<ResultData>> {
  try {
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
        post: true,
      },
      where: {
        deletedAt: null,
        id,
        isPublished: true,
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
  } catch (err) {
    return failed({
      code: ErrorCode.Unexpected,
      message: "getBookmark",
      error: err,
    });
  }
}
