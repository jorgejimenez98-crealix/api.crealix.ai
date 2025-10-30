import { Hono } from "hono"
import { corsMiddleware } from "./config/cors"
import { env } from "./config/env"

const app = new Hono()

app.use("*", corsMiddleware())

app.get("/", (c) => c.text("Hello Hono Dev!"))

export default {
  port: env.PORT,
  fetch: app.fetch,
}
