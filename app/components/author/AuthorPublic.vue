<template>
    <div class="sacred-metadata-box">
        <NuxtLink :to="'/autores/' + slug" class="author-portrait">
            <NuxtImg :src="'/img/' + imgUrl" width="56" height="56" :alt="name" class="portrait-img" />
        </NuxtLink>
        <div class="metadata-body">
            <div class="author-row">
                <NuxtLink :to="'/autores/' + slug" class="author-name-link">{{ name }}</NuxtLink>
            </div>
            <div v-if="categories?.length" class="tags-inline">
                <NuxtLink v-for="cat in categories" :key="cat" :to="'/temas/' + cat" class="tag-item">
                    <IconsTag class="tag-icon" /> {{ cat }}
                </NuxtLink>
            </div>
            <div class="date-row">
                <IconsEdit2 class="date-icon" /> {{ date }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps(['imgUrl', 'name', 'date', 'slug', 'categories']);
</script>

<style scoped>
.author-row {
    margin-bottom: 4px;
}
</style>
