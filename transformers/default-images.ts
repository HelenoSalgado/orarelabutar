import { defineTransformer } from '@nuxt/content'

export default defineTransformer({
    name: 'default-images',
    extensions: ['.md'],
    transform(file) {
        if (!file.imgUrl || file.imgUrl === '') {
            const id = file._id || ''
            
            if (id.includes('content:posts:')) {
                file.imgUrl = 'post.webp'
            } else if (id.includes('content:tags:')) {
                file.imgUrl = 'tag.webp'
            } else if (id.includes('content:authors:')) {
                file.imgUrl = 'author.webp'
            } else if (file._path === '/sobre') {
                file.imgUrl = 'sobre.webp'
            }
        }
        return file
    }
})
