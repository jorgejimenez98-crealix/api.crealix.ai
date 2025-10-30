import { Hono } from "hono"

const app = new Hono()

app.get("/", (c) => {
  return c.text("Hello Hono Dev (TEST 1)!")
})

export default {
  port: 8000,
  fetch: app.fetch,
}
