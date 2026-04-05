# AI Image Description Utility

Utilitário para gerar prompts de imagens no estilo de gravura em aço do século XIX para posts em Markdown.

## Instalação e Uso

Este utilitário utiliza o [uv](https://github.com/astral-sh/uv) para gerenciamento de pacotes e ambientes virtuais.

### 1. Requisitos
- **Ollama** rodando localmente (padrão porta 11434).
- Modelo `gemma3:1b` (ou outro configurado no `config.yaml`).
- Cloudflare Worker (Opcional, configurado em `config.yaml`).

### 2. Rodando o utilitário
Na raiz do diretório `ai-image-util`, execute:

```bash
uv run ai-image-gen
```

### 3. Configuração
Edite o arquivo `config.yaml` para alternar entre provedores (`cloudflare` ou `ollama`) e ajustar os parâmetros dos modelos.

## Desenvolvimento
- **src/main.py**: Lógica principal de extração e processamento.
- **tests/test_single.py**: Script para testar a extração em um único arquivo markdown.
- **worker-ai.js**: Código para deploy no Cloudflare Workers se desejar usar essa infraestrutura.
