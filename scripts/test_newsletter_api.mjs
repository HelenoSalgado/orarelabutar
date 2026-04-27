import { createApp, createEvent, toNodeListener, readBody } from 'h3';
import { listen } from 'listhen';
import handler from '../server/api/newsletter.post.ts';

// Mock do ambiente Cloudflare
const cloudflareMock = {
    env: {
        DB: {
            prepare: (sql) => ({
                run: async () => { console.log('SQL Executado:', sql); return { success: true }; },
                bind: (...args) => ({
                    run: async () => { console.log('SQL com Bind Executado:', sql, args); return { success: true }; }
                })
            })
        },
        SEND_EMAIL: {
            send: async (msg) => { console.log('E-mail enviado:', msg); return { success: true }; }
        }
    }
};

const app = createApp();
app.use('/api/newsletter', (event) => {
    // Injeta o mock do cloudflare no contexto
    event.context.cloudflare = cloudflareMock;
    return handler(event);
});

async function main() {
    const listener = await listen(toNodeListener(app), { port: 3001 });
    console.log('Servidor de teste rodando em:', listener.url);

    try {
        console.log('--- Testando POST /api/newsletter ---');
        const response = await fetch('http://localhost:3001/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Teste Manual', email: 'teste@orarelabutar.com' })
        });

        const result = await response.json();
        console.log('Status:', response.status);
        console.log('Resultado:', result);

        if (response.ok && result.success) {
            console.log('✅ API está funcionando logicamente!');
        } else {
            console.log('❌ Falha no teste da API.');
        }
    } catch (err) {
        console.error('Erro ao chamar API:', err);
    } finally {
        await listener.close();
    }
}

main();
