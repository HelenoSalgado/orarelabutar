<template>
    <div class="sacred-metadata-box">
        <NuxtLink :to="'/authors/'+slug" class="author-portrait">
            <NuxtImg :src="'/img/'+imgUrl" width="56" height="56" :alt="name" class="portrait-img"/>
        </NuxtLink>
        <div class="metadata-body">
            <div class="author-row">
                <NuxtLink :to="'/authors/'+slug" class="author-name">{{ name }}</NuxtLink>
                <div v-if="categories?.length" class="tags-inline">
                    <NuxtLink v-for="cat in categories" :key="cat" :to="'/tags/'+cat" class="tag-item">
                        <IconsTag class="tag-icon" /> {{ cat }}
                    </NuxtLink>
                </div>
            </div>
            <div class="date-row">
                <IconsEdit2 class="date-icon" /> {{ date }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Author, Post } from '~~/types';

const { imgUrl, name, date, slug, categories = [] } = defineProps<{
    imgUrl: Author['imgUrl'];
    name: Author['name'];
    date: Post['dateFormatted'];
    slug: Author['slug'];
    categories?: Post['categories'];
}>();
</script>

<style scoped>
.sacred-metadata-box {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
}

.author-portrait {
    flex-shrink: 0;
}

.portrait-img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid var(--color-gold);
}

.metadata-body {
    display: flex;
    flex-direction: column;
}

.author-row {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-wrap: wrap;
}

.author-name {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-ink);
}

.tags-inline {
    display: flex;
    gap: var(--space-sm);
}

.tag-item {
    font-size: 0.85rem;
    color: var(--color-gold);
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    opacity: 0.8;
}

.tag-icon {
    width: 12px;
    height: 12px;
}

.date-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.7;
    color: var(--color-ink);
}

.date-icon {
    width: 14px;
    height: 14px;
    color: var(--color-gold);
}
</style>
