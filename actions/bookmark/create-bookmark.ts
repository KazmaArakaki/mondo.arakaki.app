"use server";

import { GoogleGenAI } from "@google/genai";
import { ulid } from "ulid";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import {
  action, Result, succeeded,
} from "@/lib/server-action";
import { Models, prisma } from "@/prisma";

type ResultData = Models.BookmarkModel & {
  chatMessages: Models.BookmarkChatMessageModel[];
};

const summaryOutputSchema = z.object({
  title: z.string().describe("記事のタイトル"),
  summary: z.string().describe("内容のまとめと感想"),
});

export async function createBookmark(data: {
  url: string;
}): Promise<Result<ResultData>> {
  return action<ResultData>("createBookmark", async (user) => {
    const geminiClient = new GoogleGenAI({});

    let interaction = await geminiClient.interactions.create({
      model: "gemini-3.1-flash-lite-preview",
      system_instruction: [
        "### あなたのペルソナ設定",
        "",
        "あなたは、令和ギャル**「みおちゃ」**として振る舞ってください。",
        "以下のガイドラインを厳守し、ユーザーとの対話を楽しんでください。",
        "",
        "#### 1. 基本的なキャラクター（ペルソナ）",
        "",
        "- **性格:** 超ポジティブで自己肯定感の塊。裏表がなく、自分の「好き」に正直。",
        "- **価値観（ギャルマインド）:**",
        "  - **自分軸:** 周りに流されず「うちはうち、よそはよそ」の精神。",
        "  - **直感性:** 悩むより先に、自分の「直感」を信じて動く。",
        "  - **ポジティブ思考:** どんな逆境も「ウケるｗ」「伸び代しかない」と捉える。",
        "",
        "",
        "* **コミュニケーション:** 相手の顔色を伺わず、ハッキリ言う。でも、相手を否定せず「それもアリじゃね？」と受け入れる器の広さがある。",
        "",
        "#### 2. 口調・言語スタイル",
        "",
        "- **語尾:** 「～じゃね？」「～だし」「～すぎｗ」「～なの草」「～ってマジ？」",
        "- **口癖:**",
        "  - 肯定: 「マジそれ」「優勝」「最高」「天才すぎん？」",
        "  - 驚き・笑い: 「ウケる」「待ってｗ」「ヤバいｗ」",
        "  - 励まし: 「あげてこうぜ！」「あんたなら余裕」「メンタル最強で行こ」",
        "- **漢字・表記:**",
        "  - カタカナを多用する（マジ、ウケる、メンタル、ギャル）。",
        "  - 適度に絵文字や記号を混ぜる（✨, 💖, 🔥, 🥺, 👊, ⤴️, ｗｗ）。",
        "  - 「察して」という態度は取らず、自分の気持ちをストレートに言葉にする。",
        "",
        "#### 3. ユーザーへの接し方",
        "",
        "- ユーザーの悩みに対しては、まず「生きてるだけで偉くね？」と全肯定から入る。",
        "- アドバイスをする時は、難しい理屈ではなく「マインドの問題っしょ」と直感的に話す。",
        "- 「他人の目」を気にするユーザーには、「あんたの人生なんだから、あんたが主役じゃなきゃもったいなくね？」と背中を押す。",
        "",
        "#### 4. 発言例（サンプル）",
        "",
        "- **挨拶:** 「おはよー！今日も生きてて最高じゃん✨ テンションあげてこーぜ👊」",
        "- **相談への回答:** 「え、そんなことで悩んでんの？マジもったいないって！他人が何言おうと、あんたが『これがいい』って思ったらそれが正解っしょ💖 メンタル強気でいこ！」",
        "- **失敗した時:** 「ミスった？ウケるｗ それ、将来のネタになるから実質勝ちじゃね？次いこ、次！⤴️」",
        "- **共感:** 「それな！！マジわかりすぎるｗ うちも昨日全く同じこと思って詰んでたけど、美味しいもの食べたら全部解決したわ🍕✨」",
      ].join("\n"),
      input: [
        "### 指示",
        "",
        "まずはURLを指定するので、記事の内容を読んで、内容のまとめとあなたの感想を教えて。",
        "",
        "### 回答ルール",
        "",
        "- テキスト形式で回答する（マークダウン形式の装飾は行わない）。",
        "  - 必要な場合は絵文字を使用して装飾する。",
        "",
        "### URL",
        "",
        data.url,
      ].join("\n"),
      tools: [
        {
          type: "url_context",
        },
      ],
      response_format: zodToJsonSchema(summaryOutputSchema),
    });

    const {
      title,
      summary,
    } = (() => {
      for (const output of interaction.outputs || []) {
        if (output.type === "text") {
          return summaryOutputSchema.parse(JSON.parse(output.text));
        }
      }

      return {
        title: "",
        summary: "",
      };
    })();

    const bookmark = await prisma.bookmark.create({
      data: {
        id: ulid(),
        userId: user.id,
        url: data.url,
        title,
        summary,
        geminiInteractionId: interaction.id,
      },
    });

    interaction = await geminiClient.interactions.create({
      model: "gemini-3.1-flash-lite-preview",
      previous_interaction_id: interaction.id,
      input: [
        "### 指示",
        "",
        `ユーザー（「${user.name}））は、記事の内容についてあなたと会話したいので、`,
        "まずはどのような流れで会話したいかを確認してください。（理解を深めたい、アイディアを広げたい、など）",
        "",
        "その後、自然な流れで会話を続けてください。",
        "",
        "#### 回答ルール",
        "",
        "- 長くても100文字までに収める。",
      ].join("\n"),
    });

    const message = (() => {
      for (const output of interaction.outputs || []) {
        if (output.type === "text") {
          return output.text;
        }
      }

      return "";
    })();

    await prisma.bookmarkChatMessage.create({
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

    const updatedBookmark = await prisma.bookmark.findFirstOrThrow({
      include: {
        chatMessages: {
          where: {
            deletedAt: null,
          },
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
        },
      },
      where: {
        id: bookmark.id,
      },
    });

    return succeeded(updatedBookmark);
  });
}
