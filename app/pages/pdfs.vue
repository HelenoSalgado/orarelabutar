<template>
    <main>
        <h1>
            <IconsBook />
            <span>PDFs e E-books</span>
        </h1>
        
        <article>
            <p>
                Disponibilizamos aqui uma seleção de obras clássicas e contemporâneas em formato digital para auxiliar em seus estudos e meditações. Todos os arquivos são de domínio público ou licenciados para livre distribuição.
            </p>
        </article>

        <hr>

        <section class="pdf-container">
            <div v-for="pdf in pdfs" :key="pdf.id" class="pdf-card">
                <div class="pdf-info">
                    <IconsBook class="pdf-icon" />
                    <div>
                        <h3>{{ pdf.title }}</h3>
                        <p>{{ pdf.author }}</p>
                    </div>
                </div>
                <a v-if="pdf.file" :href="'/pdf/'+pdf.file" download class="sacred-btn">
                    Descarregar ◈
                </a>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'PdfsPage'
});

const config = useRuntimeConfig();

const { data: pdfs } = await useFetch('/api/pdfs');

useSeoMeta({
    title: 'PDFs e E-books',
    ogType: 'website',
    description: 'Baixe manuscritos e livros digitais clássicos.',
    ogImage: () => `${config.public.site.url}/img/pdfs-e-ebooks.jpg`,
}, {
    mode: 'server'
});

definePageMeta({
   title: 'PDFs'
});
</script>

<style scoped>
.pdf-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    width: 100%;
}

.pdf-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md);
    border: 1px solid var(--color-gold-muted);
    border-radius: 12px;
    background: var(--color-gold-muted);
}

.pdf-info {
    display: flex;
    align-items: center;
    gap: var(--space-md);
}

.pdf-icon {
    width: 32px;
    height: 32px;
    color: var(--color-gold);
}

@media (max-width: 600px) {
    .pdf-card {
        flex-direction: column;
        text-align: center;
        gap: var(--space-md);
    }
}
</style>
