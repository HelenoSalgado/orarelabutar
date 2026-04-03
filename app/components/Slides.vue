<template>
    <div class="altarpiece-slides">
        <div class="slides-frame">
            <TransitionGroup name="meditative-fade">
                <NuxtLink 
                    v-for="(slide, index) in slidesUrl" 
                    v-show="currentSlide === index"
                    :key="slide.id" 
                    class="sacred-slide" 
                    :href="slide.referer"
                >
                    <NuxtImg 
                        :loading="index === 0 ? 'eager' : 'lazy'"
                        :fetchpriority="index === 0 ? 'high' : 'auto'"
                        :src="slide.desktop" 
                        :alt="slide.name"
                        class="slide-img"
                    />
                    <div class="slide-overlay">
                        <span class="slide-title">{{ slide.name }}</span>
                    </div>
                </NuxtLink>
            </TransitionGroup>
        </div>
        <div class="slides-beads">
            <span 
                v-for="(n, index) in slidesUrl.length" 
                :key="index"
                class="bead" 
                :class="{ 'active-bead': currentSlide === index }"
                @click="currentSlide = index"
                role="button"
                :aria-label="'Ir para o slide ' + (index + 1)"
            ></span>
        </div>
    </div>
</template>

<script setup>
import slidesUrl from "~/assets/json/slides.json";

const { modeLoading } = defineProps(['modeLoading']);
const currentSlide = ref(0);
let timer = null;

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slidesUrl.length;
};

onMounted(() => {
    timer = setInterval(nextSlide, 8000);
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});
</script>

<style scoped>
.altarpiece-slides {
    margin: var(--space-lg) auto;
    max-width: 1000px;
    position: relative;
    padding: 0 var(--space-sm);
}

.slides-frame {
    position: relative;
    aspect-ratio: 21/9;
    overflow: hidden;
    border-radius: 12px;
    background-color: var(--color-paper);
    box-shadow: 0 10px 30px var(--color-shadow);
}

.sacred-slide {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
}

.slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.9) contrast(1.1);
}

.slide-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--space-xl);
    background: linear-gradient(transparent, rgba(0,0,0,0.6));
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.slide-title {
    color: var(--color-paper);
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
}

.slides-beads {
    margin-top: var(--space-md);
    display: flex;
    justify-content: center;
    gap: var(--space-md);
}

.bead {
    width: 6px;
    height: 6px;
    border: 1px solid var(--color-gold);
    border-radius: 50%;
    cursor: pointer;
    transition: all var(--transition-slow);
}

.active-bead {
    background-color: var(--color-gold);
    transform: scale(1.4);
}

/* Meditative Fade */
.meditative-fade-enter-active,
.meditative-fade-leave-active {
  transition: opacity 1.2s ease-in-out;
}

.meditative-fade-enter-from,
.meditative-fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
    .slides-frame {
        aspect-ratio: 16/9;
    }
}
</style>
