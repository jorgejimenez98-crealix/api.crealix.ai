/** biome-ignore-all lint/style/useNamingConvention: Is the env */
/** biome-ignore-all lint/suspicious/noConsole: warns */

import * as dotenv from "dotenv"
import * as dotenvExpand from "dotenv-expand"
import { z } from "zod"

/**
 * Hierarchical loading of .env files:
 * - .env.local if it exists (for local overrides)
 * - .env.development or .env.production depending on NODE_ENV
 * - .env by default (optional)
 */
function loadEnv() {
  const mode = process.env.NODE_ENV ?? "develop"
  const files = [`.env.${mode}`, `.env`, `.env.local`]

  for (const file of files) {
    try {
      const res = dotenv.config({ path: file })
      dotenvExpand.expand(res)
    } catch {}
  }
}

loadEnv()

const EnvSchema = z.object({
  NODE_ENV: z.enum(["develop", "production"]).default("develop"),
  PORT: z.coerce.number().int().positive().default(8000),

  // CORS
  CORS_ORIGIN: z.string().default("*"),

  // DB
  DATABASE_URL: z.string(),
})

const parsed = EnvSchema.safeParse(process.env)

if (!parsed.success) {
  console.error("❌ Invalid environment variables:")
  console.error({ error: parsed.error })
  process.exit(1)
}

export const env = parsed.data
