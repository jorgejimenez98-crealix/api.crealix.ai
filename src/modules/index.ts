import type { Hono } from "hono"
import { authRoute } from "./auth/auth.routes"
import { usersRoute } from "./users/user.routes"

// Central place to register all module routes
export function registerRoutes(app: Hono) {
  app.route("/users", usersRoute)
  app.route("/auth", authRoute)
}
