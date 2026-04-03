<template>
    <main>
        <h1>
            <IconsBookOpen />
            <span>Posts Recentes</span>
        </h1>
        <div class="sacred-grid">
            <PostPreview v-for="post in posts" :key="post.id"
              :title="post.title"
              :description="post.description"
              :slug="post.slug"
              :imgUrl="post.imgURL"
            />
        </div>
        
        <hr>

        <section v-if="collections?.length">
            <h2>
              <IconsBookMark />
              <span>Coleções</span>
            </h2>
            <div class="sacred-grid">
                <PostCollection v-for="collection in collections" :key="collection.name"
                :title="collection.name"
                :imgUrl="collection.imgURL"
                :author="collection.authors.join(', ')"
                :slug="collection.slug"
                :count="collection.count"
                />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import config from '~/config/index';
import { slugify } from '~/utils/slugify';

const { data: posts } = await useAsyncData('home-posts', () => 
  queryCollection('posts').select('id', 'slug', 'imgURL', 'title', 'description', 'createdAt').order('createdAt', 'DESC').all()
);

const { data: collections } = await useAsyncData('home-collections', async () => {
  const allPosts = await queryCollection('posts').select('collection', 'imgURL', 'author').all();
  const grouped = allPosts.reduce((acc: any, post) => {
    if (post.collection) {
      if (!acc[post.collection]) {
        acc[post.collection] = {
          name: post.collection,
          slug: slugify(post.collection),
          imgURL: post.imgURL,
          authors: new Set(),
          count: 0
        };
      }
      acc[post.collection].authors.add(post.author);
      acc[post.collection].count++;
    }
    return acc;
  }, {});

  return Object.values(grouped).map((c: any) => ({
    ...c,
    authors: Array.from(c.authors)
  }));
});

useSeoMeta({
    title: 'Home',
    ogType: 'website',
    description: 'Veja os artigos mais recentes. Conheça o propósito deste blog.',
    ogDescription: 'Veja os artigos mais recentes. Conheça o propósito deste blog.',
    ogImage: `${config.baseURL}/img/licoes1-mobile.jpg`,
    twitterDescription: 'Veja os artigos mais recentes. Conheça o propósito deste blog.',
    twitterImage: `${config.baseURL}/img/licoes1-mobile.jpg`,
}, {
    mode: 'server'
});

definePageMeta({
   title: 'Home'
});
</script>
