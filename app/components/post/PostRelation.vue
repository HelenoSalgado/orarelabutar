<template>
    <div class="post-card-related">
        <NuxtLink :href="'/posts/' + slug" class="related-img-link">
            <NuxtImg class="post-card-related-img" :src="'/img/ai/' + imgUrl" :alt="title" loading="lazy" width="300"
                height="200" />
        </NuxtLink>
        <div class="post-card-related-text">
            <NuxtLink :href="'/posts/' + slug" class="related-title-link">
                <h3>{{ title }}</h3>
            </NuxtLink>
            <p>{{ description }}</p>
        </div>
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

.related-img-link {
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 12px var(--color-shadow);
}

.post-card-related-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    display: block;
}

.post-card-related-text h3 {
    font-size: 1.3rem;
    margin: 0;
    color: var(--color-ink);
    line-height: 1.4;
    text-align: center;


}

.post-card-related-text p {
    line-height: 1.6rem;
}

.related-title-link {
    text-decoration: none;
}

.related-title-link:hover h3 {
    color: var(--color-gold);
}
</style>
