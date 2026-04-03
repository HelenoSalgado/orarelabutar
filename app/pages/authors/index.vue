<template>
    <main>
        <h1>
            <IconsUsers />
            <span>Autores</span>
        </h1>
        <div class="container-authors">
            <AuthorPreview />
        </div>
    </main>
</template>
<style scoped>
.container-authors {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
}
</style>