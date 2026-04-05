<template>
    <main>
        <h1>
            <IconsBookOpen />
            <span>Posts Recentes</span>
        </h1>
        <div class="sacred-grid">
            <PostPreview v-for="post in homeData?.posts" :key="post.id" :title="post.title"
                :description="post.description" :slug="'/posts/' + post.slug" :img-url="post.imgUrl" />
        </div>

        <hr>

        <section v-if="homeData?.collections?.length">
            <h2>
                <IconsBookMark />
                <span>Coleções</span>
            </h2>
            <div class="sacred-grid">
                <PostCollection v-for="collection in homeData.collections" :key="collection.name"
                    :title="collection.name" :img-url="collection.imgUrl" :author="collection.authors.join(', ')"
                    :slug="collection.slug" :count="collection.count" />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'HomePage'
});

const config = useRuntimeConfig();

const { data: homeData } = await useFetch('/api/home');

useSeoMeta({
    title: 'Home',
    ogType: 'website',
    description: 'Veja os artigos mais recentes. Conheça o propósito deste blog.',
    ogDescription: 'Veja os artigos mais recentes. Conheça o propósito deste blog.',
    ogImage: () => `${config.public.site.url}/img/licoes1-mobile.jpg`,
    twitterDescription: 'Veja os artigos mais recentes. Conheça o propósito deste blog.',
    twitterImage: () => `${config.public.site.url}/img/licoes1-mobile.jpg`,
});

definePageMeta({
    title: 'Home'
});
</script>
