# README — api.crealix.ai

## Prerequisites

- **Bun** ≥ 1.1  
- **Docker** (for local Postgres with docker-compose)  
- **Node typings** (already included in dev deps)

## Install

```bash
pnpm install
```

## Environment

This project loads env files based on `ENVIROMENT`:

- `ENVIROMENT=local` → loads `.env.local`
- `ENVIROMENT=develop` → loads `.env.develop`
- `ENVIROMENT=production` → loads `.env.production`

**Minimum variables:**

```bash
ENVIROMENT=local            # local | develop | production
NODE_ENV=develop            # develop | production
PORT=8000                   # API port
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public
```

### Railway tip

- **Local dev:** use `DATABASE_PUBLIC_URL` from Railway.
- **Production on Railway:** use `DATABASE_URL` (internal).

## Run locally

### Start DB (Docker)
```bash
pnpm db:up
```

### Validate Schema
```bash
pnpm validate
```

### Generate Prisma Client
```bash
pnpm generate
```

### Run migrations
```bash
pnpm prisma:migrate
```

### Start the API (with hot-reload)
```bash
pnpm dev
```

**API will be available at:**  
http://localhost:8000


## Prisma workflow

### Generate client
```bash
pnpm generate
```

### Create & apply a new migration (dev)
```bash
pnpm migrate
```

### Apply existing migrations in production
```bash
pnpm migrate:deploy
```

### Reset database (⚠️ destructive, dev only)
```bash
pnpm reset
```

### Open Prisma Studio
```bash
pnpm studio
```

## Useful scripts

### Lint & format
```bash
pnpm lint
pnpm format
```

### Docker DB management
```bash
pnpm db:up
pnpm db:down
pnpm db:logs
pnpm db:reset
```

## Build & run (production-like)
```bash
pnpm build
pnpm start
```

Ensure:
```bash
ENVIROMENT=production
NODE_ENV=production
```
Then run:
```bash
pnpm prisma:migrate:deploy
```

## Notes

- **Aliases:** `@/*` → `src/*` configured in `tsconfig.json` (and optionally `bunfig.toml`).
- **CORS** reads `CORS_ORIGIN` (comma-separated origins or `*`).
- **Environment** is validated with **Zod** at startup.
