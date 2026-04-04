<template>
  <div class="error-layout">
    <TheHeader/>
    <main class="page-error">
      <h1>Error {{ error?.status }}</h1>
      <p>{{ error?.message }}</p>
      <button class="sacred-btn" @click="handleError">Voltar à Home</button>
    </main>
    <TheFooter/>
  </div>
</template>
<script setup lang="ts">
import type { NuxtError } from '#app';

defineOptions({
  name: 'ErrorPage'
});

const { error } = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({})
  },
});
const handleError = () => clearError({ redirect: "/" });
</script>

<style scoped>
.page-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    text-align: center;
    gap: var(--space-md);
}

.page-error h1 {
    font-size: 3rem;
    color: var(--color-gold);
    margin: 0;
    justify-content: center;
}

.page-error p {
    font-size: 1.2rem;
    color: var(--color-ink-muted);
    margin-bottom: var(--space-lg);
}
</style>
