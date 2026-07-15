# GZERO API Fastify

A production-minded TypeScript API with one endpoint, built on Fastify 5.

```sh
yarn install
yarn dev
curl http://localhost:3000/health
```

`GET /health` returns HTTP 200 with service identity, an ISO timestamp, process uptime, and the Node.js runtime version. Responses include `Cache-Control: no-store` and an `X-Request-Id`; an incoming request ID is preserved. Unknown routes return a consistent JSON 404.

Set `HOST` and `PORT` to change the listener. `PORT` defaults to `3000` and is validated at startup.

| Command | Purpose |
| --- | --- |
| `yarn dev` | Start with watch-mode reloads |
| `yarn test` | Run endpoint tests with Fastify injection |
| `yarn typecheck` | Check TypeScript |
| `yarn build` | Compile to `dist/` |
| `yarn start` | Run the compiled server |
| `yarn validate` | Typecheck, test, and build |

Build and run the container with `docker build -t gzero-api-fastify .` and `docker run --rm -p 3000:3000 gzero-api-fastify`.
