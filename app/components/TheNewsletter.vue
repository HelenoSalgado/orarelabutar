<template>
    <section class="scriptorium-newsletter">
        <h2>
            <IconsEmail />
            <span>Siga o Orar e Labutar</span>
        </h2>
        <p class="newsletter-desc">Seja avisado quando novos manuscritos ou conteúdos forem publicados.</p>
        <form id="newsletter-form" class="newsletter-form" onsubmit="return false;">
            <div class="form-inputs">
                <input name="name" type="text" placeholder="Seu Nome" required class="sacred-input">
                <input name="email" type="email" placeholder="Seu melhor e-mail" required class="sacred-input">
            </div>
            <button class="sacred-btn newsletter-btn" type="submit">
                Inscrever-se
            </button>
        </form>
        <p id="newsletter-message" class="newsletter-feedback"></p>
    </section>
</template>

<script setup lang="ts">
useHead({
    script: [
        {
            innerHTML: `
                (function() {
                    const initNewsletter = () => {
                        const form = document.getElementById('newsletter-form');
                        const messageEl = document.getElementById('newsletter-message');
                        
                        if (!form || !messageEl || form.dataset.initialized) return;
                        form.dataset.initialized = "true";

                        form.addEventListener('submit', async (e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            const btn = form.querySelector('button');
                            const originalBtnText = btn.textContent;
                            
                            const formData = new FormData(form);
                            const data = {
                                name: formData.get('name'),
                                email: formData.get('email')
                            };

                            try {
                                btn.disabled = true;
                                btn.textContent = 'Enviando...';
                                messageEl.textContent = '';
                                messageEl.classList.remove('error', 'success');

                                const response = await fetch('/api/newsletter', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data)
                                });

                                const result = await response.json();

                                if (response.ok) {
                                    messageEl.textContent = result.message || 'Inscrito com sucesso!';
                                    messageEl.classList.add('success');
                                    form.reset();
                                } else {
                                    messageEl.textContent = result.statusMessage || 'Erro ao se inscrever.';
                                    messageEl.classList.add('error');
                                }
                            } catch (err) {
                                messageEl.textContent = 'Erro de conexão. Tente novamente.';
                                messageEl.classList.add('error');
                            } finally {
                                btn.disabled = false;
                                btn.textContent = originalBtnText;
                            }
                            return false;
                        });
                    };

                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', initNewsletter);
                    } else {
                        initNewsletter();
                    }
                })();
            `,
            tagPosition: 'bodyClose',
            id: 'newsletter-handler'
        }
    ]
});
</script>

<style scoped>
.scriptorium-newsletter {
    background-color: var(--color-gold-muted);
    padding: var(--space-xl);
    border-radius: 12px;
    border: 1px solid var(--color-gold);
    text-align: left;
    margin: var(--space-2xl) auto;
    max-width: 800px;
}

.newsletter-desc {
    color: var(--color-ink-muted);
    font-size: 1.1rem;
    margin-bottom: var(--space-lg);
    text-align: left;
}

.newsletter-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.form-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
    width: 100%;
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
    align-self: flex-start;
}

.newsletter-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.newsletter-feedback {
    margin-top: var(--space-md);
    font-size: 0.9rem;
    color: var(--color-ink);
    font-weight: 500;
    min-height: 1.2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.newsletter-feedback.error, 
.newsletter-feedback.success {
    opacity: 1;
}

.newsletter-feedback.error {
    color: #d32f2f;
}

.newsletter-feedback.success {
    color: #2e7d32;
}

@media (max-width: 768px) {
    .form-inputs {
        grid-template-columns: 1fr;
    }
    .newsletter-btn {
        width: 100%;
    }
}
</style>
