#!/bin/bash

# Configurações
PDF_DIR="./public/pdfs"
OUTPUT_DIR="./public/img/pdfs/capas"
TEMP_FILE="/tmp/pdf_cover_temp"

# Garante que o diretório de saída existe
mkdir -p "$OUTPUT_DIR"

# Ativa nullglob para evitar erros se não houver arquivos
shopt -s nullglob
pdf_files=("$PDF_DIR"/*.pdf)

if [ ${#pdf_files[@]} -eq 0 ]; then
    echo "◈ Nenhum arquivo PDF encontrado em $PDF_DIR"
    exit 0
fi

echo "◈ Iniciando geração de capas para ${#pdf_files[@]} arquivos..."

for pdf in "${pdf_files[@]}"; do
    filename=$(basename -- "$pdf")
    slug="${filename%.*}"
    # Normaliza o slug (opcional, mas recomendado para URLs)
    # Aqui mantemos o original mas garantimos a extensão .webp
    output_file="$OUTPUT_DIR/$slug.webp"

    # Pula se a capa já existir
    if [ -f "$output_file" ]; then
        echo "  - Pulando $filename (capa já existe)"
        continue
    fi

    echo "  ◈ Processando $filename..."
    
    # 1. Extrai a primeira página como JPEG usando pdftoppm (muito rápido)
    # 2. Converte para WebP usando ImageMagick (magick) redimensionando para 800px de altura
    if pdftoppm -f 1 -l 1 -singlefile -jpeg "$pdf" "$TEMP_FILE" && \
       magick "${TEMP_FILE}.jpg" -resize x800 -quality 80 "$output_file"; then
        echo "    ✓ Sucesso: $output_file"
    else
        echo "    ✗ Erro ao processar $filename"
    fi

    # Limpa o arquivo temporário
    rm -f "${TEMP_FILE}.jpg"
done

echo "◈ Processamento concluído."
