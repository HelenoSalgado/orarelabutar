<template>
    <TheHeader />
    <slot />
    <TheFooter />
</template>

<script setup lang="ts">
defineOptions({
    name: 'DefaultLayout'
});
</script>
