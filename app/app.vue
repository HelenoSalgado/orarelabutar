<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Orar e Labutar` : 'Orar e Labutar';
  },
  link: [
    { rel: 'canonical', href: computed(() => `${config.public.site.url}${route.path}`) }
  ]
});

useSeoMeta({
  author: 'Heleno Salgado',
  ogLocale: 'pt-BR',
  ogSiteName: 'Orar e Labutar',
  ogUrl: () => `${config.public.site.url}${route.path}`,
  twitterCard: 'summary_large_image',
  twitterCreator: '@HelenoSalgado',
  ogType: 'website'
});
</script>
