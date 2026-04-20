<template>
    <main>
        <h1>
            <IconsTag />
            <span>Temas</span>
        </h1>
        <div class="sacred-grid">
            <article v-for="tag in tags" :key="tag.id" class="tag-card">
                <NuxtLink :to="'/temas/' + tag.slug" class="tag-link">
                    <h2 class="tag-title">{{ tag.title }}</h2>
                    <p class="tag-desc">{{ tag.description }}</p>
                    <span class="read-more">Explorar &rang;</span>
                </NuxtLink>
            </article>
        </div>
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'TagsIndex'
});

const config = useRuntimeConfig();

const { data: tags } = await useFetch('/api/tags');

if (import.meta.server) {
    const title = 'Explore os Temas e Categorias';
    const description = 'Navegue pelos diversos temas, tópicos e categorias de manuscritos, livros e reflexões cristãs disponíveis no Orar e Labutar para seu crescimento espiritual.';
    useSeoMeta({
        title,
        ogTitle: title,
        twitterTitle: title,
        description,
        ogDescription: description,
        twitterDescription: description,
        ogImage: `${config.public.site.url}/img/artigos.jpg`,
        twitterImage: `${config.public.site.url}/img/artigos.jpg`
    });
}

</script>
