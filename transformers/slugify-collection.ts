import { defineTransformer } from '@nuxt/content'
import type { Post } from '../types/content'

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export default defineTransformer({
    name: 'slugify-collection',
    extensions: ['.md'],
    transform(file) {
        const post = file as unknown as Post
        if (post.collection && !post.collectionSlug) {
            post.collectionSlug = slugify(post.collection)
        }
        return file
    }
})
