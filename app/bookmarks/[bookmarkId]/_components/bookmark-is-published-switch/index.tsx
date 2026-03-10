"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { updateBookmark } from "@/actions/bookmark/update-bookmark";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";

import { useBookmarkChatContext } from "../../_contexts/bookmark-chat-context";

export function BookmarkIsPublishedSwitch() {
  const { bookmark } = useBookmarkChatContext();

  const router = useRouter();

  const [isBusy, setIsBusy] = useState(false);

  const handleCheckedChange = useCallback(async (checked: boolean) => {
    try {
      setIsBusy(true);

      await updateBookmark(bookmark.id, {
        isPublished: checked,
      });

      router.refresh();
    } finally {
      setIsBusy(false);
    }
  }, []);

  return isBusy ? (
    <Spinner />
  ) : (
    <Switch
      checked={bookmark.isPublished}
      onCheckedChange={handleCheckedChange}
      disabled={isBusy} />
  );
}
