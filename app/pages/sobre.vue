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
}, {
    mode: 'server'
});

definePageMeta({
   title: 'Sobre'
});
</script>

<style scoped>
.about-page {
    margin-top: var(--space-lg);
}

.title-icon-flex-start {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-xl);
}

.sacred-icon {
    width: 24px;
    color: var(--color-gold);
}

.manuscript-body {
    font-size: 1.3rem; /* Fonte aumentada conforme solicitado */
    line-height: 1.8;
}

.manuscript-body p {
    margin-bottom: var(--space-lg);
    text-align: justify;
}

.manuscript-body blockquote {
    border-left: 3px solid var(--color-gold);
    background: var(--color-gold-muted);
    padding: var(--space-lg);
    margin: var(--space-xl) 0;
    font-style: italic;
    font-size: 1.4rem;
}

.sacred-ornament {
    text-align: center;
    color: var(--color-gold);
    font-size: 2rem;
    margin: var(--space-2xl) 0;
    opacity: 0.5;
}
</style>
