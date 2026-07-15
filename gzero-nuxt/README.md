# Northstar dashboard

A responsive, fully server-rendered business dashboard built with Nuxt 4.4.8.

## Development

```bash
yarn install
yarn dev
```

Open `http://localhost:3000`.

## Production

```bash
yarn build
node .output/server/index.mjs
```

The project uses Nuxt's Node server preset. Dashboard data is returned by
`server/api/dashboard.get.ts` and fetched during SSR, then serialized into the
page payload for hydration.

## Checks

```bash
yarn typecheck
yarn build
```
