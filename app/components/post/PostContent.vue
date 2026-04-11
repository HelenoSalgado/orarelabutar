<template>
    <h1 class="article-title">{{ title }}</h1>
    <AuthorPublic :name="author" :img-url="avatarAuthor" :date="dateFormatted" :slug="slugAuthor"
        :categories="categories" />
    <ContentRenderer :value="(body as any)" class="article-body"/>
</template>

<script setup lang="ts">

defineProps(['title', 'body', 'author', 'categories', 'dateFormatted', 'slugAuthor', 'avatarAuthor']);

</script>

<style scoped>
.article-title {
    font-size: 2.5rem;
    text-align: left;
    margin-bottom: var(--space-md);
    color: var(--color-ink);
    line-height: 1.2;
    width: 100%;
}

@media (max-width: 600px) {
    .article-title {
        font-size: 2rem;
    }
}
</style>
