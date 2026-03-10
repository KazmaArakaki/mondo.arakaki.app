"use server";

import {
  ErrorCode, failed, Result, succeeded,
} from "@/lib/server-action";
import { Models, prisma } from "@/prisma";

export async function getSession(id: string): Promise<Result<
  Models.SessionModel & {
    user: Models.UserModel,
  }
>> {
  try {
    const session = await prisma.session.findFirst({
      include: {
        user: true,
      },
      where: {
        deletedAt: null,
        id,
      },
    });

    if (!session) {
      return failed({
        code: ErrorCode.Bookmark.NotFound,
        message: "getSession",
        id,
      });
    }

    return succeeded(session);
  } catch (err) {
    return failed({
      code: ErrorCode.Unexpected,
      message: "getSession",
      error: err,
    });
  }
}
