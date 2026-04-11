<template>
  <article v-if="pageData" class="scriptorium-post">
    <main>
      <PostContent :title="pageData.post.title" :body="pageData.post.body" :author="pageData.post.author"
        :categories="pageData.post.categories" :date-formatted="pageData.post.dateFormatted"
        :slug-author="pageData.author?.slug" :avatar-author="pageData.author?.imgUrl" :img-url="pageData.post.imgUrl" />

      <div class="article-interactions">
        <LikeButton :slug="pageData.post.slug" />
        <SocialShare :slug="'manuscritos/' + pageData.post.slug" :description="pageData.post.description" />
      </div>
    </main>
    <div class="navigator-posts">
      <NuxtLink v-if="pageData.surroundings?.[0]" :to="'/manuscritos/' + pageData.surroundings[0].slug">
        &lang; Post Anterior
      </NuxtLink>
      <NuxtLink v-if="pageData.surroundings?.[1]" :to="'/manuscritos/' + pageData.surroundings[1].slug">
        Próximo Post &rang;
      </NuxtLink>
    </div>

    <section v-if="pageData?.related?.length" class="related-posts">
      <h2>
        <IconsBookOpen class="icon" />
        <span>Posts Relacionados</span>
      </h2>
      <div class="grid-container">
        <PostRelation v-for="related in pageData.related" :key="related.id" :title="related.title"
          :description="related.description" :img-url="related.imgUrl" :slug="related.slug" />
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
defineOptions({ name: 'PostDetail' });

const config = useRuntimeConfig();

const route = useRoute();
const slug = route.params.slug as string;

const { data: pageData } = await useFetch(`/api/posts/${slug}`, { mode: 'cors' });

const imgUrl = computed(() => `${config.public.site.url}/img/ai/${pageData.value?.post?.imgUrl}`);


useSeoMeta({
  title: pageData.value?.post?.title,
  ogType: 'article',
  description: pageData.value?.post?.description,
  ogImage: imgUrl.value,
  twitterImage: imgUrl.value,
  twitterDescription: pageData.value?.post?.description
});
</script>

<style scoped>
:deep(.dissemination-seals) {
  margin: 0;
  padding: 0;
  border: none;
  opacity: 1;
}

:deep(.amei-container) {
  margin: 0;
}

.related-posts {
  margin: var(--space-lg) auto;
  padding: 1rem;
}
</style>
