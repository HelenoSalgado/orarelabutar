<template>
    <div v-for="auth in authors" :key="auth.id" class="card-author">
        <NuxtImg preset="avatar" :src="'/img/'+auth.imgUrl" :alt="auth.title" width="60" height="60"/>
        <div>
            <h3>{{ auth.title }}</h3>
            <p v-if="auth.createdAt">Desde {{ auth.createdAt }}</p>
            <NuxtLink :to="'/autores/'+auth.slug">Ver Perfil</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps(['authors'])
</script>

<style scoped>
.card-author{
    margin: var(--space-sm) 0;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}
.card-author img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
}
.card-author h3, .card-author p, .card-author a{
    margin: 0;
}
.card-author p, .card-author a{
    font-size: small;
}
.card-author a{
    text-decoration: none;
    font-weight: bold;
    color: var(--color-gold);
}
</style>
