<template>
  <main>
    <div v-if="pending" class="loading-container">
      Carregando detalhes do PDF...
    </div>

    <div v-else-if="error" class="error-container">
      PDF não encontrado na biblioteca.
      <NuxtLink to="/livros" class="back-link">
        <IconsArrowLeft class="icon-back" />
        Voltar para a biblioteca
      </NuxtLink>
    </div>

    <div v-else-if="pdf" class="pdf-detail">
      <NuxtLink to="/livros" class="back-link">
        <IconsArrowLeft class="icon-back" />
        Voltar para a biblioteca
      </NuxtLink>
      <div class="hero-layout">
        <!-- Coluna Esquerda: Capa e Categorias -->
        <div class="hero-aside">
          <div class="hero-cover-wrapper">
            <NuxtImg :src="pdf.imgUrl" :alt="pdf.title" class="pdf-cover" />
          </div>
          <div class="pdf-tags-column">
            <span v-for="cat in pdf.categories" :key="cat" class="pdf-category-tag">
              {{ cat }}
            </span>
          </div>
        </div>

        <!-- Coluna Direita: Metadados e Ações -->
        <div class="hero-main">
          <h1 class="hero-title">{{ pdf.title }}</h1>
          <p v-if="pdf.author" class="pdf-author-name">Por {{ pdf.author }}</p>

          <div class="pdf-description-intro">
            <p>{{ pdf.description }}</p>
          </div>

          <div class="pdf-actions">
            <a :href="pdf.fileUrl" download class="sacred-btn download-btn">
              Descarregar PDF ◈
            </a>
          </div>
        </div>
      </div>

      <ContentRenderer :value="pdf" class="article-body" />

      <hr />

      <SocialShare :slug="'livros/' + pdf.slug" :description="pdf.description" />
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const slug = route.params.slug as string;

const { data: pdf, pending, error } = await useFetch(`/api/pdfs/${slug}`);

if (import.meta.server) {
  const imgUrl = pdf.value?.imgUrl ? `${config.public.site.url}${pdf.value.imgUrl}` : `${config.public.site.url}/img/pdfs-e-ebooks.jpg`;
  useSeoMeta({
    ogType: 'book',
    title: pdf.value?.title,
    ogTitle: pdf.value?.title,
    twitterTitle: pdf.value?.title,
    description: pdf.value?.description,
    ogDescription: pdf.value?.description,
    twitterDescription: pdf.value?.description,
    ogImage: imgUrl,
    twitterImage: imgUrl
  });
}
</script>

<style scoped>
.pdf-author-name {
  font-size: 1.4rem;
  font-style: italic;
  color: var(--color-ink-muted);
  margin: 0;
}

.pdf-description-intro {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--color-ink);
  font-style: italic;
}

.pdf-actions {
  margin-top: var(--space-md);
}

.download-btn {
  width: auto;
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.pdf-tags-column {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.pdf-category-tag {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  padding: 7px 12px;
  border-radius: 4px;
  font-weight: bold;
  background: var(--color-gold-muted);
  line-height: normal;
}

.hero-title {
  font-size: 2.8rem;
  line-height: 1.1;
  margin: 0;
  text-align: left;
  color: var(--color-ink);
}
</style>
