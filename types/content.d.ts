import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface Author extends ParsedContent {
  name: string
  imgUrl: string
  avatarUrl: string
  biograpy: string
  slug: string
  createdAt: string
}

export interface Post extends ParsedContent {
  title: string
  description: string
  imgURL: string
  authorSlug: string
  slug: string
  categories: string[]
  createdAt: string
  updatedAt: string
}

export interface Category extends ParsedContent {
  name: string
  description: string
}

export interface Collection extends ParsedContent {
  title: string
  author: string
  imgUrl: string
  slug: string
  postsSlugs: string[]
}
