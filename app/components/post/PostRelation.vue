<template>
    <div class="post-card-related">
        <NuxtLink :href="'/manuscritos/' + slug" class="preview-image-link">
            <NuxtImg class="post-card-related-img" :src="'/img/ai/' + imgUrl" :alt="title" loading="lazy" width="300"
                height="200" />
        </NuxtLink>
        <NuxtLink :href="'/manuscritos/' + slug" class="related-title-link">
            <h3>{{ title }}</h3>
        </NuxtLink>
        <p class="post-description">{{ description }}</p>
    </div>
</template>
<script setup lang="ts">
defineProps(['title', 'description', 'imgUrl', 'slug']);
</script>

<style scoped>
.post-card-related {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    transition: transform var(--transition-base);
}

.post-card-related:hover {
    transform: translateY(-3px);
}

.post-card-related-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    display: block;
}

.post-card-related h3 {
    margin: 0;
    color: var(--color-ink);
    line-height: 1.4;
}

.post-description {
    line-height: 1.6rem;
}

.related-title-link {
    text-decoration: none;
}

.related-title-link:hover h3 {
    color: var(--color-gold);
}
</style>
