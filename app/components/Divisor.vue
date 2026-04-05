<template>
  <div class="divisor-container" :class="{ 'with-margin': margin }">
    <span class="line"></span>
    <span class="diamond">◈</span>
    <span class="line"></span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  margin: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.divisor-container {
  display: flex;
  align-items: center;
  width: 100%;
  gap: var(--space-xs);
  overflow: hidden;
}

.with-margin {
  margin: var(--space-xl) 0 var(--space-sm) 0;
}

.line {
  flex-grow: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-gold), transparent);
}

/* Invertendo os gradientes para o diamante central */
.divisor-container .line:first-child {
  background: linear-gradient(to right, transparent, var(--color-gold));
}

.divisor-container .line:last-child {
  background: linear-gradient(to left, transparent, var(--color-gold));
}

.diamond {
  color: var(--color-gold);
  font-size: 1.5rem;
  user-select: none;
  line-height: 1;
}
</style>
