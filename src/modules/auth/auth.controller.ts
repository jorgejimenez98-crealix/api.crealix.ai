import type { Context } from "hono"
import { oauthCallbackSchema, signInSchema, signUpSchema } from "./auth.dto"
import { AuthService } from "./auth.service"

export class AuthController {
  static async signUp(c: Context) {
    const input = signUpSchema.parse(await c.req.json())
    const { user, session } = await AuthService.signUp(input)
    AuthService.setSessionCookie(c, session)
    return c.json({ success: true, user })
  }

  static async signIn(c: Context) {
    const input = signInSchema.parse(await c.req.json())
    const { user, session } = await AuthService.signIn(input)
    AuthService.setSessionCookie(c, session)
    return c.json({ success: true, user })
  }

  static async signOut(c: Context) {
    await AuthService.signOut(c)
    AuthService.clearSessionCookie(c)
    return c.json({ success: true })
  }

  static async me(c: Context) {
    const session = await AuthService.me(c)
    if (!session) return c.json({ success: false }, 401)
    return c.json({ success: true, user: session.user })
  }

  // --------- OAuth JSON-only ----------
  static getGoogleUrl(c: Context) {
    const redirectUri = c.req.query("redirectUri")
    if (!redirectUri) {
      return c.json({ success: false, message: "redirectUri required" }, 400)
    }

    const url = AuthService.getOAuthUrl("google", redirectUri)
    return c.json({ success: true, url })
  }

  static async googleCallback(c: Context) {
    const { provider, code, redirectUri, state } = oauthCallbackSchema.parse(
      await c.req.json(),
    )
    const res = await AuthService.oauthCallback(
      provider,
      code,
      redirectUri,
      state,
    )
    AuthService.setSessionCookie(c, res.session)
    return c.json({ success: true, user: res.user })
  }
}
