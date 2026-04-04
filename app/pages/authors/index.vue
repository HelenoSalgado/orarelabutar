<template>
    <main>
        <h1>
            <IconsUsers />
            <span>Autores</span>
        </h1>
        <div class="container-authors">
            <AuthorPreview :authors/>
        </div>
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'AuthorsIndex'
});

const { data: authors } = await useFetch('/api/authors');

</script>

<style scoped>
.container-authors {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
}
</style>
