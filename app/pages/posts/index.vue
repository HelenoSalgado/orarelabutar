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
              :slug="'/posts/' + post.slug"
              :img-url="post.imgUrl"
            />
        </div>
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'PostsIndex'
});

const config = useRuntimeConfig();

const { data: posts } = await useFetch('/api/posts');

useSeoMeta({
    title: 'Artigos',
    ogType: 'website',
    description: 'Todos os artigos publicados no blog Orar e Labutar.',
    ogDescription: 'Todos os artigos publicados no blog Orar e Labutar.',
    ogImage: () => `${config.public.site.url}/img/artigos.jpg`,
    twitterDescription: 'Todos os artigos publicados no blog Orar e Labutar.',
    twitterImage: () => `${config.public.site.url}/img/artigos.jpg`,
}, {
    mode: 'server'
});

definePageMeta({
   title: 'Artigos'
});
</script>
