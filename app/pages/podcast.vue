<template>
    <main>
        <h1>
            <IconsMusic/>
            <span>Podcast</span>
        </h1>
        <section class="podcast-section">
            <h2 class="podcast-subtitle">Sobre a Centralidade do Coração</h2>
            <iframe class="podcast-frame" src="https://open.spotify.com/embed/episode/2pI8i3YP5wE5aQbOkFoB1Q?theme=0" width="100%" height="232" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <iframe class="podcast-frame" src="https://open.spotify.com/embed/episode/2PN7mo7BPdNbOD4vFDYJR4?theme=0" width="100%" height="232" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <iframe class="podcast-frame" src="https://open.spotify.com/embed/episode/5Dk08Yh4UDhbs7HCb4sXBf?theme=0" width="100%" height="232" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <iframe class="podcast-frame" src="https://open.spotify.com/embed/episode/2r2aMfdlcxvaqJWwRPyKKY?theme=0" width="100%" height="232" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </section>
        <hr>
        <!-- Texto redundante "Compartilhe" removido -->
        <Shared 
            slug="podcast"
            description="Ouça uma série de podcast sobre a centralidade do coração."
        />
    </main>
</template>

<script setup lang="ts">
import config from '~/config/index';

useSeoMeta({
    title: 'Podcast',
    description: 'Podcasts recomendados para se aprofundar no estudo do cristianismo e teologia.',
    ogDescription: 'Podcasts recomendados para se aprofundar no estudo do cristianismo e teologia.',
    ogImage: `${config.baseURL}/img/podcast.jpg`,
    twitterDescription: 'Podcasts recomendados para se aprofundar no estudo do cristianismo e teologia.',
    twitterImage: `${config.baseURL}/img/podcast.jpg`,
}, {
  mode: 'server'
});

definePageMeta({
  title: 'Podcast'
})
</script>

<style scoped>
.podcast-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.podcast-subtitle {
    font-size: 1.3rem;
    margin: var(--space-lg) 0;
    font-style: italic;
    color: var(--color-gold);
}
.podcast-frame {
    margin-bottom: var(--space-lg);
    border-radius: 12px;
}
</style>
