# GZERO templates

A Yarn 1 monorepo containing standalone application templates for several frontend frameworks and rendering modes.

| Workspace | Stack | Output |
| --- | --- | --- |
| `gzero-astro-ssr` | Astro + Node adapter | SSR |
| `gzero-html` | Nuxt | Static generation |
| `gzero-nuxt` | Nuxt | SSR or static generation |
| `gzero-static` | HTML, CSS, and JavaScript | Static |
| `gzero-svelte-ssr` | SvelteKit + Node adapter | SSR |
| `gzero-test-ssr` | Next.js | SSR |
| `gzero-vue-vite` | Vue + Vite | Static SPA |

Each workspace keeps its own lockfile and can be installed, developed, and deployed independently. From the repository root, Yarn also recognizes every `gzero-*` directory as a workspace.

## Commands

Install dependencies for a single template:

```sh
yarn --cwd gzero-astro-ssr install
```

Run a single template:

```sh
yarn --cwd gzero-astro-ssr dev
```

Build all templates with their currently installed dependencies:

```sh
yarn build
```

Run the TypeScript checks exposed by the Nuxt and Next.js templates:

```sh
yarn typecheck
```

