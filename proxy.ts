import { type NextRequest, NextResponse } from "next/server";

import { setServerPathname } from "@/lib/server-pathname/set-server-pathname";

export default async function proxy(request: NextRequest) {
  return NextResponse.next({
    request: setServerPathname(request),
  });
}
