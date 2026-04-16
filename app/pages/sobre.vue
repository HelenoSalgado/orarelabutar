<template>
    <main class="about-page">
        <h1>Sobre o Orar e Labutar</h1>
        <ContentRenderer :value="(sobreData?.body as any)" />
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'SobrePage'
});

const config = useRuntimeConfig();

const { data: sobreData } = await useFetch('/api/sobre');

if (import.meta.server) {
    const title = sobreData.value?.title;
    const description = sobreData.value?.description;
    
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

<style scoped>
.about-page {
    margin-top: var(--space-lg);
}
</style>
