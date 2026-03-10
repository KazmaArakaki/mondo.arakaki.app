import { compare } from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import z from "zod";

import { getUserByEmail } from "@/actions/noauth/user/get-user-by-email";
import { log } from "@/lib/log";
import { handleError } from "@/lib/server-action";

const credentialsSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export const credentialsProvider = Credentials({
  authorize: async (rawCredentials, req) => {
    try {
      const credentials = credentialsSchema.parse(rawCredentials);

      const user = await handleError(await getUserByEmail(credentials.email));

      if (!(await compare(credentials.password, user.password))) {
        throw new Error("password invalid");
      }

      return {
        id: user.id,
        context: {
          ipAddress: req.headers.get("x-forwarded-for") || "",
          userAgent: req.headers.get("user-agent") || "",
        },
      };
    } catch (err) {
      log.error({
        message: "Credentials.authorize",
        data: {
          error: err,
        },
      });
    }

    return null;
  },
});
