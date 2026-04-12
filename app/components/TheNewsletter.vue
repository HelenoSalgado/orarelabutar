<template>
    <section class="scriptorium-newsletter">
        <div class="newsletter-header">
            <IconsEmail class="newsletter-icon" />
            <h2>Siga o Manuscrito</h2>
        </div>
        <p class="newsletter-desc">Seja avisado quando novos artigos forem publicados.</p>
        <form class="newsletter-form" @submit.prevent="handleSubmit">
            <input v-model="name" type="text" placeholder="Seu Nome" required class="sacred-input">
            <input v-model="email" type="email" placeholder="Seu melhor e-mail" required class="sacred-input">
            <button class="sacred-btn newsletter-btn" type="submit">Inscrever-se</button>
        </form>
    </section>
</template>

<script setup lang="ts">
const name = ref('');
const email = ref('');

const handleSubmit = () => {
    // Implement subscription logic or external form action
    alert('Obrigado por se inscrever!');
    name.value = '';
    email.value = '';
};
</script>

<style scoped>
.scriptorium-newsletter {
    background-color: var(--color-gold-muted);
    padding: var(--space-xl);
    border-radius: 12px;
    border: 1px solid var(--color-gold);
    text-align: center;
    margin: var(--space-2xl) auto;
}

.newsletter-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
}

.newsletter-icon {
    width: 24px;
    height: 24px;
    color: var(--color-gold);
}

.newsletter-desc {
    color: var(--color-ink-muted);
    font-size: 1.1rem;
    margin-bottom: var(--space-lg);
}

.newsletter-form {
    display: grid;
    gap: var(--space-md);
    align-items: center;
}

.sacred-input {
    background: var(--color-paper);
    border: 1px solid var(--color-gold);
    padding: 0.8rem 1rem;
    border-radius: 4px;
    color: var(--color-ink);
    font-family: var(--font-body);
    font-size: 1rem;
    transition: all var(--transition-fast);
}

.sacred-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-gold-muted);
    border-color: var(--color-gold);
}

.newsletter-btn {
    width: auto;
    justify-self: center;
}

@media (max-width: 600px) {
    .newsletter-form {
        grid-template-columns: 1fr;
    }
    .newsletter-btn {
        width: 100%;
    }
}
</style>
