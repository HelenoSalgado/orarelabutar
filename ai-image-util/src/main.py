import os
import glob
import frontmatter
import yaml
import requests
import re
import time
from pathlib import Path
from tqdm import tqdm

class AIImageUtil:
    def __init__(self, config_path, content_dir, output_dir):
        self.config = self.load_config(config_path)
        self.content_dir = Path(content_dir)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
    def load_config(self, path):
        with open(path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)

    def get_slug(self, file_path, data):
        if 'slug' in data:
            return data['slug']
        return file_path.stem

    def scan_content(self):
        files = glob.glob(str(self.content_dir / "**/*.md"), recursive=True)
        results = []
        
        for file_path in tqdm(files, desc="Scanning content"):
            path = Path(file_path)
            if path.name.startswith('.') or "node_modules" in str(path):
                continue
                
            with open(path, 'r', encoding='utf-8') as f:
                try:
                    post = frontmatter.load(f)
                except Exception:
                    continue
            
            slug = self.get_slug(path, post)
            # Verifica se já existe imagem
            image_exists = any((self.output_dir / f"{slug}.{ext}").exists() for ext in ['webp', 'jpg', 'png'])
            
            if not image_exists:
                results.append({
                    'file': path,
                    'slug': slug,
                    'title': post.get('title', ''),
                    'description': post.get('description', ''),
                })
        
        return results

    def query_cloudflare(self, prompt):
        cfg = self.config['providers']['cloudflare']
        # Usando o formato de mensagens (chat) para melhor precisão
        payload = {
            "inputs": {
                "messages": [
                    {"role": "system", "content": "You are a visual expert. Identify a single, concrete, historical object or person (max 3 words) to represent the given text for a 19th-century engraving. Output ONLY the object name in English."},
                    {"role": "user", "content": prompt}
                ]
            }
        }
        headers = {}
        if cfg.get('api_token'):
            headers["Authorization"] = f"Bearer {cfg['api_token']}"
            
        try:
            response = requests.post(cfg['url'], json=payload, headers=headers, timeout=60)
            data = response.json()
            # Conforme seu exemplo: {"response": {"response": "..."}}
            if "response" in data and "response" in data["response"]:
                return data["response"]["response"].strip()
            return None
        except Exception as e:
            print(f"Error Cloudflare: {e}")
            return None

    def query_ollama(self, prompt):
        cfg = self.config['providers']['ollama']
        # Prompt mais direto para o Ollama
        prompt_instruction = (
            f"Context: {prompt}\n\n"
            "Identify one single, highly concrete, and visual object, character, or place "
            "that represents this for a 19th-century engraving. Output ONLY the English name (max 3 words)."
        )
        
        payload = {
            "model": cfg['model'],
            "prompt": prompt_instruction,
            "stream": False
        }
        try:
            response = requests.post(cfg['url'], json=payload, timeout=120)
            data = response.json()
            return data.get("response", "").strip()
        except Exception as e:
            print(f"Error Ollama: {e}")
            return None

    def extract_object(self, item):
        provider = self.config['provider']
        text_context = f"{item['title']} - {item['description']}"
        
        obj = None
        if provider == "cloudflare":
            obj = self.query_cloudflare(text_context)
        elif provider == "ollama":
            obj = self.query_ollama(text_context)
            
        if obj:
            # Limpeza básica (ex: "The wooden gate." -> "wooden gate")
            obj = re.sub(r'^(a|an|the|output:)\s+', '', obj, flags=re.IGNORECASE)
            obj = re.sub(r'[^\w\s-]', '', obj).lower().strip()
            return obj if obj else "historical artifact"
        
        return "artifact"

    def process(self):
        pending = self.scan_content()
        print(f"\nEncontrados {len(pending)} itens sem imagem correspondente.")
        
        if not pending:
            print("Tudo atualizado!")
            return

        template = self.config['engraving_template']

        for item in tqdm(pending, desc="Generating prompts"):
            obj = self.extract_object(item)
            prompt = template.format(object=obj)
            
            prompt_file = self.output_dir / f"{item['slug']}.prompt.txt"
            with open(prompt_file, 'w', encoding='utf-8') as f:
                f.write(prompt)
            
            print(f"\n[{item['slug']}] -> OBJETO: {obj}")
            time.sleep(0.5)

def main():
    import argparse
    parser = argparse.ArgumentParser(description="AI Image Description Utility")
    parser.add_argument("--config", default="config.yaml", help="Arquivo de configuração")
    parser.add_argument("--content", default="../content", help="Diretório de markdowns")
    parser.add_argument("--output", default="../public/img/ai", help="Diretório de saída")
    
    args = parser.parse_args()
    
    # Resolve caminhos relativos ao script
    script_dir = Path(__file__).parent.parent
    config_path = (script_dir / args.config).resolve()
    content_path = (script_dir / args.content).resolve()
    output_path = (script_dir / args.output).resolve()
    
    util = AIImageUtil(config_path, content_path, output_path)
    util.process()

if __name__ == "__main__":
    main()
