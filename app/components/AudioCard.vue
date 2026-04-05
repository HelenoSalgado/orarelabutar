<template>
  <article class="audio-card">
    <NuxtLink :to="'/audios/' + slug" class="preview-image-link">
      <NuxtImg :src="imgUrl" :alt="title" class="preview-img" preset="card" />
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
.audio-card {
  display: flex;
  flex-direction: column;
  column-gap: var(--space-xs);
  row-gap: var(--space-sm);
  margin-bottom: var(--space-xl);
  align-items: flex-start;
  text-align: left;
}

.preview-image-link {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px var(--color-shadow);
}

.preview-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  filter: brightness(0.95);
  transition: transform var(--transition-slow);
}

.audio-card:hover .preview-img {
  transform: scale(1.05);
}

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

.preview-content {
  width: 100%;
}

.preview-title {
  font-size: 1.6rem;
  margin: 0 0 var(--space-xs) 0;
  text-align: left;
}

.preview-title a {
  color: var(--color-ink);
  border: none;
}

.preview-title a:hover {
  color: var(--color-gold);
}

.preview-desc {
  font-size: 1.2rem;
  color: var(--color-ink-muted);
  line-height: 1.5;
  margin-bottom: var(--space-sm);
}

.preview-footer {
  display: flex;
  justify-content: flex-start;
}

.play-link {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: bold;
  color: var(--color-gold);
}

@media (max-width: 600px) {
  .preview-img {
    height: 180px;
  }
}
</style>
