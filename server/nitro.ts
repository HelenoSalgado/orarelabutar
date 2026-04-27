import type { NitroConfig } from 'nitropack'

export default {
  preset: 'cloudflare_module',
  compatibilityDate: '2026-04-09',
  
  cloudflare: {
    deployConfig: true,
    nodeCompat: true,
    wrangler: {
      compatibility_date: '2026-04-09',
      compatibility_flags: ['nodejs_compat']
    }
  },

  hooks: {
    'prerender:generate'(route) {
      const routesToSkip = ['/index.html', '/200.html', '/404.html', '_redirects']
      if (routesToSkip.includes(route.route)) {
        route.skip = true
      }
    }
  },

  // output: {
  //   publicDir: 'dist',
  // },

  minify: true,

  prerender: {
    crawlLinks: true,
    routes: [
      '/', '/sobre', '/manuscritos', '/autores', '/colecoes', '/temas', 
      '/audios', '/livros', '/links-uteis', '/sitemap.xml', '/robots.txt'
    ],
    ignore: [
      '__nuxt_content/home/sql_dump.txt',
      '__nuxt_content/posts/sql_dump.txt',
      '__nuxt_content/sobre/sql_dump.txt'
    ],
    concurrency: 3,
    failOnError: false,
    autoSubfolderIndex: true
  },

  compressPublicAssets: true,

  routeRules: {
    '/**': {
      trailingSlash: true
    },
    '/css/**': { trailingSlash: false },
    '/img/**': { trailingSlash: false },
    '/_nuxt/**': { trailingSlash: false }
  },

  publicAssets: [
    {
      baseURL: '/',
      dir: 'public',
    }
  ],

  build: {
    options: {
      legalComments: 'none',
      treeShaking: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    }
  },

  externals: {
    inline: ['#internal/nitro'],
    external: ['cloudflare:email']
  }
} as NitroConfig
