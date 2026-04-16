<template>
  <main>
    <h1>
      <IconsMusic />
      <span>Áudios</span>
    </h1>

    <div v-if="pending" class="loading-container">
      Carregando áudios...
    </div>

    <div v-else-if="error" class="error-container">
      Ocorreu um erro ao carregar os áudios.
    </div>

    <div v-else-if="audios && audios.length > 0" class="audio-grid">
      <AudioCard v-for="audio in audios" :key="audio.id" :title="audio.title" :description="audio.description"
        :slug="audio.slug" :img-url="audio.imgUrl" :duration="audio.duration" />
    </div>

    <div v-else class="empty-container">
      Nenhum áudio encontrado.
    </div>

    <hr>

    <SocialShare slug="audios" description="Ouça nossa coleção de áudios e meditações sobre a fé cristã." />
  </main>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const { data: audios, pending, error } = await useFetch('/api/audios');

if (import.meta.server) {
  const title = 'Áudios e Meditações Cristãs';
  const description = 'Ouça nossa coleção de áudios, meditações e estudos teológicos para sua edificação e crescimento espiritual no Orar e Labutar.';
  useSeoMeta({
    title,
    ogTitle: title,
    twitterTitle: title,
    description,
    ogDescription: description,
    ogImage: () => `${config.public.site.url}/img/podcast.jpg`,
    twitterDescription: description,
    twitterImage: () => `${config.public.site.url}/img/podcast.jpg`,
  });
}

</script>
