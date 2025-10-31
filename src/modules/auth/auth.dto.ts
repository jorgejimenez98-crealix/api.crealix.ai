import { z } from "zod"

export const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})
export type SignUpInput = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})
export type SignInInput = z.infer<typeof signInSchema>

export const oauthCallbackSchema = z.object({
  provider: z.literal("google"),
  code: z.string().min(1),
  redirectUri: z.url(),
  state: z.string().optional(),
})

export type OAuthCallbackInput = z.infer<typeof oauthCallbackSchema>
