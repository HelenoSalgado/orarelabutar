<template>
    <div class="amei-container" :class="{ 'amei-animation': animating, 'is-liked': isLiked }" @click="updateLike">
        <span class="count-likes">{{ likes }}</span>
        <LazyIconsHeart :style="{ fill: isLiked ? '#ff0000' : 'transparent', stroke: isLiked ? '#ff0000' : '#eb8484' }" />
    </div>
</template>

<script setup>
const route = useRoute();
const likes = ref(0);
const isLiked = ref(false);
const animating = ref(false);

const slug = computed(() => {
    const parts = route.path.split('/').filter(Boolean);
    return parts[parts.length - 1] || 'home';
});

const apiUrl = 'https://amei-api.onrender.com/api/likes';

const fetchLikes = async () => {
    try {
        const res = await fetch(`${apiUrl}/${slug.value}`);
        const data = await res.json();
        if (data.statusCode === 404) {
            await createLike();
        } else {
            likes.value = data.likes;
        }
    } catch {
        // Silently fail
    }
};

const createLike = async () => {
    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: slug.value })
        });
        const data = await res.json();
        likes.value = data.likes;
    } catch {
        // Silently fail
    }
};

const updateLike = async () => {
    animating.value = true;
    const change = isLiked.value ? -1 : 1;
    isLiked.value = !isLiked.value;
    localStorage.setItem(slug.value, isLiked.value);

    try {
        const res = await fetch(apiUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: slug.value, likes: change })
        });
        const data = await res.json();
        likes.value = data.likes;
    } catch {
        // Silently fail
    }

    setTimeout(() => {
        animating.value = false;
    }, 1000);
};

onMounted(() => {
    isLiked.value = localStorage.getItem(slug.value) === 'true';
    fetchLikes();
});
</script>

<style scoped>
.amei-container {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    cursor: pointer;
}
.count-likes {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: bold;
    background-color: var(--color-paper);
    border: 1px solid var(--color-gold);
    color: var(--color-ink);
    padding: 2px 10px;
    border-radius: 5px;
}
.amei-container :deep(svg) {
    stroke: #eb8484;
    transition: all var(--transition-fast);
    width: 24px;
    height: 24px;
}
.amei-container:hover :deep(svg) {
    transform: scale(1.1);
}
.amei-animation :deep(svg) {
    animation: pulse 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes pulse {
    0% { transform: scale(1.0); }
    25% { transform: scale(1.3); }
    50% { transform: scale(1.1); }
    75% { transform: scale(1.3); }
    100% { transform: scale(1.0); }
}
</style>
