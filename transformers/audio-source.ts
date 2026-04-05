import { defineTransformer } from '@nuxt/content'

export default defineTransformer({
  name: 'audio-source',
  extensions: ['.md'],
  transform(file) {
    // Apenas aplica para arquivos na pasta 'audios'
    if (file.id && file.id.includes('audios')) {
      if (file.slug && !file.urlSourceAudio) {
        file.urlSourceAudio = `/audio/${file.slug}.mp3`
      }
    }
    return file
  }
})
