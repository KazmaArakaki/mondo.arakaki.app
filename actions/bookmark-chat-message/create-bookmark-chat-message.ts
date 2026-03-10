"use server";

import { ulid } from "ulid";

import {
  action, ErrorCode, failed, Result, succeeded,
} from "@/lib/server-action";
import { Models, prisma } from "@/prisma";

type ResultData = Models.BookmarkChatMessageModel;

export async function createBookmarkChatMessage(data: {
  bookmarkId: string;
  message: string;
}): Promise<Result<ResultData>> {
  return action<ResultData>("createBookmarkChatMessage", async (user) => {
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        deletedAt: null,
        id: data.bookmarkId,
        userId: user.id,
      },
    });

    if (!bookmark) {
      return failed({
        code: ErrorCode.Bookmark.NotFound,
        message: "createBookmarkChatMessage",
        bookmarkId: data.bookmarkId,
      });
    }

    const bookmarkChatMessage = await prisma.bookmarkChatMessage.create({
      data: {
        id: ulid(),
        userId: user.id,
        bookmarkId: bookmark.id,
        from: "user",
        message: data.message,
      },
    });

    return succeeded(bookmarkChatMessage);
  });
}
