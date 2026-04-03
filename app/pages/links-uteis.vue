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
        <Shared 
           slug="/links-uteis"
           description="Tenha boas referências para um estudo teológico de qualidade; aqui estão alguns links."
        />
    </main>
</template>
<script setup lang="ts">
import config from '~/config/index';

useSeoMeta({
    title: 'Links Uteis',
    description: 'Links recomendadados para se aprofundar no estudo do cristianismo e teologia.',
    ogDescription: 'Links recomendadados para se aprofundar no estudo do cristianismo e teologia.',
    ogImage: `${config.baseURL}/img/links-uteis.jpg`,
    twitterDescription: 'Links recomendadados para se aprofundar no estudo do cristianismo e teologia.',
    twitterImage: `${config.baseURL}/img/links-uteis.jpg`,
}, {
    mode: 'server'
});
definePageMeta({
   title: 'Links Úteis'
})
</script>