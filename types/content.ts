export interface BaseSchema {
  title: string
  description: string
  imgUrl: string
  createdAt: string
  slug: string
  id: string
}

export interface Post extends BaseSchema {
  author: string
  collection: string
  collectionSlug: string
  categories: string[]
  dateFormatted: string
  published: boolean
}

export interface Author extends BaseSchema {
  avatarUrl: string
}

export interface Tag extends BaseSchema {
  seoTitle: string
}

export interface Audio extends BaseSchema {
  urlSourceAudio: string
  duration: string
  dateFormatted: string
}

export interface Pdf extends BaseSchema {
  author: string
  categories: string[]
  fileUrl: string
  fileSize: string
}

// Respostas de API
export interface HomeResponse {
  posts: Array<Pick<Post, 'id' | 'slug' | 'imgUrl' | 'title' | 'description' | 'createdAt'>>
  collections: Array<{
    name: string
    slug: string
    imgUrl: string
    authors: string[]
    count: number
  }>
}

export type PostsResponse = Array<Pick<Post, 'id' | 'title' | 'description' | 'imgUrl' | 'slug' | 'createdAt'>>
export type AuthorsResponse = Array<Pick<Author, 'id' | 'title' | 'description' | 'imgUrl' | 'slug' | 'createdAt'>>
export type AudiosResponse = Array<Pick<Audio, 'id' | 'title' | 'imgUrl' | 'slug' | 'description' | 'duration' | 'createdAt' | 'dateFormatted' | 'urlSourceAudio'>>
export type PdfsResponse = Array<Pdf>

export interface SinglePostResponse {
  post: Post
  author: Author | null
  surroundings: any[]
  related: Post[]
}

export interface SingleAuthorResponse {
  author: Author
  posts: Post[]
}

export interface TagResponse {
  tag: Tag
  posts: Post[]
}
