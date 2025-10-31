import { Hono } from "hono"
import { AuthController } from "./auth.controller"

export const authRoute = new Hono()
  .post("/sign-up", AuthController.signUp)
  .post("/sign-in", AuthController.signIn)
  .post("/sign-out", AuthController.signOut)
  .get("/me", AuthController.me)

  // OAuth JSON-only (no redirects del backend)
  .get("/google/url", AuthController.getGoogleUrl)
  .post("/google/callback", AuthController.googleCallback)
