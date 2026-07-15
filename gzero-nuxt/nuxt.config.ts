export default defineNuxtConfig({
  compatibilityDate: '2026-07-11',
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#f4f5f7' }
      ],
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
    }
  },
  css: ['~/assets/css/main.css'],
  typescript: { typeCheck: true },
  nitro: { preset: 'node-server' }
})
