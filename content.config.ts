import { defineContentConfig, defineCollection, z } from '@nuxt/content'

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
      source: 'posts/**/*.md',
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
      source: 'authors/**/*.md',
      schema: baseSchema.extend({
        avatarUrl: z.string().optional(),
      })
    }),
    tags: defineCollection({
      type: 'page',
      source: 'tags/*.md',
      schema: baseSchema.extend({
        seoTitle: z.string().optional()
      })
    }),
    sobre: defineCollection({
      type: 'page',
      source: 'sobre.md',
      schema: baseSchema
    }),
    audios: defineCollection({
      type: 'page',
      source: 'audios/**/*.md',
      schema: baseSchema.extend({
        urlSourceAudio: z.string(),
        duration: z.string(),
        dateFormatted: z.string()
      })
    }),
    pdfs: defineCollection({
      type: 'page',
      source: 'pdfs/**/*.md',
      schema: baseSchema.extend({
        author: z.string(),
        categories: z.array(z.string()).default([]),
        fileUrl: z.string(),
        fileSize: z.string().optional(),
      })
    })
  }
})
