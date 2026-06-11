# SyncNote — Backend

This directory contains the SyncNote backend (Node + Express + Prisma). It provides the REST API and database models used by the frontend apps.

## Tech stack

- Node.js (ES modules)
- Express
- Prisma (SQLite by default in `prisma/schema.prisma`)
- pnpm (recommended) / npm
- Jest for tests

## Quick setup

Prerequisites:

- Node.js 18+ (or a supported LTS)
- `pnpm` (recommended) or `npm`

1. Install dependencies

```bash
# from repository root or inside backend/
pnpm install
# or
npm install
```

2. Environment

Create a `.env` file in the `backend/` folder (or set env vars in your environment). Example `.env`:

```env
# For sqlite (default prisma schema)
DATABASE_URL="file:./dev.db"

# Example secrets for JWT and other services
JWT_SECRET=your_jwt_secret_here
```

3. Prisma: generate client & apply schema

```bash
# generate prisma client
pnpm run prisma:generate

# push schema (creates sqlite file) or run migrations
pnpm run db:push
# or (if you prefer migrations)
pnpm run db:migrate

# open prisma studio
pnpm run db:studio
```

4. Run the server

```bash
pnpm run dev   # development with node --watch
# or
pnpm start     # start production (node server.js)
```

5. Tests

```bash
pnpm test
```

## Useful scripts (from `package.json`)

- `dev` — Run server in watch mode
- `start` — Run server
- `test` — Run tests (Jest)
- `db:push` — Push Prisma schema to DB (no-migrate)
- `db:migrate` — Run Prisma migrations
- `db:seed` — Run `prisma/seed.js` (if present)
- `db:studio` — Open Prisma Studio

## Project structure (important files)

- `src/` — application source code (controllers, routes, services)
- `prisma/schema.prisma` — Prisma schema for models
- `prisma/seed.js` — optional seed script
- `server.js` — app entrypoint (production start)
- `package.json` — scripts and dependencies

## Notes & conventions

- This repo uses ES modules (`"type": "module"`). Use `import` syntax.
- Prisma client is imported from `@prisma/client` and initialized in `src/config/db.ts`.
- By default the schema uses SQLite (`provider = "sqlite"`) for simple local development — you can change `DATABASE_URL` to point to Postgres or MySQL when ready.

## Contributing

- Follow existing code style and patterns found in `src/`.
- Add unit tests for business logic where practical.

If you want, I can also:

- Split this monorepo's `backend` into its own Git repository (preserving history) and push to GitHub.
- Create a minimal GitHub Actions workflow to run tests and Prisma commands.

---

Created/updated by the assistant to help onboard developers to the backend.
