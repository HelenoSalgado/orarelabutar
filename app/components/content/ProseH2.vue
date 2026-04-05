<template>
  <h2 :id="id">
    <a v-if="id" :href="`#${id}`" class="anchor-link">
      <slot /> <IconsLink />
    </a>
  </h2>
</template>

<script setup lang="ts">
defineProps<{ id?: string }>()
</script>
