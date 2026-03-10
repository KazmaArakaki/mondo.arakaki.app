
import { log } from "@/lib/log";

type SuccessResult<T> = {
  success: true;
  data: T;
};

type FailResult = {
  success: false;
  errorCode: string;
};

export type Result<T> = SuccessResult<T> | FailResult;

export function succeeded<T>(data: T): SuccessResult<T> {
  return {
    success: true,
    data,
  };
}

export function failed(
  error: {
    code: string;
    message: string;
  } & Record<string, unknown>,
): FailResult {
  const {
    code,
    message,
    ...rest
  } = error;

  log.error({
    message: message,
    data: {
      ...rest,
      code,
    },
  });

  return {
    success: false,
    errorCode: code,
  };
}

export async function handleError<T>(
  result: Result<T>,
  handlers?: {
    [errorCode in string]: (() => void) | (() => Promise<void>);
  } | undefined,
): Promise<T> {
  if (!result.success) {
    await handlers?.[result.errorCode]?.();

    throw new Error(`handleError:${result.errorCode}`);
  }

  return result.data;
}
