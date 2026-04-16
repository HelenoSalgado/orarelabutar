<template>
    <main>
        <h1>
            <IconsEdit2/>
            <span>Artigos</span>
        </h1>
        <div class="grid-container">
            <PostPreview
v-for="post in posts" :key="post.id"
              :title="post.title"
              :description="post.description"
              :slug="'/manuscritos/' + post.slug"
              :img-url="post.imgUrl"
            />
        </div>
        <hr />
        <SocialShare
            slug="manuscritos"
            description="Explore os manuscritos e artigos do blog Orar e Labutar."
        />
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'PostsIndex'
});

const config = useRuntimeConfig();

const { data: posts } = await useFetch('/api/posts');

if (import.meta.server) {
    const title = 'Manuscritos e Artigos';
    const description = 'Confira nossa coleção completa de manuscritos, artigos teológicos e meditações cristãs publicadas no blog Orar e Labutar.';
    useSeoMeta({
        title,
        ogTitle: title,
        twitterTitle: title,
        ogType: 'website',
        description,
        ogDescription: description,
        twitterDescription: description,
        ogImage: `${config.public.site.url}/img/artigos.jpg`,
        twitterImage: `${config.public.site.url}/img/artigos.jpg`,
    });
}
</script>
