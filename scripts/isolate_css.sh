#!/bin/bash
# Scripts para isolar o CSS principal do Nuxt em um caminho estático fixo (/css/main.css)
# Isso permite um preload manual de altíssima prioridade no nuxt.config.ts.

# Diretório de saída do Nuxt (Cloudflare Pages usa 'dist')
BUILD_DIR="dist"
NUXT_ASSETS_DIR="$BUILD_DIR/_nuxt"
# Devemos copiar para o diretório de build para o servidor encontrar o arquivo imediatamente
TARGET_BUILD_DIR="$BUILD_DIR/css"
TARGET_PUBLIC_DIR="public/css"
TARGET_FILE="main.css"

# Certificar-se de que os diretórios existem
mkdir -p "$TARGET_BUILD_DIR"
mkdir -p "$TARGET_PUBLIC_DIR"

# Encontra o maior arquivo style.*.css (o bundle principal)
LARGEST_CSS=$(find "$NUXT_ASSETS_DIR" -name "style.*.css" -type f -exec du -b {} + | sort -nr | head -n1 | cut -f2)

if [ -f "$LARGEST_CSS" ]; then
    FILENAME=$(basename "$LARGEST_CSS")
    echo "CSS Identificado: $FILENAME"
    
    # Copia o CSS para ambos os locais
    cp "$LARGEST_CSS" "$TARGET_BUILD_DIR/$TARGET_FILE"
    cp "$LARGEST_CSS" "$TARGET_PUBLIC_DIR/$TARGET_FILE"
    echo "CSS isolado em $TARGET_BUILD_DIR/$TARGET_FILE e $TARGET_PUBLIC_DIR/$TARGET_FILE"
    
    # Substitui as chamadas nos arquivos HTML gerados para apontarem para o novo caminho estático
    # Isso evita que o navegador tente baixar o mesmo CSS duas vezes (o hash e o /css/main.css)
    echo "Atualizando referências nos arquivos HTML em $BUILD_DIR..."
    find "$BUILD_DIR" -name "*.html" -exec sed -i "s|/_nuxt/$FILENAME|/css/$TARGET_FILE|g" {} +
    
    echo "Sucesso! O CSS principal agora é servido de /css/$TARGET_FILE"
else
    echo "Erro: Nenhum arquivo style.*.css encontrado em $NUXT_ASSETS_DIR"
    exit 1
fi
