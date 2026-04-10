<template>
    <main>
        <h1>
            <IconsBookMark />
            <span>Coleções</span>
        </h1>
        <div class="sacred-grid">
            <PostCollection v-for="collection in collections" :key="collection.name"
                :title="collection.name" :img-url="collection.imgUrl" :author="collection.authors.join(', ')"
                :slug="collection.slug" :count="collection.count" />
        </div>
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'CollectionsIndex'
});

const { data: collections } = await useFetch('/api/collections');

useSeoMeta({
    title: 'Coleções',
    description: 'Explore nossas coleções temáticas de manuscritos.'
});

definePageMeta({
    title: 'Coleções'
});
</script>
