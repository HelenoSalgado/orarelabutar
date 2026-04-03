<template>
  <main v-if="post">
    <Post :title="post.title" :content="post">
      <template #metadata>
        <AuthorPublic 
          :name="post.author" 
          :img-url="author?.imgUrl" 
          :date="post.updatedAt || post.createdAt" 
          :slug="author?.slug" 
          :categories="post.categories"
        />
      </template>
    </Post>
    
    <div class="article-interactions">
        <Like />
        <Shared 
            :slug="'posts/'+post.slug" 
            :description="post.description" 
        />
    </div>
    <hr>
  </main>
  
  <section v-if="post">
    <div class="navigator-posts">
      <NuxtLink v-if="prev" :to="prev.path">
        &lang; Post Anterior
      </NuxtLink>
      <NuxtLink v-if="next" :to="next.path">
          Próximo Post &rang;
      </NuxtLink>
    </div>
  </section>

  <section v-if="relatedPosts?.length">
      <h2 class="title-icon-flex-start">
        <IconsBookOpen class="icon"/> 
        <span>Posts Relacionados</span>
      </h2>
      <div class="grid-container">
        <PostRelation v-for="related in relatedPosts" :key="related.id"
         :title="related.title"
         :img-url="related.imgURL"
         :slug="related.slug"
        />
      </div>
  </section>
</template>

<script setup lang="ts">
import config from '~/config/index';
import { slugify } from '~/utils/slugify';

const route = useRoute();
const slug = route.params.slug as string;

const { data: post } = await useAsyncData(`post-${slug}`, () => 
  queryCollection('posts').path(`/posts/${slug}`).first()
);

const { data: author } = await useAsyncData(`author-${slug}`, async () => {
  if (post.value?.author) {
    const authorSlug = slugify(post.value.author);
    return await queryCollection('authors').where('slug', '=', authorSlug).first();
  }
  return null;
});

const { data: surrounds } = await useAsyncData(`surround-${slug}`, () => 
  queryCollectionItemSurroundings('posts', `/posts/${slug}`)
);

const [prev, next] = surrounds.value || [null, null];

const { data: relatedPosts } = await useAsyncData(`related-${slug}`, async () => {
  if (post.value?.author) {
    const allRelated = await queryCollection('posts')
      .where('author', '=', post.value.author)
      .limit(4)
      .all();
      
    return allRelated.filter(p => p.slug !== slug).slice(0, 3);
  }
  return [];
});

const title = computed(() => `Orar e Labutar | ${post.value?.title}`);

useSeoMeta({
  title: () => title.value,
  ogType: 'article',
  ogTitle: () => title.value,
  description: () => post.value?.description,
  ogDescription: () => post.value?.description,
  ogImage: () => `${config.baseURL}/img/${post.value?.imgURL}`,
  twitterTitle: () => title.value,
  twitterDescription: () => post.value?.description,
  twitterImage: () => `${config.baseURL}/img/${post.value?.imgURL}`
}, {
  mode: 'server',
});
</script>

<style scoped>
.article-interactions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: var(--space-xl) 0 var(--space-lg) 0;
    border-top: 1px solid var(--color-gold-muted);
    padding-top: var(--space-lg);
}

.navigator-posts {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: var(--space-md);
}

.navigator-posts a {
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--color-gold);
    text-transform: uppercase;
    letter-spacing: 0.05rem;
}

.title-icon-flex-start {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    text-align: left;
    margin-bottom: var(--space-lg);
}

.title-icon-flex-start .icon {
    width: 20px;
    color: var(--color-gold);
}

:deep(.dissemination-seals) {
    margin: 0;
    padding: 0;
    border: none;
    opacity: 1;
}

:deep(.amei-wrapper) {
    margin: 0;
}
</style>
