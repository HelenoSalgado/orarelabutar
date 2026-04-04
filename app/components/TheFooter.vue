<template>
  <footer class="colophon">
    <MapSite />
    <div class="sacred-social">
        <a href="https://instagram.com/orarelabutar" target="_blank" title="Instagram">
            <IconsInstagram class="social-icon" />
        </a>
        <a href="https://youtube.com/@orarelabutar" target="_blank" title="Youtube">
            <IconsYoutube class="social-icon" />
        </a>
        <a href="mailto:contato@orarelabutar.com" title="E-mail">
            <IconsEmail class="social-icon" />
        </a>
    </div>
    <p class="copyright">
        Anno Domini {{ new Date().getFullYear() }} — Orar e Labutar
    </p>
  </footer>
</template>

<style scoped>
.colophon {
  background-color: var(--color-paper);
  padding: var(--space-3xl) var(--space-sm) var(--space-2xl) var(--space-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: var(--space-2xl);
}

.colophon-ornament {
  color: var(--color-gold);
  font-size: 2rem;
  margin-bottom: var(--space-xl);
  opacity: 0.3;
}

.sacred-social {
    margin-top: var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-lg); /* Aumentado gap para dispensar separadores */
}

.social-icon {
    width: 20px;
    height: 20px;
    color: var(--color-gold);
    opacity: 0.8;
    transition: all var(--transition-base);
}

.social-icon:hover {
    color: var(--color-ink);
    transform: translateY(-2px);
}

.copyright {
  margin-top: var(--space-2xl);
  font-size: 0.85rem;
  color: var(--color-ink-muted);
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  opacity: 0.6;
}

:deep(.map-site) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-xl);
    max-width: 800px;
    margin-bottom: var(--space-md);
}

:deep(.map-site h2) {
    font-size: 1.1rem;
    margin-bottom: var(--space-md);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    justify-content: center; /* Para o flex global de títulos */
}

:deep(.map-site a) {
    display: block;
    font-size: 1rem; /* Aumentado */
    margin-bottom: var(--space-xs);
}
</style>
