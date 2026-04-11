import type { NitroConfig } from 'nitropack'

export default {
  preset: 'cloudflare-pages',
  hooks: {
    'prerender:generate'(route) {
      const routesToSkip = ['/index.html', '/200.html', '/404.html', '_redirects']
      if (routesToSkip.includes(route.route)) {
        route.skip = true
      }
    }
  },
  output: {
    publicDir: 'dist',
  },
  minify: true,
  prerender: {
    crawlLinks: true,
    routes: ['/', '/sobre', '/manuscritos', '/autores', '/colecoes', '/temas', '/audios', '/livros', '/links-uteis', '/sitemap.xml', '/robots.txt'],
    ignore: [
      '__nuxt_content/home/sql_dump.txt',
      '__nuxt_content/posts/sql_dump.txt',
      '__nuxt_content/sobre/sql_dump.txt'
    ],
    concurrency: 3,
    failOnError: false,
    autoSubfolderIndex: true
  },
  cloudflare: {
    nodeCompat: true,
    pages: {
      routes: ['/', '/sobre', '/manuscritos', '/autores', '/colecoes', '/temas', '/audios', '/livros', '/links-uteis']
    },
    wrangler: {
      minify: true,
      compatibility_date: '2026-04-09',
      compatibility_flags: ['nodejs_compat']
    }
  },
  static: true,
  compressPublicAssets: true,
  routeRules: {
    // Aplica trailingSlash apenas em caminhos sem ponto (evita arquivos estáticos)
    '/**': {
      trailingSlash: true
    },
    // Regras específicas para ignorar a regra global em arquivos estáticos comuns
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
    // external: ['better-sqlite3', 'sharp']
  }
} as NitroConfig
