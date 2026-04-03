<template>
    <main v-if="tag">
        <h1>
            <IconsTag/>
            <span>{{ tag.name }}</span>
        </h1>
            <div class="grid-container" v-if="posts?.length">
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
import config from '~/config';

const route = useRoute();
const slug = route.params.slug as string;

const { data: tag } = await useAsyncData(`tag-${slug}`, () => 
  queryCollection('categories').where('name', '=', slug).first()
);

const { data: posts } = await useAsyncData(`posts-in-tag-${slug}`, async () => {
  const allPosts = await queryCollection('posts').all();
  return allPosts.filter(p => p.categories?.includes(slug));
});

const title = computed(() => `Orar e Labutar | #${tag.value?.name}`);

useSeoMeta({
    title: () => title.value,
    ogTitle: () => title.value,
    description: () => tag.value?.description,
    ogDescription: () => tag.value?.description,
    ogImage: () => `${config.baseURL}/img/licoes1-mobile.jpg`,
    twitterTitle: () => title.value,
    twitterDescription: () => tag.value?.description,
    twitterImage: () => `${config.baseURL}/img/licoes1-mobile.jpg`,
}, {
    mode: 'server'
});

definePageMeta({
   title: 'Tags'
});
</script>
