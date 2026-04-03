<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import config from '~/config/index';
const route = useRoute();
const title = computed(() => route.meta.title ? `Orar e Labutar | ${route.meta.title}` : 'Orar e Labutar'
);

useHead({
  titleTemplate: ((titleChunk) => {
    if (titleChunk?.includes('|')) return titleChunk;
    return title.value
  }),
  script: [
    {
      innerHTML: `
        (function() {
          try {
            var theme = localStorage.getItem('theme');
            var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
            if (theme === 'dark' || (!theme && supportDarkMode)) {
              document.documentElement.classList.add('dark-mode');
            } else {
              document.documentElement.classList.remove('dark-mode');
            }
          } catch (e) {}
        })();
      `,
      type: 'text/javascript'
    }
  ]
});

useSeoMeta({
  ogTitle: `${title.value}`,
  twitterTitle: `${title.value}`,
  author: 'Heleno Salgado',
  ogLocale: 'pt-BR',
  ogUrl: `${config.baseURL + route.path}`,
  twitterCard: 'summary_large_image',
  twitterCreator: '@HelenoSalgado'
});
</script>
