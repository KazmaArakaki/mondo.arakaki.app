"use client";

import {
  ArrowLeft, ChevronUp, ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function Header(props: {
  bookmark: {
    url: string;
    title: string;
    summary: string;
  },
}) {
  const [isSummaryShown, setIsSummaryShown] = useState(false);

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className={cn(
        "bg-white/75 duration-200 rounded-[32px]",
      )}>
        <div className="flex items-center h-16">
          <Link
            href="/bookmarks"
            className="flex justify-center items-center h-full aspect-square rounded-full">
            <ArrowLeft size={20} />
          </Link>

          <button
            type="button"
            onClick={() => {
              setIsSummaryShown(!isSummaryShown);
            }}
            className="flex-1 flex flex-col cursor-poiinter">
            <div className="max-w-[280] text-sm truncate">
              {props.bookmark.title}
            </div>

            <div className="max-w-[280] text-xs text-app-medium-gray truncate">
              {props.bookmark.url}
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsSummaryShown(!isSummaryShown);
            }}
            className="flex justify-center items-center h-full aspect-square rounded-full cursor-pointer">
            <ChevronUp
              size={20}
              className={cn(
                "duration-200 rotate-0",
                isSummaryShown ? "rotate-180" : undefined,
              )} />
          </button>
        </div>

        <div className={cn(
          "max-h-0 rounded-b-[32px] bg-white/50 overflow-y-auto duration-200",
          isSummaryShown && "max-h-[50vh]",
        )}>
          <div className="flex flex-col gap-4 py-4 px-8">
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
  );
}
