<template>
  <div class="error-layout">
    <TheHeader />
    <main class="page-error">
      <div class="error-content">
        <h1 class="error-status">{{ error?.status }}</h1>
        <h2 class="error-title">{{ errorTitle }}</h2>
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
import type { NuxtError } from '#app';

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

<style scoped>
.error-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-error {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-xl) var(--space-md);
}

.error-content {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  text-align: center;
}

.error-icon {
  width: 48px;
  height: 48px;
  color: var(--color-gold);
  margin-bottom: var(--space-sm);
  opacity: 0.8;
}

.error-status {
  font-size: 5rem;
  font-weight: 700;
  color: var(--color-gold);
  line-height: 1;
  margin: 0;
  font-family: var(--font-heading);
  justify-content: center;
}

.error-title {
  font-size: 2rem;
  margin: 0;
  color: var(--color-ink);
  justify-content: center;
}

.error-message {
  font-size: 1.2rem;
  color: var(--color-ink-muted);
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

.error-divider {
  margin: var(--space-lg) 0;
  width: 60%;
}

@media (max-width: 600px) {
  .error-status {
    font-size: 3.5rem;
  }
  .error-title {
    font-size: 1.6rem;
  }
}
</style>
