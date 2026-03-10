import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

import { createSession } from "@/actions/noauth/session/create-session";
import { getSession } from "@/actions/noauth/session/get-session";
import { log } from "@/lib/log";
import { handleError } from "@/lib/server-action";
import { Models } from "@/prisma";

import { credentialsProvider } from "./providers/credentials-provider";

declare module "next-auth" {
  interface Session {
    user: Models.UserModel | null;
  }

  interface User {
    id: string;
    context: {
      ipAddress: string;
      userAgent: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
  }
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    credentialsProvider,
  ],
  callbacks: {
    jwt: async ({
      token,
      user: authUser,
      trigger,
    }): Promise<JWT> => {
      try {
        if (trigger === "signIn") {
          const session = await handleError(await createSession({
            userId: authUser.id,
            ipAddress: authUser.context.ipAddress,
            userAgent: authUser.context.userAgent,
          }));

          return {
            ...token,
            sub: session.id,
          };
        }

        if (trigger === undefined) {
          return token;
        }

        throw new Error("unhandled trigger");
      } catch (err) {
        log.error({
          message: "NextAuth.callbacks.jwt",
          data: {
            error: err,
          },
        });
      }

      return token;
    },
    session: async ({
      session: authSession,
      token,
    }): Promise<Session> => {
      try {
        const session = await handleError(await getSession(token.sub));

        return {
          ...authSession,
          user: session.user,
        };
      } catch (err) {
        log.error({
          message: "NextAuth.callbacks.session",
          data: {
            error: err,
          },
        });
      }

      return {
        ...authSession,
        user: null,
      };
    },
  },
});
