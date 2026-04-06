<template>
  <header class="frontispiece" :class="{ 'header-hidden': !isHeaderVisible && !isMenuOpen }">
    <div class="header-container">
      <!-- Lado Esquerdo: Logo e Título -->
      <NuxtLink to="/" class="logo-area">
        <NuxtImg src="/img/licoes1-p.webp" alt="logo" class="logo-img" width="50" height="50"/>
        <h1 class="site-title">Orar e Labutar</h1>
      </NuxtLink>

      <!-- Centro: Navegação Desktop -->
      <nav class="sacred-nav desktop-only">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to">
          <component :is="link.icon" class="icon" /> {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Lado Direito: Ações (Tema e Menu Mobile) -->
      <div class="actions-area">
        <div 
          class="theme-toggle" 
          :title="isDark ? 'Tema Papiro' : 'Tema Penumbra'" 
          @click="toggleTheme"
        >
          <IconsMoon v-if="!isDark" class="theme-icon" />
          <IconsSun v-else class="theme-icon" />
        </div>

        <button class="hamburguer-btn" aria-label="Menu" @click="isMenuOpen = !isMenuOpen">
          <div v-for="i in 3" :key="i" class="line" :class="{ 'open': isMenuOpen }"/>
        </button>
      </div>
    </div>

    <!-- Menu Lateral Mobile -->
    <Transition name="slide-aside">
      <aside v-if="isMenuOpen" class="sacred-aside">
        <nav class="aside-nav">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to" 
            @click="isMenuOpen = false"
          >
            <component :is="link.icon" /> {{ link.label }}
          </NuxtLink>
        </nav>
      </aside>
    </Transition>
    
    <div v-if="isMenuOpen" class="aside-overlay" @click="isMenuOpen = false"/>
    <Divisor />
  </header>
</template>

<script setup>
import IconsHome from '~/components/icons/Home.vue';
import IconsGlobe from '~/components/icons/Globe.vue';
import IconsEdit2 from '~/components/icons/Edit2.vue'; 
import IconsMusic from '~/components/icons/Music.vue';
import IconsBook from '~/components/icons/Book.vue';
import IconsLink from '~/components/icons/Link.vue';

const isMenuOpen = ref(false);
const isDark = ref(false);
const isHeaderVisible = ref(true);
let lastScrollY = 0;

const navLinks = [
  { to: '/', label: 'Home', icon: IconsHome },
  { to: '/sobre', label: 'Sobre', icon: IconsGlobe },
  { to: '/posts', label: 'Artigos', icon: IconsEdit2 },
  { to: '/audios', label: 'Áudios', icon: IconsMusic },
  { to: '/pdfs', label: 'PDFs', icon: IconsBook },
  { to: '/links-uteis', label: 'Links', icon: IconsLink }
];

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  
  // Se estiver rolando para baixo e já passou de um certo ponto (ex: 100px)
  if (currentScrollY > lastScrollY && currentScrollY > 0) {
    isHeaderVisible.value = false;
  } else {
    // Se estiver rolando para cima
    isHeaderVisible.value = true;
  }
  
  lastScrollY = currentScrollY;
};

const toggleTheme = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark-mode', isDark.value);
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark-mode');
    window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.frontispiece {
  background-color: var(--color-paper);
  position: sticky;
  top: 0;
  z-index: calc(var(--z-header) - 1);
  width: 100%;
  padding: 0;
  transition: transform 0.4s ease;
}

.header-hidden {
  transform: translateY(-100%);
  opacity: .2;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  height: 70px; /* Altura fixa para manter consistência */
  z-index: var(--z-header);
}

.logo-area {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: var(--color-ink);
  flex-shrink: 0;
}

.logo-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.site-title {
  font-size: 1.2rem;
  margin: 0;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Navegação Desktop */
.sacred-nav {
  display: flex;
  gap: 1.5rem;
  font-size: 1.1rem;
}

.sacred-nav a {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-ink);
  font-weight: bold;
  transition: color 0.2s;
}

.sacred-nav a:hover {
  color: var(--color-gold);
}

.sacred-nav .icon {
  width: 1.1rem;
  height: 1.1rem;
  color: var(--color-gold);
}

/* Área de Ações */
.actions-area {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  position: relative;
  z-index: var(--z-header)
}

.theme-toggle {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.theme-icon {
  width: 20px;
  height: 20px;
  color: var(--color-gold);
}

.hamburguer-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: none; /* Desktop hidden */
  flex-direction: column;
  gap: 5px;
  padding: 5px;
}

.hamburguer-btn .line {
  width: 22px;
  height: 2px;
  background-color: var(--color-ink);
  transition: all var(--transition-fast);
}

.hamburguer-btn .line.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburguer-btn .line.open:nth-child(2) { opacity: 0; }
.hamburguer-btn .line.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Menu Mobile (Aside) */
.sacred-aside {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background-color: var(--color-paper);
  padding: 5rem var(--space-lg);
  border-left: 1px solid var(--color-gold);
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
}

.aside-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.aside-nav a {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  color: var(--color-ink);
  font-weight: bold;
  font-size: 1.1rem;
}

.aside-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
}

/* Responsividade */
@media (max-width: 1000px) {
  .desktop-only { display: none; }
  .hamburguer-btn { display: flex; }
}

@media (max-width: 480px) {
  .site-title { font-size: 0.9rem; }
  .header-container { 
    padding: 0 var(--space-sm); 
  }
}

/* Transições */
.slide-aside-enter-active, .slide-aside-leave-active { transition: transform 0.3s ease-out; }
.slide-aside-enter-from, .slide-aside-leave-to { transform: translateX(100%); }
</style>
