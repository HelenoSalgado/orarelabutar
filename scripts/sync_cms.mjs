import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, cpSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { join } from 'node:path';

// Load .env
try { loadEnvFile(); } catch (e) {}

const { GITHUB_TOKEN, CMS_REPO_URL, CMS_BRANCH = 'master' } = process.env;

if (!GITHUB_TOKEN || !CMS_REPO_URL) {
  console.error('❌ Erro: GITHUB_TOKEN ou CMS_REPO_URL não encontrados no .env');
  process.exit(1);
}

const tempDir = '.cms-cache';
// Injeta o token na URL para clonagem
const authRepoUrl = CMS_REPO_URL.replace('https://', `https://${GITHUB_TOKEN}@`);

console.log(`🚀 Sincronizando conteúdo de ${CMS_REPO_URL} (${CMS_BRANCH})...`);

if (existsSync(tempDir)) rmSync(tempDir, { recursive: true, force: true });

try {
  execSync(`git clone --depth 1 --branch ${CMS_BRANCH} ${authRepoUrl} ${tempDir}`, { stdio: 'inherit' });
  
  const folders = ['content', 'data'];
  folders.forEach(folder => {
    if (existsSync(join(tempDir, folder))) {
      console.log(`📂 Atualizando pasta local: ${folder}/`);
      if (!existsSync(folder)) mkdirSync(folder, { recursive: true });
      cpSync(join(tempDir, folder), folder, { recursive: true });
    }
  });
  
  console.log('✅ Sincronização local concluída!');
} catch (error) {
  console.error('❌ Erro durante a sincronização:', error.message);
} finally {
  if (existsSync(tempDir)) rmSync(tempDir, { recursive: true, force: true });
}
