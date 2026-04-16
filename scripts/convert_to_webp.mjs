import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const TARGET_DIR = 'public/img';
const EXTENSIONS = ['.png', '.jpg', '.jpeg'];

async function convertDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await convertDir(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        const outputPath = fullPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
        
        // Skip if webp already exists and is newer than source (optional, but good for speed)
        try {
          const stats = await fs.stat(fullPath);
          const outStats = await fs.stat(outputPath).catch(() => null);
          if (outStats && outStats.mtime > stats.mtime) {
            console.log(`Skipping ${fullPath} (WebP already exists and is up to date)`);
            continue;
          }
        } catch (e) {
          // Continue if error
        }

        console.log(`Converting ${fullPath} to ${outputPath}...`);
        
        try {
          let image = sharp(fullPath);
          const metadata = await image.metadata();

          // Se estiver na pasta 'ai', redimensionar para o tamanho ideal de metatags (1200x630)
          if (fullPath.includes(path.join('img', 'ai'))) {
            console.log(`  -> Redimensionando para 1200x630 (tamanho metatags)...`);
            image = image.resize(1200, 630, {
              fit: 'cover',
              position: 'center'
            });
          }

          await image
            .webp({ 
              quality: 90, // Alta qualidade, quase indistinguível
              lossless: ext === '.png' && metadata.format === 'png' ? false : false, // Usamos perda mínima para melhor compressão
              effort: 6 // Maior esforço para melhor compressão
            })
            .toFile(outputPath);
            
          console.log(`✓ Concluído: ${outputPath}`);
        } catch (err) {
          console.error(`✗ Erro ao converter ${fullPath}:`, err.message);
        }
      }
    }
  }
}

console.log('Iniciando conversão de imagens para WebP...');
convertDir(TARGET_DIR)
  .then(() => console.log('Processo finalizado!'))
  .catch(err => console.error('Erro fatal no processo:', err));
