import { defineNuxtConfig } from "nuxt/config";
import nitro from "./server/nitro";
//import { cloudflare } from "@cloudflare/vite-plugin";
import type { NuxtLiteOptions } from './nuxt-lite/src';

export default defineNuxtConfig({
  compatibilityDate: "2026-04-09",

  typescript: {
    typeCheck: true,
    builder: 'vite',
    strict: true
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
        { name: 'theme-color', content: '#161616' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'index, follow' },
        { name: 'apple-mobile-web-app-title', content: 'Orar e Labutar' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // { 
        //   rel: 'manifest', 
        //   href: '/pwa/manifest.webmanifest', 
        //   type: 'application/manifest+json',
        //   crossorigin: 'use-credentials'
        // },
        {
          rel: 'preload',
          href: '/fonts/gfs-didot/GFSDidot-Regular.ttf',
          type: 'font/ttf',
          as: 'font',
          crossorigin: 'anonymous'
        }
      ],
      script: [
        { src: '/js/header.js', defer: true }
      ]
    }
  },

  nitro,

  runtimeConfig: {
    public: {
      site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || 'https://orarelabutar.com',
      }
    }
  },

  site: {
    url: 'https://orarelabutar.com',
    name: 'Orar e Labutar',
    indexable: true
  },

  sitemap: {
    sitemapName: "sitemap.xml",
    autoLastmod: true,
    zeroRuntime: true
  },

  css: ['~/assets/css/global.css'],

  experimental: {
    extractAsyncDataHandlers: true,
    sharedPrerenderData: true,
    entryImportMap: false,
    asyncContext: true,
    lazyHydration: true,
    payloadExtraction: 'client',
    asyncEntry: true,
    defaults: {
      nuxtLink: {
        prefetchOn: {
          interaction: true
        },
        trailingSlash: 'append'
      }
    },
    buildCache: true,
    viteEnvironmentApi: true,
    clientNodeCompat: true
  },

  sourcemap: false,

  telemetry: false,

  vite: {
    build: {
      sourcemap: false,
      minify: false,
      modulePreload: false,
      cssMinify: false,
      target: 'esnext'
    }
  },

  modules: [
    "./nuxt-lite/src/module",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxtjs/sitemap",
    "@nuxtjs/color-mode"
  ],

  nuxtLite: {
    cleanHtml: true,
    payloadExtraction: true,
    hydration: true,
    prefetchRoutes: true,
    optimizeCss: 'file',
    stripAttributes: ['data-v-', '__vue_ssr__', 'data-server-rendered']
  } as NuxtLiteOptions,

  colorMode: {
    classSuffix: '',
    preference: 'light',
    storageKey: 'ol-color-mode',
    fallback: 'dark',
    storage: 'cookie'
  },

  content: {
    renderer: {
      anchorLinks: true,
    },
    build: {
      transformers: [
        '~~/transformers/slugify-title.ts',
        '~~/transformers/audio-source.ts',
        '~~/transformers/pdf-source.ts',
        '~~/transformers/slugify-collection.ts',
        '~~/transformers/date-published.ts',
        '~~/transformers/default-images.ts'
      ]
    }
  },

  image: {
    provider: 'ipxStatic',
    domains: ['orarelabutar.com'],
    format: ['avif', 'webp'],
    presets: {
      avatar: {
        modifiers: { width: 60, height: 60, quality: 80 }
      },
      card: {
        modifiers: {
          width: 400,
          height: 300,
          fit: 'cover',
          quality: 70
        }
      }
    },
    ipxStatic: {
      maxAge: 31536000
    },
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280
    }
  },

  routeRules: {
    '/img/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } }
  },

  dir: {
    public: 'public'
  },

  $development: {
    debug: false,
    devtools: {
      vueDevTools: false
    },
    image: {
      provider: 'none'
    }
  }

})
