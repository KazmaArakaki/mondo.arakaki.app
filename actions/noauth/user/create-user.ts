"use server";

import { hash } from "bcrypt";
import { ulid } from "ulid";

import {
  ErrorCode, failed, Result, succeeded,
} from "@/lib/server-action";
import { Models, prisma } from "@/prisma";

export async function createUser(data: {
  email: string;
  password: string;
}): Promise<Result<Models.UserModel>> {
  try {
    const isEmailDuplicated = await prisma.user.count({
      where: {
        deletedAt: null,
        email: data.email,
      },
    }) > 0;

    if (isEmailDuplicated) {
      return failed({
        code: ErrorCode.User.EmailDuplicated,
        message: "createSession",
        email: data.email,
      });
    }

    const user = await prisma.user.create({
      data: {
        id: ulid(),
        email: data.email,
        password: await hash(data.password, 10),
        name: data.email.split("@").at(0) || "新規ユーザー",
      },
    });

    return succeeded(user);
  } catch (err) {
    return failed({
      code: ErrorCode.Unexpected,
      message: "createSession",
      error: err,
    });
  }
};
