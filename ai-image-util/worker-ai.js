export default {
  async fetch(request, env) {
    // Apenas aceita requisições POST
    if (request.method !== "POST") {
      return new Response("Use POST com um corpo JSON (ex: { 'inputs': { 'prompt': '...' } })", { status: 405 });
    }

    try {
      const body = await request.json();
      
      // Extrai os inputs (pode vir como { inputs: { ... } } ou direto no corpo)
      const aiInput = body.inputs || body;

      // Executa o modelo (Llama 3.1 é mais atual e preciso)
      const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', aiInput);

      // Retorna no formato esperado pelo utilitário Python: data["response"]["response"]
      return Response.json({
        success: true,
        response: result
      });
    } catch (e) {
      return Response.json({ 
        success: false, 
        error: e.message 
      }, { status: 500 });
    }
  }
};
