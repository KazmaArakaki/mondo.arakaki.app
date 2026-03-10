"use server";

import { GoogleGenAI } from "@google/genai";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import {
  action, ErrorCode, failed, Result, succeeded,
} from "@/lib/server-action";
import {
  Models, prisma, PrismaClient,
} from "@/prisma";

type ResultData = Models.BookmarkModel;

const interactionOutputSchema = z.object({
  title: z.string().describe("ブログタイトル"),
  body: z.string().describe("ブログ本文"),
});

export async function updateBookmark(id: string, data: {
  isPublished?: boolean | undefined;
}): Promise<Result<ResultData>> {
  return action<ResultData>("updateBookmark", async (user) => {
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        deletedAt: null,
        userId: user.id,
        id,
      },
    });

    if (!bookmark) {
      return failed({
        code: ErrorCode.Bookmark.NotFound,
        message: "updateBookmark",
        id,
      });
    }

    if (data.isPublished) {
      await createOrUpdateBookmarkPost(prisma, {
        user,
        bookmark,
      });
    }

    const updatedBookmark = await prisma.bookmark.update({
      where: {
        id: bookmark.id,
      },
      data: {
        isPublished: data.isPublished,
      },
    });

    return succeeded(updatedBookmark);
  });
}

async function createOrUpdateBookmarkPost(prisma: PrismaClient, data: {
  user: Models.UserModel;
  bookmark: Models.BookmarkModel;
}): Promise<void> {
  let bookmarkPost = await prisma.bookmarkPost.findFirst({
    where: {
      userId: data.user.id,
      bookmarkId: data.bookmark.id,
    },
  });

  if (!bookmarkPost) {
    bookmarkPost = await prisma.bookmarkPost.create({
      data: {
        userId: data.user.id,
        bookmarkId: data.bookmark.id,
        title: data.bookmark.title,
        body: data.bookmark.summary,
      },
    });
  }

  const geminiClient = new GoogleGenAI({});

  const interaction = await geminiClient.interactions.create({
    model: "gemini-3.1-flash-lite-preview",
    previous_interaction_id: data.bookmark.geminiInteractionId,
    input: [
      "### 指示",
      "",
      "あなたとユーザーは、共有したURLの内容について会話しました。",
      "この議論の内容を、ブログとして公開します。",
      "あなたは、ブログのタイトルと本文を作成してください。",
      "",
      "#### タイトルについて",
      "",
      "思わずクリックしてしまうような、キャッチーなタイトルを20文字以内で作成してください。",
      "",
      "#### 本文",
      "",
      "**長さは2000文字程度**",
      "URLの内容についての概要と、",
      "あなたとユーザーの会話の内容を踏まえて、",
      "2000文字程度のブログ本文を作成してください。",
      "",
      "**引きのある段落を作る**",
      "100文字〜200文字程度ごとに段落を分け、",
      "それぞれの段落で、次の段落を読みたくなるような引きを作ってください。",
      "",
      "**わかりやすい文章**",
      "10歳の子供が読んでもわかりやすいような文章にしてください。",
      "一般的でない単語には説明をつける、難しい概念には身近な物事で例えて説明する、などでわかりやすくなります。",
      "",
      "**ツール**",
      "本文の内容を補強するために、必要があれば google_search ツールを使用してください。",
    ].join("\n"),
    tools: [
      {
        type: "google_search",
      },
    ],
    response_mime_type: "application/json",
    response_format: zodToJsonSchema(interactionOutputSchema),
  });

  const {
    title,
    body,
  } = (() => {
    for (const output of interaction.outputs || []) {
      if (output.type === "text") {
        return interactionOutputSchema.parse(JSON.parse(output.text));
      }
    }

    return {
      title: "",
      body: "",
    };
  })();

  await prisma.bookmarkPost.update({
    where: {
      bookmarkId: bookmarkPost.bookmarkId,
    },
    data: {
      title,
      body,
    },
  });
}
