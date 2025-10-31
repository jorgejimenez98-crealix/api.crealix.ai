import { Context } from "hono"
import { auth } from "@/config/auth"
import { SignUpInput } from "./auth.dto"

export class AuthService {
  static async signUp(input: SignUpInput) {
    return auth.emailPassword.signUp({
      email: input.email,
      password: input.password,
      profile: { firstName: input.firstName, lastName: input.lastName },
    })
  }

  static async signIn(input: { email: string; password: string }) {
    return auth.emailPassword.signIn(input)
  }

  static async signOut(c: Context) {
    const session = await auth.getSession(c)
    if (session) await auth.sessions.revoke(session.id)
  }

  static async me(c: Context) {
    return auth.getSession(c)
  }

  static getOAuthUrl(provider: "google", redirectUri: string) {
    return auth.oauth.getAuthorizationUrl(provider, { redirectUri })
  }

  /** API-only: el cliente te envía { code, redirectUri } y aquí creas la sesión */
  static async oauthCallback(
    provider: "google",
    code: string,
    redirectUri: string,
    state?: string,
  ) {
    const url = new URL(redirectUri)
    url.searchParams.set("code", code)
    if (state) url.searchParams.set("state", state)

    return auth.oauth.handleCallback(provider, new Request(url.toString()))
  }

  // helpers de cookie
  static setSessionCookie(c: Context, session: { id: string }) {
    auth.setSessionCookie(c, session)
  }
  static clearSessionCookie(c: Context) {
    auth.clearSessionCookie(c)
  }
}
