/** biome-ignore-all lint/style/useNamingConvention: Is the env */

import * as dotenv from "dotenv"
import * as dotenvExpand from "dotenv-expand"
import { z } from "zod"

/**
 * Hierarchical environment loading based on ENVIROMENT:
 * - ENVIROMENT=local → loads .env.local
 * - ENVIROMENT=develop → loads .env.develop
 * - ENVIROMENT=production → loads .env.production
 */
function loadEnv() {
  const mode = process.env.ENVIROMENT ?? "local"

  const files = [`.env.${mode}`, `.env`]

  for (const file of files) {
    try {
      const res = dotenv.config({ path: file })
      dotenvExpand.expand(res)
    } catch {
      // ignore missing files silently
    }
  }

  console.info(`Loaded environment: ${mode}`)
}

loadEnv()

const EnvSchema = z.object({
  // Defines which .env file to load
  ENVIROMENT: z.enum(["local", "develop", "production"]).default("develop"),

  // Runtime mode for Hono and libraries
  NODE_ENV: z.enum(["develop", "production"]).default("develop"),

  // Port where the Hono server runs (e.g. 8000)
  PORT: z.coerce.number().int().positive().default(8000),

  // Comma-separated origins or "*" to allow all
  CORS_ORIGIN: z.string().default("*"),

  // PostgreSQL connection string
  DATABASE_URL: z.string(),

  // Google Auth
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  OAUTH_REDIRECT_URL: z.string(),
})

const parsed = EnvSchema.safeParse(process.env)

if (!parsed.success) {
  console.error("Error: Invalid environment variables:")
  console.error({ error: parsed.error })
  process.exit(1)
}

export const env = parsed.data

// Convenience helpers for environment checks
export const isLocal = env.ENVIROMENT === "local"
export const isDev = env.ENVIROMENT === "develop"
export const isProd = env.ENVIROMENT === "production"
