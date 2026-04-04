import { defineTransformer } from '@nuxt/content'

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
        if (file.collection && !file.collectionSlug) {
            file.collectionSlug = slugify(file.collection)
        }
        return file
    }
})
