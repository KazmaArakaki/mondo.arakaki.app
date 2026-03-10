"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { createBookmarkChatMessage } from "@/actions/bookmark-chat-message/create-bookmark-chat-message";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import { useBookmarkChatContext } from "../../_contexts/bookmark-chat-context";

const fieldsSchema = z.object({
  message: z.string(),
});

type InputFields = z.input<typeof fieldsSchema>;
type OutputFields = z.output<typeof fieldsSchema>;

export function BookmarkChatMessageCreateForm() {
  const {
    bookmark, addUserMessage: addMessage,
  } = useBookmarkChatContext();

  const [isBusy, setIsBusy] = useState(false);

  const form = useForm<InputFields, undefined, OutputFields>({
    resolver: zodResolver(fieldsSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleFormSubmit = useCallback(async (data: OutputFields) => {
    try {
      setIsBusy(true);

      const createBookmarkChatMessageResult = await createBookmarkChatMessage({
        bookmarkId: bookmark.id,
        message: data.message,
      });

      if (!createBookmarkChatMessageResult.success) {
        throw new Error("failed");
      }

      addMessage(createBookmarkChatMessageResult.data);

      form.setValue("message", "");
    } finally {
      setIsBusy(false);
    }
  }, []);

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="flex items-end gap-3">
          <Controller
            name="message"
            control={form.control}
            render={({ field }) => (
              <Field>
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="メッセージを入力..." />
              </Field>
            )} />

          <Button
            type="submit"
            size="lg"
            disabled={isBusy}
            className="p-0 aspect-square">
            <Send size={20} />
          </Button>
        </div>
      </form>
    </div >
  );
}
