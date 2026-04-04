<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const title = computed(() => route.meta.title ? `Orar e Labutar | ${route.meta.title}` : 'Orar e Labutar'
);

useHead({
  titleTemplate: ((titleChunk) => {
    if (titleChunk?.includes('|')) return titleChunk;
    return title.value
  }),
});

useSeoMeta({
  ogTitle: `${title.value}`,
  twitterTitle: `${title.value}`,
  author: 'Heleno Salgado',
  ogLocale: 'pt-BR',
  ogUrl: () => `${config.public.site.url + route.path}`,
  twitterCard: 'summary_large_image',
  twitterCreator: '@HelenoSalgado',
  ogSiteName: 'Orar e Labutar',
  ogType: 'website'
});
</script>
