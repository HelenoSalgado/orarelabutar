<template>
  <div class="pdf-card">
    <!-- Coluna Esquerda: Capa e Categoria -->
    <div class="pdf-card-aside">
      <NuxtLink :to="'/livros/' + slug" class="pdf-cover-link">
        <NuxtImg :src="imgUrl" :alt="title" class="pdf-cover" loading="lazy" decoding="async" />
      </NuxtLink>
      <div v-if="validCategories.length > 0" class="pdf-card-categories">
        <span v-for="cat in validCategories" :key="cat" class="pdf-category-tag">
          {{ cat }}
        </span>
      </div>
    </div>

    <!-- Coluna Direita: Informações -->
    <div class="pdf-card-main">
      <h2 class="pdf-title">
        <NuxtLink :to="'/livros/' + slug">{{ title }}</NuxtLink>
      </h2>
      <p v-if="author" class="pdf-author">{{ author }}</p>

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

.pdf-cover-link {
  display: block;
  width: 100%;
}

.pdf-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 6px;
  box-shadow: 0 4px 10px var(--color-shadow);
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
