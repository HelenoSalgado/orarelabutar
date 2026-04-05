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
    /* Ajustado levemente */
    text-align: left;
    margin-bottom: var(--space-md);
    color: var(--color-ink);
    line-height: 1.2;
    width: 100%;
}

.article-body {
    width: 100%;
    font-size: 1.3rem;
    color: var(--color-ink);
    text-align: justify;
    line-height: 1.6;
    margin-top: var(--space-md);
}

/* Lettrine / Capitular */
.article-body :deep(p:first-of-type::first-letter) {
    float: left;
    font-size: 4rem;
    line-height: 0.8;
    padding-top: 4px;
    padding-right: 8px;
    font-weight: bold;
    color: var(--color-gold);
}

.article-body :deep(p) {
    margin-bottom: var(--space-md);
}

.article-body :deep(blockquote) {
    border-left: 3px solid var(--color-gold);
    background: var(--color-gold-muted);
    font-style: italic;
    margin: var(--space-lg) 0;
    padding: var(--space-md) var(--space-lg);
    font-size: 1.2rem;
    color: var(--color-ink-muted);
}

.article-body :deep(h2),
.article-body :deep(h3) {
    text-align: left;
    margin: var(--space-lg) 0 var(--space-sm) 0;
    color: var(--color-ink);
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    font-size: 1.3rem;
}

.article-body :deep(img) {
    max-width: 100%;
    border-radius: 12px;
    margin: var(--space-lg) 0;
}

@media (max-width: 600px) {
    .article-title {
        font-size: 2rem;
    }
}
</style>
