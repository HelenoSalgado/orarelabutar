<template>
    <main>
        <h1>
            <IconsBookMark />
            <span>Coleções</span>
        </h1>
        <div class="sacred-grid">
            <PostCollection v-for="collection in collections" :key="collection.name" :title="collection.name"
                :img-url="collection.imgUrl" :author="collection.authors.join(', ')" :slug="collection.slug"
                :count="collection.count" />
        </div>
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'CollectionsIndex'
});

const config = useRuntimeConfig();

const { data: collections } = await useFetch('/api/collections');

if (import.meta.server) {
    const title = 'Coleções Temáticas de Manuscritos';
    const description = 'Explore nossa curadoria de coleções temáticas, reunindo os melhores manuscritos, artigos e reflexões cristãs organizados por assunto e autor.';
    useSeoMeta({
        title,
        ogTitle: title,
        twitterTitle: title,
        description,
        ogDescription: description,
        twitterDescription: description,
        ogImage: `${config.public.site.url}/img/artigos.jpg`,
        twitterImage: `${config.public.site.url}/img/artigos.jpg`
    });
}

</script>
