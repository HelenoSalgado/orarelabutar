import { readdirSync, renameSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '');
}

const base = 'ebooks-ai/content/acervo';
const folders = ['metadata', 'context', 'covers'];

const metadataFiles = readdirSync(join(base, 'metadata'));
metadataFiles.forEach(file => {
  if (!file.endsWith('.json')) return;
  
  const path = join(base, 'metadata', file);
  const data = JSON.parse(readFileSync(path, 'utf-8'));
  const newSlug = slugify(data.title || file.replace('.json', ''));
  const oldNameBase = file.replace('.json', '');
  const newName = `${newSlug}.json`;

  console.log(`Processing: ${oldNameBase} -> ${newSlug}`);

  // Renomear Metadata
  renameSync(path, join(base, 'metadata', newName));
  
  // Renomear Context
  try {
    const contextFiles = readdirSync(join(base, 'context'));
    contextFiles.forEach(f => {
      if (f.startsWith(oldNameBase)) {
        const ext = f.substring(f.lastIndexOf('.'));
        renameSync(join(base, 'context', f), join(base, 'context', newSlug + ext));
      }
    });
  } catch (e) { console.warn('No context folder found or empty'); }
  
  // Renomear Covers
  try {
    const coverFiles = readdirSync(join(base, 'covers'));
    coverFiles.forEach(f => {
      if (f.startsWith(oldNameBase)) {
        const ext = f.substring(f.lastIndexOf('.'));
        renameSync(join(base, 'covers', f), join(base, 'covers', newSlug + ext));
      }
    });
  } catch (e) { console.warn('No covers folder found or empty'); }

  // Renomear EPUB na raiz
  const rootFiles = readdirSync(base);
  rootFiles.forEach(f => {
    if (f.startsWith(oldNameBase) && f.endsWith('.epub')) {
       renameSync(join(base, f), join(base, newSlug + '.epub'));
    }
  });
});

console.log('Zeladoria concluída.');
