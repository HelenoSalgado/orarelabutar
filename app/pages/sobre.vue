<template>
    <main class="about-page">
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
    useSeoMeta({
        ogType: 'website',
        title: 'Sobre',
        ogTitle: 'Sobre',
        twitterTitle: 'Sobre',
        description: 'Conheça o propósito do blog Orar e Labutar.',
        ogDescription: 'Conheça o propósito do blog Orar e Labutar.',
        twitterDescription: 'Conheça o propósito do blog Orar e Labutar.',
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
