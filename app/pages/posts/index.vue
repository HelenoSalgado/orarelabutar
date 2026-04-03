<template>
    <main>
        <h1>
            <IconsEdit2/>
            <span>Artigos</span>
        </h1>
        <div class="grid-container">
            <PostPreview v-for="post in posts" :key="post.id"
              :title="post.title"
              :description="post.description"
              :slug="post.slug"
              :imgUrl="post.imgURL"
            />
        </div>
    </main>
</template>

<script setup lang="ts">
import config from '~/config/index';

const { data: posts } = await useAsyncData('all-posts', () => 
  queryCollection('posts').order('createdAt', 'DESC').all()
);

useSeoMeta({
    title: 'Artigos',
    ogType: 'website',
    description: 'Todos os artigos publicados no blog Orar e Labutar.',
    ogDescription: 'Todos os artigos publicados no blog Orar e Labutar.',
    ogImage: `${config.baseURL}/img/artigos.jpg`,
    twitterDescription: 'Todos os artigos publicados no blog Orar e Labutar.',
    twitterImage: `${config.baseURL}/img/artigos.jpg`,
}, {
    mode: 'server'
});

definePageMeta({
   title: 'Artigos'
});
</script>
