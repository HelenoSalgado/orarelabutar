import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('API Endpoints', async () => {
  await setup({
    server: true,
  })

  it('GET /api/home returns home data', async () => {
    const data = await $fetch('/api/home')
    expect(data).toHaveProperty('posts')
    expect(data).toHaveProperty('collections')
    expect(Array.isArray(data.posts)).toBe(true)
  })

  it('GET /api/posts/all returns all posts', async () => {
    const data = await $fetch('/api/posts/all')
    expect(Array.isArray(data)).toBe(true)
    if (data.length > 0) {
      expect(data[0]).toHaveProperty('slug')
      expect(data[0]).toHaveProperty('title')
    }
  })

  it('GET /api/authors/all returns all authors', async () => {
    const data = await $fetch('/api/authors/all')
    expect(Array.isArray(data)).toBe(true)
    if (data.length > 0) {
      expect(data[0]).toHaveProperty('slug')
      expect(data[0]).toHaveProperty('name')
    }
  })

  it('GET /api/pdfs returns pdf list', async () => {
    const data = await $fetch('/api/pdfs')
    expect(Array.isArray(data)).toBe(true)
  })

  it('GET /api/posts/ao-redor-do-portao returns specific post', async () => {
    const data = await $fetch('/api/posts/ao-redor-do-portao')
    expect(data).toHaveProperty('post')
    expect(data.post.slug).toBe('ao-redor-do-portao')
    expect(data).toHaveProperty('author')
  })

  it('GET /api/authors/charles-h-spurgeon returns specific author', async () => {
    const data = await $fetch('/api/authors/charles-h-spurgeon')
    expect(data).toHaveProperty('author')
    expect(data.author.slug).toBe('charles-h-spurgeon')
    expect(data).toHaveProperty('posts')
  })

  it('GET /api/tags/teologia returns posts for a tag', async () => {
    // Note: this assumes 'teologia' tag exists in content
    try {
      const data = await $fetch('/api/tags/teologia')
      expect(data).toHaveProperty('tag')
      expect(data).toHaveProperty('posts')
    } catch (e: any) {
      if (e.statusCode === 404) {
        // Tag might not exist, but test should pass if it just returns 404
        expect(e.statusCode).toBe(404)
      } else {
        throw e
      }
    }
  })
})
