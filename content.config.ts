import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        imgUrl: z.string().optional(),
        author: z.string(),
        collection: z.string().optional(),
        categories: z.array(z.string()).optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        dateFormatted: z.string(),
        slug: z.string(), // Injetada dinamicamente via transformador
        published: z.boolean()
      })
    }),
    authors: defineCollection({
      type: 'page',
      source: 'authors/**/*.md',
      schema: z.object({
        title: z.string(),
        imgUrl: z.string().optional(),
        avatarUrl: z.string().optional(),
        description: z.string().optional(),
        createdAt: z.string().optional(),
        slug: z.string().optional(), // Injetada dinamicamente via transformador
      })
    }),
    sobre: defineCollection({
      type: 'page',
      source: 'sobre.md',
      schema: z.object({
        title: z.string(),
        imgUrl: z.string().optional(),
        description: z.string().optional(),
        createdAt: z.string().optional(),
        slug: z.string().optional(), // Injetada dinamicamente via transformador
      })
    })
  }
})
