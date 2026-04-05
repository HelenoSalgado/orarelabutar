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
      
      <div class="audio-header">
        <h1 class="audio-title">{{ audio.title }}</h1>
        <p v-if="audio.createdAt" class="audio-date">
          <IconsCalendar class="icon-calendar" />
          {{ audio.dateFormatted || audio.createdAt }}
        </p>
      </div>
      
      <div class="audio-player-container">
        <AudioPlayer :src="audio.urlSourceAudio" :img-url="audio.imgUrl" />
      </div>
      
      <div class="audio-content">
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
.loading-container, .error-container {
  text-align: center;
  padding: var(--space-xl) 0;
  font-style: italic;
  color: var(--color-ink-muted);
}

.back-link {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin: var(--space-md) 0;
  color: var(--color-gold);
  font-weight: bold;
  text-decoration: none;
}

.icon-back {
  width: 18px;
  height: 18px;
}

.audio-header {
  margin-bottom: var(--space-lg);
  text-align: left; /* Alinhamento start */
}

.audio-title {
  font-size: 2.5rem;
  color: var(--color-ink);
  line-height: 1.2;
  margin-bottom: var(--space-xs);
  text-align: left;
}

.audio-date {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: var(--color-ink-muted);
  font-style: italic;
  text-align: left;
}

.icon-calendar {
  width: 16px;
  height: 16px;
}

.audio-player-container {
  margin-bottom: var(--space-xl);
  display: flex;
  justify-content: center;
}

.audio-content {
  margin-bottom: var(--space-xl);
}

.audio-description {
  font-size: 1.3rem;
  font-style: italic;
  color: var(--color-ink-muted);
  margin-bottom: var(--space-lg);
  line-height: 1.6;
}

.article-body {
  width: 100%;
  font-size: 1.2rem;
  color: var(--color-ink);
  text-align: justify;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .audio-title {
    font-size: 2rem;
  }
}
</style>
