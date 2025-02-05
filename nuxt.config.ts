// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-02-04',
  devtools: { enabled: true },

  modules: [
    'nuxt-svgo',
    '@nuxt/image',
    '@pinia/nuxt',
    'nuxt-mongoose',
    '@nuxt/icon',
    '@nuxt/fonts',
    'nuxt-swiper',
    '@sidebase/nuxt-auth',
    '@nuxtjs/i18n'
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

  i18n: {
    lazy: true,
    langDir: './locales',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'  // recommended,
    },
    locales: [
      {
        code: 'en',
        // iso: 'en-US',
        name: 'English',
        native: 'English',
        file: 'en.json'
      },
      {
        code: 'tr',
        // iso: 'tr-TR',
        name: 'Turkish',
        native: 'Türkçe',
        file: 'tr.json'
      },
      {
        code: 'ar',
        // iso: 'ar-SA',
        native: 'العربية',
        name: 'Arabic',
        file: 'ar.json'
      }
    ],
    vueI18n: './i18n.config.ts',
  },

  auth: {
    provider: {
      type: 'authjs',
    },
    // globalAppMiddleware: {
    //   allow404WithoutAuth: true,
    //   isEnabled: false
    // },
    baseURL: process.env.AUTH_ORIGIN,
    // originEnvKey: 'NUXT_AUTH_ORIGIN'
  },

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    // authOrigin: '',
    public: {
      apiBaseUrl: '',
      siteUrl: '',
    },
    auth: {
      secret: process.env.AUTH_SECRET,
    },
    // google: {
    //   clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET
    // }
  },

  // typescript: {
  //   strict: true,
  //   typeCheck: true
  // }
  nitro: {
    routeRules: {
      '/api/auth/**': {
        cache: {
          maxAge: 0,
          swr: false
        }
      }
    }
  },
})