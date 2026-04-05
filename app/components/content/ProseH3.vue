<template>
  <h3 :id="id">
    <slot />
     <a v-if="id" :href="`#${id}`" class="anchor-link">
      <IconsLink />
    </a>
  </h3>
</template>

<script setup lang="ts">
defineProps<{ id?: string }>()
</script>
