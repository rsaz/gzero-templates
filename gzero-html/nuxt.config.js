export default defineNuxtConfig({
  nitro: { preset: 'static'},
  ssr: false,
  compatibilityDate: '2026-06-26',
  css: ['~/assets/css/styles.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
      ],
    },
  },
})
