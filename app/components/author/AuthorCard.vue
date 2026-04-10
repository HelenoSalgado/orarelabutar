<template>
    <div class="sacred-author-card">
      <NuxtLink :to="'/autores/'+slug" class="author-link">
        <NuxtImg :src="'/img/'+imgUrl" :alt="title" loading="lazy" width="200" height="200" class="author-img"/>
        <div class="author-info">
          <h3 class="author-title">{{ title }}</h3>
          <p class="author-desc" v-if="description">{{ description }}</p>
          <span class="read-more">Ver Perfil &rang;</span>
        </div> 
      </NuxtLink>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    imgUrl: string;
    slug: string;
    description?: string;
}>();
</script>

<style scoped>
.sacred-author-card {
    width: 100%;
    max-width: 280px;
    transition: transform var(--transition-base);
}

.sacred-author-card:hover {
    transform: translateY(-5px);
}

.author-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: var(--color-ink);
}

.author-img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border: 1px solid var(--color-gold);
    padding: 5px;
    border-radius: 50%;
    filter: sepia(0.2);
}

.author-info {
    margin-top: var(--space-md);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.author-title {
    font-size: 1.2rem;
    margin: 0 0 var(--space-xs) 0;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
}

.author-desc {
    font-size: 0.95rem;
    color: var(--color-ink-muted);
    line-height: 1.4;
    margin-bottom: var(--space-sm);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 2.8rem;
}

.read-more {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--color-gold);
    font-weight: bold;
    letter-spacing: 0.1rem;
}
</style>
