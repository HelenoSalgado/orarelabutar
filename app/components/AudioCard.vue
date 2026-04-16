<template>
  <article class="preview-card audio-card">
    <NuxtLink :to="'/audios/' + slug" class="preview-image-link">
      <NuxtImg 
        :src="imgUrl" 
        :alt="title" 
        class="preview-img" 
        preset="card" 
        sizes="xs:100vw sm:100vw md:400px"
        loading="lazy" 
        decoding="async" 
      />
      <div v-if="duration" class="audio-duration">
        <span>{{ duration }}</span>
      </div>
    </NuxtLink>
    <div class="preview-content">
      <h2 class="preview-title">
        <NuxtLink :to="'/audios/' + slug">{{ title }}</NuxtLink>
      </h2>
      <p class="preview-desc">{{ description }}</p>
      <div class="preview-footer">
        <NuxtLink :to="'/audios/' + slug" class="play-link">Ouvir áudio &rang;</NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  slug: string
  imgUrl?: string
  duration?: string
}>()
</script>

<style scoped>
.audio-duration {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
