<template>
    <article class="preview-card manuscript-preview-start">
        <NuxtLink :to="slug" class="preview-image-link">
            <NuxtImg :src="'/img/ai/'+imgUrl" :alt="title" class="preview-img" preset="card" :loading="loading || 'lazy'" :fetchpriority="fetchpriority || 'auto'" decoding="async" />
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
defineProps<{
    title: string,
    description: string,
    slug: string,
    imgUrl: string,
    loading?: 'lazy' | 'eager',
    fetchpriority?: 'high' | 'low' | 'auto'
}>();
</script>
