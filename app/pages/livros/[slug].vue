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
      <div class="pdf-hero">
        <!-- Coluna Esquerda: Capa e Categorias -->
        <div class="pdf-hero-aside">
          <div class="pdf-cover-wrapper">
            <NuxtImg :src="pdf.imgUrl" :alt="pdf.title" class="pdf-cover" />
          </div>
          <div class="pdf-tags-column">
            <span v-for="cat in pdf.categories" :key="cat" class="pdf-category-tag">
              {{ cat }}
            </span>
          </div>
        </div>

        <!-- Coluna Direita: Metadados e Ações -->
        <div class="pdf-hero-main">
          <h1 class="pdf-title">{{ pdf.title }}</h1>
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

      <SocialShare
      :slug="'livros/' + pdf.slug"
      :description="pdf.description"
      />    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const slug = route.params.slug as string;

const { data: pdf, pending, error } = await useFetch(`/api/pdfs/${slug}`);

watchEffect(() => {
  if (pdf.value) {
    useSeoMeta({
      title: `${pdf.value.title} - PDF`,
      description: pdf.value.description,
      ogDescription: pdf.value.description,
      ogImage: () => pdf.value?.imgUrl ? `${config.public.site.url}${pdf.value.imgUrl}` : `${config.public.site.url}/img/pdfs-e-ebooks.jpg`,
    });
  }
});

definePageMeta({
  title: 'Biblioteca'
})
</script>

<style scoped>
.loading-container,
.error-container {
  text-align: center;
  padding: var(--space-xl) 0;
  font-style: italic;
  color: var(--color-ink-muted);
}

.back-link {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-bottom: var(--space-lg);
  color: var(--color-gold);
  font-weight: bold;
  text-decoration: none;
}

.icon-back {
  width: 18px;
  height: 18px;
}

.pdf-hero {
  display: flex;
  gap: var(--space-xl);
  align-items: flex-start;
  margin-bottom: var(--space-lg);
}

/* Coluna Esquerda */
.pdf-hero-aside {
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.pdf-cover-wrapper {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px var(--color-shadow);
  border: 1px solid var(--color-gold-muted);
  aspect-ratio: 2/3;
  background: var(--color-gold-muted);
}

.pdf-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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

/* Coluna Direita */
.pdf-hero-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.pdf-title {
  font-size: 2.8rem;
  line-height: 1.1;
  margin: 0;
  text-align: left;
  color: var(--color-ink);
}

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

.article-body {
  margin-top: var(--space-3xl);
  text-align: justify;
}

@media (max-width: 850px) {
  .pdf-hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .pdf-hero-main {
    align-items: center;
  }

  .pdf-title {
    text-align: center;
    font-size: 2.2rem;
  }

  .pdf-hero-aside {
    width: 220px;
  }
}
</style>
