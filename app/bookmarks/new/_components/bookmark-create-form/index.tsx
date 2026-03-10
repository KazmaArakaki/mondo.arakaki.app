"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { createBookmark } from "@/actions/bookmark/create-bookmark";
import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import {
  Field, FieldError, FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const fieldsSchema = z.object({
  url: z.string().url({
    message: "URLを入力してください😭",
  }),
});

type InputFields = z.input<typeof fieldsSchema>;
type OutputFields = z.output<typeof fieldsSchema>;

export function BookmarkCreateForm() {
  const router = useRouter();

  const [isBusy, setIsBusy] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<InputFields, undefined, OutputFields>({
    resolver: zodResolver(fieldsSchema),
    defaultValues: {
      url: "",
    },
  });

  const handleFormSubmit = useCallback(async (data: OutputFields) => {
    try {
      setIsBusy(true);

      const createBookmarkResult = await createBookmark({
        url: data.url,
      });

      if (!createBookmarkResult.success) {
        throw new Error("failed");
      }

      router.refresh();

      router.push([
        `/bookmarks/${createBookmarkResult.data.id}`,
      ].join(""));
    } catch {
      setSubmitError("登録できませんでした...😭");
    } finally {
      setIsBusy(false);
    }
  }, []);

  return (
    <Card className="flex flex-col gap-8">
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Controller
              name="url"
              control={form.control}
              render={({
                field, fieldState,
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}>
                    <Link size={20} />

                    <div className="font-bold">
                      URLを貼り付け
                    </div>
                  </FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="https://example.com/article"
                    aria-invalid={fieldState.invalid} />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]} />
                  )}
                </Field>
              )} />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isBusy}>
            {isBusy ? "登録中..." : "新規登録 🌟"}
          </Button>

          {submitError && (
            <div className="text-sm text-destructive">
              {submitError}
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}
