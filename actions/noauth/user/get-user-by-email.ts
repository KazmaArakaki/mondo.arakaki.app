"use server";

import {
  ErrorCode,
  failed,
  type Result,
  succeeded,
} from "@/lib/server-action";
import { Models, prisma } from "@/prisma";

export async function getUserByEmail(email: string): Promise<Result<Models.UserModel>> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        deletedAt: null,
        email,
      },
    });

    if (!user) {
      return failed({
        code: ErrorCode.User.NotFound,
        message: "getUserByEmail",
        email,
      });
    }

    return succeeded(user);
  } catch (err) {
    return failed({
      code: ErrorCode.Unexpected,
      message: "getUserByEmail",
      error: err,
    });
  }
}
