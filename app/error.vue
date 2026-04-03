<template>
  <Header></Header>
  <main class="page-error">
    <h1>Error {{ error?.status }}</h1>
    <p>{{ error?.message }}</p>
    <button @click="handleError" class="sacred-btn">Voltar à Home</button>
  </main>
  <Footer></Footer>
</template>
<script setup lang="ts">
const { error } = defineProps({
  error: Object,
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
