<template>
  <nav class="map-site">
    <div class="map-group">
      <h2>Navegação</h2>
      <div class="links-list">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/sobre">Sobre</NuxtLink>
        <NuxtLink to="/posts">Artigos</NuxtLink>
        <NuxtLink to="/podcast">Podcast</NuxtLink>
        <NuxtLink to="/pdfs">PDFs</NuxtLink>
        <NuxtLink to="/links-uteis">Links Úteis</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.map-site {
  width: 100%;
  display: flex;
  justify-content: center;
}

.map-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
}

.map-group h2 {
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    color: var(--color-ink);
    margin: 0;
}

.links-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-md);
}

.links-list a {
    font-size: 0.9rem;
    color: var(--color-gold);
    font-weight: 700;
}

.links-list a:hover {
    color: var(--color-ink);
}
</style>
