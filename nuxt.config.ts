export default defineNuxtConfig({
  ssr: true,
  app: {
    pageTransition: false,
    layoutTransition: false,
    head: {
      base: {
        href: process.env.BASE_URL
      },
      htmlAttrs: {
        lang: 'pt-BR'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'theme-color',
          content: '#161616'
        }
      ],
      link: [
        {
          rel: 'manifest',
          href: '/pwa/manifest.webmanifest',
          type: 'application/manifest+json'
        }
      ]
    }
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    },
    output: {
      publicDir: 'dist',
    },
    baseURL: process.env.NUXT_APP_BASE_URL,
    minify: true
  },
  experimental: {
    appManifest: false,
    payloadExtraction: true
  },
  css: ['~/assets/css/global.css'],
  devtools: {
     enabled: false
  },
  modules: ['@nuxt/content' , '@nuxt/image'],
  content: {
    build: {
      transformers: [
        '~/transformers/date-format.ts'
      ]
    }
  },
  image: {
    format: ['webp'],
    presets: {
      avatar: {
        modifiers: {
          width: 60,
          height: 60
        }
      },
      screens: {
        'xs': 320,
        'sm': 640,
        'md': 768,
        'lg': 1024,
        'xl': 1280,
        'xxl': 1536,
        '2xl': 1536
      }
    }
  }
})