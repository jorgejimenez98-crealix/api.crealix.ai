import path from "node:path"
import * as dotenv from "dotenv"
import * as dotenvExpand from "dotenv-expand"
import { defineConfig, env as penv } from "prisma/config"

const mode = process.env.ENVIROMENT ?? "local"
const files = [`.env.${mode}`, `.env`]

for (const file of files) {
  const res = dotenv.config({ path: file })
  dotenvExpand.expand(res)
}

console.info(`[prisma] Loaded environment: ${mode}`)

export default defineConfig({
  schema: path.join("prisma"),
  migrations: { path: path.join("prisma", "migrations") },
  engine: "classic",
  datasource: {
    url: penv("DATABASE_URL"),
  },
})
