import { defineTransformer } from '@nuxt/content'

export default defineTransformer({
    name: 'default-images',
    extensions: ['.md'],
    async transform(file) {
        // Se já tiver uma imgUrl definida, não faz nada
        if (file.imgUrl && file.imgUrl !== '') {
            return file
        }
        const slug = file.slug

        if(slug) file.imgUrl = `ai/${slug}.png`
        
        return file
    }
})
