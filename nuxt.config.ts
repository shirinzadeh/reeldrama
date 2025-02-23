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
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    provider: 'ipx',
    preload: true,
    domains: ['usc1.contabostorage.com'],
    densities: [1, 2]
  },

  i18n: {
    baseUrl: process.env.NODE_ENV === 'production' 
      ? process.env.NUXT_PUBLIC_SITE_URL 
      : 'http://localhost:3000',
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
        file: 'en.json',
        isActive: true
      },
      {
        code: 'tr',
        // iso: 'tr-TR',
        name: 'Turkish',
        native: 'Türkçe',
        file: 'tr.json',
        isActive: true
      },
      {
        code: 'ar',
        // iso: 'ar-SA',
        native: 'العربية',
        name: 'Arabic',
        file: 'ar.json',
        isActive: false  // Set to false to hide from dropdown
      }
    ],
    vueI18n: './i18n.config.ts',
  },

  auth: {
    provider: {
      type: 'authjs',
    },
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

  nitro: {
    serverAssets: [{
      baseName: 'database',
      dir: './server/utils'
    }],
    // Add route rules for caching
    routeRules: {
      // Cache static pages
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      },
      '/api/auth/**': {
        cache: false,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      },
      // Cache static assets longer
      '/images/**': { 
        swr: true,
        headers: {
          'cache-control': 'public, max-age=31536000, immutable'
        }
      },
      '/api/languages': {
        cache: {
          maxAge: 60 * 60, // Cache for 1 hour since language data rarely changes
          staleMaxAge: 60 * 60 * 24 // Allow stale content for up to a day
        }
      },
      '/api/movies': {
        cache: {
          maxAge: 60 * 5, // Cache for 5 minutes
          staleMaxAge: 60 * 60 // Allow stale content for up to an hour
        }
      },
      '/api/movies/**': {
        cache: {
          maxAge: 60 * 5, // Cache for 5 minutes
          staleMaxAge: 60 * 60 // Allow stale content for up to an hour
        }
      },
      '/api/episodes/**': {
        cache: {
          maxAge: 60 * 5 // Cache for 5 minutes
        }
      },
      '/api/auth/me': {
        cache: false // Never cache user data
      },
      '/api/packages': {
        cache: {
          maxAge: 60 * 15, // Cache for 15 minutes
          staleMaxAge: 60 * 60 // Allow stale content for up to an hour
        }
      },
      '/api/history/**': {
        cache: false,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      },
      // Static routes with long cache
      '/': { 
        swr: true,
        cache: {
          maxAge: 60 * 60 // 1 hour
        }
      },
      '/movies': {
        swr: true,
        cache: {
          maxAge: 60 * 30 // 30 minutes
        }
      },
      '/episodes/**': { 
        swr: true,
        cache: {
          maxAge: 60 * 15 // 15 minutes
        }
      },
      '/_nuxt/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable'
        }
      }
    },
    // Add compression
    compressPublicAssets: true,
    
    // Add minification
    minify: true
  },

  // Add module optimization
  experimental: {
    payloadExtraction: true,
    treeshakeClientOnly: true,
    componentIslands: true
  },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'dns-prefetch', href: '//usc1.contabostorage.com' },
        { rel: 'preconnect', href: '//usc1.contabostorage.com' }
      ]
    },
  }
})