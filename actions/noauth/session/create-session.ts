"use server";

import { ulid } from "ulid";

import {
  ErrorCode, failed, Result, succeeded,
} from "@/lib/server-action";
import { Models, prisma } from "@/prisma";

export async function createSession(data: {
  userId: string;
  ipAddress: string;
  userAgent: string;
}): Promise<Result<Models.SessionModel>> {
  try {
    const session = await prisma.session.create({
      data: {
        id: ulid(),
        userId: data.userId,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });

    return succeeded(session);
  } catch (err) {
    return failed({
      code: ErrorCode.Unexpected,
      message: "createSession",
      error: err,
    });
  }
}
