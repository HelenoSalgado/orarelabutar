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

const { data: tags } = await useFetch('/api/tags');

if (import.meta.server) {
    useSeoMeta({
        title: 'Temas',
        ogTitle: 'Temas',
        twitterTitle: 'Temas',
        description: 'Explore os temas e categorias dos manuscritos.',
        ogDescription: 'Explore os temas e categorias dos manuscritos.',
        twitterDescription: 'Explore os temas e categorias dos manuscritos.'
    });
}

</script>
