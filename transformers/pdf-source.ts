import { defineTransformer } from '@nuxt/content'

export default defineTransformer({
  name: 'pdf-source',
  extensions: ['.md'],
  transform(file) {
    // Apenas aplica para arquivos na pasta 'pdfs'
    if (file.id && file.id.includes('pdfs')) {
      if (file.slug) {
        if (!file.fileUrl) {
          file.fileUrl = `/pdfs/${file.slug}.pdf`
        }
        // Se não houver imagem definida, usa a capa gerada pelo script
        if (!file.imgUrl) {
          file.imgUrl = `/img/pdfs/capas/${file.slug}.webp`
        }
      }
    }
    return file
  }
})
