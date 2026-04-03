<template>
    <div class="sacred-collection-card">
      <NuxtLink :href="'/collection/'+slug" class="collection-link">
        <NuxtImg :src="'/img/'+imgUrl" :alt="title" loading="lazy" width="300" height="300" class="collection-img"/>
        <div class="collection-info">
          <h3 class="collection-title">{{ title }}</h3>
          <p class="collection-author">Compilado por {{ author }}</p>
          <span class="collection-count">{{ count }} manuscritos</span>
        </div> 
      </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const { title, imgUrl, author, slug, count } = defineProps(['title', 'imgUrl', 'slug', 'author', 'count']);
</script>

<style scoped>
.sacred-collection-card {
    width: 100%;
    max-width: 320px;
    margin: var(--space-sm);
    transition: transform var(--transition-base);
}

.sacred-collection-card:hover {
    transform: translateY(-5px);
}

.collection-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: var(--color-ink);
}

.collection-img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border: 1px solid var(--color-gold);
    padding: 5px;
    border-radius: 50%; /* Coleções com formato circular clássico */
    filter: sepia(0.2);
}

.collection-info {
    margin-top: var(--space-md);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.collection-title {
    font-size: 1.2rem;
    margin: 0 0 var(--space-xs) 0;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
}

.collection-author {
    font-size: 0.9rem;
    font-style: italic;
    opacity: 0.7;
    margin: 0;
}

.collection-count {
    margin-top: var(--space-sm);
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--color-gold);
    font-weight: bold;
    letter-spacing: 0.1rem;
}
</style>
