import { cors } from "hono/cors"
import { env } from "./env"

export function corsMiddleware() {
  const origins = env.CORS_ORIGIN.split(",").map((s) => s.trim())
  const origin = env.CORS_ORIGIN === "*" ? "*" : origins

  return cors({
    origin,
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    maxAge: 86400,
  })
}
