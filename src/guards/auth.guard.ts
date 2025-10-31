// src/modules/auth/auth.guard.ts

import type { MiddlewareHandler } from "hono"
import { auth } from "@/config/auth"

export const requireAuth: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession(c)
  if (!session) return c.json({ success: false, message: "Unauthorized" }, 401)
  c.set("session", session)
  await next()
}
