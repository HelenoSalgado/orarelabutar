# AI Image Description Utility

Utilitário para gerar prompts e imagens no estilo de gravura em aço do século XIX para posts em Markdown.

## Instalação e Uso

Este utilitário utiliza o [uv](https://github.com/astral-sh/uv) para gerenciamento de pacotes e ambientes virtuais.

### 1. Requisitos
- **Ollama** rodando localmente (padrão porta 11434).
- Modelo `gemma3:1b` (ou outro configurado no `config.yaml`).
- **Stable Diffusion WebUI (A1111/Forge)** rodando com API ativa (padrão porta 7860) para geração de imagens.
- Cloudflare Worker (Opcional, configurado em `config.yaml`).

### 2. Rodando o utilitário
Na raiz do diretório `ai-image-util`, execute:

```bash
# Apenas extrair prompts (padrão)
uv run ai-image-gen

# Extrair prompts e gerar imagens (requer GPU local/API SD)
uv run ai-image-gen --extractor --image

# Apenas gerar imagens a partir de prompts existentes
uv run ai-image-gen --image

# Limpar arquivos de prompt (.prompt.txt)
uv run ai-image-gen --clean
```

### 3. Configuração
Edite o arquivo `config.yaml` para alternar entre provedores de texto e imagem, e ajustar os parâmetros de geração.

## Desenvolvimento
- **src/main.py**: Lógica principal de extração, limpeza e geração.
- **tests/test_single.py**: Script para testar a extração em um único arquivo markdown.
- **worker-ai.js**: Código para deploy no Cloudflare Workers.
