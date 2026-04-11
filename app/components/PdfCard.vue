<template>
  <div class="pdf-card">
    <!-- Coluna Esquerda: Capa e Categoria -->
    <div class="pdf-card-aside">
      <div class="pdf-cover-wrapper">
        <NuxtLink :to="'/livros/' + slug">
          <NuxtImg :src="imgUrl" :alt="title" class="pdf-cover" loading="lazy" decoding="async" />
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
          <NuxtLink :to="'/livros/' + slug">{{ title }}</NuxtLink>
        </h3>
        <p v-if="author" class="pdf-author">{{ author }}</p>
      </div>

      <p v-if="description" class="pdf-description">{{ description }}</p>

      <div class="pdf-card-footer">
        <NuxtLink :to="'/livros/' + slug" class="sacred-btn btn-sm">
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
.pdf-card-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.pdf-header {
  margin-bottom: var(--space-xs);
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

  .pdf-card-footer {
    justify-content: center;
    margin-top: var(--space-sm);
  }

  .pdf-card-main .pdf-title {
    font-size: 1.4rem;
  }
}
</style>
