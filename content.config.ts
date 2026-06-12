import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const isDev = process.env.NODE_ENV === 'development'
const hasToken = !!process.env.GITHUB_TOKEN

// Use repository only in production/build to avoid local timeouts
const repository = (hasToken && !isDev) ? {
  url: 'https://github.com/HelenoSalgado/cms-orarelabutar',
  branch: process.env.CMS_BRANCH || 'master',
  auth: {
    token: process.env.GITHUB_TOKEN
  }
} : undefined

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  imgUrl: z.string(),
  createdAt: z.string(),
  slug: z.string()
})

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: repository ? {
        repository,
        include: 'content/posts/**/*.md',
        prefix: '/posts'
      } : 'posts/**/*.md',
      schema: baseSchema.extend({
        description: z.string(), // Torna obrigatório para posts
        author: z.string(),
        collection: z.string().optional(),
        collectionSlug: z.string(), // Injetada via transformador
        categories: z.array(z.string()).default([]),
        updatedAt: z.string().optional(),
        dateFormatted: z.string(),
        published: z.boolean()
      })
    }),
    authors: defineCollection({
      type: 'page',
      source: repository ? {
        repository,
        include: 'content/authors/**/*.md',
        prefix: '/authors'
      } : 'authors/**/*.md',
      schema: baseSchema.extend({
        avatarUrl: z.string().optional(),
      })
    }),
    tags: defineCollection({
      type: 'page',
      source: repository ? {
        repository,
        include: 'content/tags/*.md',
        prefix: '/tags'
      } : 'tags/*.md',
      schema: baseSchema.extend({
        seoTitle: z.string().optional()
      })
    }),
    sobre: defineCollection({
      type: 'page',
      source: repository ? {
        repository,
        include: 'content/sobre.md',
        prefix: '/'
      } : 'sobre.md',
      schema: baseSchema
    }),
    audios: defineCollection({
      type: 'page',
      source: repository ? {
        repository,
        include: 'content/audios/**/*.md',
        prefix: '/audios'
      } : 'audios/**/*.md',
      schema: baseSchema.extend({
        urlSourceAudio: z.string(),
        duration: z.string(),
        dateFormatted: z.string()
      })
    }),
    pdfs: defineCollection({
      type: 'page',
      source: repository ? {
        repository,
        include: 'content/pdfs/**/*.md',
        prefix: '/pdfs'
      } : 'pdfs/**/*.md',
      schema: baseSchema.extend({
        author: z.string(),
        categories: z.array(z.string()).default([]),
        fileUrl: z.string(),
        fileSize: z.string().optional(),
      })
    })
  }
})
