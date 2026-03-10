"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { createUser } from "@/actions/noauth/user/create-user";
import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import {
  Field, FieldError, FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ErrorCode } from "@/lib/server-action/error-code";

const fieldsSchema = z.object({
  email: z.string().min(1, {
    message: "メールアドレスを入力してください😭",
  }),
  password: z.string().min(1, {
    message: "パスワードを入力してください😭",
  }),
});

type InputFields = z.input<typeof fieldsSchema>;
type OutputFields = z.output<typeof fieldsSchema>;

export function SignUpForm() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [isBusy, setIsBusy] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<InputFields, undefined, OutputFields>({
    resolver: zodResolver(fieldsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = useCallback(async (data: OutputFields) => {
    try {
      setIsBusy(true);

      const createUserResult = await createUser({
        email: data.email,
        password: data.password,
      });

      if (!createUserResult.success) {
        if (createUserResult.errorCode === ErrorCode.User.EmailDuplicated) {
          form.setError("email", {
            message: "すでに使用されているメールアドレスです。",
          });
        }

        throw new Error("failed");
      }

      const redirectUri = searchParams.get("redirect");

      router.refresh();

      router.push(redirectUri || "/");
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
              name="email"
              control={form.control}
              render={({
                field, fieldState,
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}>
                    <Mail size={20} />

                    <div className="font-bold">
                      メールアドレス
                    </div>
                  </FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="username@example.com"
                    aria-invalid={fieldState.invalid} />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]} />
                  )}
                </Field>
              )} />

            <Controller
              name="password"
              control={form.control}
              render={({
                field, fieldState,
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}>
                    <Key size={20} />

                    <div className="font-bold">
                      パスワード
                    </div>
                  </FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="yourpassword"
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
