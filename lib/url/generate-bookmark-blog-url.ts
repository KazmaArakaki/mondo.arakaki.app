export function generateBookmarkBlogUrl(bookmark: {
  id: string;
}): string {
  return [
    process.env.NEXT_PUBLIC_APP_URL,
    `/b/${bookmark.id}`,
  ].join("");
}
