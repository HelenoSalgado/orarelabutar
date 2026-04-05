import { defineNuxtConfig } from "nuxt/config";
import nitro from "./server/nitro";
import { theme } from "./utils/theme";

export default defineNuxtConfig({
  compatibilityDate: "2026-04-04",

  experimental: {
    extractAsyncDataHandlers: true,
    sharedPrerenderData: true,
    renderJsonPayloads: true,
    entryImportMap: false,
    asyncContext: true,
    lazyHydration: true,
    defaults: {
      nuxtLink: {
        prefetchOn: {
          interaction: true
        }
      }
    },
    buildCache: true,
    viteEnvironmentApi: true
  },

  features: {
    inlineStyles: false
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
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'manifest', href: '/pwa/manifest.webmanifest', type: 'application/manifest+json' },
        {
          rel: 'preload',
          href: '/fonts/gfs-didot/GFSDidot-Regular.ttf',
          type: 'font/ttf',
          as: 'font',
          crossorigin: 'anonymous'
        }
      ],
      script: [
        {
          innerHTML: theme,
          type: 'text/javascript'
        }
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
    name: 'Orar e Labutar'
  },

  sitemap: {
    sitemapName: "sitemap.xml",
    autoLastmod: true,
    zeroRuntime: true
  },

  css: ['~/assets/css/global.css'],

  vite: {
    optimizeDeps: {
      include: ['vue'],
      exclude: ['@nuxt/content']
    },

    build: {
      // Mantém true para code splitting de CSS por rota (reaproveitamento de estilos já baixados)
      cssCodeSplit: false,

      // Gera um manifesto para análise de bundle
      manifest: false,

      // Reduz tamanho do bundle
      minify: 'esbuild',

      // Remove comentários e sourcemaps em produção
      sourcemap: false,

      // Otimizações de performance
      target: 'esnext',

      // Controla tamanho dos chunks para melhor caching
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        cache: true,
        output: {
          compact: true,
          inlineDynamicImports: true,
          sourcemap: false
        }
      }
    }
  },

  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxtjs/sitemap"
  ],

  content: {
    renderer: {
      anchorLinks: true,
    },
    build: {
      transformers: [
        '~~/transformers/slugify-title.ts',
        '~~/transformers/audio-source.ts',
        '~~/transformers/slugify-collection.ts',
        '~~/transformers/date-published.ts',
        '~~/transformers/default-images.ts'
      ]
    }
  },

  image: {
    provider: 'ipxStatic',
    domains: ['orarelabutar.com'],
    format: ['webp'],
    presets: {
      avatar: {
        modifiers: { width: 60, height: 60 }
      },
      card: {
        modifiers: {
          width: 400,
          height: 300,
          fit: 'cover',
          quality: 80
        }
      }
    },
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280
    }
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
