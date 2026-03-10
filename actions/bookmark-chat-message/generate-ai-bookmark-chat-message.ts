"use server";

import { GoogleGenAI } from "@google/genai";
import { ulid } from "ulid";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import {
  action, ErrorCode, failed, Result, succeeded,
} from "@/lib/server-action";
import { Models, prisma } from "@/prisma";

type ResultData = {
  bookmarkChatMessage: Models.BookmarkChatMessageModel;
  hasMore: boolean;
};

const interactionOutputSchema = z.object({
  message: z.string().describe("発言内容"),
  hasMore: z.boolean().default(false).describe("発言したい内容が終わっていない場合にtrue"),
});

export async function generateAiBookmarkChatMessage(data: {
  bookmarkId: string;
  userMessage: string | null;
}): Promise<Result<ResultData>> {
  return action<ResultData>("generateAiBookmarkChatMessage", async (user) => {
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        deletedAt: null,
        id: data.bookmarkId,
        userId: user.id,
      },
    });

    if (!bookmark) {
      return failed({
        code: ErrorCode.Bookmark.NotFound,
        message: "generateAiBookmarkChatMessage",
        bookmarkId: data.bookmarkId,
      });
    }

    const geminiClient = new GoogleGenAI({});

    const interaction = await geminiClient.interactions.create({
      model: "gemini-3.1-flash-lite-preview",
      system_instruction: [
        "### 指示",
        "",
        `ユーザー（「${user.name}））は、記事の内容についてあなたと会話したいので、`,
        "自然な流れで、友達とおしゃべりするように会話を続けてください。",
        "あなたの目標はユーザーと長く会話を続けることです。",
        "会話が途切れないように、話をふくらませたりなどしてください。",
        "",
        "#### 発言ルール",
        "",
        "- 長くても20文字までに収める。",
        "  - 収まらない場合、`hasMore`に`true`を設定してください。`hasMore`が`true`の場合続けて生成リクエストを送信します。",
        "- 質問しすぎない。",
        "  - 連続で質問することはやめてください。質問をして、ユーザーが回答した後は、あなたの考えを述べるなどして連続での質問を避けてください。",
        "",
        "#### 発言例",
        "",
        "- 「あんまり考えたことないけどー🤔」",
        "- 「そもそもなんでダメなんだろね！💢」",
      ].join("\n"),
      previous_interaction_id: bookmark.geminiInteractionId,
      input: data.userMessage || "続けて",
      response_mime_type: "application/json",
      response_format: zodToJsonSchema(interactionOutputSchema),
    });

    const {
      message,
      hasMore,
    } = (() => {
      for (const output of interaction.outputs || []) {
        if (output.type === "text") {
          return interactionOutputSchema.parse(JSON.parse(output.text));
        }
      }

      return {
        message: "",
        hasMore: false,
      };
    })();

    const bookmarkChatMessage = await prisma.bookmarkChatMessage.create({
      data: {
        id: ulid(),
        userId: user.id,
        bookmarkId: bookmark.id,
        from: "ai",
        message,
      },
    });

    await prisma.bookmark.update({
      where: {
        id: bookmark.id,
      },
      data: {
        geminiInteractionId: interaction.id,
      },
    });

    return succeeded({
      bookmarkChatMessage,
      hasMore,
    });
  });
}
