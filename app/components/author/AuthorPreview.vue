<template>
    <div v-for="auth in authors" :key="auth.id" class="card-author">
        <NuxtImg preset="avatar" :src="'/img/'+auth.imgUrl" :alt="auth.name" width="60" height="60"/>
        <div>
            <h3>{{ auth.name }}</h3>
            <p v-if="auth.createdAt">Desde {{ auth.createdAt }}</p>
            <NuxtLink :to="'/authors/'+auth.slug">Ver Perfil</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: authors } = await useFetch('/api/authors/all');
</script>

<style scoped>
.card-author{
    margin: var(--space-sm) 0;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}
img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
}
h3, p, a{
    margin: 0;
}
p, a{
    font-size: small;
}
a{
    text-decoration: none;
    font-weight: bold;
    color: var(--color-gold);
}
</style>
