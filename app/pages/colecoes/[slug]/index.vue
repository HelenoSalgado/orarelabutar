<template>
  <main v-if="collectionData?.collection">
      <h1>
          <IconsBookMark />
          <span>Coleção: {{ collectionData.collection.title }}</span>
      </h1>
      <p>Por: {{ collectionData.collection.author }}</p>
      <div class="grid-container">
          <PostPreview
v-for="post in collectionData.posts" :key="post.id"
            :title="post.title"
            :description="post.description"
            :slug="'/manuscritos/' + post.slug"
            :img-url="post.imgUrl"
          />
      </div>
      <hr>
      <SocialShare :slug="'colecoes/'+slug" :description="'Veja uma coleção de artigos de '+collectionData.collection.author "/>
  </main>
</template>

<script setup lang="ts">

defineOptions({
    name: 'CollectionDetail'
});

const config = useRuntimeConfig();

const route = useRoute();
const slug = route.params.slug as string;

const { data: collectionData } = await useFetch(`/api/collections/${slug}`);

const title = computed(() => `Orar e Labutar | ${collectionData.value?.collection?.title}`);

useSeoMeta({
  title: () => title.value,
  ogTitle: () => title.value,
  description: () => `Veja uma coleção de artigos de ${collectionData.value?.collection?.author}`,
  ogDescription: () => `Veja uma coleção de artigos de ${collectionData.value?.collection?.author}`,
  ogImage: () => `${config.public.site.url}/img/${collectionData.value?.collection?.imgUrl}`,
  twitterTitle: () => title.value,
  twitterDescription: () => `Veja uma coleção de artigos de ${collectionData.value?.collection?.author}`,
  twitterImage: () => `${config.public.site.url}/img/${collectionData.value?.collection?.imgUrl}`
});
</script>
