<template>
  <header class="frontispiece">
    <div class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Tema Papiro' : 'Tema Penumbra'">
        <IconsMoon v-if="!isDark" class="theme-icon" />
        <IconsSun v-else class="theme-icon" />
    </div>

    <button class="hamburguer-btn" @click="isMenuOpen = !isMenuOpen" aria-label="Menu">
      <div class="line" :class="{ 'open': isMenuOpen }"></div>
      <div class="line" :class="{ 'open': isMenuOpen }"></div>
      <div class="line" :class="{ 'open': isMenuOpen }"></div>
    </button>

    <NuxtLink to="/" class="logo-link">
      <NuxtImg src="/img/licoes1-p.webp" alt="logo" class="logo-img" width="64" height="64"/>
      <h1>Orar e Labutar</h1>
    </NuxtLink>

    <nav class="sacred-nav desktop-only">
      <NuxtLink to="/"><IconsHome class="icon"/> Home</NuxtLink>
      <NuxtLink to="/sobre"><IconsGlobe class="icon"/> Sobre</NuxtLink>
      <NuxtLink to="/posts"><IconsEdit2 class="icon"/> Artigos</NuxtLink>
      <NuxtLink to="/podcast"><IconsMusic class="icon"/> Podcast</NuxtLink>
      <NuxtLink to="/pdfs"><IconsBook class="icon"/> PDFs</NuxtLink>
      <NuxtLink to="/links-uteis"><IconsLink class="icon"/> Links</NuxtLink>
    </nav>

    <Transition name="slide-aside">
      <aside v-if="isMenuOpen" class="sacred-aside">
        <nav class="aside-nav">
          <NuxtLink to="/" @click="isMenuOpen = false"><IconsHome/> Home</NuxtLink>
          <NuxtLink to="/sobre" @click="isMenuOpen = false"><IconsGlobe/> Sobre</NuxtLink>
          <NuxtLink to="/posts" @click="isMenuOpen = false"><IconsEdit2/> Artigos</NuxtLink>
          <NuxtLink to="/podcast" @click="isMenuOpen = false"><IconsMusic/> Podcast</NuxtLink>
          <NuxtLink to="/pdfs" @click="isMenuOpen = false"><IconsBook/> PDFs</NuxtLink>
          <NuxtLink to="/links-uteis" @click="isMenuOpen = false"><IconsLink/> Links</NuxtLink>
        </nav>
      </aside>
    </Transition>
    
    <div v-if="isMenuOpen" class="aside-overlay" @click="isMenuOpen = false"></div>
    <div class="div-liturgic"></div>
  </header>
</template>

<script setup>
const isMenuOpen = ref(false);
const isDark = ref(false);

const toggleTheme = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark-mode', isDark.value);
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark-mode');
});
</script>

<style scoped>
.frontispiece {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-xl) var(--space-sm) var(--space-sm) var(--space-sm);
  background-color: var(--color-paper);
  position: relative;
  z-index: var(--z-header);
}

.logo-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: var(--color-ink);
}

.logo-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: block; /* Garante visibilidade */
}

.frontispiece h1 {
  font-size: 1.8rem;
  margin: 0;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  display: block !important; /* Sobrescreve o flex global para o título do header */
  text-align: center;
}

.sacred-nav {
  margin-top: var(--space-lg);
  display: flex;
  gap: 1.8rem;
  font-size: 1rem;
}

.sacred-nav a {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-ink);
  font-weight: bold;
}

.sacred-nav .icon {
  width: 16px;
  height: 16px;
  color: var(--color-gold);
}

.theme-toggle {
    position: absolute;
    top: var(--space-md);
    left: var(--space-md);
    cursor: pointer;
}

.theme-icon {
    width: 20px;
    height: 20px;
    color: var(--color-gold);
}

.hamburguer-btn {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  background: none;
  border: none;
  cursor: pointer;
  display: none; /* Escondido por padrão no desktop */
  flex-direction: column;
  gap: 6px;
  padding: 5px;
  z-index: calc(var(--z-aside) + 1); /* Garante que fique acima do aside aberto */
}

.hamburguer-btn .line {
  width: 24px;
  height: 2px;
  background-color: var(--color-ink);
  transition: all var(--transition-fast);
  transform-origin: center;
}

/* Animação para o X */
.hamburguer-btn .line.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburguer-btn .line.open:nth-child(2) {
  opacity: 0;
}

.hamburguer-btn .line.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.sacred-aside {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background-color: var(--color-paper);
  z-index: var(--z-aside);
  padding: 6rem var(--space-lg);
  border-left: 1px solid var(--color-gold);
}

.aside-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.div-liturgic {
  width: 40px;
  height: 1px;
  background-color: var(--color-gold);
  margin-top: var(--space-lg);
  opacity: 0.3;
}

@media (max-width: 850px) {
  .desktop-only { display: none; }
  .hamburguer-btn { display: flex; }
}
</style>
