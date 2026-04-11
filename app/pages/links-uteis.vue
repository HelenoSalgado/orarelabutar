<template>
    <main>
        <h1>
            <IconsLink />
            <span>Links Úteis</span>
        </h1>
        <p><a href="http://www.cristianismo.org.br/apresent.htm">Introdução ao Cristianismo</a></p>
        <p><a href="https://santoevangelho.com.br/">Instituto Reformado Santo Evangelho</a></p>
        <p><a href="https://www.hugodesaovitor.org.br/">Instituto Hugo de São Vitor</a></p>
        <hr>
        <SocialShare slug="/links-uteis"
            description="Tenha boas referências para um estudo teológico de qualidade; aqui estão alguns links." />
    </main>
</template>
<script setup lang="ts">
defineOptions({
    name: 'LinksUteis'
});

const config = useRuntimeConfig();

if (import.meta.server) {
    useSeoMeta({
        title: 'Links Uteis',
        description: 'Links recomendadados para se aprofundar no estudo do cristianismo e teologia.',
        ogDescription: 'Links recomendadados para se aprofundar no estudo do cristianismo e teologia.',
        twitterDescription: 'Links recomendadados para se aprofundar no estudo do cristianismo e teologia.',
        ogImage: `${config.public.site.url}/img/links-uteis.jpg`,
        twitterImage: `${config.public.site.url}/img/links-uteis.jpg`,
    });
}
</script>
