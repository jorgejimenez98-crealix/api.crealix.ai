import { Hono } from "hono"
import { corsMiddleware } from "@/config/cors"
import { env } from "@/config/env"
import { registerRoutes } from "./modules"

const app = new Hono()

// Cors
app.use("*", corsMiddleware())

// Health
app.get("/", (c) => c.text("Hello Hono Dev!"))

// Register modules
const api = new Hono().basePath("/v1")
registerRoutes(api)

app.route("/api", api)

export default {
  port: env.PORT,
  fetch: app.fetch,
}
