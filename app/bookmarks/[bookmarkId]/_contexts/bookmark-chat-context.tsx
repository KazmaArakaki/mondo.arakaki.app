"use client";

import {
  createContext, use, useCallback, useReducer,
  useState,
} from "react";

import { generateAiBookmarkChatMessage } from "@/actions/bookmark-chat-message/generate-ai-bookmark-chat-message";

type Bookmark = {
  id: string;
  isPublished: boolean;
}

type BookmarkChatMessage = {
  id: string;
  from: string;
  message: string;
};

type Context = {
  bookmark: Bookmark;
  messages: BookmarkChatMessage[];
  addUserMessage: (message: BookmarkChatMessage) => void;
  isGeneratingAiMessage: boolean;
};

const context = createContext<Context>({
  bookmark: {
    id: "",
    isPublished: false,
  },
  messages: [],
  addUserMessage: () => { },
  isGeneratingAiMessage: false,
});

export function useBookmarkChatContext(): Context {
  return use(context);
}

export default function BookmarkChatContext(props: {
  bookmark: Bookmark;
  messages: BookmarkChatMessage[];
  children?: React.ReactNode;
}) {
  const [messages, dispatchMessagesAction] = useReducer<
    BookmarkChatMessage[],
    [{
      type: "add";
      data: BookmarkChatMessage;
    }]
  >((prevState, action) => {
    if (action.type === "add") {
      return [
        ...prevState,
        action.data,
      ];
    }

    return prevState;
  }, props.messages);

  const [isGeneratingAiMessage, setIsGeneratingAiMessage] = useState(false);

  const generateAiMessage = useCallback(async ({ userMessage }: {
    userMessage: string | null;
  }): Promise<boolean> => {
    try {
      setIsGeneratingAiMessage(true);

      const generateAiBookmarkChatMessageResult = await generateAiBookmarkChatMessage({
        bookmarkId: props.bookmark.id,
        userMessage,
      });

      if (!generateAiBookmarkChatMessageResult.success) {
        throw new Error("failed");
      }

      const {
        bookmarkChatMessage,
        hasMore,
      } = generateAiBookmarkChatMessageResult.data;

      dispatchMessagesAction({
        type: "add",
        data: bookmarkChatMessage,
      });

      return hasMore;
    } finally {
      setIsGeneratingAiMessage(false);
    }
  }, []);

  const addUserMessage = useCallback(async (message: BookmarkChatMessage) => {
    dispatchMessagesAction({
      type: "add",
      data: message,
    });

    let safeLoopCount = 10;
    while (safeLoopCount > 0) {
      const hasMore = await generateAiMessage({
        userMessage: safeLoopCount === 10 ? message.message : null,
      });

      if (!hasMore) {
        break;
      }

      safeLoopCount--;
    }
  }, []);

  return (
    <context.Provider
      value={{
        bookmark: props.bookmark,
        messages,
        addUserMessage,
        isGeneratingAiMessage,
      }}>
      {props.children}
    </context.Provider>
  );
}
