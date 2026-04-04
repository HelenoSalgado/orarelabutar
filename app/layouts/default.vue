<template>
    <div class="layout-wrapper">
        <TheHeader />
        <slot />
        <TheFooter />
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'DefaultLayout'
});
</script>