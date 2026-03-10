"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ChatMessageList(props: {
  bookmark: {
    url: string;
    summary: string;
    chatMessages: {
      id: string;
      from: string;
      message: string;
    }[];
  };
}) {
  return (
    <div className="flex flex-col gap-4 p-5">
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
            <div className="flex flex-col gap-4">
              <div className="whitespace-pre-line">
                {props.bookmark.summary}
              </div>

              <Link
                href={props.bookmark.url}
                target="_blank"
                className="flex justify-center items-center gap-1">
                URLを開く
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {props.bookmark.chatMessages.map((message) => (
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
    </div>
  );
}
