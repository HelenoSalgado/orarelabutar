<template>
    <article class="manuscript-preview-start">
        <NuxtLink :to="slug" class="preview-image-link">
            <NuxtImg :src="'/img/ai/'+imgUrl" :alt="title" class="preview-img" preset="card" loading="lazy" decoding="async" />
        </NuxtLink>
        <div class="preview-content">
            <h2 class="preview-title">
                <NuxtLink :to="slug">{{ title }}</NuxtLink>
            </h2>
            <p class="preview-desc">{{ description }}</p>
            <div class="preview-footer">
                <NuxtLink :to="slug" class="read-more">Ler o manuscrito &rang;</NuxtLink>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
defineProps(['title', 'description', 'slug', 'imgUrl']);
</script>

<style scoped>
.manuscript-preview-start {
    display: flex;
    flex-direction: column;
    column-gap: var(--space-xs);
    row-gap: var(--space-sm);
    margin-bottom: var(--space-xl);
    align-items: flex-start; /* Alinhamento start */
    text-align: left;
}

.preview-image-link {
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

.manuscript-preview-start:hover .preview-img {
    transform: scale(1.05);
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

.read-more {
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
