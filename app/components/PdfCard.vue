<template>
  <div class="pdf-card">
    <!-- Coluna Esquerda: Capa e Categoria -->
    <div class="pdf-card-aside">
      <div class="pdf-cover-wrapper">
        <NuxtLink :to="'/pdfs/' + slug">
          <NuxtImg :src="imgUrl" :alt="title" class="pdf-cover" />
        </NuxtLink>
      </div>
      <div v-if="validCategories.length > 0" class="pdf-card-categories">
        <span v-for="cat in validCategories" :key="cat" class="pdf-category-tag">
          {{ cat }}
        </span>
      </div>
    </div>

    <!-- Coluna Direita: Informações -->
    <div class="pdf-card-main">
      <div class="pdf-header">
        <h3 class="pdf-title">
          <NuxtLink :to="'/pdfs/' + slug">{{ title }}</NuxtLink>
        </h3>
        <p v-if="author" class="pdf-author">{{ author }}</p>
      </div>
      
      <p v-if="description" class="pdf-description">{{ description }}</p>

      <div class="pdf-footer">
        <NuxtLink :to="'/pdfs/' + slug" class="sacred-btn btn-sm">
          Ver Detalhes ◈
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  author?: string
  slug?: string
  description?: string
  imgUrl?: string
  validCategories: string[]
}>()
</script>

<style scoped>
.pdf-card {
  display: flex;
  gap: var(--space-md);
  padding: var(--space-md);
  border: 1px solid var(--color-gold-muted);
  border-radius: 12px;
  background: var(--color-paper);
  box-shadow: 0 4px 15px var(--color-shadow);
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.pdf-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-gold);
}

/* Coluna Esquerda */
.pdf-card-aside {
  width: 120px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.pdf-cover-wrapper {
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 10px var(--color-shadow);
  aspect-ratio: 2/3;
  background: var(--color-gold-muted);
}

.pdf-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pdf-category-tag {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-gold);
  background: var(--color-gold-muted);
  padding: 2px 4px;
  border-radius: 3px;
  text-align: center;
  font-weight: bold;
  line-height: normal;
}

/* Coluna Direita */
.pdf-card-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pdf-header {
  margin-bottom: var(--space-xs);
}

.pdf-title {
  font-size: 1.2rem;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.pdf-title a {
  color: var(--color-ink);
  text-decoration: none;
}

.pdf-title a:hover {
  color: var(--color-gold);
}

.pdf-author {
  font-size: 0.85rem;
  color: var(--color-ink-muted);
  font-style: italic;
  margin: 0;
}

.pdf-description {
  font-size: 0.95rem;
  color: var(--color-ink-muted);
  line-height: 1.4;
  margin: var(--space-xs) 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pdf-footer {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.75rem;
}

@media (max-width: 600px) {
  .pdf-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .pdf-card-aside {
    width: 150px;
  }

  .pdf-footer {
    justify-content: center;
    margin-top: var(--space-sm);
  }

  .pdf-title {
    font-size: 1.4rem;
  }
}
</style>
