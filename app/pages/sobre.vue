<template>
    <main class="about-page">
        <ContentRenderer :value="(sobreData?.body as any)"/>
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'SobrePage'
});

const config = useRuntimeConfig();

const { data: sobreData } = await useFetch('/api/sobre');

useSeoMeta({
    title: 'Sobre',
    ogType: 'website',
    description: 'Conheça o propósito do blog Orar e Labutar.',
    ogDescription: 'Conheça o propósito do blog Orar e Labutar.',
    ogImage: () => `${config.public.site.url}/img/licoes1-mobile.jpg`,
    twitterDescription: 'Conheça o propósito do blog Orar e Labutar.',
    twitterImage: () => `${config.public.site.url}/img/licoes1-mobile.jpg`,
});

definePageMeta({
   title: 'Sobre'
});
</script>

<style scoped>
.about-page {
    margin-top: var(--space-lg);
}
</style>
