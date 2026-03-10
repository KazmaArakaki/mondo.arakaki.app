"use server";

import {
  action, Result, succeeded,
} from "@/lib/server-action";
import { Models, prisma } from "@/prisma";

type ResultData = Models.BookmarkModel[];

export async function listBookmark(): Promise<Result<ResultData>> {
  return action<ResultData>("getBookmark", async (user) => {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        deletedAt: null,
        userId: user.id,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return succeeded(bookmarks);
  });
}
