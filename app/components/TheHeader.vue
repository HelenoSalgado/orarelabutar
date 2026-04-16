<template>
  <header class="frontispiece">
    <div class="header-container">
      <!-- Lado Esquerdo: Logo e Título -->
      <NuxtLink to="/" class="logo-area">
        <NuxtImg src="/img/licoes1-p.webp" alt="logo" class="logo-img" width="50" height="50"/>
        <span class="site-title">Orar e Labutar</span>
      </NuxtLink>

      <!-- Centro: Navegação Desktop -->
      <nav class="sacred-nav">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to">
          <component :is="link.icon" class="icon" /> {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Lado Direito: Ações (Tema e Menu Mobile) -->
      <div class="actions-area">
        <button type="button" class="theme-toggle" title="Alterar tema">
          <IconsMoon class="theme-icon icon-light" />
          <IconsSun class="theme-icon icon-dark" />
        </button>

        <button type="button" class="hamburguer-btn" aria-label="Menu">
          <div class="line"/><div class="line"/><div class="line"/>
        </button>
      </div>
    </div>

    <!-- Menu Lateral Mobile (sempre no DOM, JS controla via classes) -->
    <aside class="sacred-aside">
      <nav class="aside-nav">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to">
          <component :is="link.icon" /> {{ link.label }}
        </NuxtLink>
      </nav>
    </aside>

    <div class="aside-overlay"/>
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

const navLinks = [
  { to: '/', label: 'Início', icon: IconsHome },
  { to: '/sobre', label: 'Sobre', icon: IconsGlobe },
  { to: '/manuscritos', label: 'Escritos', icon: IconsEdit2 },
  { to: '/audios', label: 'Áudios', icon: IconsMusic },
  { to: '/livros', label: 'Livros', icon: IconsBook },
  { to: '/links-uteis', label: 'Links', icon: IconsLink }
];
</script>

<style scoped>
.frontispiece {
  background-color: var(--color-paper);
  position: sticky;
  top: 0;
  z-index: calc(var(--z-aside) + 1);
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
  height: 70px;
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
  display: none;
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
  z-index: calc(var(--z-aside) + 2);
}

.theme-toggle {
  cursor: pointer;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
}

.theme-icon {
  width: 20px;
  height: 20px;
  color: var(--color-gold);
}

.icon-dark { display: none; }
.icon-light { display: block; }
.dark .icon-dark { display: block; }
.dark .icon-light { display: none; }

.hamburguer-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: none;
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

.hamburguer-btn.open .line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburguer-btn.open .line:nth-child(2) { opacity: 0; }
.hamburguer-btn.open .line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Menu Mobile (Aside) — oculto por padrão, JS adiciona classe .open */
.sacred-aside {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background-color: var(--color-paper);
  padding: 5rem var(--space-lg);
  border-left: 1px solid var(--color-gold);
  box-shadow: 0 0 30px rgba(0,0,0,0.1);
  z-index: var(--z-aside);
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
}

.sacred-aside.open {
  transform: translateX(0);
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
  z-index: calc(var(--z-aside) - 1);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.aside-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

/* Responsividade */
@media (max-width: 1000px) {
  .hamburguer-btn { display: flex; }
}

@media (min-width: 1000px){
  .sacred-nav { display: flex; }
}

@media (max-width: 480px) {
  .site-title { font-size: 0.9rem; }
  .header-container {
    padding: 0 var(--space-sm);
  }
}
</style>
