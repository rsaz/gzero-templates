# GZERO templates

A monorepo containing standalone frontend, Node.js API, and Python dashboard templates.

| Workspace | Stack | Output |
| --- | --- | --- |
| `gzero-api-express` | Express 5 + TypeScript | Node.js API |
| `gzero-api-fastify` | Fastify 5 + TypeScript | Node.js API |
| `gzero-api-hono` | Hono + TypeScript | Node.js API |
| `gzero-api-koa` | Koa 3 + TypeScript | Node.js API |
| `gzero-api-nestjs` | NestJS 11 + TypeScript | Node.js API |
| `gzero-astro-ssr` | Astro + Node adapter | SSR |
| `gzero-django` | Django 5 (Python) | Server-rendered dashboard |
| `gzero-fastapi` | FastAPI + Jinja2 (Python) | Server-rendered dashboard + JSON API |
| `gzero-flask` | Flask 3 + Jinja2 (Python) | Server-rendered dashboard |
| `gzero-html` | Nuxt | Static generation |
| `gzero-nuxt` | Nuxt | SSR or static generation |
| `gzero-static` | HTML, CSS, and JavaScript | Static |
| `gzero-streamlit` | Streamlit (Python) | Interactive dashboard |
| `gzero-svelte-ssr` | SvelteKit + Node adapter | SSR |
| `gzero-test-ssr` | Next.js | SSR |
| `gzero-vue-vite` | Vue + Vite | Static SPA |

Each template keeps its own dependencies and can be installed, developed, and deployed independently. From the repository root, Yarn recognizes every `gzero-*` directory that has a `package.json` as a workspace; the Python templates stand alone.

Every API template exposes the same single `GET /health` endpoint and includes strict TypeScript, endpoint tests, validated configuration, request IDs, graceful shutdown, a multi-stage Dockerfile, and standalone documentation.

## Python dashboard templates

`gzero-flask`, `gzero-django`, `gzero-fastapi`, and `gzero-streamlit` each render the same revenue-operations dashboard — KPI tiles, a revenue-vs-target chart, an operating-pulse feed, and a searchable pipeline table — from a shared demo dataset. Each ships a `requirements.txt`, a `Dockerfile`, and a `GET /health` endpoint (Streamlit uses its built-in `/_stcore/health`), and listens on port `3000` by default.

```sh
cd gzero-flask            # or gzero-django, gzero-fastapi, gzero-streamlit
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python app.py             # see each template's README for the exact run command
```

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
