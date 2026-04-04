import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  imgUrl: z.string().optional(),
  createdAt: z.string().optional(),
  slug: z.string().optional(), // Injetada dinamicamente via transformador
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
        collectionSlug: z.string().optional(), // Injetada via transformador
        categories: z.array(z.string()).optional(),
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
      schema: baseSchema
    }),
    sobre: defineCollection({
      type: 'page',
      source: 'sobre.md',
      schema: baseSchema
    })
  }
})
