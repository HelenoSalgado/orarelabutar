<template>
    <main>
        <h1>
            <IconsUsers />
            <span>Autores</span>
        </h1>
        <div class="sacred-grid">
            <AuthorCard v-for="author in authors" :key="author.id" 
                :title="author.title" :img-url="author.imgUrl" 
                :slug="author.slug" :description="author.description" />
        </div>
        <hr />
        <SocialShare
            slug="autores"
            description="Conheça os autores do blog Orar e Labutar."
        />
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'AuthorsIndex'
});

const { data: authors } = await useFetch('/api/authors');

useSeoMeta({
    title: 'Autores',
    description: 'Conheça os autores dos manuscritos e reflexões.'
});

definePageMeta({
    title: 'Autores'
});
</script>
