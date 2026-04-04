<template>
    <main v-if="tagData?.tag">
        <h1>
            <IconsTag/>
            <span>{{ tagData.tag.name }}</span>
        </h1>
            <div v-if="tagData.posts?.length" class="grid-container">
                <PostPreview
v-for="post in tagData.posts" :key="post.id"
                  :title="post.title"
                  :description="post.description"
                  :slug="post.slug"
                  :img-url="post.imgUrl"
                />
            </div>
    </main>
</template>

<script setup lang="ts">
import type { TagResponse } from '~/types';

defineOptions({
    name: 'TagDetail'
});

const config = useRuntimeConfig();

const route = useRoute();
const slug = route.params.slug as string;

const { data: tagData } = await useFetch<TagResponse>(`/api/tags/${slug}`);

const title = computed(() => `Orar e Labutar | #${tagData.value?.tag?.name}`);

useSeoMeta({
    title: () => title.value,
    ogTitle: () => title.value,
    description: () => tagData.value?.tag?.description,
    ogDescription: () => tagData.value?.tag?.description,
    ogImage: () => `${config.public.site.url}/img/licoes1-mobile.jpg`,
    twitterTitle: () => title.value,
    twitterDescription: () => tagData.value?.tag?.description,
    twitterImage: () => `${config.public.site.url}/img/licoes1-mobile.jpg`,
}, {
    mode: 'server'
});

definePageMeta({
   title: 'Tags'
});
</script>
