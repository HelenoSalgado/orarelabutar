<template>
    <main class="about-page">
        <h1>
            <IconsGlobe />
            <span>Sobre o Orar e Labutar</span>
        </h1>
        <article class="manuscript-body">
            <p>
                O <strong>Orar e Labutar</strong> nasceu do desejo profundo de resgatar a espiritualidade clássica e a vida intelectual cristã. Em um mundo de ruído incessante, buscamos o silêncio da contemplação e a dignidade do trabalho diligente.
            </p>
            
            <p>
                Nossa missão é fornecer subsídios para que o cristão contemporâneo possa aprofundar suas raízes na tradição da Igreja, unindo a piedade devocional ao rigor teológico.
            </p>

            <blockquote>
                "Ora et Labora" — a oração e o trabalho não são esferas separadas, mas sim uma única tapeçaria tecida para a glória de Deus.
            </blockquote>

            <p>
                Este espaço é dedicado à publicação de manuscritos, traduções de clássicos e reflexões que visam a edificação da alma e o fortalecimento da mente.
            </p>

            <div class="sacred-ornament">◈</div>

            <p>Orar e Labutar subscreve o Credo Apostólico e as confissões de fé da Reforma.</p>
        </article>
    </main>
</template>

<script setup lang="ts">
import config from '~/config/index';

useSeoMeta({
    title: 'Sobre',
    ogType: 'website',
    description: 'Conheça o propósito do blog Orar e Labutar.',
    ogDescription: 'Conheça o propósito do blog Orar e Labutar.',
    ogImage: `${config.baseURL}/img/licoes1-mobile.jpg`,
    twitterDescription: 'Conheça o propósito do blog Orar e Labutar.',
    twitterImage: `${config.baseURL}/img/licoes1-mobile.jpg`,
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
