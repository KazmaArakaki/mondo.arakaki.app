import "server-only";

import { headers } from "next/headers";

import { getServerPathname } from "@/lib/server-pathname/get-server-pathname";

export async function logError(data: {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}) {
  console.log(JSON.stringify({
    ...data,
    ipAddress: (await headers()).get("x-forwarded-for") || "",
    userAgent: (await headers()).get("user-agent") || "",
    path: await getServerPathname() || "",
  }));
}
