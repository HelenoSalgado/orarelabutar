<template>
    <main>
        <h1>
            <IconsTag />
            <span>Temas</span>
        </h1>
        <div class="sacred-grid">
            <article v-for="tag in tags" :key="tag.id" class="tag-card">
                <NuxtLink :to="'/temas/' + tag.slug" class="tag-link">
                    <h2 class="tag-title">{{ tag.title }}</h2>
                    <p class="tag-desc">{{ tag.description }}</p>
                    <span class="read-more">Explorar &rang;</span>
                </NuxtLink>
            </article>
        </div>
    </main>
</template>

<script setup lang="ts">
defineOptions({
    name: 'TagsIndex'
});

const { data: tags } = await useFetch('/api/tags');

useSeoMeta({
    title: 'Temas',
    description: 'Explore os temas e categorias dos manuscritos.'
});

definePageMeta({
    title: 'Temas'
});
</script>

<style scoped>
.tag-card {
    padding: var(--space-md);
    border: 1px solid var(--color-gold-muted);
    border-radius: 12px;
    background-color: var(--color-gold-muted);
    transition: transform var(--transition-base), border-color var(--transition-base);
}

.tag-card:hover {
    transform: translateY(-5px);
    border-color: var(--color-gold);
}

.tag-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: var(--color-ink);
}

.tag-title {
    font-size: 1.4rem;
    margin: 0 0 var(--space-xs) 0;
    color: var(--color-gold);
}

.tag-desc {
    font-size: 1.1rem;
    color: var(--color-ink-muted);
    margin-bottom: var(--space-sm);
    flex-grow: 1;
}

.read-more {
    font-size: 0.85rem;
    text-transform: uppercase;
    font-weight: bold;
    color: var(--color-gold);
}
</style>
