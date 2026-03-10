import { auth } from "@/lib/auth";
import { ErrorCode } from "@/lib/server-action/error-code";
import { failed, Result } from "@/lib/server-action/result";
import { Models } from "@/prisma";

export async function action<T>(
  actionName: string,
  handler: (user: Models.UserModel) => Promise<Result<T>>,
): Promise<Result<T>> {
  const session = await auth();

  try {
    if (!session?.user) {
      return failed({
        code: ErrorCode.Unauthorized,
        message: actionName,
      });
    }

    return await handler(session.user);
  } catch (err) {
    return failed({
      code: ErrorCode.Unexpected,
      message: actionName,
      error: err,
    });
  }
}
