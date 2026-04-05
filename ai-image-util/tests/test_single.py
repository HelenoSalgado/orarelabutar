import os
import sys
from pathlib import Path
import yaml
import frontmatter

# Adiciona o diretório src ao path para importar o utilitário
sys.path.append(str(Path(__file__).parent.parent / "src"))
from main import AIImageUtil

def test_single_file(file_path):
    # Configuração local do teste
    base_dir = Path(__file__).parent.parent
    config_path = base_dir / "config.yaml"
    output_dir = base_dir / "tests/output"
    
    # Garante que o diretório de saída do teste existe
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Instancia o utilitário
    util = AIImageUtil(config_path, base_dir.parent / "content", output_dir)
    
    # Carrega o arquivo de teste
    path = Path(file_path)
    if not path.exists():
        print(f"Erro: Arquivo {file_path} não encontrado.")
        return

    print(f"\n--- Testando Integridade para: {path.name} ---")
    with open(path, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    
    item = {
        'slug': path.stem,
        'title': post.get('title', 'Sem Título'),
        'description': post.get('description', 'Sem Descrição')
    }
    
    # Tenta extrair o objeto usando o Worker
    print(f"Consultando IA (Provedor: {util.config['provider']})...")
    obj = util.extract_object(item)
    print(f"OBJETO EXTRAÍDO: [{obj}]")
    
    # Gera o prompt final
    template = util.config['engraving_template']
    final_prompt = template.format(object=obj)
    
    print("\n--- PROMPT GERADO ---")
    print(final_prompt)
    print("---------------------\n")
    
    # Salva para inspeção
    prompt_file = output_dir / f"{item['slug']}.test_prompt.txt"
    with open(prompt_file, 'w', encoding='utf-8') as f:
        f.write(final_prompt)
    
    print(f"Teste concluído! Prompt salvo em: {prompt_file.relative_to(base_dir)}")

if __name__ == "__main__":
    # Testa com um post real do projeto
    test_file = "../content/posts/ao-redor-do-portao.md"
    test_single_file(test_file)
