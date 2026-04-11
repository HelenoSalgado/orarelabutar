<template>
  <main>
    <div v-if="pending" class="loading-container">
      Carregando áudio...
    </div>

    <div v-else-if="error" class="error-container">
      Áudio não encontrado.
      <NuxtLink to="/audios" class="back-link">Voltar para a lista</NuxtLink>
    </div>

    <div v-else-if="audio" class="audio-detail">
      <NuxtLink to="/audios" class="back-link">
        <IconsArrowLeft class="icon-back" />
        Voltar para a lista
      </NuxtLink>

      <div class="detail-header">
        <h1 class="detail-title">{{ audio.title }}</h1>
        <p v-if="audio.createdAt" class="detail-meta">
          <IconsCalendar class="icon-calendar" />
          {{ audio.dateFormatted || audio.createdAt }}
        </p>
      </div>

      <div class="detail-media-container">
        <LazyAudioPlayer :src="audio.urlSourceAudio" :img-url="audio.imgUrl" />
      </div>

      <div class="detail-content">
        <p class="audio-description">{{ audio.description }}</p>
        <ContentRenderer :value="audio" class="article-body" />
      </div>

      <hr>

      <SocialShare
        :slug="'audios/' + audio.slug"
        :description="audio.description"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const slug = route.params.slug as string;

const { data: audio, pending, error } = await useFetch(`/api/audios/${slug}`);

watchEffect(() => {
  if (audio.value) {
    useSeoMeta({
      title: audio.value.title,
      description: audio.value.description,
      ogDescription: audio.value.description,
      ogImage: () => audio.value?.imgUrl ? `${config.public.site.url}${audio.value.imgUrl}` : `${config.public.site.url}/img/podcast.jpg`,
      twitterDescription: audio.value.description,
      twitterImage: () => audio.value?.imgUrl ? `${config.public.site.url}${audio.value.imgUrl}` : `${config.public.site.url}/img/podcast.jpg`,
    });
  }
});

definePageMeta({
  title: 'Áudio'
})
</script>

<style scoped>
.audio-description {
  font-size: 1.3rem;
  font-style: italic;
  color: var(--color-ink-muted);
  margin-bottom: var(--space-lg);
  line-height: 1.6;
}

.icon-calendar {
  width: 16px;
  height: 16px;
}

@media (max-width: 600px) {
  .detail-title {
    font-size: 2rem;
  }
}
</style>
