import type { NitroConfig } from 'nitropack'

export default {
  preset: 'cloudflare-pages',
  output: {
    publicDir: 'dist',
  },
  minify: true,
  prerender: {
    crawlLinks: true,
    routes: ['/'],
    ignore: [
      '__nuxt_content/home/sql_dump.txt',
      '__nuxt_content/posts/sql_dump.txt',
      '__nuxt_content/sobre/sql_dump.txt'
    ],
    concurrency: 3,
    failOnError: false
  },
  compressPublicAssets: true,
  routeRules: {
    '/**': {
      trailingSlash: false
    }
  },
  esbuild: { 
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
    external: ['better-sqlite3', 'sharp']
  }
} as NitroConfig
