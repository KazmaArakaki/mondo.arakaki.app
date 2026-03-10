"use client";

import { Circle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { useBookmarkChatContext } from "../../_contexts/bookmark-chat-context";

export function ChatMessageList() {
  const {
    messages,
    isGeneratingAiMessage,
  } = useBookmarkChatContext();

  const messageListScrollAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageListScrollAnchorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 p-5">
      {messages.map((message) => (
        <div key={message.id}>
          {message.from === "ai" && (
            <div className="flex gap-3">
              <div className="h-12 aspect-square rounded-full border-2 border-app-purple overflow-hidden">
                <Image
                  src="/avatar.png"
                  alt="avatar"
                  height="1024"
                  width="1024"
                  className="h-full w-full" />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-start">
                  みおちゃ
                </div>

                <div className="py-3 px-4 bg-app-sky-blue rounded-2xl rounded-tl-sm drop-shadow-lg drop-shadow-app-blue/10 whitespace-pre-line">
                  {message.message}
                </div>
              </div>
            </div>
          )}

          {message.from === "user" && (
            <div className="flex gap-3">
              <div className="w-12" />

              <div className="flex-1 flex flex-col">
                <div className="flex justify-end">
                  あなた
                </div>

                <div className="py-3 px-4 bg-app-light-gray rounded-2xl rounded-tr-sm border border-app-medium-gray whitespace-pre-line">
                  {message.message}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {isGeneratingAiMessage && (
        <div className="flex gap-3">
          <div className="h-12 aspect-square rounded-full border-2 border-app-purple overflow-hidden">
            <Image
              src="/avatar.png"
              alt="avatar"
              height="1024"
              width="1024"
              className="h-full w-full" />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex justify-start">
              みおちゃ
            </div>

            <div className="py-3 px-4 bg-app-sky-blue rounded-2xl rounded-tl-sm drop-shadow-lg drop-shadow-app-blue/10">
              <div className="flex items-center gap-1">
                <Circle size={16} stroke="none" fill="rgba(0, 0, 0, 0.5)" />
                <Circle size={16} stroke="none" fill="rgba(0, 0, 0, 0.25)" />
                <Circle size={16} stroke="none" fill="rgba(0, 0, 0, 0.12)" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messageListScrollAnchorRef} />
    </div>
  );
}
