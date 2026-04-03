<template>
  <main v-if="collection">
      <h1>
          <IconsBookMark />
          <span>Coleção: {{ collection.title }}</span>
      </h1>
      <p>Por: {{ collection.author }}</p>
      <div class="grid-container">
          <PostPreview v-for="post in posts" :key="post.id"
            :title="post.title"
            :description="post.description"
            :slug="post.slug"
            :imgUrl="post.imgURL"
          />
      </div>
      <hr>
      <p>Compartilhe:</p>
      <Shared :slug="'/collection/'+slug" :description="'Veja uma coleção de artigos de '+collection.author "/>
  </main>
</template>

<script setup lang="ts">
import config from '~/config';

const route = useRoute();
const slug = route.params.slug as string;

const { data: collection } = await useAsyncData(`collection-${slug}`, () => 
  queryCollection('collections').path(`/collections/${slug}`).first()
);

const { data: posts } = await useAsyncData(`collection-posts-${slug}`, async () => {
  if (collection.value?.postsSlugs?.length) {
    return await queryCollection('posts').where('slug', 'IN', collection.value.postsSlugs).all();
  }
  return [];
});

const title = computed(() => `Orar e Labutar | ${collection.value?.title}`);

useSeoMeta({
  title: () => title.value,
  ogTitle: () => title.value,
  description: () => `Veja uma coleção de artigos de ${collection.value?.author}`,
  ogDescription: () => `Veja uma coleção de artigos de ${collection.value?.author}`,
  ogImage: () => `${config.baseURL}/img/${collection.value?.imgUrl}`,
  twitterTitle: () => title.value,
  twitterDescription: () => `Veja uma coleção de artigos de ${collection.value?.author}`,
  twitterImage: () => `${config.baseURL}/img/${collection.value?.imgUrl}`
}, {
  mode: 'server',
});
</script>
