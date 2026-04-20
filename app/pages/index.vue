<template>
    <main>
        <h1>
            <IconsBookOpen />
            <span>Posts Recentes</span>
        </h1>
        <div class="sacred-grid">
            <PostPreview v-for="(post, index) in homeData?.posts" :key="post.id" :title="post.title"
                :description="post.description" :slug="'/manuscritos/' + post.slug" :img-url="post.imgUrl"
                :loading="index === 0 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'auto'" />
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

if (import.meta.server) {
    const title = 'Manuscritos, Livros e Reflexões Cristãs';
    const description = 'Espaço dedicado à meditação na Palavra de Deus, com manuscritos históricos, livros clássicos e reflexões para o crescimento espiritual.';
    useSeoMeta({
        ogType: 'website',
        title,
        ogTitle: title,
        twitterTitle: title,
        description,
        ogDescription: description,
        twitterDescription: description,
        ogImage: `${config.public.site.url}/img/licoes1-mobile.jpg`,
        twitterImage: `${config.public.site.url}/img/licoes1-mobile.jpg`,
    });
}
</script>
