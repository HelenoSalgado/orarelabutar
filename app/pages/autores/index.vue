<template>
    <main>
        <h1>
            <IconsUsers />
            <span>Autores</span>
        </h1>
        <div class="sacred-grid">
            <AuthorCard v-for="author in authors" :key="author.id" :title="author.title" :img-url="author.imgUrl"
                :slug="author.slug" :description="author.description" />
        </div>
        <hr />
        <SocialShare slug="autores" description="Conheça os autores do blog Orar e Labutar." />
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'AuthorsIndex'
});

const { data: authors } = await useFetch('/api/authors');

if (import.meta.server) {
    const title = 'Autores e Biografias';
    const description = 'Conheça os autores, pregadores e teólogos cujos manuscritos e reflexões cristãs estão disponíveis para leitura e meditação no Orar e Labutar.';
    useSeoMeta({
        title,
        ogTitle: title,
        twitterTitle: title,
        description,
        ogDescription: description,
        twitterDescription: description
    });
}

</script>
