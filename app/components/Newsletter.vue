<template>
    <section class="scriptorium-newsletter">
        <div class="newsletter-header">
            <IconsEmail class="newsletter-icon" />
            <h2>Siga o Manuscrito</h2>
        </div>
        <p class="newsletter-desc">Seja avisado quando novos artigos forem publicados.</p>
        <form @submit.prevent="handleSubmit" class="newsletter-form">
            <div class="input-group">
                <input type="text" v-model="name" placeholder="Seu Nome" required class="sacred-input">
                <input type="email" v-model="email" placeholder="Seu melhor e-mail" required class="sacred-input">
            </div>
            <button class="sacred-btn newsletter-btn" type="submit">Inscrever-se</button>
        </form>
    </section>
</template>

<script setup lang="ts">
const name = ref('');
const email = ref('');

const handleSubmit = () => {
    // Implement subscription logic or external form action
    console.log('Inscrito:', { name: name.value, email: email.value });
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
}

.input-group {
    display: flex;
    gap: var(--space-sm);
    width: 100%;
    max-width: 600px;
}

.sacred-input {
    flex: 1;
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
    width: 100%;
    max-width: 200px;
}

@media (max-width: 600px) {
    .input-group {
        flex-direction: column;
    }
    .newsletter-btn {
        max-width: 100%;
    }
}
</style>
