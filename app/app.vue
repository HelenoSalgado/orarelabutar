<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();

useHead({
  link: [
    { 
      rel: 'canonical', 
      href: computed(() => {
        const path = route.path.endsWith('/') ? route.path : `${route.path}/`
        return `${config.public.site.url}${path}`
      }) 
    }
  ]
});

if (import.meta.server) {
  useSeoMeta({
    titleTemplate(titleChunk) {
      return titleChunk ? `${titleChunk} | Orar e Labutar` : 'Orar e Labutar';
    },
    author: 'Heleno Salgado',
    ogLocale: 'pt-BR',
    ogSiteName: 'Orar e Labutar',
    ogUrl: () => `${config.public.site.url}${route.path}`,
    twitterCard: 'summary_large_image',
    twitterCreator: '@HelenoSalgado',
    ogType: 'website'
  });
}

</script>
