<template>
  <main>
    <h1>
      <IconsBook />
      <span>PDFs</span>
    </h1>

    <article>
      <p>
        Disponibilizamos aqui uma seleção de obras clássicas e contemporâneas em formato digital para auxiliar em seus
        estudos e meditações. Todos os arquivos são de domínio público ou licenciados para livre distribuição.
      </p>
    </article>

    <div v-if="pending" class="loading-container">
      Carregando biblioteca...
    </div>

    <div v-else-if="error" class="error-container">
      Ocorreu um erro ao carregar os PDFs.
    </div>

    <div v-else-if="pdfs && pdfs.length > 0" class="pdf-grid">
      <PdfCard v-for="pdf in pdfs" :key="pdf.id" :title="pdf.title" :author="pdf.author" :slug="pdf.slug"
        :img-url="pdf.imgUrl" :description="pdf.description" :valid-categories="pdf.validCategories" />
    </div>

    <div v-else class="empty-container">
      Nenhum PDF encontrado na biblioteca.
    </div>

    <hr />

    <SocialShare slug="livros"
      description="Baixe manuscritos e livros digitais clássicos para o seu crescimento espiritual." />
  </main>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const { data: pdfs, pending, error } = await useFetch('/api/pdfs');

if (import.meta.server) {
  const title = 'Biblioteca de PDFs e E-books';
  const description = 'Baixe obras clássicas, manuscritos e livros digitais cristãos em formato PDF para auxiliar em seus estudos bíblicos e meditações diárias.';
  useSeoMeta({
    title,
    ogTitle: title,
    twitterTitle: title,
    description,
    ogDescription: description,
    twitterDescription: description,
    ogImage: `${config.public.site.url}/img/pdfs-e-ebooks.jpg`,
    twitterImage: `${config.public.site.url}/img/pdfs-e-ebooks.jpg`,
  });
}

</script>
