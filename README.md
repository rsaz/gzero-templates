# GZERO templates

A Yarn 1 monorepo containing standalone frontend and Node.js API templates.

| Workspace | Stack | Output |
| --- | --- | --- |
| `gzero-api-express` | Express 5 + TypeScript | Node.js API |
| `gzero-api-fastify` | Fastify 5 + TypeScript | Node.js API |
| `gzero-api-hono` | Hono + TypeScript | Node.js API |
| `gzero-api-koa` | Koa 3 + TypeScript | Node.js API |
| `gzero-api-nestjs` | NestJS 11 + TypeScript | Node.js API |
| `gzero-astro-ssr` | Astro + Node adapter | SSR |
| `gzero-html` | Nuxt | Static generation |
| `gzero-nuxt` | Nuxt | SSR or static generation |
| `gzero-static` | HTML, CSS, and JavaScript | Static |
| `gzero-svelte-ssr` | SvelteKit + Node adapter | SSR |
| `gzero-test-ssr` | Next.js | SSR |
| `gzero-vue-vite` | Vue + Vite | Static SPA |

Each workspace keeps its own lockfile and can be installed, developed, and deployed independently. From the repository root, Yarn also recognizes every `gzero-*` directory as a workspace.

Every API template exposes the same single `GET /health` endpoint and includes strict TypeScript, endpoint tests, validated configuration, request IDs, graceful shutdown, a multi-stage Dockerfile, and standalone documentation.

## Commands

Install dependencies for a single template:

```sh
yarn --cwd gzero-astro-ssr install
```

Run a single template:

```sh
yarn --cwd gzero-astro-ssr dev
```

Run one API and check its health:

```sh
yarn --cwd gzero-api-fastify dev
curl http://localhost:3000/health
```

Build all templates with their currently installed dependencies:

```sh
yarn build
```

Run the TypeScript checks exposed by the Nuxt and Next.js templates:

```sh
yarn typecheck
```

Typecheck, test, and build all five API templates:

```sh
yarn validate:apis
```
