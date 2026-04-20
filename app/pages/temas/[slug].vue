<template>
    <main v-if="tagData?.tag">
        <h1>
            <IconsTag />
            <span>{{ tagData.tag.title }}</span>
        </h1>
        <PostPreview v-for="post in tagData.posts" :key="post.id" :title="post.title" :description="post.description"
            :slug="'/manuscritos/' + post.slug" :img-url="post.imgUrl" />
        <hr>
        <SocialShare :slug="'temas/' + slug" :description="'Explore o tema ' + tagData.tag.title" />
    </main>
</template>

<script setup lang="ts">
import type { PostsCollectionItem, TagsCollectionItem } from '@nuxt/content';


defineOptions({
    name: 'TagDetail'
});

const config = useRuntimeConfig();

const route = useRoute();
const slug = route.params.slug as string;

const { data: tagData } = await useFetch<{ tag: TagsCollectionItem, posts: PostsCollectionItem[] }>(`/api/tags/${slug}`);

if (import.meta.server) {
    const title = tagData.value?.tag?.seoTitle || `Tema: ${tagData.value?.tag?.title}`;
    const description = tagData.value?.tag?.description || `Explore todos os textos, manuscritos e recursos cristãos sobre o tema ${tagData.value?.tag?.title}.`;
    
    useSeoMeta({
        title,
        ogTitle: title,
        description,
        ogDescription: description,
        ogImage: `${config.public.site.url}/img/licoes1-mobile.jpg`,
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: `${config.public.site.url}/img/licoes1-mobile.jpg`,
    });
}

</script>
