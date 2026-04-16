<template>
  <div class="error-layout">
    <TheHeader />
    <main class="page-error">
      <div class="error-content">
        <h1 class="error-status">{{ error?.status }}</h1>
        <h2 class="error-title-page">{{ errorTitle }}</h2>
        <p class="error-message">{{ errorMessage }}</p>
        <hr class="error-divider" />
        <button class="sacred-btn" @click="handleError">
          Retornar ao Início
        </button>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from 'nuxt/app';

defineOptions({
  name: 'ErrorPage'
});

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({})
  },
});

const errorTitle = computed(() => {
  if (props.error?.status === 404) return 'Página não encontrada';
  return 'Ocorreu um erro inesperado';
});

const errorMessage = computed(() => {
  if (props.error?.status === 404) {
    return 'O manuscrito que você procura parece ter sido perdido no tempo ou nunca foi escrito.';
  }
  return props.error?.statusMessage || 'Não foi possível carregar o conteúdo solicitado. Por favor, tente novamente mais tarde.';
});

const handleError = () => clearError({ redirect: "/" });
</script>
