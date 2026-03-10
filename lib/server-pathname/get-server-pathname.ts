import { headers } from "next/headers";

export async function getServerPathname(): Promise<string | null> {
  return (await headers()).get("x-pathname");
}
