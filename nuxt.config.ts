// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'nuxt-svgo',
    '@nuxt/image',
    '@pinia/nuxt',
    'nuxt-mongoose',
    '@nuxt/icon',
    '@nuxt/fonts',
    'nuxt-swiper',
    // '@sidebase/nuxt-auth'
  ],
  fonts: {
    families: [
      {
        name: 'Plus Jakarta Sans',
        weights: [400, 500, 600, 700],
        provider: 'google'
      },
      {
        name: 'Space Grotesk',
        weights: [500, 700],
        provider: 'google'
      }
    ]
  },
  css: [
    '@/assets/css/main.css'
  ],
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    public: {
      apiBaseUrl: ''
    },
    // google: {
    //   clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET
    // },
    // auth: {
    //   secret: process.env.NUXT_AUTH_SECRET
    // }
  },
  image: {
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    provider: 'ipx',
  },
  // auth: {
  //   baseURL: process.env.NUXT_PUBLIC_SITE_URL,
  //   provider: {
  //     type: 'authjs'
  //   }
  // }
})