import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "@/db/prisma"
import { env, isProd } from "./env"

export const auth = betterAuth({
  adapter: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  session: {
    cookieName: "session",
    cookie: {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    },
    maxAge: 60 * 60 * 24 * 7,
  },

  emailPassword: {
    enabled: true,
    minPasswordLength: 6,
    // sendVerificationEmail: true,
    // resetPassword: true,
  },

  socialProviders: {
    google: !env.GOOGLE_CLIENT_ID
      ? undefined
      : {
          clientId: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
  },
})
