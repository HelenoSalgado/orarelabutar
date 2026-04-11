<template>
    <div class="dissemination-wrapper">
        <div class="dissemination-seals">
            <div class="seals-grid">
                <a :href="slugShared.x()" title="Compartilhar no X" class="social-icon-link">
                    <LazyIconsX class="seal-icon" />
                </a>
                <a :href="slugShared.facebook()" title="Compartilhar no Facebook" class="social-icon-link">
                    <LazyIconsFacebook class="seal-icon" />
                </a>
                <a :href="slugShared.linkedin()" title="Compartilhar no Linkedin" class="social-icon-link">
                    <LazyIconsLinkedin class="seal-icon" />
                </a>
                <a :href="slugShared.whatsapp()" title="Compartilhar no WhatsApp" class="social-icon-link">
                    <LazyIconsWhatsApp class="seal-icon" />
                </a>
                <a :href="slugShared.pocket()" title="Salvar no Pocket" class="social-icon-link">
                    <LazyIconsPocket class="seal-icon" />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { slug, description } = defineProps(['slug', 'description']);
const slugShared = useShareMedia(slug, description);
</script>

<style scoped>
.dissemination-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    align-items: flex-start;
}

.dissemination-seals {
    display: flex;
    align-items: center;
}

.seals-grid {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    align-items: center;
}

.seal-icon {
    width: 20px;
    height: 20px;
    color: var(--color-ink);
    transition: all var(--transition-base);
    opacity: 0.7;
}

.seal-icon:hover {
    color: var(--color-gold);
    transform: scale(1.2);
    opacity: 1;
}

@media (max-width: 500px) {
    .seals-grid {
        gap: var(--space-sm);
    }
}
</style>
