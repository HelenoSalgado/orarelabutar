<template>
  <main v-if="authorData?.author" class="author-profile">
    <div class="biograpy">
      <article>
        <div class="biograpy-box-image">
          <NuxtImg :src="'/img/' + authorData.author.imgUrl" :alt="authorData.author.title" width="800px" height="400px"
            sizes="xs:320px, sm:640px, md:768px" />
        </div>
        <h1>{{ authorData.author.title }}</h1>
        <ContentRenderer :value="authorData.author.body" />
      </article>
      <hr>
      <SocialShare :slug="'autores/' + authorData.author.slug" :description="authorData.author.description" />
    </div>

    <section v-if="authorData?.posts?.length">
      <h3>
        <IconsUser />
        <span>Deste Autor</span>
      </h3>
      <div class="grid-container">
        <PostRelation v-for="post in authorData.posts" :key="post.id" :title="post.title" :img-url="post.imgUrl"
          :slug="post.slug" />
      </div>
    </section>

    <section class="all-authors-section">
      <h3>
        <IconsUsers />
        <span>Autores</span>
      </h3>
      <div class="container-authors">
        <AuthorPreview :authors />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { AuthorsCollectionItem, PostsCollectionItem } from '@nuxt/content';

defineOptions({
  name: 'AuthorDetail'
});

const config = useRuntimeConfig();

const slug = useRoute().params.slug as string;

const { data: authorData } = await useFetch<{ author: AuthorsCollectionItem, posts: PostsCollectionItem[] }>(`/api/authors/${slug}`);

const { data: authors } = await useFetch('/api/authors');

const title = computed(() => `Orar e Labutar | ${authorData.value?.author?.title || ''}`);

useSeoMeta({
  title: () => title.value,
  ogTitle: () => title.value,
  description: () => authorData.value?.author?.description,
  ogDescription: () => authorData.value?.author?.description,
  ogImage: () => authorData.value?.author?.imgUrl ? `${config.public.site.url}/img/${authorData.value.author.imgUrl}` : undefined,
  twitterTitle: () => title.value,
  twitterDescription: () => authorData.value?.author?.description,
  twitterImage: () => authorData.value?.author?.imgUrl ? `${config.public.site.url}/img/${authorData.value.author.imgUrl}` : undefined,
});
</script>

<style scoped>
.container-authors {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2rem;
}
</style>
