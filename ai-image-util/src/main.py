import os
import glob
import frontmatter
import yaml
import requests
import re
import time
import base64
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

    def scan_content(self, check_image=True):
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
            
            # Se check_image for True, verifica se a imagem (.png, .webp, .jpg) existe
            if check_image:
                image_exists = any((self.output_dir / f"{slug}.{ext}").exists() for ext in ['webp', 'jpg', 'png'])
                if image_exists:
                    continue
            
            results.append({
                'file': path,
                'slug': slug,
                'title': post.get('title', ''),
                'description': post.get('description', ''),
            })
        
        return results

    def query_cloudflare_text(self, prompt):
        cfg = self.config['providers']['cloudflare']
        payload = {
            "inputs": {
                "messages": [
                    {"role": "system", "content": "You are a visual expert. Identify a single, concrete, historical object or person (max 3 words) to represent the given text for a 19th-century engraving. Output ONLY the object name in English."},
                    {"role": "user", "content": prompt}
                ]
            }
        }
        headers = {"Authorization": f"Bearer {cfg.get('api_token', '')}"} if cfg.get('api_token') else {}
        try:
            response = requests.post(cfg['url'], json=payload, headers=headers, timeout=60)
            data = response.json()
            if "response" in data and "response" in data["response"]:
                return data["response"]["response"].strip()
            return None
        except Exception:
            return None

    def query_ollama(self, prompt):
        cfg = self.config['providers']['ollama']
        prompt_instruction = (
            f"Context: {prompt}\n\n"
            "Identify one single, highly concrete, and visual object, character, or place "
            "that represents this for a 19th-century engraving. Output ONLY the English name (max 3 words)."
        )
        payload = {"model": cfg['model'], "prompt": prompt_instruction, "stream": False}
        try:
            response = requests.post(cfg['url'], json=payload, timeout=120)
            data = response.json()
            return data.get("response", "").strip()
        except Exception:
            return None

    def extract_object(self, item):
        provider = self.config['provider']
        text_context = f"{item['title']} - {item['description']}"
        obj = self.query_cloudflare_text(text_context) if provider == "cloudflare" else self.query_ollama(text_context)
        
        if obj:
            obj = re.sub(r'^(a|an|the|output:)\s+', '', obj, flags=re.IGNORECASE)
            obj = re.sub(r'[^\w\s-]', '', obj).lower().strip()
            return obj if obj else "historical artifact"
        return "artifact"

    def generate_image_sd(self, prompt, slug):
        cfg = self.config['providers']['sd_webui']
        payload = {
            "prompt": prompt,
            "negative_prompt": cfg['params']['negative_prompt'],
            "steps": cfg['params']['steps'],
            "cfg_scale": cfg['params']['cfg_scale'],
            "width": cfg['params']['width'],
            "height": cfg['params']['height'],
            "sampler_name": cfg['params']['sampler_name']
        }
        
        try:
            print(f"[{slug}] Enviando para Stable Diffusion local...")
            response = requests.post(cfg['url'], json=payload, timeout=300)
            data = response.json()
            if 'images' in data:
                image_data = base64.b64decode(data['images'][0])
                output_path = self.output_dir / f"{slug}.png"
                with open(output_path, 'wb') as f:
                    f.write(image_data)
                print(f"[{slug}] Imagem salva em: {output_path.name}")
                return True
        except Exception as e:
            print(f"Erro na geração de imagem para {slug}: {e}")
        return False

    def clean_prompts(self):
        prompt_files = list(self.output_dir.glob("*.prompt.txt"))
        if not prompt_files:
            print("Nenhum arquivo de prompt encontrado para limpar.")
            return
            
        print(f"Limpando {len(prompt_files)} arquivos de prompt em {self.output_dir}...")
        for f in prompt_files:
            try:
                f.unlink()
            except Exception as e:
                print(f"Erro ao deletar {f.name}: {e}")
        print("Limpeza concluída.")

    def process(self, run_extractor=True, run_image=True, run_clean=False):
        if run_clean:
            self.clean_prompts()
            if not run_extractor and not run_image:
                return

        # Escaneia conteúdo sem imagem OU se o extrator for forçado
        pending = self.scan_content(check_image=not run_extractor)
        print(f"\nEncontrados {len(pending)} itens para processar.")
        
        if not pending:
            print("Tudo atualizado!")
            return

        template = self.config['engraving_template']

        for item in tqdm(pending, desc="Processing"):
            prompt_path = self.output_dir / f"{item['slug']}.prompt.txt"
            prompt = ""

            # 1. Extrator (Gera o prompt se solicitado ou se o arquivo não existe)
            if run_extractor or not prompt_path.exists():
                obj = self.extract_object(item)
                prompt = template.format(object=obj)
                with open(prompt_path, 'w', encoding='utf-8') as f:
                    f.write(prompt)
                print(f"\n[{item['slug']}] Prompt -> {obj}")
            else:
                with open(prompt_path, 'r', encoding='utf-8') as f:
                    prompt = f.read()

            # 2. Geração de Imagem
            if run_image:
                image_exists = any((self.output_dir / f"{item['slug']}.{ext}").exists() for ext in ['webp', 'jpg', 'png'])
                if not image_exists:
                    self.generate_image_sd(prompt, item['slug'])
                else:
                    print(f"[{item['slug']}] Imagem já existe, pulando geração.")

def main():
    import argparse
    parser = argparse.ArgumentParser(description="AI Image Description Utility")
    parser.add_argument("--config", default="config.yaml", help="Arquivo de configuração")
    parser.add_argument("--content", default="../content", help="Diretório de markdowns")
    parser.add_argument("--output", default="../public/img/ai", help="Diretório de saída")
    parser.add_argument("--extractor", action="store_true", help="Força a extração do prompt do texto")
    parser.add_argument("--image", action="store_true", help="Gera a imagem usando o prompt")
    parser.add_argument("--clean", action="store_true", help="Apaga todos os arquivos .prompt.txt no diretório de saída")
    
    args = parser.parse_args()
    
    # Se nenhuma flag de ação for passada, o padrão é rodar extrator para o que estiver faltando
    # A flag --clean pode ser usada sozinha ou com outras
    run_extractor = args.extractor
    run_image = args.image
    run_clean = args.clean
    
    if not any([args.extractor, args.image, args.clean]):
        run_extractor = True
        run_image = False # Por segurança, imagem só com flag explícita

    script_dir = Path(__file__).parent.parent
    config_path = (script_dir / args.config).resolve()
    content_path = (script_dir / args.content).resolve()
    output_path = (script_dir / args.output).resolve()
    
    util = AIImageUtil(config_path, content_path, output_path)
    util.process(run_extractor=run_extractor, run_image=run_image, run_clean=run_clean)

if __name__ == "__main__":
    main()
